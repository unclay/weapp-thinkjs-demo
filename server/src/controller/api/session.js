const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  async getAction() {
    await this.session('name', this.ctx.query.name);
    this.success({
      session: await this.session('name')
    })
  }
};
