let characterSetting = {
    engineer: {
        skill1CD: 200,
        skill1Duration: 100,
        skill2CD: 400,
        skill2Duration: 250,
        potatoCannonReloadTicks: 1200
    },
    chef: {
        skill1CD: 200,
        skill1Cost: 2,
        skill2CD: 400,
        skill2Max: 6,
        skill2Min: 2,
        ultraCD: 1000,
        ultraCost: 10,
        ultraDurationSeconds: 10
    },
    farmer: {
        skill1CD: 100,
        skill1Strength: 200,
        skill2CD: 600,
        skill2Duration: 40,
        ultraCD: 2000,
        ultraStrength: 1,
        ultraCount: 50
    }
}

let Chef_resources_required = [
    2, 5, 10
]

let buff_food_list = [
    'kaleidoscope_cookery:scramble_egg_with_tomatoes',//番茄炒蛋，活力1.5min
    'farmersrespite:green_tea',//绿茶，急迫3min
    'kitchenkarrot:curry_udon',//乌冬，hot1min，
    'kaleidoscope_cookery:spicy_chicken', //辣子鸡，饱腹代偿1.3min
    'kaleidoscope_cookery:slime_ball_meal', //粘液饭，胀气0.5min
    'kitchenkarrot:twisting_soda', //伤害吸收1min
    'kitchenkarrot:birch_sap_chocolate_bar', //迅捷2 1.5min
    'kitchenkarrot:sweet_berry_milk', //隐身1min
    'crockpot:bacon_eggs', //加两颗心
    'crockpot:bone_soup', //伤害吸收2 2min
    Item.of('kitchenkarrot:cocktail', '{cocktail:"fstwines:david"}'),//大卫，迅捷0.5min
    Item.of('kitchenkarrot:cocktail', '{cocktail:"kitchenkarrot:cocktails/twilight_forest"}'),//暮色森林，毒抗2.75min
    Item.of('kitchenkarrot:cocktail', '{cocktail:"kitchenkarrot:cocktails/nebula_chronicles"}')//星云记事，抗性4min、凋抗1.5min
]
let buff_list = [
    'kaleidoscope_cookery:vigor',
    'minecraft:strength',
    'minecraft:haste',
    'minecraft:regeneration',
    'minecraft:speed',
    'kitchenkarrot:poison_resistance',
    'minecraft:resistance',
    'kitchenkarrot:poison_resistance'
]
let chefBuffList = [
    { id: "minecraft:resistance", am: 0 },
    { id: "minecraft:speed", am: 0 },
    { id: "minecraft:regeneration", am: 2 },
]

let characterEquips = {
    chef: {
        helmet: Item.of('railways:white_conductor_cap', '{Unbreakable:1b}'),
        chest: Item.of('chinjufumod:item_ykt_ttoku_mini', '{Unbreakable:1b}'),
        leg: Item.of('minecraft:netherite_leggings', '{Unbreakable:1b}'),
        feet: Item.of('minecraft:leather_boots', '{Unbreakable:1b,display:{color:-393218}}'),
        mainHand: Item.of('kaleidoscope_cookery:kitchen_shovel', '{Unbreakable:1b}'),
        other: [
            Item.of('kitchenkarrot:carrot_spices', "{display:{Name:'{\"extra\":[{\"bold\":false,\"italic\":false,\"underlined\":false,\"strikethrough\":false,\"obfuscated\":false,\"color\":\"yellow\",\"text\":\"紧急烹饪\"}],\"text\":\"\"}'}}"),
            Item.of('kubejs:soy_bean_oil', "{display:{Name:'{\"extra\":[{\"bold\":false,\"italic\":false,\"underlined\":false,\"strikethrough\":false,\"obfuscated\":false,\"color\":\"yellow\",\"text\":\"小心油滑\"}],\"text\":\"\"}'}}"),
            Item.of('farmersdelight:skillet', "{Unbreakable:1b,display:{Name:'{\"extra\":[{\"bold\":false,\"italic\":false,\"underlined\":false,\"strikethrough\":false,\"obfuscated\":false,\"color\":\"light_purple\",\"text\":\"宴请八方\"}],\"text\":\"\"}'}}")
        ]
    },
    engineer: {
        helmet: Item.of('create:goggles'),
        chest: Item.of('minecraft:iron_chestplate', '{Unbreakable:1b,Trim:{material:"minecraft:lapis",pattern:"minecraft:shaper"}}'),
        leg: Item.of('minecraft:iron_leggings', '{Unbreakable:1b,Trim:{material:"minecraft:lapis",pattern:"minecraft:shaper"}}'),
        feet: Item.of('minecraft:iron_boots', '{Unbreakable:1b,Trim:{material:"minecraft:lapis",pattern:"minecraft:shaper"}}'),
        mainHand: Item.of('create:wrench'),
        other: [
            Item.of('immersive_aircraft:industrial_gears', "{display:{Name:'{\"extra\":[{\"bold\":false,\"italic\":false,\"underlined\":false,\"strikethrough\":false,\"obfuscated\":false,\"color\":\"yellow\",\"text\":\"传动升级\"}],\"text\":\"\"}'}}"),
            Item.of('create:sturdy_sheet', "{display:{Name:'{\"extra\":[{\"bold\":false,\"italic\":false,\"underlined\":false,\"strikethrough\":false,\"obfuscated\":false,\"color\":\"yellow\",\"text\":\"插板升级\"}],\"text\":\"\"}'}}"),
            Item.of('create:potato_cannon', "{display:{Name:'{\"extra\":[{\"bold\":false,\"italic\":false,\"underlined\":false,\"strikethrough\":false,\"obfuscated\":false,\"color\":\"light_purple\",\"text\":\"生物质炮\"}],\"text\":\"\"}'}}")
        ]
    },
    farmer: {
        helmet: Item.of('kaleidoscope_cookery:straw_hat', '{Unbreakable:1b}'),
        chest: Item.of('kaleidoscope_cookery:farmer_chest_plate', '{Unbreakable:1b}'),
        leg: Item.of('kaleidoscope_cookery:farmer_leggings', '{Unbreakable:1b}'),
        feet: Item.of('kaleidoscope_cookery:farmer_boots', '{Unbreakable:1b}'),
        mainHand: Item.of('minecraft:iron_hoe', '{Unbreakable:1b}'),
        other: [
            Item.of('minecraft:feather', "{display:{Name:'{\"extra\":[{\"bold\":false,\"italic\":false,\"underlined\":false,\"strikethrough\":false,\"obfuscated\":false,\"color\":\"yellow\",\"text\":\"身轻如羽\"}],\"text\":\"\"}'}}"),
            Item.of('minecraft:bucket', "{display:{Name:'{\"extra\":[{\"bold\":false,\"italic\":false,\"underlined\":false,\"strikethrough\":false,\"obfuscated\":false,\"color\":\"yellow\",\"text\":\"铁桶防御\"}],\"text\":\"\"}'}}"),
            Item.of('kaleidoscope_cookery:sickle', "{display:{Name:'{\"extra\":[{\"bold\":false,\"italic\":false,\"underlined\":false,\"strikethrough\":false,\"obfuscated\":false,\"color\":\"light_purple\",\"text\":\"吸血镰刀\"}],\"text\":\"\"}'}}")
        ]
    }
}

let pigDamageWeapons = [
    {
        id: "create:wrench", //dps6
        damage: 3,
        coolDownTick: 10,
        dropItem: Item.of('createaddition:biomass_pellet', 1),
        dropChance: 0.8
    },
    {
        id: "create:potato_cannon",//dps20 200total
        damage: 2,
        coolDownTick: 0,
        dropItem: Item.of('createaddition:biomass_pellet', 1),
        dropChance: 0
    },
    {
        id: 'kaleidoscope_cookery:kitchen_shovel', //dps5
        damage: 5,
        coolDownTick: 20,
        dropItem: Item.of('kaleidoscope_cookery:oil', 1),
        dropChance: 0.3
    },
    {
        id: 'minecraft:iron_hoe', //dps9.3
        damage: 7,
        coolDownTick: 15,
        dropItem: Item.of('kaleidoscope_cookery:oil', 1),
        dropChance: 0
    },
    {
        id: 'kaleidoscope_cookery:sickle', //dps15 750total
        damage: 15,
        coolDownTick: 20,
        dropItem: Item.of('kaleidoscope_cookery:oil', 1),
        dropChance: 0
    }, {
        id: "kubejs:event_item_4",
        damage: 15000,
        coolDownTick: 5,
        dropItem: "",
        dropChance: 0
    }
]