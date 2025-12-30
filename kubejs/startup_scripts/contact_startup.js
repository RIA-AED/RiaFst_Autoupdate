//往来KJS迁移
  StartupEvents.registry('block',event=>{
    event.create('contact:faded_mailbox','cardinal').soundType('stone').box(5,0,5,11,25,11).defaultCutout().displayName('褪色的邮箱')
    event.create('contact:center_mailbox','cardinal').soundType('stone').displayName('中央邮箱')
    event.create('contact:red_postbox','cardinal').soundType('stone').defaultCutout().property(BlockProperties.HALF).displayName('红色邮筒')
    event.create('contact:green_postbox','cardinal').soundType('stone').defaultCutout().property(BlockProperties.HALF).displayName('绿色邮筒')
  })
