const $ClipContext = Java.loadClass("net.minecraft.world.level.ClipContext")
const $ClipContext$Block = Java.loadClass("net.minecraft.world.level.ClipContext$Block")
const $ClipContext$Fluid = Java.loadClass("net.minecraft.world.level.ClipContext$Fluid")

/**
 * 在 Boss 周围生成一个持续存在的“安全区域”粒子圆环
 *
 * @param {Internal.Entity} boss
 *        Boss 实体，用于获取位置与校验身份（需要包含 pigboss 标签）
 *
 * @param {Internal.Level} level
 *        世界对象，用于生成粒子
 *
 * @param {Internal.MinecraftServer} server
 *        服务器实例，用于调度定时任务（scheduleRepeatingInTicks）
 * 
 * @param {number} spawnRadiusMin
 *        粒子圆环的生成的圆环区域最小半径（以 Boss 为圆心）
 *
 * @param {number} spawnRadiusMax
 *        粒子圆环的生成圆环区域最大半径（以 Boss 为圆心）
 *
 * @param {number} amount
 *        安全区数量
 *
 * @param {number} radius
 *        安全区判定半径
 *
 * @param {number} durationTicks
 *        安全区持续时间（单位：tick）
 * 
 * @returns {Array<{
 *   pos: Internal.BlockPos,
 *   r: number
 * }> | null}
 *
 * 返回所有安全区小圆的判定数据数组。
 * 每个元素表示一个安全区：
 *  - pos：小圆圆心位置
 *  - r：判定半径
 *
 * 若 Boss 不符合条件（未包含 pigboss 标签），返回 null。
 */
function pig$spawnSafeArea(boss, level, server, spawnRadiusMin, spawnRadiusMax, amount, radius, durationTicks) {
    if (!boss.tags.contains("pigboss")) return null

    var center = boss.blockPosition();
    const safeCirlces = []
    const padding = 0.5 //小圆之间以及小圆和大圆之间的距离缓冲，避免相切
    const minDistAqr = Math.pow(radius * 2 + padding, 2)
    const maxTry = 20

    //随机生成amount个不重叠的小圆圆心
    for (let i = 0; i < amount; i++) {
        let placed = false

        for (let t = 0; t < maxTry && !placed; t++) {
            var angle = Math.random() * KMath.PI * 2
            var dist = Math.max(Math.min(Math.sqrt(Math.random()) * spawnRadiusMax, spawnRadiusMax - radius - padding), spawnRadiusMin + radius + padding)
            var tempPos = center.offset(Math.cos(angle) * dist, 0, Math.sin(angle) * dist)

            let ok = true
            for (let c of safeCirlces) {
                if (tempPos.distSqr(c.pos) < minDistAqr) {
                    ok = false
                    break
                }
            }

            if (ok) {
                safeCirlces.push({
                    pos: tempPos,
                    r: radius
                })
                placed = true
            }
        }
    }

    //绘制小圆
    let tick = 0
    server.scheduleRepeatingInTicks(6, e => {
        try {
            if (tick >= durationTicks / 6) e.clear()

            //绘制小圆生成的圆环区域
            pig$spawnCircleParticles(level, spawnRadiusMin, center, 0.1, "minecraft:soul_fire_flame")
            pig$spawnCircleParticles(level, spawnRadiusMax, center, 0.1, "minecraft:soul_fire_flame")

            //绘制小圆（安全区）
            for (let c of safeCirlces) {
                pig$spawnCircleParticles(level, c.r, c.pos, 0.1, "minecraft:happy_villager")
            }

            tick++
        } catch (w) {
            console.error(w)
            e.clear()
        }
    })

    return safeCirlces
}

/**
 * 在指定位置生成一个圆形分布的粒子效果
 *
 * @param {Internal.Level} level
 *        世界对象，用于生成粒子（一般来自 event.level）
 *
 * @param {number} radius
 *        圆形半径，决定粒子距离中心点的水平距离
 *
 * @param {{x:number,y:number,z:number} | BlockPos} centerPos
 *        圆心坐标，粒子将围绕该点生成
 *
 * @param {number} yOffset
 *        Y 轴偏移量，在圆心高度基础上增加/减少的高度
 *
 * @param {Internal.ParticleOptions_ | string} particlesType
 *        粒子类型，如 "minecraft:flame"、"minecraft:smoke"
 */
function pig$spawnCircleParticles(level, radius, centerPos, yOffset, particlesType) {
    const amount = 2 * KMath.PI * radius / 0.5
    for (let i = 0; i < amount; i++) {
        let angle = (2 * KMath.PI / amount) * i
        let x = centerPos.x + radius * Math.cos(angle)
        let z = centerPos.z + radius * Math.sin(angle)
        let y = centerPos.y + yOffset

        level.spawnParticles(
            particlesType,
            true,
            x, y, z,
            0.1, 0.1, 0.1,
            1,
            0
        )
    }
}

/**
 * 广播剧情文本
 * @param {Internal.ItemClickedEventJS | Internal.BlockRightClickedEventJS | Internal.LivingEntityHurtEventJS} event
 *        事件对象
 * @param {string[]} lores
 *        文本
 * @param {number} tickPerLine
 *        每行文本持续长度
 */
function pigLoreBoardcast(event, lores, tickPerLine) {
    let counter = 0;
    lores.forEach(it => {
        event.server.scheduleInTicks(tickPerLine * counter, func => {
            event.server.tell(it)
        })
        counter++
    })
    return tickPerLine * lores.length
}

/**
 * 在指定位置生成一个 Create 矿车装配体，并使其以“自下而上”的方式出现，
 * 到达目标高度后自动卸载装配体，并在指定延迟后（可选）清除其 Superglue
 * 包围盒范围内的方块。
 *
 * 本方法用于事件 / Boss / 场景结构的动态生成，具备完整生命周期管理：
 * - 以 minecart_contraption 作为装配体载体
 * - 根据 Contraption.Superglue 的 From / To 计算真实高度与清理区域
 * - 支持生成过程中的水平震动效果
 * - 支持结构卸载后延迟清理或永久保留
 *
 * ─────────────────────────────
 * 执行流程说明：
 * 1. 使用 structureType（SNBT）构造 MinecartContraptionItem
 * 2. 解析 Contraption.Superglue（局部坐标）并计算最大 Y 偏移值
 * 3. 在 spawnPos 下方生成矿车实体，并逐 tick 向上移动
 * 4. 到达目标高度后：
 *    - 卸载装配体
 *    - 销毁矿车实体
 *    - 根据 surviveTicks 决定是否延迟清除 Superglue 范围内的方块
 *
 * ─────────────────────────────
 * Superglue 坐标说明：
 * - SNBT 中的 From / To 坐标为「装配体局部坐标」
 * - 实际清理范围 = 局部坐标 + 卸载时矿车的世界坐标
 *
 * ─────────────────────────────
 * @param {Internal.Level} level
 *        当前世界对象，用于生成实体与清理方块
 *
 * @param {Internal.MinecraftServer} server
 *        服务器对象，用于调度 tick 任务（scheduleInTicks / scheduleRepeatingInTicks）
 *
 * @param {{x:number,y:number,z:number} | BlockPos} spawnPos
 *        结构生成的基准坐标（通常为 Boss 或事件中心点）
 *
 * @param {string} structureType
 *        Create 装配体的 SNBT 字符串，必须包含完整且合法的 Contraption 数据，
 *        且至少包含一个 Superglue 定义
 *
 * @param {number} riseSpeed
 *        装配体每 tick 上升的高度：
 *        - > 0 ：以动画方式从下向上生成
 *        - ≤ 0 ：直接在目标位置生成（无上升动画）
 *
 * @param {number} surviveTicks
 *        装配体卸载后的存活 tick 数：
 *        - ≥ 0 ：在延迟后清除 Superglue 范围内的方块
 *        - < 0 ：不进行清理，结构永久保留
 *
 * @param {number} vibration
 *        上升过程中的水平抖动幅度，用于制造震动 / 出现动画效果
 *        （建议范围：0 ~ 0.3）
 *
 * @returns {{
 *   AABB: net.minecraft.world.phys.AABB,
 *   spawnPos: {x:number,y:number,z:number} | BlockPos
 * } | null}
 *        返回值说明：
 *        - AABB：基于 Superglue 局部坐标生成的包围盒（未转换为世界坐标），
 *                可用于后续判定 / 调试 / 可视化
 *        - spawnPos：结构生成时的基准坐标
 *        - 若 structureType 不合法，则返回 null
 *
 * @throws
 *        本方法内部会捕获所有运行时异常，
 *        出现异常时将记录错误日志并强制终止所有调度任务，
 *        以避免产生悬空矿车或无限 tick 调度
 */
function pig$spawnStructure(level, server, spawnPos, structureType, riseSpeed, surviveTicks, vibration) {
    if (!(structureType.startsWith("{") && structureType.endsWith("}"))) {
        console.error("[年猪]structureType不合法")
        return null
    }
    const $MinecartContraptionItem = Java.loadClass("com.simibubi.create.content.contraptions.mounted.MinecartContraptionItem")
    const $AABB = Java.loadClass("net.minecraft.world.phys.AABB")
    const minecartItem = Item.of("create:minecart_contraption", structureType)
    const minecart = level.createEntity("minecraft:minecart")
    var from = null
    var to = null
    try {
        from = {
            x: minecartItem.nbt.get("Contraption").get("Superglue").getCompound(0).get("From").getDouble(0),
            y: minecartItem.nbt.get("Contraption").get("Superglue").getCompound(0).get("From").getDouble(1),
            z: minecartItem.nbt.get("Contraption").get("Superglue").getCompound(0).get("From").getDouble(2)
        }
        to = {
            x: minecartItem.nbt.get("Contraption").get("Superglue").getCompound(0).get("To").getDouble(0),
            y: minecartItem.nbt.get("Contraption").get("Superglue").getCompound(0).get("To").getDouble(1),
            z: minecartItem.nbt.get("Contraption").get("Superglue").getCompound(0).get("To").getDouble(2)
        }
    } catch (e) {
        console.error("[年猪]错误: " + e)
        return null
    }

    let maxY = Math.max(from.y, to.y)
    if (maxY == null || riseSpeed <= 0) maxY = 0;
    minecart.setPos(spawnPos.x + 0.5, spawnPos.y - maxY, spawnPos.z + 0.5)
    minecart.spawn()
    $MinecartContraptionItem.addContraptionToMinecart(level, minecartItem, minecart, null)

    let counter = 1 //计数器
    server.scheduleRepeatingInTicks(1, event => {
        try {
            if (counter * riseSpeed > maxY || maxY <= 0) {
                server.scheduleInTicks(10, event => {
                    var discardPos = minecart.blockPosition()
                    var newFrom = null
                    var newTo = null
                    if (minecart.nbt.contains("Passengers")) {
                        var passengers = minecart.nbt.get("Passengers")
                        if (passengers.getCompound(0).contains("Contraption")) {
                            newFrom = {
                                x: from.x + discardPos.x,
                                y: from.y + discardPos.y,
                                z: from.z + discardPos.z
                            }

                            newTo = {
                                x: to.x + discardPos.x,
                                y: to.y + discardPos.y - 1,
                                z: to.z + discardPos.z
                            }
                        } else {
                            console.error("[年猪]该矿车没有装配体: " + minecart)
                            event.clear()
                        }
                    } else {
                        console.error("[年猪]该矿车没有装配体: " + minecart)
                        event.clear()
                    }

                    minecart.discard()
                    if (newFrom != null && newTo != null) {
                        var box = new $AABB(newFrom.x, newFrom.y, newFrom.z, newTo.x, newTo.y, newTo.z)
                        let superglueEntity = level.createEntity("create:super_glue")
                        var entities = level.getEntities(superglueEntity, box).filter(entity => {//清除强力胶包围盒里的强力胶实体和挤压导致的掉落物
                            return (entity.type == "create:super_glue" || entity.type == "minecraft:item") && entity.age <= 1
                        })
                        for (let e of entities) {
                            e.discard()
                        }
                    }

                    if (surviveTicks >= 0) {
                        server.scheduleInTicks(surviveTicks, event => {
                            if (newFrom != null && newTo != null) {
                                pig$clearBox(level, newFrom, newTo)
                            }
                        })
                    }

                })
                event.clear()
            }

            let vibrationX = (Math.sqrt(Math.random()) * 2 - 1) * vibration
            let vibrationZ = (Math.sqrt(Math.random()) * 2 - 1) * vibration
            minecart.setPos(spawnPos.x + 0.5 + vibrationX, spawnPos.y - maxY + riseSpeed * counter, spawnPos.z + 0.5 + vibrationZ)

            counter++
        } catch (e) {
            console.error("[年猪]错误: " + e)
            event.clear()
        }
    })

    return {
        AABB: new $AABB(from.x, from.y, from.z, to.x, to.y - 1, to.z),
        spawnPos: spawnPos
    }
}

/**
 * 在指定世界范围内清除方块，并移除范围内的 Create Super Glue 实体
 *
 * 功能说明：
 * 1. 根据 from / to 构造一个 AABB 范围盒
 * 2. 查找该范围内的 create:super_glue 实体并将其移除
 * 3. 遍历范围内的所有方块坐标并销毁非空气方块
 *
 * ⚠ 注意事项：
 * - from / to 应当是「世界坐标」（而非局部坐标）
 * - 若范围过大，可能导致服务器卡顿
 *
 * @param {Internal.Level} level
 *        世界对象（ServerLevel）
 *
 * @param {{x:number, y:number, z:number} | BlockPos} from
 *        清除范围的起始坐标（最小角，世界坐标）
 *
 * @param {{x:number, y:number, z:number} | BlockPos} to
 *        清除范围的结束坐标（最大角，世界坐标）
 */
function pig$clearBox(level, from, to) {
    let $AABB = Java.loadClass("net.minecraft.world.phys.AABB")
    let box = new $AABB(from.x, from.y, from.z, to.x, to.y, to.z)
    let superglueEntity = level.createEntity("create:super_glue")
    var entities = level.getEntities(superglueEntity, box).filter(entity => {
        return entity.type == "create:super_glue"
    })
    for (let e of entities) {
        e.discard()
    }
    for (let x = from.x; x <= to.x; x++) {
        for (let y = from.y; y <= to.y; y++) {
            for (let z = from.z; z <= to.z; z++) {
                let pos = BlockPos(x, y, z)

                if (level.isEmptyBlock(pos)) continue

                level.destroyBlock(pos, false)
            }
        }
    }
}


/**
 * Boss 朝目标自适应跳扑（自动计算水平速度）
 *
 * @param {Internal.Entity} boss
 * @param {Internal.Entity} target
 * @param {number} jumpPower 垂直跳跃力（推荐 0.6 ~ 1.0）
 */
function pig$jumpToTarget(boss, target, jumpPower) {
    let $Anchor = Java.loadClass("net.minecraft.commands.arguments.EntityAnchorArgument$Anchor")

    // 位置
    let bx = boss.x
    let bz = boss.z
    let tx = target.x
    let tz = target.z

    // 水平方向
    let dx = tx - bx
    let dz = tz - bz

    let distance = Math.sqrt(dx * dx + dz * dz)
    if (distance < 0.4) return

    // 方向归一化
    dx /= distance
    dz /= distance

    let speed = distance / jumpPower / 5.5

    // 朝向目标（视觉）
    boss.lookAt($Anchor.EYES, target.getEyePosition())
    boss.lookAt($Anchor.FEET, target.getEyePosition())

    // 物理跳跃
    boss.setMotion(
        dx * speed,
        jumpPower,
        dz * speed
    )

    // 防止摔落伤害
    boss.fallDistance = 0
}

/**
 * 在两点之间生成连线粒子
 *
 * @param {Internal.Level} level
 * @param {{x:number,y:number,z:number}} fromPos
 * @param {{x:number,y:number,z:number}} toPos
 * @param {number} step
 * @param {Internal.ParticleOptions_ | string} particleType
 */
function pig$spawnLineParticles(level, fromPos, toPos, step, particleType) {
    let dx = toPos.x - fromPos.x
    let dy = toPos.y - fromPos.y
    let dz = toPos.z - fromPos.z
    let dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
    if (dist <= 0.01) return
    let steps = Math.max(1, Math.floor(dist / Math.max(0.2, step)))
    for (let i = 0; i <= steps; i++) {
        let t = i / steps
        level.spawnParticles(
            particleType,
            true,
            fromPos.x + dx * t,
            fromPos.y + dy * t,
            fromPos.z + dz * t,
            0.01, 0.01, 0.01,
            1,
            0
        )
    }
}

/**
 * 获取参战玩家列表（包含 pig_eater 标签，且非旁观者）
 * @param {Internal.Level} level
 * @returns {Internal.Player[]}
 */
function pig$getPigEaterPlayers(level) {
    let result = []
    let players = level.getPlayers()
    for (let i = 0; i < players.size(); i++) {
        let p = players.get(i)
        if (!p || p.isSpectator()) continue
        if (p.tags && !p.tags.contains("pig_eater")) continue
        result.push(p)
    }
    return result
}

/**
 * 获取 Boss 中心点
 * @param {Internal.Entity} boss
 * @param {number} yOffset
 * @returns {{x:number,y:number,z:number}}
 */
function pig$getBossCenter(boss, yOffset) {
    return {
        x: boss.pos.x(),
        y: boss.pos.y() + (yOffset || 0),
        z: boss.pos.z()
    }
}

/**
 * 获取玩家眼高位置（优先 getEyeHeight）
 * @param {Internal.Entity} player
 * @param {number} fallbackOffset
 * @returns {{x:number,y:number,z:number}}
 */
function pig$getPlayerEyePos(player, fallbackOffset) {
    let eyeY = player.pos.y() + (fallbackOffset == null ? 1.5 : fallbackOffset)
    if (typeof player.getEyeHeight === "function") {
        try { eyeY = player.pos.y() + player.getEyeHeight() } catch (e) {}
    }
    return { x: player.pos.x(), y: eyeY, z: player.pos.z() }
}

/**
 * 直线射线是否被方块阻挡
 * @param {Internal.Level} level
 * @param {{x:number,y:number,z:number}} from
 * @param {{x:number,y:number,z:number}} to
 * @returns {boolean}
 */
function pig$raycastBlocked(level, from, to) {
    let start = new $Vec3(from.x, from.y, from.z)
    let end = new $Vec3(to.x, to.y, to.z)
    let context = new $ClipContext(
        start,
        end,
        $ClipContext$Block.COLLIDER,
        $ClipContext$Fluid.NONE,
        null
    )
    let hitResult = level.clip(context)
    if (!hitResult || !hitResult.getType) return false
    return String(hitResult.getType()) === "BLOCK"
}

/**
 * 获取射线命中方块的距离（未命中返回 fallbackDistance）
 * @param {Internal.Level} level
 * @param {{x:number,y:number,z:number}} from
 * @param {{x:number,y:number,z:number}} to
 * @param {number} fallbackDistance
 * @returns {number}
 */
function pig$raycastHitDistance(level, from, to, fallbackDistance) {
    let start = new $Vec3(from.x, from.y, from.z)
    let end = new $Vec3(to.x, to.y, to.z)
    let context = new $ClipContext(
        start,
        end,
        $ClipContext$Block.COLLIDER,
        $ClipContext$Fluid.NONE,
        null
    )
    let hitResult = level.clip(context)
    if (!hitResult || !hitResult.getType) return fallbackDistance
    if (String(hitResult.getType()) !== "BLOCK") return fallbackDistance
    if (!hitResult.getLocation) return fallbackDistance

    let hitPos = hitResult.getLocation()
    let hx = typeof hitPos.x === "number" ? hitPos.x : hitPos.x()
    let hy = typeof hitPos.y === "number" ? hitPos.y : hitPos.y()
    let hz = typeof hitPos.z === "number" ? hitPos.z : hitPos.z()
    let dx = hx - from.x
    let dy = hy - from.y
    let dz = hz - from.z
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

/**
 * 从数组中随机选取指定数量元素（不重复）
 *
 * @param {Array} list
 * @param {number} count
 * @returns {Array}
 */
function pig$pickRandomTargets(list, count) {
    let result = []
    let pool = list.slice()
    let amount = Math.min(count, pool.length)
    for (let i = 0; i < amount; i++) {
        let idx = Math.floor(Math.random() * pool.length)
        result.push(pool.splice(idx, 1)[0])
    }
    return result
}

//技能控制函数
function pig$controller(pigEntity, level, server) {

}