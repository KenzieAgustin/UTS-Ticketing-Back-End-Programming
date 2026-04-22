const Product = require('../../../models/product-schema');

const findProductById = async (id) => {
    return await Product.findById(id);
}

const updateProductStock = async(id, newStock) => {
    return await Product.findByIdAndUpdate(
        id, 
        {stock: newStock},
        {new: true});
};

module.exports = {findProductById, updateProductStock};
