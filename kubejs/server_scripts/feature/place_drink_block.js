const ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack");

/* ==========================================================
 * 1. 配置表：什么鸡尾酒对应什么方块、空杯
 *    以后只改这里即可
 * ========================================================== */
const COCKTAIL_MAP = {
    "kitchenkarrot:cocktails/july_21": {
        blockId: "kubejs:july_21_block",   // 放置出来的方块
        emptyId: "kubejs:martini_glass",  // 喝光后留下的方块
        maxStack: 2
    },
    "kitchenkarrot:cocktails/tsundere_heroine": {
        blockId: "kubejs:tsundere_heroine_block",
        emptyId: "kubejs:martini_glass",
        maxStack: 2
    },
    "kitchenkarrot:cocktails/sweet_berry_martini": {
        blockId: "kubejs:sweet_berry_martini_block",
        emptyId: "kubejs:martini_glass",
        maxStack: 2
    },
    "kitchenkarrot:cocktails/birch_sap_vodka": {
        blockId: "kubejs:birch_sap_vodka_block",
        emptyId: "kubejs:martini_glass",
        maxStack: 2
    },
    "kitchenkarrot:cocktails/red_lizard": {
        blockId: "kubejs:red_lizard_block",
        emptyId: "kubejs:hurricane_glass",
        maxStack: 3
    },
    "kitchenkarrot:cocktails/second_guess": {
        blockId: "kubejs:second_guess_block",
        emptyId: "kubejs:hurricane_glass",
        maxStack: 3
    },
    "kitchenkarrot:cocktails/light_yellow_firefly": {
        blockId: "kubejs:light_yellow_firefly_block",
        emptyId: "kubejs:hurricane_glass",
        maxStack: 3
    },
    "kitchenkarrot:cocktails/shooting_star": {
        blockId: "kubejs:shooting_star_block",
        emptyId: "kubejs:hurricane_glass",
        maxStack: 3
    },
    "kitchenkarrot:cocktails/twilight_forest": {
        blockId: "kubejs:twilight_forest_block",
        emptyId: "kubejs:old_fashioned_glass",
        maxStack: 4
    },
    "kitchenkarrot:cocktails/jacks_story": {
        blockId: "kubejs:jacks_story_block",
        emptyId: "kubejs:old_fashioned_glass",
        maxStack: 4
    },
    "kitchenkarrot:cocktails/shanghai_beach": {
        blockId: "kubejs:shanghai_beach_block",
        emptyId: "kubejs:old_fashioned_glass",
        maxStack: 4
    },
    "kitchenkarrot:cocktails/bane_of_arthropods": {
        blockId: "kubejs:bane_of_arthropods_block",
        emptyId: "kubejs:old_fashioned_glass",
        maxStack: 4
    }
};

/* ==========================================================
 * 2. 工具方法：根据 ItemStack 拿到鸡尾酒 id
 * ========================================================== */
function getCocktailId(item) {
    if (!item || item.id !== "kitchenkarrot:cocktail") return null;
    return item.nbt?.cocktail;   // 返回字符串，如 "kitchenkarrot:cocktails/july_21"
}

/* ==========================================================
 * 3. 工具方法：给玩家一个指定鸡尾酒 ItemStack
 * ========================================================== */
function createCocktailItem(cocktailId) {
    const stack = new ItemStack(Item.getItem("kitchenkarrot:cocktail"));
    stack.getOrCreateTag().putString("cocktail", cocktailId);
    return stack;
}

/* ==========================================================
 * 4. 统一事件
 * ========================================================== */
BlockEvents.rightClicked(event => {
    const { player, item, level, hand, block, facing } = event;
    if (hand !== "main_hand") return;

    const cfg = COCKTAIL_MAP[getCocktailId(item)];
    const props = block.properties;
    const cur = +props.stacks || 1;
    const cocktailIdFromBlock = Object.keys(COCKTAIL_MAP).find(
        k => COCKTAIL_MAP[k].blockId === block.id
    );
    const food = createCocktailItem(cocktailIdFromBlock);

    /* ---------------- 4.1 潜行右键：放置第一层 ---------------- */
    if (player.isShiftKeyDown() && cfg && block?.blockState.isSolid()) {
        if (level.getBlock(block.pos.above()).id !== "minecraft:air") return;
        if (facing !== "up") return;

        block.offset(0, 1, 0).set(cfg.blockId, { facing: player.horizontalFacing });
        player.swing();
        if (!player.isCreative()) item.count--;
        event.cancel();
        return;
    }

    /* ---------------- 4.2 对方块右键：堆叠 or 取出 or 直接喝 ---------------- */
    const blockCfg = Object.values(COCKTAIL_MAP).find(e => e.blockId === block.id);
    if (!blockCfg) return;   // 不是鸡尾酒方块，直接跳过

    /* 4.2.1 手持同种酒 → 堆叠 */
    if (cfg && blockCfg.blockId === cfg.blockId) {
        if (cur >= cfg.maxStack) return;
        block.set(block.id, { stacks: String(cur + 1), facing: props.facing });
        player.swing();
        if (!player.isCreative()) item.count--;
        event.cancel();
        return;
    }

    /* 4.2.2 空手潜行 → 取出 1 份 */
    if (player.isShiftKeyDown() && item.isEmpty()) {

        if (!player.isCreative())
            player.give(food);
        player.swing();

        if (cur <= 1) {
            block.set("minecraft:air");
        } else {
            block.set(block.id, { stacks: String(cur - 1), facing: props.facing });
        }
        event.cancel();
        return;
    }

    /* 4.2.3 空手右击 → 直接喝（只剩 1 份时） */
    if (item.isEmpty()) {
        if ((+props.stacks || 1) !== 1) return;

        player.swing();
        food.finishUsingItem(level, player);
        level.playSound(
            null,
            player.x, player.y, player.z,
            "entity.player.burp",
            player.soundSource,
            0.5,
            level.random.nextFloat() * 0.1 + 0.9
        );

        block.set(blockCfg.emptyId);
        event.cancel();
    }
});

//破坏是掉落物品
BlockEvents.broken(event => {
    const { block, player }= event;
    if(player.isCreative()) return;
    const blockCfg = Object.values(COCKTAIL_MAP).find(e => e.blockId === block.id);
    if (!blockCfg) return;

    const cocktailIdFromBlock = Object.keys(COCKTAIL_MAP).find(
        k => COCKTAIL_MAP[k].blockId === block.id
    );
    const props = block.properties;
    const food = createCocktailItem(cocktailIdFromBlock);

    block.popItem(Item.of(food, props.stacks));
})