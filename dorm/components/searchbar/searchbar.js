// components/searchbar/searchbar.js
var global = require('../../utils/global.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dormList: {
      type: null,
      value: 0,
    },
    containerShow: {
      type: Boolean,
      value: true
    }

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名

    attached: function() {
      this.setData({
        dormsData: this.dormsData
      })
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    notClickTags: true,
    inputValue: '',
    // focus: false,
    searchPanelShow: false,
    tagsPanelShow: false,
    searchResult: {},
    containerShow: true,
    Tag: ['学校', '商业', '阳台', '有家具','WG', '公寓', 'Tannenbusch', '市中心','Endenicher','火车站','河边','Poppelsdorf','食堂']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectCity: function(event) {
      global.selectCity()
    },
    onDetilsTap: function(event) {
      var dormId = event.currentTarget.dataset.dormid;
      wx.navigateTo({
        url: "../detils/detils?id=" + dormId
      })
    },
    onTagsTap: function(event) {
      var that = this
      this.triggerEvent('containerShow', {
        containerShow: false
      });
      
      // console.log(event.currentTarget.dataset.tag)
      that.setData({
        notClickTags: false,
        inputValue: event.currentTarget.dataset.tag,
        tagsPanelShow: false,
        searchPanelShow: true,
        // focus: true,
        searchResult: {}
      })
      that.onLoadDorms(that.data.inputValue)
      console.log('点击标签：' + that.data.inputValue)
     
    },
    onBindFocus: function(event) {

      this.triggerEvent('containerShow', {
        containerShow: false
      });
      if (this.data.inputValue) {
        this.setData({
          searchPanelShow: true,
          tagsPanelShow: false
        })
      } else {
        this.setData({
          tagsPanelShow: true
        })
      }
    },

    onCancelImgTap: function(event) {
      this.setData({
        searchPanelShow: false,
        tagsPanelShow: false,
        // focus: true,
        inputValue: ''

      })
      this.triggerEvent('containerShow', {
        containerShow: true
      });
    },
    onBindBlur: function(event) {
      var that = this
     
      // if(1<2){
      //   that.setData({
      //     searchPanelShow: false,
      //     tagsPanelShow: false,
      //     inputValue: ''
      //   })
      //   that.triggerEvent('containerShow', {
      //     containerShow: true
      //   });
      // }
    },
    onBindInput: function(event) {

      let that = this
      if (event.detail.value) {
        that.setData({
          searchPanelShow: true,
          tagsPanelShow: false,
          searchResult: {},
          inputValue: event.detail.value
        });
      } else {
        that.setData({
          searchPanelShow: false,
          tagsPanelShow: true,
          searchResult: {},
          inputValue: event.detail.value
        });
      }

      var value = event.detail.value;
      console.log(value)
      that.onLoadDorms(value)


    },
    onLoadDorms: function(value) {
      var that = this
      if (value != '') {
        //forEach循环list数组
        var dorms = []
        that.data.dormList.forEach(function(e) {

          //判断indexOf不等于-1的数据push到联想词数组
          if (e.Name.indexOf(value) != -1 || e.Tag.indexOf(value) != -1 || e.Category.indexOf(value) != -1 || e.roomTypeList.indexOf(value)!=-1) {
            dorms.push(e)
            that.setData({
              searchResult: {
                dorms
              }
            });
          }
        })
      }
    }

  }
})