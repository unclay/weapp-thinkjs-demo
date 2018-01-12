const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const mongo = require('think-mongo');
const api = require('../think-api');
const doc = require('../think-doc');
module.exports = [
  view, // make application support view
  cache,
  session,
  model(think.app),
  api(think.app),
  mongo(think.app),
  doc()
];
