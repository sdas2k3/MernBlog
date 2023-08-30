import express from 'express'
import User from '../models/User.js'
import bcrypt from "bcrypt";

const router = express.Router()


// UPDATE USER
router.put("/:id", async (req, res) => {
    if(req.body.userId===req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            })
            res.status(200).json(updatedUser);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }
    else{
        res.status(400).json({message:"You can not update others account"})
    }
});


// GET USER

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});


// DELETE USER


router.delete("/:id", async (req, res) => {
    if(req.body.userId===req.params.id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({message:"User deleted Succesfully"});
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }
    else{
        res.status(400).json({message:"You can delete only your account"})
    }
});

export default router