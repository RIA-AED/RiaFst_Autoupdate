StartupEvents.registry('item', event => {
    event.create('solaris0').maxStackSize(1).tag('curios:charm').displayName("索拉里斯-参与勋章")
    event.create('solaris1').maxStackSize(1).tag('curios:charm').displayName("索拉里斯-贡献勋章")
    event.create('solaris2').maxStackSize(1).tag('curios:charm').displayName("索拉里斯-杰出贡献勋章")
})