const Beverage = require('../../../models/beverage');

class BeverageRepository {
  async findAll(filter = {}) {
    const query = {};

    if (filter.category) {
      query.category = filter.category;
    }

    if (typeof filter.isAvailable === 'boolean') {
      query.isAvailable = filter.isAvailable;
    }

    return Beverage.find(query).sort({ createdAt: -1 });
  }

  async findById(id) {
    return Beverage.findById(id);
  }

  async create(data) {
    const beverage = new Beverage(data);
    return beverage.save();
  }

  async update(id, data) {
    return Beverage.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async delete(id) {
    return Beverage.findByIdAndDelete(id);
  }
}

module.exports = new BeverageRepository();
