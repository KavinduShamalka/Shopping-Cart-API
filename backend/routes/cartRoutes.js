import express from 'express';
import { addToCart, deleteItem, updateCart, viewCart } from '../controllers/cartController';

const cartRouter = express.Router();

cartRouter.post("/add", addToCart); //Add product to cart
cartRouter.get("/view/:id", viewCart);  //View cart by using User ID
cartRouter.put("/update/:id", updateCart); //Update cart
cartRouter.delete("/delete/:id", deleteItem ); //delete cart items

export default cartRouter;
