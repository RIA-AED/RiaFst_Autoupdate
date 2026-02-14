// 服务器同步骑乘状态
NetworkEvents.dataReceived('update_ride', event => {
    const level = event.player.level
    const vehicle = level.getEntity(event.data.vehicle)
    const seat = level.getEntity(event.data.seatEntity)
    const passenger = level.getEntity(event.data.passenger)

    if (passenger && vehicle && seat) {
        seat.startRiding(vehicle, true)
        passenger.startRiding(seat, true)
    }
})

//检测是取消其他玩家的骑乘
PlayerEvents.tick(event => {
    const { player, level } = event
    if (player == null || level == null) return

    if (global.CANCEL_PLAYER_RIDING.consumeClick() && player.isVehicle() && player.getFirstPassenger().type == "kubejs:player_seat" && player.getFirstPassenger().getFirstPassenger() != null) {
        let passenger = player.getFirstPassenger().getFirstPassenger()
        if (!passenger.isPlayer()) return

        player.setStatusMessage(
            Component.literal("已取消 ")
            .append(passenger.getName())
            .append(" 的骑乘！")
        )
        player.sendData("cancel_player_rided")
    }
})

//检测是否骑乘其他玩家
PlayerEvents.tick(event => {
    const { player, level } = event
    if (player == null || level == null) return

    if (global.RIDE_ANOTHER_PLAYER.consumeClick()) {
        let target = player.rayTrace((player.getAttributeTotalValue("forge:block_reach") || 0) + (player.isCreative() ? 0.5 : 0), false).entity
        if (!target.isPlayer()) return

        player.sendData("ride_player")
    }
})