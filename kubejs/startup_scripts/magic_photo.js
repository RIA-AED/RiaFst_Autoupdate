console.info('魔法照片已经成功载入! MagicPhoto loaded!')
StartupEvents.registry("item", event => {
    event.create("blue_magic_stone").displayName("蓝色魔石")
    event.create("red_magic_stone").displayName("红色魔石")
    event.create("yellow_magic_stone").displayName("黄色魔石")
    event.create("green_magic_stone").displayName("绿色魔石")
})