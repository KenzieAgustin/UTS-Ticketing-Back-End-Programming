const { Books } = require('../../../models/books-schema');

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
