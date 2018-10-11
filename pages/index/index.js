//index.js
let {
  requestData
} = require('../../utils/util.js');
let { index_unit_id } = require('../../config.js');
let dayjs = require('dayjs');
Page({
  data: {
    index_unit_id,
    isOpen: false,
    title: "一个",
    loading: true,
    firstScreen: {},
    articleList: []
  },
  onLoad: function() {
    this.getLatestList();
  },
  handleChangeMenusOpen(e) {
    this.setData({
      isOpen: e.detail
    })
  },
  onShareAppMessage: function() {
    return {
      title: "复杂的世界里，一个就够了。",
      imageUrl: "https:" + this.data.firstScreen.img_url
    }
  },
  getLatestList() {
    this.setData({
      loading: true
    });
    requestData('/api/home', {
      date: "latest"
    }).then(d => {
      let firstScreen = d.splice(0, 1)[0] || {};
      firstScreen['day'] = dayjs(firstScreen.post_date).format('DD');
      firstScreen['date'] = dayjs(firstScreen.post_date).format('MMM.YYYY');
      setTimeout(_ => {
        this.setData({
          firstScreen,
          articleList: d.map(v => {
            v.post_date = dayjs(v.post_date).format('YYYY-MM-DD') === dayjs(new Date()).format('YYYY-MM-DD') ? "今天" : dayjs(v.post_date).format('YYYY-MM-DD');
            return v;
          }),
          loading: false
        })
      }, 500)
    })
  }
})