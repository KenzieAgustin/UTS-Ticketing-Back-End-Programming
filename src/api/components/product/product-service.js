const productRepository = require('./product-repository');

const reduceStockLogic = async (productId, quantity) => {
    const product = await productRepository.findProductById(productId);
    
    if (!product) throw new Error("Produk tidak ditemukan");
    if (product.stock < quantity) throw new Error("Stok tidak cukup!");

    const updatedStock = product.stock - quantity;
    return await productRepository.updateProductStock(productId, updatedStock);
};

module.exports = { reduceStockLogic };