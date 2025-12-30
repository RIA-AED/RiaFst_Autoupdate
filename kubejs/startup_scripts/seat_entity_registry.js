const BlockPos = Java.loadClass("net.minecraft.core.BlockPos");
StartupEvents.registry("entity_type", event => {
    event.create('seat', "entityjs:nonliving")
        .clientTrackingRange(20)
        .setRenderType("solid")
        .sized(0, 0)
        .modelSize(0, 0)
        .tick(entity => {
            if (entity.age < 3) return;
            const blockPresent = entity.level.getBlockState(entity.position()).getBlock();
            if (entity.isVehicle() && global.isSeat(blockPresent))
                return;
            entity.discard();
        })
        .canAddPassenger(context => {
            const maxPassengers = 1;
            return context.entity.getPassengers().size() < maxPassengers;
        })
        .positionRider(context => {
            const { entity, passenger, moveFunction } = context;

            const x = entity.getX();
            const y = entity.getY();
            const z = entity.getZ();

            const offsetY = -0.6;

            moveFunction.accept(passenger, x, y + offsetY, z);
        })
})

StartupEvents.registry("entity_type", event => {
    event.create('player_seat', "entityjs:nonliving")
        .clientTrackingRange(20)
        .setRenderType("solid")
        .sized(0, 0)
        .modelSize(0, 0)
        .tick(entity => {
            if (entity.age < 3) return;
            if (entity.isVehicle() && entity.isPassenger())
                return;
            entity.discard();
        })
        .canAddPassenger(context => {
            const maxPassengers = 1;
            return context.entity.getPassengers().size() < maxPassengers;
        })        
        .positionRider(context => {
            const { entity, passenger, moveFunction } = context;

            const x = entity.getX();
            const y = entity.getY();
            const z = entity.getZ();

            const offsetY = 0.3;

            moveFunction.accept(passenger, x, y + offsetY, z);
        })
})