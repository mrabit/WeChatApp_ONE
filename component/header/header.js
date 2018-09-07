// component/header.js
const app = getApp();
const {
  requestData,
  postFormId
} = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ""
    },
    oneInfo: {
      type: Object,
      value: {}
    },
    articleInfo: {
      type: Object,
      value: {}
    },
    category: {
      type: String,
      value: ""
    },
    loading: {
      type: Boolean,
      value: true
    }
  },
  data: {
    OPEN_ID: ""
  },
  created() {
    wx.showShareMenu();
    this.getLocalOpenId();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleClickOpenMenu() {
      this.triggerEvent('onChangeMenusOpen', true);
    },
    postFormId,
    getLocalOpenId() {
      // 获取缓存中的OPEN_ID
      var open_id = wx.getStorageSync('OPEN_ID');
      if (open_id) {
        return this.setData({
          OPEN_ID: open_id
        })
      }
      app.login().then(({
        OPEN_ID,
        SESSION_KEY
      }) => {
        wx.setStorageSync('OPEN_ID', OPEN_ID);
        this.setData({
          OPEN_ID: OPEN_ID
        })
      })
    }
  }
})