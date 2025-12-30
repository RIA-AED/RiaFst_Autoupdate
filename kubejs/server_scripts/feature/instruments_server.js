const $Player = Java.loadClass("net.minecraft.world.entity.player.Player")

PlayerEvents.loggedIn(event => {
    event.player.persistentData.remove("isPlaying")
})

/*
persistentData表
·bool
isPlaying 是否在演奏
isInChoir 是否在合奏中
isLeadingChoir 是否引导合奏
·int
instModType 乐器模式编号
sheetIndex 选中乐谱编号
noteIndex 正演奏的音符编号
·float
nodeInterval 音符间隔时长
·string
choirLead 合奏的引导者

操作列表
下蹲+左右：切换模式
选择模式：
    左右键：切换曲目
独奏模式：
    右键：开始
加入模式：
    右键：寻找附近的 / 退出合奏
    左键：加入合奏
引导模式：
    右键：引导合奏 / 结束引导
*/

ItemEvents.rightClicked(event => {
    if (event.hand != 'MAIN_HAND' || !event.player.mainHandItem.hasTag('kubejs:instruments')) {
        return
    }
    if (event.player.isCrouching()) {
        switchInstMod(true, event)
    } else {
        if (event.player.persistentData.instModType == undefined) { event.player.persistentData.instModType = 0; }
        switch (event.player.persistentData.instModType) {
            case 0:
                readFiles(false, event)
                break
            case 1:
                startSolo(event)
                break
            case 2:
                findChoir(event)
                break
            case 3:
                leadChoir(event, event.player.mainHandItem)
                break
            case 4:
                quitPerform(event)
        }
    }
})

ItemEvents.firstLeftClicked(event => {
    if (event.hand != 'MAIN_HAND' || !event.player.mainHandItem.hasTag("kubejs:instruments")) {
        return
    }
    if (event.player.isCrouching()) {
        switchInstMod(false, event)
    } else {
        switch (event.player.persistentData.instModType) {
            case 0:
                readFiles(false, event)
                break
            case 1:
                break
            case 2:
                joinChoir(event)
                break
            case 3:
                startMultiple(event)
                break
            case 4:
                break
        }
    }
})

function fixJson(event, jsonString) {
    let result = '';
    let inQuotes = false;
    let keyBuffer = '';
    let valueBuffer = '';
    let isKey = true;
    let lastChar = '';

    for (let i = 0; i < jsonString.length; i++) {
        let char = jsonString[i];

        if (char === '"') {
            inQuotes = !inQuotes;
            result += char;
        } else if (!inQuotes) {
            if (char === ':' && isKey) {
                // 如果是键名部分，且遇到冒号
                if (keyBuffer.trim() === '') {
                    // 如果键名缓冲区为空，说明键名已经有引号，直接追加
                    result += lastChar + ':';
                } else {
                    // 如果键名缓冲区不为空，说明键名丢失了引号，用双引号包裹
                    result += '"' + keyBuffer.trim() + '":';
                }
                keyBuffer = '';
                isKey = false;
            } else if (char === ',' || char === '}') {
                // 如果是值部分，且遇到逗号或右大括号
                result += valueBuffer + char;
                valueBuffer = '';
                isKey = true;
            } else {
                // 如果是键名部分，将字符追加到键名缓冲区
                if (isKey) {
                    keyBuffer += char;
                } else {
                    // 如果是值部分，将字符追加到值缓冲区
                    valueBuffer += char;
                }
            }
        } else {
            // 如果在引号内，直接将字符追加到结果中
            result += char;
        }
        lastChar = char;
    }
    event.player.tell(result)
    try {
        // 尝试将修复后的字符串转换为JSON对象
        let jsonObject = JSON.parse(result);
        event.player.tell("转换成功！")
        event.player.tell(jsonObject)
        return jsonObject;
    } catch (error) {
        event.player.tell(error)
    }
}

ItemEvents.rightClicked("kubejs:empty_music_sheet", event => {
    if (event.hand != 'MAIN_HAND') { return }
    let nbtString = event.player.offHandItem.nbt.pages
    FilesJS.createDirectory(`config/musicSheets/${event.player.name.getString()}`)
    if (event.player.offHandItem == "minecraft:written_book") {
        try {
            FilesJS.writeFile("config/musicSheets/temp.txt", nbtString)
        } catch (error) {
            event.player.tell("尝试写入文件时遇到以下问题：")
            event.player.tell(error)
        }
        try {
            nbtString = FilesJS.readFile("config/musicSheets/temp.txt")
        } catch (error) {
            event.player.tell("尝试读取文件时遇到以下问题：")
            event.player.tell(error)
        }
        nbtString = nbtString.replace(`\'`, "")
        nbtString = nbtString.replace(`\\\\n`, " ")
        nbtString = nbtString.replace(/'/g, '')
        let nbtJson = ""
        try {
            nbtJson = JSON.parse(nbtString)
        } catch (error) {
            event.player.tell(error)
        }


        let content = nbtJson[0].extra[0].text
        nbtJson.forEach(element => {
            element.extra.forEach(t => {
                if (element != nbtJson[0] && t != nbtJson[0].extra[0]) {
                    content += ` ${t.text}`
                }
            })
        })
        content = content.replace(/\s+/g, " ");
        let songName = event.player.offhandItem.nbt.title
        let author = event.player.offhandItem.nbt.author
        event.player.give(Item.of(`kubejs:music_sheet`)
            .withName({ "text": `${songName}的乐谱`, "color": "white", "italic": false })
            .withLore({ "text": `记录者：${author}`, "color": "white", "italic": false })
            .withNBT({ "allNodes": content }))
        event.player.mainHandItem.count--
    }
})

ItemEvents.rightClicked("kubejs:music_sheet", event => {
    if (event.hand != 'MAIN_HAND') { return }
    let musicName = event.player.mainHandItem.displayName.getString().slice(1, -4)
    let content = event.player.mainHandItem.nbt.allNodes.split(" ")
    try {
        FilesJS.writeLines(`config/musicSheets/${event.player.name.getString()}/${musicName}.txt`, content)
    } catch (e) {
        event.player.tell(e.message)
    }
    event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"你学会了新的歌曲：${musicName}","color":"green"}]`)
})




function readFiles(isRight, event) { //选择模式主函数
    FilesJS.createDirectory(`config/musicSheets/${event.player.name.getString()}`);
    let files = FilesJS.listFiles(`config/musicSheets/${event.player.name.getString()}`);
    if (files.length == 0) {
        event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"未发现乐谱！(0文件位于config/musicSheets/${event.player.name.getString()})","color":"red"}]`)
        return
    }
    switchSheet(isRight, event, files) //左右切换乐谱
    readNote(event, files) //读取选择的乐谱 保存到乐器
}

function startSolo(event) { //独奏模式主函数
    if (event.player.persistentData.isPlaying) {
        event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"你还在演奏中","color":"red"}]`)
        return
    }
    if (event.player.persistentData.isLeadingChoir) { //如果在引导：停止引导
        leadChoir(event)
    }
    if (event.player.persistentData.isInChoir) { //如果在合奏中：退出
        quitChoir(event)
    }
    event.player.persistentData.isPlaying = true
    event.player.persistentData.noteIndex = 3
    playNote(event, event.player.mainHandItem, event.player) //开始递归
}

function findChoir(event) { //加入模式主函数（寻找附近的合奏）
    if (event.player.persistentData.isPlaying) { //如果在独奏：取消
        event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"你还在演奏中","color":"red"}]`)
        return
    }
    if (event.player.persistentData.isLeadingChoir) { //如果已经在引导
        leadChoir(event) //停止引导
    }
    let playerNear = event.level.getEntitiesOfClass($Player, event.player.boundingBox.inflate(40))
    let find = false
    playerNear.forEach(playerElement => {
        if (!find && playerElement.persistentData.isLeadingChoir && playerElement.mainHandItem.hasTag("kubejs:instruments")) {
            find = true
            event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"在附近发现${playerElement.name.getString()}的合奏！[左键]加入","color":"yellow"}]`)
        }
    })
    if (!find) {
        event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"未在附近发现合奏！[右键]再次查找","color":"red"}]`)
    }
}

function joinChoir(event) { //加入模式主函数（加入附近的合奏）
    if (event.player.persistentData.isPlaying) { //如果在独奏：取消
        event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"你还在演奏中","color":"red"}]`)
        return
    }
    if (event.player.persistentData.isLeadingChoir) { //如果已经在引导
        leadChoir(event) //停止引导
    }
    let playerNear = event.level.getEntitiesOfClass($Player, event.player.boundingBox.inflate(40))
    let find = false
    playerNear.forEach(playerElement => {
        if (!find && playerElement.persistentData.isLeadingChoir && playerElement.mainHandItem.hasTag("kubejs:instruments")) {
            let nameList = playerElement.mainHandItem.nbt.allPlayers
            nameList += ` ${event.player.name.getString()}`
            event.player.persistentData.choirLead = playerElement.name.getString()
            playerElement.mainHandItem.nbt.allPlayers = nameList
            find = true
            event.player.persistentData.isInChoir = true
            event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"你已加入${playerElement.name.getString()}的合奏！[右键]退出","color":"yellow"}]`)
            event.server.runCommandSilent(`title @a[name=${playerElement.name.getString()}] actionbar [{"text":"${event.player.name.getString()}加入了你的合奏！[左键]开始演奏 | [右键]取消引导","color":"green"}]`)
        }
    })
    if (!find) {
        event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"未在附近发现合奏！[右键]再次查找","color":"red"}]`)
    }
}

function leadChoir(event, aimItem) { //引导模式主函数（开始引导）
    if (event.player.persistentData.isLeadingChoir == undefined) { event.player.persistentData.isLeadingChoir = true }
    if (event.player.persistentData.isPlaying) {
        event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"你还在演奏中","color":"red"}]`)
        return
    }
    let files = FilesJS.listFiles(`config/musicSheets/${event.player.name.getString()}`)
    let songName = aimItem.nbt.songName
    if(songName == null){songName = files[event.player.persistentData.sheetIndex].match(/[^\\/]+$/)[0].replace(/\..*/, "")}
    if (event.player.persistentData.isLeadingChoir) { //停止引导，复原物品
        event.player.persistentData.isLeadingChoir = false
        event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"你已取消引导合奏","color":"yellow"}]`)
        let inventory = event.player.inventory
        for (let i = 0; i < inventory.getContainerSize(); i++) {
            let slotItem = inventory.getItem(i)
            if (slotItem &&
                slotItem.id === aimItem.id &&
                slotItem.nbt &&
                slotItem.nbt.allNodes === aimItem.nbt.allNodes) {
                    let itemName = slotItem.getDisplayName().getString().slice(1, -1)
                    inventory.setItem(i, Item.of(`${slotItem.id}`)
                        .withName({ "text": `${itemName}`, "color": "white", "italic": false })
                        .withLore({ "text": `准备演奏的曲目：${songName}`, "color": "green", "italic": false })
                        .withNBT({ "allNodes": slotItem.nbt.allNodes })
                        .withNBT({ "songName": songName })
                    )
                    break
                }
        }
        return
    }
    if (event.player.persistentData.isLeadingChoir == false) { //开始引导，生成名单
        event.player.persistentData.isLeadingChoir = true
        event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"你已开始引导合奏！[左键]开始演奏 | [右键]取消引导","color":"yellow"}]`)
        let itemName = event.player.mainHandItem.displayName.getString().slice(1, -1)
        let content = event.player.mainHandItem.nbt.allNodes
        let length = event.player.mainHandItem.nbt.length
        event.player.mainHandItem = Item.of(`${event.player.mainHandItem.id}`)
            .withName({ "text": `${itemName}`, "color": "white", "italic": false })
            .withLore({ "text": `准备演奏的曲目：${songName}`, "color": "green", "italic": false })
            .withLore({ "text": `正在引导合奏`, "color": "yellow", "italic": false })
            .withNBT({ "allNodes": content })
            .withNBT({ "songName": songName })
            .withNBT({ "length": length })
            .withNBT({ "allPlayers": `${event.player.name.getString()}` })
        return
    }
}

function startMultiple(event) {
    if (event.player.persistentData.isLeadingChoir == false) {
        event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"请先引导合奏","color":"red"}]`)
        return
    }
    if (event.player.persistentData.isPlaying) {
        event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"你还在演奏中","color":"red"}]`)
        return
    }
    let selfPos = event.player.pos
    let choirPlayersName = event.player.mainHandItem.nbt.allPlayers.split(" ").map(String)
    let allLevelPlayer = event.level.getPlayers()
    let choirPlayers = [event.player]
    allLevelPlayer.forEach(e => {
        choirPlayersName.forEach(e2 => {
            if (e.name.getString() == e2 && e != event.player) {
                choirPlayers.push(e)
            }
        })
    })
    choirPlayers.forEach(element => {
        if (!element.mainHandItem.hasTag("kubejs:instruments")) {
            quitChoir(element)
        } else {
            element.persistentData.isPlaying = true
            element.persistentData.noteIndex = 3
            playNote(event, element.mainHandItem, element)
        }
    })
}

function quitChoir(player) { //退出合奏
    player.persistentData.isInChoir = false
    let leadName = player.persistentData.choirLead
    let allPlayers = player.level.getPlayers()
    allPlayers.forEach(element => {
        if (element.name.getString() == leadName && element.persistentData.isLeadingChoir) {
            if (!element.mainHandItem.hasTag("kubejs:instruments")) { //如果引导玩家不手持乐器：停止引导
                element.persistentData.isLeadingChoir = false
            } else { //更新领导玩家乐器名单
                let nameList = element.mainHandItem.nbt.allPlayers.split(" ").map(String)
                for (let i = nameList.length - 1; i >= 0; i--) {
                    if (nameList[i] === player.name.getString()) {
                        nameList.splice(i, 1);
                        break
                    }
                }
                let newStr
                nameList.forEach(e => {
                    newStr += ` ${nameList[i]}`
                })
                element.mainHandItem.nbt.allPlayers = newStr
            }
        }
    })
    event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"你已退出合奏","color":"yellow"}]`)
}

function quitPerform(event){
    event.player.persistentData.isPlaying = false
    if(event.player.persistentData.isInChoir){quitChoir(event.player)}
    if(event.player.persistentData.isLeadingChoir){leadChoir(event, event.player.mainHandItem)}
    event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"你已结束演奏","color":"yellow"}]`)
    return
}

function readNote(event, files) { //读取乐谱并写入乐器
    if (event.player.persistentData.isPlaying) {
        event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"你还在演奏中","color":"red"}]`)
        return
    }
    if (event.player.persistentData.isLeadingChoir) { //如果在引导：停止引导
        leadChoir(event)
    }
    if (event.player.persistentData.isInChoir) { //如果在合奏中：退出
        quitChoir(event)
    }
    event.player.persistentData.noteIndex = 3
    let lines = FilesJS.readLines(`config/musicSheets/${event.player.name.getString()}/${files[event.player.persistentData.sheetIndex].match(/[^\\/]+$/)[0]}`)
    let content = lines[0]
    lines.forEach(element => {
        if (element != lines[0]) {
            content += ` ${element}`
        }
    })
    if (event.player.mainHandItem.id == "kubejs:drum_808" && parseInt(lines[2]) != 1) {
        event.player.tell([{ "text": "乐谱与乐器不匹配！", "color": "red" }])
        return
    }
    if (event.player.mainHandItem.id != "kubejs:drum_808" && parseInt(lines[2]) == 1) {
        event.player.tell([{ "text": "乐谱与乐器不匹配！", "color": "red" }])
        return
    }
    //event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] subtitle [{"text":"${files[event.player.persistentData.sheetIndex].match(/[^\\/]+$/)[0].replace(/\..*/, "")}","color":"yellow"},{"text":"  bpm:${nodes[0]}","color":"white"}]`)
    let itemName = event.player.mainHandItem.displayName.getString().slice(1, -1)
    let songName = files[event.player.persistentData.sheetIndex].match(/[^\\/]+$/)[0].replace(/\..*/, "")
    event.player.persistentData.nodeInterval = 60 / parseInt(lines[0]) / parseInt(lines[1]) * 4
    event.player.mainHandItem = Item.of(`${event.player.mainHandItem.id}`)
        .withName({ "text": `${itemName}`, "color": "white", "italic": false })
        .withLore({ "text": `准备演奏的曲目：${songName}`, "color": "green", "italic": false })
        .withNBT({ "allNodes": content })
        .withNBT({ "songName": songName })
        .withNBT({ "length": lines.length })
}

function playNote(event, item, player) { //演奏音符（递归）
    if (player.mainHandItem != item || !event.player.mainHandItem.hasTag('kubejs:instruments')) {
        event.server.runCommandSilent(`title @a[name=${player.name.getString()}] actionbar [{"text":"你已结束演奏","color":"yellow"}]`)
        player.persistentData.isPlaying = false
        if (player.persistentData.isInChoir) {
            quitChoir(player)
        }
        if (player.persistentData.isLeadingChoir) {
            leadChoir(event, item)
        }
        return
    }
    if(!player.persistentData.isPlaying && !player.persistentData.isInChoir && !player.persistentData.isLeadingChoir) return
    event.server.schedule(player.persistentData.nodeInterval * SECOND, function (callback) {
        if (player.persistentData.noteIndex >= item.nbt.length) {
            player.persistentData.noteIndex = 3
        }
        let multiNodes = item.nbt.allNodes.split(" ").map(String)[player.persistentData.noteIndex]
        let name = player.name.getString()
        let nodes = multiNodes.split(",").map(Number)
        if (multiNodes != -1) {
            let isDrum = parseInt(item.nbt.allNodes.split(" ").map(String)[2]) === 1
            if (isDrum) {
                nodes.forEach(element => {
                    let volum = drumVolum[element]
                    event.server.runCommandSilent(`execute as @a[name=${name}] at @s run playsound ${drumTypes[element]} player @a[distance=..20] ~ ~ ~ ${volum} 1.0`)
                })
            } else {
                let volum = allVolum[item.id]
                nodes.forEach(element => {
                    event.server.runCommandSilent(`execute as @a[name=${name}] at @s run playsound ${instTypes[item.id]} player @a[distance=..20] ~ ~ ~ ${volum} ${allPitch[element]}`)
                })
            }
            event.server.runCommandSilent(`execute as @a[name=${name}] at @s run particle note ~ ~1.5 ~ 0.25 0.25 0.25 0.05 1 normal`)
        }
        player.persistentData.noteIndex++
        playNote(event, item, player)
    })
}

function switchSheet(isRight, event, files) { //切换选中的乐谱（只更新索引）
    if (event.player.persistentData.sheetIndex == undefined) { event.player.persistentData.sheetIndex = 0; }
    if (isRight) { event.player.persistentData.sheetIndex++ }
    else { event.player.persistentData.sheetIndex-- }
    if (event.player.persistentData.sheetIndex < 0) { event.player.persistentData.sheetIndex = files.length - 1; }
    if (event.player.persistentData.sheetIndex > files.length - 1) { event.player.persistentData.sheetIndex = 0; } event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"[鼠标切换] 当前曲目：","color":"yellow"},{"text":"${event.player.persistentData.sheetIndex + 1}.${files[event.player.persistentData.sheetIndex].match(/[^\\/]+$/)[0]}","color":"white"}]`)

}

function switchInstMod(isRight, event) { //更换乐器模式
    if (event.player.persistentData.instModType == undefined) { event.player.persistentData.instModType = 1; }
    if (isRight) { event.player.persistentData.instModType++ }
    else { event.player.persistentData.instModType-- }
    if (event.player.persistentData.instModType < 0) { event.player.persistentData.instModType = 4; }
    if (event.player.persistentData.instModType > 4) { event.player.persistentData.instModType = 0; }
    event.server.runCommandSilent(`title @a[name=${event.player.name.getString()}] actionbar [{"text":"[鼠标切换] 当前模式：","color":"yellow"},{"text":"${instModTypes[event.player.persistentData.instModType]}","color":"white"}]`)
}

let instModTypes = ["1.乐谱选择模式", "2.独奏", "3.加入合奏", "4.引导合奏", "5.结束演奏"]

let instTypes = {
    "kubejs:guitar": "kubejs:guitar_sound",
    "kubejs:piano": "ywzj_midi:cfx_fs4",//""
    "kubejs:banjo": "minecraft:block.note_block.banjo"
}

let allVolum = {
    "kubejs:guitar": 0.3,
    "kubejs:piano": 0.8,
    "kubejs:banjo": 1
}

let drumVolum = [1.2, 1.2, 1.2, 0.8, 0.8, 0.8, 1, 1]

let drumTypes = [
    "minecraft:block.note_block.snare", //小军鼓
    "minecraft:block.note_block.hat", //踩镲
    "minecraft:block.note_block.basedrum", //底鼓
    "ywzj_midi:cymbal_c1", //镲
    "ywzj_midi:bass_drum_c2", //大鼓
    "ywzj_midi:timpani_c2", //定音鼓
    "chinjufumod:wadaiko_side", //太鼓 侧面
    "chinjufumod:wadaiko_top" //太鼓 顶面
]

let allPitch = [0.5, 0.529732, 0.561231, 0.594604, 0.629961, 0.667420, 0.707107, 0.749154, 0.793701, 0.840896, 0.890899, 0.943874, 1, 1.059463, 1.122462, 1.189207, 1.259921, 1.334840, 1.414214, 1.498307, 1.587401, 1.681793, 1.781797, 1.887749, 2]

ServerEvents.recipes(event => {
    event.shaped("kubejs:guitar", [  //吉他
        '  D',
        'BI ',
        'SB '
    ], {
        S: "minecraft:stripped_oak_wood",
        I: "createaddition:iron_wire",
        B: "create:brass_nugget",
        D: "minecraft:dark_oak_planks"
    })
    event.shaped("kubejs:piano", [  //电子琴
        '  E',
        'BIB',
        'BDB'
    ], {
        D: "minecraft:dark_oak_planks",
        E: "create:electron_tube",
        I: "minecraft:iron_ingot",
        B: "create:brass_ingot",
    })
    event.shaped("kubejs:drum_808", [  //电子鼓机
        'CLE','AAA','III'
    ], {
        C: "create:cogwheel",
        E: "create:electron_tube",
        I: "minecraft:iron_ingot",
        A: "create:andesite_alloy",
        L: "minecraft:lever"
    })
    event.shaped("kubejs:empty_music_sheet", [  //空白乐谱
        'PI',
        'F '
    ], {
        P: "minecraft:paper",
        F: "minecraft:feather",
        I: "minecraft:ink_sac"
    })
})