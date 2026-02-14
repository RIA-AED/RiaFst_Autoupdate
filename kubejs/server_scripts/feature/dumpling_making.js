let pathOf$CookingPotBlockEntity = "vectorwing.farmersdelight.common.block.entity.CookingPotBlockEntity"
let pathOf$StockpotBlockEntity = "com.github.ysbbbbbb.kaleidoscopecookery.blockentity.kitchen.StockpotBlockEntity"
let $CookingPotBlockEntity = Java.loadClass(pathOf$CookingPotBlockEntity)
let $CuttingBoardBlockEntity = Java.loadClass("vectorwing.farmersdelight.common.block.entity.CuttingBoardBlockEntity")
let $StockpotBlockEntity = Java.loadClass(pathOf$StockpotBlockEntity)
let $CuttingBoardBlock = Java.loadClass("vectorwing.farmersdelight.common.block.CuttingBoardBlock")
let $ItemUtils = Java.loadClass("vectorwing.farmersdelight.common.utility.ItemUtils")
let $StockpotContainer = Java.loadClass("com.github.ysbbbbbb.kaleidoscopecookery.crafting.container.StockpotContainer")
let $StockpotRecipe = Java.loadClass("com.github.ysbbbbbb.kaleidoscopecookery.crafting.recipe.StockpotRecipe")
let $StockpotRecipeSerializer = Java.loadClass("com.github.ysbbbbbb.kaleidoscopecookery.crafting.serializer.StockpotRecipeSerializer")
let $Integer = Java.loadClass('java.lang.Integer')
let $String = Java.loadClass("java.lang.String")
let $Random = Java.loadClass("java.util.Random")
let $CookingPotRecipe = Java.loadClass("vectorwing.farmersdelight.common.crafting.CookingPotRecipe")
let $Ingredient = Java.loadClass('net.minecraft.world.item.crafting.Ingredient')
let $NonNullList = Java.loadClass('net.minecraft.core.NonNullList')
let $SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource")
let $ListTag = Java.loadClass("net.minecraft.nbt.ListTag")
let $CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag")
let $Level = Java.loadClass("net.minecraft.world.level.Level")
let $Level$ExplosionInteraction = Java.loadClass("net.minecraft.world.level.Level$ExplosionInteraction")

let $CookingPotBlockEntity$processCooking = Java.class.forName(pathOf$CookingPotBlockEntity)
    .getDeclaredMethod("processCooking", $CookingPotRecipe, $CookingPotBlockEntity)
$CookingPotBlockEntity$processCooking.setAccessible(true)
let $CookingPotBlockEntity$cookTime = Java.class.forName(pathOf$CookingPotBlockEntity)
    .getDeclaredField("cookTime")
$CookingPotBlockEntity$cookTime.setAccessible(true)
let $CookingPotBlockEntity$inventory = Java.class.forName(pathOf$CookingPotBlockEntity)
    .getDeclaredField("inventory")
$CookingPotBlockEntity$inventory.setAccessible(true)
let $StockpotBlockEntity$applyRecipe = Java.class.forName(pathOf$StockpotBlockEntity)
    .getDeclaredMethod("applyRecipe", $Level, $StockpotContainer, $StockpotRecipe)
$StockpotBlockEntity$applyRecipe.setAccessible(true)

/**
 * 清空厨锅内容
 * @param {Internal.BlockContainerJS} block
 * @param {Boolean} doCleanSlot0
 */
function dumpling$clearPotInventory(block, doCleanSlot0) {
    let be = block.entity
    if (!(be instanceof $CookingPotBlockEntity)) return

    let inventory = $CookingPotBlockEntity$inventory.get(be)
    let inventoryItems = []
    let startSlot = doCleanSlot0 ? 0 : 1;
    for (let i = startSlot; i < be.MEAL_DISPLAY_SLOT; i++) {
        if (inventory.getStackInSlot(i).isEmpty()) continue
        inventoryItems.push(inventory.getStackInSlot(i).copy())
        inventory.setStackInSlot(i, Item.empty)
    }

    inventoryItems.forEach(item => {
        block.popItem(item)
    })
}

/**
 * 生成不破坏的TNT
 * @param {Internal.Level} level 
 * @param {Internal.MinecraftServer} server 
 * @param {Internal.Player} player
 */
function dumpling$spawnFakeTNT(level, server, player) {
    let tntEntity = level.createEntity("minecraft:tnt")
    tntEntity.setPos(player.x, player.y + 0.5, player.z)

    player.setStatusMessage(Component.darkRed("你听到了滋滋滋的声响………"))
    level.playSound(null, tntEntity.getX(), tntEntity.getY(), tntEntity.getZ(), "entity.tnt.primed", $SoundSource.BLOCKS, 1.0, 1.0);
    tntEntity.spawn()

    server.scheduleRepeatingInTicks(1, timer => {
        if (tntEntity.getFuse() <= 2) {
            level.explode(tntEntity, tntEntity.getX(), tntEntity.getY(0.0625), tntEntity.getZ(), 4.0, $Level$ExplosionInteraction.NONE);
            tntEntity.discard()
            timer.clear()
        }
    })
}

/**
 * 处理一盘熟饺子nbt
 * @param {Internal.CompoundTag} nbt 
 * @param {Internal.Player} player 
 * @returns {Object}
 */
function dumpling$processPlateNBT(nbt, player) {
    if (nbt == null || !nbt.contains("filling")) return null

    let fillingNBTs = nbt.getList("filling", 10)
    let authorNBTs = nbt.getList("author", 10)
    let firstFillingproperties = null
    let seed = $String.valueOf(fillingNBTs.getAsString()).hashCode()
    let random = new $Random(seed)
    let processTicks = 0
    let hasName = false
    for (let i = 0; i < fillingNBTs.size(); i++) {
        let fillingNBT = fillingNBTs.getCompound(i)
        let insertTag = new $CompoundTag()
        insertTag.put("filling", fillingNBT)
        let properties = dumpling$processNBT(insertTag, player)

        if (properties != null) {
            processTicks += properties.processTicks
        }
    }

    processTicks = Math.floor(processTicks * 0.8)

    let maxTry = 80
    let tryy = 0
    while (!hasName && tryy < maxTry) {
        tryy++

        let nameNbt = fillingNBTs.getCompound(random.nextInt(fillingNBTs.size()))
        let insertTag = new $CompoundTag()
        insertTag.put("filling", nameNbt)

        let properties = dumpling$processNBT(insertTag, player)

        if (properties != null) {
            hasName = true
            firstFillingproperties = properties
            break
        }
    }

    if (firstFillingproperties == null) return null

    return {
        firstFillingproperties: firstFillingproperties,
        processTicks: processTicks,
        fillingNBTs: fillingNBTs,
        authorNBTs: authorNBTs
    }
}

/**
 * 食物是否有负面效果，无法检测药水，谜之炖菜等物品
 * @param {Internal.FoodProperties} foodProperties 
 * @returns {Boolean}
 */
function dumpling$hasNegativeEffect(foodProperties) {
    if (foodProperties == null) return false
    let effects = foodProperties.getEffects()
    if (effects.isEmpty()) return false

    for (let effect of effects) {
        if (!effect.getFirst().effect.beneficial) return true
    }

    return false
}

/**
 * 处理熟饺子nbt
 * @param {Internal.CompoundTag} nbt 
 * @param {Internal.Player} player 
 * @returns {Object}
 */
function dumpling$processNBT(nbt, player) {
    if (nbt == null || !nbt.contains("filling")) return null

    let fillingNBT = nbt.getCompound("filling")
    let fillingItemId = fillingNBT.getString("id")
    let fillingItemTag = fillingNBT.get("tag")

    let fillingItem = Item.of(fillingItemId, fillingItemTag)
    let isFood = fillingItem.edible || fillingItem.getFoodProperties(player) != null
    let isNegative = dumpling$hasNegativeEffect(fillingItem.getFoodProperties(player))

    let seedString = fillingItemTag.isEmpty()
        ? fillingItemId
        : fillingItemId + " " + fillingItemTag.getAsString()
    let seed = $String.valueOf(seedString).hashCode()
    let random = new $Random(seed)

    let prefixPool, traitPool

    if (isFood) {
        if (isNegative) {
            prefixPool = [
                "糊了的", "齁咸的", "夹生的", "馊掉的", "凉透的", "卖相诡异的", "味道古怪的", "来历不明的",
                "偷工减料的", "包得歪歪扭扭的", "馅料可疑的", "皮厚如墙的", "咸到发苦的", "油腻腻的",
                "软烂如泥的", "硬如石头的", "毫无味道的", "腥气冲天的", "酸溜溜的", "甜到发腻的", "苦不堪言的",
                "辣到流泪的", "麻到失去知觉的", "像是隔夜的", "像是从垃圾桶捡回来的", "被诅咒的",
                "令人作呕的", "黑暗料理界的", "食之无味的", "弃之可惜的", "挑战人类极限的", "吃一口需要勇气的",
                "吃完会做噩梦的", "仿佛在嚼蜡烛的", "一股子怪味的", "不知道什么肉做的", "看起来就不太对劲的",
                "颜色诡异的", "散发奇怪气味的", "粘糊糊的", "干巴巴的", "冷冰冰的", "半生不熟的", "熟过头的",
                "烤焦的", "炸过头的", "煮烂的", "没放盐的", "放了两遍盐的", "调料放错的", "像是用脚包的",
                "像是被蹂躏过的", "充满怨念的", "来自地狱的", "被黑暗力量侵蚀的", "诸神唾弃的",
                "禁忌之术搞砸的", "跨越次元的失败品", "史诗级的灾难", "梦幻般的难吃", "传说中难吃到极致的",
                "不可名状的黑暗", "自带霉运光环的", "蕴含毒气的", "被封印的恶之料理", "皇家御用的毒药"
            ]
            traitPool = [
                "咬开后发现是空的", "一口下去怀疑人生", "仿佛在吃橡胶", "味道像极了洗脚水", "吃完立刻想吐",
                "这饺子可能想谋杀我", "里面的馅料正在互相打架", "皮厚得能防弹", "像是从战场上下来的",
                "吃完感觉生命值-100", "建议搭配解毒剂食用", "吃完需要去医院洗胃", "这饺子有毒",
                "吃了一口就哭了", "难吃到令人发指", "难吃到怀疑自己为什么要吃", "吃完后悔三生三世",
                "这是对饺子的侮辱", "连狗都不吃", "看一眼就饱了", "闻到味道就跑了", "吃完后感觉世界失去了颜色",
                "吃出了绝望的味道", "仿佛在咀嚼自己的失败", "吃完后整个人都不好了", "这饺子让我想起了前任",
                "吃一口折寿十年", "这是减肥神器", "吃下去胃开始了罢工", "牙齿表示受到了伤害",
                "味蕾集体自杀", "舌头在尖叫", "喉咙在拒绝下咽", "这是来自地狱的馈赠", "吃完后想要净化自己",
                "这饺子可能受到了诅咒", "里面藏着一整个世界的恶意", "吃完后获得了负面状态",
                "这是对美食的亵渎", "建议直接扔掉", "包它的人是不是恨你", "如果你吃了它，它会哭的",
                "这是一只极其黑暗的饺子", "不要吃它，快跑", "里面的食材正在密谋逃跑",
                "哪怕是神明也会为此颤抖", "足以引发一场外交灾难", "如果你愿意，它可以是一切的终结"
            ]
        } else {
            prefixPool = [
                "热腾腾的", "香喷喷的", "圆滚滚的", "白净的", "晶莹剔透的", "刚出锅的",
                "皮薄的", "秘制的", "多汁的", "地道的", "鲜美的", "扎实的", "浓郁的", "爽口的",
                "油亮亮的", "饱满的", "软糯的", "弹牙的", "汤汁盈口的", "面香浓郁的", "金黄酥脆的",
                "热情的", "充满爱心的", "奶奶包的", "邻居送的", "令人怀念的", "卖相极佳的", "平平无奇的",
                "走心的", "诚意满满的", "深夜食堂的", "异乡人的", "老字号的", "大厨练手的", "手工现揉的",
                "逢年过节的", "冬至限定 的", "除夕夜的", "团圆的", "邻里赞赏的", "深巷里的",
                "发光的", "传说中的", "被祝福的", "注入灵魂 of", "甚至在动的", "深藏不露的", "有故事的",
                "梦幻般的", "史诗级的", "诸神赞叹的", "禁忌之术包出的", "跨越次元的", "流传千年的",
                "不可名状的", "自带光环的", "蕴含内功的", "被封印的", "开光的", "皇家御用的"
            ]
            traitPool = [
                "鲜嫩多汁", "皮薄馅大", "香气四溢", "火候刚好", "嚼劲十足", "入口即化", "汤汁浓郁", "层次分明",
                "咸甜适中", "回味悠长", "鲜掉眉毛", "肥而不腻", "清香解腻", "口感如云朵般轻盈", "每一口都是惊喜",
                "筋道有力", "由于太好吃被禁止参加比赛", "咬开后有龙在飞", "这滋味，谁吃谁知道",
                "家乡的味道", "过年的气息", "儿时的记忆", "温暖的慰藉", "这就是幸福", "根本停不下来",
                "一种久违的踏实感", "平凡中的不凡", "每一褶都是艺术", "承载了三代的配方", "治愈一切不开心",
                "舌尖上的华尔兹", "仿佛回到了那个遥远的下午", "吃出了妈妈的味道",
                "米其林水准", "路边摊奇迹", "足以传世的杰作", "这馅料绝了", "皮的厚度堪称艺术", "内里乾坤大",
                "小心烫嘴", "建议一口一个", "似乎能听到大海的声音", "里面的馅料正在跳舞",
                "这饺子，简直是艺术品", "吃完感觉增加了 10 年内力", "如果你不吃，它会哭的",
                "这是一只极其努力的饺子", "不要盯着它看，直接吃掉", "里面的食材正在开会",
                "哪怕是神明也会为此排队", "足以解决一切外交纷争", "如果你愿意，它可以是任何口味"
            ]
        }

    } else {
        prefixPool = [
            "硬邦邦的", "沉重的", "硌牙的", "充满土腥味的", "无法理解的", "工业风的",
            "结构稳定的", "原始的", "粗犷的", "不可磨灭的", "高密度的", "重量级的",
            "边缘锐利的", "仿佛在拒绝被吃的", "来自大地的", "矿工严选的", "成分复杂的",
            "绝对会崩掉门牙的", "违背常理的", "密度极大的", "令人迷惑的", "这种东西也包的"
        ]
        traitPool = [
            "嚼起来像在咬石头", "牙医的噩梦", "极其考验咬合力", "充满了二氧化硅的气息",
            "吞下去需要巨大的勇气", "这已经不是饺子了，是暗器", "感觉在吃地壳碎片",
            "胃部表示抗议", "可以拿来砸核桃", "一口下去全是各种微量元素", "建议配合碎石机食用",
            "它似乎并不想离开你的肠道", "这可能是世界上最硬的午餐", "你真的确定要吃这个吗？",
            "吃完后体重增加了 5 公斤", "里面藏着一整块文明的基石"
        ]
    }

    let randomColor = "#" + $Integer.toHexString(random.nextInt(0xFFFFFF))

    return {
        prefix: prefixPool[random.nextInt(prefixPool.length)],
        processTicks: 50 + random.nextInt(201),
        nameColor: randomColor,
        trait: traitPool[random.nextInt(traitPool.length)],
        fillingNBT: fillingNBT
    }
}

/**
 * 处理砧板产物
 * @param {Internal.BlockContainerJS} block 
 * @param {Internal.ItemStack} resultStack 
 */
function dumpling$processStoredItem(block, resultStack) {
    if (block.id != "farmersdelight:cutting_board") return

    let pos = block.pos
    let level = block.level
    let direction = block.getBlockState().getValue($CuttingBoardBlock.FACING).getCounterClockWise()

    $ItemUtils.spawnItemEntity(level, resultStack.copy(),
        pos.x + 0.5 + (direction.getX() * 0.2), pos.y + 0.2, pos.z + 0.5 + (direction.getZ() * 0.2),
        direction.getX() * 0.2, 0.0, direction.getZ() * 0.2)
}

/**
 * 检测森罗厨锅是否有八个生饺子
 * @param {Internal.NonNullList<Internal.ItemStack>} inputs 
 * @param {Internal.ItemStack} processItem 
 * @returns {Boolean}
 */
function dumpling$isDumplingRecipe(inputs, processItem) {
    if (inputs.isEmpty()) return false

    let tag = processItem.getOrCreateTag()
    let count = 0
    let targetId = 'kubejs:raw_dumpling'
    let fillingListTag = new $ListTag()
    let authorListTag = new $ListTag()

    for (let stack of inputs) {
        if (stack.isEmpty()) continue

        if (stack.id == targetId) {
            count += stack.count
        } else {
            return false
        }

        if (stack.getOrCreateTag().contains("filling")) {
            fillingListTag.add(inputs.indexOf(stack), stack.nbt.getCompound("filling"))
        } else {
            fillingListTag.add(inputs.indexOf(stack), new $CompoundTag())
        }

        if (stack.getOrCreateTag().contains("author")) {
            authorListTag.add(inputs.indexOf(stack), {"name": stack.nbt.getString("author")})
        }else{
            authorListTag.add(inputs.indexOf(stack), {"name": "Unknown"})
        }
    }
    tag.put("filling", fillingListTag)
    tag.put("author", authorListTag)

    return count === 8
}

//生饺子变熟饺子（森罗）
BlockEvents.rightClicked("kaleidoscope_cookery:stockpot", event => {
    let { player, block, hand, server, level } = event

    let handItem = player.getItemInHand(hand)
    let blockEntity = block.entity
    if (!blockEntity) return

    if (handItem.id === "kaleidoscope_cookery:stockpot_lid" && blockEntity instanceof $StockpotBlockEntity && $StockpotRecipeSerializer.DEFAULT_SOUP_BASE.equals(blockEntity.getSoupBaseId())) {
        if (blockEntity.persistentData.contains("doDumpling")) {
            if (blockEntity.persistentData.getBoolean("doDumpling")) return
        }

        let inputs = blockEntity.getInputs()
        let hasDumpling = false
        let hasDumplingPlate = false
        for(let i = 0; i < inputs.size(); i++) {
            let item = inputs.get(i)
            if (item.id === "kubejs:raw_dumpling_plate"){
                hasDumplingPlate = true
                if (i !== 0) {
                    player.setStatusMessage("锅里除了饺子还有其他东西哦……")
                    event.cancel()
                    return
                }else {
                    break
                }
            }
        }

        if (hasDumplingPlate) { //解包饺子
            let dumplingPlate = inputs[0]
            if (blockEntity.getStatus() !== 1){
                return;
            }
            let hasItem = false
            for (let i = 1; i < inputs.length; i++) {
                if(inputs[i].id !== "minecraft:air"){
                    hasItem = true
                }
            }
            if (hasItem) {
                player.setStatusMessage("锅里放不下这么多饺子哦……")
                player.tell("[debug]" + inputs)
                event.cancel()
                return
            }
            inputs.set(0, ItemStack.EMPTY)
            player.give(Item.of("minecraft:bowl").withCount(1))
            let nbt = dumplingPlate.getNbt()
            let fillingNBTs = nbt.getList("filling", 10)
            let authorNBTs = nbt.getList("author", 10)
            for(let i = 0; i < 8; i++) {
                let fillingItem = Item.of(fillingNBTs.getCompound(i).getString("id"), fillingNBTs.getCompound(i).get("tag"))
                let authorName = authorNBTs.getCompound(i).getString("name")
                let dumplingItem = Item.of("kubejs:raw_dumpling", { filling: fillingNBTs.getCompound(i), author: authorName })
                .withLore([
                    Text.of("馅料: " + fillingItem.getHoverName().getString()).gray().italic(false).bold(false),
                    Text.of("厨师: " + authorName).gray().italic(false).bold(false)
                ])
                .withCount(1)
                blockEntity.addIngredient(level, player, dumplingItem)
            }
        }
        inputs.forEach(item => {
            if (item.id == "kubejs:raw_dumpling") hasDumpling = true
        })

        if (!hasDumpling) return

        let rawDumplingPlateItem = Item.of("kubejs:raw_dumpling_plate")
        if (!dumpling$isDumplingRecipe(inputs, rawDumplingPlateItem)) {
            player.setStatusMessage("锅里的饺子数量好像不对呢……")
            event.cancel()
            return
        }

        let nbt = rawDumplingPlateItem.getNbt()
        let properties = dumpling$processPlateNBT(nbt, player)
        if (properties == null) {
            player.setStatusMessage("锅里的饺子好像没有馅呢……")
            event.cancel()
            return
        }

        let fullName = properties.firstFillingproperties.prefix + " 一盘熟饺子"
        let coloredName = Text.of(fullName)
            .color(Color.of(properties.firstFillingproperties.nameColor))
            .italic(false)
            .bold(false)

        let resultItem = Item.of("kubejs:cooked_dumpling_plate", { filling: properties.fillingNBTs, author: properties.authorNBTs })
            .withName(coloredName)
            .withLore([
                Text.of(properties.firstFillingproperties.trait)
                    .gold()
                    .italic(false)
                    .bold(false)
            ])

        let ingredients = $Ingredient.EMPTY
        inputs.forEach(inputItem => ingredients.getStacks().add(inputItem))

        let input = $NonNullList.create()
        input.add(ingredients)

        let accelerateTicks = Math.floor(properties.processTicks * 0.5) - 10
        let dumplingsRecipe = new $StockpotRecipe(
            "kubejs:cooking_dumpling_plate",
            input,
            resultItem,
            accelerateTicks,
            "minecraft:bowl"
        )

        let processSeconds = ((dumplingsRecipe.time() + 10) / 20).toFixed(2)
        player.setStatusMessage(`一盘饺子正在制作，预计需要 ${processSeconds} 秒来煮熟！`)

        let maxDuration = dumplingsRecipe.time()
        let currentTick = 0
        let container = blockEntity.getContainer()
        blockEntity.persistentData.putBoolean("doDumpling", true)
        server.scheduleInTicks(10, () => {
            $StockpotBlockEntity$applyRecipe.invoke(blockEntity, level, container, dumplingsRecipe)
        })
        server.scheduleRepeatingInTicks(1, timer => {
            if (!blockEntity || blockEntity.isRemoved()) {
                timer.clear()
                return
            }

            if (blockEntity.getStatus() == 0 || !blockEntity.hasHeatSource(level) || !blockEntity.hasLid()) return

            currentTick++
            if (currentTick > maxDuration) {
                level.playSound(
                    null,
                    block.pos.x, block.pos.y, block.pos.z,
                    "create:schematicannon_finish",
                    $SoundSource.BLOCKS,
                    1.0,
                    1.2
                )

                server.scheduleInTicks(6, () => {
                    level.playSound(
                        null,
                        block.pos.x, block.pos.y, block.pos.z,
                        "create:schematicannon_finish",
                        $SoundSource.BLOCKS,
                        1.0,
                        0.9
                    )
                })

                level.spawnParticles(
                    "minecraft:happy_villager",
                    true,
                    block.x + 0.5, block.y + 0.7, block.z + 0.5,
                    0.2, 0.2, 0.2,
                    3,
                    0
                )
                blockEntity.persistentData.putBoolean("doDumpling", false)
                timer.clear()
            }
        })
    }
})

//生饺子转化为熟饺子
BlockEvents.rightClicked("farmersdelight:cooking_pot", event => {
    let { player, block, level, hand, server } = event

    let handItem = player.getItemInHand(hand)
    if (handItem.id != "kubejs:raw_dumpling") return

    let blockEntity = block.entity
    if (blockEntity instanceof $CookingPotBlockEntity) {
        let nbt = handItem.getNbt()
        let properties = dumpling$processNBT(nbt, player)
        if (properties == null) {
            player.setStatusMessage("这个生饺子好像没有馅呢……")
            event.cancel()
            return
        }

        let inputItem = handItem.copyWithCount(1)
        let fullName = properties.prefix + " 饺子"
        let coloredName = Text.of(fullName)
            .color(Color.of(properties.nameColor))
            .italic(false)
            .bold(false)

        let resultItem = Item.of("kubejs:cooked_dumpling", { filling: properties.fillingNBT, author: handItem.getNbt().author })
            .withName(coloredName)
            .withLore([
                Text.of(properties.trait)
                    .gold()
                    .italic(false)
                    .bold(false),
                Text.of("厨师: " + handItem.getNbt().author).gray().italic(false).bold(false)
            ])

        let ingredients = $Ingredient.EMPTY
        ingredients.getStacks().add(inputItem)
        handItem.shrink(1)

        let input = $NonNullList.create()
        input.add(ingredients)

        let dumplingsRecipe = new $CookingPotRecipe(
            "kubejs:cooking_dumpling",
            "",
            null,
            input,
            resultItem,
            Item.empty,
            0,
            properties.processTicks
        )

        let processSeconds = (dumplingsRecipe.getCookTime() / 20).toFixed(2)
        player.setStatusMessage(`饺子已入锅，预计需要 ${processSeconds} 秒来煮熟！`)
        dumpling$clearPotInventory(block, true)
        level.playSound(
            null,
            block.pos.x, block.pos.y, block.pos.z,
            "create:mixing",
            $SoundSource.BLOCKS,
            0.5,
            level.random.nextFloat() * 0.1 + 0.9
        )

        let inventory = $CookingPotBlockEntity$inventory.get(blockEntity)
        inventory.setStackInSlot(0, inputItem)

        let maxDuration = dumplingsRecipe.getCookTime()
        let currentTick = 0

        server.scheduleRepeatingInTicks(1, timer => {
            if (!blockEntity || blockEntity.isRemoved() || !inventory.getStackInSlot(0).equals(inputItem) || !blockEntity.isHeated()) {
                timer.clear()
                return
            }

            dumpling$clearPotInventory(block, false)
            $CookingPotBlockEntity$cookTime.set(blockEntity, $Integer(`${currentTick}`))
            let isDone = $CookingPotBlockEntity$processCooking.invoke(blockEntity, dumplingsRecipe, blockEntity)

            if (isDone) {
                level.playSound(
                    null,
                    block.pos.x, block.pos.y, block.pos.z,
                    "create:schematicannon_finish",
                    $SoundSource.BLOCKS,
                    1.0,
                    1.2
                )

                server.scheduleInTicks(6, () => {
                    level.playSound(
                        null,
                        block.pos.x, block.pos.y, block.pos.z,
                        "create:schematicannon_finish",
                        $SoundSource.BLOCKS,
                        1.0,
                        0.9
                    )
                })

                level.spawnParticles(
                    "minecraft:happy_villager",
                    true,
                    block.x + 0.5, block.y + 0.7, block.z + 0.5,
                    0.2, 0.2, 0.2,
                    3,
                    0
                )
                timer.clear()
            }

            currentTick++
            if (currentTick > maxDuration) {
                timer.clear()
            }
        })

        event.cancel()
    }
})

//一盘生饺子转化为一盘熟饺子
BlockEvents.rightClicked("farmersdelight:cooking_pot", event => {
    let { player, block, level, hand, server } = event

    let handItem = player.getItemInHand(hand)
    if (handItem.id != "kubejs:raw_dumpling_plate") return

    let blockEntity = block.entity
    if (blockEntity instanceof $CookingPotBlockEntity) {
        let nbt = handItem.getNbt()
        let properties = dumpling$processPlateNBT(nbt, player)
        if (properties == null) {
            player.setStatusMessage("这盘生饺子好像没有馅呢……")
            event.cancel()
            return
        }

        let inputItem = handItem.copyWithCount(1)
        let fullName = properties.firstFillingproperties.prefix + " 一盘熟饺子"
        let coloredName = Text.of(fullName)
            .color(Color.of(properties.firstFillingproperties.nameColor))
            .italic(false)
            .bold(false)

        let resultItem = Item.of("kubejs:cooked_dumpling_plate", { filling: properties.fillingNBTs, author: handItem.getNbt().author })
            .withName(coloredName)
            .withLore([
                Text.of(properties.firstFillingproperties.trait)
                    .gold()
                    .italic(false)
                    .bold(false)
            ])

        let ingredients = $Ingredient.EMPTY
        ingredients.getStacks().add(inputItem)
        handItem.shrink(1)

        let input = $NonNullList.create()
        input.add(ingredients)

        let dumplingsRecipe = new $CookingPotRecipe(
            "kubejs:cooking_dumpling_plate",
            "",
            null,
            input,
            resultItem,
            Item.empty,
            0,
            properties.processTicks
        )

        let processSeconds = (dumplingsRecipe.getCookTime() / 20).toFixed(2)
        player.setStatusMessage(`一盘饺子已入锅，预计需要 ${processSeconds} 秒来煮熟！`)
        dumpling$clearPotInventory(block, true)
        level.playSound(
            null,
            block.pos.x, block.pos.y, block.pos.z,
            "create:mixing",
            $SoundSource.BLOCKS,
            0.5,
            level.random.nextFloat() * 0.1 + 0.9
        )

        let inventory = $CookingPotBlockEntity$inventory.get(blockEntity)
        inventory.setStackInSlot(0, inputItem)

        let maxDuration = dumplingsRecipe.getCookTime()
        let currentTick = 0

        server.scheduleRepeatingInTicks(1, timer => {
            if (!blockEntity || blockEntity.isRemoved() || !ItemStack.isSameItemSameTags(inventory.getStackInSlot(0), inputItem) || !blockEntity.isHeated()) {
                timer.clear()
                return
            }

            dumpling$clearPotInventory(block, false)
            $CookingPotBlockEntity$cookTime.set(blockEntity, $Integer(`${currentTick}`))
            let isDone = $CookingPotBlockEntity$processCooking.invoke(blockEntity, dumplingsRecipe, blockEntity)

            if (isDone) {
                level.playSound(
                    null,
                    block.pos.x, block.pos.y, block.pos.z,
                    "create:schematicannon_finish",
                    $SoundSource.BLOCKS,
                    1.0,
                    1.2
                )

                server.scheduleInTicks(6, () => {
                    level.playSound(
                        null,
                        block.pos.x, block.pos.y, block.pos.z,
                        "create:schematicannon_finish",
                        $SoundSource.BLOCKS,
                        1.0,
                        0.9
                    )
                })

                level.spawnParticles(
                    "minecraft:happy_villager",
                    true,
                    block.x + 0.5, block.y + 0.7, block.z + 0.5,
                    0.2, 0.2, 0.2,
                    3,
                    0
                )
                timer.clear()
            }

            currentTick++
            if (currentTick > maxDuration) {
                timer.clear()
            }
        })

        event.cancel()
    }
})

//饺子皮转化为生饺子
BlockEvents.rightClicked("farmersdelight:cutting_board", event => {
    let { player, block, level, hand } = event

    let handItem = player.getItemInHand(hand)
    if (handItem.isEmpty()) return

    let blockEntity = block.entity
    if (blockEntity instanceof $CuttingBoardBlockEntity) {
        let inventory = blockEntity.getInventory()
        let containItem = blockEntity.getStoredItem()

        if (containItem.id != "kubejs:dumpling_wrapper") return
        if (handItem.id == 'kubejs:raw_dumpling' || handItem.id == 'kubejs:cooked_dumpling' || handItem.id == 'kubejs:raw_dumpling_plate' || handItem.id == 'kubejs:cooked_dumpling_plate') {
            player.setStatusMessage("饺子皮已经足够厚了！")
            event.cancel()
            return
        }

        let fillingItem = handItem.copyWithCount(1)
        let rawDumplingItem = Item.of("kubejs:raw_dumpling", 1)
            .withLore([
                Text.of("馅料: " + fillingItem.getHoverName().getString()).gray().italic(false).bold(false),
                Text.of("厨师: " + event.player.name.getString()).gray().italic(false).bold(false)
            ])
        rawDumplingItem.getOrCreateTag().put("filling", {
            id: fillingItem.id,
            tag: fillingItem.getOrCreateTag()
        })
        rawDumplingItem.getOrCreateTag().put("author", event.player.name.getString())
        dumpling$processStoredItem(block, rawDumplingItem)
        handItem.shrink(1)
        inventory.setStackInSlot(0, Item.empty)

        blockEntity.playProcessingSound("create:mixing", null, null)
        level.spawnParticles(
            "minecraft:happy_villager",
            true,
            block.x + 0.5, block.y + 0.7, block.z + 0.5,
            0.2, 0.2, 0.2,
            3,
            0
        )

        event.cancel()
    }
})

//吃下饺子后，根据馅料内容做出行为
ItemEvents.foodEaten("kubejs:cooked_dumpling", event => {
    let { player, item, level, server } = event
    if (!item.getOrCreateTag().contains("filling")) return

    let fillingNBT = item.nbt.getCompound("filling")
    let fillingItemId = fillingNBT.getString("id")
    let fillingItemTag = fillingNBT.get("tag")

    let fillingItem = Item.of(fillingItemId, fillingItemTag)
    let isFood = fillingItem.edible || fillingItem.foodProperties != null

    if (isFood) {
        fillingItem.finishUsingItem(level, player)
    } else if (fillingItem.id == "minecraft:tnt") {
        dumpling$spawnFakeTNT(level, server, player)
    } else {
        player.give(fillingItem)
    }
})

//饺子放置
BlockEvents.rightClicked(event => {
    if (event.hand != "MAIN_HAND") return
    if (event.player.mainHandItem.id != "kubejs:cooked_dumpling_plate") return

    event.server.scheduleInTicks(1, func => {
        if (event.facing == "UP" && event.block.up.id == "kubejs:cooked_dumpling_plate" && !event.block.up.entityData.data.filling) {
            event.block.up.entityData.data.put("filling", event.player.mainHandItem.nbt.filling)
            event.block.up.entityData.data.put("author", event.player.mainHandItem.nbt.author)
        }
        if (event.facing == "EAST" && event.block.east.id == "kubejs:cooked_dumpling_plate" && !event.block.east.entityData.data.filling) {
            event.block.east.entityData.data.put("filling", event.player.mainHandItem.nbt.filling)
            event.block.east.entityData.data.put("author", event.player.mainHandItem.nbt.author)
        }
        if (event.facing == "WEST" && event.block.west.id == "kubejs:cooked_dumpling_plate" && !event.block.west.entityData.data.filling) {
            event.block.west.entityData.data.put("filling", event.player.mainHandItem.nbt.filling)
            event.block.west.entityData.data.put("author", event.player.mainHandItem.nbt.author)
        }
        if (event.facing == "SOUTH" && event.block.south.id == "kubejs:cooked_dumpling_plate" && !event.block.south.entityData.data.filling) {
            event.block.south.entityData.data.put("filling", event.player.mainHandItem.nbt.filling)
            event.block.south.entityData.data.put("author", event.player.mainHandItem.nbt.author)
        }
        if (event.facing == "NORTH" && event.block.north.id == "kubejs:cooked_dumpling_plate" && !event.block.north.entityData.data.filling) {
            event.block.north.entityData.data.put("filling", event.player.mainHandItem.nbt.filling)
            event.block.north.entityData.data.put("author", event.player.mainHandItem.nbt.author)
        }
        if (event.facing == "DOWN" && event.block.down.id == "kubejs:cooked_dumpling_plate" && !event.block.down.entityData.data.filling) {
            event.block.down.entityData.data.put("filling", event.player.mainHandItem.nbt.filling)
            event.block.down.entityData.data.put("author", event.player.mainHandItem.nbt.author)
        }
    })
})

BlockEvents.rightClicked("kubejs:cooked_dumpling_plate", event => {
    if (event.hand != "MAIN_HAND") return
    if (event.player.mainHandItem.id == "kubejs:cooked_dumpling_plate") return
    let property = event.block.properties
    let bite = Number(property.bite)
    let facing = String(property.facing)
    if (bite == 8) {
        event.player.giveInHand("minecraft:bowl")
        event.block.set("minecraft:air")
        return
    }
    let nbt = event.block.entityData.data.filling[bite]
    try {
        let tag = new $CompoundTag()
        tag.put("filling", nbt)
        let properties = dumpling$processNBT(tag, event.player)
        let player = event.player

        if (properties == null) {
            player.setStatusMessage("这个生饺子好像没有馅呢……")
            event.cancel()
            return
        }
        let fullName = properties.prefix + " 饺子"
        let coloredName = Text.of(fullName)
            .color(Color.of(properties.nameColor))
            .italic(false)
            .bold(false)

        let resultItem = Item.of("kubejs:cooked_dumpling", { filling: properties.fillingNBT, author: event.block.entityData.data.author[bite].name })
            .withName(coloredName)
            .withLore([
                Text.of(properties.trait)
                    .gold()
                    .italic(false)
                    .bold(false),
                Text.of("厨师: " + event.block.entityData.data.author[bite].name).gray().italic(false).bold(false)
            ])

        event.player.give(resultItem)
    } catch (e) {
        event.player.tell(e)
    }
    event.block.set("kubejs:cooked_dumpling_plate", { bite: `${bite + 1}`, facing: facing })
})