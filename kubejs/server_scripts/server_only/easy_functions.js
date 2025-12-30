ServerEvents.commandRegistry((event) => {
    let { commands: Commands } = event;

    event.register(
        Commands.literal("ef")
            .then(Commands.literal("armourer")
                .requires(source => source.getServer().isSingleplayer() || source.hasPermission(2))
                .executes((context) => {
                    let player = context.getSource().getPlayer();
                    if (!player) {
                        return 0; // 如果不是玩家执行，则返回
                    }

                    // 获取当前日期并格式化
                    let now = new Date();
                    let year = now.getFullYear().toString().slice(-2); // 取年份后两位
                    let month = (now.getMonth() + 1).toString().padStart(2, '0'); // 月份补零
                    let day = now.getDate().toString().padStart(2, '0'); // 日期补零
                    let dateString = `${year}.${month}.${day}`;

                    timestampToString(Date.now,'yy.MM.dd')

                    // 运行
                    player.runCommand('ie lore add &8[莉亚工坊导入◥ · &a原创作品]');
                    player.runCommand(`ie lore add &8[导入于${dateString}]`);

                    return 1;
                })
            )
    );
});