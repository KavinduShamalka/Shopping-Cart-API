import mongoose from "mongoose";
import Cart from "../model/Cart";
import User from "../model/User";

export const addToCart = async (req, res, next) => {

  const { user, productName, price, quantity, total } = req.body;

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
    total: price * quantity,
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


// export const viewCart1 = async (req, res, next) => {
  
//   const uid = req.params.id;

//   let userCart;

//   try {
//     userCart = await User.findById(uid).populate('cart');
//   } catch (err) {
//     return console.log(err);
//   }

//   if (userCart) {
//     return res.status(200).json({carts:userCart});
//   } else {
//     return res.status(404).json({message:"Cart is empty"});
//   }
// }


export const viewCart = async (req, res) => {
  try {
    const uid = req.params.id; // Get the user ID from the request parameters.

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

      // Return the user's cart details along with the full total.
      return res.status(200).json({ userCart: usersCart.cart, fullTotal });
      }
  } catch (error) {
    console.error('Error viewing cart:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Update cart by cart ID
export const updateCart = async (req, res, next) => {
  const { quantity } = req.body; //Get new quantity from the JSON body and store
  const cartID = req.params.id; //Asign cart ID through REQUEST PARAMETER
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
      cart.total = total; //assign updated total
      await cart.save(); //Save cart
      return res.status(200).json({ message: "Cart updated sucessfully", cart }); //Dispaly suceessfull message and show updated cart
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "Unable to update cart!!!"});
  }
};
