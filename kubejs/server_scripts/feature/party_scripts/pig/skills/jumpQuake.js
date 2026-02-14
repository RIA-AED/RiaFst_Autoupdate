/**
 * 年猪技能：随机锁定范围内的指定数量玩家，依次跳跃至目标位置，
 * 落地时造成范围冲击伤害与击飞效果（“飞天大草”）。
 *
 * ───────────────────────
 * 技能流程说明：
 * 1. 校验 Boss 是否为年猪（需包含 pigboss 标签）
 * 2. 若年猪当前正在执行其他技能（isBehaving），则直接中断
 * 3. 在以 Boss 为圆心的检测范围内筛选可攻击目标（需包含 pig_eater 标签）
 * 4. 根据 targetCount 随机选取攻击目标列表
 * 5. 年猪按顺序跳向每个目标
 * 6. 每次落地检测落地瞬间：
 *    - 在指定半径内生成爆炸粒子
 *    - 对低于一定高度差的目标造成伤害与击飞
 * 7. 技能结束后恢复年猪可行动状态
 *
 * ───────────────────────
 * ⚠ 注意事项：
 * - 本技能会占用 boss.persistentData.isBehaving 作为互斥锁
 * - 落地检测通过 onGround 状态变化判断
 * - 使用 scheduleRepeatingInTicks，请确保在异常时正确 clear
 * - 攻击目标需携带 pig_eater 标签，否则不会被选中
 *
 * @param {Internal.LivingEntity} boss
 *        年猪 Boss 实体
 *        - 必须包含 "pigboss" 标签
 *        - 使用 persistentData.isBehaving 控制技能互斥
 *
 * @param {Internal.Level} level
 *        世界对象
 *        - 用于实体查询（getEntitiesWithin）
 *        - 用于生成粒子与造成伤害
 *
 * @param {Internal.MinecraftServer} server
 *        服务器实例
 *        - 用于调度技能阶段定时器（scheduleRepeatingInTicks）
 *
 * @param {number} detectRadius
 *        目标检测半径（方块单位）
 *        - 以 Boss 为圆心
 *        - 超出该半径的实体即使在 AABB 内也会被剔除
 *
 * @param {number} targetCount
 *        随机选取的攻击目标数量
 *        - 若大于检测范围内有效目标数量，则攻击所有目标
 *        - 实际攻击顺序为随机结果的顺序
 *
 * @param {number} hurtDist
 *        年猪落地时的冲击伤害半径
 *        - 用于构建落地伤害 AABB
 *
 * @param {number} hurtDamage
 *        年猪落地时对目标造成的伤害值
 *        - 伤害类型为 mobAttack(boss)
 */
function pig$jumpQuake(boss, level, server, detectRadius, targetCount, hurtDist, hurtDamage) {
    if (!boss.tags.contains("pigboss")) {
        console.warn("[年猪]boss未含有标签！")
        return
    }

    if (boss.persistentData.isBehaving) {
        console.warn("[年猪]年猪执行技能中！")
        return
    }
    boss.persistentData.isBehaving = true

    const $AABB = Java.loadClass("net.minecraft.world.phys.AABB")
    const $ArrayList = Java.loadClass("java.util.ArrayList")
    var bossPos = boss.blockPosition()
    const detectBox = new $AABB(
        bossPos.x - detectRadius, bossPos.y - 1, bossPos.z - detectRadius,
        bossPos.x + detectRadius, bossPos.y + 3, bossPos.z + detectRadius)
    const targets = level.getEntitiesWithin(detectBox).filter(entity => {
        return entity.tags.contains("pig_eater")
    })

    if (targets.isEmpty()) {
        boss.persistentData.isBehaving = false
        return
    }

    for (let e of targets) {
        let distSqr = bossPos.distSqr(e.blockPosition())

        if (distSqr > Math.pow(detectRadius, 2)) {
            targets.remove(e)
        } else continue
    }

    if (targets.isEmpty()) {
        boss.persistentData.isBehaving = false
        return
    }

    const amount = Math.min(targets.size(), targetCount)
    let finalTargets = new $ArrayList()

    if (amount == targets.size()) {
        finalTargets = targets
    } else {
        var tryCount = 50
        for (let i = 1; i <= tryCount && finalTargets.size() < amount; i++) {
            let idx = Math.floor(Math.random() * targets.size())
            if (!finalTargets.contains(targets.get(idx))) {
                finalTargets.add(targets.get(idx))
            }
        }
    }

    let hurtBox
    let lastOnGround = boss.onGround()
    let needHeight = 0.5
    let attackAim = 0
    let fallDetectSchedule = server.scheduleRepeatingInTicks(1, event => {
        try {
            if (boss.onGround() != lastOnGround && boss.onGround()) {
                bossPos = boss.blockPosition()
                hurtBox = new $AABB(
                    bossPos.x - hurtDist, bossPos.y, bossPos.z - hurtDist,
                    bossPos.x + hurtDist, bossPos.y + 3, bossPos.z + hurtDist)

                let hurtEntities = level.getEntitiesWithin(hurtBox).filter(entity => {
                    return entity.tags.contains("pig_eater") && (Math.abs(entity.position().get(1) - bossPos.y) < needHeight)
                })

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

                for (let x = hurtBox.minX; x <= hurtBox.maxX; x++) {
                    for (let z = hurtBox.minZ; z <= hurtBox.maxZ; z++) {
                        level.spawnParticles(
                            "minecraft:explosion",
                            true,
                            x, hurtBox.minY, z,
                            0.1, 0, 0.1,
                            1,
                            0
                        )
                    }
                }

                hurtEntities.forEach(p => {
                    p.addMotion(0, 0.3, 0)
                    p.attack(
                        level.damageSources().mobAttack(boss),
                        hurtDamage
                    )
                })
            }

            boss.fallDistance = 0
            lastOnGround = boss.onGround()
        } catch (e) {
            console.error("[年猪]状态检测失败: " + e)
            event.clear()
        }
    })
    server.scheduleRepeatingInTicks(60, event => {
        try {
            if (attackAim >= finalTargets.size() - 1 || !boss.isAlive() || boss.persistentData.isDisabled) {
                boss.persistentData.isBehaving = false
                server.scheduleInTicks(40, event => {
                    fallDetectSchedule.clear()
                })
                event.clear()
            }

            pig$jumpToTarget(boss, finalTargets.get(attackAim), 1.3)
            attackAim++
        } catch (e) {
            console.error("[年猪]技能执行失败: " + e)
            boss.persistentData.isBehaving = false
            event.clear()
        }
    })
}