import mongoose from "mongoose";
import Cart from "../model/Cart.js";
import User from "../model/User.js";

//Add items to cart
export const addToCart = async (req, res, next) => {

  const { user, productName, price, quantity, total } = req.body; //get user details from request body and store them into variables

  let existingUser;

  try {
    existingUser = await User.findById(user); //find the user
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
    total: (price * quantity).toFixed(2),
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
  
};


//View cart items
export const viewCart = async (req, res) => {
  try {
    const uid = req.params.id; // Get the user ID from the REQUEST PARAMETER

    // Find the user with the given ID and populate the 'cart' field to get all cart details.
    const usersCart = await User.findById(uid).populate('cart');

    if (!usersCart) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      // Calculate the full total of the cart items.
      let fullTotal = 0;
      usersCart.cart.forEach((cartItem) => {
        fullTotal += cartItem.price * cartItem.quantity;
      });

      let allTotal = fullTotal.toFixed(2);

      // Return the user's cart details along with the full total.
      return res.status(200).json({ userCart: usersCart.cart, allTotal });
      }
  } catch (error) {
    console.error('Error viewing cart:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Update cart by cart ID
export const updateCart = async (req, res, next) => {
  const { quantity } = req.body; //Get new quantity from the JSON body and store
  const cartID = req.params.id; //Get cart ID through REQUEST PARAMETER
  let cart; //define cart variable

  try {
    cart = await Cart.findById(cartID); //find cart by cartID
    //if cart is NOT found
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    } else { //if cart found
      const price = cart.price; //access cart price
      const total = price * quantity; //update cart total using new quantity
      cart.quantity = quantity; //assign updated quantity
      cart.total = total.toFixed(2); //assign updated total
      await cart.save(); //Save cart
      return res.status(200).json({ message: "Cart updated sucessfully", cart }); //Dispaly suceessfull message and show updated cart
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "Unable to update cart!!!"});
  }
};

//Delete cart items by cartID
export const deleteItem = async (req, res, next) => {
  const cartID = req.params.id; //get the cart ID through a REQUEST PARAMETER
  let cartItem; //define cart variable

  try {
    cartItem = await Cart.findByIdAndRemove(cartID).populate("user"); //Find the cart items by its ID and populate the user field

    if (!cartItem) {
      return res.status(404).json({message: "Cart item is not found!!!"});
    } else {
      //Remove the cart from the user's cart array
      await cartItem.user.cart.pull(cartItem);
      //Save the updated user document to Databse
      await cartItem.user.save();
      return res.status(200).json({message: "Suceessfully remove from the cart"});
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: "Unable to remove cart item"});
  }
}


