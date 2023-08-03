import express from 'express';
import { getAllUsers, login, signup } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get("/", getAllUsers);   //Get all the users
userRouter.post("/signup", signup); //Signup
userRouter.post("/login", login);   //Login

export default userRouter;
