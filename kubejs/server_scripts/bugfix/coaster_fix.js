//修复胡萝卜厨房杯垫不掉落物品的问题
BlockEvents.broken("kitchenkarrot:coaster", event => {
    const $CoasterBlockEntity = Java.loadClass("io.github.tt432.kitchenkarrot.blockentity.CoasterBlockEntity")
    const { block, level } = event
    let be = level.getBlockEntity(block.pos)
    if (be instanceof $CoasterBlockEntity) {
        let dropsList = be.drops()

        for (let item of dropsList) {
            block.popItem(item)
        }
    }
})