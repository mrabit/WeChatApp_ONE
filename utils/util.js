const app = getApp();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @param successCallback {function} 成功回调函数
 * @param errorCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */
const requestData = (url, data) => {
  if (app.debug) {
    console.log('requestData url: ', url);
  }
  return new Promise((resolve, reject) => {
    return wx.request({
      url: url,
      data: data,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
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
module.exports = {
  formatTime: formatTime,
  requestData
}