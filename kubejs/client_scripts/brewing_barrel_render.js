let slideProgress = 5; //动画效果

RenderJSEvents.onGuiPreRender(event => {
    let floatingTextHead = [
        "酿酒桶信息",
        "内含："
    ];

    let floatingTextMiddle = [];
    let floatingTextTotal = [];
    let existItemStack = [];

    const { player, poseStack } = event;
    const w = event.window.getGuiScaledWidth();
    const h = event.window.getGuiScaledHeight();

    const hit = player.rayTrace(5, false)
    if (!hit || !hit.block) {
        slideProgress = 5;
        return;
    }
    const target = hit.block;
    if (target.id !== "kubejs:brewing_barrel") {
        slideProgress = 5;
        return;
    }

    const be = target.entity;

    function extractSlot(slot) {
        if (!be.data.contains(slot)) return null;
        const nbt = be.data.getCompound(slot);
        const stack = Item.of(nbt.getString('id'), nbt.getByte('Count'), nbt.get('tag'));
        return stack;
    }

    slideProgress -= 0.3;
    if (slideProgress < 0) slideProgress = 0;
    const padding = 6;  // 内边距
    const textTab = 14; //缩进
    const lineHeight = 10;
    const iconW = 16;
    const iconH = 16;

    // -------- 读取酿酒桶中物品 --------
    for (let i = 1; i <= 6; i++) {
        var slotItem = extractSlot(`slot${i}`)
        if (!slotItem) continue;
        floatingTextMiddle.push(slotItem.hoverName.string);
        existItemStack.push(slotItem);
    }

    // -------- 计算文本最大宽度 --------
    floatingTextTotal = floatingTextHead.concat(floatingTextMiddle);
    let maxWidth = 0;
    for (let line of floatingTextTotal) {
        let font = Client.font;
        let width = font.width(line);
        if (width > maxWidth) maxWidth = width;
    }

    // -------- 根据内容计算方框大小 --------
    const boxWidth = maxWidth + padding * 2 + textTab;
    const boxHeight = floatingTextTotal.length * lineHeight + padding * 2;

    // -------- 居中到准心位置 --------
    const x = w / 2 + 30 + slideProgress;
    const y = h / 2 - boxHeight / 2 + 10;

    // -------- 绘制半透明背景 --------
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 170;
    event.fill(x, y + 1, x + boxWidth, y + boxHeight, r, g, b, a);

    // -------- 绘制白色边框 --------
    r = 255;
    g = 255;
    b = 255;
    a = 255;
    event.hLine(x + 1, x + boxWidth - 1, y, r, g, b, a);
    event.hLine(x + 1, x + boxWidth - 1, y + boxHeight, r, g, b, a);
    event.vLine(x, y, y + boxHeight, r, g, b, a);
    event.vLine(x + boxWidth, y, y + boxHeight, r, g, b, a);

    // -------- 绘制贴图 --------
    event.drawTexture(new ResourceLocation("minecraft:textures/item/sweet_berries.png"), x + 1, y + 1, iconW, iconH);

    // -------- 绘制文字 --------
    let ty = y + padding;
    for (let line of floatingTextHead) {
        event.drawShadowString(Component.of(line), x + padding + textTab, ty, 0xFFFFFF);
        ty += lineHeight;
    }
    for (let i = 0; i < existItemStack.length; i++) {
        event.pushPose();
        event.scale(0.5, 0.5);
        event.renderGuiItem(existItemStack[i], (x + 9) / 0.5, ty / 0.5);
        event.popPose();

        event.drawShadowString(Component.gray(floatingTextMiddle[i]), x + padding + textTab + 3, ty, 0xFFFFFF);
        ty += lineHeight;
    }
});
