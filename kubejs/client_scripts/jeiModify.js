// priority: 1

let hideItems = [
	//隐藏仅创造物品
	'opf:opf',//在线图片框
	'flashnpcs:npc_editor',//flash npcs
	'flashnpcs:quest_editor',
	'flashnpcs:npc_save_tool',
	'kubejs:seat_clear',//清除椅子

	//隐藏活动物品	
	'kubejs:event_item_1',//活动物品
	'kubejs:event_item_2',
	'kubejs:event_item_3',
	'kubejs:event_item_4',
	'kubejs:event_item_5',
	'kubejs:event_block_1',//活动方块
	'kubejs:event_block_2',
	'kubejs:event_block_3',

	//隐藏序列组装半成品
	'kubejs:frother_mixture',//发泡混合物
	'kubejs:incomplete_totem',//半成品图腾
	'kubejs:incomplete_netherite_ingot',//半成品下界合金

	//镇守府
	'chinjufumod:block_makibishi',
	'chinjufumod:block_empty_box',
	'chinjufumod:item_anchor',
	'chinjufumod:item_ammunition_kc',
	'chinjufumod:item_ammunition_medium',
	'chinjufumod:item_ammunition_small',
	'chinjufumod:item_workorder',
	'chinjufumod:item_shouhou_empty',
	'chinjufumod:item_shouhou',
	'chinjufumod:block_lettertray_c',
	'chinjufumod:block_fudetray_c',
	'chinjufumod:block_bauxite_box',
	'chinjufumod:block_ammunition_box',
	'chinjufumod:item_fubuki_helmet',
	'chinjufumod:item_fubuki_chestplate',
	'chinjufumod:item_fubuki_leggings',
	'chinjufumod:item_fubuki_boots',
	'chinjufumod:item_fubuki_bootskai',
	'chinjufumod:item_kasumi_helmet',
	'chinjufumod:item_kasumi_chestplate',
	'chinjufumod:item_kasumi_leggings',
	'chinjufumod:item_kasumi_boots',
	'chinjufumod:item_kasumi_bootskai',
	'chinjufumod:item_shiratsuyu_helmet',
	'chinjufumod:item_shiratsuyu_chestplate',
	'chinjufumod:item_shiratsuyu_leggings',
	'chinjufumod:item_shiratsuyu_boots',
	'chinjufumod:item_shiratsuyu_bootskai',
	'chinjufumod:item_shigure_helmet',
	'chinjufumod:item_shigure_chestplate',
	'chinjufumod:item_shigure_leggings',
	'chinjufumod:item_shigure_boots',
	'chinjufumod:item_shigure_bootskai',
	'chinjufumod:item_akatsuki_helmet',
	'chinjufumod:item_akatsuki_chestplate',
	'chinjufumod:item_akatsuki_leggings',
	'chinjufumod:item_akatsuki_boots',
	'chinjufumod:item_akatsuki_bootskai',
	'chinjufumod:item_sendai_helmet',
	'chinjufumod:item_sendai_chestplate',
	'chinjufumod:item_sendai_leggings',
	'chinjufumod:item_sendai_boots',
	'chinjufumod:item_sendai_bootskai',
	'chinjufumod:item_yura_helmet',
	'chinjufumod:item_yura_chestplate',
	'chinjufumod:item_yura_leggings',
	'chinjufumod:item_yura_boots',
	'chinjufumod:item_yura_bootskai',
	'chinjufumod:item_mogami_helmet',
	'chinjufumod:item_mogami_chestplate',
	'chinjufumod:item_mogami_leggings',
	'chinjufumod:item_mogami_boots',
	'chinjufumod:item_mogami_bootskai',
	'chinjufumod:item_tone_helmet',
	'chinjufumod:item_tone_chestplate',
	'chinjufumod:item_tone_leggings',
	'chinjufumod:item_tone_boots',
	'chinjufumod:item_tone_bootskai',
	'chinjufumod:item_ryujou_helmet',
	'chinjufumod:item_ryujou_chestplate',
	'chinjufumod:item_ryujou_leggings',
	'chinjufumod:item_ryujou_boots',
	'chinjufumod:item_ryujou_bootskai',
	'chinjufumod:item_akagi_helmet',
	'chinjufumod:item_akagi_chestplate',
	'chinjufumod:item_akagi_leggings',
	'chinjufumod:item_akagi_boots',
	'chinjufumod:item_akagi_bootskai',
	'chinjufumod:item_kaga_helmet',
	'chinjufumod:item_kaga_chestplate',
	'chinjufumod:item_kaga_leggings',
	'chinjufumod:item_kaga_boots',
	'chinjufumod:item_kaga_bootskai',
	'chinjufumod:item_kongou_helmet',
	'chinjufumod:item_kongou_chestplate',
	'chinjufumod:item_kongou_leggings',
	'chinjufumod:item_kongou_boots',
	'chinjufumod:item_kongou_bootskai',
	'chinjufumod:item_fusou_helmet',
	'chinjufumod:item_fusou_chestplate',
	'chinjufumod:item_fusou_leggings',
	'chinjufumod:item_fusou_boots',
	'chinjufumod:item_fusou_bootskai',
	'chinjufumod:item_nagato_helmet',
	'chinjufumod:item_nagato_chestplate',
	'chinjufumod:item_nagato_leggings',
	'chinjufumod:item_nagato_boots',
	'chinjufumod:item_nagato_bootskai',
	'chinjufumod:item_rensouhou127',
	'chinjufumod:item_shigurehou',
	'chinjufumod:item_koukakuhou100',
	'chinjufumod:item_rensouhou155',
	'chinjufumod:item_rensouhou203',
	'chinjufumod:item_rensouhou203_skc34',
	'chinjufumod:item_rensouhou356',
	'chinjufumod:item_rensouhou356_s3',
	'chinjufumod:item_rensouhou380',
	'chinjufumod:item_rensouhou410',
	'chinjufumod:item_kk_type97',
	'chinjufumod:item_kk_tenzan',
	'chinjufumod:item_kk_ryusei',
	'chinjufumod:item_kk_tbf',
	'chinjufumod:item_kk_swordfish',
	'chinjufumod:item_shield_kuchiku',
	'chinjufumod:item_shield_yura',
	'chinjufumod:item_shield_mogami',
	'chinjufumod:item_shield_kongou',
	'chinjufumod:item_kit_firstaid',
	'chinjufumod:item_kit_goddess'

]

let information = [
	['minecraft:diorite', ['富含石英的岩石。', '[流动的岩浆]同时遇到[水]和[平滑石英]时生成。']],
	['minecraft:granite', ['成分复杂的岩石。', '[流动的岩浆]同时遇到[水], [平滑石英]和[闪长岩]时生成。']],
	['minecraft:crying_obsidian', ['下界灵魂的悔恨凝结其中。', '[流动的水]同时遇到[岩浆源]和[灵魂火]时生成。']],
	['minecraft:basalt', ['致密固实的岩石。', '[流动的岩浆]遇到[蓝冰]同时[下方为灵魂土]时生成。']],
	['minecraft:smooth_basalt', ['平滑无用的岩石。', '[流动的岩浆]遇到[蓝冰]和[流动的水]同时[下方为灵魂土]时生成。']],
	['minecraft:tuff', ['富含金属的岩石。', '[流动的岩浆]同时遇到[蓝冰]和[灰烬块]时生成。', '注意:灰烬块是会下落的。']],
	['minecraft:blackstone', ['颜色漆黑的岩石。', '[流动的岩浆]同时遇到[蓝冰]和[岩浆块]时生成。']],
	['minecraft:calcite', ['富含钙质的岩石。', '[流动的岩浆]同时遇到[蓝冰]和[岩浆块]同时[下方为面向上方的骨块]时生成。']],
	['minecraft:magma_block', ['神圣的岩浆块。', '[岩浆]遇到[气泡柱]时生成。']],
	['create:limestone', ['平凡干燥的岩石。', '[岩浆]遇到[流动的蜂蜜]时生成。']]
	//['kubejs:blood_bottle', ['你猜这个血瓶的诞生意图是为了什么……？']],
	//['kubejs:hemostix_plus_plus', ['据悉，星域地块上','并不具备零域中能轻易获得的高质量椰能。','因此，在村北门的传送站深处……']]
]

JEIEvents.hideItems(event => { hideItems.forEach(it => { event.hide(it) }); global.removedItems.forEach(it => { event.hide(it) }) })

//TODO:夸克的jei说明页在刷屏
JEIEvents.information(event => { information.forEach(it => { event.addItem(it[0], it[1]) }) })

JEIEvents.removeRecipes(event => {
	//去除jei中的抽屉+升级合成配方
	for (let drawer_counter = 0; drawer_counter <= 14; drawer_counter++) {
		event.remove('minecraft:crafting', 'drawersfix_' + drawer_counter + '_manual_only');
	}
})


