/*
ItemEvents.rightClicked("kubejs:event_item_1", event => { //开火
    if (event.hand != "MAIN_HAND") { return }
    gunMain(gunType1, event)
})
ItemEvents.rightClicked("kubejs:event_item_2", event => {
    if (event.hand != "MAIN_HAND") { return }
    gunMain(gunType2, event)
})
ItemEvents.rightClicked("kubejs:event_item_3", event => {
    if (event.hand != "MAIN_HAND") { return }
    gunMain(gunType3, event)
})
ItemEvents.rightClicked("kubejs:event_item_4", event => {
    if (event.hand != "MAIN_HAND") { return }
    gunMain(gunType4, event)
})

ItemEvents.rightClicked("kubejs:event_item_5", event => {
    if (event.hand != "MAIN_HAND") { return }
    gunMain(gunType5, event)
})

PlayerEvents.tick(event => {
    if (event.player.mainHandItem.id == "kubejs:event_item_2") {
        let name = event.player.name.getString()
        event.server.runCommandSilent(`effect give @a[name=${name}] minecraft:slowness 1 2 true`)
    }
})

ItemEvents.rightClicked("minecraft:cod", event => { //换弹:主手鳕鱼 副手鳕鱼之杖
    if (event.hand != "MAIN_HAND") { return }
    if (event.player.offHandItem.id == "kubejs:event_item_1") {
        gunReload(gunType1, event)
    }
    if (event.player.offHandItem.id == "kubejs:event_item_2") {
        gunReload(gunType2, event)
    }
    if (event.player.offHandItem.id == "kubejs:event_item_3") {
        gunReload(gunType3, event)
    }
    if (event.player.offHandItem.id == "kubejs:event_item_4") {
        gunReload(gunType4, event)
    }
    if (event.player.offHandItem.id == "kubejs:event_item_5") {
        gunReload(gunType5, event)
    }
})

BlockEvents.rightClicked("minecraft:crying_obsidian", event => { //右键哭泣的黑曜石：两服/互传
    if (event.hand == "OFF_HAND") { return }
    warp(event)
})

*/

/*

ServerEvents.loaded(event => {
    event.server.scheduleRepeatingInTicks(10, function (callback0) {
        let players = event.server.getPlayers()
        players.forEach(ele => {
            wrenchMain(event, ele)
        })
    })
})

BlockEvents.rightClicked("kubejs:event_block_1", event => { //右键活动方块1：初始化游戏
    if (event.hand == "OFF_HAND") { return }
    gameInit(event)
})

BlockEvents.rightClicked("kubejs:event_block_2", event => { //玩家右键活动方块2：选择/更换职业
    if (event.hand == "OFF_HAND") { return }
    professionChange(event)
})

BlockEvents.rightClicked("kubejs:event_block_3", event => { //玩家右键活动方块3：关于信息
    if (event.hand == "OFF_HAND") { return }
    info(event)
})

BlockEvents.rightClicked("kubejs:nanako_sculpture", event => { //玩家右键鱼子小雕
    if (event.hand == "OFF_HAND") { return }
    nanakoMain(event, event.player)
})

//ItemEvents.rightClicked("create:wrench", event => { //玩家手持扳手右键
//if (event.player.teamId != "riako" && event.player.teamId != "nanako") { return }
//wrenchMain(event,event.player)
//})

PlayerEvents.respawned(event => { //玩家重生时
    playerRespwan(event, true)
    event.server.runCommandSilent(`effect give ${event.player.name.getString()} minecraft:resistance 4 4 true`)
})

EntityEvents.death(event => {
    if (!event.entity.tags.contains("fps_player")) {
        return
    }
    if (event.getSource().getPlayer() && event.getSource().getPlayer().tags.contains("fps_player")) {
        let victim = event.player.name.getString()
        let killer = event.getSource().getPlayer().name.getString()

        let data = {
            count: [
                {
                    name: "liziluyu",
                    death: 1,
                    kill: 2
                }
            ]
        }
        let t = data.count.find(item => item.name === "liziluyu")
        try {
            data = JSON.parse(FilesJS.readFile("config/player_stats.json"))
        }
        catch (error) {
            data = { count: [] }
        }
        if (data.count.find(item => item.name === victim) == undefined) {
            data.count.push({
                name: victim,
                death: 1,
                kill: 0
            })
        } else {
            data.count.find(item => item.name === victim).death++
        }
        if (data.count.find(item => item.name === killer) == undefined) {
            data.count.push({
                name: killer,
                death: 0,
                kill: 1
            })
        } else {
            data.count.find(item => item.name === killer).kill++
        }
        FilesJS.writeFile("config/player_stats.json", JSON.stringify(data))
    }
})

ItemEvents.rightClicked("kubejs:seat_clear", event => { //下蹲右键清除椅子：重置游戏 鱼子胜利
    if (event.player.isCrouching() == true) {
        nanakoWin(event)
        event.server.tell("比赛状态已重置")
    }
})

PlayerEvents.loggedOut(event => { //玩家登出：退出队伍，如果人数过少则结束比赛
    logOut(event)
})

PlayerEvents.loggedIn(event => {
    logIn(event)
})

ItemEvents.rightClicked("minecraft:goat_horn", event => {
    if (event.hand != "MAIN_HAND") { return }
    callSupport(event)
    let a = 0
})

*/