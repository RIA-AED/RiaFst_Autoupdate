// priority: 0
/*
onEvent('block.right_click', event => { //鱼子小雕
    if(event.hand != "MAIN_HAND"){
        return
    }
    let name = String(event.player.name.text)
    if (event.block == 'kubejs:nanako_sculpture') {
        event.server.runCommandSilent(`effect give @a[name=${name}] minecraft:saturation 1 20`)
        event.player.runCommandSilent(`title @s actionbar "你感到不再饥饿"`)
    }
})

onEvent('block.right_click', event => { //鱼子小雕
    if(event.hand != "MAIN_HAND"){
        return
    }
    if (event.block == 'kubejs:event_block_2') {
        event.server.runCommandSilent(`tellraw @a[tag=audience] [{"text":"红队","color":"red"},{"text":"已经完成了比赛！","color":"white"}]`)
    }
    if (event.block == 'kubejs:event_block_3') {
        event.server.runCommandSilent(`tellraw @a[tag=audience] [{"text":"蓝队","color":"aqua"},{"text":"已经完成了比赛！","color":"white"}]`)
    }
})
 */

BlockEvents.rightClicked("kitchenkarrot:brewing_barrel", event => {
    if (event.hand != "MAIN_HAND") return;
    if (event.player.mainHandItem.id != "minecraft:clock") return
    let maxP = event.block.entityData.get("maxProgress").value
    if (maxP > 0) {
        event.block.mergeEntityData({ progress: { value: maxP - 1 } })
        event.player.tell("这个酒桶的时间被删去了一部分")
    }
})