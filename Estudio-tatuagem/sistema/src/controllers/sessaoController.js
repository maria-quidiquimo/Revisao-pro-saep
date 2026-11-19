const service = require('../services/sessaoService');
const crud = require('./crudFactory');
module.exports = crud(service);
