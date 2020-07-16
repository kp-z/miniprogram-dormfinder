// pages/index/index.js
var dormsData = require('../../data/dorms-data.js')
var postsData = require('../../data/posts-data.js')
var cdormsData = require('../../data/cdorms-data.js')
var global = require('../../utils/global.js')

const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allDormsData: [],
    inputValue: '',
    cardCur: 0,
    TabCur: 0,
    searchPanelShow: false,
    containerShow: true,
    searchResult: {},
    scrollLeft: 0,
    openid: ''
  },
  /**
   * 点击跳转到宿舍详情页面
   */
  onDetilsTap: function(event) {
    var dormId = event.currentTarget.dataset.dormid;
    wx.navigateTo({
      url: "../detils/detils?id=" + dormId
    })
  },
  /**
   * 点击跳转到帖子详情页面
   */
  onPostsTap: function(event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "../post/post?id=" + postId
    })
  },

  /**
   * 写帖子
   */
  writePost: function(event) {
    global.notAvailable()
  },

  /**
   * tab
   */
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  /**
   * 显示主页主体内容
   */
  containerShow(e) {
    this.setData({
      containerShow: e.detail.containerShow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var allDormsData = []
    var dormList = dormsData.dormList.dorms
    allDormsData = dormList.concat(cdormsData.cdormList.dorms)
    // this.data.postList = postsData.postList
    this.setData({
      allDormsData: allDormsData,
      dormList: dormsData.dormList,
      cdormList: cdormsData.cdormList,
      postList: postsData.postList
    });
    app.getUserInfo()
    // this.getDormsInfo()
    // this.getUserData()
  },
})