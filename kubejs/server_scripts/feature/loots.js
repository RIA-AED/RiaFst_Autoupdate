ServerEvents.entityLootTables(event => {
	event.modifyEntity('minecraft:ender_dragon', table => {
		table.addPool(pool => {
			pool.addItem('2x quark:dragon_scale')
			pool.killedByPlayer()
		})
	})
})
