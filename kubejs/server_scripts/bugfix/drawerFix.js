// priority: 0

console.info('服务器脚本（drawerFix.js）已重载')

let drawer = [
   'storagedrawers:gold_storage_upgrade',
   'storagedrawers:obsidian_storage_upgrade',
   'storagedrawers:iron_storage_upgrade',
   'storagedrawers:diamond_storage_upgrade',
   'storagedrawers:emerald_storage_upgrade',
   'storagedrawers:creative_storage_upgrade', //6

   'storagedrawers:void_upgrade',
   'storagedrawers:creative_vending_upgrade',
   'storagedrawers:conversion_upgrade',
   'storagedrawers:illumination_upgrade',
   'storagedrawers:fill_level_upgrade', //11

   'storagedrawers:redstone_upgrade',
   'storagedrawers:min_redstone_upgrade',
   'storagedrawers:max_redstone_upgrade',
   'storagedrawers:one_stack_upgrade' //15
];

let drawer_counter = 0

ServerEvents.recipes(event => {
    //解决抽屉+升级合成刷物品问题
    for (let drawer_counter = 0; drawer_counter <= 14; drawer_counter++) {
        //id以manual_only结尾 就不会生成自动搅拌/自动合成/自动粒子加工配方
        event.shapeless(Item.of('minecraft:stick').withName('请勿进行此合成'), ['#storagedrawers:drawers', drawer[drawer_counter]]).id('drawersfix_'+drawer_counter+'_manual_only')
    }
})

//修复抽屉破坏会复制物品的问题

BlockEvents.broken(event => {
    //Utils.server.tell();
    const { player: breaker, block } = event;
    if(block.hasTag('storagedrawers:drawers') && breaker.isFake()){
        event.cancel();
    }
})