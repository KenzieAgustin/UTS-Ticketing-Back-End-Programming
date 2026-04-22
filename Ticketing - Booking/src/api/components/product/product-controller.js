const productService = require('./product.service');

const orderBeverage = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const result = await productService.reduceStockLogic(productId, quantity);
        
        res.status(200).json({
            success: true,
            message: "Stok berhasil dikurangi",
            data: result
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { orderBeverage };