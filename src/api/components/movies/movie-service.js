const movieRepository = require('./movie-repository');
const findOrFail = require('../../../utils/findOrFail');

class MovieService {
  async getAllMovies(filter) {
    return await movieRepository.findAll(filter);
  }

  async getMovieById(id) {
    return await findOrFail(movieRepository, id, 'Movie');
  }

  async createMovie(data) {
    return await movieRepository.create(data);
  }

  async updateMovie(id, data) {
    await findOrFail(movieRepository, id, 'Movie');
    return await movieRepository.update(id, data);
  }

  async deleteMovie(id) {
    await findOrFail(movieRepository, id, 'Movie');
    await movieRepository.delete(id);
  }
}

module.exports = new MovieService();
