// pages/my/my.js
const app = getApp()
var global = require('../../utils/global.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: 0,
    userInfo:''
  },

  // 登陆
  onLoad: function(option) {
  },
  /**
   * 未实现功能
   */
  onNoticeTap(){
    global.notAvailable()
  },
  onPostsTap(){
    global.notAvailable()
  },

  /**
   * 点击登陆事件
   */
  onLoginTap() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
   * 退出登陆事件
   */
  onLogoutTap() {
    wx.clearStorage()
    this.setData({
      userInfo: ''
    })
  },
  /**
   * 打开/关闭赞赏窗口
   */
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  /**
   * 打开收藏页面
   */
  onCollectionsTap(e) {
    console.log(this.data.userInfo)
    if (this.data.userInfo) {
      wx.navigateTo({
        url: '../collection/collection',
      })
    } else {
      wx.showModal({
        // title: '模态弹窗',
        content: '登陆后查看',
        showCancel: false, // 是否显示取消按钮，默认为 true
        confirmText: "了解",
        confirmColor: "#b8e986",
      })
    }

  },
  /**
   * 打开关于作者页面
   */
  onAboutTap: function(e){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  /**
   * 打开官方文档
   */
  onDocumentation: function(){
    
    wx.navigateToMiniProgram({
      appId: 'wxd73993c5652e1ef8',
      path: 'pages/detail/detail?id=39',
      success(res) {
        // 打开成功
        console.log('打开另一个小程序')
      },
      fail(res){
        console.log(res)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '去哪儿住',
      path: '/pages/index/index',
      imageUrl: 'https://bonn-dorm-1253324855.cos.eu-frankfurt.myqcloud.com/logo.png',
      success: function(res) {
        // 转发成功
        wx.showToast({
          title: '分享成功',
          icon: 'none'
        })
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  previewImage: function(e){
    wx.previewImage({
      urls: ['https://bonn-dorm-1253324855.cos.eu-frankfurt.myqcloud.com/qrcode/appericate-wechat.jpg',
      'https://bonn-dorm-1253324855.cos.eu-frankfurt.myqcloud.com/qrcode/appericate-alipay.jpg']
    }) 
  }
})