BlockEvents.rightClicked(event => {
	let player = event.player.name.getString()
	let pos = event.block.pos
	if (event.hand != "MAIN_HAND") { return }

	if (event.block == 'armourers_workshop:skinnable') {
		let skin = event.block.pos
		event.server.runCommandSilent(`execute at @a[name=${player}] run armourers animation block ${skin.x} ${skin.y} ${skin.z} play rightclick`)
	}

	if (event.block == 'minecraft:magma_block' && event.player.getHeldItem(event.hand) == 'minecraft:magma_cream') {
		event.server.runCommandSilent(`particle minecraft:spit ${pos.x} ${pos.y + 0.2} ${pos.z} 1 0.4 0.4 1 20`)
		event.player.tell('马格马格马!')
	}

	/////分割线//////



	if (event.block == 'kubejs:burger' && event.player.crouching == false) {
		event.player.runCommandSilent(`title @s actionbar "§a你的嘴巴似乎被什么粘住了"`)
		event.server.runCommandSilent(`execute at ${player} run tellraw @a [{"text":"• ","color":"green"},{"text":"<","color":"dark_gray"},{"text":"${player}","color":"gray"},{"text":">: ","color":"dark_gray"},{"text":"唔唔唔，呜呜！","color":"white"}]`)
		burgerCheck = false
	}

	//////分割线//////

	if (event.block == 'kubejs:multiple_fireworks' && event.player.mainHandItem.id == 'minecraft:flint_and_steel') {
		let center = event.block.pos
		let mOffset = 0.1
		let speed = 1
		event.player.playSound('minecraft:entity.tnt.primed')
		event.server.scheduleInTicks(5, function (callback9) {
			event.server.runCommandSilent(`fill ${center.x - 1} ${center.y - 1} ${center.z - 1} ${center.x + 1} ${center.y + 1} ${center.z + 1} air replace minecraft:fire`) //灭火

			event.server.runCommandSilent(`setblock ${center.x} ${center.y} ${center.z} kubejs:firing_multiple_fireworks`) //修改方块种类
		})

		event.server.scheduleInTicks(20, function (callback8) {
			event.server.runCommandSilent(`summon minecraft:firework_rocket ${center.x + Math.random() - 0.5} ${center.y + 1} ${center.z + Math.random() - 0.5} {Motion:[${(Math.random() - 0.5) * mOffset},${(Math.random() - 0.5) * mOffset + speed},${(Math.random() - 0.5) * mOffset}],
            FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;16711680],FadeColors:[I;16711680]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:20}`) //1红色

		})
		event.server.scheduleInTicks(30, function (callback0) {
			event.server.runCommandSilent(`summon minecraft:firework_rocket ${center.x + Math.random() - 0.5} ${center.y + 1} ${center.z + Math.random() - 0.5} {Motion:[${(Math.random() - 0.5) * mOffset},${(Math.random() - 0.5) * mOffset + speed},${(Math.random() - 0.5) * mOffset}],
            FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;16746752],FadeColors:[I;16746752]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:20}`) //2橙色
		})
		event.server.scheduleInTicks(40, function (callback1) {
			event.server.runCommandSilent(`summon minecraft:firework_rocket ${center.x + Math.random() - 0.5} ${center.y + 1} ${center.z + Math.random() - 0.5} {Motion:[${(Math.random() - 0.5) * mOffset},${(Math.random() - 0.5) * mOffset + speed},${(Math.random() - 0.5) * mOffset}],
            FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;16383744],FadeColors:[I;16383744]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:20}`) //3黄色
		})
		event.server.scheduleInTicks(50, function (callback2) {
			event.server.runCommandSilent(`summon minecraft:firework_rocket ${center.x + Math.random() - 0.5} ${center.y + 1} ${center.z + Math.random() - 0.5} {Motion:[${(Math.random() - 0.5) * mOffset},${(Math.random() - 0.5) * mOffset + speed},${(Math.random() - 0.5) * mOffset}],
            FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;65300],FadeColors:[I;65300]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:20}`) //4绿色
		})
		event.server.scheduleInTicks(60, function (callback3) {
			event.server.runCommandSilent(`summon minecraft:firework_rocket ${center.x + Math.random() - 0.5} ${center.y + 1} ${center.z + Math.random() - 0.5} {Motion:[${(Math.random() - 0.5) * mOffset},${(Math.random() - 0.5) * mOffset + speed},${(Math.random() - 0.5) * mOffset}],
            FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;65468],FadeColors:[I;65468]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:20}`) //5青色
		})
		event.server.scheduleInTicks(70, function (callback4) {
			event.server.runCommandSilent(`summon minecraft:firework_rocket ${center.x + Math.random() - 0.5} ${center.y + 1} ${center.z + Math.random() - 0.5} {Motion:[${(Math.random() - 0.5) * mOffset},${(Math.random() - 0.5) * mOffset + speed},${(Math.random() - 0.5) * mOffset}],
            FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;33791],FadeColors:[I;33791]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:20}`) //6蓝色
		})
		event.server.scheduleInTicks(80, function (callback5) {
			event.server.runCommandSilent(`summon minecraft:firework_rocket ${center.x + Math.random() - 0.5} ${center.y + 1} ${center.z + Math.random() - 0.5} {Motion:[${(Math.random() - 0.5) * mOffset},${(Math.random() - 0.5) * mOffset + speed},${(Math.random() - 0.5) * mOffset}],
            FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;3866879],FadeColors:[I;3866879]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:20}`) //7紫色
		})
		event.server.scheduleInTicks(90, function (callback6) {
			event.server.runCommandSilent(`summon minecraft:firework_rocket ${center.x + Math.random() - 0.5} ${center.y + 1} ${center.z + Math.random() - 0.5} {Motion:[${(Math.random() - 0.5) * mOffset},${(Math.random() - 0.5) * mOffset + speed},${(Math.random() - 0.5) * mOffset}],
            FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;16081663],FadeColors:[I;16081663]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:20}`) //8粉色
		})
		event.server.scheduleInTicks(100, function (callback7) {
			event.server.runCommandSilent(`summon minecraft:firework_rocket ${center.x + Math.random() - 0.5} ${center.y + 1} ${center.z + Math.random() - 0.5} {Motion:[${(Math.random() - 0.5) * mOffset},${(Math.random() - 0.5) * mOffset + speed},${(Math.random() - 0.5) * mOffset}],
            FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;16711680],FadeColors:[I;16711680]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:20}`) //9红色
			event.server.runCommandSilent(`setblock ${center.x} ${center.y} ${center.z} kubejs:fireworks_box`) //修改方块种类
		})
	}
})

BlockEvents.rightClicked('kubejs:multiple_firecrackers', event => {
	if (event.hand != "MAIN_HAND") {
		return
	}
	if (event.player.mainHandItem.id != "minecraft:flint_and_steel") {
		return
	}
	let player = event.player.name.getString()
	event.server.runCommandSilent(`execute as ${player} at ${player} run playsound minecraft:entity.tnt.primed block @a[distance=..40] ~ ~ ~ 1 1 1`)

	let block = event.block

	event.server.scheduleInTicks(40, function (callback0) {///particle minecraft:campfire_cosy_smoke
		fireCracker(event, block)
	})
})

BlockEvents.rightClicked(event=>{
	if(event.block.hasTag('forge:chests')&& event.player.isCrouching() && event.player.mainHandItem.id == "minecraft:shulker_shell" && event.player.offHandItem.id == "minecraft:shulker_shell"){
		event.cancel()
	}
})

function fireCracker(event, block) {
	let id = "firecracker" + Math.random().toString()
	event.server.runCommandSilent(`summon minecraft:armor_stand ${block.pos.x} ${block.pos.y - 1} ${block.pos.z} {Tags:["${id}"],NoAI:1b,Invulnerable:1b,PersistenceRequired:1b,Silent:1b,Invisible:0,ShowArms:1,Small:1}`)

	for (let i = 0; i < 8; i++) {
		event.server.scheduleInTicks(3 + i * 3, function (callback0) {///particle minecraft:campfire_cosy_smoke
			event.server.runCommandSilent(`execute as @e[tag=${id}] at @s run playsound createbigcannons:fire_machine_gun block @a[distance=..40] ~ ~1 ~ 10 ${1 + Math.random()} 1`)
			event.server.runCommandSilent(`execute as @e[tag=${id}] at @s run particle minecraft:lava ~${-0.5 + Math.random()} ~1 ~${-0.5 + Math.random()} 0 0 0 1 1 force`)
			event.server.runCommandSilent(`execute as @e[tag=${id}] at @s run particle minecraft:campfire_signal_smoke ~ ~1.5 ~ 0.3 0.3 0.3 0.01 5 force`)
			event.server.runCommandSilent(`execute as @e[tag=${id}] at @s run particle minecraft:flame ~ ~1.1 ~ 0.2 0.2 0.2 0.01 4 force`)
		})
	}
	event.server.scheduleInTicks(24, function (callback0) {
		event.server.runCommandSilent(`execute as @e[tag=${id}] run kill @s`)
		block.set("air")
		if (block.offset(1, 0, 0).id == "kubejs:multiple_firecrackers") {
			let entities = event.level.getEntitiesWithin(AABB.of(block.pos.x - 1, block.pos.y - 1, block.pos.z - 1, block.pos.x + 1, block.pos.y + 1, block.pos.z + 1))
			let used = false
			entities.forEach(ele => {
				if (ele.getBlock().offset(0, 1, 0) == block.offset(1, 0, 0)) {
					used = true
				}
			})
			if (!used) {
				fireCracker(event, block.offset(1, 0, 0))
			}
		}
		if (block.offset(1, 0, 1).id == "kubejs:multiple_firecrackers") {
			let entities = event.level.getEntitiesWithin(AABB.of(block.pos.x - 1, block.pos.y - 1, block.pos.z - 1, block.pos.x + 1, block.pos.y + 1, block.pos.z + 1))
			let used = false
			entities.forEach(ele => {
				if (ele.getBlock().offset(0, 1, 0) == block.offset(1, 0, 1)) {
					used = true
				}
			})
			if (!used) {
				fireCracker(event, block.offset(1, 0, 1))
			}
		}
		if (block.offset(-1, 0, -1).id == "kubejs:multiple_firecrackers") {
			let entities = event.level.getEntitiesWithin(AABB.of(block.pos.x - 1, block.pos.y - 1, block.pos.z - 1, block.pos.x + 1, block.pos.y + 1, block.pos.z + 1))
			let used = false
			entities.forEach(ele => {
				if (ele.getBlock().offset(0, 1, 0) == block.offset(-1, 0, -1)) {
					used = true
				}
			})
			if (!used) {
				fireCracker(event, block.offset(-1, 0, -1))
			}
		}
		if (block.offset(-1, 0, 0).id == "kubejs:multiple_firecrackers") {
			let entities = event.level.getEntitiesWithin(AABB.of(block.pos.x - 1, block.pos.y - 1, block.pos.z - 1, block.pos.x + 1, block.pos.y + 1, block.pos.z + 1))
			let used = false
			entities.forEach(ele => {
				if (ele.getBlock().offset(0, 1, 0) == block.offset(-1, 0, 0)) {
					used = true
				}
			})
			if (!used) {
				fireCracker(event, block.offset(-1, 0, 0))
			}
		}
		if (block.offset(0, 0, 1).id == "kubejs:multiple_firecrackers") {
			let entities = event.level.getEntitiesWithin(AABB.of(block.pos.x - 1, block.pos.y - 1, block.pos.z - 1, block.pos.x + 1, block.pos.y + 1, block.pos.z + 1))
			let used = false
			entities.forEach(ele => {
				if (ele.getBlock().offset(0, 1, 0) == block.offset(0, 0, 1)) {
					used = true
				}
			})
			if (!used) {
				fireCracker(event, block.offset(0, 0, 1))
			}
		}
		if (block.offset(0, 0, -1).id == "kubejs:multiple_firecrackers") {
			let entities = event.level.getEntitiesWithin(AABB.of(block.pos.x - 1, block.pos.y - 1, block.pos.z - 1, block.pos.x + 1, block.pos.y + 1, block.pos.z + 1))
			let used = false
			entities.forEach(ele => {
				if (ele.getBlock().offset(0, 1, 0) == block.offset(0, 0, -1)) {
					used = true
				}
			})
			if (!used) {
				fireCracker(event, block.offset(0, 0, -1))
			}
		}

	})
}

BlockEvents.rightClicked("create:deployer", event => {
	if (event.hand != "MAIN_HAND" || event.player.mainHandItem.id != "kubejs:deployer_lubricant") {
		return
	}
	const dpuuid = [2112482347, -724487850, -1824816047, -774830698]
	let name = event.player.name.getString()
	event.block.mergeEntityData(`{Owner:[I;${dpuuid[0]},${dpuuid[1]},${dpuuid[2]},${dpuuid[3]}]}`)
	event.server.runCommandSilent(`execute as @a[name=${name}] at @a[name=${name}] run playsound create:slime_added voice @a[distance=..20] ~ ~ ~ 1 1 0.1`)
	event.player.damageHeldItem('MAIN_HAND', 1)
	event.player.addItemCooldown("kubejs:deployer_lubricant", 10)
})

BlockEvents.placed(event => {
    if (event.block == 'create_confectionery:white_chocolate_bricks') {
        if (event.block.offset(0, -1, 0) == "minecraft:campfire") {
            event.server.runCommandSilent(`particle end_rod ${event.block.pos.x} ${event.block.pos.y} ${event.block.pos.z} 1 1 1 0.25 400 normal`)
			event.server.runCommandSilent(`minecraft:kill @e[type=phantom,x=${event.block.pos.x},y=${event.block.pos.y},z=${event.block.pos.z},distance=..150,nbt={Size:0}]`)
			event.block.set("minecraft:air")
        }
    }
})