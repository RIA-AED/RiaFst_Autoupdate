// priority: 0
console.info('启动脚本（script.js）已加载')

StartupEvents.registry("item", event => {
  // 三角币注册
  event.create("delta_coin").displayName("§e▲§7三角币").maxStackSize(64)
  // 小三角币
  event.create("delta_coin_chip").displayName("§e△§7三角片").maxStackSize(64)
  // 不纯合金坯
  event.create("impure_alloy_base").displayName("不纯合金坯").maxStackSize(64)
  // 粗制合金坯
  event.create("raw_alloy_base").displayName("粗制合金坯").maxStackSize(64)
  // 半成品合金
  event.create("incomplete_netherite_ingot").displayName("半成品合金").maxStackSize(64)
  // 血瓶
  event.create("blood_bottle").displayName("血瓶").maxStackSize(1)
  // 采血套装
  event.create('hemostix').maxStackSize(16).displayName('采血套装')
  // 采血套装plus
  event.create('hemostix_plus').maxDamage(13).displayName('采血套装plus').useAnimation("toot_horn")
  // 巧克力意面
  event.create('pasta_with_chocolate').maxStackSize(16)
    .food((food) => {
      food.hunger(12).saturation(1)
        .effect('minecraft:bad_omen', 600, 1, 0.02)
        .effect('minecraft:nausea', 200, 2, 0.75)
    })
    .displayName('巧克力意面')
  // 收割黑夜
  event.create("harvest_the_night").glow(true).unstackable().maxDamage(200).displayName("收割黑夜").useAnimation("bow")
  // 焦糖鳕鱼羹
  event.create('caramel_cod_soup').maxStackSize(16)
    .food((food) => {
      food.hunger(10)
    })
    .displayName('焦糖鳕鱼羹')
  // 健胃消食片
  event.create('digestion_pellow').maxStackSize(64)
    .food((food) => {
      food.hunger(0)
        .effect('minecraft:hunger', 300, 79, 1)
        .alwaysEdible()
    })
    .displayName('健胃消食片')
  // 绿宝石粒
  event.create("emerald_nugget").displayName("绿宝石粒")
  // 半成品图腾
  event.create("incomplete_totem").displayName("半成品图腾")
  // 粗制图腾
  event.create("raw_totem").displayName("粗制图腾")
  // 纤维混合物
  event.create("fiber_mixture").displayName("纤维混合物")
  // 发泡混合物
  event.create("frother_mixture").displayName("发泡混合物")
  // 鱿鱼狂欢节
  event.create('squid_festival').maxStackSize(16)
    .food((food) => {
      food.hunger(12).saturation(1)
        .effect('minecraft:nausea', 200, 5, 1)
    })
    .displayName('鱿鱼狂欢节')
  // 刻痕玉米饼
  event.create("incomplete_tortilla").displayName("刻痕玉米饼")
  // 深海鳕鱼堡
  event.create('cod_burger')
    .food((food) => {
      food.hunger(12).saturation(1)
    })
    .displayName('深海鳕鱼堡')
  // 油炸鳕鱼
  event.create("fried_cod").displayName("油炸鳕鱼").food((food) => { food.hunger(8).saturation(1) })
  // 切制奶酪
  event.create("cut_cheese").displayName("切制奶酪").food((food) => { food.hunger(4).saturation(1) })
  // 奶酪
  event.create("cheese").displayName("奶酪")
  // 切片玛格丽特披萨
  event.create("sliced_pizza_margarita").displayName("切片玛格丽特披萨").food((food) => { food.hunger(4).saturation(1).effect('farmersdelight:nourishment', 1200, 1, 1) })
  // 生玛格丽特披萨
  event.create("raw_pizza_margarita").displayName("生玛格丽特披萨")
  // 切片生猪肉碎披萨
  event.create("sliced_pork_pizza").displayName("切片猪肉碎披萨").food((food) => { food.hunger(5).saturation(1.2).effect('farmersdelight:nourishment', 1800, 1, 1) })
  // 生猪肉碎披萨
  event.create("raw_pork_pizza").displayName("生猪肉碎披萨")
  // 切片苹果披萨
  event.create("sliced_apple_pizza").displayName("切片苹果披萨").food((food) => { food.hunger(5).saturation(1).effect('farmersdelight:nourishment', 1300, 1, 1).effect('minecraft:bad_omen', 600, 1, 0.02) })
  // 生猪肉碎披萨
  event.create("raw_apple_pizza").displayName("生苹果披萨")
  // 披萨饼底
  event.create("pizza_base").displayName("披萨饼底")
  // 竹蜻蜓
  event.create("copter").displayName("竹蜻蜓").unstackable().maxDamage(20).useAnimation("spyglass")
  /* // 醪糟
   event.create("ferment").displayName("醪糟").food((food) => { food.hunger(5).saturation(3).effect('minecraft:nausea', 200, 0, 1).effect('minecraft:strength', 1200, 0, 1) })
  */ // 劲爆鳕鱼堡
  event.create('bomb_cod_burger').food((food) => { food.hunger(14).saturation(14) }).displayName('劲爆鳕鱼堡')
  //豆腐
  event.create('bean_curd').displayName("豆腐")
  //小块豆腐
  event.create('cut_bean_curd').displayName("小块豆腐").food((food) => { food.hunger(3).saturation(0) })
  //甜豆花
  event.create('sweet_bean_curd').displayName("甜豆花").food((food) => { food.hunger(8).saturation(1) })
  //咸豆腐脑
  event.create('salty_bean_curd').displayName("咸豆腐脑").food((food) => { food.hunger(8).saturation(1) })
  //麻婆豆腐
  event.create('spicy_bean_curd').displayName("麻婆豆腐").food((food) => { food.hunger(8).saturation(1).effect('farmersdelight:nourishment', 600, 0, 1) })
  //浆果麻婆豆腐
  event.create('berry_bean_curd').displayName("浆果麻婆豆腐").food((food) => { food.hunger(10).saturation(1).effect('farmersdelight:nourishment', 600, 0, 1) })
  //酱油瓶
  event.create('soy_sause_bottle').displayName("酱油瓶").maxStackSize(16)
  //高能石墨
  event.create('he_graphite').displayName("高能石墨")
  //紫水晶碎块
  event.create('small_crystal').displayName("紫水晶碎块")
  //褪色水晶碎块
  event.create('faded_small_crystal').displayName("褪色水晶碎块")
  //钻石核心
  event.create('diamond_core').displayName("钻石核心")
  //未完成的钻石
  event.create('uncomplete_diamond').displayName("未完成的钻石")
  //机械手润滑剂
  event.create('deployer_lubricant').maxDamage(100).maxStackSize(1).displayName("机械手润滑剂")
  //三角尘
  event.create('delta_dust').displayName("§e❖§7三角尘")
  //抽奖卷
  event.create('roller_ticket').displayName("抽奖卷")
  //大豆油
  event.create('soy_bean_oil').tag("forge:cooking_oil").maxStackSize(16).displayName("大豆油")
  //幻翼虾仁
  event.create('phantom_shrimp').displayName("幻翼虾仁").food((food) => { food.hunger(7).saturation(1.5) })
  //三角粥
  event.create('delta_porridge').displayName("三角粥").food((food) => { food.hunger(9).saturation(0.8) }).useAnimation("drink")
  //魔女因子
  event.create("witch_factor").displayName("魔女因子")
  //活化的魔女因子
  event.create("activated_witch_factor").displayName("活化的魔女因子")
  //饮品659
  event.create("drink659").food((food) => { food.hunger(2).saturation(1.5).alwaysEdible() }).useAnimation("drink").displayName("饮品659")
  //晴天鳕鱼
  event.create("sunshine_cod").food((food) => { food.hunger(5).saturation(1.5).alwaysEdible() }).displayName("晴天鳕鱼")
  //量产晴天鳕鱼
  event.create("raw_sunshine_cod").displayName("生晴天鳕鱼")
  //温泉蛋牛肉盖饭
  event.create("beef_over_rice").food((food) => { food.hunger(10).saturation(0.6).alwaysEdible() }).displayName("温泉蛋牛肉盖饭")
  //秘封洋葱绿叶肥虫汤
  event.create("bug_soup").food((food) => {
    food.hunger(4).saturation(0.2).alwaysEdible()
      .effect('minecraft:mining_fatigue', 600, 1, 1)
      .effect('minecraft:speed', 1200, 0, 1)
  }).displayName("秘封洋葱绿叶肥虫汤")
  //钻石镰刀
  const $ChatFormatting = Java.loadClass("net.minecraft.ChatFormatting")
  event.create("kaleidoscope_cookery:diamond_sickle", 'sword')
    .displayName("钻石镰刀")
    .modifyTier(tier => {
      tier.level = 4
      tier.uses = 3000
      tier.speed = 9.0
      tier.attackDamageBonus = 0.0
      tier.enchantmentValue = 10
      tier.repairIngredient = Ingredient.of(Items.DIAMOND)
    })
    .speed(-2.4)
    .tooltip(Component.translatable("tooltip.kaleidoscope_cookery.sickle").withStyle($ChatFormatting.GRAY))
    .tag('minecraft:swords')
    .tag('create:upright_on_deployer')
    .tag('forge:tools')
    .tag('kaleidoscope_cookery:cookery_mod_items')
    .tag('minecraft:breaks_decorated_pots')
    .tag('minecraft:tools')
  //下界合金镰刀
  event.create("kaleidoscope_cookery:netherite_sickle", 'sword')
    .displayName("下界合金镰刀")
    .modifyTier(tier => {
      tier.level = 4
      tier.uses = 4000
      tier.speed = 9.0
      tier.attackDamageBonus = 2.0
      tier.enchantmentValue = 15
      tier.repairIngredient = Ingredient.of(Items.DIAMOND)
    })
    .speed(-2.4)
    .fireResistant()
    .tooltip(Component.translatable("tooltip.kaleidoscope_cookery.sickle").withStyle($ChatFormatting.GRAY))
    .tag('minecraft:swords')
    .tag('create:upright_on_deployer')
    .tag('forge:tools')
    .tag('kaleidoscope_cookery:cookery_mod_items')
    .tag('minecraft:breaks_decorated_pots')
    .tag('minecraft:tools')
})

StartupEvents.registry("block", event => {
  event.create("ramen", "cardinal").defaultCutout()
    .box(2, 0, 2, 14, 6, 14, true)
    .soundType('wool')
    .hardness(1)
    .noDrops()
    .property(BlockProperties.BITES)
    .displayName('拉面')
  event.create('seller', "cardinal").defaultCutout() //售货机
    .soundType('stone')
    .box(1, 0, 1, 15, 16, 15, true)
    .hardness(5)
    .resistance(Number.MAX_VALUE)
    .blockEntity(entity => { })
    .displayName('售货机')
  event.create('roller', "cardinal").defaultCutout() //扭蛋机
    .soundType('stone')
    .hardness(5)
    .resistance(Number.MAX_VALUE)
    .blockEntity(entity => {
    })
    .displayName('扭蛋机')
  event.create('pizza_margarita').defaultCutout() //玛格丽特披萨
    .box(2, 0, 2, 14, 2, 14, true)
    .soundType('wool')
    .hardness(1)
    .displayName('玛格丽特披萨')
  event.create('pizza_margarita2').defaultCutout() //玛格丽特披萨
    .box(2, 0, 2, 14, 2, 14, true)
    .soundType('wool')
    .hardness(1)
    .noItem().noDrops()
    .displayName('玛格丽特披萨')
  event.create('pizza_margarita3').defaultCutout() //玛格丽特披萨
    .box(2, 0, 2, 14, 2, 14, true)
    .soundType('wool')
    .hardness(1)
    .noItem().noDrops()
    .displayName('玛格丽特披萨')
  event.create('pizza_margarita4').defaultCutout() //玛格丽特披萨
    .box(2, 0, 2, 14, 2, 14, true)
    .soundType('wool')
    .hardness(1)
    .noItem().noDrops()
    .displayName('玛格丽特披萨')
  event.create('pork_pizza').defaultCutout() //猪肉碎披萨
    .box(2, 0, 2, 14, 2, 14, true)
    .soundType('wool')
    .hardness(1)
    .displayName('猪肉碎披萨')
  event.create('pork_pizza2').defaultCutout() //猪肉碎披萨
    .box(2, 0, 2, 14, 2, 14, true)
    .soundType('wool')
    .hardness(1)
    .noItem().noDrops()
    .displayName('猪肉碎披萨')
  event.create('pork_pizza3').defaultCutout() //猪肉碎披萨
    .box(2, 0, 2, 14, 2, 14, true)
    .soundType('wool')
    .hardness(1)
    .noItem().noDrops()
    .displayName('猪肉碎披萨')
  event.create('pork_pizza4').defaultCutout() //猪肉碎披萨
    .box(2, 0, 2, 14, 2, 14, true)
    .soundType('wool')
    .hardness(1)
    .noItem().noDrops()
    .displayName('猪肉碎披萨')
  event.create('apple_pizza').defaultCutout() //苹果披萨
    .box(2, 0, 2, 14, 2, 14, true)
    .soundType('wool')
    .hardness(1)
    .displayName('苹果披萨')
  event.create('apple_pizza2').defaultCutout() //苹果披萨
    .box(2, 0, 2, 14, 2, 14, true)
    .soundType('wool')
    .hardness(1)
    .noItem().noDrops()
    .displayName('苹果披萨')
  event.create('apple_pizza3').defaultCutout() //苹果披萨
    .box(2, 0, 2, 14, 2, 14, true)
    .soundType('wool')
    .hardness(1)
    .noItem().noDrops()
    .displayName('苹果披萨')
  event.create('apple_pizza4').defaultCutout() //苹果披萨
    .box(2, 0, 2, 14, 2, 14, true)
    .soundType('wool')
    .hardness(1)
    .noItem().noDrops()
    .displayName('苹果披萨')
  event.create('candle_stick').defaultCutout() //烛台
    .box(6, 0, 6, 10, 12, 10, true)
    //.renderType('cutout')
    .hardness(1)
    .displayName('烛台')
    .lightLevel(14)
  event.create('burger').defaultCutout() //汉堡模型
    .box(3, 0, 3, 13, 8, 13, true)
    //.renderType('cutout')
    .hardness(0)
    .displayName('汉堡模型')
  event.create('nanako_sculpture', "cardinal").defaultCutout() //鱼子小雕
    .box(2, 0, 2, 14, 14, 14, true)
    //.renderType('cutout')
    .soundType('lantern')
    .hardness(0)
    .displayName('鱼子小雕')
    .lightLevel(8)
  event.create('golden_cooking_pot').defaultCutout() //金厨锅
    .box(2, 0, 2, 14, 10, 14, true)
    //.renderType('cutout')
    .soundType('lantern')
    .hardness(0)
    .displayName('金厨锅')
  event.create('golden_skillet').defaultCutout() //金煎锅
    .box(2, 0, 2, 14, 4, 14, true)
    //.renderType('cutout')
    .soundType('lantern')
    .hardness(0)
    .displayName('金煎锅')
  event.create('silver_cooking_pot').defaultCutout() //银厨锅
    .box(2, 0, 2, 14, 10, 14, true)
    //.renderType('cutout')
    .soundType('lantern')
    .hardness(0)
    .displayName('银厨锅')
  event.create('copper_cooking_pot').defaultCutout() //铜厨锅
    .box(2, 0, 2, 14, 10, 14, true)
    //.renderType('cutout')
    .soundType('lantern')
    .hardness(0)
    .displayName('铜厨锅')
  event.create('event_block_1').defaultCutout() //活动方块1
    //.renderType('cutout')
    .soundType('lantern')
    .hardness(0)
    .displayName('活动方块1')
  event.create('event_block_2').defaultCutout() //活动方块2
    //.renderType('cutout')
    .soundType('lantern')
    .hardness(0)
    .displayName('活动方块2')
  event.create('event_block_3').defaultCutout() //活动方块3
    //.renderType('cutout')
    .soundType('lantern')
    .hardness(0)
    .displayName('活动方块3')
  event.create('he_graphite_block').defaultCutout() //高能石墨块
    .hardness(1)
    .tagBlock("mineable/pickaxe")
    .displayName('高能石墨块')
})

StartupEvents.registry("fluid", event => {
  event.create('netherite_liquar').bucketColor(0xE2E2F6).noBlock()
    .displayName('下界溶液')
  event.create('unstable_netherite_liquar').bucketColor(0x770070).noBlock()
    .displayName('不稳定下界溶液')
  event.create('bean_sause').bucketColor(0xFFFEDC).noBlock().thinTexture(0xFFFEDC)
    .displayName('豆浆')
  event.create('bean_oil').bucketColor(0xefcc8c).noBlock().thinTexture(0xefcc8c)
    .displayName('大豆油')
  event.create('soy_sause').bucketColor(0x4A1E00).noBlock().thinTexture(0x4A1E00)
    .displayName('酱油')
  event.create('ghast_tear').bucketColor(0xcdeeee).noBlock().thinTexture(0xcdeeee)
    .displayName('恶魂之泪')
})

StartupEvents.registry("mob_effect", event => {
  event.create("fair_play").beneficial().color(0x00FF00).displayName("绿玩")
  event.create("rewind").beneficial().color(0xBA0000).displayName("死亡回溯")
  event.create("hot_potato").harmful().color(0xFF6D37).displayName("击鼓传花")
  event.create("madness").harmful().color(0xC0C0C0).displayName("谵妄")
})

/*
let music_list = {
  "never_gonna_give_you_up": "Never gonna give you up - Rick Astley",
}

StartupEvents.registry("sound_event", event => {
  Object.keys(music_list).forEach(value => {
    event.create(`music.${value}`)
  })
})

StartupEvents.registry("item", event => {
  Object.keys(music_list).forEach((value, index) => {
    event.create('tortilla', "music_disc")
      .song(`kubejs:music.${value}`)
      .analogOutput(index + 1)
      .displayName('怪异的玉米饼')
      .song()
  })
})
*/