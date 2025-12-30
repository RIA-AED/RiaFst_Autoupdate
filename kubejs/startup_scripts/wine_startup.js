StartupEvents.registry('block', event => {
	event.create('distiller',"cardinal").defaultCutout().material("iron").hardness(2).displayName("蒸馏器")
	event.create('ferment_container',"cardinal").defaultCutout().material("iron").hardness(2).displayName("椰能发酵器")
	event.create('aging_container',"cardinal").defaultCutout().material("iron").hardness(2).displayName("椰能陈化器")
	event.create('wine_crafting_table',"cardinal").defaultCutout().box(0,0,0,16,8,16).property(BlockProperties.AGE_2).material("iron").hardness(2).displayName("酿酒工作台")
	event.create('lable_printer',"cardinal").defaultCutout().box(0,0,0,16,8,16).material("iron").hardness(2).displayName("标签打印机")
})

StartupEvents.registry('item', event => {
	event.create('wine_bottle').unstackable().displayName("你不该拿到的酒").food((food) => {food.hunger(0).alwaysEdible()}).useAnimation("drink")
	event.create('incomplete_wine_bottle').unstackable().displayName("未完成的酒")
})