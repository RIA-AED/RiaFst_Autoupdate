/*
疣猪兽标签：pigboss
玩家标签：pig_eater
服务器数据: isPigfightOn、pigFightStage、pigBossHealth
疣猪兽数据: isBehaving、isDisabled、canHurt
*/

BlockEvents.rightClicked("kubejs:nanako_sculpture", event => {
    if (event.hand != "MAIN_HAND") return
    if (!event.player.inventory.empty){
        event.player.setStatusMessage("你身上还有东西哦，请先存放下再尝试吧")
        return
    }
    if (!event.player.tags.contains("pig_eater")) {
        event.player.tags.add("pig_eater")
        event.player.tags.add("chef")
        event.player.setStatusMessage("欢迎报名年猪挑战！你的职业是：厨师")
    } else if (event.player.tags.contains("chef")) {
        event.player.tags.remove("chef")
        event.player.tags.remove("farmer")
        event.player.tags.add("engineer")
        event.player.setStatusMessage("职业更换为：工程师")
    } else if (event.player.tags.contains("farmer")) {
        event.player.tags.remove("engineer")
        event.player.tags.remove("farmer")
        event.player.tags.add("chef")
        event.player.setStatusMessage("职业更换为：厨师")
    } else if (event.player.tags.contains("engineer")) {
        event.player.tags.remove("chef")
        event.player.tags.remove("engineer")
        event.player.tags.add("farmer")
        event.player.setStatusMessage("职业更换为：农夫")
    }
    return
})

BlockEvents.rightClicked("kubejs:event_block_1", event => {
    if (event.hand != "MAIN_HAND") return
    if (!event.server.persistentData.isPigFightOn) {
        event.player.setStatusMessage("无需中途加入，请等待通知")
        return
    }
    if (!event.player.tags.contains("pig_eater")) {
        event.player.setStatusMessage("你还未选择职业，请先右键鱼子小雕")
        return
    }
    let name = event.player.name.getString()
    event.server.runCommandSilent(`execute as ${name} run clear @s`)
    event.server.runCommandSilent(`minecraft:spawnpoint ${name} ${event.server.persistentData.pigPosX} ${event.server.persistentData.pigPosY} ${event.server.persistentData.pigPosZ}`)
    event.server.runCommandSilent(`team join pig_eater ${name}`)
    event.server.runCommandSilent(`execute as ${name} run tp @s ${event.server.persistentData.pigPosX} ${event.server.persistentData.pigPosY} ${event.server.persistentData.pigPosZ}`)
    if (event.player.tags.contains("chef")) {
        pigEquipPlayer(event.player, characterEquips.chef)
    }
    if (event.player.tags.contains("engineer")) {
        pigEquipPlayer(event.player, characterEquips.engineer)
    }
    if (event.player.tags.contains("farmer")) {
        pigEquipPlayer(event.player, characterEquips.farmer)
    }
})

ItemEvents.rightClicked('kubejs:event_item_4', event => {
    if (!event.player.isCrouching()) return
    event.server.persistentData.pigPosX = Math.round(event.player.pos.x())
    event.server.persistentData.pigPosY = Math.round(event.player.pos.y())
    event.server.persistentData.pigPosZ = Math.round(event.player.pos.z())
    event.player.tell(`场地中心已设置为${event.server.persistentData.pigPosX},${event.server.persistentData.pigPosY},${event.server.persistentData.pigPosZ}`)
})

function pigEquipPlayer(player, equip) {
    if(!player.inventory.empty){
        player.setStatusMessage("你身上还有不属于活动的物品，已自动退出活动准备")
        player.tags.remove("pig_eater")
        player.tags.remove("chef")
        player.tags.remove("engineer")
        player.tags.remove("farmer")
    }
    try {
        player.allSlots.forEach(it => {
            it.count = 0
        })
        player.setItemSlot("head", equip.helmet.copy())
        player.setItemSlot("chest", equip.chest.copy())
        player.setItemSlot("legs", equip.leg.copy())
        player.setItemSlot("feet", equip.feet.copy())
        player.give(equip.mainHand.copy())
        equip.other.forEach(it => {
            player.give(it.copy())
        })
    } catch (e) {
        player.tell(e)
    }

}

/*
初始化战斗：
生成年猪
显示bossbar
剧情文本（待定）
调用控制函数
*/
ItemEvents.rightClicked('kubejs:event_item_4', event => {
    if (event.player.isCrouching()) return
    if (event.server.persistentData.isPigFightOn) return
    //设置bossbar
    event.server.runCommandSilent(`bossbar add pig_boss {"text":"愤怒的 年猪","color":"red"}`)
    event.server.runCommandSilent(`bossbar set minecraft:pig_boss style notched_6`)
    event.server.runCommandSilent(`bossbar set minecraft:pig_boss max ${pigHealthPerStage * 6}`)
    event.server.runCommandSilent(`bossbar set minecraft:pig_boss value ${pigHealthPerStage * 6}`)
    event.server.runCommandSilent(`bossbar set minecraft:pig_boss color red`)
    event.server.runCommandSilent(`bossbar set minecraft:pig_boss visible true`)
    let timer = 0
    event.server.runCommandSilent(`gamerule keepInventory true`)
    event.server.runCommandSilent(`team add pig_eater`)
    event.server.runCommandSilent(`team modify pig_eater friendlyFire false`)
    event.server.runCommandSilent(`team add pig`)
    event.server.runCommandSilent(`team modify pig friendlyFire false`)

    //玩家入场
    let players = event.server.getPlayers()
    players.forEach(it => {
        let name = it.name.getString()
        if (it.tags.contains("pig_eater")) {
            event.server.runCommandSilent(`execute as ${name} run clear @s`)
            event.server.runCommandSilent(`minecraft:spawnpoint ${name} ${event.server.persistentData.pigPosX} ${event.server.persistentData.pigPosY} ${event.server.persistentData.pigPosZ}`)
            event.server.runCommandSilent(`team join pig_eater ${name}`)
            event.server.runCommandSilent(`execute as ${name} run tp @s ${event.server.persistentData.pigPosX} ${event.server.persistentData.pigPosY} ${event.server.persistentData.pigPosZ}`)
            if (it.tags.contains("chef")) {
                pigEquipPlayer(it, characterEquips.chef)
            }
            if (it.tags.contains("engineer")) {
                pigEquipPlayer(it, characterEquips.engineer)
            }
            if (it.tags.contains("farmer")) {
                pigEquipPlayer(it, characterEquips.farmer)
            }
        }
    })


    //广播年猪出生前剧情
    timer += pigLoreBoardcast(event, pigLores.start, 40)
    let pigBoss = event.level.createEntity("minecraft:hoglin")
    //生成年猪(无法移动)
    event.server.scheduleInTicks(timer, func => {

        pigBoss.setNbt({
            Attributes: [{ Name: "generic.attackDamage", Base: 20 },
            { Name: "generic.maxHealth", Base: 10000 },
            { Name: "generic.knockbackResistance", Base: 1 },
            { Name: "generic.followRange", Base: 60 },
            { Name: "generic.armor", Base: 15 },
            { Name: "generic.armorToughness", Base: 5 }],
            IsImmuneToZombification: true,
            PersistenceRequired: true
        })
        pigBoss.setGlowing(true)
        pigBoss.setCustomName({ text: "年猪", color: "red" })
        pigBoss.tags.add("pigboss")
        event.server.runCommandSilent(`bossbar`)
        pigBoss.setPos(event.server.persistentData.pigPosX, pigSpawnHeight, event.server.persistentData.pigPosZ)
        pigBoss.spawn()
        event.server.runCommandSilent(`effect give @e[tag=pigboss] minecraft:resistance infinite 4 true`)
        event.server.runCommandSilent(`team join pig @e[tag=pigboss]`)
        event.server.runCommandSilent(`effect give @e[tag=pigboss] minecraft:slowness infinite 255 true`)
        //初始化data
        event.server.persistentData.isPigFightOn = true
        event.server.persistentData.pigBossHealth = pigHealthPerStage * 6
        event.server.persistentData.pigFightStage = 1
    })
    //等待
    timer += 20
    //显示标题和bossbar,播放音效
    event.server.scheduleInTicks(timer, func => {
        event.server.runCommandSilent(`title @a title [{"text":"⚠","color":"red"},{"text":"年猪已空投","color":"red","bold":true},{"text":"⚠","color":"red"}]`)
        event.server.runCommandSilent(`bossbar set minecraft:pig_boss players @a`)
        event.server.runCommandSilent(`bossbar set minecraft:pig_boss value ${pigHealthPerStage * 6}`)
        event.server.runCommandSilent(`playsound minecraft:entity.hoglin.death hostile @a 0 0 0 2 0.6 1`)
        event.server.runCommandSilent(`playsound minecraft:entity.hoglin.death hostile @a 0 0 0 2 0.8 1`)
        event.server.runCommandSilent(`playsound minecraft:entity.hoglin.death hostile @a 0 0 0 2 1 1`)
        event.server.runCommandSilent(`playsound minecraft:entity.hoglin.death hostile @a 0 0 0 2 0.7 1`)
        event.server.runCommandSilent(`playsound minecraft:entity.hoglin.death hostile @a 0 0 0 2 1.5 1`)
    })
    //开始！
    event.server.scheduleInTicks(timer, func => {
        event.server.runCommandSilent(`effect clear @e[tag=pigboss] minecraft:slowness`)
        //初始化data
        event.server.persistentData.isPigFightOn = true
        event.server.persistentData.pigBossHealth = pigHealthPerStage * 6
        event.server.persistentData.pigFightStage = 1
        pigController(pigBoss, event.level, event.server)
    })
})

/**
*技能控制函数
*@param {Internal.Entity} pigEntity 年猪实体
*@param {Internal.Level} level 世界
*@param {Internal.MinecraftServer} server 服务器
*/
function pigController(pigEntity, level, server) {
    server.scheduleInTicks(pigSkillsIntervalTicks, func => {
        try {
            if (!server.persistentData.isPigFightOn) return
            if (!pigEntity.nbt.getBoolean("isDisabled")) {
                let stage = server.persistentData.pigFightStage
                let livingPig = server.getEntities().find(e => e.tags.contains("pigboss"))

                server.tell(`${pigStageNames[stage - 1]}：*吼叫*`)
                switch (stage) {
                    case 1: {
                        let skill = randint(1, 2)
                        if (skill == 1) {
                            pig$chototsuMoushin(livingPig, level, server, {})
                        }
                        if (skill == 2) {
                            pig$skillTremble(pigEntity, level, server, {
                                maxRadius: 10,
                                damage: 20
                            })
                        }
                        break
                    }
                    case 2: {
                        let skill = randint(1, 2)
                        if (skill == 1) {
                            pig$lazerStrike(livingPig, level, server, {
                                damage: 20
                            })
                        }
                        if (skill == 2) {
                            pig$lightningExplode(livingPig, level, server, {})
                        }
                        break
                    }
                    case 3: {
                        pig$spawnPiglin(livingPig, level, server, 20, randint(4, 8))
                        server.runCommandSilent(`team join pig @e[tag=pig]`)
                        break
                    }
                    case 4: {
                        let skill = randint(1, 4)
                        if (skill == 1) {
                            pig$chototsuMoushin(livingPig, level, server, {})
                        }
                        if (skill == 2) {
                            pig$skillTremble(pigEntity, level, server, {
                                maxRadius: 10,
                                damage: 20,
                            })
                        }
                        if (skill == 3) {
                            pig$lazerStrike(livingPig, level, server, {
                                damage: 30
                            })
                        }
                        if (skill == 4) {
                            pig$lightningExplode(livingPig, level, server, {})
                        }
                        break
                    }
                    case 5: {
                        let skill = randint(1, 3)
                        if (skill == 1) {
                            pig$lazerStrike(livingPig, level, server, {
                                damage: 30
                            })
                        }
                        if (skill == 2) {
                            pig$lightningExplode(livingPig, level, server, {})
                        }
                        if (skill == 3) {
                            pig$spawnPiglin(livingPig, level, server, 20, randint(2, 6))
                            server.runCommandSilent(`team join pig @e[tag=pig]`)
                        }
                        break
                    }
                    case 6: {
                        let skill = randint(1, 5)
                        if (skill == 1) {
                            pig$chototsuMoushin(livingPig, level, server, {})
                        }
                        if (skill == 2) {
                            pig$skillTremble(pigEntity, level, server, {
                                maxRadius: 15,
                                damage: 30,
                            })
                        }
                        if (skill == 3) {
                            pig$lazerStrike(livingPig, level, server, {
                                targetCount: 5,
                                damage: 30
                            })
                        }
                        if (skill == 4) {
                            pig$lightningExplode(livingPig, level, server, {})
                        }
                        if (skill == 5) {
                            pig$spawnPiglin(livingPig, level, server, 20, randint(4, 8))
                            server.runCommandSilent(`team join pig @e[tag=pig]`)
                        }
                    }
                }
            }
        } catch (e) {
            server.tell(e)
        }
        pigController(pigEntity, level, server)
    })

}

EntityEvents.hurt("minecraft:hoglin", event => {
    if (!event.entity.tags.contains("pigboss")) return
    if (event.entity.persistentData.contains("canHurt") && !event.entity.persistentData.canHurt) {
        //判断阶段
        let nowSupposeStage = 6 - Math.floor(event.server.persistentData.pigBossHealth / pigHealthPerStage)
        pigSwitchStage(event, nowSupposeStage)

        event.server.runCommandSilent(`bossbar set minecraft:pig_boss value ${event.server.persistentData.pigBossHealth}`)
        return
    }
    if (!event.getSource().getPlayer() || !event.getSource().getPlayer().tags.contains("pig_eater")) return

    let player = event.getSource().getPlayer()
    let mainHandItem = player.mainHandItem.id
    pigDamageWeapons.forEach(it => {
        if (it.id == mainHandItem) {
            if (player.getCooldowns().isOnCooldown(mainHandItem) && mainHandItem != "create:potato_cannon") return

            event.server.runCommandSilent(`particle minecraft:crit ${event.entity.pos.x()} ${event.entity.pos.y() + 0.5} ${event.entity.pos.z()} 0.5 0.5 0.5 0.5 40`)
            event.server.persistentData.pigBossHealth -= it.damage
            if (!player.persistentData.contains("pigDamage")) player.persistentData.pigDamage = 0
            player.persistentData.pigDamage += it.damage
            if (canHappen(it.dropChance)) {
                player.give(it.dropItem.copy())
            }
            //判断死亡
            if (event.server.persistentData.pigBossHealth <= 0) {
                pigDeath(event)
            }
            //判断阶段
            let nowSupposeStage = 6 - Math.floor(event.server.persistentData.pigBossHealth / pigHealthPerStage)
            pigSwitchStage(event, nowSupposeStage)

            event.server.runCommandSilent(`bossbar set minecraft:pig_boss value ${event.server.persistentData.pigBossHealth}`)
        }
    })
})

EntityEvents.hurt("minecraft:hoglin", event => {
    if (!event.entity.tags.contains("pigboss")) return
    if (event.getSource().getType() != "fall" || event.getDamage() <= 8) return
    let strength = event.getDamage() * pigFallExplodeValues.index
    if (strength < pigFallExplodeValues.min) strength = pigFallExplodeValues.min
    if (strength > pigFallExplodeValues.max) strength = pigFallExplodeValues.max
    let explosion = event.entity.block.createExplosion()
    explosion.strength(strength)
    explosion.explode()
})

EntityEvents.death("minecraft:piglin", event => {
    if (!event.entity.tags.contains("pig")) return
    if (event.server.persistentData.pigFightStage != 3) return
    event.server.persistentData.pigBossHealth -= piglinDeathCostHealth
    event.server.runCommandSilent(`execute as @e[tag=pigboss] run damage @s 1`)
})

EntityEvents.hurt("minecraft:piglin", event => {
    if (!event.entity.tags.contains("pig")) return
    if (!event.getSource().getPlayer() || !event.getSource().getPlayer().tags.contains("pig_eater")) return
    let player = event.getSource().getPlayer()
    let mainHandItem = player.mainHandItem.id
    pigDamageWeapons.forEach(it => {
        if (it.id == mainHandItem) {
            if (player.getCooldowns().isOnCooldown(mainHandItem) && mainHandItem != "create:potato_cannon") return

            event.server.runCommandSilent(`particle minecraft:crit ${event.entity.pos.x()} ${event.entity.pos.y() + 0.5} ${event.entity.pos.z()} 0.5 0.5 0.5 0.5 40`)
            event.entity.health -= it.damage

            if (event.entity.health <= it.damage) {
                event.entity.kill()
            }
        }
    })
})

/**
 * 年猪转阶段
 * @param {Internal.LivingEntityHurtEventJS} event
 *        事件对象
 * @param {number} newStage
 *        新阶段
 */
function pigSwitchStage(event, newStage) {
    try {
        if (newStage <= event.server.persistentData.pigFightStage) return
        //修改数据
        event.server.persistentData.pigFightStage = newStage
        event.server.runCommandSilent(`bossbar set pig_boss name {"text":"${pigStageNames[newStage - 1]}","color":"red"}`)
        let timer = 0
        //剧情
        pigLoreBoardcast(event, pigLores.stages[newStage - 2], 30)
        //无敌、生成爆炸
        event.entity.persistentData.canHurt = false
        let explosion = event.entity.block.createExplosion()
        explosion.strength(1)
        explosion.explode()
        event.entity.potionEffects.add("minecraft:levitation", 15 * newStage, 0)
        timer += 15 * newStage
        event.server.scheduleInTicks(timer, func => {

            if (newStage == 3) {
                event.server.runCommandSilent(`effect give @e[tag=pigboss] minecraft:slowness infinite 255 true`)
            } else {
                event.server.runCommandSilent(`effect clear @e[tag=pigboss] minecraft:slowness`)
                event.entity.persistentData.canHurt = true
            }


            event.server.runCommandSilent(`title @a subtitle {"text":"${pigStageNames[newStage - 1]}","color":"red"}`)
            event.server.runCommandSilent(`title @a title {"text":""}`)
        })
    }
    catch (e) {
        event.server.tell(e)
    }
}

/**
 * 年猪死亡
 * @param {Internal.LivingEntityHurtEventJS} event
 *        事件对象
 */
function pigDeath(event) {
    //数据设置
    event.server.persistentData.pigBossHealth = 0
    event.server.runCommandSilent(`bossbar remove pig_boss`)
    event.server.runCommandSilent(`team remove pig`)
    event.server.runCommandSilent(`team remove pig_eater`)
    event.server.runCommandSilent(`tag @a remove pig_eater`)
    event.server.runCommandSilent(`tag @a remove chef`)
    event.server.runCommandSilent(`tag @a remove engineer`)
    event.server.runCommandSilent(`tag @a remove farmer`)
    event.server.persistentData.isPigFightOn = false

    event.entity.persistentData.canHurt = false
    event.entity.potionEffects.add("minecraft:levitation", 120, 2)
    pigLoreBoardcast(event, pigLores.death, 30)


    event.server.scheduleInTicks(100, func => {
        let explosion = event.entity.block.createExplosion()
        explosion.strength(6)
        explosion.explode()
    })
    event.server.scheduleInTicks(105, func => {
        let explosion = event.entity.block.createExplosion()
        explosion.strength(6)
        explosion.explode()
    })
    event.server.scheduleInTicks(110, func => {
        let explosion = event.entity.block.createExplosion()
        explosion.strength(6)
        explosion.explode()
    })
    event.server.scheduleInTicks(120, func => {
        pigRewardItems.forEach(it => {
            let itemE = event.level.createEntity("minecraft:item")
            itemE.mergeNbt(`{Item:{id:"${it.id}",Count:${it.count}b,Damage:0s}}`)
            itemE.glowing = true
            itemE.invulnerable = true
            itemE.setPos(event.entity.pos.x(), event.entity.pos.y(), event.entity.pos.z())
            itemE.spawn()
        })
        event.entity.kill()

        event.server.runCommandSilent(`execute as @e[tag=pig] run kill @s`)
    })
}

//玩家攻击
ItemEvents.firstLeftClicked(event => {
    if (event.hand != "MAIN_HAND") return
    if (!event.player.tags.contains("pig_eater")) return
    let mainHandItem = event.player.mainHandItem.id
    if (event.player.getCooldowns().isOnCooldown(mainHandItem)) return
    if (!event.player.persistentData.get("attackCooldownIndex")) {
        event.player.persistentData.attackCooldownIndex = 1
    }

    pigDamageWeapons.forEach(it => {
        if (it.id == mainHandItem) {
            event.player.addItemCooldown(it.id, it.coolDownTick * event.player.persistentData.attackCooldownIndex)
        }
    })
})

//测试用
ItemEvents.rightClicked('kubejs:event_item_3', event => {
    const { level, target, server, player } = event
    const block = player.rayTrace((player.getAttributeTotalValue("forge:block_reach") || 0) + (player.isCreative() ? 0.5 : 0), false).block
    if (block == null) return

    const ROCK_TYPE_KEYS = Object.keys(structureType$ROCK_TYPES)
    const randomKey = ROCK_TYPE_KEYS[Math.floor(Math.random() * ROCK_TYPE_KEYS.length)]
    const randomRockType = structureType$ROCK_TYPES[randomKey]
    pig$spawnStructure(level, server, block.pos, randomRockType, 0.3, 100, 0.3)
})



ItemEvents.rightClicked('kubejs:event_item_2', event => {
    const { level, target, server, player } = event
    const boss = server.getEntities().find(e => e.tags.contains("pigboss"))
    if (boss && boss.isAlive()) {
        pig$skillTremble(boss, level, server, {
            maxRadius: 15,
            damage: 12,
            knockback: 2.0,
            knockUp: 0.5,
            soundVolume: 5.0,
            soundPitch: 0.5
        })
    } else {
        player.tell("§c[年猪]当前没有存活的年猪兽！")
    }
})

ItemEvents.rightClicked('kubejs:event_item_1', event => {
    const { level, target, server, player } = event
    const boss = server.getEntities().find(e => e.tags.contains("pigboss"))
    if (boss && boss.isAlive()) {
        pig$chototsuMoushin(boss, level, server, {})
    } else {
        player.tell("§c[年猪]当前没有存活的年猪兽！")
    }
})

ItemEvents.rightClicked('kubejs:golden_skillet', event => {
    const { level, target, server, player } = event
    const boss = server.getEntities().find(e => e.tags.contains("pigboss"))
    if (boss && boss.isAlive()) {
        pig$lazerStrike(boss, level, server, {})
    } else {
        player.tell("§c[年猪]当前没有存活的年猪兽！")
    }
})

ItemEvents.rightClicked('kubejs:multiple_firecrackers', event => {
    const { level, target, server, player } = event
    const boss = server.getEntities().find(e => e.tags.contains("pigboss"))
    if (boss && boss.isAlive()) {
        pig$lightningExplode(boss, level, server, {})
    } else {
        player.tell("§c[年猪]当前没有存活的年猪兽！")
    }
})