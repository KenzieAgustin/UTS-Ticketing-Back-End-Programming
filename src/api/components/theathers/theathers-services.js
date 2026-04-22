const theathersRepo = require('./theathers-repository');

async function getTheathers() {
  return theathersRepo.getAllTheathers();
}

async function getTheatherById(id) {
  return theathersRepo.getTheatherById(id);
}

async function createTheather(data) {
  return theathersRepo.createTheather(data);
}

async function deleteTheather(id) {
  return theathersRepo.deleteTheather(id);
}

// Update exportnya
module.exports = { getTheathers, getTheatherById, createTheather, deleteTheather };