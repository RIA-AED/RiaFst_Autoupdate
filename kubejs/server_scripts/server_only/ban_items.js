//illegal：为真时警告使用的玩家并记录到日志config/illegal_list.txt
//industry_allow: 此物品是否在工业服可用
let Ban_List = [{ name: "create:creative_motor", illegal: true, industry_allow: false },
{ name: "create:creative_fluid_tank", illegal: true, industry_allow: false },
{ name: "create:creative_crate", illegal: true, industry_allow: false },
{ name: "storageddrawers:creative_vending_upgrade", illegal: true, industry_allow: false },
{ name: "storageddrawers:creative_storage_upgrade", illegal: true, industry_allow: false },
{ name: "createaddition:creative_energy", illegal: true, industry_allow: false },
{ name: "create:creative_blaze_cake", illegal: true, industry_allow: false },
{ name: "ae2:creative_energy_cell", illegal: true, industry_allow: false },
{ name: "ae2:creative_item_cell", illegal: true, industry_allow: false },
{ name: "ae2:creative_fluid_cell", illegal: true, industry_allow: false },
{ name: "createbigcannons:creative_autocannon_ammo_container", illegal: true, industry_allow: false },
{ name: "armourers_workshop:skin-library-creative", illegal: true, industry_allow: false },
{ name: "waystones:waystone", illegal: false, industry_allow: true },
{ name: "waystones:mossy_waystone", illegal: false, industry_allow: true },
{ name: "waystones:sandy_waystone", illegal: false, industry_allow: true },
{ name: "chinjufumod:block_hamaguri", illegal: false, industry_allow: false },
{ name: "ae2:spatial_anchor", illegal: false, industry_allow: true }]

BlockEvents.rightClicked(event => {
    if (event.player && event.player.isCreative()) {
        return
    }
    Ban_List.forEach(element => {
        if (element.industry_allow && event.server.persistentData.industry_server) {
            return
        }
        let cancelled = false
        if (String(event.block.id) == element.name) {
            cancelled = true
        }
        if (element.name == String(event.player.getHeldItem(event.hand).id)) {
            cancelled = true
        }
        if (cancelled) {
            if (element.illegal) {
                event.player.persistentData.warnConut = 0
                applyWarn(event)
                try {
                    FilesJS.appendLine("config/illegal_list.txt", `${timestampToString(Date.now(), '[yyyy-MM-dd HH:mm:ss]')}:${event.player.name.getString()}尝试在${event.block.pos.x},${event.block.pos.y},${event.block.pos.z}使用${element.name}`)
                } catch (error) {
                    try {
                        FilesJS.writeFile("config/illegal_list.txt", `${timestampToString(Date.now(), '[yyyy-MM-dd HH:mm:ss]')}:${event.player.name.getString()}尝试在${event.block.pos.x},${event.block.pos.y},${event.block.pos.z}使用${element.name}`)
                    } catch (e) {
                        event.player.tell(e)
                    }
                }
            }
            event.cancel()
        }
    })
})

BlockEvents.placed(event => {
    if (event.player && event.player.isCreative()) {
        return
    }
    Ban_List.forEach(element => {
        if (element.industry_allow && event.server.persistentData.industry_server) {
            return
        }
        let cancelled = false
        if (String(event.block.id) == element.name) {
            cancelled = true
        }


        if (cancelled) {
            if (element.illegal) {
                event.player.persistentData.warnConut = 0
                applyWarn(event)
                try {
                    FilesJS.appendLine("config/illegal_list.txt", `${timestampToString(Date.now(), '[yyyy-MM-dd HH:mm:ss]')}:${event.player.name.getString()}尝试在${event.block.pos.x},${event.block.pos.y},${event.block.pos.z}使用${element.name}`)
                } catch (error) {
                    try {
                        FilesJS.writeFile("config/illegal_list.txt", `${timestampToString(Date.now(), '[yyyy-MM-dd HH:mm:ss]')}:${event.player.name.getString()}尝试在${event.block.pos.x},${event.block.pos.y},${event.block.pos.z}使用${element.name}`)
                    } catch (e) {
                        event.player.tell(e)
                    }
                }
            }
            event.cancel()
        }
    })
})

function applyWarn(event) {
    let warnText = "警告！你刚刚尝试使用了一个你不应该拿到的物品，本次操作已记录"
    event.player.tell(warnText)
}