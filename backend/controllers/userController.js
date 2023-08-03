import User from "../model/User";
import bcrypt from 'bcryptjs';

//Get all Users
export const getAllUsers = async (req, res, next) => {

  let users;

  try {
    users = await User.find();
  } catch (err) {
    return console.log (err);
  }

  if (!users) {
    return res.status(404).json({message: "No users found!!!"});
  } else {
    return res.status(200).json({users});
  }

};

//Signup
export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({message: 'User already exists.'});
  } else {

    //Hashing the password
    const hashedPWD = bcrypt.hashSync(password);

    const user = new User({
      userName,
      email,
      password: hashedPWD
    });

    try {
      await user.save(); //Save user to db
    } catch (err) {
      return console.log(err);
    }

    return res.status(200).json({ user });
  }
};

//Login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  
  let existingUser;

  try {
    existingUser = await User.findOne({email});
  } catch (err) {
    return console.log(err);
  }

  if (existingUser) {
    const isPwdCorrect = bcrypt.compareSync(password, existingUser.password) //check the password is correct

    if (isPwdCorrect) {
      return res.status(200).json({ message: 'Login successfull.'});
    } else {
      return res.status(400).json({message: 'Invalid password!!!'});
    }
  } else {
    return res.status(400).json({ message: "Could not find the user by this email." });
  }
};
