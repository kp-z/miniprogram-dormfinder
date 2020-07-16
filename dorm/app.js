
// const db = wx.cloud.database()
App({
  globalData: {


  },
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
  },

  /**
   * 获取用户信息
   */
  // getUserInfo: function(cb) {
  //   var that = this;
  //   var appid = 'appid=wxfff136634f3725b3';
  //   var secert = '&secret=1543df72345df0bbd025829201fcfcec';
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.login({
  //       success: function(res) {
  //         /**
  //          * 获取openid
  //          */
  //         if (res.code) {
  //           var header = 'https://api.weixin.qq.com/sns/jscode2session?'
  //           var grand_type = '&grant_type=authorization_code'
  //           var js_code = 'js_code'+res.code
  //           wx.request({
              
  //             url: header + appid + secert + js_code + grand_type,
  //             success: function (res) {
  //               that.globalData.userOpenid = res.data.openid
  //             }
  //           })
  //         }
  //         /**
  //          * 获取用户额外信息
  //          */
  //         wx.getUserInfo({
  //           success: function(res) {
  //             that.globalData.userInfo = res.userInfo;
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     });
  //   }
  // },
  
  globalData: {
    userInfo: null,
  }
})