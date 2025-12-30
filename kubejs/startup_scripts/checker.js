StartupEvents.registry("entity_type",event=>{
    event.create("rocket", "entityjs:nonliving").isPushable(false).sized(1, 6).displayName("火箭")
    //event.create("checker_entity", "entityjs:nonliving").isPushable(false).sized(5, 3).displayName("检查站")
})

StartupEvents.registry("block",event=>{
    event.create("checker").displayName("检查站")
})