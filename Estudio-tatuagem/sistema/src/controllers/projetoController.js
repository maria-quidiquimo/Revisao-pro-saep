const service = require('../services/projetoService');
const crud = require('./crudFactory');
module.exports = crud(service);
