/**
 * 年猪 Boss 技能：召唤石山并对可视目标造成伤害
 *
 * 技能流程：
 * 1. 校验实体是否为合法年猪 Boss
 * 2. 检查 Boss 是否正在执行其他技能（防止技能重入）
 * 3. 在 Boss 周围随机生成多个石山结构
 * 4. 延迟若干 tick 后，检测目标与 Boss 之间是否存在方块遮挡
 * 5. 对无遮挡目标施加向上击飞并造成伤害
 * 
 * @param {Internal.LivingEntity} boss
 *        年猪 Boss 实体
 *        - 必须包含 "pigboss" 标签
 *        - 使用 persistentData.isBehaving 控制技能互斥
 *
 * @param {Internal.Level} level
 *        世界对象
 *        - 用于实体查询
 *
 * @param {Internal.MinecraftServer} server
 *        服务器实例
 *        - 用于调度技能阶段定时器（scheduleRepeatingInTicks）
 *
 * @param {number} spawnRadius
 *        石山生成半径
 *        - 以 Boss 为圆心
 *
 * @param {number} spawnAmount
 *        石山生成数量
 *
 * @param {number} waitTicks
 *        判定时间
 *
 * @param {number} hurtDamage
 *        对目标造成的伤害值
 *        - 伤害类型为 mobAttack(boss)
 */
function pig$summonRock(boss, level, server, spawnRadius, spawnAmount, waitTicks, hurtDamage) {
    if (!boss.tags.contains("pigboss")) {
        console.warn("[年猪]boss未含有标签！")
        return
    }

    if (boss.persistentData.isBehaving) {
        console.warn("[年猪]年猪执行技能中！")
        return
    }
    boss.persistentData.isBehaving = true

    let $ClipContext = Java.loadClass("net.minecraft.world.level.ClipContext")

    let bossPos = boss.blockPosition()
    let realSpawnRadius = spawnRadius <= 3 ? 5 : spawnRadius

    let spawnPos = []
    let padding = 3
    let minDistSqr = 9
    let maxTry = 20

    for (let i = 0; i < spawnAmount; i++) {
        let placed = false

        for (let j = 0; j < maxTry && !placed; j++) {
            let angle = Math.random() * KMath.PI * 2
            let dist = Math.max(Math.min(Math.sqrt(Math.random()) * realSpawnRadius, realSpawnRadius - padding), 3 + padding)
            let tempPos = bossPos.offset(Math.cos(angle) * dist, 0, Math.sin(angle) * dist)

            let ok = true
            for (let c of spawnPos) {
                if (tempPos.distSqr(c) < minDistSqr) {
                    ok = false
                    break
                }
            }

            if (ok) {
                spawnPos.push(tempPos)
                placed = true
            }
        }
    }

    for (let p of spawnPos) {
        let keys = Object.keys(structureType$ROCK_TYPES)
        let randomKey = keys[Math.floor(Math.random() * keys.length)]
        let randomRock = structureType$ROCK_TYPES[randomKey]
        pig$spawnStructure(level, server, p.below(1), randomRock, 0.3, waitTicks, 0.3)
    }

    let targets = level.getEntities().filter(entity => {
        return entity.tags.contains("pig_eater")
    })

    for (let target of targets) {
        target.setStatusMessage(
            Component.red("警告！请躲在结构后面，否则将会受到伤害！")
        )
    }

    server.scheduleInTicks(waitTicks - 5, event => {
        if (boss.persistentData.isDisabled) {
            event.clear()
            boss.persistentData.isBehaving = false
        }
        for (let target of targets) {
            if (!target.isAlive()) continue

            let from = target.eyePosition
            let to = boss.eyePosition

            let result = level.clip(
                new $ClipContext(
                    from,
                    to,
                    $ClipContext.Block.COLLIDER, // 是否检测实体碰撞箱
                    $ClipContext.Fluid.NONE,     // 是否检测液体
                    target
                )
            )

            level.playSound(
                null,
                bossPos.x,
                bossPos.y,
                bossPos.z,
                "minecraft:entity.generic.explode",
                boss.soundSource,
                3.0,
                0.7
            )

            if (result.type == "MISS") {
                target.addMotion(0, 0.2, 0)
                target.attack(
                    level.damageSources().mobAttack(boss),
                    hurtDamage
                )
            }
        }

        boss.persistentData.isBehaving = false
    })
}