const { Theathers } = require('../../../models'); // Memanggil index.js di folder models

async function getAllTheathers() {
  return Theathers.find();
}

async function getTheatherById(id) {
  return Theathers.findById(id);
}

async function createTheather(data) {
  return Theathers.create(data);
}

async function deleteTheather(id) {
  return Theathers.findByIdAndDelete(id);
}

// Update exportnya
module.exports = { getAllTheathers, getTheatherById, createTheather, deleteTheather };