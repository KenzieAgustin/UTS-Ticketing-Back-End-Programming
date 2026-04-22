<<<<<<< HEAD
const { Books } = require('../../../models');
=======
const { Books } = require('../../../models/books-schema');
>>>>>>> b6731d8f19566b3d85f832e67c73d8dfa189d52b

async function getBooks() {
  return Books.find({});
}

async function create(title) {
  return Books.create({ title });
}

module.exports = {
  getBooks,
  create,
};
