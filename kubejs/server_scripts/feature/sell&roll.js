
//放置时：记录拥有者
BlockEvents.placed("kubejs:roller", event => {
    event.block.entity.persistentData.owner = event.player.name.getString()
    event.block.entity.persistentData.posx = event.block.pos.x
    event.block.entity.persistentData.posy = event.block.pos.y
    event.block.entity.persistentData.posz = event.block.pos.z
    event.block.entity.persistentData.key = Math.random()
    if (event.block.offset(0, 1, 0).getInventory() != undefined) {
        event.block.offset(0, 1, 0).entity.persistentData.owner = event.player.name.getString()
    }
})

BlockEvents.placed("kubejs:seller", event => {
    event.block.entity.persistentData.owner = event.player.name.getString()
    event.block.entity.persistentData.posx = event.block.pos.x
    event.block.entity.persistentData.posy = event.block.pos.y
    event.block.entity.persistentData.posz = event.block.pos.z
    event.block.entity.persistentData.price1 = 0
    event.block.entity.persistentData.price2 = 0
    if (event.block.offset(0, 1, 0).getInventory() != undefined) {
        event.block.offset(0, 1, 0).entity.persistentData.owner = event.player.name.getString()
    }
})

BlockEvents.placed(event => {
    if (event.block.getInventory() != undefined) {
        if (event.block.offset(0, -1, 0) == "kubejs:seller" || event.block.offset(0, -1, 0) == "kubejs:roller") {
            event.block.entity.persistentData.owner = event.block.offset(0, -1, 0).entity.persistentData.owner
        }
    }
})

//破坏时：防止非拥有者破坏
BlockEvents.broken(event => {
    if (event.block.entity && event.block.entity.persistentData.contains("owner")) { //箱子保护
        if (event.block.entity.persistentData.owner != event.player.name.getString()) {
            event.player.tell(`你无法破坏：此方块属于${event.block.entity.persistentData.owner}！`)
            event.cancel()
        }
    }
})
//开启箱子：防止非拥有者开启
PlayerEvents.chestOpened("minecraft:generic_9x3", event => {
    if (event.block.entity.persistentData.contains("owner")) { //箱子保护
        if (event.block.entity.persistentData.owner != event.player.name.getString()) {
            event.player.closeMenu()
            event.player.tell(`你无法打开：此容器属于${event.block.entity.persistentData.owner}！`)
        }
    }
})

BlockEvents.rightClicked("kubejs:roller", event => {
    if (event.hand != "MAIN_HAND") {
        return
    }
    if (event.player.name.getString() == event.block.entity.persistentData.owner && event.player.mainHandItem.id == "kubejs:roller_ticket") {
        let nbt = event.player.mainHandItem.getNbt()
        if (nbt != undefined && nbt.contains("key")) {
            event.player.tell("无法覆盖已绑定的抽奖卷")
            return
        }
        try {
            event.player.mainHandItem.setNbt(`{key:${event.block.entity.persistentData.key}}`)
        } catch (e) {
            event.player.tell(e)
        }


        event.player.tell("抽奖卷已绑定！")
        event.player.mainHandItem.enchanted = true
    }
    let up = event.block.offset(0, 1, 0).inventory
    if (up == undefined) {
        event.player.tell("扭蛋机未正确配置！")
        return
    }
    let allSlot = []
    up.allItems.forEach(ele => {
        if (ele.count != 0) {
            allSlot.push(ele)
        }
    })
    if (allSlot.length == 0) {
        event.player.tell("扭蛋机已空！")
        return
    }
    let index = randint(0, allSlot.length - 1)
    let item = allSlot[index]
    let down = event.block.offset(0, -1, 0).inventory
    if (down == undefined) {
        if (event.player.mainHandItem.id != "kubejs:roller_ticket") {
            event.player.tell("你需要手持抽奖券！")
            return
        }
        if (!event.player.mainHandItem.hasNBT() || event.player.mainHandItem.nbt.get("key") != event.block.entity.persistentData.key) {
            event.player.tell("抽奖卷与扭蛋机不匹配")
            return
        }
        event.player.mainHandItem.count--
        event.player.give(item.copyWithCount(1))
        item.count--
    } else {
        if (down.allItems.size() < down.getHeight() * down.getWidth()) {
            down.insertItem(item.copyWithCount(1), false)
            item.count--
            return
        }
        down.allItems.forEach(ele => {
            if (ele.copyWithCount(1) == item.copyWithCount(1) && ele.count < ele.maxStackSize) {
                ele.count++
                item.count--
                return
            }
        })
    }


})

//左键点击：修改价格/付款
BlockEvents.leftClicked("kubejs:seller", event => {
    let data = event.block.entity.persistentData
    if (!event.player.isCreative()) { //确保左键事件只触发一次
        if (!data.contains("sellerLeftClicked")) {
            data.sellerLeftClicked = ""
            return
        }
        data.remove("sellerLeftClicked")
    }
    if (data.owner == event.player.name.getString()) { //如果是店主：修改价格
        if (event.player.isCrouching()) {
            data.price2--
        } else {
            data.price1--
        }
        if (data.price2 < 0) {
            data.price2 = 9
            data.price1--
        }
        if (data.price1 < 0) {
            data.price1 = 0
        }

        event.server.runCommandSilent(`title ${event.player.name.getString()} actionbar "当前价格：${data.price1}.${data.price2}Δ"`)
    } else { //如果是顾客：确认付款
        //确认箱子是否为空
        let good = undefined
        try {
            good = event.block.offset(0, 1, 0).getInventory().allItems.pop()
        } catch (error) {
            event.player.tell("售货机未正确设置！")
            return
        }
        if (good == undefined) {
            event.player.tell("售货机已空！")
            return
        }
        //确认顾客剩余金额
        let balance = 0
        let inventory = event.player.inventory.allItems
        inventory.forEach(ele => {
            if (ele.id == "kubejs:delta_coin") {
                balance += ele.count * 10
                ele.setCount(0)
            }
            if (ele.id == "kubejs:delta_coin_chip") {
                balance += ele.count
                ele.setCount(0)
            }
        })
        let price = data.price1 * 10 + data.price2
        if (balance < price) {
            event.player.tell("你的现金余额少于此商品的价格！")
            returnMoney(event, balance)
            return
        }
        //给与物品
        event.player.give(good.copyWithCount(1))
        event.player.tell(`你花费了${data.price1}.${data.price2}Δ以购买${good.displayName.getString()}`)
        good.count--
        //找钱
        balance -= price
        returnMoney(event, balance)
        //给钱
        event.server.runCommandSilent(`money give ${data.owner} ${data.price1 + data.price2 * 0.1}`)
    }
})

//右键点击：修改价格/确认信息
BlockEvents.rightClicked("kubejs:seller", event => {
    if (event.hand != "MAIN_HAND") {
        return
    }
    let data = event.block.entity.persistentData
    if (data.owner == event.player.name.getString()) { //如果是店主：修改价格
        if (event.player.isCrouching()) {
            data.price2 += 1
        } else {
            data.price1 += 1
        }
        if (data.price2 >= 10) {
            data.price2 = 0
            data.price1++
        }
        event.server.runCommandSilent(`title ${event.player.name.getString()} actionbar "当前价格：${data.price1}.${data.price2}Δ"`)
    } else {//如果是顾客：显示商品信息
        let good = undefined
        try {
            good = event.block.offset(0, 1, 0).getInventory().allItems.pop()
        } catch (error) {
            event.player.tell("售货机未正确设置！")
            return
        }
        if (good == undefined) {
            event.player.tell("售货机已空！")
            return
        }
        event.player.tell(`这个售货机属于${data.owner}，每个${good.displayName.getString()}${data.price1}.${data.price2}Δ`)
    }
})

function returnMoney(event, balance) {
    event.player.give(Item.of("kubejs:delta_coin_chip").withCount(Math.round(balance % 10)))
    balance -= balance % 10
    balance /= 10
    event.player.give(Item.of("kubejs:delta_coin").withCount(Math.round(balance)))
}