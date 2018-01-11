const superAgent = require('superAgent');

exports.jscode2session = function () {
  return this.preRequest(this._jscode2session, arguments);
}

/*!
 * 获取成员的未封装版本
 */
exports._jscode2session = function (jsCode, grantType = 'authorization_code') {
  // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
  return superAgent
    .get(`${this.prefix}/jscode2session`)
    .set('Content-Type', 'application/json')
    .query({
      appid: this.appid,
      secret: this.secret,
      js_code: jsCode,
      grant_type: grantType
    });
}