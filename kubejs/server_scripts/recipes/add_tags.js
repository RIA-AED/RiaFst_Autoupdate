ServerEvents.tags("item", event => {
    /*——————多元乐事——————*/
    //茄子
    event.add("forge:crops/eggplant", "culturaldelights:eggplant")
    event.add("forge:crops", "culturaldelights:eggplant")
    event.add("forge:vegetables", "culturaldelights:eggplant")
    event.add("forge:vegetables/eggplant", "culturaldelights:eggplant")
    event.add('culturaldelights:smoked_regular_eggplants', 'crockpot:cooked_eggplant')
    event.add('culturaldelights:smoked_all_eggplants', 'crockpot:cooked_eggplant')
    event.add('culturaldelights:all_eggplants', 'crockpot:eggplant')
    event.add('culturaldelights:regular_eggplants', 'crockpot:eggplant')
    //玉米
    event.add("forge:crops", "culturaldelights:corn_cob")
    event.add("forge:vegetables", "culturaldelights:corn_cob")
    event.add("forge:vegetables/corn", "culturaldelights:corn_cob")
    //黄瓜
    event.add("forge:vegetables", "culturaldelights:cucumber")
    event.add("forge:crops", "culturaldelights:cucumber")

    /*——————烹饪锅——————*/
    //奶瓶
    event.add("forge:milk/milk_bottle", "crockpot:milk_bottle")
    event.add("forge:milk", "crockpot:milk_bottle")
    //煎蛋
    event.add("forge:cooked_eggs", "crockpot:cooked_egg")
    event.add("c:cooked_eggs", "crockpot:cooked_egg")

    /*——————镇守府——————*/
    //辣椒
    event.add("forge:crops/pepper", "chinjufumod:item_crop_chilipepper")
    event.add("forge:crops", "chinjufumod:item_crop_chilipepper")
    event.add("forge:vegetables", "chinjufumod:item_crop_chilipepper")
    event.add("forge:vegetables/pepper", "chinjufumod:item_crop_chilipepper")
    //白菜
    event.add("forge:vegetables", 'chinjufumod:item_food_hakusai')
    //大米
    event.add('forge:grain/rice', 'chinjufumod:item_kome')
    event.add('forge:grain', 'chinjufumod:item_kome')
    event.add('forge:crops', 'chinjufumod:item_kome')
    event.add('forge:crops/rice', 'chinjufumod:item_kome')
    //洋葱
    event.add('forge:vegetables/onion', 'chinjufumod:item_food_onion')
    event.add('forge:vegetables', 'chinjufumod:item_food_onion')
    //初音未来
    event.add('forge:vegetables', 'chinjufumod:item_food_greenonion')
    //菠菜
    event.add('forge:vegetables', 'chinjufumod:item_food_spinach')

    //盐
    event.add('forge:salt', "chinjufumod:item_salt")

    //奶酪
    event.add('forge:cheese', "kubejs:cheese")
    event.add('forge:cheese', "kubejs:cut_cheese")
})

//AE2催生器生效方块
let ae2GrowthAcceleratable = [
    "nethersdelight:propelplant_berry_stem",
    "nethersdelight:propelplant_berry_cane",
    "nethersdelight:propelplant_stem",
    "nethersdelight:propelplant_cane"
]

//栅栏修复
let noDiagonalFences = [
    "buildersaddition:iron_fence_rough",
    "buildersaddition:iron_fence",
    "chinjufumod:block_bamboo_fence",
    "chinjufumod:block_bamboo_y_fence",
    "chinjufumod:block_bamboo_k_fence"
]

ServerEvents.tags("block", event => {
    /*——————多元乐事——————*/
    //树苗
    event.add("minecraft:saplings", "culturaldelights:avocado_sapling")

    /*——————催生器——————*/
    ae2GrowthAcceleratable.forEach(it => { event.add("ae2:growth_acceleratable", it) })

    /*——————栅栏修复——————*/
    noDiagonalFences.forEach(it => { event.add("diagonalfences:non_diagonal_fences", it) })

    /*——————镇守府修复——————*/
    event.add("farmersdelight:heat_sources", "chinjufumod:block_kit_stove")
    event.add("farmersdelight:heat_sources", "chinjufumod:block_kit_oven")
    event.add("farmersdelight:heat_sources", "chinjufumod:block_kit_oven_black")
})