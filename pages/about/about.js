// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpen: false,
    title: "关于"
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  handleChangeMenusOpen(e) {
    this.setData({
      isOpen: e.detail
    })
  }
})