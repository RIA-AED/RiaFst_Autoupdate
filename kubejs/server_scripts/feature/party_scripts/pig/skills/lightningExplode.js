/**
 * 年猪技能：雷击爆破
 * - 随机锁定最多 3 名参战玩家（pig_eater 标签）
 * - 在其位置召唤闪电（必中）
 * - 短暂延迟后在击中位置产生爆炸
 *
 * @param {Internal.LivingEntity} boss
 * @param {Internal.Level} level
 * @param {Internal.MinecraftServer} server
 * @param {object} [options]
 */
function pig$lightningExplode(boss, level, server, options) {
	if (!boss || !level || !server) return
	if (!boss.isAlive() || !boss.tags.contains("pigboss")) return
	if (boss.persistentData.isBehaving || boss.persistentData.isDisabled) return

	boss.persistentData.isBehaving = true

	const cfg = Object.assign({
		targetCount: 3,
		delayTicks: 20,
		explosionStrength: 3,
		causesFire: false
	}, options || {})

	const candidates = pig$getPigEaterPlayers(level)
	if (candidates.length === 0) {
		boss.persistentData.isBehaving = false
		return
	}

	const targets = pig$pickRandomTargets(candidates, cfg.targetCount)
	const strikePositions = []
	for (let t of targets) {
		if (!t || !t.isAlive()) continue
		strikePositions.push(t.blockPosition())
	}

	if (strikePositions.length === 0) {
		boss.persistentData.isBehaving = false
		return
	}

	for (let pos of strikePositions) {
		server.runCommandSilent(`summon minecraft:lightning_bolt ${pos.x} ${pos.y} ${pos.z}`)
	}

	const delay = Math.max(1, Math.floor(cfg.delayTicks))
	server.scheduleInTicks(delay, () => {
		try {
			if (!boss.isAlive() || boss.persistentData.isDisabled) {
				boss.persistentData.isBehaving = false
				return
			}
			for (let pos of strikePositions) {
				let block = level.getBlock(pos)
				let explosion = block.createExplosion()
				explosion.strength(cfg.explosionStrength)
				if (typeof explosion.causesFire === "function") {
					explosion.causesFire(!!cfg.causesFire)
				}else {
					explosion.causesFire(cfg.causesFire)
				}
				explosion.explode()
			}
		} catch (err) {
			console.error("[年猪]雷击爆破技能异常:", err)
		} finally {
			boss.persistentData.isBehaving = false
		}
	})
}
