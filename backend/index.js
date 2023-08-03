import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';
import cartRouter from './routes/cartRoutes';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);


//Database connection
mongoose.connect(
  'mongodb+srv://kavindu123:kavindu123@shopping-cart.jiybsky.mongodb.net/?retryWrites=true&w=majority'
)
  .then(() => app.listen(PORT))
  .then(() => console.log("Successfully connected to Database."))
  .catch((err)=> console.log(`Error: ${err} have occured!!!`));



