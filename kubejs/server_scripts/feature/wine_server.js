BlockEvents.rightClicked("kubejs:wine_crafting_table", event => {
    if (event.hand != "MAIN_HAND") { return }
    let property = event.block.properties
    let nowAge = property.age
    let facing = property.facing
    if (event.player.mainHandItem.id == "minecraft:glass_bottle" && nowAge == 0) { //放置玻璃瓶
        event.player.mainHandItem.count--
        event.block.set('kubejs:wine_crafting_table', { age: "1", facing: `${facing}` })
    }
    if (event.player.mainHandItem.id == "minecraft:water_bucket" && nowAge == 1) { //放水
        event.player.mainHandItem.count--
        event.player.give("minecraft:bucket")
        event.block.set('kubejs:wine_crafting_table', { age: "2", facing: `${facing}` })
    }
    if (event.player.mainHandItem.count != 0 && nowAge == 2) { //放置原料
        let playerName = event.player.name.getString()
        let idPos = event.player.mainHandItem.id.indexOf(":")
        let mainIngredient = event.player.mainHandItem.id.slice(idPos + 1, idPos + 20)
        var selectedObject = main_ingredient.find((item) => item.id == `${mainIngredient}`)
        event.server.runCommandSilent(`clear ${playerName} ${selectedObject.full_id} 1`)
        event.player.give(Item.of("kubejs:incomplete_wine_bottle")
            .withName({ "text": `未完成的 瓶装${selectedObject.name}酒`, "color": "white", "italic": false })
            .withLore({ "text": "发酵次数:0", "color": "white", "italic": false })
            .withLore({ "text": "蒸馏次数:0", "color": "white", "italic": false })
            .withLore({ "text": "陈化次数:0", "color": "white", "italic": false })
            .withNBT({ CustomModelData: selectedObject.model_number })
            .withNBT({ MainIngredient: selectedObject.full_id })
            .withNBT({ SideIngredient: "blank:blank" })
            .withNBT({ Ferment: 0 })
            .withNBT({ Distillation: 0 })
            .withNBT({ Aging: 0 })
        )
        event.block.set('kubejs:wine_crafting_table', { age: "0", facing: `${facing}` })
    }
})

ItemEvents.rightClicked("kubejs:incomplete_wine_bottle", event => {
    if (event.hand != "MAIN_HAND") { return }
    if (event.player.offHandItem.count != 0) { //放置辅材料
        let playerName = event.player.name.getString()
        let nowFerment = event.player.mainHandItem.nbt.Ferment
        let nowDistillation = event.player.mainHandItem.nbt.Distillation
        let nowAging = event.player.mainHandItem.nbt.Aging

        let mainIngredientFullId = event.player.mainHandItem.nbt.MainIngredient
        let mainIngredientIdPos = mainIngredientFullId.indexOf(":")
        let mainIngredientId = mainIngredientFullId.slice(mainIngredientIdPos + 1, mainIngredientIdPos + 20)
        var mainIngredientObject = main_ingredient.find((item) => item.id == `${mainIngredientId}`)

        let sideIngredientIdPos = event.player.offHandItem.id.indexOf(":")
        let sideIngredientId = event.player.offHandItem.id.slice(sideIngredientIdPos + 1, sideIngredientIdPos + 20)
        var sideIngredientObject = side_ingredient.find((item) => item.id == `${sideIngredientId}`)
        if (sideIngredientObject == null) {
            return
        }
        event.player.offHandItem.count--
        event.player.mainHandItem.count--
        event.server.scheduleInTicks(2, function (callback0) {
            event.player.give(Item.of("kubejs:incomplete_wine_bottle")
                .withName({ "text": `未完成的 ${sideIngredientObject.name}风味瓶装${mainIngredientObject.name}酒`, "color": "white", "italic": false })
                .withLore({ "text": `发酵次数:${nowFerment}`, "color": "white", "italic": false })
                .withLore({ "text": `蒸馏次数:${nowDistillation}`, "color": "white", "italic": false })
                .withLore({ "text": `陈化次数:${nowAging}`, "color": "white", "italic": false })
                .withNBT({ MainIngredient: mainIngredientObject.full_id })
                .withNBT({ SideIngredient: sideIngredientObject.full_id })
                .withNBT({ CustomModelData: mainIngredientObject.model_number })
                .withNBT({ Ferment: nowFerment })
                .withNBT({ Distillation: nowDistillation })
                .withNBT({ Aging: nowAging })
            )
        })
    }
})

BlockEvents.rightClicked("kubejs:ferment_container", event => { //发酵
    if (event.hand != "MAIN_HAND") { return }
    if (event.player.mainHandItem.id == "kubejs:incomplete_wine_bottle") {
        let playerName = event.player.name.getString()
        let nowFerment = event.player.mainHandItem.nbt.Ferment
        let nowDistillation = event.player.mainHandItem.nbt.Distillation
        let nowAging = event.player.mainHandItem.nbt.Aging
        if (nowDistillation != 0 || nowAging != 0 || nowFerment == 4) {
            event.server.runCommandSilent(`title ${playerName} actionbar "这瓶酒没法再发酵了"`)
            return
        }
        event.player.mainHandItem.count--
        let mainIngredientFullId = event.player.mainHandItem.nbt.MainIngredient
        let mainIngredientIdPos = mainIngredientFullId.indexOf(":")
        let mainIngredientId = mainIngredientFullId.slice(mainIngredientIdPos + 1, mainIngredientIdPos + 20)
        var mainIngredientObject = main_ingredient.find((item) => item.id == `${mainIngredientId}`)

        let sideIngredientFullId = event.player.mainHandItem.nbt.SideIngredient
        let sideIngredientIdPos = sideIngredientFullId.indexOf(":")
        let sideIngredientId = sideIngredientFullId.slice(sideIngredientIdPos + 1, sideIngredientIdPos + 20)
        var sideIngredientObject = side_ingredient.find((item) => item.id == `${sideIngredientId}`)
        event.server.scheduleInTicks(2, function (callback0) {
            event.player.give(Item.of("kubejs:incomplete_wine_bottle")
                .withName({ "text": `未完成的 ${sideIngredientObject.name}风味瓶装${mainIngredientObject.name}酒`, "color": "white", "italic": false })
                .withLore({ "text": `发酵次数:${nowFerment + 1}`, "color": "white", "italic": false })
                .withLore({ "text": `蒸馏次数:${nowDistillation}`, "color": "white", "italic": false })
                .withLore({ "text": `陈化次数:${nowAging}`, "color": "white", "italic": false })
                .withNBT({ MainIngredient: mainIngredientObject.full_id })
                .withNBT({ SideIngredient: sideIngredientObject.full_id })
                .withNBT({ CustomModelData: mainIngredientObject.model_number })
                .withNBT({ Ferment: nowFerment + 1 })
                .withNBT({ Distillation: nowDistillation })
                .withNBT({ Aging: nowAging })
            )
        })
    }
})

BlockEvents.rightClicked("kubejs:distiller", event => { //蒸馏
    if (event.hand != "MAIN_HAND") { return }
    if (event.player.mainHandItem.id == "kubejs:incomplete_wine_bottle") {
        let playerName = event.player.name.getString()
        let nowFerment = event.player.mainHandItem.nbt.Ferment
        let nowDistillation = event.player.mainHandItem.nbt.Distillation
        let nowAging = event.player.mainHandItem.nbt.Aging
        if (nowAging != 0 || nowDistillation == 4) {
            event.server.runCommandSilent(`title ${playerName} actionbar "这瓶酒没法再蒸馏了"`)
            return
        }
        event.player.mainHandItem.count--
        let mainIngredientFullId = event.player.mainHandItem.nbt.MainIngredient
        let mainIngredientIdPos = mainIngredientFullId.indexOf(":")
        let mainIngredientId = mainIngredientFullId.slice(mainIngredientIdPos + 1, mainIngredientIdPos + 20)
        var mainIngredientObject = main_ingredient.find((item) => item.id == `${mainIngredientId}`)

        let sideIngredientFullId = event.player.mainHandItem.nbt.SideIngredient
        let sideIngredientIdPos = sideIngredientFullId.indexOf(":")
        let sideIngredientId = sideIngredientFullId.slice(sideIngredientIdPos + 1, sideIngredientIdPos + 20)
        var sideIngredientObject = side_ingredient.find((item) => item.id == `${sideIngredientId}`)
        event.server.scheduleInTicks(2, function (callback0) {
            event.player.give(Item.of("kubejs:incomplete_wine_bottle")
                .withName({ "text": `未完成的 ${sideIngredientObject.name}风味瓶装${mainIngredientObject.name}酒`, "color": "white", "italic": false })
                .withLore({ "text": `发酵次数:${nowFerment}`, "color": "white", "italic": false })
                .withLore({ "text": `蒸馏次数:${nowDistillation + 1}`, "color": "white", "italic": false })
                .withLore({ "text": `陈化次数:${nowAging}`, "color": "white", "italic": false })
                .withNBT({ MainIngredient: mainIngredientObject.full_id })
                .withNBT({ SideIngredient: sideIngredientObject.full_id })
                .withNBT({ CustomModelData: mainIngredientObject.model_number })
                .withNBT({ Ferment: nowFerment })
                .withNBT({ Distillation: nowDistillation + 1 })
                .withNBT({ Aging: nowAging })
            )
        })
    }
})

BlockEvents.rightClicked("kubejs:aging_container", event => { //陈化
    if (event.hand != "MAIN_HAND") { return }
    if (event.player.mainHandItem.id == "kubejs:incomplete_wine_bottle") {
        let playerName = event.player.name.getString()
        let nowFerment = event.player.mainHandItem.nbt.Ferment
        let nowDistillation = event.player.mainHandItem.nbt.Distillation
        let nowAging = event.player.mainHandItem.nbt.Aging
        if (nowAging == 4) {
            event.server.runCommandSilent(`title ${playerName} actionbar "这瓶酒没法再陈化了"`)
            return
        }
        event.player.mainHandItem.count--
        let mainIngredientFullId = event.player.mainHandItem.nbt.MainIngredient
        let mainIngredientIdPos = mainIngredientFullId.indexOf(":")
        let mainIngredientId = mainIngredientFullId.slice(mainIngredientIdPos + 1, mainIngredientIdPos + 20)
        var mainIngredientObject = main_ingredient.find((item) => item.id == `${mainIngredientId}`)

        let sideIngredientFullId = event.player.mainHandItem.nbt.SideIngredient
        let sideIngredientIdPos = sideIngredientFullId.indexOf(":")
        let sideIngredientId = sideIngredientFullId.slice(sideIngredientIdPos + 1, sideIngredientIdPos + 20)
        var sideIngredientObject = side_ingredient.find((item) => item.id == `${sideIngredientId}`)
        event.server.scheduleInTicks(2, function (callback0) {
            event.player.give(Item.of("kubejs:incomplete_wine_bottle")
                .withName({ "text": `未完成的 ${sideIngredientObject.name}风味瓶装${mainIngredientObject.name}酒`, "color": "white", "italic": false })
                .withLore({ "text": `发酵次数:${nowFerment}`, "color": "white", "italic": false })
                .withLore({ "text": `蒸馏次数:${nowDistillation}`, "color": "white", "italic": false })
                .withLore({ "text": `陈化次数:${nowAging + 1}`, "color": "white", "italic": false })
                .withNBT({ MainIngredient: mainIngredientObject.full_id })
                .withNBT({ SideIngredient: sideIngredientObject.full_id })
                .withNBT({ CustomModelData: mainIngredientObject.model_number })
                .withNBT({ Ferment: nowFerment })
                .withNBT({ Distillation: nowDistillation })
                .withNBT({ Aging: nowAging + 1 })
            )
        })
    }
})

/*
品质算法（服从正态分布）
均值算法：基础均值-Abs(主料风味系数-辅料风味系数)-[Abs(发酵次数-最佳发酵)+Abs(蒸馏次数-最佳蒸馏)+Abs(陈化次数-最佳陈化)]*0.2
标准差算法：基础标准差+陈化次数*0.1

等级设定
等级
| 1 | 2 | 3 | 4 | 5 |
基础均值
| 2 |2.5| 3 |3.5| 4 |
基础标准差
|0.8| 1 |1.2|1.4|1.6|

等级算法
等级
| 1 | 2 | 3 | 4 | 5 |
升级所需经验
| 5 |10 |15 |25 | - |
经验算法：{Abs(主料风味系数-辅料风味系数)-[Abs(发酵次数-最佳发酵)+Abs(蒸馏次数-最佳蒸馏)+Abs(陈化次数-最佳陈化)]*0.2}+品质
*/

BlockEvents.rightClicked("kubejs:lable_printer", event => { //贴标签
    if (event.hand != "MAIN_HAND") { return }
    if (event.player.mainHandItem.id == "kubejs:incomplete_wine_bottle") {
        //变量赋值
        let playerName = event.player.name.getString()
        let nowFerment = event.player.mainHandItem.nbt.Ferment
        let nowDistillation = event.player.mainHandItem.nbt.Distillation
        let nowAging = event.player.mainHandItem.nbt.Aging
        let mainIngredientFullId = event.player.mainHandItem.nbt.MainIngredient
        let mainIngredientIdPos = mainIngredientFullId.indexOf(":")
        let mainIngredientId = mainIngredientFullId.slice(mainIngredientIdPos + 1, mainIngredientIdPos + 20)
        var mainIngredientObject = main_ingredient.find((item) => item.id == `${mainIngredientId}`)
        let sideIngredientFullId = event.player.mainHandItem.nbt.SideIngredient
        let sideIngredientIdPos = sideIngredientFullId.indexOf(":")
        let sideIngredientId = sideIngredientFullId.slice(sideIngredientIdPos + 1, sideIngredientIdPos + 20)
        var sideIngredientObject = side_ingredient.find((item) => item.id == `${sideIngredientId}`)
        var date = new Date()
        //扣除物品
        event.player.mainHandItem.count--
        //如果第一次酿酒：初始化等级和经验值
        if (event.player.persistentData.wineXP == undefined) {
            event.player.persistentData.wineXP = 0
        }
        if (event.player.persistentData.wineLevel == undefined) {
            event.player.persistentData.wineLevel = 1
        }
        if (event.player.persistentData.wineXP == NaN) {
            event.player.persistentData.wineXP = 0
        }
        //获取玩家等级
        let nowLevel = brewingLevels.find((item) => item.level == event.player.persistentData.wineLevel)
        //计算品质
        let difficultyValue = 0
        if (sideIngredientId == "blank") { difficultyValue = 0 }
        else {
            difficultyValue = Math.abs(mainIngredientObject.flavor_factor - sideIngredientObject.flavor_factor)
        }
        let correctnessValue = (Math.abs(mainIngredientObject.best_aging - nowAging) + Math.abs(mainIngredientObject.best_distillation - nowDistillation) + Math.abs(mainIngredientObject.best_ferment - nowFerment))
        let mean = nowLevel.baseMean - difficultyValue - correctnessValue * 0.2
        let stdDev = nowLevel.baseStdDev + nowAging * 0.1
        let quality = 0
        quality = generateNormalDistribution(mean, stdDev).toFixed(2)
        let tquality = ""
        if (quality <= 0) { tquality = "差强人意" }
        else if (quality >= 5) { tquality = "完美无瑕" }
        else { tquality = quality }
        //归还贴过标签的酒
        event.server.scheduleInTicks(2, function (callback0) {
            event.player.give(Item.of("kubejs:wine_bottle")
                .withName({ "text": `${sideIngredientObject.name}风味瓶装${mainIngredientObject.name}酒`, "color": "white", "italic": false })
                .withLore({ "text": `这瓶酒历经${nowFerment}次发酵，${nowDistillation}次蒸馏，${nowAging}次陈化`, "color": "white", "italic": false })
                .withLore({ "text": `由${playerName}在${date.getFullYear()}.${date.getMonth() + 1}.${date.getDay() + 1}制作完成`, "color": "white", "italic": false })
                .withLore({ "text": `品质：${tquality}`, "color": "yellow", "italic": false })
                .withNBT({ MainIngredient: mainIngredientObject.full_id })
                .withNBT({ SideIngredient: sideIngredientObject.full_id })
                .withNBT({ CustomModelData: mainIngredientObject.model_number })
                .withNBT({ Ferment: nowFerment })
                .withNBT({ Distillation: nowDistillation })
                .withNBT({ Aging: nowAging })
            )
        })
        //提升玩家等级
        correctnessValue *= 0.2
        difficultyValue = difficultyValue.toFixed(2)
        let xpGain = Number(quality) + Number(difficultyValue) - Number(correctnessValue)
        let nowXP = event.player.persistentData.wineXP
        if (nowLevel.level != 5 && xpGain + nowXP >= nowLevel.promotionXP) { //如果玩家等级未满且经验足够升级
            event.player.persistentData.wineLevel = nowLevel.level + 1
            event.player.persistentData.wineXP = 0
            nowLevel = brewingLevels.find((item) => item.level == event.player.persistentData.wineLevel)
            event.player.tell({ "text": `你升级了！现在你的酿酒等级是：${nowLevel.title}级`, "color": "green" })
        } else {
            event.player.persistentData.wineXP = xpGain + nowXP

            event.player.tell({ "text": `这瓶酒的品质是：${tquality}，你距离下一级还差${(nowLevel.promotionXP - event.player.persistentData.wineXP).toFixed(2)}酿酒经验`, "color": "green" })
        }
    }
})

/*
醉酒异常：
>1:
10%几率打酒嗝
>2:
反胃I
20%几率打酒嗝
10%发言受到干扰
>3:
反胃II 缓慢I
20%几率说胡话
40%几率打酒嗝
20%发言受到干扰
>4:
反胃III 缓慢II
30%几率说胡话
50%几率打酒嗝
30%发言受到干扰
>5:
失明 缓慢255
无法正常发言
*/

PlayerEvents.chat(event => {
    if (event.player.persistentData.drunkCounter <= 0) return
    event.player.tell("聊天事件已触发")
    let nowDrunkLevel = Math.ceil(event.player.persistentData.drunkCounter / counterPerDrunkLevel)
    if (nowDrunkLevel >= 5) nowDrunkLevel = 5
    nowDrunkLevel--

    let originalText = event.getMessage()
    let drunkEffects = drunkLevels[nowDrunkLevel]
    event.player.tell(originalText)

    if (canHappen(drunkEffects.wrongMessage)) {
        originalText = wrongMessage()
    }
    if (canHappen(drunkEffects.disturbedMessage)) {
        originalText = disturbMessage(originalText)
    }
    if (canHappen(drunkEffects.burpChance)) {
        originalText = burp(originalText)
    }
    if (drunkEffects.canSendMessage == false) {
        originalText = "zzzZZZ..."
    }
    let player = event.player.name.getString()
    event.server.runCommandSilent(`execute at ${player} run tellraw @a [{"text":"• ","color":"green"},{"text":"<","color":"dark_gray"},{"text":"${player}","color":"gray"},{"text":">: ","color":"dark_gray"},{"text":"${originalText}","color":"white"}]`)
    event.cancel()
})

function burp(message) {
    let burpText = burpTexts[randint(0, burpTexts.length - 1)]
    return burpText + message
}

function disturbMessage(message) {
    let result = String(message)
    let splitIndex = randint(0, result.length - 1)
    let piece1 = result.slice(0, splitIndex)
    let piece2 = result.slice(splitIndex, result.length)
    let insert = ""
    if (canHappen(0.7)) {
        insert = drunkTexts[randint(0, drunkTexts.length - 1)]
    } else {
        insert = result.slice(splitIndex, randint(splitIndex, result.length - 1))
    }
    result = piece1 + insert + piece2
    return result
}

function wrongMessage() {
    return wrongTexts[randint(0, wrongTexts.length - 1)]
}

ItemEvents.foodEaten("kubejs:wine_bottle", event => {
    let addCounter = initAddDrunkCounter + Number(event.item.nbt.Distillation) * distillationAddDrunkCounter
    event.player.persistentData.drunkCounter += addCounter
    let nowDrunkLevel = Math.ceil(event.player.persistentData.drunkCounter / counterPerDrunkLevel)
    if (nowDrunkLevel >= 5) nowDrunkLevel = 5
    nowDrunkLevel--
    event.server.runCommandSilent(`title ${event.player.name.getString()} actionbar "${drunkHints[nowDrunkLevel]}"`)

    if(event.player.persistentData.drunkCounter > counterPerDrunkLevel*6){
        event.server.runCommandSilent(`kick ${event.player.name.getString()} 你醉得昏了过去`)
    }
})

ItemEvents.foodEaten(event => {
    if (event.item == "kubejs:wine_bottle" || event.player.persistentData.drunkCounter < 0) {
        return
    }
    event.player.persistentData.drunkCounter -= reliefDrunkCounter
    event.server.runCommandSilent(`title ${event.player.name.getString()} actionbar "醉意似乎缓解了一些"`)
})

PlayerEvents.tick(event => {
    if (!(event.player.persistentData.drunkCounter >= -10)) {
        event.player.persistentData.drunkCounter = -10
        return
    }
    event.player.persistentData.drunkCounter--
})

ServerEvents.loaded(event => {
    event.server.scheduleInTicks(10, function (callback0) {
        event.server.tell("来自kubejs的消息：服务器已重启！")
        console.log("来自kubejs的消息：服务器已重启！")
    })
    event.server.scheduleRepeatingInTicks(40, function (callback0) {
        let allPlayers = event.server.getPlayers()
        allPlayers.forEach(player => {
            if (player.persistentData.drunkCounter > 0) {
                let nowDrunkLevel = Math.ceil(player.persistentData.drunkCounter / counterPerDrunkLevel)
                if (nowDrunkLevel >= 5) nowDrunkLevel = 5
                nowDrunkLevel--
                let drunkEffects = drunkLevels[nowDrunkLevel].effects
                drunkEffects.forEach(element => {
                    if(element.id == "minecraft:nausea"){
                        player.potionEffects.add(element.id, 120, element.am, true, true)
                    }else{
                        player.potionEffects.add(element.id, 60, element.am, true, true)
                    }
                })
            }
        })
    })
})

EntityEvents.death(event => {
    event.entity.persistentData.remove("drunkCounter")
})