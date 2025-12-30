//镇守府树不长
/*
BlockEvents.rightClicked(event => {
    if (event.hand == "OFF_HAND") { //不是副手
        return
    }
    if (event.block.hasTag("minecraft:dirt") == false) { //是泥土
        return
    }
    if (event.block.offset(0, 1, 0) != "minecraft:air") { //上方一格有空
        return
    }
    if (event.player.mainHandItem.id == 'chinjufumod:item_seeds_pepper') { //胡椒
        event.block.offset(0, 1, 0).set("chinjufumod:block_spice_pepper")
    }
})
    */
//别长了