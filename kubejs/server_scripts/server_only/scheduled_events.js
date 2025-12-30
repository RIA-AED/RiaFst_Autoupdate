let renderMapInterval = 345600000 //单位为毫秒

ServerEvents.loaded(event => {
    event.server.scheduleRepeatingInTicks(400,function(callback){
        if(!(event.server.persistentData.lastRenderMap >= 0)){
            event.server.persistentData.lastRenderMap = 0
        }
        if(Date.now() - event.server.persistentData.lastRenderMap >= renderMapInterval){
            event.server.persistentData.lastRenderMap = Date.now()
            event.server.runCommandSilent(`dynmap radiusrender 4000`)
        }
        
        removeEmptyLines(checkerIndexPath)
    })
})