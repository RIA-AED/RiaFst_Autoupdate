const imwVerticalSlabs = [
    "immersive_weathering:cut_iron_vertical_slab",
    "immersive_weathering:mossy_bricks_vertical_slab",
    "immersive_weathering:mossy_stone_vertical_slab",
    "immersive_weathering:plate_iron_vertical_slab"
];

imwVerticalSlabs.forEach(verticalSlabName=>{
    let originalSlabName = verticalSlabName.replace("_vertical","");
    let originalBlockName = verticalSlabName.replace("_vertical_slab","");
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