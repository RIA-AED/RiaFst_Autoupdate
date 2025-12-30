BlockEvents.rightClicked(event => {
    const { block, player, hand } = event;

    // 只处理主手
    if (hand !== 'main_hand') return;

    // 空手
    if (!player.mainHandItem.empty) return;

    // 蹲下
    if (!player.isShiftKeyDown()) return;

    //目标方块
    const targets = [
        'chinjufumod:block_kit_oven',
        'chinjufumod:block_kit_oven_black'
    ];

    if (!targets.includes(block.id)) return;

    const props = block.properties;
    const currentLit = props.lit;
    const facing = props.facing;
    const waterlogged = props.waterlogged;

    // 切换 lit
    const newLit = currentLit === 'true' ? 'false' : 'true';

    // 设置新的方块状态（其他属性保持）
    block.set(block.id, {
        facing: facing,
        lit: newLit,
        waterlogged: waterlogged
    });
});
