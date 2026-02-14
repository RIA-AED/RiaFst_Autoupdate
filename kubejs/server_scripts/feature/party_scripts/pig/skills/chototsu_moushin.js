const $AABB = Java.loadClass("net.minecraft.world.phys.AABB")
const $Vec3 = Java.loadClass("net.minecraft.world.phys.Vec3")
const $Anchor = Java.loadClass("net.minecraft.commands.arguments.EntityAnchorArgument$Anchor")

/**
 * 年猪技能：猪突猛进
 * - 随机锁定最多 3 名参战玩家（pig_eater 标签）
 * - 显示三条连线粒子作为预警
 * - 依次向目标位置冲锋
 * - 冲锋路径命中玩家时造成伤害与击退
 * - 冲锋路径遇到方块障碍时直接破坏
 *
 * @param {Internal.LivingEntity} boss
 * @param {Internal.Level} level
 * @param {Internal.MinecraftServer} server
 * @param {object} [options]
 */
function pig$chototsuMoushin(boss, level, server, options) {
    console.log("[年猪]触发猪突猛进技能")
	if (!boss || !level || !server) {return}
	if (!boss.isAlive() || !boss.tags.contains("pigboss")) {console.log("[年猪]猪突猛进技能触发失败：boss 状态不合法"); return}

	if (boss.persistentData.isBehaving) {console.log("[年猪]猪突猛进技能触发失败：boss 正在执行其他行为"); return}
	boss.persistentData.isBehaving = true

	let cfg = Object.assign({
		targetCount: 3,
		warningTicks: 20,
		warningInterval: 4,
		particleType: "minecraft:crit",
        playerParticleType: "minecraft:cloud",
		particleStep: 0.6,
		chargeSpeed: 1.1,
		chargeStopDist: 1.2,
		maxChargeTicks: 80,
		hitRadius: 1.6,
		damage: 10,
		knockback: 1.4,
		knockUp: 0.5,
		breakRadius: 1
	}, options || {})

	let candidates = pig$getPigEaterPlayers(level)

    // console.log("[年猪]猪突猛进候选目标:", candidates.map(t => t.getDisplayName().getString()).join(", "))

	if (candidates.length === 0) {
		boss.persistentData.isBehaving = false
        console.log("[年猪]猪突猛进技能触发失败：没有可用目标")
		return
	}

	let targets = pig$pickRandomTargets(candidates, cfg.targetCount)
	let routePositions = []
	let fixedBossPos = pig$getBossCenter(boss, 0.5)
	routePositions.push(fixedBossPos)
	for (let ti = 0; ti < targets.length; ti++) {
		let target = targets[ti]
		if (!target || !target.isAlive()) continue
		routePositions.push({ x: target.pos.x(), y: target.pos.y() + 0.5 , z: target.pos.z() })
	}
    routePositions.push(fixedBossPos)
    // console.log("[年猪]猪突猛进锁定目标:", targets.map(t => t.getDisplayName().getString()).join(", "))

	let warningTickCounter = 0
	let warningTask = server.scheduleRepeatingInTicks(cfg.warningInterval, task => {
		try {
			if (!boss.isAlive() || boss.persistentData.isDisabled) {
				task.clear()
				boss.persistentData.isBehaving = false
				return
			}
			for (let li = 1; li < routePositions.length; li++) {
				pig$spawnLineParticles(level, routePositions[li - 1], routePositions[li], cfg.particleStep, cfg.particleType)
                pig$spawnCircleParticles(level, 1.0, routePositions[li], 0.5, cfg.playerParticleType)
                // console.log("[年猪]猪突猛进预警粒子位置:", routePositions[li - 1], "->", routePositions[li])
			}
			warningTickCounter += cfg.warningInterval
			if (warningTickCounter >= cfg.warningTicks) task.clear()
		} catch (err) {
			console.log("[年猪]猪突猛进预警异常:", err)
            boss.persistentData.isBehaving = false
			task.clear()
		}
	})

	server.scheduleInTicks(cfg.warningTicks, () => {
		warningTask.clear()
		if (!boss.isAlive() || boss.persistentData.isDisabled) {
			boss.persistentData.isBehaving = false
			return
		}
		if (routePositions.length <= 1) {
			boss.persistentData.isBehaving = false
			return
		}
		pig$chargeSequence(boss, level, server, routePositions, cfg, 1)
	})
}

function pig$chargeSequence(boss, level, server, routePositions, cfg, index) {
	if (!boss.isAlive() || boss.persistentData.isDisabled) {
		boss.persistentData.isBehaving = false
		return
	}

	if (index >= routePositions.length) {
		boss.persistentData.isBehaving = false
		return
	}

	let hitSet = new Set()
	let chargeTicks = 0
	server.scheduleRepeatingInTicks(1, task => {
		try {
			if (!boss.isAlive() || boss.persistentData.isDisabled) {
				task.clear()
				boss.persistentData.isBehaving = false
				return
			}

			let bossPos = { x: boss.pos.x(), y: boss.pos.y(), z: boss.pos.z() }
			let fixedTargetPos = routePositions[index]
			let targetPos = { x: fixedTargetPos.x, y: boss.pos.y(), z: fixedTargetPos.z }
			let dx = targetPos.x - bossPos.x
			let dz = targetPos.z - bossPos.z
			let dist = Math.sqrt(dx * dx + dz * dz)
			if (dist <= cfg.chargeStopDist || chargeTicks >= cfg.maxChargeTicks) {
				task.clear()
				server.scheduleInTicks(10, () => pig$chargeSequence(boss, level, server, routePositions, cfg, index + 1))
				return
			}

			let nx = dx / dist
			let nz = dz / dist
			let step = Math.min(cfg.chargeSpeed, dist)
			let nextX = bossPos.x + nx * step
			let nextZ = bossPos.z + nz * step
			let nextY = bossPos.y

			boss.setPos(nextX, nextY, nextZ)
			boss.lookAt($Anchor.EYES, new $Vec3(targetPos.x, targetPos.y, targetPos.z))
			boss.fallDistance = 0

			//pig$breakBlocksAround(level, nextX, nextY, nextZ, cfg.breakRadius)
			pig$hitPlayersAlongCharge(level, boss, nextX, nextY, nextZ, nx, nz, cfg, hitSet)

			chargeTicks++
		} catch (err) {
			console.log("[年猪]猪突猛进冲锋异常:", err)
			task.clear()
			boss.persistentData.isBehaving = false
		}
	})
}

function pig$breakBlocksAround(level, x, y, z, radius) {
	let r = Math.max(0, Math.floor(radius))
	let bx = Math.floor(x)
	let by = Math.floor(y)
	let bz = Math.floor(z)
    let pos = null
	for (let ix = -r; ix <= r; ix++) {
		for (let iy = 0; iy <= 1; iy++) {
			for (let iz = -r; iz <= r; iz++) {
				pos = BlockPos(bx + ix, by + iy, bz + iz)
				if (level.isEmptyBlock(pos)) continue
				level.destroyBlock(pos, false)
			}
		}
	}
}

function pig$hitPlayersAlongCharge(level, boss, x, y, z, nx, nz, cfg, hitSet) {
	let box = new $AABB(
		x - cfg.hitRadius, y - 1, z - cfg.hitRadius,
		x + cfg.hitRadius, y + 2, z + cfg.hitRadius
	)
	let entities = level.getEntitiesWithin(box).filter(e => e.tags && e.tags.contains("pig_eater"))
	for (let p of entities) {
		if (!p || !p.isAlive()) continue
		if (hitSet.has(p.uuid)) continue
		hitSet.add(p.uuid)

		p.addMotion(nx * cfg.knockback, cfg.knockUp, nz * cfg.knockback)
		p.attack(
			level.damageSources().mobAttack(boss),
			cfg.damage
		)
	}
}
