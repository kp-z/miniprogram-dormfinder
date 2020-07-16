function selectCity(e) {
  wx.showModal({
    // title: '模态弹窗',
    content: '暂无其他城市信息，如果想合作开发请联系作者：z.kp@outlook.com',
    showCancel: false, // 是否显示取消按钮，默认为 true
    confirmText: "了解",
    confirmColor: "#b8e986",

    /** success返回参数说明
     * confirm 为 true 时，表示用户点击了确定按钮
     * cancel 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
     */
    // success: function (res) {
    //   if (res.confirm) {
    //     console.log("点击了确定");
    //   }
    //   if (res.cancel) {
    //     console.log("点击了取消");
    //   }
    // }
  })
}
function notAvailable(e) {
  wx.showModal({
    // title: '模态弹窗',
    content: '该功能正在开发中，尽情期待！',
    showCancel: false, // 是否显示取消按钮，默认为 true
    confirmText: "了解",
    confirmColor: "#b8e986",

    /** success返回参数说明
     * confirm 为 true 时，表示用户点击了确定按钮
     * cancel 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
     */
    // success: function (res) {
    //   if (res.confirm) {
    //     console.log("点击了确定");
    //   }
    //   if (res.cancel) {
    //     console.log("点击了取消");
    //   }
    // }
  })
}
function copyUrl(e) {
  wx.setClipboardData({
    data: e.currentTarget.dataset.url,
    success: function (res) {
      wx.getClipboardData({
        success: function (res) {
          wx.showToast({
            title: e.currentTarget.dataset.name + '链接已复制',
            image: '',
            duration: 2000
          })
        }
      })
    }
  })
}
module.exports = {
  selectCity: selectCity,
  notAvailable: notAvailable,
  copyUrl: copyUrl,
}