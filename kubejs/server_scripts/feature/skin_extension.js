ServerEvents.commandRegistry((event) => {
    let { commands: Commands, arguments: Arguments } = event;
    event.register(
        Commands.literal("skin-functions")
            .then(Commands.literal("addsound").then(Commands.argument('sound', Arguments.STRING.create(event)).executes(context =>{
                let player = context.getSource().getPlayer();
                let input = context.getInput().trim();
                let parts = input.split(' ');
                if(parts.length < 3){
                    player.tell("§c用法: /skin-functions addsound <\"sound-name\">")
                    player.tell("你可以使用这个命令为主手的物品附加右键音效")
                    player.tell("  (这将会消耗三角币, 请在副手握住3▲)")
                    player.tell("  (请确保输入的声音资源路径正确并用引号包裹, 错误的声音资源路径依然会消耗三角币)")
                    return 0;
                }
                let handitem = player.mainHandItem;
                let offhanditem = player.offHandItem;
                let soundName = parts[2];
                if(!soundName || soundName.length == 0){
                    player.tell("无效的输入")
                    return 0;
                }
                soundName = soundName.replace("\"","").replace("\'","")

                if(isValidSoundResource(soundName)){
                    if(handitem != "minecraft:air"){
                        if(offhanditem == "kubejs:delta_coin" && offhanditem.count>=5){
                            offhanditem.count -= 3
                            handitem.nbt.putString("sound",soundName)
                            player.tell("§a修改成功, 添加了名为\""+soundName+"\"的音效")
                        }else{
                            player.tell("§c你的副手没有足够的三角币...")
                        }
                    }else{
                        player.tell("§c你需要将待添加声音的物品握在主手...")
                    }
                }else{
                    player.tell("§c危险的输入! 请不要有非分之想...")
                    console.log(`Player ${player.name.string} tried to add dangerous sound name(${soundName})`)
                }
                return 0;
            })))
    )
})

function isValidSoundResource(soundString) {

    // 白名单验证：只允许字母、数字、下划线、点、冒号、斜杠
    const soundRegex = /^[a-z0-9_.:\/]+$/;
    if (!soundRegex.test(soundString)) return false;

    // 验证长度限制
    if (soundString.length > 256) return false;

    // 检查是否有危险的字符序列
    const dangerousPatterns = [
        ']', '[', 'run ', 'execute', 'function', 'op ',
        'deop ', 'kill', 'summon', 'setblock', 'fill',
        'clone', 'forceload', 'scoreboard', 'tellraw',
        'give', 'clear', 'effect', 'tp', 'teleport'
    ];

    // 转换为小写检查
    const lowerSound = soundString.toLowerCase();
    for (const pattern of dangerousPatterns) {
        if (lowerSound.includes(pattern)) return false;
    }

    // 验证资源路径格式
    const parts = soundString.split(':');
    if (parts.length > 2) return false; // 最多一个冒号

    // 验证命名空间和路径
    const namespaceRegex = /^[a-z0-9_.-]+$/;
    const pathRegex = /^[a-z0-9_\/.-]+$/;

    if (parts.length === 2) {
        if (!namespaceRegex.test(parts[0])) return false;
        if (!pathRegex.test(parts[1])) return false;
    } else {
        if (!pathRegex.test(parts[0])) return false;
    }

    return true;
}

BlockEvents.rightClicked(event => {
    let player = event.player
    let hand = event.getHand()
    let handitem = event.player.getItemInHand(hand)

    if (hand == 'MAIN_HAND' && event.block == 'armourers_workshop:skinnable') {
        let skin = event.block.pos;
        let skinX = skin.x, skinY = skin.y, skinZ = skin.z;
        let be = event.getBlock().getEntity().getUpdateTag();
        if(be != null && be.contains("Refer")){
            let offsetArray = be.getIntArray("Refer");
            skinX -= offsetArray[0];
            skinY -= offsetArray[1];
            skinZ -= offsetArray[2];
        }
        event.server.runCommandSilent(`execute at @a[name=${player.name.getString()}] run armourers animation block ${skinX} ${skinY} ${skinZ} play rightclick`);
    }


    if(event.hand=='MAIN_HAND'&&!isItemInWhiteList(handitem)){
        return;
    }
    let cooldown = player.getCooldowns().isOnCooldown(handitem.getItem())
    if(cooldown) return;
    event.server.runCommandSilent(`execute at @a[name=${player.name.getString()}] run armourers animation entity ${player.name.getString()} play rightclick`);
    event.server.runCommandSilent(`execute at @a[name=${player.name.getString()}] run armourers animation entity ${player.name.getString()} play rightclick.parallel0`);
    event.server.runCommandSilent(`execute at @a[name=${player.name.getString()}] run armourers animation entity ${player.name.getString()} play rightclick.pre_parallel0`);
    if (handitem.nbt && handitem.nbt["sound"] != null) {
        event.server.runCommandSilent(`execute at @a[name=${player.name.getString()}] run playsound ${handitem.nbt["sound"]} player @a[distance=..64]`)
    }
})

let itemWhitelist = ['create:potato_cannon','ae2:matter_cannon']

function isItemInWhiteList(itemName){
    for(let enabledItems of itemWhitelist){
        if(itemName == enabledItems) return true;
    }
    return false;
}

ItemEvents.rightClicked(event => {
    let player = event.player
    let hand = event.getHand()
    let handitem = event.player.getItemInHand(hand)
    let cooldown = player.getCooldowns().isOnCooldown(handitem.getItem())
    if(cooldown) return;
    event.server.runCommandSilent(`execute at @a[name=${player.name.getString()}] run armourers animation entity ${player.name.getString()} play rightclick`)
    event.server.runCommandSilent(`execute at @a[name=${player.name.getString()}] run armourers animation entity ${player.name.getString()} play rightclick.parallel0`)
    event.server.runCommandSilent(`execute at @a[name=${player.name.getString()}] run armourers animation entity ${player.name.getString()} play rightclick.pre_parallel0`)
    if (handitem.nbt && handitem.nbt["sound"] != null) {
        event.server.runCommandSilent(`execute at @a[name=${player.name.getString()}] run playsound ${handitem.nbt["sound"]} player @a[distance=..64]`)
    }
})

ItemEvents.firstLeftClicked(event => {
    let player = event.player.name.getString()
    event.server.runCommandSilent(`execute at @a[name=${player}] run armourers animation entity ${player} play leftclick`)
    event.server.runCommandSilent(`execute at @a[name=${player}] run armourers animation entity ${player} play leftclick.parallel0`)
    event.server.runCommandSilent(`execute at @a[name=${player}] run armourers animation entity ${player} play leftclick.pre_parallel0`)
})