import mongoose, { Schema } from 'mongoose';

const schema = mongoose.Schema;

const cartSchema = new schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
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
    type: Number
  },
  alltotal: {
    type: Number
  }
});

export default mongoose.model("Cart", cartSchema);
