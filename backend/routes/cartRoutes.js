import express from 'express';
import { addToCart } from '../controllers/cartController';

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);

export default cartRouter;
