const IntegerProperty = Java.loadClass("net.minecraft.world.level.block.state.properties.IntegerProperty");
const Axis = Java.loadClass("com.mojang.math.Axis");
const ItemDisplayContext = Java.loadClass("net.minecraft.world.item.ItemDisplayContext");
const ForgeRegistries = Java.loadClass("net.minecraftforge.registries.ForgeRegistries");
const ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
const Integer = Java.loadClass('java.lang.Integer');

StartupEvents.registry('block', event => {
    // event.create('fstwines:wine_cabinet').defaultCutout()
    //     .displayName('酒柜')
    //     .soundType('wood')
    //     .mapColor('wood')
    //     .hardness(2.0)
    //     .property(BlockProperties.HORIZONTAL_FACING)
    //     .property(IntegerProperty.create('state', 1, 4))//1-4:both, left, right, none
    //     .placementState(context => {
    //         const player = context.player;
    //         const pos = context.clickedPos;
    //         const world = context.level;

    //         const HORIZONTAL = BlockProperties.HORIZONTAL_FACING;
    //         const STATE = IntegerProperty.create('state', 1, 4);

    //         const dir = player.horizontalFacing.opposite;
    //         context.setValue(HORIZONTAL, dir);

    //         if (player.shiftKeyDown) {
    //             context.set(STATE, 1);
    //             return;
    //         }

    //         // 获取相邻方块信息
    //         function getAdjState(offsetDir) {
    //             const adjPos = pos.relative(offsetDir);
    //             const block = world.getBlockState(adjPos);
    //             if (block.block.id === "fstwines:wine_cabinet") {
    //                 return {
    //                     state: block.getValue(STATE),
    //                     facing: block.getValue(HORIZONTAL),
    //                     pos: adjPos
    //                 };
    //             }
    //             return null;
    //         }

    //         // 顺时针 / 逆时针方向
    //         const cw = dir.getClockWise();
    //         const ccw = dir.getCounterClockWise();

    //         const rightBlock = getAdjState(cw);
    //         const leftBlock = getAdjState(ccw);

    //         // 连接判断
    //         function connects(current, adj, dirType) {
    //             if (!adj) return false;
    //             const s = adj.state;     // 1:both, 2:left, 3:right, 4:none
    //             const f = adj.facing;

    //             if (s === 1) return true;                       // both
    //             if (current === f && dirType === "cw" && s === 2) return true;   // left
    //             if (current === f && dirType === "ccw" && s === 3) return true;  // right
    //             return current === f;
    //         }

    //         const l = connects(dir, leftBlock, "cw");
    //         const r = connects(dir, rightBlock, "ccw");

    //         // 根据左右连接设置新方块 STATE
    //         let newState = 1; // both
    //         if (l && !r) newState = 2;  // left
    //         else if (!l && r) newState = 3; // right
    //         else if (l && r) newState = 4;  // none

    //         context.set(STATE, newState);

    //         function updateOldBlock(adj, blockDir) {
    //             if (!adj) return;
    //             const facing = adj.facing;
    //             if (facing !== dir) return;
    //             const blockPos = adj.pos;
    //             const blockState = world.getBlockState(blockPos);
    //             const oldS = adj.state;
    //             var newOldS = oldS
    //             if (blockDir === "leftBlock") {
    //                 if (oldS == 1) newOldS = 3;
    //                 if (oldS == 2) newOldS = 4;
    //             } else if (blockDir === "rightBlock") {
    //                 if (oldS == 1) newOldS = 2;
    //                 if (oldS == 3) newOldS = 4;
    //             }

    //             world.setBlockAndUpdate(blockPos, blockState.setValue(STATE, Integer.valueOf(String(newOldS))));
    //         }

    //         updateOldBlock(leftBlock, "leftBlock");
    //         updateOldBlock(rightBlock, "rightBlock");
    //     })
    //     .blockEntity(info => {
    //         info.enableSync();
    //     })

    // event.create('brewing_barrel').defaultCutout()
    //     .displayName('酿酒桶')
    //     .soundType('wood')
    //     .mapColor('wood')
    //     .hardness(2.0)
    //     .property(BlockProperties.HORIZONTAL_FACING)
    //     .placementState(context => {
    //         const player = context.player;
    //         context.setValue(BlockProperties.HORIZONTAL_FACING, player.horizontalFacing.opposite);
    //     })
    //     .blockEntity(info => {
    //         info.enableSync();
    //     })

    event.create('july_21_block').defaultCutout()
        .displayName('七月二十一')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 10, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(IntegerProperty.create('stacks', 1, 2))

    event.create('tsundere_heroine_block').defaultCutout()
        .displayName('傲娇女主')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 10, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(IntegerProperty.create('stacks', 1, 2))

    event.create('sweet_berry_martini_block').defaultCutout()
        .displayName('甜浆果马天尼')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 10, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(IntegerProperty.create('stacks', 1, 2))

    event.create('birch_sap_vodka_block').defaultCutout()
        .displayName('桦树汁伏特加')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 10, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(IntegerProperty.create('stacks', 1, 2))

    event.create('martini_glass').defaultCutout()
        .displayName('马天尼杯')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 10, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING);

    event.create('red_lizard_block').defaultCutout()
        .displayName('红色蜥蜴')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 11, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(IntegerProperty.create('stacks', 1, 3))

    event.create('second_guess_block').defaultCutout()
        .displayName('马后炮')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 11, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(IntegerProperty.create('stacks', 1, 3))

    event.create('light_yellow_firefly_block').defaultCutout()
        .displayName('淡黄色萤火虫')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 11, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(IntegerProperty.create('stacks', 1, 3))

    event.create('shooting_star_block').defaultCutout()
        .displayName('流星')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 11, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(IntegerProperty.create('stacks', 1, 3))

    event.create('hurricane_glass').defaultCutout()
        .displayName('飓风杯')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 11, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING);

    event.create('twilight_forest_block').defaultCutout()
        .displayName('暮色森林')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 7, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(IntegerProperty.create('stacks', 1, 4))

    event.create('jacks_story_block').defaultCutout()
        .displayName('杰克的故事')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 7, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(IntegerProperty.create('stacks', 1, 4))

    event.create('shanghai_beach_block').defaultCutout()
        .displayName('上海滩')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 7, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(IntegerProperty.create('stacks', 1, 4))

    event.create('bane_of_arthropods_block').defaultCutout()
        .displayName('节肢杀手')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 7, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(IntegerProperty.create('stacks', 1, 4))

    event.create('old_fashioned_glass').defaultCutout()
        .displayName('古典杯')
        .soundType('glass')
        .mapColor('glass')
        .hardness(0.1)
        .notSolid().noItem().noDrops()
        .box(1, 0, 1, 15, 7, 15, true)
        .property(BlockProperties.HORIZONTAL_FACING);
});

// global.inited = false
// ClientEvents.init(event => {
//     /* ---------- 工具函数 ---------- */
//     // 从 NBT 里还原 ItemStack（带 BlockStateTag 也能识别）
//     function readStack(nbt) {
//         if (!nbt) return null;
//         return Item.of(
//             nbt.getString('id'),
//             nbt.getByte('Count'),
//             nbt.get('tag')
//         );
//     }

//     // 渲染单个物品（统一矩阵、光照、overlay）
//     function renderItem(renderer, context, stack, x, y, z, rotY, scale) {
//         const poseStack = context.poseStack;
//         const buffer = context.bufferSource;
//         const light = LevelRenderer.getLightColor(context.blockEntityJS.level, context.blockEntityJS.blockPos);
//         const overlay = context.packedOverlay;

//         poseStack.pushPose();
//         poseStack.translate(x, y, z);
//         poseStack.scale(scale, scale, scale);
//         poseStack.mulPose(Axis.YP.rotationDegrees(rotY));

//         renderer.itemRenderer.renderStatic(stack, ItemDisplayContext.NONE, light, overlay, poseStack, buffer, null, 0);

//         poseStack.popPose();
//     }

//     event.registerBlockEntityRenderer("fstwines:wine_cabinet", (context) => RenderJSBlockEntityRenderer
//         .create(context)
//         .setCustomRender((renderer, ctx) => {
//             const be = ctx.blockEntityJS;
//             const facing = be.blockState.getValue(BlockProperties.HORIZONTAL_FACING)
//             try {
//             let slot1 = readStack(be.data.get('slot1')); 
//             let slot2 = readStack(be.data.get('slot2'));
            
//             switch (facing) {
//                 case Direction.SOUTH:
//                     if (slot1) renderItem(renderer, ctx, slot1, 0.25, 0.46, 0.5, 0, 0.8);
//                     if (slot2) renderItem(renderer, ctx, slot2, 0.75, 0.46, 0.5, 0, 0.8);
//                     break;
//                 case Direction.WEST:
//                     if (slot1) renderItem(renderer, ctx, slot1, 0.5, 0.46, 0.25, 270, 0.8);
//                     if (slot2) renderItem(renderer, ctx, slot2, 0.5, 0.46, 0.75, 270, 0.8);
//                     break;
//                 case Direction.NORTH:
//                     if (slot2) renderItem(renderer, ctx, slot2, 0.25, 0.46, 0.5, 180, 0.8);
//                     if (slot1) renderItem(renderer, ctx, slot1, 0.75, 0.46, 0.5, 180, 0.8);
//                     break;
//                 case Direction.EAST:
//                     if (slot2) renderItem(renderer, ctx, slot2, 0.5, 0.46, 0.25, 90, 0.8);
//                     if (slot1) renderItem(renderer, ctx, slot1, 0.5, 0.46, 0.75, 90, 0.8);
//                     break;
//             }
//             } catch (error) {}

//         })
//     )

// event.registerBlockEntityRenderer("kubejs:brewing_barrel", context => RenderJSBlockEntityRenderer
//     .create(context)
//     .setCustomRender((renderer, context) => {

//     })
// )
// })