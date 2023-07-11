const express = require("express");
const router = express.Router();
var bcrypt = require('bcryptjs');

const User=require('../models/user');

router.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    var hash = bcrypt.hashSync(password, 8);
    const newUser= new User({
        name,
        email,
        password:hash
    })
    try {
        const user=await newUser.save();
        res.send("Successfully added")
    } catch (error) {
        return res.status(400).json({ error });
    }
})

router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email:email})
        if(user){
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
            const temp={
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                _id:user._id,
            }
            res.send(temp)
        }
        else{
            return res.status(400).json({ message: '' });
        }
    });
    }
    else{
        return res.status(400).json({ message: '' });
    }

} catch (error) {
        return res.status(400).json({ error });
    }
})

router.get('/getallusers',async(req,res)=>{
    try {
        const users=await User.find();
        res.send(users);
    } catch (error) {
        console.log(err);
    }
  });

module.exports=router;