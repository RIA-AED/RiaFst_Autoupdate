BlockEvents.rightClicked(event => {
  const { item, block, player, facing} = event;

  if(facing !== "up") return;
  if (!item || !block) return;

  const abovePos = block.pos.above();
  const abovePos2 = block.pos.above(2);

  // --- 植物映射表 ---
  const plantMap = {
    'chinjufumod:block_wood_chanoki_nae': {
      blocks: ['chinjufumod:block_wood_chanoki'], // 单格
      height: 1
    },
    'chinjufumod:block_wood_grape_nae': {
      blocks: ['chinjufumod:block_wood_grape[stage=5,half=lower]', 'chinjufumod:block_wood_grape[stage=5,half=upper]'],// 双格
      height: 2
    },
    'chinjufumod:block_wood_mikan': {
      blocks: ['chinjufumod:block_wood_mikan[stage=6,half=lower]', 'chinjufumod:block_wood_mikan[stage=6,half=upper]'],
      height: 2
    },
    'chinjufumod:item_seeds_pepper': {
      blocks: ['chinjufumod:block_spice_pepper[stage=2,half=lower]', 'chinjufumod:block_spice_pepper[stage=2,half=upper]'],
      height: 2
    }
  };

  // --- 可种植的方块列表 ---
  const soilBlocks = [
    'minecraft:coarse_dirt',
    'farmersdelight:rich_soil'
  ];

  const plant = plantMap[item.id];
  if (!(plant && soilBlocks.includes(block.getId()))) return;

  // 检查上方空间是否足够
  if (plant.height === 1) {
    if (!(event.level.getBlock(abovePos) === 'minecraft:air')) return;
  } else if (plant.height === 2) {
    if (!(event.level.getBlock(abovePos) === 'minecraft:air') || !(event.level.getBlock(abovePos2) === 'minecraft:air')) return;
  }

  // 放置方块
  if (plant.height === 1) {
    event.server.runCommandSilent(`setblock ${abovePos.x} ${abovePos.y} ${abovePos.z} ${plant.blocks[0]} replace`);
  } else if (plant.height === 2) {
    event.server.runCommandSilent(`setblock ${abovePos.x} ${abovePos.y} ${abovePos.z} ${plant.blocks[0]} replace`);
    event.server.runCommandSilent(`setblock ${abovePos2.x} ${abovePos2.y} ${abovePos2.z} ${plant.blocks[1]} replace`);
  }

  // 非创造模式消耗物品
  if (!player.isCreative()) {
    item.count--;
  }
});
