// //获得玩家面朝的方向，以字符串或位移数组形式返回
// function getPlayerFacing(event, isBool, isOpposite) {
//     let dx = event.block.pos.x + 0.5 - event.player.pos.x()
//     let dz = event.block.pos.z + 0.5 - event.player.pos.z()
//     let facing = "south"
//     let facingOpposite = "north"
//     let ox = 0;
//     let oz = 0;
//     if (Math.abs(dz) > Math.abs(dx)) {
//         if (dz > 0) {
//             facing = "north"
//             facingOpposite = "south"
//             oz = 1
//         }else{
//             oz = -1
//         }
//     } else {
//         if (dx < 0) {
//             facing = "east"
//             facingOpposite = "west"
//             ox = -1
//         } else {
//             facing = "west"
//             facingOpposite = "east"
//             ox = 1
//         }
//     }
//     if (isBool) {
//         if (isOpposite) return facingOpposite
//         else return facing
//     } else {
//         let t = [ox, oz]
//         let ot = [-1 * ox, -1 * oz]
//         if (isOpposite) return ot
//         else return t
//     }
// }