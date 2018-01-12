// const superAgent = require('superagent');
// const {
//   isError
// } = require('./util_is');
const {
  createPromise
} = require('./util_create');

class API {
  constructor(app) {
    let api = app.think.config('api');
    api = api[api.type];
    this.options = api.options;
    this.debug = false;
    this.appid = api.appid;
    this.secret = api.secret;
    this.store = '';
    this.prefix = 'https://api.weixin.qq.com/sns';
    this.defaults = {};
  }

  setOpts(opts) {
    this.defaults = opts;
  }

  preRequest(method, args) {
    return this.afterRequest(method, args);
  }

  async afterRequest(method, args) {
    const res = await method.apply(this, args);
    return createPromise(null, JSON.parse(res.text));
  }
}

module.exports = API;
