// // BlockEvents.rightClicked(event => {
// //     if (event.hand != "MAIN_HAND")
// //         return
// //     event.player.tell(event.block.entityData)
// //     FilesJS.createDirectory("kubejs/data/temp")
// //     FilesJS.writeFile("kubejs/data/temp/entity_data.txt", event.block.entityData)
// // })

// //封门
// BlockEvents.rightClicked("quark:chiseled_andesite_bricks", event => {
//     //检查：主手且主手手持石英扳手
//     if (event.hand != "MAIN_HAND") return
//     if (event.player.mainHandItem.id != 'ae2:nether_quartz_wrench') return
//     let name = event.player.name.getString()
//     //阻止玩家移动
//     event.server.runCommandSilent(`effect give ${name} minecraft:slowness 2 255 true`)
//     //大喊
//     event.server.runCommandSilent(`execute as ${name} at @s run tellraw @a[distance=..10] "<${name}> 正在封阻！"`)
//     //播放音效
//     event.server.runCommandSilent(`execute as ${name} at @s run playsound minecraft:block.wood.place ambient @a[distance=..20] ~ ~ ~ 1 1 0`)
//     //播放音效
//     event.server.scheduleInTicks(20, function (callback0) {
//         event.server.runCommandSilent(`execute as ${name} at @s run playsound minecraft:block.wood.place ambient @a[distance=..20] ~ ~ ~ 1 1 0`)
//     })
//     //为物品添加冷却
//     event.player.addItemCooldown(event.player.mainHandItem.id, barricadeDoorTime * 20)
//     //延时之后：主要功能
//     event.server.scheduleInTicks(barricadeDoorTime * 20, function (callback0) {
//         //播放音效
//         event.server.runCommandSilent(`execute as ${name} at @s run playsound minecraft:block.wood.place ambient @a[distance=..20] ~ ~ ~ 1 1 0`)
//         //封阻竖直向上的所有空气方块/光源方块
//         let block = event.block.up
//         while (block == "minecraft:air" || block == "minecraft:light") {
//             block.set("quark:oak_vertical_slab", { type: `${getPlayerFacing(event, true, false)}` })
//             block = block.up
//         }
//         //如果可以的话，放置旗帜
//         let ox = getPlayerFacing(event, false, false)[0]
//         let oz = getPlayerFacing(event, false, false)[1]
//         if (event.block.offset(ox, 2, oz) == "minecraft:air") {
//             event.block.offset(ox, 2, oz).set("minecraft:green_wall_banner", { facing: `${getPlayerFacing(event, true, true)}` })
//             //event.player.tell(event.block.offset(ox, 2, oz).e)
//             event.block.offset(ox, 2, oz).mergeEntityData(`{Patterns:[{Color:4,Pattern:"cr"},{Color:13,Pattern:"bo"}]}`)
//         }
//     })
// })

// BlockEvents.rightClicked("minecraft:oak_slab", event => {
//     //检查：主手且主手手持石英扳手
//     if (event.hand != "MAIN_HAND") return
//     if (event.player.mainHandItem.id != 'ae2:nether_quartz_wrench') return
//     let name = event.player.name.getString()
//     //阻止玩家移动
//     event.server.runCommandSilent(`effect give ${name} minecraft:slowness ${reinforceHatchTime} 255 true`)
//     //大喊
//     event.server.runCommandSilent(`execute as ${name} at @s run tellraw @a[distance=..10] "<${name}> 正在加固！"`)
//     //播放音效
//     event.server.runCommandSilent(`execute as ${name} at @s run playsound minecraft:block.anvil.use ambient @a ~ ~ ~ 1 0.02 0`)
//     //为物品添加冷却
//     event.player.addItemCooldown(event.player.mainHandItem.id, reinforceHatchTime * 20)

//     //延时之后：主要功能
//     event.server.scheduleInTicks(reinforceHatchTime * 20, function (callback0) {
//         reinforceHatchBlock(event.block)
//         if (event.block.offset(1, 0, 1) == "minecraft:oak_slab") reinforceHatchBlock(event.block.offset(1, 0, 1))
//         if (event.block.offset(1, 0, -1) == "minecraft:oak_slab") reinforceHatchBlock(event.block.offset(1, 0, -1))
//         if (event.block.offset(-1, 0, 1) == "minecraft:oak_slab") reinforceHatchBlock(event.block.offset(-1, 0, 1))
//         if (event.block.offset(-1, 0, -1) == "minecraft:oak_slab") reinforceHatchBlock(event.block.offset(-1, 0, -1))
//         if (event.block.offset(0, 0, 1) == "minecraft:oak_slab") reinforceHatchBlock(event.block.offset(0, 0, 1))
//         if (event.block.offset(1, 0, 0) == "minecraft:oak_slab") reinforceHatchBlock(event.block.offset(1, 0, 0))
//         if (event.block.offset(0, 0, -1) == "minecraft:oak_slab") reinforceHatchBlock(event.block.offset(0, 0, -1))
//         if (event.block.offset(-1, 0, 0) == "minecraft:oak_slab") reinforceHatchBlock(event.block.offset(-1, 0, 0))
//     })
// })

// function reinforceHatchBlock(block) {
//     block.up.set("copycats:copycat_board", { down: "true" })
//     block.up.mergeEntityData(hatchData)
// }


// let $itemClass = Java.loadClass("net.minecraft.world.entity.item.ItemEntity")
// /*
// LevelEvents.tick(event => {
//     let block = event.level.getBlock(0, 0, 0)
//     let items = event.level.getEntitiesOfClass($itemClass, AABB.ofBlock(block.pos).inflate(1000))
//     items.forEach(i => {
//         if (Math.abs(i.motionX) + Math.abs(i.motionY) + Math.abs(i.motionZ) <= 0.01) {
//             i.kill()
//         }
//     })
// })
//     */