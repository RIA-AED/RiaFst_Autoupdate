let landmark1Pos = [-722.5, 68, -895.5]
let landmarkEffectsCount = 7
let landmarkCooldownMS = 10000

PlayerEvents.tick(event => {
    if (Math.abs(event.player.pos.x() - landmark1Pos[0]) < 0.5 && Math.abs(event.player.pos.y() - landmark1Pos[1]) < 0.2 && Math.abs(event.player.pos.z() - landmark1Pos[2]) < 0.5) {
        if (!event.player.persistentData.getLong("lastTriggerLandmark1")) {
            event.player.persistentData.lastTriggerLandmark1 = Date.now()
        } else {
            if (Date.now() - event.player.persistentData.getLong("lastTriggerLandmark1") < landmarkCooldownMS) {
                return
            }
        }

        event.player.persistentData.lastTriggerLandmark1 = Date.now()
        let effectNum = randint(0, landmarkEffectsCount - 1)
        let name = event.player.name.getString()
        switch (effectNum) {
            case 0:
                event.server.runCommandSilent(`tp ${name} 1512 71 3259`)
                event.server.runCommandSilent(`title ${name} title [{"text":"星域#0 营地","color":"green","bold":true}]`)
                event.server.tell(`${name}站上了1号地标传送门 被送去了营地`)
                break
            case 1:
                event.server.runCommandSilent(`tp ${name} -679.8 66 -901.6`)
                event.server.tell(`${name}站上了1号地标传送门 被送去了莉娅坐着的墙头`)
                break
            case 2:
                event.server.runCommandSilent(`execute as ${name} at @s run tp @s ~ ~200 ~`)
                event.server.runCommandSilent(`effect give ${name} resistance 10 4 true`)
                event.server.tell(`${name}站上了1号地标传送门 结果飞上天了`)
                break
            case 3:
                event.server.runCommandSilent(`tp ${name} -728 65 -805`)
                event.server.runCommandSilent(`title ${name} title [{"text":"甲村","color":"green","bold":true}]`)
                event.server.tell(`${name}站上了1号地标传送门 被送去了甲村`)
                break
            case 4:
                event.server.runCommandSilent(`tp ${name} -2005 90 1847`)
                event.server.runCommandSilent(`title ${name} title [{"text":"expo1会场","color":"green","bold":true}]`)
                event.server.tell(`${name}站上了1号地标传送门 被送去了expo1会场`)
                break
            case 5:
                event.server.runCommandSilent(`execute as ${name} at @s run tp @s ${randint(-4000, 4000)} ~200 ${randint(-4000, 4000)}`)
                event.server.runCommandSilent(`effect give ${name} resistance 10 4 true`)
                event.server.tell(`${name}站上了1号地标传送门 被随便扔到了世界的某个地方`)
                break
            case 6:
                event.player.tell("CyberSakana | 狗：一个个自己不申居（）")
                event.player.tell("CyberSakana | 狗：惦记一号鸟居作甚")
                event.player.tell("CyberSakana | 狗：回去工！")
                event.server.tell(`${name}站上了1号地标传送门 被CyberSakana骂了`)
                break
        }
    }
})