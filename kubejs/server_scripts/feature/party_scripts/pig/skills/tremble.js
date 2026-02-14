/**
 * 触发“撼地震击”技能：
 *  - 以 Boss 为中心生成向外扩散的冲击波圆环
 *  - 冲击波扫到玩家时造成伤害并向外击退
 *  - 冲击波无法穿透实心方块，玩家处于掩体后方时不会被命中
 *
 * @param {Internal.Entity} boss   带有 pigboss 标签的年猪实体
 * @param {Internal.Level} level   当前世界对象
 * @param {Internal.MinecraftServer} server 服务器实例
 * @param {object} [options]        可选自定义参数
 */
function pig$skillTremble(boss, level, server, options) {
	if (!boss || !level || !server) return
	if (!boss.isAlive() || !boss.tags.contains("pigboss")) return

	let skillBroken = false;
	let cfg = Object.assign({
		startRadius: 1.5,
		maxRadius: 32,
		expandPerTick: 0.8,
		tickInterval: 2,
		waveWidth: 1.6,
		damage: 8,
		knockback: 1.35,
		knockUp: 0.2,
		particleYOffset: 0.1,
		particleType: "minecraft:soul_fire_flame",
		sound: "minecraft:entity.generic.explode",
		soundVolume: 3.0,
		soundPitch: 0.7,
        warningType: "minecraft:flame"
	}, options || {})

	let tickInterval = Math.max(1, Math.floor(cfg.tickInterval))
	let expandPerTick = cfg.expandPerTick > 0 ? cfg.expandPerTick : 0.5
	let usableWaveWidth = Math.max(0.2, cfg.waveWidth)
	let centerVec = pig$getBossCenter(boss, cfg.particleYOffset)
	let hitPlayers = new Set()
    let warningTicks = 0
    server.scheduleRepeatingInTicks(5, task => {
        pig$spawnCircleParticles(level, cfg.maxRadius, centerVec, cfg.particleYOffset, cfg.warningType)
        warningTicks++
        if (warningTicks >= 8) task.clear()
		if (boss.persistentData.isDisabled){
			skillBroken = true
			task.clear()
		}
    })
    server.scheduleInTicks(40, () => {
		if (skillBroken || boss.persistentData.isDisabled) return
        level.playSound(
            null,
            centerVec.x,
            centerVec.y,
            centerVec.z,
            cfg.sound,
            boss.soundSource,
            cfg.soundVolume,
            cfg.soundPitch
        )

        let radius = Math.max(0, cfg.startRadius || 0)

        server.scheduleRepeatingInTicks(tickInterval, task => {
            try {
                if (!boss.isAlive() || radius > cfg.maxRadius) {
                    task.clear()
                    return
                }
                pig$spawnCircleParticles(level, Math.max(0.25, radius), centerVec, cfg.particleYOffset, cfg.particleType)
                pig$trembleSweepPlayers(level, centerVec, radius, usableWaveWidth, cfg, hitPlayers)
                radius += expandPerTick
            } catch (err) {
                console.error("[年猪]撼地震击技能异常:", err)
                task.clear()
            }
        })
    })
}

function pig$trembleSweepPlayers(level, centerVec, radius, waveWidth, cfg, hitPlayers) {
	let players = pig$getPigEaterPlayers(level)
	for (let i = 0; i < players.length; i++) {
		let player = players[i]

		let px = player.pos.x()
		let pz = player.pos.z()
		let dx = px - centerVec.x
		let dz = pz - centerVec.z
		let horizontalDist = Math.sqrt(dx * dx + dz * dz)
		let halfWidth = waveWidth * 0.5

		if (horizontalDist < radius - halfWidth || horizontalDist > radius + halfWidth) continue
		if (hitPlayers.has(player.uuid)) continue
		if (horizontalDist <= 0.01) continue

		if (pig$trembleWaveBlocked(level, centerVec, player)) continue

		hitPlayers.add(player.uuid)
		console.log(`[年猪]撼地震击命中玩家: ${player.name} (距离: ${horizontalDist.toFixed(2)})`)

		let norm = (1 - (radius / cfg.maxRadius))
		player.addMotion(dx * norm * cfg.knockback, cfg.knockUp * Math.log(cfg.maxRadius - radius + 1), dz * norm * cfg.knockback)
		if (cfg.damage > 0) player.attack(cfg.damage * (1 - (radius / cfg.maxRadius)))
	}
}

function pig$trembleWaveBlocked(level, centerVec, player) {
	if (Math.abs(player.pos.y() - centerVec.y) > 0.5) return true
	let targetPos = { x: player.pos.x(), y: player.pos.y(), z: player.pos.z() }
	return pig$raycastBlocked(level, centerVec, targetPos)
}

// function pig$trembleTargetY(player) {
// 	if (!player) return 0
// 	try {
// 		if (typeof player.getEyeHeight === "function") {
// 			return player.pos.y() + player.getEyeHeight()
// 		}
// 		if (typeof player.eyeHeight === "number") {
// 			return player.pos.y() + player.eyeHeight
// 		}
// 	} catch (err) {
// 		console.debug("[年猪]眼高计算失败", err)
// 	}
// 	return player.pos.y() + 1.5
// }
