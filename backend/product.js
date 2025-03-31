const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  catNum: { type: String, required: true },
  name: { type: String, required: true },
  department: String,
  description: String,
  status: { type: String, enum: ['in', 'out'], default: 'in' },
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
