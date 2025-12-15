ServerEvents.recipes(event => {
    //白松石
    event.recipes.createCompacting('ultramarine:magnesite', ['minecraft:amethyst_shard', Fluid.of('minecraft:water', 50)])

    //粗赤铁
    event.recipes.createCompacting('ultramarine:raw_hematite', ['minecraft:iron_ingot', 'minecraft:redstone'])

    //粗钴
    event.recipes.createCompacting('ultramarine:raw_cobalt', ['minecraft:iron_ingot', 'minecraft:lapis_lazuli'])

    //各种瓦片
    // event.recipes.createCompacting('ultramarine:gray_roof_tile', ['ultramarine:unfired_roof_tile','minecraft:gray_dye'])
    // event.recipes.createCompacting('ultramarine:yellow_roof_tile', ['ultramarine:unfired_roof_tile','minecraft:yellow_dye'])
    // event.recipes.createCompacting('ultramarine:green_roof_tile', ['ultramarine:unfired_roof_tile','minecraft:green_dye'])
    // event.recipes.createCompacting('ultramarine:blue_roof_tile', ['ultramarine:unfired_roof_tile','minecraft:blue_dye'])
    // event.recipes.createCompacting('ultramarine:cyan_roof_tile', ['ultramarine:unfired_roof_tile','minecraft:cyan_dye'])
    // event.recipes.createCompacting('ultramarine:black_roof_tile', ['ultramarine:unfired_roof_tile','minecraft:black_dye'])

    //各种板材
    // event.stonecutting('3x ultramarine:polished_oak_plank','minecraft:oak_planks')
    // event.stonecutting('3x ultramarine:polished_birch_plank','minecraft:birch_planks')
    // event.stonecutting('3x ultramarine:polished_spruce_plank','minecraft:spruce_planks')
    // event.stonecutting('3x ultramarine:polished_jungle_plank','minecraft:jungle_planks')
    // event.stonecutting('3x ultramarine:polished_acacia_plank','minecraft:acacia_planks')
    // event.stonecutting('3x ultramarine:polished_dark_oak_plank','minecraft:dark_oak_planks')
    // event.stonecutting('3x ultramarine:polished_warped_plank','minecraft:warped_planks')
    // event.stonecutting('3x ultramarine:polished_crimson_plank','minecraft:crimson_planks')
    // event.stonecutting('3x ultramarine:polished_mangrove_plank','minecraft:mangrove_planks')
    // event.stonecutting('3x ultramarine:polished_cherry_plank','minecraft:cherry_planks')
    // event.stonecutting('3x ultramarine:polished_rosewood_plank','ultramarine:rosewood_planks')
    // event.stonecutting('3x ultramarine:polished_ebony_plank','immersive_weathering:charred_planks')

    //各种瓷器
    // event.stonecutting('3x ultramarine:small_white_porcelain_vase','minecraft:white_glazed_terracotta')
    // event.stonecutting('2x ultramarine:medium_white_porcelain_vase','minecraft:white_glazed_terracotta')
    // event.stonecutting('ultramarine:large_white_porcelain_vase','minecraft:white_glazed_terracotta')
    // event.stonecutting('3x ultramarine:small_green_porcelain_vase','minecraft:green_glazed_terracotta')
    // event.stonecutting('2x ultramarine:medium_green_porcelain_vase','minecraft:green_glazed_terracotta')
    // event.stonecutting('2x ultramarine:tall_blue_porcelain_vase','minecraft:blue_glazed_terracotta')
    // event.stonecutting('2x ultramarine:tall_blue_and_white_porcelain_vase','minecraft:light_blue_glazed_terracotta')
    // event.stonecutting('3x ultramarine:black_porcelain_plate','minecraft:gray_glazed_terracotta')
    // event.stonecutting('3x ultramarine:blue_and_white_porcelain_plate','minecraft:light_blue_glazed_terracotta')

    //木质框架
    // event.shaped('4x ultramarine:wooden_frame', [
    //     'SSS',
    //     'S S',
    //     'SSS'
    // ], {
    //     S: 'minecraft:stick'
    // })

    //月饼
    event.shaped('4x ultramarine:mooncake', [
        'CCC',
        'CPC',
        'CSC'
    ], {
        C: 'create:bar_of_chocolate',
        S: 'minecraft:sugar',
        P: 'crabbersdelight:pearl'
    })

    //绿豆糕
    event.recipes.createCompacting('ultramarine:mung_bean_cake', ['farmersdelight:wheat_dough', 'minecraft:lime_dye']).heated()

    //包子
    event.recipes.createCompacting('ultramarine:baozi', ['minecraft:porkchop', 'farmersdelight:wheat_dough']).heated()

    //青花瓷片
    // event.recipes.create.crushing('ultramarine:blue_and_white_porcelain_piece', 'ultramarine:tall_blue_and_white_porcelain_vase')

    //青花瓷碎片
    // event.recipes.create.crushing('2x ultramarine:blue_and_white_porcelain_shards', 'ultramarine:blue_and_white_porcelain_piece')

    //瓷片
    // event.recipes.create.crushing('2x ultramarine:porcelain_piece', 'minecraft:white_glazed_terracotta')

    //木质部件
    // event.stonecutting('ultramarine:wooden_parts', 'ultramarine:wooden_frame')

    //油脂
    event.shapeless('immersive_weathering:tallow', 'ultramarine:grease')
    event.shapeless('ultramarine:grease', 'immersive_weathering:tallow')

    //毛发
    event.shaped('3x ultramarine:fur', [
        'SSS',
        ' L '
    ], {
        L: 'minecraft:leather',
        S: 'minecraft:string'
    })

    //丝绸
    event.shaped('3x ultramarine:silk', [
        ' S ',
        'SCS',
        ' S '
    ], {
        C: 'farmersdelight:canvas',
        S: 'minecraft:string'
    })

    //宣纸
    event.recipes.createCompacting('ultramarine:xuan_paper', ['minecraft:paper', Fluid.of('minecraft:water', 50)]).heated()

    //黄铜
    event.shapeless('ultramarine:bronze_ingot', 'create:brass_ingot')
    event.shapeless('create:brass_ingot', 'ultramarine:bronze_ingot')

    //铜钱
    event.stonecutting('4x ultramarine:copper_cash_coin', 'ultramarine:bronze_ingot')

    //木工桌配方转化为动力锯配方
    event.forEachRecipe({ type: 'ultramarine:woodworking' }, recipe => {
        const json = recipe.json;

        const ingredient = json.get("ingredient");
        const result = json.get("result").getAsString();
        const count = json.get("count").getAsString();
        // --- 获取输入 ---
        let input;
        if (ingredient && ingredient.has("tag")) {
            const tag = ingredient.get("tag").getAsString();
            input = '#' + tag;
        } else if (ingredient && ingredient.has("item")) {
            const item = ingredient.get("item").getAsString();
            input = item;
        } else {
            // console.log("未识别输入格式：" + recipe);
            return;
        }

        // --- 获取输出 ---
        let output;
        if (result) {
            output = count + 'x ' + result;
        }

        // if (!output) {
        //     console.log("未识别输出格式：" + recipe);
        //     return;
        // }

        event.recipes.create.cutting(
            output,
            input
        ).id(recipe.getId() + "_converted")

    });

    //雕刻台配方转化为工作盆配方
    event.forEachRecipe({ type: 'ultramarine:chisel_table' }, recipe => {
        const json = recipe.json;

        const colors = json.get("colors");
        const material = json.get("material");
        const template = json.get("template");
        const result = json.get("result").getAsString();
        const count = json.get("count");
        // --- 获取输入 ---
        let inputs = [];
            colors.forEach(c => {
                if (c.get("tag")) {
                    inputs.push(`#${c.get("tag").getAsString()}`);
                } else if (c.get("item").getAsString()) {
                    inputs.push(c.get("item").getAsString());
                } else {
                    console.log("[WARN] 未知的 color 格式: " + JSON.stringify(c));
                }
            })

        if (material) {
            if (material.get("tag").getAsString()) {
                inputs.push(`#${material.get("tag").getAsString()}`);
            } else if (material.get("item").getAsString()) {
                inputs.push(material.get("item").getAsString());
            }
        }

        if (template) {
            if (template.get("tag")) {
                inputs.push(`#${template.get("tag").getAsString()}`);
            } else if (template.get("item").getAsString()) {
                inputs.push(template.get("item").getAsString());
            }
        }

        // --- 获取输出 ---
        let output;
        if (result) {
            output = Item.of(result, count);
        }

        // if (!output) {
        //     console.log("未识别输出格式：" + recipe);
        //     return;
        // }

        event.recipes.create.mixing([output, template], inputs).id(recipe.getId() + "_converted")

    });
}
)