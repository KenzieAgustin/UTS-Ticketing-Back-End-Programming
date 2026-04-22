const beverageRepository = require('./beverage-repository');
const findOrFail = require('../../../utils/findOrFail');

class BeverageService {
  async getAllBeverages(filter) {
    return beverageRepository.findAll(filter);
  }

  async getBeverageById(id) {
    return findOrFail(beverageRepository, id, 'Beverage');
  }

  async createBeverage(data) {
    return beverageRepository.create(data);
  }

  async updateBeverage(id, data) {
    await findOrFail(beverageRepository, id, 'Beverage');
    return beverageRepository.update(id, data);
  }

  async deleteBeverage(id) {
    await findOrFail(beverageRepository, id, 'Beverage');
    await beverageRepository.delete(id);
  }
}

module.exports = new BeverageService();
