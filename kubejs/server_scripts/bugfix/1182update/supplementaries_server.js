const suppVerticalSlabs = [
    "supplementaries:blackstone_tile_vertical_slab",
    "supplementaries:checker_vertical_slab",
    "supplementaries:lapis_bricks_vertical_slab",
    "supplementaries:stone_tile_vertical_slab",
    "supplementaries:ash_bricks_vertical_slab"
];

suppVerticalSlabs.forEach(verticalSlabName=>{
    let originalSlabName = verticalSlabName.replace("_vertical","");
    let originalBlockName = verticalSlabName.replace("_vertical_slab","");
    if(!originalBlockName.includes("block")&&!originalBlockName.includes("bricks")&&!originalBlockName.includes("tile")){
        originalBlockName+="_block";//对checker的特判,不过写了点完全可以被=="supplementaries:checker"替换的判断
    }
    ServerEvents.recipes( event => {
        event.shaped("3x "+verticalSlabName, [
            ' S ',
            ' S ',
            ' S '
        ], {
            S: originalSlabName
        });
        event.stonecutting('2x '+verticalSlabName, originalBlockName);
    })
    BlockEvents.rightClicked(verticalSlabName,event=>{
        if(event.player.mainHandItem == verticalSlabName && event.hand == "MAIN_HAND"){
            if (!event.player.isCreative()) {
                event.player.mainHandItem.count --;
            }
            event.block.set(originalBlockName);
            event.cancel();
        }
    })
})