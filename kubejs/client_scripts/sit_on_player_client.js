ItemEvents.entityInteracted(event => {
    const {target, player} = event;
    if (!player) return;
    if (!target) return;
    if (player.isPassenger()) return;
    if (!target.isPlayer()) return
    if (target.isVehicle()) return;

    player.sendData('ride_player', {})
})

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