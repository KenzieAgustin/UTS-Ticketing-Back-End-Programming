const theathersService = require('./theathers-services');

async function getTheathers(req, res, next) {
  try {
    const theaters = await theathersService.getTheathers();
    return res.status(200).json(theaters);
  } catch (error) {
    next(error);
  }
}

async function getTheatherById(req, res, next) {
  try {
    const theater = await theathersService.getTheatherById(req.params.id);
    if (!theater)
      return res.status(404).json({ message: 'Theater tidak ditemukan' });
    return res.status(200).json(theater);
  } catch (error) {
    next(error);
  }
}

async function createTheather(req, res, next) {
  try {
    await theathersService.createTheather(req.body);
    return res.status(201).json({ message: 'Theater berhasil ditambahkan' });
  } catch (error) {
    next(error);
  }
}

async function deleteTheather(req, res, next) {
  try {
    const deleted = await theathersService.deleteTheather(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Theater tidak ditemukan' });
    }
    return res.status(200).json({ message: 'Theater berhasil dihapus' });
  } catch (error) {
    next(error);
  }
}

// Update exportnya
module.exports = {
  getTheathers,
  getTheatherById,
  createTheather,
  deleteTheather,
};
