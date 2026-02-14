/**
 * Create 装配体（Minecart Contraption）SNBT 模板集合 —— 岩石结构类型
 *
 * 本对象用于集中存储 Create 的 minecart_contraption 所使用的
 * 装配体 SNBT 字符串模板，作为结构生成系统的静态资源库。
 *
 * 设计目的：
 * - 避免在运行时动态拼装复杂 NBT，降低出错概率
 * - 统一管理不同岩石 / 结构类型的装配体数据
 * - 作为 pig$spawnStructure 等生成函数的结构参数来源
 *
 * 使用方式示例：
 * ```js
 * pig$spawnStructure(
 *   level,
 *   server,
 *   spawnPos,
 *   structureType$ROCK_TYPES.rock_1,
 *   0.15,
 *   200,
 *   0.08
 * )
 * ```
 *
 * 注意事项：
 * - 每个 value 必须是【完整、合法】的 SNBT 字符串
 * - 顶层必须包含 Contraption 字段
 * - 必须至少包含一个 Superglue 定义，用于高度计算与范围清理
 * - SNBT 内的数值类型（L / b / f / d）不可随意省略或替换
 *
 * 维护建议：
 * - 新增结构类型时请使用唯一 key（如 rock_2 / rock_large）
 * - 不建议在运行时修改本对象内容
 * - 若结构体过多（> 数百），可考虑拆分为多个分类对象
 *
 * 命名说明：
 * - structureType$ROCK_TYPES 表示「结构类型 → 岩石类装配体模板」
 * - `$` 用于标识其为系统级静态资源，而非运行时状态
 */

const structureType$ROCK_TYPES = {
    rock_1: FilesJS.readFile("kubejs/server_scripts/feature/party_scripts/pig/structureType/rockTypes/rock_1.txt"),
    rock_2: FilesJS.readFile("kubejs/server_scripts/feature/party_scripts/pig/structureType/rockTypes/rock_2.txt")
}