import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  cart: [{
    type: mongoose.Types.ObjectId,
    ref: "Cart",
    required: true
  }]
});

export default mongoose.model("user", userSchema);
