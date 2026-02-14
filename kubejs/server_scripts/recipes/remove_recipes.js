// priority: 0

let removeById = [
  'minecraft:netherite_ingot',      //下界合金
  'chinjufumod:item_chisel',        //凿子
  'chinjufumod:block_boxh_empty',   //空盒子
  'quark:tweaks/crafting/elytra_duplication',//龙鳞鞘翅复制
  'chinjufumod:other_bookshelf',    //镇守府书架
  'chinjufumod:block_steel_block',  //镇守府钢材堆
  'chinjufumod:block_bench',
  'chinjufumod:block_bench_aca',
  'chinjufumod:block_bench_bir',
  'chinjufumod:block_bench_doak',
  'chinjufumod:block_bench_ich',
  'chinjufumod:block_bench_jun',
  'chinjufumod:block_bench_kae',
  'chinjufumod:block_bench_saku',
  'chinjufumod:block_bench_spru',   //镇守府长椅修复
  'decorative_blocks:lattice',      //木格
  'nethersdelight:propelplant_stem', //抢药草茎
  'create:empty_chinjufumod_item_mizuoke_milk_of_minecraft_milk' //生成铁桶的镇守府木奶桶分液配方
]
let removeByInput =[
  'chinjufumod:block_boxh_empty',    //镇守府盒子
  'chinjufumod:item_workorder'       //镇守府工厂指示书
]

let removeByOutput = [
  'farmersdelight:fried_egg',

  'automobility:steep_slope',
  'automobility:slope',
  'automobility:dash_panel',

  'waystones:return_scroll',
  'waystones:bound_scroll',
  'waystones:warp_scroll',
  'waystones:warp_stone',
  'waystones:warp_dust',
  'waystones:waystone',
  'waystones:mossy_waystone',
  'waystones:sandy_waystone',
  'waystones:sharestone',
  
  'buildersaddition:shop_sign_wood',
  /buildersaddition:.*_vertical_slab/,


  'opf:opf',
  'supplementaries:item_shelf',
  'chinjufumod:block_makibishi',
  'chinjufumod:block_empty_box',
  'chinjufumod:item_anchor',
  'chinjufumod:item_ammunition_kc',
  'chinjufumod:item_ammunition_medium',
  'chinjufumod:item_ammunition_small',
  'chinjufumod:item_shouhou_empty',
  'chinjufumod:item_shouhou',
  'chinjufumod:block_lettertray_c',
  'chinjufumod:block_fudetray_c',
  'chinjufumod:block_bauxite_box',
  'chinjufumod:block_ammunition_box',
  'armourers_workshop:skin-library',
  'armourers_workshop:skin-library-global',
  'armourers_workshop:skinning-table',
  'armourers_workshop:dye-table',
  'armourers_workshop:outfit-maker',
  'armourers_workshop:armourer',
  'armourers_workshop:advanced-skin-builder',
  'armourers_workshop:skin-template'
]

global.removedItems = removeByOutput.filter(item => ![
  'buildersaddition:shop_sign_wood',
  'supplementaries:item_shelf'
].includes(item))

ServerEvents.recipes(event => {
  removeById.forEach(it=>{event.remove({id: it})})
  removeByInput.forEach(it=>{event.remove({input: it})})
  removeByOutput.forEach(it=>{event.remove({output: it})})
})