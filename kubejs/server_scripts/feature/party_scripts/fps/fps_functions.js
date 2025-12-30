function warp(event) { //跨服传送
    let name = event.player.name.getString()
    if (event.block.pos.x == serverWarpPos.x && event.block.pos.y == serverWarpPos.y && event.block.pos.z == serverWarpPos.z) {
        event.player.runCommandSilent(`server battlefield`)
        event.player.runCommandSilent(`server pioneer`)
    }
    if (event.block.pos.x == lobbyWarpPos.x && event.block.pos.y == lobbyWarpPos.y && event.block.pos.z == lobbyWarpPos.z) {
        event.player.runCommandSilent(`warp spawn`)
    }
    if (event.block.pos.x == spawnWarpPos.x && event.block.pos.y == spawnWarpPos.y && event.block.pos.z == spawnWarpPos.z) {
        event.server.runCommandSilent(`tp ${name} ${lobbyWarpPos.x - 2} ${lobbyWarpPos.y} ${lobbyWarpPos.z}`)
    }
}

function info(event) { //关于信息
    let name = event.player.name.getString()
    event.player.tell("————————————关于————————————")
    event.player.tell("RiaFST:Battlefield_v2.0")
    event.player.tell("地图提供:ignis及全体夜莺港居民")
    event.player.tell("脚本编写:liziluyu")
    event.player.tell("运维支持:Accelerant,ignis")
    event.player.tell(`测试:liziluyu,viper87,ykl,还有正在游玩的${name}`)
    event.player.tell("————————————————————————————")
}

function nanakoMain(event) { //鱼子小雕主函数
    event.player.addTag("type4") //给予初始职业
    if (event.server.persistentData.isGameOn == true) { //如果游戏已在进行
        midJoining(event) //判断是否在大厅并中途加入
    } else { //游戏未在进行
        preJoining(event) //加入队伍
    }
}

function midJoining(event) { //游戏中途选择队伍并加入
    if (event.player.teamId == "nanako" || event.player.teamId == "riako") {
        event.server.runCommandSilent(`title @a[name=${name}] actionbar "你已经加入了一支队伍"`)
    } else {
        let name = event.player.name.getString()
        let distance = Math.abs(event.player.getX() - lobbyPos.x) + Math.abs(event.player.getZ() - lobbyPos.z)
        if (distance >= gameSettings.maxLobbyDistance) { //如果在大厅之外右键鱼子小雕
            event.server.runCommandSilent(`title @a[name=${name}] actionbar "你不能在比赛中途更改队伍！"`)
            return
        }
        //在大厅右键
        //设置title/bossbar
        event.server.runCommandSilent(`title @a[name=${name}] times 2 40 2`)
        event.server.runCommandSilent(`tag @a[name=${name}] add fps_player`)
        event.server.runCommandSilent(`bossbar set riako_progress players @a[tag=fps_player]`)
        event.server.runCommandSilent(`bossbar set nanako_progress players @a[tag=fps_player]`)
        event.server.runCommandSilent(`title @a[name=${name}] actionbar "一场比赛正在进行！"`)
        //计算两队玩家数量并加入
        let nanakoCount = event.server.persistentData.nanakoCount
        let riakoCount = event.server.persistentData.riakoCount
        let nowStage = event.server.persistentData.stage
        let nowSpawnPointA
        let nowSpawnPointB
        switch (nowStage) {
            case 1:
                nowSpawnPointA = SpawnA1
                nowSpawnPointB = SpawnB1
                break
            case 2:
                nowSpawnPointA = SpawnA2
                nowSpawnPointB = SpawnB2
                break
            case 3:
                nowSpawnPointA = SpawnA3
                nowSpawnPointB = SpawnB3
                break
            case 4:
                nowSpawnPointA = SpawnA4
                nowSpawnPointB = SpawnB4
                break
            case 5:
                nowSpawnPointA = SpawnA5
                nowSpawnPointB = SpawnB5
                break
        }
        if (nanakoCount >= riakoCount) {
            event.server.runCommandSilent(`team join riako ${name}`)
            event.server.runCommandSilent(`title @a[name=${name}] title [{"text":"你加入了莉娅队","color":"red"}]`)
            event.server.runCommandSilent(`spawnpoint @a[name=${name}] ${nowSpawnPointA.x} ${nowSpawnPointA.y} ${nowSpawnPointA.z}`)
            event.server.persistentData.riakoCount++
            riakoCount++
        } else {
            event.server.runCommandSilent(`team join nanako ${name}`)
            event.server.runCommandSilent(`title @a[name=${name}] title [{"text":"你加入了鱼子队","color":"aqua"}]`)
            event.server.runCommandSilent(`spawnpoint @a[name=${name}] ${nowSpawnPointB.x} ${nowSpawnPointB.y} ${nowSpawnPointB.z}`)
            event.server.persistentData.nanakoCount++
            nanakoCount++
        }
        event.server.runCommandSilent(`title @a[name=${name}] subtitle [{"text":"目前玩家："},{"text":"${nanakoCount}","color":"aqua"},{"text":"/"},{"text":"${riakoCount}","color":"red"}]`)
        //告知其他玩家新玩家加入
        event.server.runCommandSilent(`title @a[tag=fps_player] actionbar [{"text":"新玩家加入！目前玩家："},{"text":"${nanakoCount}","color":"aqua"},{"text":"/"},{"text":"${riakoCount}","color":"red"}]`)
        event.server.scheduleInTicks(20, function (callback0) {
            event.server.runCommandSilent(`kill @a[name=${name}]`) //tp玩家至重生点
        })
    }
}

function preJoining(event) { //游戏未进行时选择队伍
    let name = event.player.name.getString()
    if (event.player.teamId == "nanako" || event.player.teamId == "riako") {
        event.server.runCommandSilent(`title @a[name=${name}] actionbar "你已经加入了一支队伍"`)
    } else {
        let nanakoCount = event.server.persistentData.nanakoCount
        let riakoCount = event.server.persistentData.riakoCount
        if (nanakoCount >= riakoCount) {
            event.server.runCommandSilent(`team join riako ${name}`)
            event.server.runCommandSilent(`title @a[name=${name}] title [{"text":"你加入了莉娅队","color":"red"}]`)
            event.server.persistentData.riakoCount++
            riakoCount++
        } else {
            event.server.runCommandSilent(`team join nanako ${name}`)
            event.server.runCommandSilent(`title @a[name=${name}] title [{"text":"你加入了鱼子队","color":"aqua"}]`)
            event.server.persistentData.nanakoCount++
            nanakoCount++
        }
        event.server.runCommandSilent(`title @a[team=riako] subtitle [{"text":"目前玩家："},{"text":"${nanakoCount}","color":"aqua"},{"text":"/"},{"text":"${riakoCount}","color":"red"}]`)
        event.server.runCommandSilent(`title @a[team=nanako] subtitle [{"text":"目前玩家："},{"text":"${nanakoCount}","color":"aqua"},{"text":"/"},{"text":"${riakoCount}","color":"red"}]`)
    }
}

function professionChange(event) { //更换职业
    let name = event.player.name.getString()
    let typeNumPos = event.player.tags.toString().indexOf("type") + 4
    let typeNum = Number(event.player.tags.toString().slice(typeNumPos, typeNumPos + 1))
    event.server.runCommandSilent(`tag @a[name=${name}] remove type1`)
    event.server.runCommandSilent(`tag @a[name=${name}] remove type2`)
    event.server.runCommandSilent(`tag @a[name=${name}] remove type3`)
    event.server.runCommandSilent(`tag @a[name=${name}] remove type4`)
    event.server.runCommandSilent(`tag @a[name=${name}] remove type5`)
    event.server.runCommandSilent(`tag @a[name=${name}] remove type6`)
    event.server.runCommandSilent(`tag @a[name=${name}] remove typeNaN`)
    if (typeNum == -1 || typeNum == 6 || typeNum == NaN) { //如果玩家未选择职业：自动更换到职业1
        typeNum = 1
        event.server.runCommandSilent(`tag @a[name=${name}] add type${typeNum}`)
    } else {
        typeNum += 1
        event.server.runCommandSilent(`tag @a[name=${name}] add type${typeNum}`)
    }
    let eqiupName
    switch (typeNum) {
        case 1:
            eqiupName = "医疗兵"
            break
        case 2:
            eqiupName = "掷弹兵"
            break
        case 3:
            eqiupName = "狙击手"
            break
        case 4:
            eqiupName = "突破手"
            break
        case 5:
            eqiupName = "步枪手"
            break
        case 6:
            eqiupName = "工程兵"
            break
    }
    event.server.runCommandSilent(`title @a[name=${name}] actionbar "职业已更换为：${eqiupName}"`)
}

function wrenchMain(event, player) { //扳手主函数
    let name = player.name.getString()
    let nowStage = event.server.persistentData.stage
    let nowTargetPos
    switch (nowStage) {
        case 1:
            nowTargetPos = targetPos1
            break
        case 2:
            nowTargetPos = targetPos2
            break
        case 3:
            nowTargetPos = targetPos3
            break
        case 4:
            nowTargetPos = targetPos4
            break
        case 5:
            nowTargetPos = targetPos5
            break
    }
    if (Math.abs(player.getY() - nowTargetPos.y) > 7) { return }

    let distance = Math.abs(player.getX() - nowTargetPos.x) + Math.abs(player.getZ() - nowTargetPos.z)
    if (distance <= gameSettings.maxWrenchDistance) {
        if (player.teamId == "riako") {
            if (event.server.persistentData.progress == 101) {
                switchBossbar(event, "riako")
                event.server.runCommandSilent(`team join riako @e[tag=target]`)
                event.server.runCommandSilent(`title @a[team=nanako] title [{"text":"区域即将失守！","color":"aqua"}]`)
                event.server.runCommandSilent(`title @a[team=nanako] subtitle [{"text":"对方剩余生命：${event.server.persistentData.respawnCount}","color":"grey"}]`)
            }
            if (event.server.persistentData.progress == 1) {
                switchStage(event, player)
            }
            event.server.persistentData.progress--
            syncBossbar(event)
            event.server.runCommandSilent(`title @a[name=${name}] actionbar "正在占领！"`)
        }
        if (player.teamId == "nanako") {
            if (event.server.persistentData.progress == 99) {
                switchBossbar(event, "nanako")
                event.server.runCommandSilent(`team join nanako @e[tag=target]`)
                event.server.runCommandSilent(`title @a[team=riako] title [{"text":"区域即将被夺回！","color":"red"}]`)
                event.server.runCommandSilent(`title @a[team=riako] subtitle [{"text":"队伍剩余生命：${event.server.persistentData.respawnCount}","color":"grey"}]`)
            }
            if (event.server.persistentData.progress == 200) {
                event.server.runCommandSilent(`title @a[name=${name}] actionbar "已取得完全控制"`)
                return
            }
            event.server.persistentData.progress++
            syncBossbar(event)
            event.server.runCommandSilent(`title @a[name=${name}] actionbar "正在占领！"`)
        }
    }
    else {
        event.server.runCommandSilent(`title @a[name=${name}] actionbar "超出范围或错误的占领区"`)
    }
}

function switchStage(event, player) { //切换占领区，最后占领区被占领后莉娅队胜利
    let nowStage = event.server.persistentData.stage
    event.server.runCommandSilent(`tp @e[tag=target] ~ ~-250 ~`) //清除指示史莱姆
    if (nowStage == 5) {
        riakoWin(event)
        return
    }
    else {
        event.server.persistentData.stage++
        event.server.persistentData.progress = 200
        event.server.persistentData.respawnCount += gameSettings.addRespwanPerStage
        switchBossbar(event, "nanako")
        event.server.runCommandSilent(`bossbar set riako_progress value 0`)
        event.server.runCommandSilent(`bossbar set nanako_progress value 100`) //重置数值
        let newSpawnPointA
        let newSpawnPointB
        let lastTarget
        let newTarget
        switch (nowStage) {
            case 1:
                newSpawnPointA = SpawnA2
                newSpawnPointB = SpawnB2
                lastTarget = targetPos1
                newTarget = targetPos2
                break
            case 2:
                newSpawnPointA = SpawnA3
                newSpawnPointB = SpawnB3
                lastTarget = targetPos2
                newTarget = targetPos3
                break
            case 3:
                newSpawnPointA = SpawnA4
                newSpawnPointB = SpawnB4
                lastTarget = targetPos3
                newTarget = targetPos4
                break
            case 4:
                newSpawnPointA = SpawnA5
                newSpawnPointB = SpawnB5
                lastTarget = targetPos4
                newTarget = targetPos5
                break
        }
        //生成指示史莱姆
        var slime = player.level.createEntity("minecraft:slime")
        slime.mergeNbt(`{Glowing:1b,NoAI:1b,Invulnerable:1b,PersistenceRequired:1b,Silent:1b,NoGravity:1b,ActiveEffects:[{Id:14,Amplifier:0,Duration:20000,ShowParticles:0b},{Id:11,Amplifier:4,Duration:20000,ShowParticles:0b}],Size:1}`)
        slime.setPos(newTarget.x + 0.5, newTarget.y, newTarget.z + 0.5)
        slime.addTag("target")
        slime.spawn()
        event.server.runCommandSilent(`team join nanako @e[tag=target]`)

        event.server.runCommandSilent(`spawnpoint @a[team=riako] ${newSpawnPointA.x} ${newSpawnPointA.y} ${newSpawnPointA.z}`)
        event.server.runCommandSilent(`spawnpoint @a[team=nanako] ${newSpawnPointB.x} ${newSpawnPointB.y} ${newSpawnPointB.z}`) //更换出生点
        event.server.runCommandSilent(`title @a[team=riako] title [{"text":"我们占领了${lastTarget.name}!","color":"red"}]`)
        event.server.runCommandSilent(`title @a[team=riako] subtitle [{"text":"队伍剩余生命：${event.server.persistentData.respawnCount}","color":"grey"}]`)
        event.server.runCommandSilent(`title @a[team=nanako] title [{"text":"${lastTarget.name}失守!","color":"aqua"}]`)
        event.server.runCommandSilent(`title @a[team=nanako] subtitle [{"text":"对方剩余生命：${event.server.persistentData.respawnCount}","color":"grey"}]`)
        event.server.scheduleInTicks(40, function (callback0) {
            event.server.runCommandSilent(`title @a[team=riako] title [{"text":"进攻${newTarget.name}!","color":"red"}]`)
            event.server.runCommandSilent(`title @a[team=riako] subtitle [{"text":"坐标：${newTarget.x},${newTarget.y},${newTarget.z}","color":"grey"}]`)
            event.server.runCommandSilent(`title @a[team=nanako] title [{"text":"防守${newTarget.name}!","color":"aqua"}]`)
            event.server.runCommandSilent(`title @a[team=nanako] subtitle [{"text":"坐标：${newTarget.x},${newTarget.y},${newTarget.z}","color":"grey"}]`)
        })
    }
    event.server.runCommandSilent(`kill @e[type=item]`)
    event.server.runCommandSilent(`kill @e[type=arrow]`)
    event.server.runCommandSilent(`kill @e[type=spectral_arrow]`)
}

function riakoWin(event) {  //莉娅队胜利
    event.server.runCommandSilent(`tp @e[tag=target] ~ ~-250 ~`) //清除指示史莱姆
    event.server.runCommandSilent(`title @a[tag=fps_player] title [{"text":"莉娅队胜利！","color":"red"}]`)
    event.server.runCommandSilent(`bossbar set minecraft:riako_progress visible false`)
    event.server.runCommandSilent(`bossbar set minecraft:nanako_progress visible false`)
    event.server.runCommandSilent(`title @a[team=riako] subtitle [{"text":"我方攻占了夜莺港全境","color":"grey"}]`)
    event.server.runCommandSilent(`title @a[team=nanako] subtitle [{"text":"夜莺港全境已被攻占","color":"grey"}]`)
    event.server.runCommandSilent(`spawnpoint @a[team=riako] ${lobbyPos.x} ${lobbyPos.y} ${lobbyPos.z}`)
    event.server.runCommandSilent(`spawnpoint @a[team=nanako] ${lobbyPos.x} ${lobbyPos.y} ${lobbyPos.z}`)
    event.server.persistentData.isGameOn = false
    event.server.persistentData.nanakoCount = 0
    event.server.persistentData.riakoCount = 0
    event.server.scheduleInTicks(200, function (callback0) {
        event.server.runCommandSilent(`tp @a[tag=fps_player] ${lobbyPos.x} ${lobbyPos.y} ${lobbyPos.z}`)
        event.server.runCommandSilent(`tag @a remove fps_player`)
        event.server.runCommandSilent(`tag @a remove type1`)
        event.server.runCommandSilent(`tag @a remove type2`)
        event.server.runCommandSilent(`tag @a remove type3`)
        event.server.runCommandSilent(`tag @a remove type4`)
        event.server.runCommandSilent(`tag @a remove type5`)
        event.server.runCommandSilent(`tag @a remove typeNaN`)
        event.server.runCommandSilent(`team leave @a`)
    })
}

function nanakoWin(event) { //鱼子队胜利
    event.server.runCommandSilent(`tp @e[tag=target] ~ ~-250 ~`) //清除指示史莱姆
    event.server.runCommandSilent(`title @a[tag=fps_player] title [{"text":"鱼子队胜利！","color":"aqua"}]`)
    event.server.runCommandSilent(`bossbar set riako_progress visible false`)
    event.server.runCommandSilent(`bossbar set nanako_progress visible false`)
    event.server.runCommandSilent(`title @a[team=riako] subtitle [{"text":"队伍生命耗尽","color":"grey"}]`)
    event.server.runCommandSilent(`title @a[team=nanako] subtitle [{"text":"对方生命耗尽","color":"grey"}]`)
    event.server.runCommandSilent(`spawnpoint @a[team=riako] ${lobbyPos.x} ${lobbyPos.y} ${lobbyPos.z}`)
    event.server.runCommandSilent(`spawnpoint @a[team=nanako] ${lobbyPos.x} ${lobbyPos.y} ${lobbyPos.z}`)
    event.server.persistentData.nanakoCount = 0
    event.server.persistentData.riakoCount = 0
    event.server.persistentData.isGameOn = false
    event.server.scheduleInTicks(200, function (callback0) {
        event.server.runCommandSilent(`tp @a[tag=fps_player] ${lobbyPos.x} ${lobbyPos.y} ${lobbyPos.z}`)
        event.server.runCommandSilent(`clear @a[tag=fps_player]`)
        event.server.runCommandSilent(`tag @a remove fps_player`)
        event.server.runCommandSilent(`tag @a remove type1`)
        event.server.runCommandSilent(`tag @a remove type2`)
        event.server.runCommandSilent(`tag @a remove type3`)
        event.server.runCommandSilent(`tag @a remove type4`)
        event.server.runCommandSilent(`tag @a remove type5`)
        event.server.runCommandSilent(`tag @a remove typeNaN`)
        event.server.runCommandSilent(`bossbar set riako_progress visible false`)
        event.server.runCommandSilent(`bossbar set nanako_progress visible false`)
        event.server.runCommandSilent(`team leave @a`)
    })

    event.server.scheduleInTicks(220, function (callback0) {
        event.server.runCommandSilent(`bossbar set riako_progress visible false`)
        event.server.runCommandSilent(`bossbar set nanako_progress visible false`)
    })
}

function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj; // 基本数据类型直接返回
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item)); // 递归拷贝数组中的每个元素
    }

    const newObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepCopy(obj[key]); // 递归拷贝对象的每个属性
        }
    }

    return newObj;
}

function equipPlayer(event) { //给予玩家装备
    let name = event.player.name.getString()
    let typeNumPos = event.player.tags.toString().indexOf("type") + 4
    let typeNum = Number(event.player.tags.toString().slice(typeNumPos, typeNumPos + 1))
    if (typeNum == -1 || typeNum == NaN) { //如果玩家未选择职业:自动更换到职业1
        typeNum = 1
        event.server.runCommandSilent(`tag @a[name=${name}] add type${typeNum}`)
    }
    if (event.player.teamId == "riako") { event.player.setEquipment("head", Item.of("minecraft:leather_helmet", { display: { color: 11093317 } })) }
    if (event.player.teamId == "nanako") { event.player.setEquipment("head", Item.of("minecraft:leather_helmet", { display: { color: 4557993 } })) }
    let nowEquip = equipTypes[typeNum - 1]
    event.player.setEquipment("chest", nowEquip.armor2)
    event.player.setEquipment("legs", nowEquip.armor3)
    event.player.setEquipment("feet", nowEquip.armor4)
    event.player.give(nowEquip.mainWeapon.copy())
    nowEquip.allEquips.forEach(ele => {
        try {
            event.player.give(ele.copy())
        } catch (e) {
            event.player.give(ele)
        }
    })
}

function callSupport(event) {
    if (event.player.tags.contains("fps_player")) {
        event.player.tell("召唤了新的援军")

        let helper = event.level.createEntity("quark:forgotten")
        helper.mergeNbt(`{HandItems:[{id:"minecraft:bow",Count:1b,tag:{Enchantments:[{id:"minecraft:power",lvl:5s}]}},{id:"minecraft:netherite_sword",Count:1b,tag:{Enchantments:[{id:"minecraft:sharpness",lvl:5s}]}}]}`)
        helper.setPos(event.player.pos.x(), event.player.pos.y(), event.player.pos.z())
        if (event.player.teamId == "riako") {
            helper.mergeNbt(`{ArmorItems:[{id:"minecraft:netherite_boots",Count:1b,tag:{Enchantments:[{id:"minecraft:protection",lvl:2s}]}},{id:"minecraft:netherite_leggings",Count:1b,tag:{Enchantments:[{id:"minecraft:protection",lvl:2s}]}},{},{id:"minecraft:red_wool",Count:1b}]}`)
        }
        if (event.player.teamId == "nanako") {
            helper.mergeNbt(`{ArmorItems:[{id:"minecraft:netherite_boots",Count:1b,tag:{Enchantments:[{id:"minecraft:protection",lvl:2s}]}},{id:"minecraft:netherite_leggings",Count:1b,tag:{Enchantments:[{id:"minecraft:protection",lvl:2s}]}},{},{id:"minecraft:blue_wool",Count:1b}]}`)
        }
        helper.spawn()
        event.server.runCommandSilent(`execute as ${event.player.name.getString()} at @s run team join ${event.player.teamId} @e[distance=..1,team=!${event.player.teamId == "riako" ? "nanako" : "riako"}]`)
        event.player.mainHandItem.count--
    }
}

function switchBossbar(event, switchTo) { //切换boss栏显示
    if (switchTo == "riako") {
        event.server.runCommandSilent(`bossbar set riako_progress visible true`)
        event.server.runCommandSilent(`bossbar set nanako_progress visible false`)
    }
    if (switchTo == "nanako") {
        event.server.runCommandSilent(`bossbar set riako_progress visible false`)
        event.server.runCommandSilent(`bossbar set nanako_progress visible true`)
    }
}

function syncBossbar(event) { //同步占领进程和bossbar显示
    let nowProgress = event.server.persistentData.progress
    if (nowProgress >= 100) {
        switchBossbar(event, "nanako")
        event.server.runCommandSilent(`bossbar set nanako_progress value ${nowProgress - 100}`)
    }
    if (nowProgress <= 100) {
        switchBossbar(event, "riako")
        event.server.runCommandSilent(`bossbar set riako_progress value ${100 - nowProgress}`)
    }
}

function playerRespwan(event) { //玩家重生
    if (event.player.teamId == "riako") { //莉娅队：减去剩余生命 显示文字
        if (event.server.persistentData.respawnCount == 0) {
            nanakoWin(event)
            return
        }
        let name = event.player.name.getString()
        event.server.runCommandSilent(`clear ${name}`)
        event.server.persistentData.respawnCount--
        //event.server.runCommandSilent(`effect give @a[name=${name}] minecraft:saturation infinite 0 true`)
        event.server.runCommandSilent(`title @a[name=${name}] title [{"text":"你被拉回了现实","color":"red"}]`)
        event.server.runCommandSilent(`title @a[name=${name}] subtitle [{"text":"队伍剩余生命：${event.server.persistentData.respawnCount}","color":"grey"}]`)
        event.server.scheduleInTicks(20, function (callback0) { equipPlayer(event) })
    }
    if (event.player.teamId == "nanako") { //鱼子队：显示文字

        let name = event.player.name.getString()
        event.server.runCommandSilent(`clear ${name}`)
        //event.server.runCommandSilent(`effect give @a[name=${name}] minecraft:saturation infinite 0 true`)
        event.server.runCommandSilent(`title @a[name=${name}] title [{"text":"你被拉回了现实","color":"aqua"}]`)
        event.server.runCommandSilent(`title @a[name=${name}] subtitle [{"text":"敌方剩余生命：${event.server.persistentData.respawnCount}","color":"grey"}]`)
        event.server.scheduleInTicks(20, function (callback0) { equipPlayer(event) })
    }
}

function gameInit(event) { //游戏初始化
    if (event.server.persistentData.isGameOn != false) { //如果游戏已经在进行
        event.player.tell("已经有一场比赛正在进行！你可以右键身后的鱼子小雕来加入")
        return
    }
    event.server.runCommandSilent(`tp @e[tag=target] ~ ~-250 ~`) //清除指示史莱姆
    let nowPlayer = event.server.persistentData.nanakoCount + event.server.persistentData.riakoCount
    if (nowPlayer < gameSettings.minPlayerCount) {
        event.player.tell(`人数过少！(${nowPlayer}/${gameSettings.minPlayerCount})`)
        return
    }
    event.server.persistentData.isGameOn = true
    event.server.persistentData.respawnCount = gameSettings.initRespwanCount //莉娅队剩余命数
    event.server.persistentData.stage = 1 //占领阶段，每个区域一个
    event.server.persistentData.progress = 200 //占领百分比：200为鱼子队，100为无人占领，0为莉娅队
    event.server.runCommandSilent(`title @a[team=riako] times 2 40 2`)
    event.server.runCommandSilent(`title @a[team=riako] title [{"text":"莉娅正在注视你！","color":"red"}]`)
    event.server.runCommandSilent(`title @a[team=riako] subtitle [{"text":"攻占第一个区域！","color":"grey"}]`)
    event.server.runCommandSilent(`title @a[team=nanako] times 2 40 2`)
    event.server.runCommandSilent(`title @a[team=nanako] title [{"text":"鱼子正在注视你！","color":"aqua"}]`)
    event.server.runCommandSilent(`title @a[team=nanako] subtitle [{"text":"防守第一个区域！","color":"grey"}]`) //显示文字
    event.server.runCommandSilent(`spawnpoint @a[team=riako] ${SpawnA1.x} ${SpawnA1.y} ${SpawnA1.z}`)
    event.server.runCommandSilent(`spawnpoint @a[team=nanako] ${SpawnB1.x} ${SpawnB1.y} ${SpawnB1.z}`) //设定重生点
    event.server.runCommandSilent(`tag @a[team=riako] add fps_player`)
    event.server.runCommandSilent(`tag @a[team=nanako] add fps_player`)//给玩家上tag
    event.server.runCommandSilent(`bossbar add nanako_progress {"text":"鱼子队占领"}`)
    event.server.runCommandSilent(`bossbar add riako_progress {"text":"莉娅队占领"}`)//创建boss栏
    event.server.runCommandSilent(`bossbar set nanako_progress color aqua`)
    event.server.runCommandSilent(`bossbar set riako_progress color red`)//修改boss栏颜色
    event.server.runCommandSilent(`bossbar set riako_progress value 0`)
    event.server.runCommandSilent(`bossbar set nanako_progress value 100`) //初始化数值
    event.server.runCommandSilent(`bossbar set riako_progress visible false`)
    event.server.runCommandSilent(`bossbar set nanako_progress visible true`) //boss栏可见性
    event.server.runCommandSilent(`bossbar set riako_progress players @a[tag=fps_player]`)
    event.server.runCommandSilent(`bossbar set nanako_progress players @a[tag=fps_player]`) //boss栏玩家显示
    event.server.scheduleInTicks(20, function (callback0) {
        event.server.runCommandSilent(`kill @a[tag=fps_player]`) //tp玩家至重生点1
    })

    //生成指示史莱姆
    var slime = event.player.level.createEntity("minecraft:slime")
    slime.mergeNbt(`{Glowing:1b,NoAI:1b,Invulnerable:1b,PersistenceRequired:1b,Silent:1b,NoGravity:1b,ActiveEffects:[{Id:14,Amplifier:0,Duration:20000,ShowParticles:0b},{Id:11,Amplifier:4,Duration:20000,ShowParticles:0b}],Size:1}`)
    slime.setPos(targetPos1.x + 0.5, targetPos1.y, targetPos1.z + 0.5)
    slime.addTag("target")
    slime.spawn()
    event.server.runCommandSilent(`team join nanako @e[tag=target]`)

}

function logOut(event) { //玩家登出
    if (event.player.teamId == "riako") {
        event.server.tell("一名莉娅队的玩家退出了游戏！")
        event.server.persistentData.riakoCount--
    }
    if (event.player.teamId == "nanako") {
        event.server.tell("一名鱼子队的玩家退出了游戏！")
        event.server.persistentData.nanakoCount--
    }
    if (event.server.persistentData.isGameOn == false) {
        return
    }
    if (event.server.persistentData.nanakoCount <= 0) {
        riakoWin(event)
        return
    }
    if (event.server.persistentData.riakoCount <= 0) {
        nanakoMain(event)
        return
    }
}

function logIn(event) { //玩家登入
    event.server.runCommandSilent(`team leave ${event.player.name.getString()}`)
    event.player.teleportTo(lobbyPos.x, lobbyPos.y, lobbyPos.z)
    event.player.removeTag("type1")
    event.player.removeTag("type2")
    event.player.removeTag("type3")
    event.player.removeTag("type4")
    event.player.removeTag("type5")
    event.player.removeTag("type6")
    event.player.removeTag("typeNaN")
    event.player.removeTag("fps_player")
}

function gunMain(ammoType, event) { //枪械主函数
    let name = event.player.name.getString()
    let nowBullet = ammoType.maxAmmo - event.player.mainHandItem.nbt.Damage
    if (nowBullet == 0) {
        runOutAmmo(ammoType, event)
    }
    else {
        if (ammoType.isMultiple == true) {
            gunFire(ammoType, event)
            gunFire(ammoType, event)
            gunFire(ammoType, event)
            gunFire(ammoType, event)
        }
        gunFire(ammoType, event)
        event.server.runCommandSilent(`title @a[name=${name}] actionbar "${ammoType.firingText}${nowBullet - 1}/${ammoType.maxAmmo}"`)
        event.player.mainHandItem.nbt.Damage = ammoType.maxAmmo - nowBullet + 1
        event.player.addItemCooldown(event.player.mainHandItem.id, ammoType.cooldownTick)
    }
}

function runOutAmmo(ammoType, event) { //子弹打空
    let name = event.player.name.getString()
    event.player.runCommandSilent(`playsound ${ammoType.emptySound} voice @a[distance=..20] ~ ~ ~ 1 1 0`)
    event.server.runCommandSilent(`title @a[name=${name}] actionbar "${ammoType.emptyText}"`) //子弹显示
    event.player.addItemCooldown(event.player.mainHandItem.id, ammoType.cooldownTick)
}

function gunFire(ammoType, event) { //开火
    let player = event.player.name.getString()
    let pos = event.player.block
    let yaw = event.player.yaw * 0.01745
    let pitch = event.player.pitch * 0.01745
    let offsetX = Math.sin(yaw) * 2 * -1
    let offsetZ = Math.cos(yaw) * 2
    let mx
    let my
    let mz

    if (event.player.crouching == false) {
        mx = Math.sin(yaw) * (Math.cos(pitch)) * ammoType.fireSpeed * -1 + ammoType.ammoSpread1 * (Math.random() - 0.5)
        my = -1 * (Math.sin(pitch)) * ammoType.fireSpeed + ammoType.ammoSpread1 * Math.random()
        mz = Math.cos(yaw) * (Math.cos(pitch)) * ammoType.fireSpeed + ammoType.ammoSpread1 * (Math.random() - 0.5)
        event.server.runCommandSilent(`summon ${ammoType.ammoId} ${pos.x + offsetX} ${pos.y + 1.5} ${pos.z + offsetZ} {Tags:["${player + "ammo"}"],Motion:[${mx},${my},${mz}],ownerName:${player},life:1195,NoGravity:1b}`)
    }
    else if (event.player.crouching == true) {
        mx = Math.sin(yaw) * (Math.cos(pitch)) * ammoType.fireSpeed * -1 + ammoType.ammoSpread2 * (Math.random() - 0.5)
        my = -1 * (Math.sin(pitch)) * ammoType.fireSpeed + ammoType.ammoSpread2 * Math.random()
        mz = Math.cos(yaw) * (Math.cos(pitch)) * ammoType.fireSpeed + ammoType.ammoSpread2 * (Math.random() - 0.5)
        event.server.runCommandSilent(`summon ${ammoType.ammoId} ${pos.x + offsetX} ${pos.y + 1.5} ${pos.z + offsetZ} {Tags:["${player + "ammo"}"],Motion:[${mx},${my},${mz}],ownerName:${player},life:1195,NoGravity:1b}`)
    }
    event.player.runCommandSilent(`particle ${ammoType.firingParticle} ~${offsetX * 0.2} ~1.8 ~${offsetZ * 0.2} 0.2 0.2 0.2 0 2`)
    let px = Math.abs(mx) / (Math.abs(mx) + Math.abs(my) + Math.abs(mz)) * mx / Math.abs(mx)
    let py = Math.abs(my) / (Math.abs(mx) + Math.abs(my) + Math.abs(mz)) * my / Math.abs(my)
    let pz = Math.abs(mz) / (Math.abs(mx) + Math.abs(my) + Math.abs(mz)) * mz / Math.abs(mz)
    event.player.runCommandSilent(`particle minecraft:soul_fire_flame ${pos.x + offsetX} ${pos.y + 1.5} ${pos.z + offsetZ} ${px} ${py} ${pz} ${ammoType.fireSpeed * 1.4} 0`)
    event.player.runCommandSilent(`playsound ${ammoType.firingSound} voice @a[distance=..20] ~ ~ ~ 1 1 0`)
}

function gunReload(ammoType, event) { //换弹
    let player = event.player.name.getString()
    event.player.mainHandItem.count--
    event.player.offHandItem.nbt.Damage = 0
    event.player.addItemCooldown(event.player.offHandItem.id, ammoType.reloadTick)
    event.player.runCommandSilent(`playsound ${ammoType.reloadingSound} voice @a[distance=..20] ~ ~ ~ 200 1 0`)
    event.server.runCommandSilent(`minrcraft:kill @e[tag=${player + "ammo"}]`)
    event.server.runCommandSilent(`title @a[name=${player}] actionbar "${ammoType.reloadingText}"`)
}