// priority: 0

console.info('服务器脚本（cooking.js）已重载')

ServerEvents.recipes(event => {

    event.shapeless('kubejs:bomb_cod_burger', ['minecraft:bread', 'kubejs:fried_cod', 'nethersdelight:propelpearl', 'culturaldelights:cut_pickle']) //劲爆鳕鱼堡

    event.custom( //鱿鱼狂欢节
        {
            "type": "farmersdelight:cooking",
            "recipe_book_tab": "meals",
            "ingredients": [
                {
                    "item": "culturaldelights:raw_calamari"
                },
                {
                    "item": "culturaldelights:raw_calamari"
                },
                {
                    "item": "culturaldelights:raw_calamari"
                },
                {
                    "item": "culturaldelights:raw_calamari"
                },
            ],
            "result": {
                "item": "kubejs:squid_festival"
            },
            "container": {
                "item": "minecraft:bowl"
            },
            "experience": 1.5,
            "cookingtime": 200
        }
    )

    event.custom( //甜豆花
        {
            "type": "farmersdelight:cooking",
            "recipe_book_tab": "meals",
            "ingredients": [
                {
                    "item": "kubejs:cut_bean_curd"
                },
                {
                    "item": "kubejs:cut_bean_curd"
                },
                {
                    "item": "minecraft:honey_bottle"
                },
            ],
            "result": {
                "item": "kubejs:sweet_bean_curd"
            },
            "container": {
                "item": "minecraft:bowl"
            },
            "experience": 1.5,
            "cookingtime": 200
        }
    )

    event.custom( //咸豆腐脑
        {
            "type": "farmersdelight:cooking",
            "recipe_book_tab": "meals",
            "ingredients": [
                {
                    "item": "kubejs:cut_bean_curd"
                },
                {
                    "item": "kubejs:cut_bean_curd"
                },
                {
                    "item": "kubejs:soy_sause_bottle"
                },
            ],
            "result": {
                "item": "kubejs:salty_bean_curd"
            },
            "container": {
                "item": "minecraft:bowl"
            },
            "experience": 1.5,
            "cookingtime": 200
        }
    )

    event.custom( //麻婆豆腐
        {
            "type": "farmersdelight:cooking",
            "recipe_book_tab": "meals",
            "ingredients": [
                {
                    "item": "kubejs:cut_bean_curd"
                },
                {
                    "item": "kubejs:cut_bean_curd"
                },
                {
                    "item": 'minecraft:blaze_powder'
                },
            ],
            "result": {
                "item": "kubejs:spicy_bean_curd"
            },
            "container": {
                "item": "minecraft:bowl"
            },
            "experience": 1.5,
            "cookingtime": 200
        }
    )

    event.custom( //浆果麻婆豆腐
        {
            "type": "farmersdelight:cooking",
            "recipe_book_tab": "meals",
            "ingredients": [
                {
                    "item": "kubejs:cut_bean_curd"
                },
                {
                    "item": "kubejs:cut_bean_curd"
                },
                {
                    "item": 'minecraft:blaze_powder'
                },
                {
                    "item": 'minecraft:sweet_berries'
                },
            ],
            "result": {
                "item": "kubejs:berry_bean_curd"
            },
            "container": {
                "item": "minecraft:bowl"
            },
            "experience": 1.5,
            "cookingtime": 200
        }
    )

    event.custom( //巧克力意面
        {
            "type": "farmersdelight:cooking",
            "recipe_book_tab": "meals",
            "ingredients": [
                {
                    "item": "farmersdelight:milk_bottle"
                },
                {
                    "item": "farmersdelight:raw_pasta"
                },
                {
                    "item": "create_confectionery:bar_of_black_chocolate"
                },
            ],
            "result": {
                "item": "kubejs:pasta_with_chocolate"
            },
            "container": {
                "item": "minecraft:bowl"
            },
            "experience": 1.5,
            "cookingtime": 200
        }
    )

    event.custom( //三角粥
        {
            "type": "farmersdelight:cooking",
            "recipe_book_tab": "meals",
            "ingredients": [
                {
                    "item": 'minecraft:honey_bottle'
                },
                {
                    "item": 'kubejs:delta_coin_chip'
                },
                {
                    "item": 'minecraft:wheat'
                },
                {
                    "item": 'farmersdelight:rice'
                },
                {
                    "item": 'farmersdelight:rice'
                },
                {
                    "item": 'farmersdelight:rice'
                },
            ],
            "result": {
                "item": 'kubejs:delta_porridge'
            },
            "container": {
                "item": "minecraft:bowl"
            },
            "experience": 1.5,
            "cookingtime": 200
        }
    )

    event.custom( //焦糖鳕鱼羹
        {
            "type": "farmersdelight:cooking",
            "recipe_book_tab": "meals",
            "ingredients": [
                {
                    "item": "farmersdelight:milk_bottle"
                },
                {
                    "item": "minecraft:cooked_cod"
                },
                {
                    "item": "create_confectionery:bar_of_caramel"
                },
            ],
            "result": {
                "item": "kubejs:caramel_cod_soup"
            },
            "container": {
                "item": "minecraft:bowl"
            },
            "experience": 1.5,
            "cookingtime": 220
        }
    )

    event.custom( //拉面
        {
            "type": "farmersdelight:cooking",
            "recipe_book_tab": "meals",
            "ingredients": [
                {
                    "tag": "forge:cooked_pork"
                },
                {
                    "tag": "forge:cooked_pork"
                },
                {
                    "tag": "forge:cooked_eggs"
                },
                {
                    "item": 'minecraft:dried_kelp'
                },
                {
                    "item": 'farmersdelight:raw_pasta'
                },
                {
                    "item": 'farmersdelight:raw_pasta'
                },
            ],
            "result": {
                "item": "kubejs:ramen"
            },
            "container": {
                "item": "minecraft:bowl"
            },
            "experience": 1.5,
            "cookingtime": 220
        }
    )

    event.custom( //切奶酪
        {
            "type": "farmersdelight:cutting",
            "ingredients": [
                {
                    "item": "kubejs:cheese"
                }
            ],
            "tool": {
                "tag": "forge:tools/knives"
            },
            "result": [
                {
                    "item": "kubejs:cut_cheese",
                    "count": 4
                }
            ]
        }
    )

    event.custom( //切豆腐
        {
            "type": "farmersdelight:cutting",
            "ingredients": [
                {
                    "item": 'kubejs:bean_curd'
                }
            ],
            "tool": {
                "tag": "forge:tools/knives"
            },
            "result": [
                {
                    "item": 'kubejs:cut_bean_curd',
                    "count": 2
                }
            ]
        }
    )

    event.custom({
        "type": "kitchenkarrot:brewing_barrel",
        "content": {
            "recipe": [
                {
                    "item": 'kubejs:delta_dust'
                },
                {
                    "item": 'kubejs:activated_witch_factor'
                },
                {
                    "item": 'minecraft:red_dye'
                },
                {
                    "item": "minecraft:poppy"
                },
                {
                    "item": 'minecraft:stick'
                },
                {
                    "item": 'minecraft:ghast_tear'
                }
            ],
            "craftingtime": 3600
        },
        "result": {
            "item": "kubejs:drink659"
        }

    })

    event.recipes.create.mixing('kubejs:pasta_with_chocolate', [ //巧克力意面1
        'farmersdelight:milk_bottle',
        'farmersdelight:raw_pasta',
        'create_confectionery:bar_of_black_chocolate',
        'minecraft:bowl'
    ]).heated()

    event.recipes.create.mixing('kubejs:pasta_with_chocolate', [ //巧克力意面2
        'farmersdelight:milk_bottle',
        'farmersdelight:raw_pasta',
        Fluid.of('create_confectionery:black_chocolate', 250),
        'minecraft:bowl'
    ]).heated()

    event.recipes.create.mixing('kubejs:raw_sunshine_cod', [ //生晴天鳕鱼
        'kubejs:delta_coin',
        'minecraft:cod',
        'minecraft:blaze_powder'
    ])

    event.smoking('kaleidoscope_cookery:fried_egg', '#forge:eggs')//煎蛋

    event.custom({//煎蛋
        "type": "kaleidoscope_cookery:pot",
        "ingredients": [
            {
                "tag": "forge:eggs"
            }
        ],
        "result": {
            "item": "kaleidoscope_cookery:fried_egg"
        },
        "stir_fry_count": 3,
        "time": 200
    })

    event.campfireCooking('kaleidoscope_cookery:fried_egg','#forge:eggs')//煎蛋

    event.smoking('kubejs:sunshine_cod', "kubejs:raw_sunshine_cod")//晴天鳕鱼

    event.recipes.create.mixing('culturaldelights:pickle', [ //腌黄瓜
        'culturaldelights:cucumber',
        Fluid.of('minecraft:water', 250),
        'minecraft:nether_wart',
    ])

    event.shaped('kubejs:beef_over_rice', [ //温泉蛋牛肉盖饭
        'EBO',
        ' R ',
        '   '
    ], {
        E: '#forge:eggs',
        B: '#forge:cooked_beef',
        O: '#forge:crops/onion',
        R: 'farmersdelight:cooked_rice'
    })

    event.shaped('kubejs:bug_soup', [ //肥虫汤
        'EBO',
        ' R ',
        '   '
    ], {
        E: '#forge:crops/chilipepper',
        B: '#minecraft:leaves',
        O: '#forge:crops/onion',
        R: 'minecraft:beetroot_soup'
    })

    event.smoking('kubejs:pizza_margarita', 'kubejs:raw_pizza_margarita')
    event.shaped('kubejs:raw_pizza_margarita', [ //玛格丽特披萨
        '   ',
        ' TC',
        ' P '
    ], {
        P: 'kubejs:pizza_base',
        C: 'kubejs:cut_cheese',
        T: 'farmersdelight:tomato_sauce'
    })
    event.smoking('kubejs:pork_pizza', 'kubejs:raw_pork_pizza')
    event.shaped('kubejs:raw_pork_pizza', [ //猪肉碎披萨
        ' M ',
        ' TC',
        ' P '
    ], {
        P: 'kubejs:pizza_base',
        C: 'kubejs:cut_cheese',
        T: 'farmersdelight:tomato_sauce',
        M: 'minecraft:porkchop'
    })
    event.smoking('kubejs:apple_pizza', 'kubejs:raw_apple_pizza')
    event.shaped('kubejs:raw_apple_pizza', [ //苹果披萨
        ' A ',
        ' TC',
        ' P '
    ], {
        P: 'kubejs:pizza_base',
        C: 'kubejs:cut_cheese',
        T: 'farmersdelight:tomato_sauce',
        A: 'minecraft:apple'
    })

    event.recipes.create.mixing('kubejs:fried_cod', [ //油炸鳕鱼
        Fluid.of('kubejs:bean_oil', 250),
        '#forge:raw_fishes/cod',
    ]).heated()
    event.shapeless("kubejs:cod_burger", ['minecraft:bread', 'kubejs:fried_cod', 'culturaldelights:cut_pickle', 'farmersdelight:milk_bottle'])//深海鳕鱼堡
    event.recipes.create.mixing("kubejs:cod_burger", ['minecraft:bread', 'kubejs:fried_cod', 'culturaldelights:cut_pickle', 'farmersdelight:milk_bottle'])//深海鳕鱼堡

    event.custom( //披萨饼底
        {
            "type": "farmersdelight:cutting",
            "ingredients": [
                {
                    "tag": "forge:dough"
                }
            ],
            "tool": {
                "tag": "forge:tools/shovels"
            },
            "result": [
                {
                    "item": "kubejs:pizza_base",
                    "count": 1
                }
            ]
        })

    event.recipes.createCompacting('kubejs:cheese', [ //奶酪
        Fluid.of('minecraft:milk', 1000)
    ])

    event.recipes.create.mixing("kubejs:phantom_shrimp", [ //幻翼虾仁
        "minecraft:gunpowder",
        '4x crabbersdelight:cooked_shrimp',
        'minecraft:phantom_membrane'
    ])

    event.recipes.createCompacting(Fluid.of('kubejs:bean_oil', 100), [ //豆油
        Item.of('chinjufumod:item_seeds_soy')
    ])

    event.recipes.create.mixing(Fluid.of('kubejs:bean_sause', 100), [ //豆浆
        Item.of('chinjufumod:item_seeds_soy')
    ])

    event.recipes.create.mixing(Fluid.of('kubejs:soy_sause', 250), [ //酱油
        Fluid.of('kubejs:bean_sause', 250),
        Item.of('minecraft:nether_wart')
    ])

    event.recipes.createCompacting('kubejs:bean_curd', [ //豆腐
        Fluid.of('kubejs:bean_sause', 500)
    ])

    event.recipes.createFilling('kubejs:soy_sause_bottle', [ //酱油瓶
        Fluid.of('kubejs:soy_sause', 250),
        'minecraft:glass_bottle'
    ])

    event.recipes.createPressing('kubejs:pizza_base', [ //披萨饼底
        '#forge:dough'
    ])

    event.recipes.createCompacting('3x kubejs:digestion_pellow', [ //健胃消食片
        'minecraft:wheat',
        'minecraft:wheat',
        'minecraft:bone',
        'minecraft:slime_ball',
        Fluid.of('minecraft:milk', 250)
    ])

    event.recipes.createSequencedAssembly([ //生玛格丽特披萨序列组装
        Item.of('kubejs:raw_pizza_margarita').withChance(1.0),
    ], 'kubejs:pizza_base', [
        event.recipes.createDeploying('kubejs:pizza_base', ['kubejs:pizza_base', 'farmersdelight:tomato_sauce']),
        event.recipes.createDeploying('kubejs:pizza_base', ['kubejs:pizza_base', 'kubejs:cut_cheese']),
    ]).transitionalItem('kubejs:pizza_base').loops(1)

    event.recipes.createSequencedAssembly([ //生苹果披萨序列组装
        Item.of('kubejs:raw_apple_pizza').withChance(1.0),
    ], 'kubejs:pizza_base', [
        event.recipes.createDeploying('kubejs:pizza_base', ['kubejs:pizza_base', 'farmersdelight:tomato_sauce']),
        event.recipes.createDeploying('kubejs:pizza_base', ['kubejs:pizza_base', 'minecraft:apple']),
        event.recipes.createDeploying('kubejs:pizza_base', ['kubejs:pizza_base', 'kubejs:cut_cheese']),
    ]).transitionalItem('kubejs:pizza_base').loops(1)

    event.recipes.createSequencedAssembly([ //生猪肉碎披萨序列组装
        Item.of('kubejs:raw_pork_pizza').withChance(1.0),
    ], 'kubejs:pizza_base', [
        event.recipes.createDeploying('kubejs:pizza_base', ['kubejs:pizza_base', 'farmersdelight:tomato_sauce']),
        event.recipes.createDeploying('kubejs:pizza_base', ['kubejs:pizza_base', 'minecraft:porkchop']),
        event.recipes.createDeploying('kubejs:pizza_base', ['kubejs:pizza_base', 'kubejs:cut_cheese']),
    ]).transitionalItem('kubejs:pizza_base').loops(1)

})