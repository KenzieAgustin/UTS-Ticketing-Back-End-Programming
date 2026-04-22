const Product = require('./product.model');

const findProductById = async (id) => {
    return await Product.findById(id);
}

const updateProductStock = async(id, newStock) => {
    return await Product.findByIdAndUpdate(
        id, 
        {stock: newStock},
        {new: true});
};

module.exports = {findproductById, updateProductStock};
