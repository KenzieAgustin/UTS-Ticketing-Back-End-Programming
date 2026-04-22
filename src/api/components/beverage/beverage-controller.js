const beverageService = require('./beverage-service');
const catchAsync = require('../../../utils/catchAsync');

class BeverageController {
  constructor() {
    this.getAll = catchAsync(this.getAll.bind(this));
    this.create = catchAsync(this.create.bind(this));
    this.update = catchAsync(this.update.bind(this));
    this.remove = catchAsync(this.remove.bind(this));
  }

  // GET /api/beverages
  async getAll(req, res) {
    const { category, isAvailable } = req.query;
    const filter = { category };
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';

    const beverages = await beverageService.getAllBeverages(filter);
    res.status(200).json({ success: true, count: beverages.length, data: beverages });
  }

  // POST /api/beverages (Admin)
  async create(req, res) {
    const beverage = await beverageService.createBeverage(req.body);
    res.status(201).json({ success: true, message: 'Beverage created successfully', data: beverage });
  }

  // PATCH /api/beverages/:id (Admin)
  async update(req, res) {
    const beverage = await beverageService.updateBeverage(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Beverage updated successfully', data: beverage });
  }

  // DELETE /api/beverages/:id (Admin)
  async remove(req, res) {
    await beverageService.deleteBeverage(req.params.id);
    res.status(200).json({ success: true, message: 'Beverage deleted successfully' });
  }
}

module.exports = new BeverageController();