// component/menu/menu.js
let {
  requestData
} = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isOpen: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    menus: []
  },
  attached() {
    this.getMenusList();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleClickCloseMenus() {
      this.triggerEvent('onChangeMenusOpen', false);
    },
    moveD: _ => {},
    getMenusList() {
      let menus = JSON.parse(wx.getStorageSync('menus') || "[]");
      let promise = null;
      if (!menus.length) {
        promise = requestData('/api/menus/get_list');
      } else {
        promise = Promise.resolve(menus);
      }
      promise.then(menus => {
        wx.setStorageSync("menus", JSON.stringify(menus));
        this.setData({
          menus
        })
        console.log(this.data.menus)
      })
    }
  }
})