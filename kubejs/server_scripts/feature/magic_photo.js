ItemEvents.rightClicked(event => {
    let name = event.player.name.getString()
    if (event.item.id == 'exposure:photograph' && event.player.isCrouching() && event.item.nbt["XXXXXAllowteleport"] == "true") {
        event.player.tell('传送准备中，请稍候...');
        
        event.server.scheduleInTicks(0, () => {
            let particleCommand = `execute as @a[name=${name}] at @s run particle minecraft:portal ~ ~0.5 ~ 0.3 0.3 0.3 0.05 75`;
            for (let i = 0; i < 45; i++) {
                event.server.runCommandSilent(particleCommand);
            }
        });
    
        event.server.scheduleInTicks(50, () => {
            event.server.runCommandSilent(`minecraft:tp @a[name=${name}] ${event.item.nbt["Pos"][0]} ${event.item.nbt["Pos"][1]} ${event.item.nbt["Pos"][2]}`);
            event.player.tell('传送完成！');
            event.server.runCommandSilent(`execute as @a[name=${name}] at @s run particle minecraft:end_rod ~ ~ ~ 0.5 0.5 0.5 0.1 100`);
        });
    }
});
// ItemEvents.rightClicked(event => {
//     if (event.item.id == 'exposure:photograph' && event.player.isCrouching() == true) {
//         if (event.player.offHandItem == 'minecraft:emerald') {
//             event.item.nbt.putString("Allowteleport", "true")
//             event.player.tell('已激活传送功能')
//         }
//     }
// })