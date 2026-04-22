const movieRepository = require('./movie-repository');

async function getAllMovies(filter) {
  return movieRepository.findAll(filter);
}

async function getMovieById(id) {
  const movie = await movieRepository.findById(id);
  if (!movie) {
    return null;
  }

  return movie;
}

async function createMovie(data) {
  return movieRepository.create(data);
}

async function updateMovie(id, data) {
  const movie = await movieRepository.findById(id);
  if (!movie) {
    return null;
  }

  return movieRepository.update(id, data);
}

async function deleteMovie(id) {
  const movie = await movieRepository.findById(id);
  if (!movie) {
    return null;
  }

  await movieRepository.delete(id);
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};