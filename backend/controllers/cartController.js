import mongoose from "mongoose";
import Cart from "../model/Cart";

export const addToCart = async (req, res, next) => {

  const { user, productName, price, quantity, total } = req.body;

  const addCart = new Cart({
    user,
    productName,
    price,
    quantity,
    total: price * quantity
  });
  
  try {
    await addCart.save();
  } catch (err) {
    return console.log(err);
  }

  return res.status(200).json({addCart});
  
}
