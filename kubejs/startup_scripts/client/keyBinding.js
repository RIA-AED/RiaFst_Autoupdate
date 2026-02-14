if (Platform.isClientEnvironment()) {
    let $KeyMapping = Java.loadClass("net.minecraft.client.KeyMapping")
    let $InputConstants = Java.loadClass("com.mojang.blaze3d.platform.InputConstants")
    let $GLFW = Java.loadClass("org.lwjgl.glfw.GLFW")

    global.RIDE_ANOTHER_PLAYER = new $KeyMapping(
        "骑乘其他玩家",
        $InputConstants.Type.KEYSYM,
        $GLFW.GLFW_KEY_R,
        "RIA:FST"
    )

    global.CANCEL_PLAYER_RIDING = new $KeyMapping(
        "取消头上玩家的骑乘",
        $InputConstants.Type.KEYSYM,
        $GLFW.GLFW_KEY_G,
        "RIA:FST"
    )

    ForgeModEvents.onEvent("net.minecraftforge.client.event.RegisterKeyMappingsEvent", event => {
        event.register(global.RIDE_ANOTHER_PLAYER)
        event.register(global.CANCEL_PLAYER_RIDING)
    })
}