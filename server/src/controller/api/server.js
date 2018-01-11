const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  postAction() {
    this.success({
      queryCode: 'this.ctx.query',
      query: this.ctx.query,
      postCode: 'this.post()',
      post: this.post(),
    })
  }
  getAction() {
    this.success({
      queryCode: 'this.ctx.query',
      query: this.ctx.query
    })
  }
};
