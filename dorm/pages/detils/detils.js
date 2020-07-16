// pages/index/detils/detils.js
var dormsData = require('../../data/dorms-data.js')
var cdormsData = require('../../data/cdorms-data.js')
var global = require('../../utils/global.js')
const app = getApp()
const db = wx.cloud.database()
// const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    windowHeight: '600',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 0,
    scrollLeft: 0,
    showCommunity: false,
    showBrief: true,
    
  },
  /**
   * 弹出和隐藏社区模块
   */
  showBrief(e) {
    wx.showModal({
      // title: '模态弹窗',
      content: e.currentTarget.dataset.value,
      showCancel: false, // 是否显示取消按钮，默认为 true
      confirmText: "关闭",
    })
  },

  showCommunityModal(e) {
    var that = this
    that.setData({
      showCommunity: true
    })
  },
  hideCommunityModal(e) {
    this.setData({
      showCommunity: false
    })
  },


  /**
   * 页面生命周期onLoad
   */
  onLoad: function(option) {
    /**
     * 根据获取的dormid加载对应数据
     */
    var allDormsData = []
    var dormList = dormsData.dormList.dorms
    allDormsData = dormList.concat(cdormsData.cdormList.dorms)
    var dormId = option.id;
    this.data.currentDormId = dormId;
    var dormData = allDormsData[dormId];
    this.setData({
      dormData: dormData,
      currentDormId: dormId,
      dormLike: dormData.dormLike,
      dormResidence: dormData.dormResidence
    })

    /**
     * 加载收藏状态
     */

    var dormsCollected = wx.getStorageSync('dorms_collected')
    if (dormsCollected) {
      var dormCollected = dormsCollected[dormId]
      if (dormCollected) {
        this.setData({
          collected: dormCollected
        })
      }
    } else {
      var dormsCollected = [];
      dormsCollected[dormId] = false
      wx.setStorageSync('dorms_collected', dormsCollected);
    }

    /**
     * 获取用户数据
     */

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

    /**
     * 自动获取窗口大小
     */
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight / 2
        });
      }
    });
    console.log(that.data.windowHeight)
  },


  /**
   * 上传图片功能
   */

  uploadImg: function(event) {
    global.notAvailable()
  },
  onHide: function(event){
    
  },
  onUnload:function(event){
    
  },

  /**
   * 点击加入收藏
   */
  onColletionTap: function(event) {
    
    var that = this;
    wx.getStorage({
      key: "dorms_collected",
      success: function(res) {
        var dormsCollected = res.data;
        var dormCollected = dormsCollected[that.data.currentDormId];
        dormCollected = !dormCollected;
        console.log(wx.getStorageSync('dorms_collected'))        
        dormsCollected[that.data.currentDormId] = dormCollected;
        that.showToast(dormsCollected, dormCollected);
      }
    })
  },

  showToast: function(dormsCollected, dormCollected) {
    // 更新文章是否的缓存值
    var that = this;
    wx.setStorageSync('dorms_collected', dormsCollected);
    // 更新数据绑定变量，从而实现切换图片
    that.setData({
      collected: dormCollected
    })
    wx.showToast({
      title: dormCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },

  onReachBottom: function(e) {
    // console.log(this.TabCur)
    // if (this.TabCur == 1) {
      let newWxComment = this.selectComponent('#NewWxComment');
      newWxComment.onReachBottom();
    // }

  },

  /**
   * 切换tab触发
   */
  tabSelect(e) {
    // console.log(e.currentTarget.dataset.id)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
    // console.log(this.TabCur)
    if (e.currentTarget.dataset.id == 1) {
      let newWxComment = this.selectComponent('#NewWxComment');
      newWxComment.onReachBottom();
    }
  },

  /**
   * 点击照片预览
   */
  previewImage: function(e) {
    var src = e.currentTarget.dataset.src; //获取data-src
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: this.data.dormData.imageList // 需要预览的图片http链接列表
    })
  },
  previewCommuImage: function(e) {
    //图片预览
    wx.previewImage({
      urls: ['https://bonn-dorm-1253324855.cos.eu-frankfurt.myqcloud.com/qrcode/community-qrcode.jpg'] // 需要预览的图片http链接列表
    })
  },
  /**
   * 复制链接地址
   */
  copyUrl: function(e) {
    global.copyUrl(e)
  },
  /**
   * 复制地址
   */
  copyAddress: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.address,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '地址已复制',
              image: '',
              duration: 2000
            })
          }
        })
      }
    })
  }
})