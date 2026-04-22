const showtimesService = require('./showtimes-services');

async function getShowtimes(req, res, next) {
  try {
    const { theater_id } = req.query; // Akses via: /api/showtimes?theater_id=ID
    const data = await showtimesService.getShowtimes(theater_id);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function deleteShowtime(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await showtimesService.deleteShowtime(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Jadwal tayang tidak ditemukan' });
    }
    
    return res.status(200).json({ message: 'Jadwal tayang berhasil dihapus' });
  } catch (error) {
    next(error);
  }
}

async function createShowtime(req, res, next) {
  try {
    await showtimesService.createShowtime(req.body);
    return res.status(201).json({ message: 'Jadwal tayang berhasil dibuat' });
  } catch (error) {
    next(error);
  }
}

module.exports = { getShowtimes, createShowtime, deleteShowtime};