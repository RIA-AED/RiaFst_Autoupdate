ItemEvents.rightClicked(event => {
    const { player, level, item, hand } = event
    if (!(item.id.startsWith("kaleidoscope_cookery:") && item.id.endsWith("_sickle"))) return
    const block = player.rayTrace((player.getAttributeTotalValue("forge:block_reach") || 0) + (player.isCreative() ? 0.5 : 0), false).block
    if (block == null) return

    let breakCount = 0
    const origin = block.pos

    for (let x = -2; x <= 2; x++) {
        for (let y = 0; y <= 1; y++) {
            for (let z = -2; z <= 2; z++) {
                var pos = origin.offset(x, y, z)
                if (harvestBlock(level, player, item, pos)) {
                    breakCount++
                }
            }
        }
    }

    level.playSound(
        null,
        player.x, player.y, player.z,
        'minecraft:entity.player.attack.sweep',
        player.getSoundSource(),
        1.0, 1.0
    )

    player.swing(hand, true)
    player.sweepAttack()
    var $EquipmentSlot = Java.loadClass("net.minecraft.world.entity.EquipmentSlot")
    item.hurtAndBreak(breakCount, player, p => p.broadcastBreakEvent($EquipmentSlot.MAINHAND))
    player.addItemCooldown(item, 10)

    event.cancel();

    function harvestBlock(level, player, item, pos) {
        let newPos = pos;
        if (!level.mayInteract(player, newPos)) return false

        var blockState = level.getBlockState(newPos)
        if (blockState.isAir()) return false

        if (blockState.is('kaleidoscope_cookery:sickle_harvest_blacklist')) return false

        const block = blockState.block
        const $SickleHarvestEvent = Java.loadClass("com.github.ysbbbbbb.kaleidoscopecookery.api.event.SickleHarvestEvent")
        const $MinecraftForge = Java.loadClass("net.minecraftforge.common.MinecraftForge")
        var event = new $SickleHarvestEvent(player, item, newPos, blockState)
        if ($MinecraftForge.EVENT_BUS.post(event)) {
            return event.isCostDurability();
        }

        const $Block = Java.loadClass("net.minecraft.world.level.block.Block")
        const $CropBlock = Java.loadClass("net.minecraft.world.level.block.CropBlock")
        const $RiceCropBlock = Java.loadClass("com.github.ysbbbbbb.kaleidoscopecookery.block.crop.RiceCropBlock")
        const $LevelEvent = Java.loadClass("net.minecraft.world.level.block.LevelEvent")

        if (block instanceof $CropBlock) {
            //水稻特判
            if (block instanceof $RiceCropBlock) {
                let position = blockState.getValue($RiceCropBlock.LOCATION)
                newPos = pos.below(position)
                blockState = level.getBlockState(newPos)
            }
            if (block.isMaxAge(blockState)) {
                //成熟则收割
                block.playerDestroy(level, player, newPos, blockState, null, ItemStack.EMPTY)
                var stateForAge = block.getStateForAge(0)
                //同步水属性状态
                if (stateForAge.hasProperty(BlockProperties.WATERLOGGED)) {
                    stateForAge = stateForAge.setValue(BlockProperties.WATERLOGGED, blockState.getValue(BlockProperties.WATERLOGGED))
                }
                level.setBlock(newPos, stateForAge, $Block.UPDATE_ALL)
                level.levelEvent(null, $LevelEvent.PARTICLES_DESTROY_BLOCK, newPos, $Block.getId(blockState))
                return true
            }
            return false
        }

        // 如果是灌木，直接破坏
        const $BushBlock = Java.loadClass("net.minecraft.world.level.block.BushBlock")
        if (block instanceof $BushBlock) {
            if (player.isCreative()) {
                level.destroyBlock(pos, false, player)
            } else {
                level.destroyBlock(pos, true, player)
            }
            level.levelEvent(null, $LevelEvent.PARTICLES_DESTROY_BLOCK, newPos, $Block.getId(blockState))
            return true
        }
        return false
    }
})