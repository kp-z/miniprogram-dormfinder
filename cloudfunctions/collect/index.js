// // 云函数入口文件
// const cloud = require('wx-server-sdk')
// const db = wx.cloud.database()
// cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()
//   db.collection('users-data').where({
//     '_id': 'oEqt85RzXMBF2nx0gD8iBnU5ey3c',
//     'collectedList': event.dormid
//   }).update({
//     data: {
//       'collectedList.$.dormid': true
//     },
//     success: function (res) {
//       console.log('已将当前页的收藏状态更新为True')
//     },
//     fail: function (res) {
//       console.log(res)
//     }
//   })
//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
}