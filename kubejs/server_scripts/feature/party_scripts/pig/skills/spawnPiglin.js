/**
 * [年猪技能] 在 Boss 周围随机坐标召唤免疫转化的猪灵
 * * @description
 * 逻辑流程：
 * 1. 权限校验：检查 {@link boss} 是否拥有 "pigboss" 标签。
 * 2. 状态锁定：通过 `persistentData.isBehaving` 检查并设置技能锁，防止并发触发。
 * 3. 坐标计算：在半径 {@link spawnRadius} 内利用极坐标随机分布算法计算召唤点。
 * 4. 实体生成：召唤 {@link minecraft:piglin} 并通过 `setImmuneToZombification(true)` 阻止其在主世界转化为僵尸猪灵。
 * 5. 自动解锁：使用 {@link server.scheduleInTicks} 在 20 tick (1.0秒) 后释放技能锁。
 * * @param {Internal.LivingEntity} boss       - 触发技能的 Boss 实体实例
 * @param {Internal.Level} level              - 当前世界对象 (用于创建实体)
 * @param {Internal.MinecraftServer} server   - 服务器实例 (用于调度延迟任务)
 * @param {number} spawnRadius                - 召唤猪灵的最大半径
 * @param {number} spawnAmount                - 召唤猪灵的总数量
 * @returns {void}
 */
function pig$spawnPiglin(boss, level, server, spawnRadius, spawnAmount) {
    if (!boss.tags.contains("pigboss")) {
        console.warn("[年猪]boss未含有标签！")
        return
    }

    if (boss.persistentData.isBehaving) {
        console.warn("[年猪]年猪执行技能中！")
        return
    }
    boss.persistentData.isBehaving = true

    let bossPos = boss.blockPosition()

    let spawnPos = []
    for (let i = 0; i < spawnAmount; i++) {
        let tempPos = [server.persistentData.pigPosX + randint(0, 2 * spawnRadius) - spawnRadius, server.persistentData.pigPosY, server.persistentData.pigPosZ + randint(0, 2 * spawnRadius) - spawnRadius]
        spawnPos.push(tempPos)
    }

    for (let p of spawnPos) {
        let piglin = level.createEntity("minecraft:piglin")
        if (piglin == null) continue;
        piglin.setImmuneToZombification(true)
        if (canHappen(0.2)) {
            piglin.setItemSlot("mainhand", Item.of('minecraft:crossbow', '{Damage:0,RepairCost:3}').enchant('minecraft:power', 8).enchant('minecraft:vanishing_curse', 1))
        } else {
            piglin.setItemSlot("mainhand", Item.of('minecraft:golden_axe', '{Damage:0,RepairCost:1}').enchant('minecraft:sharpness', 1).enchant('minecraft:vanishing_curse', 1))
        }
        piglin.tags.add("pig")

        piglin.setPos(p[0], p[1], p[2])
        piglin.spawn()
    }
    server.runCommandSilent(`effect give @e[tag=pig] minecraft:resistance infinite 4 true`)

    server.scheduleInTicks(20, event => {
        boss.persistentData.isBehaving = false
    })
}