// pages/articleList/articleList.js
let {
  requestData
} = require('../../utils/util.js');
let dayjs = require('../..//miniprogram_npm/dayjs/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpen: false,
    isEnd: false,
    title: "一个阅读",
    articleList: [],
    currentPage: 1,
    totalPage: 0,
    total: 0,
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (this.data.articleList.length) return false;
    this.getArticleList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.currentPage >= this.data.totalPage) {
      this.setData({
        isEnd: true
      })
      return false;
    }
    this.setData({
      currentPage: this.data.currentPage + 1
    });
    this.getArticleList();
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
  },
  getArticleList() {
    this.setData({
      loading: true
    });
    requestData(`/api/article/get_list`, {
      page: this.data.currentPage,
      length: 10
    }).then(d => {
      setTimeout(_ => {
        this.setData({
          articleList: [...this.data.articleList, ...d.aaData.map(v => {
            v.post_date = dayjs(v.post_date).format('YYYY-MM-DD') === dayjs(new Date()).format('YYYY-MM-DD') ? "今天" : dayjs(v.post_date).format('YYYY-MM-DD');
            return v;
          })],
          currentPage: d.currentPage,
          totalPage: d.totalPage,
          total: d.total,
          loading: false
        })
      }, 500);
    })
  }
})