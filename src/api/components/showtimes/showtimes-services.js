const showtimesRepo = require('./showtimes-repository');

async function getShowtimes(theaterId) {
  const filter = theaterId ? { theather_id: theaterId } : {};
  return showtimesRepo.getShowtimes(filter);
}

async function deleteShowtime(id) {
  return showtimesRepo.deleteShowtime(id);
}

async function createShowtime(data) {
  return showtimesRepo.createShowtime(data);
}

module.exports = { getShowtimes, createShowtime, deleteShowtime };
