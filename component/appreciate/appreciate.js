// component/appreciate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  methods: {
    handleClickAppreciate() {
      wx.previewImage({
        urls: ['https://one.img.mrabit.com/appreciate.png'],
      });
    }
  }
})
