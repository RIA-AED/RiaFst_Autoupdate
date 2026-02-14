// priority: 0

console.info('启动脚本（springFestival.js）已加载')

StartupEvents.registry("item", event => {
    //炮仗
    event.create('firecracker').displayName('炮仗')
    //礼花
    event.create('sparkler').displayName('礼花')
    //饺子
    event.create('raw_dumpling').displayName('生饺子')
    event.create('raw_dumpling_plate').unstackable().displayName('一盘生饺子')
    event.create('dumpling_wrapper').displayName('饺子皮')
    event.create('cooked_dumpling').food((food) => { food.hunger(4).saturation(1).fastToEat() }).displayName('饺子')

})

let $IntegerProperty = Java.loadClass("net.minecraft.world.level.block.state.properties.IntegerProperty");

StartupEvents.registry("block", event => {
    event.create('cooked_dumpling_plate',"cardinal").defaultCutout()
        .soundType('wool')
        .hardness(1)
        .noDrops()
        .item(item => { item.unstackable().displayName("一盘熟饺子") })
        .blockEntity(entity => { })
        .box(1, 0, 1, 15, 4, 15, true)
        .property($IntegerProperty.create('bite', 0, 9)).noDrops()
        .displayName("一盘熟饺子")
    event.create('multiple_fireworks').defaultCutout() //礼炮
        .hardness(1)
        .displayName('礼炮')
    event.create('firing_multiple_fireworks').defaultCutout() //燃放的礼炮
        .hardness(60)
        .displayName('燃放的礼炮')
        .noItem().noDrops()
    event.create('fireworks_box').defaultCutout() //礼炮纸壳
        .hardness(0.3)
        .displayName('礼炮纸壳').noDrops()
    event.create('multiple_firecrackers').defaultCutout() //鞭炮
        .box(2, 0, 2, 14, 2, 14, true)
        .hardness(1)
        .displayName('鞭炮')
})