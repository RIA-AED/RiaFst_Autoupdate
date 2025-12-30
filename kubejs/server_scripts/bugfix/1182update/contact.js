BlockEvents.placed('contact:red_postbox',event=>{
    if(event.block.offset(0,1,0) == 'minecraft:air'){
        let property = event.block.properties
        let facing = property.facing
        event.block.offset(0,1,0).set('contact:red_postbox',{facing: `${facing}`,half: "bottom"})
        event.server.scheduleInTicks(5,event=>{
            if(event.block != "contact:green_postbox"){
                event.block.offset(0,1,0).set("minecraft:air")
            }
        })
    }else{
        event.cancel()
    }
})
BlockEvents.broken('contact:red_postbox',event=>{
    if(event.block.properties.half == "top"){
        if(event.block.offset(0,1,0) != 'contact:red_postbox'){return}
        event.block.offset(0,1,0).set("minecraft:air")
    }
    if(event.block.properties.half == "bottom"){
        if(event.block.offset(0,-1,0) != 'contact:red_postbox'){return}
        event.block.offset(0,-1,0).set("minecraft:air")
    }
})
BlockEvents.placed('contact:green_postbox',event=>{
    if(event.block.offset(0,1,0) == 'minecraft:air'){
        let property = event.block.properties
        let facing = property.facing
        event.block.offset(0,1,0).set('contact:green_postbox',{facing: `${facing}`,half: "bottom"})
        event.server.scheduleInTicks(5,event=>{
            if(event.block != "contact:green_postbox"){
                event.block.offset(0,1,0).set("minecraft:air")
            }
        })
    }else{
        event.cancel()
    }
})
BlockEvents.broken('contact:green_postbox',event=>{
    if(event.block.properties.half == "top"){
        if(event.block.offset(0,1,0) != 'contact:green_postbox'){return}
        event.block.offset(0,1,0).set("minecraft:air")
    }
    if(event.block.properties.half == "bottom"){
        if(event.block.offset(0,-1,0) != 'contact:green_postbox'){return}
        event.block.offset(0,-1,0).set("minecraft:air")
    }
})

// Define an array of all mailbox colors
const mailboxColors = [
    'white', 'orange', 'magenta', 'light_blue', 
    'yellow', 'lime', 'pink', 'gray', 
    'light_gray', 'cyan', 'purple', 'blue', 
    'brown', 'green', 'red', 'black'
];

// Loop through each color to create the event handlers
mailboxColors.forEach(color => {
    let eventName = `contact:${color}_mailbox`;

    // Placed event handler
    BlockEvents.placed(eventName, event => {
        if (event.block.offset(0, 1, 0) == 'minecraft:air') {
            let property = event.block.properties;
            let facing = property.facing;
            event.block.offset(0, 1, 0).set(`contact:${color}_mailbox`, { facing: `${facing}`, half: "bottom" });
        }
    });

    // Broken event handler
    BlockEvents.broken(eventName, event => {
        if (event.block.offset(0, 1, 0) == eventName) {
            event.block.offset(0, 1, 0).set("minecraft:air");
        }
        if (event.block.offset(0, -1, 0) == eventName) {
            event.block.offset(0, -1, 0).set("minecraft:air");
        }
    });
});
