/**
 * @param {object} repository
 * @param {string} id
 * @param {string} label
 * @returns {Promise<object>}
 */
const findOrFail = async (repository, id, label) => {
  const doc = await repository.findById(id);
  if (!doc) {
    const err = new Error(`${label} not found`);
    err.status = 404;
    throw err;
  }
  return doc;
};

module.exports = findOrFail;
