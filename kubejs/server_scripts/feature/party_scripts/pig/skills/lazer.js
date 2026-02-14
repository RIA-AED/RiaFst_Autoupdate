/**
 * 年猪技能：锁定光束
 * - 随机锁定最多 3 名参战玩家（pig_eater 标签）
 * - 从年猪位置向目标生成直线粒子预警
 * - 若遇到方块阻挡，光束在阻挡处停止
 * - 预警结束后沿光束直线对玩家造成伤害
 *
 * @param {Internal.LivingEntity} boss
 * @param {Internal.Level} level
 * @param {Internal.MinecraftServer} server
 * @param {object} [options]
 */
function pig$lazerStrike(boss, level, server, options) {
	if (!boss || !level || !server) return
	if (!boss.isAlive() || !boss.tags.contains("pigboss")) return
	if (boss.persistentData.isBehaving) return

	boss.persistentData.isBehaving = true

	let cfg = Object.assign({
		targetCount: 3,
		warningTicks: 40,
		warningInterval: 4,
		particleType: "minecraft:end_rod",
		targetParticleType: "minecraft:crit",
		particleStep: 0.5,
		hitRadius: 1.2,
		damage: 8
	}, options || {})

	let candidates = pig$getPigEaterPlayers(level)

	if (candidates.length === 0) {
		boss.persistentData.isBehaving = false
		return
	}

	let targets = pig$pickRandomTargets(candidates, cfg.targetCount)
	let activeTargets = []
	for (let t of targets) {
		if (!t || !t.isAlive()) continue
		activeTargets.push(t)
	}

	if (activeTargets.length === 0) {
		boss.persistentData.isBehaving = false
		return
	}

	let warningElapsed = 0
	let warningTask = server.scheduleRepeatingInTicks(cfg.warningInterval, task => {
		try {
			if (!boss.isAlive() || boss.persistentData.isDisabled) {
				task.clear()
				boss.persistentData.isBehaving = false
				return
			}
			let from = pig$getBossCenter(boss, 1.2)
			for (let t of activeTargets) {
				if (!t || !t.isAlive()) continue
				let pos = { x: t.pos.x(), y: t.pos.y() + 0.5, z: t.pos.z() }
				pig$spawnLineParticles(level, from, pos, cfg.particleStep, cfg.particleType)
				pig$spawnCircleParticles(level, 0.9, pos, 0, cfg.targetParticleType)
			}
			warningElapsed += cfg.warningInterval
			if (warningElapsed >= cfg.warningTicks) task.clear()
		} catch (err) {
			console.log("[年猪]锁定光束预警异常:", err)
			task.clear()
			boss.persistentData.isBehaving = false
		}
	})

	server.scheduleInTicks(cfg.warningTicks, () => {
		warningTask.clear()
		if (!boss.isAlive() || boss.persistentData.isDisabled) {
			boss.persistentData.isBehaving = false
			return
		}
		let from = pig$getBossCenter(boss, 1.2)
		let hitSet = new Set()
		for (let t of activeTargets) {
			if (!t || !t.isAlive()) continue
			let pos = { x: t.pos.x(), y: t.pos.y() + 0.5, z: t.pos.z() }
			pig$lazerDamageBeam(level, boss, from, pos, cfg, hitSet)
		}
		boss.persistentData.isBehaving = false
	})
}

function pig$lazerDamageBeam(level, boss, from, to, cfg, hitSet) {
	let dx = to.x - from.x
	let dy = to.y - from.y
	let dz = to.z - from.z
	let fullLen = Math.sqrt(dx * dx + dy * dy + dz * dz)
	if (fullLen <= 0.01) return

	let maxDist = pig$lazerMaxDistance(level, from, to, fullLen)
	let maxT = Math.min(1, maxDist / fullLen)

	let players = pig$getPigEaterPlayers(level)
	let hits = []
	for (let i = 0; i < players.length; i++) {
		let p = players[i]
		if (hitSet.has(p.uuid)) continue

		// let pos = pig$getPlayerEyePos(p, 1.0)
		let pos = { x: p.pos.x(), y: p.pos.y() + 0.5, z: p.pos.z() }
		let px = pos.x
		let py = pos.y
		let pz = pos.z

		let vx = px - from.x
		let vy = py - from.y
		let vz = pz - from.z
		let dot = vx * dx + vy * dy + vz * dz
		let t = dot / (fullLen * fullLen)
		if (t < 0 || t > maxT) continue

		let cx = from.x + dx * t
		let cy = from.y + dy * t
		let cz = from.z + dz * t
		let dist = Math.sqrt((px - cx) * (px - cx) + (py - cy) * (py - cy) + (pz - cz) * (pz - cz))
		if (dist > cfg.hitRadius) continue

		if (pig$raycastBlocked(level, from, { x: px, y: py, z: pz })) continue

		hits.push(p)
	}

	if (hits.length === 0) return
	let sharedDamage = cfg.damage > 0 ? (cfg.damage / hits.length) : 0
	for (let i = 0; i < hits.length; i++) {
		let p = hits[i]
		hitSet.add(p.uuid)
		if (sharedDamage > 0) {
			p.attack(level.damageSources().mobAttack(boss), sharedDamage)
		}
	}
}

function pig$lazerMaxDistance(level, from, to, fullLen) {
	return pig$raycastHitDistance(level, from, to, fullLen)
}
