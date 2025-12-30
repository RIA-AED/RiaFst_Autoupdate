ItemEvents.rightClicked("wooden_shovel",event=>{
    if(event.player.persistentData.signType == undefined){event.player.persistentData.signType = 0;}
    if(event.player.isCrouching() == false){
        //event.player.tell("000")
        let time = new Date().getTime()
        let cnt = 0
        for(let x = -6;x<=6;x++){
            for(let y = -6;y<=6;y++){
                for(let z = -6;z<=6;z++){
                    let block = event.player.block.offset(x,y,z)
                    let id = block.id.toString()
                    if(id != "minecraft:crimson_wall_sign" && id != "minecraft:crimson_sign"){continue;}
                    let data = block.entityData
                    if(id=="minecraft:crimson_wall_sign"){
                        let state = block.properties.facing
                        block.set(wallSignTypes[event.player.persistentData.signType],{facing : `${state}`})
                    }else{
                        let state = block.properties.rotation
                        block.set(signTypes[event.player.persistentData.signType],{rotation : `${state}`})
                    }
                    //data.putString("originColor",`${originColor}`)
                    block.mergeEntityData(data)
                    cnt++
                }
            }
        }
        let time2 = new Date().getTime()
        event.player.tell(`执行完成！替换了${cnt}个告示牌，耗时${((time2 - time) / 1000).toFixed(2)}秒`)
        event.player.addItemCooldown("wooden_shovel",20)
    }else{
        event.player.persistentData.signType++
        if(event.player.persistentData.signType >= signTypes.length){
            event.player.persistentData.signType = 0
        }
        event.player.tell(`当前替换：${Item.of(signTypes[event.player.persistentData.signType]).getDisplayName().getString()}`)
    }
})

let signTypes = [
    "farmersdelight:canvas_sign",
    "farmersdelight:white_canvas_sign",
    "farmersdelight:light_gray_canvas_sign",
    "farmersdelight:gray_canvas_sign",
    "farmersdelight:black_canvas_sign",
    "farmersdelight:brown_canvas_sign",
    "farmersdelight:red_canvas_sign",
    "farmersdelight:orange_canvas_sign",
    "farmersdelight:yellow_canvas_sign",
    "farmersdelight:lime_canvas_sign",
    "farmersdelight:green_canvas_sign",
    "farmersdelight:cyan_canvas_sign",
    "farmersdelight:light_blue_canvas_sign",
    "farmersdelight:blue_canvas_sign",
    "farmersdelight:purple_canvas_sign",
    "farmersdelight:magenta_canvas_sign",
    "farmersdelight:pink_canvas_sign",
]

let wallSignTypes = [
    "farmersdelight:canvas_wall_sign",
    "farmersdelight:white_canvas_wall_sign",
    "farmersdelight:light_grey_canvas_wall_sign",
    "farmersdelight:grey_canvas_wall_sign",
    "farmersdelight:black_canvas_wall_sign",
    "farmersdelight:brown_canvas_wall_sign",
    "farmersdelight:red_canvas_wall_sign",
    "farmersdelight:orange_canvas_wall_sign",
    "farmersdelight:yellow_canvas_wall_sign",
    "farmersdelight:lime_canvas_wall_sign",
    "farmersdelight:green_canvas_wall_sign",
    "farmersdelight:cyan_canvas_wall_sign",
    "farmersdelight:light_blue_canvas_wall_sign",
    "farmersdelight:blue_canvas_wall_sign",
    "farmersdelight:purple_canvas_wall_sign",
    "farmersdelight:magenta_canvas_wall_sign",
    "farmersdelight:pink_canvas_wall_sign",
]