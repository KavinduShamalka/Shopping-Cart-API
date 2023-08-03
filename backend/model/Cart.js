import mongoose, { Schema } from 'mongoose';

const schema = mongoose.Schema;

const cartSchema = new schema({
  user: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
  },
});

export default mongoose.model("Cart", cartSchema);
