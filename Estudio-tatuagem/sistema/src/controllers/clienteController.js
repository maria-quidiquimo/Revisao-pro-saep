const service = require('../services/clienteService');
const crud = require('./crudFactory');
module.exports = crud(service);
