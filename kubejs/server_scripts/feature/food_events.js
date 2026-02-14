ItemEvents.foodEaten(event => { //豆腐料理
	if (event.item.id == "kubejs:berry_bean_curd") {
		if (Math.random() <= 0.2) {
			let pos = event.player.block.pos
			let player = event.player.name.getString()
			event.server.runCommandSilent(`execute at @a[name=${player}] run summon minecraft:lightning_bolt ${pos.x} ${pos.y} ${pos.z}`)
			event.server.runCommandSilent(`execute at @a[name=${player}] run summon minecraft:lightning_bolt ${pos.x} ${pos.y} ${pos.z}`)
			event.server.runCommandSilent(`execute at @a[name=${player}] run summon minecraft:lightning_bolt ${pos.x} ${pos.y} ${pos.z}`)
			event.server.runCommandSilent(`execute at @a[name=${player}] run summon minecraft:lightning_bolt ${pos.x} ${pos.y} ${pos.z}`)
			event.server.runCommandSilent(`execute at @a[name=${player}] run summon minecraft:lightning_bolt ${pos.x} ${pos.y} ${pos.z}`)
		}
		event.player.giveInHand('minecraft:bowl')
	}
	if (event.item.id == 'kubejs:sweet_bean_curd' || event.item.id == 'kubejs:salty_bean_curd' || event.item.id == 'kubejs:spicy_bean_curd') { //其他豆腐
		event.player.giveInHand('minecraft:bowl')
	}
})

ItemEvents.foodEaten("kubejs:caramel_cod_soup", event => { //焦糖鳕鱼羹
	event.player.giveInHand('minecraft:bowl')
	if (event.player.getHealth() <= 2) {
		event.server.tell(event.player.name.getString() + "摄入焦糖鳕鱼羹过多而死")
		event.player.attack(20)
	} else {
		event.player.runCommandSilent(`title @s actionbar "§c是错觉吗？似乎胃里有什么蹦跳了一下"`)
	}
	event.player.attack(2)
})

ItemEvents.foodEaten("kubejs:phantom_shrimp", event => { //幻翼虾仁
	event.player.potionEffects.add("minecraft:glowing", 1200, 0)
	let colors = ["16711680", "16383744", "50943", "65311"]
	let mOffset = 0.1
	let speed = 0.6
	let ctr = 0
	for (let i = 0; i < 4; i++) {
		event.server.scheduleInTicks(20 * (i + 1), function (callback0) {
			event.server.runCommandSilent(`summon minecraft:firework_rocket ${event.player.pos.x()} ${event.player.pos.y() + 2} ${event.player.pos.z()} {Motion:[${(Math.random() - 0.5) * mOffset},${(Math.random() - 0.5) * mOffset + speed},${(Math.random() - 0.5) * mOffset}],
            FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;${colors[ctr]}],FadeColors:[I;${colors[ctr]}]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:10}`)
			ctr++;
		})
	}
})

ItemEvents.foodEaten("kubejs:bomb_cod_burger", event => { //劲爆鳕鱼堡
	event.player.playSound('minecraft:entity.generic.explode')
	if (event.player.getHealth() <= 8) {
		event.server.tell(event.player.name.getString() + "服用劲爆鳕鱼堡时爆炸了")
		event.player.attack(20)
	} else {
		event.player.tell("砰！")
	}
	event.player.attack(8)
})

ItemEvents.foodEaten("kubejs:squid_festival", event => { //鱿鱼狂欢节
	event.player.giveInHand('minecraft:bowl')
})


BlockEvents.rightClicked(event => { //披萨
	let pos = event.block.pos
	if (event.hand != "MAIN_HAND") {
		return
	}

	if (event.block == 'kubejs:pizza_margarita' && event.player.crouching == false) { //玛格丽特披萨
		event.player.giveInHand('kubejs:sliced_pizza_margarita')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:pizza_margarita2`)
	}
	if (event.block == 'kubejs:pizza_margarita2' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_pizza_margarita')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:pizza_margarita3`)
	}
	if (event.block == 'kubejs:pizza_margarita3' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_pizza_margarita')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:pizza_margarita4`)
	}
	if (event.block == 'kubejs:pizza_margarita4' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_pizza_margarita')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} minecraft:air`)
	}


	if (event.block == 'kubejs:pork_pizza' && event.player.crouching == false) { //猪肉碎披萨
		event.player.giveInHand('kubejs:sliced_pork_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:pork_pizza2`)
	}
	if (event.block == 'kubejs:pork_pizza2' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_pork_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:pork_pizza3`)
	}
	if (event.block == 'kubejs:pork_pizza3' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_pork_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:pork_pizza4`)
	}
	if (event.block == 'kubejs:pork_pizza4' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_pork_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} minecraft:air`)
	}


	if (event.block == 'kubejs:apple_pizza' && event.player.crouching == false) { //苹果披萨
		event.player.giveInHand('kubejs:sliced_apple_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:apple_pizza2`)
	}
	if (event.block == 'kubejs:apple_pizza2' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_apple_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:apple_pizza3`)
	}
	if (event.block == 'kubejs:apple_pizza3' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_apple_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:apple_pizza4`)
	}
	if (event.block == 'kubejs:apple_pizza4' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_apple_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} minecraft:air`)
	}
})

ItemEvents.foodEaten('kubejs:delta_porridge', event => {
	event.player.addItemCooldown("kubejs:delta_porridge", 1200)
	event.player.give("minecraft:bowl")
	event.player.potionEffects.add("kubejs:fair_play", 1200, 0)
	event.player.potionEffects.add("minecraft:speed", 1200, 1)
	event.player.potionEffects.add("minecraft:strength", 1200, 0)
	event.player.potionEffects.add("minecraft:resistance", 1200, 0)
	for (let i = 0; i < 6; i++) {
		event.server.scheduleInTicks(200 * i, function (callback0) {
			if (!event.player.hasEffect("kubejs:fair_play")) return
			event.server.runCommandSilent(`execute as ${event.player.name.getString()} at @s run effect give @e[distance=1..20] minecraft:glowing 7 0 true`)
		})
	}
})

PlayerEvents.loggedIn(event => {
	event.player.persistentData.rewindX = event.player.pos.x().toString()
	event.player.persistentData.rewindY = event.player.pos.y().toString()
	event.player.persistentData.rewindZ = event.player.pos.z().toString()
	event.player.persistentData.rewindD = event.player.level.dimension.toString()
})
ItemEvents.foodEaten("kubejs:drink659", event => {
	event.player.persistentData.rewindX = event.player.pos.x().toString()
	event.player.persistentData.rewindY = event.player.pos.y().toString()
	event.player.persistentData.rewindZ = event.player.pos.z().toString()
	event.player.persistentData.rewindD = event.player.level.dimension.toString()
	let duration = 6000
	if (event.player.hasEffect("kubejs:rewind")) {
		duration += event.player.getEffect("kubejs:rewind").duration
	}
	event.player.potionEffects.add("kubejs:rewind", duration, 0)
})

EntityEvents.hurt("minecraft:player", event => {
	if (!event.player.hasEffect("kubejs:rewind")) return
	if (event.player.health - event.damage <= 1) {
		let item = event.player.offHandItem.copy()
		event.player.offHandItem = "minecraft:totem_of_undying"
		event.server.scheduleInTicks(1, function (callback0) {
			if (event.player.offHandItem != "minecraft:totem_of_undying") {
				let x = event.player.persistentData.rewindX
				let y = event.player.persistentData.rewindY
				let z = event.player.persistentData.rewindZ
				let d = event.player.persistentData.rewindD
				event.server.runCommandSilent(`execute in ${d} as ${event.player.name.getString()} run tp @s ${x} ${y} ${z}`)
			}
			event.player.offHandItem = item.copy()
		})
	}
})

ItemEvents.rightClicked("kitchencarrot:cocktail", event => {
	if (event.hand != "MAIN_HAND") return
	//event.player.addItemCooldown("kitchencarrot:cocktail",20)
	if (!event.item || !event.item.nbt || !event.item.nbt.getString("cocktail")) return
	event.player.persistentData.wineItemType = event.item.nbt.getString("cocktail")
	let oldCount = 0
	event.player.getAllSlots().forEach(it => {
		if (it.hasNBT() && it.nbt.getString("cocktail") && it.nbt.getString("cocktail") == event.player.persistentData.wineItemType) {
			oldCount += it.count
		}
	})
	event.player.persistentData.wineItemCount = oldCount
	event.player.persistentData.wineItemTime = event.level.time

	event.server.scheduleInTicks(32, function (callback0) {
		let newCount = 0
		event.player.getAllSlots().forEach(it => {
			if (it.hasNBT() && it.nbt.getString("cocktail") && it.nbt.getString("cocktail") == event.player.persistentData.wineItemType) {
				newCount += it.count
			}
		})
		if (event.player.persistentData.wineItemCount - newCount == 1 && event.level.time - event.player.persistentData.wineItemTime == 32) {
			let player = event.player.name.getString()

			switch (event.player.persistentData.wineItemType) {
				case "fstwines:call_of_tahiti":
					event.server.runCommandSilent(`execute at ${player} run tellraw @a [{"text":"• ","color":"green"},{"text":"<","color":"dark_gray"},{"text":"${player}","color":"gray"},{"text":">: ","color":"dark_gray"},{"text":"我一定会上工的，嗝～","color":"white"}]`)
					break
				case "fstwines:free_nightingale":
					let itemList = [
						'4x nethersdelight:propelpearl',
						'4x culturaldelights:pickle',
						'4x create_confectionery:caramelized_marshmellow_on_a_stick',
						'4x crabbersdelight:pearl'
					]
					event.player.give(itemList[randint(0, 3)])
					break
				case "fstwines:dangerous_party":
					if (event.server.persistentData.isPotatoOn) {
						if (event.server.persistentData.potatoVictim != event.player.name.getString()) {
							event.player.tell("另一场击鼓传花已在进行！")
							event.player.potionEffects.clear()
						}
						break
					}
					event.server.persistentData.isPotatoOn = true
					event.server.persistentData.potatoTime = event.level.time
					event.server.persistentData.potatoVictim = event.player.name.getString()
					event.server.tell(`${event.player.name.getString()}饮下了危险派对！注意躲避他的攻击！`)
					hotPotatoCounter(event)
					break
				case "fstwines:shoal_in_dream":
					if (event.player.getBlock() == "minecraft:air") {
						if (event.player.getBlock().offset(0, 0, -1) == "minecraft:air") {
							event.player.getBlock().set("minecraft:blue_bed", { "part": "foot", "facing": "north" })
							event.player.getBlock().offset(0, 0, -1).set("minecraft:blue_bed", { "part": "head", "facing": "north" })
						} else if (event.player.getBlock().offset(0, 0, 1) == "minecraft:air") {
							event.player.getBlock().set("minecraft:blue_bed", { "part": "foot", "facing": "south" })
							event.player.getBlock().offset(0, 0, 1).set("minecraft:blue_bed", { "part": "head", "facing": "south" })
						} else if (event.player.getBlock().offset(1, 0, 0) == "minecraft:air") {
							event.player.getBlock().set("minecraft:blue_bed", { "part": "foot", "facing": "east" })
							event.player.getBlock().offset(1, 0, 0).set("minecraft:blue_bed", { "part": "head", "facing": "east" })
						} else if (event.player.getBlock().offset(-1, 0, 0) == "minecraft:air") {
							event.player.getBlock().set("minecraft:blue_bed", { "part": "foot", "facing": "west" })
							event.player.getBlock().offset(-1, 0, 0).set("minecraft:blue_bed", { "part": "head", "facing": "west" })
						} else {
							event.player.give("minecraft:blue_bed")
						}
					} else {
						event.player.give("minecraft:blue_bed")
					}
					break
			}
		}
	})
})

function hotPotatoCounter(event) {
	let time = Number(event.level.time - event.server.persistentData.potatoTime)
	//event.server.tell(time)
	if (time % 200 == 0) {
		let remainTime = 1200 - time
		let remainSec = Math.round(remainTime / 20)
		event.server.tell(`距离派对结束还有${remainSec}秒！`)
	}
	if (time >= 1200) {
		event.server.tell(`${event.server.persistentData.potatoVictim}没能及时把好运传给下一个人`)
		event.server.runCommandSilent(`kill ${event.server.persistentData.potatoVictim}`)
		event.server.persistentData.isPotatoOn = false
	} else {
		event.server.scheduleInTicks(1, function (callback0) {
			hotPotatoCounter(event)
		})
	}
}

PlayerEvents.chat(event => {
	if (event.player.hasEffect("kubejs:madness")) event.cancel()
})

function madness(server, playerUUID) { // 定义一个函数，直接传入 server 和玩家 UUID
	let player = server.getPlayer(playerUUID) 	// 每一轮循环都通过 UUID 重新获取最新的玩家对象
	if (!player) { 	// 1. 如果玩家不在线，直接切断当前循环执行流（等他下次上线由 loggedIn 重新拉起）
		return
	}
	if (!player.hasEffect("kubejs:madness")) {	// 2. 检查 Buff 是否还在
		player.persistentData.remove('isMadnessRunning') // Buff 彻底没了，清除发疯标记，正式结束循环
		return
	}
	// 执行发疯逻辑
	let shitTalk = randomShitTalk[Math.floor(Math.random() * randomShitTalk.length)]
	let playerName = player.name.getString()
	server.runCommandSilent(`execute at ${playerName} run tellraw @a [{"text":" • ","color":"green"},{"text":"<","color":"dark_gray"},{"text":"${playerName}","color":"gray"},{"text":">: ","color":"dark_gray"},{"text":"${shitTalk}","color":"white"}]`)
	// 计划下一轮
	server.scheduleInTicks(Math.floor(Math.random() * 500) + 1, (callback) => {
		madness(server, playerUUID)
	})
}

ItemEvents.foodEaten("kubejs:bug_soup", event => {
	let duration = 2400
	let hasEffect = event.player.hasEffect("kubejs:madness")
	if (hasEffect) {
		duration += event.player.getEffect("kubejs:madness").duration
	}
	event.player.potionEffects.add("kubejs:madness", duration, 0)
	if (!event.player.persistentData.isMadnessRunning) {
		event.player.persistentData.isMadnessRunning = true
		madness(event.server, event.player.uuid)
	}
})

PlayerEvents.loggedIn(event => { // --- 玩家上线事件：断点续传的关键 ---
	const { player, server } = event
	if (player.hasEffect("kubejs:madness") && player.persistentData.isMadnessRunning) {
		server.scheduleInTicks(20, () => {
			madness(server, player.uuid)
		})
	} else if (!player.hasEffect("kubejs:madness")) {
		player.persistentData.remove('isMadnessRunning')
	}
})

EntityEvents.hurt(event => {
	if (!event.player) return
	if (!event.server.persistentData.isPotatoOn) return
	if (!event.source.getPlayer()) return
	if (event.source.getPlayer().name.getString() != event.server.persistentData.potatoVictim) return
	event.source.getPlayer().tell(`恭喜！你把好运传给了${event.player.name.getString()}`)
	event.server.tell(`${event.player.name.getString()}眼前一黑`)

	event.server.persistentData.potatoVictim = event.player.name.getString()
	let duration = event.source.getPlayer().getEffect("kubejs:hot_potato").duration
	event.player.potionEffects.add("kubejs:hot_potato", duration, 0)
	event.player.potionEffects.add("minecraft:glowing", duration, 0)
	event.player.potionEffects.add("minecraft:blindness", 20, 0)
	event.player.potionEffects.add("minecraft:slowness", 20, 254)
	event.player.tell(`哦不！${event.source.getPlayer().name.getString()}把好运传给了你`)
	event.server.scheduleInTicks(1, function (callback) {
		event.source.getPlayer().potionEffects.clear()
	})
})

BlockEvents.rightClicked("kubejs:ramen", event => {
	if (event.hand != "MAIN_HAND") return
	let property = event.block.properties
	let bite = Number(property.bites)
	if (bite == 4) {
		event.player.giveInHand("minecraft:bowl")
		event.block.set("minecraft:air")
	}
	else {
		event.player.playSound("minecraft:entity.player.burp")
		event.player.addFood(4, 4)
		event.block.set("kubejs:ramen", { bites: `${bite + 1}` })
	}
})

ItemEvents.foodEaten("kubejs:sunshine_cod", event => {
	let player = event.player.name.getString()
	event.server.runCommandSilent(`execute as ${player} run weather clear`)
	event.server.tell(`${event.player.name.getString()}食用了晴天鳕鱼，善哉，天公作美！`)
})

