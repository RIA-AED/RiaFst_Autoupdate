StartupEvents.registry("block",event=>{
    event.create("immersive_weathering:cracked_mud").hardness(0.5).tagBlock("mineable/shovel").material("earth").displayName("开裂的泥土")
    event.create("immersive_weathering:cryosol").hardness(0.5).tagBlock("mineable/shovel").material("earth").displayName("低温冻土")
    event.create("immersive_weathering:fluvisol").hardness(0.5).tagBlock("mineable/shovel").material("earth").displayName("冲积土")
    event.create("immersive_weathering:humus").hardness(0.5).tagBlock("mineable/shovel").material("earth").displayName("腐殖土")
    event.create("immersive_weathering:vertisol").hardness(0.5).tagBlock("mineable/shovel").material("earth").displayName("膨胀土")
    event.create("immersive_weathering:ash_layer_block").box(0,0,0,16,2,16).hardness(0.2).noCollision().requiresTool().defaultCutout().tagBlock("mineable/shovel").property(BlockProperties.LAYERS).displayName("灰烬堆")
    event.create("immersive_weathering:ash_block").hardness(0.2).noDrops().tagBlock("mineable/shovel").displayName("灰烬块")

    event.create('immersive_weathering:cut_iron_vertical_slab','cardinal').material("stone").hardness(1).displayName("切制铁块竖直台阶").box(0, 0, 8, 16, 16, 16, true)
	event.create('immersive_weathering:mossy_bricks_vertical_slab','cardinal').material("stone").hardness(1).displayName("苔砖竖直台阶").box(0, 0, 8, 16, 16, 16, true)
	event.create('immersive_weathering:mossy_stone_vertical_slab','cardinal').material("stone").hardness(1).displayName("覆苔石头竖直台阶").box(0, 0, 8, 16, 16, 16, true)
	event.create('immersive_weathering:plate_iron_vertical_slab','cardinal').material("stone").hardness(1).displayName("铁板块竖直台阶").box(0, 0, 8, 16, 16, 16, true)
})