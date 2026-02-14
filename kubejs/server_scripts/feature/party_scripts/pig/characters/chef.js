

ItemEvents.rightClicked('kitchenkarrot:carrot_spices', event => {//1技能炒个菜
    if (event.hand != "MAIN_HAND") return
    if (!event.player.tags.contains("pig_eater")) return
    let player = event.player
    if (player.inventory.contains('kaleidoscope_cookery:oil')) {// 有油？
        for (let slot = 0; slot < 36; slot++) {
            let itemStack = player.inventory.getItem(slot) // 油-1
            if (itemStack.id === 'kaleidoscope_cookery:oil' && itemStack.count > characterSetting.chef.skill1Cost - 1) {
                itemStack.count -= Chef_resources_required[0]

                player.potionEffects.add('minecraft:slowness', 20, 255)//读条
                player.potionEffects.add('minecraft:mining_fatigue', 20, 3)
                event.server.scheduleInTicks(20, () => {
                    player.give(buff_food_list[randint(0, buff_food_list.length - 1)])

                    player.cooldowns.addCooldown('kitchenkarrot:carrot_spices', characterSetting.chef.skill1CD)
                })
                break
            }
        }
    } else {
        player.setStatusMessage("所需的油脂不足！")
    }
})

ItemEvents.rightClicked('kubejs:soy_bean_oil', event => {//2
    let player = event.player
    if (!player.tags.contains("pig_eater")) return
    if (player.mainHandItem.id != 'kubejs:soy_bean_oil') return
    if (player.getCooldowns().isOnCooldown(player.mainHandItem.id)) return

    try {
        let num = randint(characterSetting.chef.skill2Min, characterSetting.chef.skill2Max)
        event.player.tell(num)
        event.player.give(Item.of('kaleidoscope_cookery:oil',num))
    } catch (e) {
        event.player.tell(e)
    }

    //冷却
    player.addItemCooldown('kubejs:soy_bean_oil', characterSetting.chef.skill2CD)
})

//让玩家一直能吃东西
ItemEvents.rightClicked(event => {
    if (!event.item.edible) return
    if (!event.player.tags.contains("pig_eater")) return
    if (event.player.getNbt().getInt("foodLevel") == 20)
        event.player.mergeNbt(`{foodLevel:19}`)
})

ItemEvents.rightClicked('farmersdelight:skillet', event => {//3技能宴请八方
    let player = event.player
    if (!player.tags.contains("pig_eater")) return
    if (player.mainHandItem.id != 'farmersdelight:skillet') return
    if (player.getCooldowns().isOnCooldown(player.mainHandItem.id)) return

    //检测油脂并扣除
    let count = 0
    player.inventory.allItems.forEach(it => {
        if (it.id == 'kaleidoscope_cookery:oil') {
            count += it.count
        }
    })
    if (count < characterSetting.chef.ultraCost) {
        player.setStatusMessage("所需的油脂不足！")
        return
    }
    count = characterSetting.chef.ultraCost
    player.inventory.allItems.forEach(it => {
        if (it.id == 'kaleidoscope_cookery:oil') {
            if (it.count >= count) {
                it.count -= count
                count = 0
            } else {
                count -= it.count
                it.count = 0
            }
        }
    })

    //生效
    event.server.runCommandSilent(`particle immersive_weathering:flower_lesbian ${event.player.pos.x()} ${event.player.pos.y()} ${event.player.pos.z()} 0.5 1 0.5 1 200`)
    event.server.runCommandSilent(`particle immersive_weathering:flower_lesbian ${event.player.pos.x()} ${event.player.pos.y() + 0.5} ${event.player.pos.z()} 4 0.125 4 0 800`)
    event.level.getPlayers().forEach(pl => {
        if (pl.tags.contains("pig_eater")) {
            chefBuffList.forEach(it => {
                event.server.runCommandSilent(`effect give ${pl.name.getString()} ${it.id} ${characterSetting.chef.ultraDurationSeconds} ${it.am}`)
            })
        }
    })

    //冷却
    player.addItemCooldown('farmersdelight:skillet', characterSetting.chef.ultraCD)
})