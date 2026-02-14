NetworkEvents.dataReceived('ride_player', event => {
    const player = event.player
    const hit = player.rayTrace((player.getAttributeTotalValue("forge:block_reach") || 0) + (player.isCreative() ? 0.5 : 0), false)
    if (!hit || !hit.entity) return
    const target = hit.entity
    if (!target.isPlayer()) return

    let result = ridePlayer(player, target)
    if (result == null) return

    // 广播
    event.level.players.forEach(p => {
        p.sendData('update_ride', {
            vehicle: result.vehicle,
            seatEntity: result.seatEntity,
            passenger: result.passenger
        })
    })

    function ridePlayer(player, target) {
        if (!target) return null

        let current = target
        let depth = 0
        const MAX_DEPTH = 128

        while (true) {
            if (depth++ > MAX_DEPTH) return null

            let first = current.getFirstPassenger()
            if (!first) break

            // 只允许 seat
            if (first.type != "kubejs:player_seat") break

            let next = first.getFirstPassenger()
            if (!next) break

            // 防止自指或环
            if (next == current) break

            current = next
        }

        let seat = event.level.createEntity("kubejs:player_seat")
        seat.setPos(current.position())

        
        player.setStatusMessage(
            Component.literal("正在骑乘 ")
            .append(current.getName())
            .append(" ！")
        )

        event.level.addFreshEntity(seat)
        seat.startRiding(current, true)
        player.startRiding(seat, true)

        return {
            vehicle: current.getId(),
            seatEntity: seat.getId(),
            passenger: player.getId()
        }
    }
})

NetworkEvents.dataReceived("cancel_player_rided", event => {
    const { player } = event

    let seatEntity = player.getFirstPassenger()

    if (seatEntity.type == "kubejs:player_seat") {
        seatEntity.discard()
    }
})