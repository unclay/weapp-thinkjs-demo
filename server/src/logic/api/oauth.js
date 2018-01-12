module.exports = class extends think.Logic {
  __before() {
    this.allowMethods = 'post';
  }
  postAction() {
    const rules = {
      code: {
        string: true,
        required: true,
        trim: true,
        method: 'POST'
      }
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail(`validate error`, this.validateErrors);
    }
  }
};
