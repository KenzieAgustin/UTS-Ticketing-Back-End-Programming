const Movie = require('../../../models/movie');

class MovieRepository {
  async findAll(filter = {}) {
    const query = {};

    if (filter.genre) {
      query.genre = { $in: [filter.genre] };
    }

    if (filter.status) {
      query.status = filter.status;
    }

    return await Movie.find(query).sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Movie.findById(id);
  }

  async create(data) {
    const movie = new Movie(data);
    return await movie.save();
  }

  async update(id, data) {
    return await Movie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await Movie.findByIdAndDelete(id);
  }
}

module.exports = new MovieRepository();