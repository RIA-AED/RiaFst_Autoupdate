let gameSettings = {
    maxWrenchDistance: 16, //占领的最大距离（曼哈顿距离）
    maxLobbyDistance: 20, //大厅的最大范围（曼哈顿距离）
    occupyCoolDown: 5, //每次占领的冷却（刻）
    initRespwanCount: 80, //进攻方初始命数
    addRespwanPerStage: 40, //每攻占一个占领区增加的命数
    minPlayerCount: 2, //最少玩家数
}

let targetPos1 = { x: 1489, y: 79, z: 2142, name: "夜莺港剧院" }
let targetPos2 = { x: 1377, y: 66, z: 2155, name: "军事公园" }
let targetPos3 = { x: 1222, y: 66, z: 2097, name: "图书馆前" }
let targetPos4 = { x: 1247, y: 66, z: 2209, name: "商业街" }
let targetPos5 = { x: 1197, y: 71, z: 2281, name: "消防局" } //各占领区中心点坐标

let lobbyPos = { x: 1494, y: 274, z: 2255 } //大厅坐标
let lobbyWarpPos = { x: 658, y: 189, z: -89 } //大厅-甲村传送石坐标
let spawnWarpPos = { x: -731, y: 65, z: -800 } //甲村-大厅传送石坐标
let serverWarpPos = { x: -731, y: 65, z: -802 } //两服传送石坐标

let SpawnA1 = { x: 1477, y: 63, z: 2056 }
let SpawnB1 = { x: 1416, y: 65, z: 2199 }
let SpawnA2 = { x: 1458, y: 65, z: 2139 }
let SpawnB2 = { x: 1302, y: 69, z: 2146 }
let SpawnA3 = { x: 1297, y: 64, z: 2125 }
let SpawnB3 = { x: 1193, y: 65, z: 2140 }
let SpawnA4 = { x: 1312, y: 64, z: 2193 }
let SpawnB4 = { x: 1196, y: 64, z: 2225 }
let SpawnA5 = { x: 1263, y: 65, z: 2231 }
let SpawnB5 = { x: 1135, y: 64, z: 2326 } //各阶段两方出生点坐标


const equipTypes = [
    { //医疗兵
        mainWeapon: Item.of('create:potato_cannon', '{Damage:0,display:{Name:\'{"text":"PKS-94/C气动射手步枪"}\'},sound:"createbigcannons:fire_autocannon"}').enchant('minecraft:unbreaking', 10),
        allEquips: [
            Item.of('create_confectionery:caramelized_marshmellow_on_a_stick', 16, "{display:{Lore:['{\"extra\":[{\"text\":\"发射1颗造成高伤害的远距离弹丸\"}],\"text\":\"\"}'],Name:'{\"text\":\"中口径碳芯弹(焦糖风味)\"}'}}"),
            Item.of('kubejs:incomplete_wine_bottle', "{display:{Lore:['{\"extra\":[{\"text\":\"中等范围附加中等时长的移动和视野限制效果\"}],\"text\":\"\"}'],Name:'{\"text\":\"特浓甲醇2升装\"}'}}"),
            Item.of('kubejs:incomplete_wine_bottle', "{display:{Lore:['{\"extra\":[{\"text\":\"中等范围附加中等时长的移动和视野限制效果\"}],\"text\":\"\"}'],Name:'{\"text\":\"特浓甲醇2升装\"}'}}"),
            Item.of('immersive_weathering:golden_moss_clump', 4, "{display:{Lore:['{\"extra\":[{\"text\":\"发射1颗附加回复效果的远距离弹丸\"}],\"text\":\"\"}'],Name:'{\"text\":\"肾上腺素50ml装(含尾翼)\"}'}}"),
            Item.of('immersive_weathering:enchanted_golden_moss_clump', "{display:{Lore:['{\"extra\":[{\"text\":\"小范围附加中等时长的强力回复与抗性效果\"}],\"text\":\"\"}'],Name:'{\"text\":\"肾上腺素1升装\"}'}}"),
            Item.of('minecraft:goat_horn', '{instrument:"minecraft:ponder_goat_horn"}'),
            '32x minecraft:bread',
        ],

        armor1: "minecraft:leather_helmet",
        armor2: "minecraft:iron_chestplate",
        armor3: "minecraft:leather_leggings",
        armor4: "minecraft:iron_boots",
    }, { //掷弹兵
        mainWeapon: Item.of('create:potato_cannon', '{Damage:0,display:{Name:\'{"text":"PER-29X模块化气动武器系统(E型号)"}\'}}').enchant('minecraft:unbreaking', 10),
        allEquips: [
            Item.of('createaddition:biomass_pellet', 64, "{display:{Lore:['{\"extra\":[{\"text\":\"发射1颗造成少量伤害的高射速弹丸\"}],\"text\":\"\"}'],Name:'{\"text\":\"可降解弹药\"}'}}"),
            Item.of('minecraft:trident', '{Damage:0,RepairCost:1,display:{Name:\'{"text":"可复用尾翼稳定穿甲体"}\'}}').enchant('minecraft:loyalty', 3),
            Item.of('kubejs:incomplete_wine_bottle', "{display:{Lore:['{\"extra\":[{\"text\":\"中等范围附加中等时长的移动和视野限制效果\"}],\"text\":\"\"}'],Name:'{\"text\":\"特浓甲醇2升装\"}'}}"),
            '2x minecraft:golden_apple',
            Item.of('farmersdelight:stuffed_pumpkin', 4, "{display:{Lore:['{\"extra\":[{\"text\":\"发射1颗造成高伤害的爆炸弹丸\"}],\"text\":\"\"}'],Name:'{\"text\":\"碗装装药南瓜\"}'}}"),

            Item.of('create_confectionery:marshmallow', 4, "{display:{Lore:['{\"extra\":[{\"text\":\"中等范围附加较短时长的巨额击退和移动限制效果\"}],\"text\":\"\"}'],Name:'{\"text\":\"气震棉花糖\"}'}}"),
            '64x minecraft:bread',
        ],

        armor1: "minecraft:leather_helmet",
        armor2: "minecraft:leather_chestplate",
        armor3: "minecraft:iron_leggings",
        armor4: "minecraft:iron_boots",
    }, { //狙击手
        mainWeapon: Item.of('create:potato_cannon', '{Damage:0,RepairCost:1,display:{Name:\'{"text":"PT-01S/PK长程气动步枪"}\'},sound:"chinjufumod:am_fire"}').enchant('minecraft:unbreaking', 10),
        allEquips: [
            '16x minecraft:bread',
            Item.of('culturaldelights:pickle', 8, "{display:{Lore:['{\"extra\":[{\"text\":\"发射1颗造成极高伤害的远距离弹丸\"}],\"text\":\"\"}'],Name:'{\"text\":\"尾翼稳定脱壳穿甲黄瓜\"}'}}"),
            Item.of('culturaldelights:corn_cob', 64, "{display:{Lore:['{\"extra\":[{\"text\":\"发射1颗造成较高伤害的弹丸\"}],\"text\":\"\"}'],Name:'{\"text\":\"铅芯玉米\"}'}}"),
            Item.of('crabbersdelight:cooked_glow_squid_tentacles', 2, "{display:{Lore:['{\"extra\":[{\"text\":\"中范围附加较长时长的发光效果\"}],\"text\":\"\"}'],Name:'{\"text\":\"铝粉鱿鱼须\"}'}}"),
            '2x immersive_weathering:golden_moss_clump',
            Item.of('minecraft:crossbow', '{Charged:1b,ChargedProjectiles:[{Count:1b,id:"supplementaries:rope_arrow",tag:{Damage:0}}],Damage:0}')
        ],

        armor1: "minecraft:leather_helmet",
        armor2: "minecraft:leather_chestplate",
        armor3: "minecraft:leather_leggings",
        armor4: "minecraft:leather_boots",
    }, { //突破手
        mainWeapon: Item.of('create:potato_cannon', '{Damage:0,display:{Name:\'{"text":"PM-445速射气动手枪"}\'},sound:"createbigcannons:fire_machine_gun"}').enchant('minecraft:unbreaking', 10),
        allEquips: [
            Item.of('supplementaries:candy', 64, "{display:{Lore:['{\"extra\":[{\"text\":\"发射1颗造成较少伤害的弹丸\"}],\"text\":\"\"}'],Name:'{\"text\":\"糖豆弹\"}'}}"),
            Item.of('supplementaries:candy', 64, "{display:{Lore:['{\"extra\":[{\"text\":\"发射1颗造成较少伤害的弹丸\"}],\"text\":\"\"}'],Name:'{\"text\":\"糖豆弹\"}'}}"),
            Item.of('minecraft:netherite_axe', '{Damage:0,RepairCost:1}').enchant('minecraft:sharpness', 4),
            '16x culturaldelights:chicken_roll_slice',
            '2x minecraft:golden_apple',
            'minecraft:totem_of_undying',
            Item.of('minecraft:crossbow', '{Charged:1b,ChargedProjectiles:[{Count:1b,id:"supplementaries:rope_arrow",tag:{Damage:0}}],Damage:0}')
        ],

        armor1: "minecraft:leather_helmet",
        armor2: "minecraft:leather_chestplate",
        armor3: 'minecraft:chainmail_leggings',
        armor4: "minecraft:leather_boots",
    }, { //步枪手
        mainWeapon: Item.of('create:potato_cannon', '{Damage:0,RepairCost:1,display:{Name:\'{"text":"PRM-77/UW气动步枪"}\'},sound:"createbigcannons:fire_machine_gun"}').enchant('minecraft:unbreaking', 10),
        allEquips: [
            Item.of('minecraft:netherite_sword', '{Damage:0,RepairCost:1}').enchant('minecraft:sharpness', 4),
            Item.of('supplementaries:bomb_blue', 2, "{display:{Lore:['{\"extra\":[{\"text\":\"落地后一段时间爆炸，在一定范围内施加虚弱与着火，并对暴露的敌人额外造成高额伤害\"}],\"text\":\"\"}']}}"),
            '16x minecraft:bread',
            Item.of('crabbersdelight:pearl', 64, "{display:{Lore:['{\"extra\":[{\"text\":\"发射1颗造成中等伤害的弹丸\"}],\"text\":\"\"}'],Name:'{\"text\":\"固体碳酸钙颗粒\"}'}}"),
            Item.of('crabbersdelight:pearl', 64, "{display:{Lore:['{\"extra\":[{\"text\":\"发射1颗造成中等伤害的弹丸\"}],\"text\":\"\"}'],Name:'{\"text\":\"固体碳酸钙颗粒\"}'}}"),
            '2x minecraft:golden_apple',
            Item.of('ae2:singularity', "{display:{Lore:['{\"extra\":[{\"text\":\"中等范围附加短时长的吸附，漂浮与缓降效果\"}],\"text\":\"\"}','{\"extra\":[{\"text\":\"\\\\\"宇宙在向我歌唱！\\\\\"\"}],\"text\":\"\"}']}}"),
        ],

        armor1: "minecraft:leather_helmet",
        armor2: "minecraft:leather_chestplate",
        armor3: 'minecraft:chainmail_leggings',
        armor4: "minecraft:leather_boots",
    }, { //工程兵
        mainWeapon: Item.of('create:potato_cannon', '{Damage:0,display:{Name:\'{"text":"MAA-12自动霰弹枪(军用型)"}\'},sound:"createbigcannons:fire_autocannon"}').enchant('minecraft:unbreaking', 10),
        allEquips: [
            Item.of('nethersdelight:propelpearl', 16, "{display:{Lore:['{\"extra\":[{\"text\":\"发射3颗造成少量伤害的爆炸弹丸\"}],\"text\":\"\"}'],Name:'{\"text\":\"12g霰榴弹\"}'}}"),
            Item.of('culturaldelights:tortilla_chips', 32, "{display:{Lore:['{\"extra\":[{\"text\":\"发射2颗造成较高伤害的弹丸\"}],\"text\":\"\"}'],Name:'{\"text\":\"12g双头弹\"}'}}"),
            '16x minecraft:bread',
            '2x minecraft:golden_apple',
            Item.of('minecraft:netherite_axe', '{Damage:0,RepairCost:1}').enchant('minecraft:sharpness', 10),
            '10x chinjufumod:block_boxh_soy',
            '5x farmersdelight:rice_bag'
        ],

        armor1: "minecraft:leather_helmet",
        armor2: "minecraft:leather_chestplate",
        armor3: 'minecraft:iron_leggings',
        armor4: "minecraft:leather_boots",
    }
]

let gunType1 = { //步枪
    fireSpeed: 4, //开火速度（与伤害成正比）
    cooldownTick: 3, //开火冷却
    reloadTick: 30, //装填时间
    maxAmmo: 30, //每个弹夹子弹数
    ammoSpread1: 0.3, //未蹲下散布
    ammoSpread2: 0.1, //蹲下散布
    isMultiple: false,//是否为霰弹枪

    ammoId: "minecraft:arrow", //子弹id
    reloadItemId: "minecraft:cod", //弹夹id

    firingSound: "minecraft:entity.generic.splash", //开火音效
    firingText: "鳕鱼活力：", //子弹提示
    reloadingSound: "minecraft:entity.cod.flop", //换弹音效
    reloadingText: "正在更换鳕鱼...", //换弹提示
    emptySound: "minecraft:entity.cod.death", //子弹耗尽音效
    emptyText: "这条鳕鱼陷入了昏迷", //子弹耗尽提示
    firingParticle: "minecraft:bubble_pop", //开火时粒子
    ammoParticle: "minecraft:bubble_pop", //弹道粒子
}

let gunType2 = { //机枪
    fireSpeed: 5, //子弹初速度（与伤害正相关）
    cooldownTick: 4, //开火冷却（刻）
    reloadTick: 100, //装填时间（刻）
    maxAmmo: 100, //每个弹夹子弹数
    ammoSpread1: 0.5, //未蹲下散布
    ammoSpread2: 0.2, //蹲下散布
    isMultiple: false,//是否为霰弹枪

    ammoId: "minecraft:arrow", //子弹id
    reloadItemId: "minecraft:cod", //弹夹id

    firingSound: "minecraft:entity.generic.splash", //开火音效
    firingText: "鳕鱼活力：", //子弹提示
    reloadingSound: "minecraft:entity.cod.flop", //换弹音效
    reloadingText: "正在更换鳕鱼...", //换弹提示
    emptySound: "minecraft:entity.cod.death", //子弹耗尽音效
    emptyText: "这条鳕鱼陷入了昏迷", //子弹耗尽提示
    firingParticle: "minecraft:bubble_pop", //开火时粒子
    ammoParticle: "minecraft:soul_fire_flame", //弹道粒子
}

let gunType3 = { //狙击枪
    fireSpeed: 10, //子弹初速度（与伤害正相关）
    cooldownTick: 20, //开火冷却（刻）
    reloadTick: 60, //装填时间（刻）
    maxAmmo: 10, //每个弹夹子弹数
    ammoSpread1: 0.7, //未蹲下散布
    ammoSpread2: 0, //蹲下散布
    isMultiple: false,//是否为霰弹枪

    ammoId: "minecraft:arrow", //子弹id
    gunId: "kubejs:cod_wand", //枪械id
    reloadItemId: "minecraft:cod", //弹夹id

    firingSound: "minecraft:entity.generic.splash", //开火音效
    firingText: "鳕鱼活力：", //子弹提示
    reloadingSound: "minecraft:entity.cod.flop", //换弹音效
    reloadingText: "正在更换鳕鱼...", //换弹提示
    emptySound: "minecraft:entity.cod.death", //子弹耗尽音效
    emptyText: "这条鳕鱼陷入了昏迷", //子弹耗尽提示
    firingParticle: "minecraft:bubble_pop", //开火时粒子
    ammoParticle: "minecraft:bubble_pop", //弹道粒子
}

let gunType4 = { //霰弹枪
    fireSpeed: 6, //子弹初速度（与伤害正相关）
    cooldownTick: 10, //开火冷却（刻）
    reloadTick: 40, //装填时间（刻）
    maxAmmo: 7, //每个弹夹子弹数
    ammoSpread1: 2.7, //未蹲下散布
    ammoSpread2: 1.5, //蹲下散布
    isMultiple: true,//是否为霰弹枪

    ammoId: "minecraft:spectral_arrow", //子弹idminecraft:spectral_arrow
    gunId: "kubejs:cod_wand", //枪械id
    reloadItemId: "minecraft:cod", //弹夹id

    firingSound: "minecraft:entity.generic.splash", //开火音效
    firingText: "鳕鱼活力：", //子弹提示
    reloadingSound: "minecraft:entity.cod.flop", //换弹音效
    reloadingText: "正在更换鳕鱼...", //换弹提示
    emptySound: "minecraft:entity.cod.death", //子弹耗尽音效
    emptyText: "这条鳕鱼陷入了昏迷", //子弹耗尽提示
    firingParticle: "minecraft:bubble_pop", //开火时粒子
    ammoParticle: "minecraft:bubble_pop", //弹道粒子
}

let gunType5 = { //设置
    fireSpeed: 3, //子弹初速度（与伤害正相关）
    cooldownTick: 20, //开火冷却（刻）
    reloadTick: 100, //装填时间（刻）
    maxAmmo: 10, //每个弹夹子弹数
    ammoSpread1: 1.0, //未蹲下散布
    ammoSpread2: 0, //蹲下散布
    isMultiple: false,//是否为霰弹枪

    ammoId: "chinjufumod:ammunition_medium", //子弹id
    gunId: "kubejs:cod_wand", //枪械id
    reloadItemId: "minecraft:cod", //弹夹id

    firingSound: "minecraft:entity.generic.splash", //开火音效
    firingText: "鳕鱼活力：", //子弹提示
    reloadingSound: "minecraft:entity.cod.flop", //换弹音效
    reloadingText: "正在更换鳕鱼...", //换弹提示
    emptySound: "minecraft:entity.cod.death", //子弹耗尽音效
    emptyText: "这条鳕鱼陷入了昏迷", //子弹耗尽提示
    firingParticle: "minecraft:bubble_pop", //开火时粒子
    ammoParticle: "minecraft:bubble_pop", //弹道粒子
}