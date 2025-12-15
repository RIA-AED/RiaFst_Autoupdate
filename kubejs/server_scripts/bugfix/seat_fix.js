const AABB = Java.loadClass("net.minecraft.world.phys.AABB")
const BaseEntityJS = Java.loadClass("net.liopyu.entityjs.entities.nonliving.entityjs.BaseEntityJS")
const BCSeatEntity = Java.loadClass("com.mrh0.buildersaddition.entity.SeatEntity")
const CJFSeatEntity = Java.loadClass("com.ayutaki.chinjufumod.entity.SitableEntity")
BlockEvents.rightClicked(event => {
    const { player, block, level } = event;
    const pos = block.pos;

    if (!global.isSeat(block)) return;
    if (player.mainHandItem && player.mainHandItem.id.startsWith("buildersaddition:pillow_")) {
        return;
    }
    if (player.isShiftKeyDown()) return

    let seat = event.level.createEntity("kubejs:seat")

    const seats = level.getEntities(seat, new AABB(pos))
    const seatEntity = seats.filter(e => e instanceof BaseEntityJS);
    let passengers
    // console.log("seats:" + seats);

    if (!seatEntity.isEmpty()) {
        passengers = seatEntity.get(0).getPassengers();

        // console.log("seatEntity: "+seatEntity+" passengers: "+passengers);
        if (!passengers.isEmpty() && passengers.get(0).isPlayer)
            event.cancel()
    }

    const offset = getSeatOffset(block);
    seat.setPos(pos.x + offset.x, pos.y + offset.y, pos.z + offset.z);
    level.addFreshEntity(seat);
    // 让玩家骑乘
    player.startRiding(seat, true);

    // console.log("passengers: " + seat.getPassengers())
    event.cancel();
});

//删除原来的的Seat实体
EntityEvents.spawned(event => {
    const entity = event.getEntity();
    if (entity instanceof BCSeatEntity || entity instanceof CJFSeatEntity) {
        event.cancel();
    }
})

const SeatOffsets = {
    "buildersaddition:sofa": { x: 0.5, y: 0.5625, z: 0.5 },
    "buildersaddition:pillow": { x: 0.5, y: 0.125, z: 0.5 },
    "buildersaddition:stool": { x: 0.5, y: 0.5, z: 0.5 },
    "buildersaddition:chair": { x: 0.5, y: 0.5, z: 0.5 },
    "buildersaddition:bench": { x: 0.5, y: 0.5625, z: 0.5 },
    "chinjufumod:block_diningchair": { x: 0.5, y: 0.5625, z: 0.5 },
    "chinjufumod:block_logchair": { x: 0.5, y: 0.625, z: 0.5 },
    "chinjufumod:block_cafechair": { x: 0.5, y: 0.625, z: 0.5 },
    "chinjufumod:block_sofa": { x: 0.5, y: 0.375, z: 0.5 },
    "chinjufumod:block_bench": { x: 0.5, y: 0.4375, z: 0.5 },
    "chinjufumod:block_schoolchair": { x: 0.5, y: 0.4375, z: 0.5 },
    "chinjufumod:block_admiralchair": { x: 0.5, y: 0.5625, z: 0.5 }
};

global.isSeat = function isSeat(block) {
    if (!block) return false;
    let blockId = block.id;
    for (const prefix in SeatOffsets) {
        if (blockId.startsWith(prefix)) {
            return true;
        }
    }
    return false;
}

function getSeatOffset(block) {
    if (!block) return false;
    let blockId = block.id;
    for (const prefix in SeatOffsets) {
        if (blockId.startsWith(prefix)) {
            return SeatOffsets[prefix];
        }
    }
    return { x: 0.0, y: 0.0, z: 0.0 };
}