// component/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ""
    }
  },
  created() {
    wx.showShareMenu();
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClickOpenMenu() {
      this.triggerEvent('onChangeMenusOpen', true);
    }
  }
})