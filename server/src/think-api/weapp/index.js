const API = require('./src/api_common');
const apiOauth = require('./src/api_oauth');
Object.setPrototypeOf(API.prototype, apiOauth);
module.exports = API;
