// const BlockEntityJS = Java.loadClass("dev.latvian.mods.kubejs.block.entity.BlockEntityJS");
// const IntegerProperty = Java.loadClass("net.minecraft.world.level.block.state.properties.IntegerProperty");
// const Integer = Java.loadClass('java.lang.Integer');

// //能够允许放入酒柜的物品
// const ALLOWED_ITEMS = [
//     "chinjufumod:block_bot_meadjuku_1",
//     "chinjufumod:block_bot_mead_1",
//     "chinjufumod:block_bot_winejuku_1",
//     "chinjufumod:block_bot_wine_1",
//     "chinjufumod:block_bot_ciderjuku_1",
//     "chinjufumod:block_bot_cider_1",
//     "chinjufumod:block_bot_sakejuku_1",
//     "chinjufumod:block_bot_sake_1",
//     "chinjufumod:block_bot_sakenama_1",
//     "chinjufumod:item_food_sakebot"
// ];

// BlockEvents.rightClicked("fstwines:wine_cabinet", event => {
//     if (event.hand !== "MAIN_HAND") return;
//     const { player, block } = event;
//     const be = block.entity
//     if (!(be instanceof BlockEntityJS)) return;
//     const handItem = player.mainHandItem;

//     function takeSlot(slot) {
//         if (!be.data.contains(slot)) return null;
//         const nbt = be.data.getCompound(slot);
//         const stack = Item.of(nbt.getString('id'), nbt.getByte('Count'), nbt.get('tag'));
//         be.data.remove(slot);
//         be.sync();
//         return stack;
//     }

//     // 向 BE 放物品（只放 1 个）
//     function putSlot(slot, stack) {
//         if (be.data.contains(slot)) return false;          // 满
//         const copy = stack.copyWithCount(1);
//         be.data.put(slot, copy.serializeNBT());
//         be.sync();
//         if (!player.isCreative()) stack.shrink(1);
//         player.swing();
//         return true;
//     }

//     // ---- 手持酒右键：存入酒  空手右键：取出物品 ----
//     /* ---------- 交互逻辑 ---------- */
//     if (handItem.isEmpty()) {                   // 取出
//         let out = takeSlot('slot2') || takeSlot('slot1');// 优先第二格
//         if (out) {
//             player.give(out);
//             player.swing();
//         }
//     } else if (!handItem.isEmpty()) {          // 放入
//         if (!ALLOWED_ITEMS.includes(handItem.id)) return;
//         putSlot('slot1', handItem) || putSlot('slot2', handItem);
//     } else return;

//     event.cancel();
// })

// BlockEvents.broken('fstwines:wine_cabinet', event => {
//     const { level, block } = event;
//     if (level.client) return;          // 只在服务端掉落
//     const be = block.entity;
//     if (!(be instanceof BlockEntityJS)) return;

//     /* 工具：把单个 slot 掉出来 */
//     function dropSlot(slot) {
//         if (!be.data.contains(slot)) return;
//         const nbt = be.data.getCompound(slot);
//         const stack = Item.of(
//             nbt.getString('id'),
//             nbt.getByte('Count'),
//             nbt.get('tag')
//         );
//         if (stack.empty) return;
//         block.popItem(stack);
//     }

//     dropSlot('slot1');
//     dropSlot('slot2');

//     const HORIZONTAL = BlockProperties.HORIZONTAL_FACING;
//     const STATE = IntegerProperty.create('state', 1, 4);
//     const blockState = block.blockState;
//     const pos = block.pos;

//     const blockFacing = blockState.getValue(HORIZONTAL);
//     const cw = blockFacing.getClockWise();
//     const ccw = blockFacing.getCounterClockWise();

//     function updateNearBlock(offsetDir, dirType) {
//         const adjPos = pos.relative(offsetDir);
//         const bs = level.getBlockState(adjPos);
//         if (bs.block.id !== "fstwines:wine_cabinet") return;

//         const facing = bs.getValue(HORIZONTAL);
//         if(facing !== blockFacing) return;

//         const state = bs.getValue(STATE);
//         let newState = state;
//         if(dirType == "cw"){
//             if(state == 2) newState = 1;
//             if(state == 4) newState = 3;
//         }else if(dirType == "ccw"){
//             if(state == 3) newState = 1;
//             if(state == 4) newState = 2
//         }

//         level.setBlockAndUpdate(adjPos, bs.setValue(STATE, Integer.valueOf(String(newState))));
//     }

//     updateNearBlock(cw, "cw");
//     updateNearBlock(ccw, "ccw");
// });

