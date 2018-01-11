module.exports = class extends think.Logic {
	__before() {
		this.allowMethods = 'get,post'
	}
  getAction() {
    const rules = {
      num: {
        int: true,
        required: true,
      },
      str: {
        string: true,
        required: true,
      },
      bool: {
        boolean: true,
        required: true,
      },
    }
    const flag = this.validate(rules)
    if (!flag) {
      return this.fail('validate error', this.validateErrors)
    }

    // or
    // this.rules = {
    //   num: {
    //     int: true,
    //     required: true,
    //   },
    //   str: {
    //     string: true,
    //     required: true,
    //   },
    //   bool: {
    //     boolean: true,
    //     required: true,
    //   },
    // }
  }
};
