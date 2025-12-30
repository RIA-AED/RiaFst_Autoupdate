const $phantom = Java.loadClass("net.minecraft.world.entity.monster.Phantom")
ItemEvents.rightClicked(event => {
	let player = event.player.name.getString()
	let handitem = event.player.mainHandItem
	switch (event.player.mainHandItem.id) {
		case 'kubejs:harvest_the_night': {//收割黑夜
			let pos = event.player.block
			event.server.runCommandSilent(`execute at @a[name=${player}] run particle end_rod ${pos.x} ${pos.y} ${pos.z} 1 1 1 0.25 400 normal`)
			event.server.runCommandSilent(`execute at @a[name=${player}] run playsound minecraft:item.trident.return player @a ${pos.x} ${pos.y} ${pos.z} 1 1`);
			event.server.runCommandSilent(`execute as @a[name=${player}] at @a[name=${player}] run execute if entity @e[type=phantom,distance=..150,nbt={Size:0}] run tellraw @p [{"text":"§8<§7收割黑夜§8>: §f肃清了周围的幻翼."}]`)
			event.server.runCommandSilent(`execute as @a[name=${player}] at @a[name=${player}] run execute if entity @e[type=phantom,distance=..150,nbt=!{Size:0}] run tellraw @p] [{"text":"§8<§7收割黑夜§8>: §f那不是普通的幻翼...我做不到..."}]`)
			event.server.runCommandSilent(`execute as @a[name=${player}] at @a[name=${player}] run execute unless entity @e[type=phantom,distance=..150] run tellraw @p [{"text":"§8<§7收割黑夜§8>: §f你的周围不存在幻翼."}]`)
			event.server.runCommandSilent(`execute as @a[name=${player}] at @a[name=${player}] run tp @e[type=phantom,distance=..150,nbt={Size:0}] ~ ~4 ~`)
			event.server.runCommandSilent(`execute as @a[name=${player}] at @a[name=${player}] run kill @e[type=phantom,distance=..150,nbt={Size:0}]`)
			event.player.addItemCooldown(event.player.mainHandItem.id, 300)
			break
		}

		case 'kubejs:copter': { //竹蜻蜓
			let pos = event.player.block
			event.server.runCommandSilent(`execute at @a[name=${player}] run effect give @a[name=${player}] minecraft:levitation 3 4 false`)
			event.server.runCommandSilent(`execute at @a[name=${player}] run particle cloud ${pos.x} ${pos.y} ${pos.z} 1 1 1 0.25 200 normal`)
			event.player.addItemCooldown(event.player.mainHandItem.id, 300)
			event.player.damageHeldItem(MAIN_HAND, 1)
			break
		}

		case 'kubejs:hemostix_plus': { //采血
			let pos = event.player.block
			if (event.player.getHealth() <= 5) {
				event.player.runCommandSilent(`title @s actionbar "§c你不能再抽血了"`)
			} else {
				event.player.giveInHand('kubejs:blood_bottle')
				event.player.attack(5)
				event.player.runCommandSilent(`title @s actionbar "§c你感到血正在流出..."`)
				event.player.addItemCooldown(event.player.mainHandItem.id, 30)
				event.player.damageHeldItem(MAIN_HAND, 1);
			}
			break
		}
		case 'kubejs:sparkler': {
			let pos = event.player.block
			let yaw = event.player.yaw * 0.01745
			let pitch = event.player.pitch * 0.01745
			let speed = 0.5

			let mx = Math.sin(yaw) * (Math.cos(pitch)) * speed * -1
			let my = -1 * Math.sin(pitch) * speed
			let mz = Math.cos(yaw) * (Math.cos(pitch)) * speed
			event.server.runCommandSilent(`summon minecraft:firework_rocket ${pos.x} ${pos.y + 2} ${pos.z} {Motion:[${mx},${my},${mz}],FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;16711680],FadeColors:[I;16711680]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:20}`)
			event.server.scheduleInTicks(10, function (callback0) {
				let pos = event.player.block
				let yaw = event.player.yaw * 0.01745
				let pitch = event.player.pitch * 0.01745
				let mx = Math.sin(yaw) * (Math.cos(pitch)) * speed * -1
				let my = -1 * Math.sin(pitch) * speed
				let mz = Math.cos(yaw) * (Math.cos(pitch)) * speed
				event.server.runCommandSilent(`summon minecraft:firework_rocket ${pos.x} ${pos.y + 2} ${pos.z} {Motion:[${mx},${my},${mz}],FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;16383744],FadeColors:[I;16383744]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:20}`)
			})
			event.server.scheduleInTicks(20, function (callback1) {
				let pos = event.player.block
				let yaw = event.player.yaw * 0.01745
				let pitch = event.player.pitch * 0.01745
				let mx = Math.sin(yaw) * (Math.cos(pitch)) * speed * -1
				let my = -1 * Math.sin(pitch) * speed
				let mz = Math.cos(yaw) * (Math.cos(pitch)) * speed
				event.server.runCommandSilent(`summon minecraft:firework_rocket ${pos.x} ${pos.y + 2} ${pos.z} {Motion:[${mx},${my},${mz}],FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;50943],FadeColors:[I;50943]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:20}`)
			})
			event.server.scheduleInTicks(30, function (callback2) {
				let pos = event.player.block
				let yaw = event.player.yaw * 0.01745
				let pitch = event.player.pitch * 0.01745
				let mx = Math.sin(yaw) * (Math.cos(pitch)) * speed * -1
				let my = -1 * Math.sin(pitch) * speed
				let mz = Math.cos(yaw) * (Math.cos(pitch)) * speed
				event.server.runCommandSilent(`summon minecraft:firework_rocket ${pos.x} ${pos.y + 2} ${pos.z} {Motion:[${mx},${my},${mz}],FireworksItem:{tag:{Fireworks:{Flight:1,Explosions:[{Trail:1b,Type:0,Colors:[I;65311],FadeColors:[I;65311]}]}},id:"minecraft:firework_rocket",Count:1},Life:0,LifeTime:20}`)
			})
			event.server.scheduleInTicks(35, function (callback3) {
				event.server.runCommandSilent(`clear @a[name=${player}] kubejs:sparkler 1`)
			})
			event.player.addItemCooldown(event.player.mainHandItem.id, 50)
			break
		}
	}
})

ItemEvents.rightClicked(event => { //时装动画
	let player = event.player.name.getString()
	let handitem = event.player.mainHandItem
	event.server.runCommandSilent(`execute at @a[name=${player}] run armourers animation entity ${player} play rightclick`)
	if (handitem.nbt && handitem.nbt["sound"] != null) {
		event.server.runCommandSilent(`execute at @a[name=${player}] run playsound ${handitem.nbt["sound"]} player @a`)
	}
})