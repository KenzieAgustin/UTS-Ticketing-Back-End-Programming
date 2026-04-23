const beverageService = require('./beverage-service');

async function getAll(request, response, next) {
  try {
    const { category, isAvailable } = request.query;
    const filter = { category };
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';

    const beverages = await beverageService.getAllBeverages(filter);
    return response
      .status(200)
      .json({ success: true, count: beverages.length, data: beverages });
  } catch (error) {
    return next(error);
  }
}

async function create(request, response, next) {
  try {
    const beverage = await beverageService.createBeverage(request.body);
    return response.status(201).json({
      success: true,
      message: 'Beverage created successfully',
      data: beverage,
    });
  } catch (error) {
    return next(error);
  }
}

async function update(request, response, next) {
  try {
    const beverage = await beverageService.updateBeverage(
      request.params.id,
      request.body
    );
    return response.status(200).json({
      success: true,
      message: 'Beverage updated successfully',
      data: beverage,
    });
  } catch (error) {
    return next(error);
  }
}

async function remove(request, response, next) {
  try {
    await beverageService.deleteBeverage(request.params.id);
    return response
      .status(200)
      .json({ success: true, message: 'Beverage deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};
