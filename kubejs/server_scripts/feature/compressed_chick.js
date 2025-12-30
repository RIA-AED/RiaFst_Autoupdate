EntityEvents.hurt("minecraft:chicken",event=>{
    if(event.getSource().getPlayer().mainHandItem.id != "kubejs:delta_coin"){
        return
    }
    if(event.entity.tags.contains("CompressedChicken")){
        return
    }
    event.getSource().getPlayer().mainHandItem.count --
    var chicken = event.level.createEntity("minecraft:chicken")
    chicken.addTag("CompressedChicken")
    chicken.mergeNbt(`{NoAI:1b,PersistenceRequired:1b,Silent:1b,EggLayTime:-1}`)
    chicken.setPos(event.entity.pos)
    chicken.spawn()
    event.entity.kill()
    event.server.runCommandSilent(`execute as @e[tag=CompressedChicken] at @s run kill @e[distance=..1,tag=!CompressedChicken,type=minecraft:chicken]`)
})

ServerEvents.loaded(event => {
    event.server.scheduleRepeatingInTicks(1200,function(callback){
        event.server.runCommandSilent(`execute as @e[tag=CompressedChicken] at @s run summon minecraft:item ~ ~ ~ {Item:{id:"minecraft:egg",Count:8b}}`)
    })
})