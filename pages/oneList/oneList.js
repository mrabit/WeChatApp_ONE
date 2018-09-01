// pages/oneList/oneList.js
const {
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
    title: "一个图文",
    loading: true,
    oneList: [],
    totalPage: 0,
    total: 0,
    currentPage: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (this.data.oneList.length) return false;
    this.getOneList();
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
    this.getOneList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log('用户点击右上角分享');
  },
  handleChangeMenusOpen(e) {
    this.setData({
      isOpen: e.detail
    })
  },
  getOneList() {
    this.setData({
      loading: true
    });
    requestData('https://one.mrabit.com/api/one/get_list', {
      page: this.data.currentPage,
      length: 10
    }).then(d => {
      setTimeout(_ => {
        this.setData({
          oneList: [...this.data.oneList, ...d.aaData.map(v => {
            v.post_date = dayjs(v.post_date).format('YYYY / MM / DD');
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