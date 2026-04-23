const movieService = require('./movie-service');

async function getAll(request, response, next) {
  try {
    const { genre, status } = request.query;
    const movies = await movieService.getAllMovies({ genre, status });
    return response
      .status(200)
      .json({ success: true, count: movies.length, data: movies });
  } catch (error) {
    return next(error);
  }
}

async function getOne(request, response, next) {
  try {
    const movie = await movieService.getMovieById(request.params.id);
    return response.status(200).json({ success: true, data: movie });
  } catch (error) {
    return next(error);
  }
}

async function create(request, response, next) {
  try {
    const movie = await movieService.createMovie(request.body);
    return response.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: movie,
    });
  } catch (error) {
    return next(error);
  }
}

async function update(request, response, next) {
  try {
    const movie = await movieService.updateMovie(
      request.params.id,
      request.body
    );
    return response.status(200).json({
      success: true,
      message: 'Movie updated successfully',
      data: movie,
    });
  } catch (error) {
    return next(error);
  }
}

async function partialUpdate(request, response, next) {
  try {
    const movie = await movieService.updateMovie(
      request.params.id,
      request.body
    );

    if (!movie) {
      return response.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    return response.status(200).json({
      success: true,
      message: 'Movie partially updated successfully',
      data: movie,
    });
  } catch (error) {
    return next(error);
  }
}

async function remove(request, response, next) {
  try {
    await movieService.deleteMovie(request.params.id);
    return response
      .status(200)
      .json({ success: true, message: 'Movie deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  partialUpdate,
  remove,
};
