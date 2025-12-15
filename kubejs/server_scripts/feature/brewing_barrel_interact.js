BlockEvents.rightClicked('kubejs:brewing_barrel', event => {
    if (event.hand !== 'MAIN_HAND') return;
    const { player, block } = event;
    const be = block.entity;
    if (!(be instanceof BlockEntityJS)) return;

    const handItem = player.mainHandItem;

    function takeSlot(slot) {
        if (!be.data.contains(slot)) return null;
        const nbt = be.data.getCompound(slot);
        const stack = Item.of(nbt.getString('id'), nbt.getByte('Count'), nbt.get('tag'));
        be.data.remove(slot);
        be.sync();
        return stack;
    }

    function putSlot(slot, stack) {
        if (be.data.contains(slot)) return false;
        const copy = stack.copyWithCount(1);
        be.data.put(slot, copy.serializeNBT());
        be.sync();
        if (!player.isCreative()) stack.shrink(1);
        player.swing();
        return true;
    }

    if (handItem.isEmpty()) {
        for (let i = 6; i >= 1; i--) {
            let out = takeSlot(`slot${i}`);
            if (out) {
                player.give(out);
                player.swing();
                break;
            }
        }
    } else {
        // if (!ALLOWED_ITEMS.includes(handItem.id)) return;
        for (let i = 1; i <= 6; i++) {
            if (putSlot(`slot${i}`, handItem)) break;
        }
    }

    event.cancel();
});

BlockEvents.broken('kubejs:brewing_barrel', event => {
    const { level, block } = event;
    if (level.client) return;
    const be = block.entity;
    if (!(be instanceof BlockEntityJS)) return;

    function dropSlot(slot) {
        if (!be.data.contains(slot)) return;
        const nbt = be.data.getCompound(slot);
        const stack = Item.of(nbt.getString('id'), nbt.getByte('Count'), nbt.get('tag'));
        if (stack.empty) return;
        block.popItem(stack);
    }

    for (let i = 1; i <= 6; i++) dropSlot(`slot${i}`);
});