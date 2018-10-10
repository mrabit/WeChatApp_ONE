// component/appreciate.js
let { appid } = require('../../config.js');
Component({
  data: {
    appid
  },
  methods: {
    handleClickAppreciate() {
      wx.previewImage({
        urls: ['https://one.img.mrabit.com/appreciate.png'],
      });
    }
  }
})
