// component/loading/loading.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loading: {
      type: Boolean,
      value: true
    }
  },
  created() {
    wx.showNavigationBarLoading();
  },
  detached() {
    wx.hideNavigationBarLoading();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    moveD: () => {}
  }
})