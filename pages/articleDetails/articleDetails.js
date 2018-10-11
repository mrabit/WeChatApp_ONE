// pages/articleDetails/articleDetails.js
let {
  requestData,
  postFormId
} = require('../../utils/util.js');
let { article_unit_id } = require('../../config.js');
let dayjs = require('dayjs');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article_unit_id,
    isOpen: false,
    title: "一个阅读",
    id: 2758,
    articleDetails: {},
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    });
    this.getArticleDetails(this.data.id);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: this.data.articleDetails.guide_word,
      imageUrl: "https:" + this.data.articleDetails.img_url
    }
  },
  handleChangeMenusOpen(e) {
    this.setData({
      isOpen: e.detail
    })
  },
  postFormId,
  getArticleDetails(e) {
    let id = typeof e === "object" ? e.target.dataset.id : e;
    if (!id) return false;
    this.setData({
      loading: true
    });
    requestData(`/api/article/${id}`).then(d => {
      setTimeout(_ => {
        this.setData({
          articleDetails: d,
          loading: false
        });
        wx.setNavigationBarTitle({
          title: d.title + " - ONE · 一个"
        })
      }, 500);
    })
  }
})