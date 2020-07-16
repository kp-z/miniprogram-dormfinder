// dorm/pages/collection/collection.js
var dormsData = require('../../data/dorms-data.js')
var cdormsData = require('../../data/cdorms-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onDetilsTap: function (event) {
    var dormId = event.currentTarget.dataset.dormid;
    wx.navigateTo({
      url: "../detils/detils?id=" + dormId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    
    var allDormsData = []
    var dormList = dormsData.dormList.dorms
    allDormsData = dormList.concat(cdormsData.cdormList.dorms)

    var dormsCollected = wx.getStorageSync('dorms_collected')
    that.setData({
      // dormList: dormsData.dormList,
      dormsCollected: dormsCollected
    });
    console.log(dormsCollected[0])
 
    var dorms = []
    allDormsData.forEach(function (e) {
      var id = e.dormId
      //判断indexOf不等于-1的数据push到联想词数组
      if (dormsCollected[id]) {
        dorms.push(e)
      }
    })
    that.setData({
      searchResult: {
        dorms
      }
    });
  }
})