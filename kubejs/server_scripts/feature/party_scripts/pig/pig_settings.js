let pigHealthPerStage = 3000;
let pigStageNames = [
    "愤怒的 年猪",
    "冷静的 年猪",
    "休息的 年猪",
    "抖擞精神的 年猪",
    "显出疲态的 年猪",
    "孤注一掷的 疣猪兽之王",
]
let pigSpawnHeight = 256
let pigFallExplodeValues = {
    min: 1,
    index: 0.05,
    max: 5
}
let pigSkillsIntervalTicks = 200

let piglinDeathCostHealth = 100

let pigLores = {
    start: [
        "经验丰富的屠户：我得最后问一次，你们确定你们要体验这个吗？",
        "经验丰富的屠户：。。。好吧",
        "经验丰富的屠户：哎哟！别咬我！",
        "经验丰富的屠户：小心点！即使以我的标准，这头疣猪兽也不是好对付的！",
        "经验丰富的屠户：它现在很生气，注意它的行动，躲开！"
    ],
    stages: [
        [
            "有点经验的屠户：它的行动缓慢下来了————未必是好兆头",
            "有点经验的屠户：等等，它在干什么？！"
        ],
        [
            "杀过疣猪的屠户：它不动弹了，好机会！",
            "杀过疣猪的屠户：这些东西是哪里来的？！"
        ],
        [
            "不太自信的屠户：......看起来它又恢复了",
            "不太自信的屠户：事到如今发生什么我都不会奇怪了"
        ],
        [
            "自我怀疑的屠户：它的动作又变的迟缓了！",
            "自我怀疑的屠户：终于要结束了吗..？"
        ],
        [
            "释怀地笑的屠户：...气笑了",
            "释怀地笑的屠户：尾款不用打了老板，我先走一步"
        ]
    ],
    death: [
        "RlaK0_：恭喜！它再也不会动了！我保证没有下一个阶段",
        "RlaK0_：我用椰能给它加了点配菜，是时候享用了"
    ]
}

let pigRewardItems = [
    { id: 'farmersdelight:ham', count: 10 },
    { id: 'nethersdelight:hoglin_hide', count: 5 },
    { id: 'nethersdelight:hoglin_loin', count: 10 },
    { id: 'minecraft:warped_fungus', count: 15 },
    { id: 'minecraft:warped_roots', count: 5 },
    { id: 'minecraft:crimson_fungus', count: 20 },
    { id: 'minecraft:crimson_roots', count: 5 }
]