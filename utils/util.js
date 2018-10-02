let md5 = require('md5');
let {
  secret_key
} = require('../config.js');
/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @param successCallback {function} 成功回调函数
 * @param errorCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */
const requestData = (url, data, method = "GET") => {
  const app = getApp();
  if (app.debug) {
    console.log('requestData url: ', url);
  }
  const timestamp = new Date().getTime();
  const secretoken = md5(`${timestamp}-${secret_key}`);
  return new Promise((resolve, reject) => {
    return wx.request({
      url: app.globalData.domain + url,
      data: data,
      method,
      header: {
        'Content-Type': 'application/json',
        secretoken,
        timestamp
      },
      success: function(res) {
        if (app.debug) {
          console.log('response data: ', res);
        }
        if (res.statusCode == 200 && res.data.code == 200)
          resolve(res.data.result);
        else
          reject(res.errMsg);
      },
      error: function() {
        reject();
      },
      complete: function() {
        reject();
      }
    })
  });
}
const postFormId = (e) => {
  let sysInfo = wx.getSystemInfoSync();
  requestData('/api/wx/insertFormId', {
    open_id: wx.getStorageSync('OPEN_ID'),
    form_id: e.detail.formId,
    brand: sysInfo.brand,
    model: sysInfo.model,
    system: sysInfo.system,
    platform: sysInfo.platform,
    version: sysInfo.version
  }, "POST");
}
module.exports = {
  requestData,
  postFormId
}