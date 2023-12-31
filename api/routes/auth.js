import express from 'express'
import User from '../models/User.js'
import bcrypt from "bcrypt";

const router = express.Router()


// REGISTER

router.post("/register", async (req, res) => {
  // console.log(req.body)
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, 
    });
    // console.log(newUser)
    const user = await newUser.save();
    console.log(user)
    res.status(200).json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");
 
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const {password,...others} = user._doc 
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router