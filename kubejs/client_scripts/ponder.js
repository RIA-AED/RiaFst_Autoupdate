Ponder.tags((event) => {
    /**
     * "kubejs:getting_started" -> the tag name
     * "minecraft:paper"        -> the icon
     * "Getting Started"        -> the title
     * "This is a description"  -> the description
     * [...items]               -> default items
     */
    event.createTag("kubejs:kubejs", "minecraft:purple_dye", "kubejs物品", "在服务器中添加的道具或方块", [
        // some default items
        "kubejs:roller",
        "kubejs:seller"
    ]);
});

Ponder.registry((event) => {
    /**
     * Create a new ponder entry with one scene for "minecraft:paper".
     */
    event.create("kubejs:roller").scene("kubejs:roller1", "搭建并设置扭蛋机", (scene, util) => {
        scene.showBasePlate()
        scene.world.setBlocks([2, 1, 2], "kubejs:roller")
        scene.world.showSection([2, 1, 2], Direction.DOWN)
        scene.idle(5)
        scene.world.setBlocks([2, 2, 2], "minecraft:chest")
        scene.world.showSection([2, 2, 2], Direction.DOWN)
        scene.idle(5)
        scene.overlay.showOutline("green", {}, [2, 2, 2, 2, 2, 2], 50)
        scene.text(50, "扭蛋机上需要有存储方块作为奖品来源", [2, 2.5, 2])
        scene.idle(70)
        scene.addKeyframe()
        scene.showControls(50, [3, 1.5, 2], "right")
            .rightClick()
            .withItem("kubejs:roller_ticket")
        scene.overlay.showOutline("green", {}, [2, 1, 2, 2, 1, 2], 50)
        scene.text(50, "使用抽奖卷右键可以使奖卷绑定到此扭蛋机", [2, 1.5, 2])
        scene.idle(70)
        scene.addKeyframe()
        scene.text(50, "扭蛋机拥有者之外的人可以凭绑定到抽奖卷抽奖", [2, 1.5, 2])
        scene.idle(70)
    }).scene("kubejs:roller2", "把扭蛋机接入机械结构", (scene) => {
        scene.showBasePlate()
        scene.world.setBlocks([3, 1, 2], "minecraft:barrel")
        scene.world.showSection([3, 1, 2], Direction.DOWN)
        scene.idle(5)
        scene.world.setBlocks([3, 2, 2], "kubejs:roller")
        scene.world.showSection([3, 2, 2], Direction.DOWN)
        scene.idle(5)
        scene.world.setBlocks([3, 3, 2], "minecraft:chest")
        scene.world.showSection([3, 3, 2], Direction.DOWN)
        scene.text(50, "当扭蛋机下方有容器时...")
        scene.idle(70)
        scene.world.setBlocks([1, 2, 2], "create:deployer")
        scene.world.modifyBlock([1, 2, 2], (state) => state.with("facing", "east"), false)
        scene.world.modifyBlock([1, 2, 2], (state) => state.with("axis_along_first", "false"), false)
        scene.world.showSection([1, 2, 2], Direction.DOWN)
        scene.idle(5)
        scene.world.setBlocks([1, 2, 3], "create:creative_motor")
        scene.world.modifyBlock([1, 2, 3], (state) => state.with("axis", "z"), false)
        scene.world.showSection([1, 2, 3], Direction.DOWN)
        scene.text(50, "右键会直接将奖品放入下方容器")
        scene.idle(70)
    })


    event.create("kubejs:seller").scene("kubejs:seller1", "搭建并设置售货机", (scene, util) => {
        scene.showBasePlate()
        scene.world.setBlocks([2, 1, 2], "kubejs:seller")
        scene.world.showSection([2, 1, 2], Direction.DOWN)
        scene.idle(5)
        scene.world.setBlocks([2, 2, 2], "minecraft:chest")
        scene.world.showSection([2, 2, 2], Direction.DOWN)
        scene.idle(5)
        scene.overlay.showOutline("green", {}, [2, 2, 2, 2, 2, 2], 50)
        scene.text(50, "售货机上需要有存储方块作为商品来源", [2, 2.5, 2])
        scene.idle(70)
        scene.addKeyframe()
        scene.overlay.showOutline("green", {}, [2, 1, 2, 2, 1, 2], 60)
        scene.showControls(20, [3, 1.5, 2], "right")
            .rightClick()
        scene.text(30, "右键可以提高出售的价格", [2, 1.5, 2])
        scene.idle(30)
        scene.showControls(20, [3, 1.5, 2], "right")
            .leftClick()
        scene.text(30, "左键则可以降低", [2, 1.5, 2])
        scene.idle(50)
        scene.showControls(40, [3, 1.5, 2], "right")
            .rightClick()
            .whileSneaking()
        scene.text(50, "潜行时左/右键能以更小值增减价格", [2, 1.5, 2])
        scene.idle(70)
    }).scene("kubejs:seller2", "使用售货机购买", (scene, util) => {
        scene.showBasePlate()
        scene.world.setBlocks([2, 1, 2], "kubejs:seller")
        scene.world.showSection([2, 1, 2], Direction.DOWN)
        scene.idle(5)
        scene.world.setBlocks([2, 2, 2], "minecraft:chest")
        scene.world.showSection([2, 2, 2], Direction.DOWN)
        scene.idle(5)
        scene.overlay.showOutline("green", {}, [2, 1, 2, 2, 1, 2], 140)
        scene.showControls(40, [3, 1.5, 2], "right")
            .rightClick()
        scene.text(50, "右键售货机查看商品信息", [2, 1.5, 2])
        scene.idle(70)
        scene.showControls(40, [3, 1.5, 2], "right")
            .leftClick()
        scene.text(50, "左键以购买", [2, 1.5, 2])
        scene.idle(70)
        scene.addKeyframe()
        scene.text(50, "消耗物品栏中的实体Δ币，找零自动退回")
        scene.idle(70)
        scene.text(50, "Δ币会直接打款到店主账上")
        scene.idle(70)
    })
});