import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    required: true
  },

  updatedAt: {
    type: Date,
    required: true
  }
});

ProductSchema.index({
  updatedAt: -1,
  _id: -1
});

ProductSchema.index({
  category: 1,
  updatedAt: -1,
  _id: -1
});

export default mongoose.model("Product", ProductSchema);