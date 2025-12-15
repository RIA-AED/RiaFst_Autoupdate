// priority: 0

console.info('启动脚本（springFestival.js）已加载')

StartupEvents.registry("item", event => {
    //炮仗
    event.create('firecracker').displayName('炮仗')
    //礼花
    event.create('sparkler').displayName('礼花')
})

StartupEvents.registry("block", event => {
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