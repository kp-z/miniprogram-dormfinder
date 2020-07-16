// components/mymap/mymap.js
const app = getApp();

let schoolData = require('../../data/map/gis-school')
let stationData = require('../../data/map/gis-station')
let mensaData = require('../../data/map/gis-mensa')
let dormData = require('../../data/map/gis-dorm')
let lifeData = require('../../data/map/gis-life')
let othersData = require('../../data/map/gis-others')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // longitude:"",
    // latitude:"",
    // scale:"",
    // width: "",
    // height: ""
    longitude: {
      type: Number,
      value: 0
    },
    controllerBar: {
      type: Boolean,
      value: false
    },
    latitude: {
      type: Number,
      value: 0
    },
    scale: {
      type: Number,
      value: 0
    },
    width: {
      type: Number,
      value: 0
    },
    height: {
      type: Number,
      value: 0
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    makers: [],
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
      checked: true,
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
      checked: true,
      hot: false,
      Data: mensaData
    }, {
      value: 4,
      name: '车站',
      checked: true,
      hot: false,
      Data: stationData
    }, {
      value: 5,
      name: '其他',
      checked: true,
      hot: false,
      Data: othersData
    }],
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名

    attached: function() {
      console.log('地图定位！')
      let that = this
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
    ready: function(e) {

      this.mapCtx = wx.createMapContext('myMap')
      
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {


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
    }
  }
})