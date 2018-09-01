// component/menu/menu.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClickCloseMenus() {
      this.triggerEvent('onChangeMenusOpen', false);
    },
    moveD: _ => {}
  }
})