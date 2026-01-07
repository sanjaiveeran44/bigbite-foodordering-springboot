import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerController = async (req,res) => {
    const {username,email,password} = req.body;
    
    const existUser = await User.findOne({email});

    if(existUser){
        return res.status(400).json({message : "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        username,
        email,
        password : hashedPassword
    })

    return res.status(200).json({message : "User registered successfully"});
}

export const loginController = async (req, res) => {
    const {email ,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message : "User not found"});
    }

    const isPasswordMatched = await bcrypt.compare(password,user.password);

    if(!isPasswordMatched){
        return res.status(400).json({message : "Invalid credentials"});
    }
    const token = jwt.sign({id : user._id},process.env.JWT_SECRET,{expiresIn : "1h"});

    return res.status(200).json({message : "User logged in successfully",token : token});
}