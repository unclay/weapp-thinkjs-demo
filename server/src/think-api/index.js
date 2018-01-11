const thinkApi = function (app) {
  const api = app.think.config('api');
  return new api[api.type].handle(app);
}

/**
 * extends to think, controller, context
 */
module.exports = (app) => {
  const api = thinkApi(app);
  return {
    controller: {
      api,
    },
    context: {
      api,
    },
    think: {
      api,
    }
  };
};
