
//小技能1：工业齿轮

ItemEvents.rightClicked('immersive_aircraft:industrial_gears', event => {
    if (event.hand != "MAIN_HAND") return;
    if (!event.player.tags.contains("pig_eater")) return;
    try {
        event.player.potionEffects.add("minecraft:speed", characterSetting.engineer.skill1Duration, 2)
        event.player.potionEffects.add("minecraft:jump_boost", characterSetting.engineer.skill1Duration, 1)
        event.player.persistentData.attackCooldownIndex = 0.2
        event.server.scheduleInTicks(characterSetting.engineer.skill1Duration, func => {
            event.player.persistentData.attackCooldownIndex = 1
        })
        event.player.addItemCooldown('immersive_aircraft:industrial_gears', characterSetting.engineer.skill1CD)
    } catch (e) {
        event.player.tell(e)
    }
})

//小技能2：坚固板

ItemEvents.rightClicked("create:sturdy_sheet", event => {
    if (event.hand != "MAIN_HAND") return;
    if (!event.player.tags.contains("pig_eater")) return;
    try {
        event.player.potionEffects.add("minecraft:resistance", characterSetting.engineer.skill2Duration, 1)
        event.player.potionEffects.add("minecraft:slowness", characterSetting.engineer.skill2Duration, 0)
        event.player.potionEffects.add("minecraft:absorption", characterSetting.engineer.skill2Duration * 1.5, 2)
        event.player.addItemCooldown("create:sturdy_sheet", characterSetting.engineer.skill2CD)
    } catch (e) {
        event.player.tell(e)
    }

})

//终极技能：土豆加农炮

ItemEvents.rightClicked('create:potato_cannon', event => {
    if (event.hand != "MAIN_HAND") return;
    if (!event.player.tags.contains("pig_eater")) return;
    event.server.scheduleInTicks(1, func => {
        if (event.player.mainHandItem != "create:potato_cannon") {
            event.player.giveInHand("create:potato_cannon")
            event.player.addItemCooldown("create:potato_cannon", characterSetting.engineer.potatoCannonReloadTicks)
        }
    })
})

BlockEvents.rightClicked(event => {
    if (event.hand != "MAIN_HAND") return;
    if (!event.player.tags.contains("pig_eater")) return;
    if (event.player.mainHandItem.id != "create:potato_cannon") return
    event.server.scheduleInTicks(1, func => {
        if (event.player.mainHandItem != "create:potato_cannon") {
            event.player.giveInHand("create:potato_cannon")
            event.player.addItemCooldown("create:potato_cannon", characterSetting.engineer.potatoCannonReloadTicks)
        }
    })
})