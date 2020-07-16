// map.js
var global = require('../../utils/global.js')
const app = getApp();
var dormsData = require('../../data/dorms-data.js')
var cdormsData = require('../../data/cdorms-data.js')
let schoolData = require('../../data/map/gis-school')
let stationData = require('../../data/map/gis-station')
let mensaData = require('../../data/map/gis-mensa')
let dormData = require('../../data/map/gis-dorm')
let lifeData = require('../../data/map/gis-life')
let othersData = require('../../data/map/gis-others')

Page({
  data: {

    /**
     * test data
     */
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [],
    CustomBar: app.globalData.CustomBar,
    checkbox: [{
      value: 0,
      name: '学校',
      checked: true,
      hot: true,
      Data: schoolData
    }, {
      value: 1,
      name: '生活',
      checked: false,
      hot: true,
      Data: lifeData
    }, {
      value: 2,
      name: '宿舍',
      checked: true,
      hot: false,
      Data: dormData
    }, {
      value: 3,
      name: '食堂',
      checked: false,
      hot: false,
      Data: mensaData
    }, {
      value: 4,
      name: '车站',
      checked: false,
      hot: false,
      Data: stationData
    }, {
      value: 5,
      name: '其他',
      checked: false,
      hot: false,
      Data: othersData
    }],
    //

    windowHeight: '',
    inputValue: '',
    searchPanelShow: false,
    containerShow: true,
    searchResult: {}
  },
  onLoad: function() {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });

    var allDormsData = []
    var dormList = dormsData.dormList.dorms
    allDormsData = dormList.concat(cdormsData.cdormList.dorms)
    this.setData({
      allDormsData: allDormsData,
      dormList: dormsData.dormList
    });

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        console.log(res)
        let latitude = res.latitude;
        let longitude = res.longitude;
        let marker = this.createMarker(res);
        this.setData({
          markers: this.getMarkers()
        })
      }
    });
  },

  /**
   * test
   */
  onReady: function(e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function() {
    this.mapCtx.getCenterLocation({
      success: function(res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function() {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [80],
      points: this.data.markers
    })
  },
  //

  containerShow(e) {
    this.setData({
      containerShow: e.detail.containerShow
    })
  },


  callOutTap: function(e) {
    if (e.markerId < 100) {
      var dormId = e.markerId - 1;
      // console.log("on post id is" + dormId);
      wx.navigateTo({
        url: "../detils/detils?id=" + dormId
      })
    }
  },

  // 加载地图标记
  getMarkers: function() {

    var showMarkers = this.loadMarkers();
    let markers = [];
    for (let type of showMarkers) {
      for (let item of type) {
        let marker = this.createMarker(item);
        markers.push(marker)
      }
    }
    return markers;
    // console.log(markers)
  },

  createMarker: function(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "../../images/map/" + point.type + ".png",
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: 30,
      height: 30
    };
    return marker;
  },
  loadMarkers(e) {

    let checkbox = this.data.checkbox;
    // console.log(checkbox);
    var showMarkers = [];
    // console.log(checkbox)
    for (let item of checkbox) {
      if (item.checked) {
        showMarkers.push(item.Data)
      }
    }
    return showMarkers
  },




  // 过滤器 
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
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    console.log(items);
    let value = e.currentTarget.dataset.value;
    for (let item of items) {
      if (item.value == value) {
        item.checked = !item.checked;
        break
      }
    }
    var markers = this.getMarkers()
    this.setData({
      checkbox: items,
      markers: markers
    })
  }


})