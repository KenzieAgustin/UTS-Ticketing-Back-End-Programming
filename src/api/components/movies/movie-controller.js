const movieService = require('./movie-service');
const catchAsync = require('../../../utils/catchAsync');

class MovieController {
  constructor() {
    this.getAll = catchAsync(this.getAll.bind(this));
    this.getOne = catchAsync(this.getOne.bind(this));
    this.create = catchAsync(this.create.bind(this));
    this.update = catchAsync(this.update.bind(this));
    this.remove = catchAsync(this.remove.bind(this));
  }

  // GET /api/movies
  async getAll(req, res) {
    const { genre, status } = req.query;
    const movies = await movieService.getAllMovies({ genre, status });
    res.status(200).json({ success: true, count: movies.length, data: movies });
  }

  // GET /api/movies/:id
  async getOne(req, res) {
    const movie = await movieService.getMovieById(req.params.id);
    res.status(200).json({ success: true, data: movie });
  }

  // POST /api/movies (Admin)
  async create(req, res) {
    const movie = await movieService.createMovie(req.body);
    res.status(201).json({ success: true, message: 'Movie created successfully', data: movie });
  }

  // PUT/PATCH /api/movies/:id (Admin)
  async update(req, res) {
    const movie = await movieService.updateMovie(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Movie updated successfully', data: movie });
  }

  // DELETE /api/movies/:id (Admin)
  async remove(req, res) {
    await movieService.deleteMovie(req.params.id);
    res.status(200).json({ success: true, message: 'Movie deleted successfully' });
  }
}

module.exports = new MovieController();
