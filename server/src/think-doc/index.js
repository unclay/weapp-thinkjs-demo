const Watcher = require('think-watcher');
const path = require('path');

module.exports = () => {
  const api = new Watcher({
    srcPath: path.resolve(think.ROOT_PATH, 'src'),
    diffPath: path.resolve(think.ROOT_PATH, 'app')
  }, data => {
    // let doc = require(path.resolve(think.ROOT_PATH, 'src', data.file));
    console.log(data);
  });
  api.watch();
  return {
    controller: {
      api
    },
    context: {
      api
    },
    think: {
      api
    }
  };
};
