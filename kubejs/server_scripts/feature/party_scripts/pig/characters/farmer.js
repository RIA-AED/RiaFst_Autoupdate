ItemEvents.rightClicked("minecraft:feather", event => {
    if (!event.player.tags.contains("pig_eater")) return
    if (event.player.getCooldowns().isOnCooldown("minecraft:feather")) return

    event.player.potionEffects.add("minecraft:speed", 3, 40)

    event.player.addItemCooldown("minecraft:feather", characterSetting.farmer.skill1CD)
})

ItemEvents.rightClicked('minecraft:bucket', event => {
    if (!event.player.tags.contains("pig_eater")) return
    if (event.player.getCooldowns().isOnCooldown('kaleidoscope_cookery:scarecrow')) return

    event.player.potionEffects.add("minecraft:resistance", characterSetting.farmer.skill2Duration, 4)

    event.player.addItemCooldown('minecraft:bucket', characterSetting.farmer.skill2CD)
})

EntityEvents.hurt("minecraft:player", event => {
    if (!event.player.tags.contains("pig_eater")) return
    let level = 0
    event.player.potionEffects.active.forEach(it => {
        if (it.descriptionId == "effect.minecraft.resistance") {
            level = it.amplifier
        }
    })
    if (level != 4) return
    event.server.runCommandSilent(`playsound minecraft:block.anvil.land voice ${event.player.name.getString()} ~ ~ ~ 1 1.2 1`)
    event.player.cooldowns.removeCooldown('minecraft:bucket')
})

EntityEvents.hurt(event => {
    if (!event.entity.tags.contains("pigboss") && !event.entity.tags.contains("pigtiny")) return
    if (!event.getSource().getPlayer() || !event.getSource().getPlayer().tags.contains("pig_eater")) return
    let player = event.getSource().getPlayer()
    if (player.mainHandItem.id != 'kaleidoscope_cookery:sickle') return
    if (player.getCooldowns().isOnCooldown(player.mainHandItem.id)) return

    if (!player.persistentData.contains("pigFarmerUltraCount")) {
        player.persistentData.pigFarmerUltraCount = 0
    }
    player.potionEffects.add("minecraft:instant_health", 1, characterSetting.farmer.ultraStrength)
    let nowCount = player.persistentData.pigFarmerUltraCount
    nowCount++
    if (nowCount >= characterSetting.farmer.ultraCount) {
        nowCount = 0
        player.addItemCooldown('kaleidoscope_cookery:sickle', characterSetting.farmer.ultraCD)
    }
    player.persistentData.pigFarmerUltraCount = nowCount
    player.mainHandItem.damageValue = (2000 / characterSetting.farmer.ultraCount) * nowCount - 20

})