const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 16,
  },
  type: {
    type: String,
    maxlength: 10,
  },
  rating: {
    type: String,
    maxlength: 3,
  },
  price: {
    type: String,
    maxlength: 10,
  },
  image: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
