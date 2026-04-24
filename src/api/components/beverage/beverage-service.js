const beverageRepository = require('./beverage-repository');

async function getAllBeverages(filter) {
  return beverageRepository.findAll(filter);
}

async function getBeverageById(id) {
  const beverage = await beverageRepository.findById(id);
  if (!beverage) {
    return null;
  }

  return beverage;
}

async function createBeverage(data) {
  return beverageRepository.create(data);
}

async function updateBeverage(id, data) {
  const beverage = await beverageRepository.findById(id);
  if (!beverage) {
    return null;
  }

  return beverageRepository.update(id, data);
}

// eslint-disable-next-line consistent-return
async function deleteBeverage(id) {
  const beverage = await beverageRepository.findById(id);
  if (!beverage) {
    return null;
  }

  await beverageRepository.delete(id);
}

module.exports = {
  getAllBeverages,
  getBeverageById,
  createBeverage,
  updateBeverage,
  deleteBeverage,
};
