ServerEvents.loaded(event => {
    event.server.persistentData.remove("gameName")
    let settings = {
        industry_server: false,
        game_server: false,
        game: "",
        id: "default"
    }
    try {
        settings = JSON.parse(FilesJS.readFile("config/server_settings.json"))
    } catch (error) {
        console.error(`oops,在读取服务器设置时遇到了以下问题：${error}，服务器将以默认设置启动`)
        let json = JSON.stringify(settings)
        FilesJS.writeFile("config/server_settings.json",json)
    }

    event.server.persistentData.industry_server = settings.industry_server
    event.server.persistentData.game_server = settings.game_server
    if(settings.game_server){
        event.server.persistentData.gameName = settings.game
    }
    event.server.persistentData.serverId = settings.id
})