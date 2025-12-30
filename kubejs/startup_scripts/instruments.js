StartupEvents.registry("item",event=>{
    event.create("guitar").maxStackSize(1).tag('kubejs:instruments').displayName("吉他")
    event.create("piano").maxStackSize(1).tag('kubejs:instruments').displayName("电子琴")
    event.create("drum_808").maxStackSize(1).tag('kubejs:instruments').displayName("电子鼓机")

    event.create("empty_music_sheet").maxStackSize(16).displayName("空白乐谱")
    event.create("music_sheet").maxStackSize(1).glow(true).displayName("乐谱")
})

StartupEvents.registry('sound_event', (event) => {
    event.create('guitar_sound')
})