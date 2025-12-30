// 使用Box-Muller方法生成伪随机正态分布
function generateNormalDistribution(mean, stdDev) {
    let u = 0, v = 0;
    while (u == 0 || u == 1) { u = Math.random() } // 生成(0,1)区间的随机数
    while (v == 0 || v == 1) { v = Math.random() } // 生成(0,1)区间的随机数
    let z0 = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * 3.1415926535897 * v); // 第一个正态分布随机数
    let z1 = Math.sqrt(-2.0 * Math.log(u)) * Math.sin(2.0 * 3.1415926535897 * v); // 第二个正态分布随机数
    return z0 * stdDev + mean; // 转换为指定均值和标准差的正态分布随机数
}//原文链接：https://blog.csdn.net/qq_44273429/article/details/131330744

function randint(min, max) { //生成一个min到max的随机整数
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertToNBTIntArray(arr) { //把数组转换为整形nbt数组
    let r = "[I;"
    for (let i = 0; i < arr.length; i++) {
        r += `${arr[i]},`
    }
    r += "]"
    return r;
}

function canHappen(possibility) { //判断事件能否发生
    return Math.random() <= possibility ? true : false
}

function timestampToString(timestamp, format) { //创建格式化的时间字符串，例："[yyyy-MM-dd HH-mm-ss]"
    // 创建一个Date对象
    const date = new Date(timestamp);

    // 定义日期和时间的各个部分
    const yyyy = date.getFullYear(); // 年
    const MM = String(date.getMonth() + 1).padStart(2, '0'); // 月（从0开始，需要加1）
    const dd = String(date.getDate()).padStart(2, '0'); // 日
    const HH = String(date.getHours()).padStart(2, '0'); // 小时
    const mm = String(date.getMinutes()).padStart(2, '0'); // 分钟
    const ss = String(date.getSeconds()).padStart(2, '0'); // 秒

    // 根据格式字符串替换对应的日期和时间部分
    return format
        .replace('yyyy', yyyy)
        .replace('MM', MM)
        .replace('dd', dd)
        .replace('HH', HH)
        .replace('mm', mm)
        .replace('ss', ss);
}

function CountDistance(x1, y1, z1, x2, y2, z2) {
    let x = Math.abs(x1 - x2) * Math.abs(x1 - x2)
    let y = Math.abs(y1 - y2) * Math.abs(y1 - y2)
    let z = Math.abs(z1 - z2) * Math.abs(z1 - z2)
    return Math.sqrt(x + y + z)
}

function removeEmptyLines(path) {
    // 1. 按行分割（兼容 Windows \r\n 和 Unix \n）
    let lines = FilesJS.readLines(path)

    // 2. 过滤掉空行（trim 后长度为 0 的行）
    let nonEmptyLines = lines.filter(line => line.trim().length > 0);

    // 3. 重新拼接成行
    FilesJS.delete(path)
    FilesJS.writeLines(path, nonEmptyLines)
}