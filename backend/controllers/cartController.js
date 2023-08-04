import mongoose from "mongoose";
import Cart from "../model/Cart";
import User from "../model/User";

export const addToCart = async (req, res, next) => {

  const { user, productName, price, quantity, total, alltotal } = req.body;

  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.ststus(400).json({message: `Unable to find user by this id`});
  }

  const addCart = new Cart({
    user,
    productName,
    price,
    quantity,
    total: price * quantity
  });
  
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await addCart.save({session});
    existingUser.cart.push(addCart);
    await existingUser.save({session});
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: err});
  }

  return res.status(200).json({addCart});
  
}


export const viewCart = async (req, res, next) => {
  
  const uid = req.params.id;

  let userCart;

  try {
    userCart = await User.findById(uid).populate('cart');
  } catch (err) {
    return console.log(err);
  }

  if (userCart) {
    return res.status(200).json({carts:userCart});
  } else {
    return res.status(404).json({message:"Cart is empty"});
  }
}
