NetworkEvents.dataReceived('ride_player', event => {
    const player = event.player
    const hit = player.rayTrace(5, false)
    if (!hit || !hit.entity) return
    const target = hit.entity
    if (!target.isPlayer()) return

    let seat = event.level.createEntity("kubejs:player_seat")
    seat.setPos(target.position());

    // 执行骑乘
    event.level.addFreshEntity(seat);
    seat.startRiding(target, true)
    player.startRiding(seat, true)

    // 广播
    event.level.players.forEach(p => {
        p.sendData('update_ride', {
            vehicle: target.getId(),
            seatEntity: seat.getId(),
            passenger: player.getId()
        })
    })
})
