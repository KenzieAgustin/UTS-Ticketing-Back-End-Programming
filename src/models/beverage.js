const mongoose = require('mongoose');

const beverageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Beverage name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['food', 'drink', 'combo'],
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    image: {
      type: String, // URL to image
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Beverage', beverageSchema);
