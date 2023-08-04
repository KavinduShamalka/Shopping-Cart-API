import express from 'express';
import { addToCart, viewCart } from '../controllers/cartController';

const cartRouter = express.Router();

cartRouter.post("/add", addToCart); //Add product to cart
cartRouter.get("/view/:id", viewCart);  //View cart by User ID

export default cartRouter;
