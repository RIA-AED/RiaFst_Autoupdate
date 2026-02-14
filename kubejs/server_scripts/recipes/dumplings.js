let $CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag")

/**
    生成同一输入物的批量炖煮汤锅食谱
    @param {String} carrier 盛装物品
    @param {String} soup_base 汤底
    @param {String} input 输入物品
    @param {String} output 输出物品
    @param {number} inputCount 输入物品数量
    @param {number} outputCount 输出物品数量
 */
function genMultiStockpotRecipes(carrier, soup_base, input, output, inputCount, outputCount) {
    let genMultiStockpotRecipes =
    {
        "type": "kaleidoscope_cookery:stockpot",
        "carrier": {
            "item": carrier
        },
        "cooking_bubble_color": 16772291,
        "cooking_texture": "kaleidoscope_cookery:stockpot/default_cooking",
        "finished_bubble_color": 16034443,
        "finished_texture": "kaleidoscope_cookery:stockpot/default_finished",
        "ingredients": [

        ],
        "result": {
        },
        "soup_base": soup_base,
        "time": 300
    }
    for (let i = 0; i < inputCount; i++) {
        genMultiStockpotRecipes.ingredients.push({
            "item": input
        })
    }
    genMultiStockpotRecipes.result = {
        "count": outputCount,
        "item": output
    }
    return genMultiStockpotRecipes
}


ServerEvents.recipes(event => {
    // 失败转为森罗厨房饺子
    event.custom(genMultiStockpotRecipes("minecraft:bowl", "minecraft:water", 'kubejs:raw_dumpling_plate', 'kaleidoscope_cookery:dumpling', 1, 8)).id("kubejs:stockpot/dumpling_plate_to_dumpling")
    for (let i = 1; i <= 8; i++) {
        event.custom(genMultiStockpotRecipes("minecraft:bowl", "minecraft:water", 'kubejs:raw_dumpling', 'kaleidoscope_cookery:dumpling', i, i)).id("kubejs:stockpot/dumpling_" + i)
    }

    //面团变饺子皮
    event.custom(
        {
            "type": "farmersdelight:cutting",
            "ingredients": [
                {
                    "tag": "forge:dough"
                }
            ],
            "tool": {
                "item": "minecraft:stick"
            },
            "result": [
                {
                    "item": "kubejs:dumpling_wrapper",
                    "count": 8
                }
            ]
        })

    //八个生饺子加一个碗合成一盘饺子
    event.recipes.kubejs.shapeless("kubejs:raw_dumpling_plate", ["8x kubejs:raw_dumpling", "minecraft:bowl"])
        .modifyResult((inputItemGrid, outputItem) => {
            let rawDumplingItems = inputItemGrid.findAll("kubejs:raw_dumpling")
            let outputItemNBT = outputItem.getOrCreateTag()
            let fillingListTag = new $ListTag()
            let authorListTag = new $ListTag()
            for (let e of rawDumplingItems) {
                if (e.getOrCreateTag().contains("filling") && e.getOrCreateTag().contains("author")) {
                    fillingListTag.add(rawDumplingItems.indexOf(e), e.nbt.getCompound("filling"))
                    let tag = new $CompoundTag()
                    tag.put("name", e.nbt.author)
                    authorListTag.add(rawDumplingItems.indexOf(e), tag)
                } else {
                    fillingListTag.add(rawDumplingItems.indexOf(e), new $CompoundTag())
                    authorListTag.add(rawDumplingItems.indexOf(e), new $CompoundTag())
                }
            }

            outputItemNBT.put("filling", fillingListTag)
            outputItemNBT.put("author", authorListTag)
            return outputItem
        })
})