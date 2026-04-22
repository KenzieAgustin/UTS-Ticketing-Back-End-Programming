const { Showtimes } = require('../../../models'); // Memanggil index.js di folder models

async function getShowtimes(filter = {}) {
  return Showtimes.find(filter).populate('movie_id').populate('theather_id');
}

async function deleteShowtime(id) {
  return Showtimes.findByIdAndDelete(id);
}

async function createShowtime(data) {
  return Showtimes.create(data);
}

module.exports = { getShowtimes, createShowtime ,deleteShowtime 
};