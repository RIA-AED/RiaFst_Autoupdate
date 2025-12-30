const main_ingredient = [{
    id: "cooked_rice", //材料id
    full_id: "farmersdelight:cooked_rice", //材料完整id
    name: "白", //酒类名称
    model_number: 4, //模型编号
    best_ferment: 2, //最佳发酵次数
    best_distillation: 2, //最佳蒸馏次数
    best_aging: 3, //最佳陈化次数
    flavor_factor: 4, //风味系数
}, {
    id: "wheat", //材料id
    full_id: "minecraft:wheat", //材料完整id
    name: "啤", //酒类名称
    model_number: 1, //模型编号
    best_ferment: 2, //最佳发酵次数
    best_distillation: 0, //最佳蒸馏次数
    best_aging: 1, //最佳陈化次数
    flavor_factor: 3, //风味系数
}, {
    id: "apple", //材料id
    full_id: "minecraft:apple", //材料完整id
    name: "苹果", //酒类名称
    model_number: 3, //模型编号
    best_ferment: 2, //最佳发酵次数
    best_distillation: 2, //最佳蒸馏次数
    best_aging: 2, //最佳陈化次数
    flavor_factor: 2, //风味系数
}, {
    id: "milk_bucket", //材料id
    full_id: "minecraft:milk_bucket", //材料完整id
    name: "奶", //酒类名称
    model_number: 2, //模型编号
    best_ferment: 1, //最佳发酵次数
    best_distillation: 1, //最佳蒸馏次数
    best_aging: 2, //最佳陈化次数
    flavor_factor: 1.4, //风味系数
}]

const side_ingredient = [{
    id: "pepper", //材料id
    full_id: "crockpot:pepper", //材料完整id
    name: "火辣", //风味名称
    flavor_factor: 4.3, //风味系数
}, {
    id: "blank", //材料id
    full_id: "blank:blank", //材料完整id
    name: "无特殊", //风味名称
    flavor_factor: 2.5, //风味系数
}, {
    id: "sugar", //材料id
    full_id: "minecraft:sugar", //材料完整id
    name: "甜蜜", //风味名称
    flavor_factor: 1.2, //风味系数
}, {
    id: "milk_bucket", //材料id
    full_id: "minecraft:milk_bucket", //材料完整id
    name: "奶香", //风味名称
    flavor_factor: 1.4, //风味系数
}, {
    id: "rose_bush", //材料id
    full_id: "minecraft:rose_bush", //材料完整id
    name: "玫瑰", //风味名称
    flavor_factor: 1.4, //风味系数
}, {
    id: "porkchop", //材料id
    full_id: "minecraft:porkchop", //材料完整id
    name: "肉", //风味名称
    flavor_factor: 6, //风味系数
}, {
    id: "dandelion", //材料id
    full_id: "minecraft:dandelion", //材料完整id
    name: "蒲公英", //风味名称
    flavor_factor: 3.3, //风味系数
}, {
    id: "poppy", //材料id
    full_id: "minecraft:poppy", //材料完整id
    name: "虞美人", //风味名称
    flavor_factor: 3.3, //风味系数
}, {
    id: "bar_of_caramel", //材料id
    full_id: "create_confectionery:bar_of_caramel", //材料完整id
    name: "焦糖", //风味名称
    flavor_factor: 1.3, //风味系数
}
]

const brewingLevels = [{
    level: 1,
    baseMean: 2,
    baseStdDev: 0.8,
    promotionXP: 10,
    title: "新手"
}, {
    level: 2,
    baseMean: 2.5,
    baseStdDev: 1,
    promotionXP: 20,
    title: "学徒"
}, {
    level: 3,
    baseMean: 3,
    baseStdDev: 1.2,
    promotionXP: 40,
    title: "老手"
}, {
    level: 4,
    baseMean: 3.5,
    baseStdDev: 1.4,
    promotionXP: 60,
    title: "专家"
}, {
    level: 5,
    baseMean: 3.8,
    baseStdDev: 1.6,
    promotionXP: 114514,
    title: "大师"
}]

let counterPerDrunkLevel = 1000
let reliefDrunkCounter = 300
let initAddDrunkCounter = 400
let distillationAddDrunkCounter = 200

let burpTexts = ["呃 ", "呃 ", "呃 ", "呃 ", "呃啊——", "呃啊——", "呃啊——", "呃啊——", "呃啊——", "*嗝*", "*嗝*", "*嗝*", "*嗝*", "*嗝*", "*嗝*", "嗝———— ", "嗝———— ", "呃—", "呃—", "呃—", "呃—"]
let drunkTexts = ["啊", "啊啊", "哦", "-呃啊-", "", " ", "————", "，", "——", "...", "\\", "*", "——唉——", "、", "~", "哼哼"]
let wrongTexts = [
    "我想看小片三",
    "我见到鱼头了",
    "为什么我看见鱼子在天上飞",
    "妈妈",
    "我好喜欢上厕所",
    "我还能喝",
    "我一点都没醉",
    "饭好香",
    "我建的屋顶真好看",
    "我明天要睡一整天觉",
    "我的头好晕",
    "欢迎来到zth！",
    "佛祖的鼻子有几个",
    "你怎么头尖尖的",
    "比嘟比嘟比嘟比嘟",
    "汪汪汪汪汪汪汪汪",
    "今天几号来着",
    "代理实体gen.II出现一个故障，请回报管理员Nanako#01",
    "师傅我到了谢谢您嘞",
    "发射器要是随机到空的那格怎么办",
    "能被粉碎的粉碎轮被能粉碎粉碎轮的粉碎轮粉碎之后是粉碎的粉碎轮",
    "这把肯定过!",
    "进服第一次看到服主说话",
    "originalText = disturbMessage(originalText)",
    "难道是语音输入吗",
    "真正的武者不需要衣服！"]

let drunkHints = ["你没什么特别的感觉", "你开始感到有些醉意", "你似乎醉酒了", "你的醉酒有点严重", "你醉的不能再醉了"]

let drunkLevels = [{
    level: 1,
    effects: [],
    burpChance: 0,
    disturbedMessage: 0,
    wrongMessage: 0,
    canSendMessage: true
}, {
    level: 2,
    effects: [{
        id: "minecraft:slowness",
        am: 0
    }],
    burpChance: 0.3,
    disturbedMessage: 0.2,
    wrongMessage: 0,
    canSendMessage: true
}, {
    level: 3,
    effects: [{
        id: "minecraft:slowness",
        am: 1
    }, {
        id: "minecraft:nausea",
        am: 1
    }],
    burpChance: 0.5,
    disturbedMessage: 0.4,
    wrongMessage: 0.2,
    canSendMessage: true
}, {
    level: 4,
    effects: [{
        id: "minecraft:slowness",
        am: 2
    }, {
        id: "minecraft:nausea",
        am: 1
    }],
    burpChance: 0.6,
    disturbedMessage: 0.5,
    wrongMessage: 0.4,
    canSendMessage: true
}, {
    level: 5,
    effects: [{
        id: "minecraft:slowness",
        am: 9
    }, {
        id: "minecraft:blindness",
        am: 0
    }, {
        id: "minecraft:nausea",
        am: 1
    }],
    burpChance: 0,
    disturbedMessage: 0,
    wrongMessage: 0,
    canSendMessage: false
}]