module.exports = {
  domain: "", // 生产环境接口请求地址
  dev_domain: "http://127.0.0.1:8181", // 开发环境接口请求地址
  secret_key: "", // 接口请求秘钥
  version: "", // 当前版本(对应后台接口版本做相关数据的隐藏,防止微信审核机制)
  appid: "", // 给赞appid
  index_unit_id: "adunit-", // 首页广告id
  one_unit_id: "adunit-", // 一个图文广告id
  article_unit_id: "adunit-" // 一个阅读广告id
};
