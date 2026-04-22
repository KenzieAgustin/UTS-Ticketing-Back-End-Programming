/**
 * Calls repository.findById(id) and throws a 404 error if not found.
 * Eliminates the repetitive "find then throw if null" pattern in services.
 *
 * @param {object} repository - A repository instance with a findById method
 * @param {string} id         - The document ID to look up
 * @param {string} label      - Human-readable name used in the error message (e.g. 'Movie')
 * @returns {Promise<object>} - The found document
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
