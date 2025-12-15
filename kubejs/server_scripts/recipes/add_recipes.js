// priority: 0

console.info('服务器脚本（script.js）已重载')

let fuckChinjufuMod_output = [
	'chinjufumod:block_boxh_apple',
	'chinjufumod:block_boxh_beef',
	'chinjufumod:block_boxh_beetroot',
	'chinjufumod:block_boxh_bread',
	'chinjufumod:block_boxh_carrot',
	'chinjufumod:block_boxh_chicken',
	'chinjufumod:block_boxh_chorus',
	'chinjufumod:block_boxh_cod',

	'chinjufumod:block_boxh_egg',
	'chinjufumod:block_boxh_fish',
	'chinjufumod:block_boxh_mutton',
	'chinjufumod:block_boxh_pork',
	'chinjufumod:block_boxh_potato',
	'chinjufumod:block_boxh_rabbit',
	'chinjufumod:block_boxh_salmon',
	'chinjufumod:block_boxh_swberry',
	'chinjufumod:block_boxh_cabbage',

	'chinjufumod:block_boxh_hakusai',
	'chinjufumod:block_boxh_citrus',
	'chinjufumod:block_boxh_corn',
	'chinjufumod:block_boxh_grape',
	'chinjufumod:block_boxh_onion',
	'chinjufumod:block_boxh_spinach',
	'chinjufumod:block_boxh_tomato',
	'chinjufumod:block_boxh_cherry',
	'chinjufumod:block_boxh_takenoko',
];
let fuckChinjufuMod_input = [
	'minecraft:apple',
	'minecraft:beef',
	'minecraft:beetroot',
	'minecraft:bread',
	'minecraft:carrot',
	'minecraft:chicken',
	'minecraft:chorus_fruit',
	'minecraft:cod',

	'minecraft:egg',
	'minecraft:cod',
	'minecraft:mutton',
	'minecraft:porkchop',
	'minecraft:potato',
	'minecraft:rabbit',
	'minecraft:salmon',
	'minecraft:sweet_berries',
	'chinjufumod:item_food_cabbage',

	'chinjufumod:item_food_hakusai',
	'chinjufumod:item_food_mikan',
	'chinjufumod:item_food_corn',
	'chinjufumod:item_food_grape',
	'chinjufumod:item_food_onion',
	'chinjufumod:item_food_spinach',
	'chinjufumod:item_food_tomato',
	'chinjufumod:item_food_cherry',
	'chinjufumod:block_takenoko',
];
let fuckChinjufuMod_counter = 0 //盒子合成计数器

ServerEvents.recipes(event => {
	event.recipes.create.emptying([Fluid.of('minecraft:milk', 1000), 'chinjufumod:block_mizuoke'], 'chinjufumod:item_mizuoke_milk').id('create:empty_chinjufumod_item_mizuoke_milk_of_minecraft_milk_fix');//添加正确的镇守府木奶桶分页配方
	event.recipes.create.emptying([Fluid.of('minecraft:water', 1000), 'chinjufumod:block_mizuoke'], 'chinjufumod:block_mizuoke_full').id('create:empty_chinjufumod_block_mizuoke_full_of_minecraft_water');//添加镇守府水木桶分液配方
	event.recipes.create.filling('chinjufumod:item_mizuoke_milk', [Fluid.of('minecraft:milk', 1000), 'chinjufumod:block_mizuoke']);//添加镇守府木奶桶注液配方
	event.recipes.create.filling('chinjufumod:block_mizuoke_full', [Fluid.of('minecraft:water', 1000), 'chinjufumod:block_mizuoke']);//添加镇守府木水桶注液配方
	event.shapeless('8x kubejs:roller_ticket', ['8x minecraft:paper', 'minecraft:gold_ingot']) //抽奖卷
	event.recipes.createDeploying('kubejs:burger', ['farmersdelight:hamburger', 'create:super_glue']).keepHeldItem()//汉堡模型
	// event.shapeless('2x quark:dirty_glass','8x #quark:shards') //脏玻璃
	event.shapeless('4x chinjufumod:item_dust_chili', '4x crockpot:pepper') //辣椒粉
	event.shapeless('chinjufumod:block_takenoko', 'minecraft:bamboo') //竹笋
	event.shapeless('kubejs:he_graphite_block', '9x kubejs:he_graphite') //高能石墨块
	event.shapeless('chinjufumod:block_hamaguri', 'crabbersdelight:clam') //蛤蜊转化
	event.shapeless('crabbersdelight:clam', 'chinjufumod:block_hamaguri') //蛤蜊转化
	event.shapeless('immersive_weathering:ash_layer_block', 'supplementaries:ash') //灰烬转化
	event.shapeless('supplementaries:ash', 'immersive_weathering:ash_layer_block') //灰烬转化
	event.shapeless('chinjufumod:block_brick_and_c', 'quark:andesite_bricks') //石砖转化
	event.shapeless('quark:andesite_bricks', 'chinjufumod:block_brick_and_c') //石砖转化
	event.shapeless('chinjufumod:block_brick_dio_c', 'quark:diorite_bricks') //石砖转化
	event.shapeless('chinjufumod:block_brick_dio_c', 'quark:diorite_bricks') //石砖转化
	event.shapeless('quark:diorite_bricks', 'chinjufumod:block_brick_dio_c') //石砖转化
	event.shapeless('chinjufumod:block_brick_gra_c', 'quark:granite_bricks') //石砖转化
	event.shapeless('quark:granite_bricks', 'chinjufumod:block_brick_gra_c') //石砖转化
	// event.shapeless('kubejs:copter', ['minecraft:stick', 'simpleplanes:propeller', 'create_things_and_misc:vibration_mechanism']) //竹蜻蜓
	event.shapeless('8x quark:glow_shroom', ['8x minecraft:brown_mushroom', 'minecraft:glow_ink_sac']) //荧光菇1
	event.shapeless('8x quark:glow_shroom', ['8x minecraft:red_mushroom', 'minecraft:glow_ink_sac']) //荧光菇2
	event.shapeless('8x quark:glow_lichen_growth', ['8x quark:moss_paste', 'minecraft:glow_ink_sac']) //发光地衣生长物
	event.shapeless('farmersdelight:tree_bark', '#immersive_weathering:bark') //树皮
	event.shapeless('minecraft:enchanted_book', ['2x create:sturdy_sheet', 'minecraft:book'])//空附魔书
	event.shapeless('quark:permafrost', ['minecraft:blue_ice', 'minecraft:stone'])//永冻石
	event.shapeless('kubejs:checker', ['supplementaries:checker_block', 'create:electron_tube'])//检查站
	//【夸克、机动石灰石互相转换配方】
	event.shapeless('quark:limestone', 'create:limestone')//夸克石灰石->机械动力石灰石
	event.shapeless('create:limestone', 'quark:limestone')//机械动力石灰石->夸克石灰石
	event.shapeless(Item.of('kubejs:hemostix_plus', '{Damage:0}'), ['farmersdelight:iron_knife', 'minecraft:glass_bottle', '7x create:experience_block']) //采血套装plus
	event.shapeless('quark:limestone_stairs', 'create:cut_limestone_stairs')
	event.shapeless('create:cut_limestone_stairs', 'quark:limestone_stairs')
	event.shapeless('quark:limestone_slab', 'create:cut_limestone_slab')
	event.shapeless('create:cut_limestone_slab', 'quark:limestone_slab')
	event.shapeless('quark:polished_limestone', 'create:polished_cut_limestone')
	event.shapeless('create:polished_cut_limestone', 'quark:polished_limestone')
	event.shapeless('quark:polished_limestone_stairs', 'create:polished_cut_limestone_stairs')
	event.shapeless('create:polished_cut_limestone_stairs', 'quark:polished_limestone_stairs')
	event.shapeless('quark:polished_limestone_slab', 'create:polished_cut_limestone_slab')
	event.shapeless('quark:limestone_wall', 'create:polished_cut_limestone_wall')
	event.shapeless('create:polished_cut_limestone_wall', 'quark:limestone_wall')
	event.shapeless('quark:limestone_bricks', 'create:cut_limestone_bricks')
	event.shapeless('create:cut_limestone_bricks', 'quark:limestone_bricks')
	event.shapeless('quark:limestone_bricks_stairs', 'create:cut_limestone_brick_stairs')
	event.shapeless('quark:limestone_bricks_slab', 'create:cut_limestone_brick_slab')
	event.shapeless('create:cut_limestone_brick_slab', 'quark:limestone_bricks_slab')
	event.shapeless('quark:chiseled_limestone_bricks', 'create:small_limestone_bricks')
	event.shapeless('create:small_limestone_bricks', 'quark:chiseled_limestone_bricks')
	event.shapeless('quark:chiseled_limestone_bricks', 'create:small_limestone_brick_wall')
	event.shapeless('create:small_limestone_brick_wall', 'quark:chiseled_limestone_bricks')
	event.shapeless('quark:limestone_pillar', 'create:limestone_pillar')
	event.shapeless('create:limestone_pillar', 'quark:limestone_pillar')
	event.shapeless('ultramarine:chisel_table', 'ultramarine:brush_and_inkstone')
	event.stonecutting('create:limestone', 'quark:limestone')
	event.stonecutting('quark:limestone', 'create:limestone')

	for (let fuckChinjufuMod_counter = 0; fuckChinjufuMod_counter < 26; fuckChinjufuMod_counter++) {
		event.shaped(fuckChinjufuMod_output[fuckChinjufuMod_counter], [ //新盒子合成
			'MMM',
			'MBM',
			'MMM'
		], {
			B: 'chinjufumod:block_boxh_empty',
			M: fuckChinjufuMod_input[fuckChinjufuMod_counter]
		})
	}

	event.shaped('chinjufumod:block_steel_block', [ //新钢材堆合成
		'   ',
		' I ',
		'III'
	], {
		I: '#forge:ingots/iron',
	})

	event.shaped('buildersaddition:shop_sign_wood', [ //木商店告示牌
		'II ',
		'OO ',
		'   '
	], {
		I: '#forge:nuggets/iron',
		O: '#minecraft:planks'
	})

	event.shaped('immersive_weathering:ash_block', [//灰烬块
		'AA ',
		'AA ',
		'   '
	], {
		A: 'immersive_weathering:ash_layer_block'
	})

	event.shaped('chinjufumod:item_chisel', [ //新凿子合成
		'  I',
		' S ',
		'   '
	], {
		I: '#forge:ingots/iron',
		S: 'minecraft:stick'
	})

	event.shaped('kubejs:candle_stick', [ //烛台合成
		' C ',
		'GGG',
		'   '
	], {
		C: 'minecraft:candle',
		G: 'minecraft:gold_nugget'
	})

	event.shaped('minecraft:bookshelf', [ //镇守府木头做书架
		'WWW',
		'BBB',
		'WWW'
	], {
		B: 'minecraft:book',
		W: 'chinjufumod:block_planks_sakura'
	})
	event.shaped('minecraft:bookshelf', [ //镇守府木头做书架
		'WWW',
		'BBB',
		'WWW'
	], {
		B: 'minecraft:book',
		W: 'chinjufumod:block_planks_kaede'
	})
	event.shaped('minecraft:bookshelf', [ //镇守府木头做书架
		'WWW',
		'BBB',
		'WWW'
	], {
		B: 'minecraft:book',
		W: 'chinjufumod:block_planks_ichoh'
	})

	event.shaped(Item.of('kubejs:deployer_lubricant', '{Damage:0}'), [ //机械手润滑剂
		'AC',
		'BA'
	], {
		A: 'create:iron_sheet',
		B: 'minecraft:iron_nugget',
		C: 'kubejs:soy_bean_oil'
	})

	//蜜脾
	event.recipes.create.compacting('3x minecraft:honeycomb', Fluid.of("create:honey", 250))

	//大豆油
	event.recipes.create.filling("kubejs:soy_bean_oil", [Fluid.of("kubejs:bean_oil", 250), Item.of("minecraft:glass_bottle")])
	event.recipes.create.emptying([Fluid.of("kubejs:bean_oil", 250), Item.of("minecraft:glass_bottle")], "kubejs:soy_bean_oil")

	event.recipes.createMechanicalCrafting('minecraft:elytra', [ //新鞘翅合成
		' DND ',
		'PDCDP',
		'PP PP',
		'PP PP',
		' P P '
	], {
		D: 'quark:dragon_scale',
		C: 'create:precision_mechanism',
		P: 'minecraft:phantom_membrane',
		N: 'minecraft:nether_star'
	})

	event.shaped('chinjufumod:block_boxh_empty', [ //新空盒子合成
		'P P',
		'P P',
		'PPP'
	], {
		P: 'minecraft:paper',
	})

	event.shaped('minecraft:cobweb', [ //蜘蛛网合成
		'SSS',
		'SOS',
		'SSS'
	], {
		S: 'minecraft:string',
		O: 'minecraft:slime_ball',
	}).id("cobweb_from_string")

	//恶魂之泪
	event.recipes.create.mixing(Fluid.of('kubejs:ghast_tear', 80), ['#forge:vegetables/pepper', '#forge:vegetables/garlic', '#forge:vegetables/onion', 'quark:soul_bead']).superheated()
	//恶魂之泪 物品/流体转化
	event.recipes.create.mixing(Fluid.of('kubejs:ghast_tear', 80), "minecraft:ghast_tear")
	event.recipes.create.compacting("minecraft:ghast_tear", Fluid.of('kubejs:ghast_tear', 80))
	//哭泣黑曜石 分液/注液
	event.recipes.create.emptying(["minecraft:obsidian", Fluid.of('kubejs:ghast_tear', 10)], "minecraft:crying_obsidian")
	event.recipes.create.filling("minecraft:crying_obsidian", ["minecraft:obsidian", Fluid.of('kubejs:ghast_tear', 10)])
	//灵魂珠
	event.recipes.create.sequenced_assembly([
		Item.of('quark:soul_bead').withChance(1.0),
	], 'crabbersdelight:pearl', [
		event.recipes.create.filling('crabbersdelight:pearl', ['crabbersdelight:pearl', Fluid.of('kubejs:ghast_tear', 5)])
		//event.recipes.create.haunting('crabbersdelight:pearl', 'crabbersdelight:pearl'),
	]).transitionalItem("crabbersdelight:pearl").loops(3)

	event.recipes.createSplashing('minecraft:exposed_copper', 'minecraft:copper_block') //铜块氧化
	event.recipes.createSplashing('minecraft:weathered_copper', 'minecraft:exposed_copper')
	event.recipes.createSplashing('minecraft:oxidized_copper', 'minecraft:weathered_copper')

	event.recipes.create.crushing([ //绿宝石粒
		'kubejs:emerald_nugget',
		Item.of('kubejs:emerald_nugget').withChance(0.75)
	], 'minecraft:emerald')

	event.recipes.create.mixing('create:ochrum', [ //赭金沙
		'minecraft:sand',
		'#forge:ingots/gold'
	])
	event.recipes.create.mixing('create:veridium', [ //辉绿矿
		'minecraft:stone',
		'#forge:ingots/copper'
	])
	event.recipes.create.mixing('create:crimsite', [ //绯红岩
		'minecraft:stone',
		'#forge:ingots/iron'
	])
	event.recipes.create.mixing('create:asurine', [ //皓蓝石
		'minecraft:stone',
		'create:zinc_ingot'
	])
	event.recipes.create.mixing('quark:jasper', [ //碧玉石
		'minecraft:stone',
		'ultramarine:raw_hematite'
	])
	event.recipes.create.mixing('minecraft:ancient_debris', [ //远古残骸
		'minecraft:netherrack',
		'minecraft:netherite_scrap'
	]).heated()

	event.recipes.create.crushing('4x minecraft:netherite_scrap', 'minecraft:netherite_ingot')

	event.recipes.createMechanicalCrafting('kubejs:raw_totem', [ //粗制图腾
		'  D  ',
		'DCDCD',
		' DAD ',
		' DCD ',
		'  D  '
	], {
		A: 'minecraft:respawn_anchor',
		C: 'create:golden_sheet',
		D: 'minecraft:gold_nugget'
	})

	event.recipes.create.mixing(Fluid.of('kubejs:unstable_netherite_liquar', 1000), [ //不稳定下界溶液
		'quark:soul_bead',
		'quark:soul_bead',
		'quark:soul_bead',
		'quark:soul_bead',
		'quark:soul_bead',
		'minecraft:crimson_nylium',
		'minecraft:warped_nylium',
		'minecraft:basalt',
	]).heated()

	event.recipes.create.mixing('kubejs:fiber_mixture', [ //纤维混合物1
		'minecraft:kelp',
		'minecraft:kelp',
		'minecraft:kelp',
		'minecraft:kelp',
		'minecraft:white_wool',
		'minecraft:white_wool',
		'minecraft:white_wool',
		'minecraft:white_wool',
		'minecraft:yellow_dye'
	]).heated()

	event.recipes.create.mixing('minecraft:blaze_rod', [ //烈焰棒
		'nethersdelight:propelpearl',
		'minecraft:blaze_powder',
		'createaddition:gold_rod',
	]).superheated()

	event.shaped('kubejs:roller', [ //扭蛋机合成
		' SO',
		'IAH',
		' L '
	], {
		O: 'quark:redstone_randomizer',
		I: 'minecraft:lever',
		A: 'create:andesite_alloy_block',
		H: 'create:andesite_funnel',
		S: 'create:chute',
		L: 'minecraft:lapis_block'
	})

	event.shaped('kubejs:seller', [ //售货机合成
		' S ',
		'IAH',
		' L '
	], {
		I: 'create:content_observer',
		A: 'create:andesite_alloy_block',
		H: 'create:andesite_funnel',
		S: 'create:smart_chute',
		L: 'create:brass_casing'
	})

	event.shaped('buildersaddition:cabinet_cherry', [ //cabinet_cherry
		'AIA',
		'A A',
		'AIA'
	], {
		I: 'minecraft:cherry_slab',
		A: 'decorative_blocks:cherry_palisade'
	})

	event.recipes.create.mixing('kubejs:fiber_mixture', [ //纤维混合物2
		'minecraft:kelp',
		'minecraft:kelp',
		'minecraft:kelp',
		'minecraft:kelp',
		'minecraft:yellow_wool',
		'minecraft:yellow_wool',
		'minecraft:yellow_wool',
		'minecraft:yellow_wool'
	]).heated()

	event.recipes.create.mixing(Fluid.of('kubejs:netherite_liquar', 1000), [ //下界溶液
		'minecraft:quartz',
		'minecraft:quartz',
		'minecraft:quartz',
		'minecraft:quartz',
		'minecraft:quartz',
		'#forge:ingots/gold',
		'kubejs:blood_bottle',
		Fluid.of('kubejs:unstable_netherite_liquar', 1000),
		'#forge:ingots/gold'
	])

	event.recipes.create.crushing([ //下界合金块拆解
		'9x minecraft:netherite_ingot'
	], 'minecraft:netherite_block')

	event.recipes.create.mixing('kubejs:impure_alloy_base', [ //不纯合金坯
		'minecraft:diamond',
		'minecraft:diamond',
		'#forge:ingots/iron',
		'#forge:ingots/iron',
		'#forge:ingots/gold',
		'#forge:ingots/gold'
	]).superheated()

	event.recipes.createCompacting('kubejs:raw_alloy_base', [ //粗制合金坯
		'kubejs:impure_alloy_base',
		Fluid.of('minecraft:lava', 250)
	])

	event.recipes.createCompacting('minecraft:cobbled_deepslate', [ //深板岩圆石
		'2x minecraft:cobblestone'
	])


	event.recipes.createCompacting('minecraft:lapis_block', [ //青金石块
		'quark:indigo_corundum',
		'quark:indigo_corundum',
		'quark:indigo_corundum',
		'quark:indigo_corundum_cluster',
		'quark:indigo_corundum_cluster',
		'quark:indigo_corundum_cluster',
		'quark:indigo_corundum_cluster',
		'quark:indigo_corundum_cluster',
		'minecraft:magma_block',
		'minecraft:magma_block',
		'minecraft:magma_block',
		'minecraft:magma_block',
		'minecraft:magma_block',
		'minecraft:calcite',
		'minecraft:calcite',
		'minecraft:calcite',
		'minecraft:quartz',
		'minecraft:quartz',
		'minecraft:quartz',
	])

	event.recipes.createCompacting('4x minecraft:netherrack', [ //青金石块
		'minecraft:cobblestone',
		'minecraft:cobblestone',
		'minecraft:cobblestone',
		'minecraft:cobblestone',
		Fluid.of('minecraft:lava', 1000)
	])

	event.recipes.createCompacting('ultramarine:jade', [ //青金石块
		'minecraft:quartz',
		Fluid.of('minecraft:lava', 50)
	]).heated()

	event.recipes.create.compacting("kubejs:witch_factor", [ //魔女因子
		'ae2:singularity',
		'minecraft:netherite_scrap',
		'quark:soul_bead',
		Fluid.of('kubejs:netherite_liquar', 50)
	]).superheated()

	event.custom({
		"type": "createaddition:charging",
		"input": {
			"item": "kubejs:witch_factor",
			"count": 1
		},
		"result": {
			"item": "kubejs:activated_witch_factor",
			"count": 1,
		},
		"energy": 50000,
		"maxChargeRate": 1000
	})

	let corundumList = [ //刚玉列表
		'quark:white_corundum_cluster',
		'quark:red_corundum_cluster',
		'quark:orange_corundum_cluster',
		'quark:yellow_corundum_cluster',
		'quark:green_corundum_cluster',
		'quark:blue_corundum_cluster',
		'quark:indigo_corundum_cluster',
		'quark:violet_corundum_cluster',
		'quark:black_corundum_cluster'
	]

	corundumList.forEach(it => { //刚玉炼铝
		event.custom({
			"type": "createaddition:charging",
			"input": {
				"item": it,
				"count": 1
			},
			"result": {
				"item": 'chinjufumod:item_ingot_alumi',
				"count": 1,
			},
			"energy": 10000,
			"maxChargeRate": 1000
		})
	})

	event.recipes.createSequencedAssembly([ //下界合金序列组装
		Item.of('minecraft:netherite_ingot').withChance(1.0),
	], 'kubejs:raw_alloy_base', [
		event.recipes.createFilling('kubejs:incomplete_netherite_ingot', ['kubejs:incomplete_netherite_ingot', Fluid.of('kubejs:netherite_liquar', 250)]),
		event.recipes.createPressing('kubejs:incomplete_netherite_ingot', 'kubejs:incomplete_netherite_ingot'),
	]).transitionalItem('kubejs:incomplete_netherite_ingot').loops(5)

	event.recipes.createSequencedAssembly([ //不死图腾序列组装
		Item.of('minecraft:totem_of_undying').withChance(1.0),
	], 'kubejs:raw_totem', [
		event.recipes.createFilling('kubejs:incomplete_totem', ['kubejs:incomplete_totem', Fluid.of('create_enchantment_industry:hyper_experience', 25)]),
		event.recipes.createDeploying('kubejs:incomplete_totem', ['kubejs:incomplete_totem', 'kubejs:emerald_nugget']),
	]).transitionalItem('kubejs:incomplete_totem').loops(2)

	event.recipes.createSequencedAssembly([ //干海绵序列组装
		Item.of('minecraft:sponge').withChance(1.0),
	], 'kubejs:fiber_mixture', [
		event.recipes.createDeploying('kubejs:frother_mixture', ['kubejs:frother_mixture', 'minecraft:slime_ball']),
		event.recipes.createPressing('kubejs:frother_mixture', 'kubejs:frother_mixture'),
	]).transitionalItem('kubejs:frother_mixture').loops(3)
	/*
	event.recipes.createSequencedAssembly([ //玉米饼唱片序列组装
		Item.of('kubejs:tortilla').withChance(0.8),
		Item.of('culturaldelights:tortilla').withChance(0.15),
		Item.of('2x culturaldelights:tortilla_chips').withChance(0.05),
	],'culturaldelights:tortilla', [
		event.recipes.createDeploying('kubejs:incomplete_tortilla', ['kubejs:incomplete_tortilla','#farmersdelight:tools/knives']).keepHeldItem(),
	]).transitionalItem('kubejs:incomplete_tortilla').loops(20)
	*/

	event.recipes.createCompacting('2x quark:shale', [ //夸克页岩加热辊压
		'minecraft:clay',
		'minecraft:quartz'
	]).heated().id("kubejs:custom_shale_compacting");

	event.shaped('minecraft:shulker_box', [//坚固板->潜影盒合成
		' A ',
		' B ',
		' A '
	], {
		A: 'create:sturdy_sheet',
		B: '#forge:chests',
	})

	// event.shaped('simpleplanes:folding', [
	// 	' S ',
	// 	'PGP',
	// 	' S '
	// ], {
	// 	S: 'create:sturdy_sheet',
	// 	p: 'minecraft:piston',
	// 	G: '#forge:gems/diamond'
	// })

	event.shaped('8x supplementaries:item_shelf', [
		'PPP',
		'   ',
		'PPP'
	], {
		P: '#minecraft:planks',
	})
	event.shaped('decorative_blocks:lattice', [
		' P ',
		'P  ',
		'   '
	], {
		P: '#minecraft:planks',
	})

	event.shaped('kubejs:sparkler', [ //礼花合成
		'FFL',
		'SSS',
		'FF '
	], {
		F: 'minecraft:firework_rocket',
		S: 'minecraft:stick',
		L: 'minecraft:string'
	})

	event.shaped('kubejs:wine_crafting_table', [ //酿酒相关
		'   ',
		'AHG',
		' B '
	], {
		B: "create:brass_casing",
		A: "minecraft:polished_andesite",
		H: "minecraft:hopper",
		G: "minecraft:glass_bottle",
	})
	event.shaped('kubejs:ferment_container', [
		' D ',
		'AIG',
		' B '
	], {
		D: "kubejs:delta_coin",
		B: "create:brass_casing",
		A: "minecraft:barrel",
		I: "create:brass_ingot",
		G: "minecraft:glass_bottle",
	})
	event.shaped('kubejs:distiller', [
		' IG',
		'GSM',
		' B ',
	], {
		B: "create:brass_casing",
		S: "minecraft:stick",
		I: "create:brass_ingot",
		G: "minecraft:glass_bottle",
		M: "minecraft:magma_block"
	})
	event.shaped('kubejs:aging_container', [
		'DAD',
		'IFI',
		' B '
	], {
		D: "kubejs:delta_coin",
		B: "create:brass_casing",
		A: "minecraft:barrel",
		I: "create:brass_ingot",
		F: "supplementaries:faucet",
	})
	event.shaped('kubejs:lable_printer', [
		' P ',
		'PIE',
		' B '
	], {
		P: "minecraft:paper",
		B: "create:brass_casing",
		E: "create:electron_tube",
		I: "create:brass_ingot",
	})

	event.shaped('kubejs:uncomplete_diamond', [//未完成的钻石
		'SSS',
		'SCS',
		'SSS'
	], {
		S: 'kubejs:he_graphite_block',
		C: 'kubejs:diamond_core',
	})

	event.recipes.createMixing('kubejs:he_graphite', [ //高能石墨1
		'2x minecraft:coal'
	]).superheated()

	event.recipes.createMixing('kubejs:he_graphite', [ //高能石墨2
		'2x minecraft:charcoal'
	]).superheated()

	event.recipes.create.cutting('2x kubejs:small_crystal', [ //紫水晶碎块
		'minecraft:amethyst_shard'
	])

	event.recipes.create.splashing('kubejs:faded_small_crystal', [ //褪色水晶碎块
		'kubejs:small_crystal'
	])

	event.recipes.create.mixing('kubejs:diamond_core', [ //钻石核心
		'kubejs:faded_small_crystal',
		'minecraft:blue_dye'
	])

	event.recipes.create.crushing('4x minecraft:honeycomb', 'minecraft:honeycomb_block') //粉碎蜜脾块

	//铜砖瓦锈蚀
	event.recipes.create.splashing('create:exposed_copper_shingles', 'create:copper_shingles')
	event.recipes.create.splashing('create:weathered_copper_shingles', 'create:exposed_copper_shingles')
	event.recipes.create.splashing('create:oxidized_copper_shingles', 'create:weathered_copper_shingles')

	//凋零骷髅头
	event.recipes.create.haunting('minecraft:wither_skeleton_skull', 'kubejs:uncomplete_diamond')

	event.recipes.createSequencedAssembly([ //钻石序列组装
		Item.of('minecraft:diamond').withChance(1.0),
	], 'kubejs:uncomplete_diamond', [
		event.recipes.createDeploying('kubejs:uncomplete_diamond', ['kubejs:uncomplete_diamond', 'kubejs:he_graphite']),
		event.recipes.createPressing('kubejs:uncomplete_diamond', 'kubejs:uncomplete_diamond'),
	]).transitionalItem('kubejs:uncomplete_diamond').loops(15)

	event.shapeless('8x kubejs:firecracker', ['minecraft:paper', 'minecraft:gunpowder', 'minecraft:string', 'minecraft:red_dye']) //炮仗

	event.recipes.createSequencedAssembly([ //礼炮序列组装
		Item.of('kubejs:multiple_fireworks').withChance(1.0),
	], 'minecraft:paper', [
		event.recipes.createDeploying('minecraft:paper', ['minecraft:paper', 'minecraft:firework_rocket']),
		event.recipes.createDeploying('minecraft:paper', ['minecraft:paper', 'minecraft:string']),
	]).transitionalItem('minecraft:paper').loops(9)

	event.recipes.createSequencedAssembly([ //紫水晶母岩序列组装
		Item.of('minecraft:budding_amethyst').withChance(1.0),
	], 'minecraft:amethyst_block', [
		event.recipes.createDeploying('minecraft:amethyst_block', ['minecraft:amethyst_block', 'kubejs:small_crystal']),
		event.recipes.createDeploying('minecraft:amethyst_block', ['minecraft:amethyst_block', '#forge:tools/pickaxes']).keepHeldItem(),
	]).transitionalItem('minecraft:amethyst_block').loops(20)

	event.recipes.createSequencedAssembly([ //鞭炮序列组装
		Item.of('kubejs:multiple_firecrackers').withChance(1.0),
	], 'minecraft:string', [
		event.recipes.createDeploying('minecraft:string', ['minecraft:string', 'kubejs:firecracker']),
	]).transitionalItem('minecraft:string').loops(8)

	event.recipes.createSequencedAssembly([ //强化深板岩序列组装
		Item.of('minecraft:reinforced_deepslate').withChance(1.0),
	], 'minecraft:polished_deepslate', [
		event.recipes.createFilling('minecraft:polished_deepslate', ['minecraft:polished_deepslate', Fluid.of('minecraft:lava', 250)]),
		event.recipes.createDeploying('minecraft:polished_deepslate', ['minecraft:polished_deepslate', 'create:sturdy_sheet']),
		event.recipes.createDeploying('minecraft:polished_deepslate', ['minecraft:polished_deepslate', 'minecraft:polished_deepslate']),
		event.recipes.create.pressing('minecraft:polished_deepslate', 'minecraft:polished_deepslate')
	]).transitionalItem('minecraft:polished_deepslate').loops(5)

	const benches = [
		['chinjufumod:block_bench', 'minecraft:oak_slab'],
		['chinjufumod:block_bench_aca', 'minecraft:acacia_slab'],
		['chinjufumod:block_bench_bir', 'minecraft:birch_slab'],
		['chinjufumod:block_bench_doak', 'minecraft:dark_oak_slab'],
		['chinjufumod:block_bench_ich', 'forge:wooden_slabs/ginkgo'],
		['chinjufumod:block_bench_jun', 'minecraft:jungle_slab'],
		['chinjufumod:block_bench_kae', 'forge:wooden_slabs/acer'],
		['chinjufumod:block_bench_saku', 'forge:wooden_slabs/cherry'],
		['chinjufumod:block_bench_spru', 'minecraft:spruce_slab']
	];

	benches.forEach(([output, slab]) => {	//镇守府长椅配方修复
		event.shaped(output, [
			'YZ ',
			'XYX',
			'X X'
		], {
			X: { tag: 'forge:rods/wooden' },
			Y: slab.startsWith('forge:') ? { tag: slab } : { item: slab },
			Z: { tag: 'minecraft:wool_carpets' }
		});
	});

	const tunnelTypes = ['fe', 'redstone', 'me', 'item', 'fluid', 'light'];	//ae2调谐配方转化为工作台配方

	tunnelTypes.forEach(inputType => {
		tunnelTypes.forEach(outputType => {
			if (inputType === outputType) return;

			const X = `ae2:${inputType}_p2p_tunnel`;
			const T = `#ae2:p2p_attunements/${outputType}_p2p_tunnel`;
			const output = `ae2:${outputType}_p2p_tunnel`;

			event.shaped(
				Item.of(output, 8),
				[
					"XXX",
					"XTX",
					"XXX"
				],
				{
					X: X,
					T: T
				}
			).id(`kubejs:p2p_attunements/${inputType}_to_${outputType}`);
		});
	});

	//原矿

	const oreRecipes = [
		{ output: 'minecraft:coal_ore', ingredient: 'minecraft:coal' },
		{ output: 'minecraft:iron_ore', ingredient: 'minecraft:iron_ingot' },
		{ output: 'minecraft:lapis_ore', ingredient: 'minecraft:lapis_lazuli' },
		{ output: 'minecraft:copper_ore', ingredient: 'minecraft:copper_ingot' },
		{ output: 'create:zinc_ore', ingredient: 'create:zinc_ingot' },
		{ output: 'minecraft:gold_ore', ingredient: 'minecraft:gold_ingot' },
		{ output: 'minecraft:redstone_ore', ingredient: 'minecraft:redstone' },
		{ output: 'minecraft:emerald_ore', ingredient: 'minecraft:emerald' },
		{ output: 'minecraft:diamond_ore', ingredient: 'minecraft:diamond' }
	];

	oreRecipes.forEach(recipe => {

		event.recipes.createCompacting(recipe.output, [
			'minecraft:stone',
			`7x ${recipe.ingredient}`
		]).heated();

		let deepslateOre = recipe.output.replace(':', ':deepslate_');
		event.recipes.createCompacting(deepslateOre, [
			'minecraft:deepslate',
			`7x ${recipe.ingredient}`
		]).heated();
	});

})