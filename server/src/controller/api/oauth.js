const crypto = require('crypto');
const BaseRest = require('../rest.js');
const Wxcrypt = require('./wxcrypt');

module.exports = class extends BaseRest {
  async postAction() {
    let userInfo;
    const sessionUser = await this.session('user');
    if (sessionUser && sessionUser.openid) {
      userInfo = await this.model('user').getUser(sessionUser.openid);
      return this.success({
        user: userInfo
      });
    }
    const code = this.post('code');
    const rawData = this.post('rawData');
    const signature = this.post('signature');
    const encryptedData = this.post('encryptedData');
    const iv = this.post('iv');
    const result = await this.api.jscode2session(code);
    if (result.errcode > 0) {
      return this.fail(result);
    }
    if (signature !== crypto.createHash('sha1').update(`${rawData}${result.session_key}`).digest('hex')) {
      return this.fail(1100, '数据签名校验失败');
    }
    const pc = new Wxcrypt(this.api.appid, result.session_key);
    userInfo = pc.decryptData(encryptedData, iv);
    userInfo.openid = userInfo.openid || userInfo.openId;
    userInfo.unionid = userInfo.unionid || userInfo.unionId;
    await this.model('user').addUser(userInfo);
    await this.session('user', {
      unionid: userInfo.openid
    });
    userInfo = await this.model('user').getUser(userInfo.openid);
    return this.success({
      user: userInfo
    });
  }
  getAction() {
    /*
    ## GET接口
    ### 接口描述
        test
    ### 参数
        null
    ### 正确返回
        {
          error_code: 0,
          data: ''
        }
    */
    this.success('asdf');
  }
};
