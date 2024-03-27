import bcypt from 'bcryptjs';
import User from "../models/user.models.js";
import dotenv from 'dotenv';
import generateTokenAndSetCookie from '../util/generateToken.js';

export const signup =async(req,res) =>{
    try {
        const{ fullName,username,password,confirmPassword,gender} =req.body;
        if( password ==! confirmPassword){
            return res.status(400).json({error:"Passwords didn't match"})
        }

        const user= await User.findOne({username})
        if(user){
            return res.status(400).json({error:'User already exists'})
        }

        // hashing password here 
        const salt= await bcypt.genSalt(10);
        const hashedPassword= await bcypt.hash(password,salt)
        // http://avatar-placeholder.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser= new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male"? boyProfilePic: girlProfilePic
        })

        if (newUser){
            // generate JWT tocken
            generateTokenAndSetCookie (newUser._id, res);
            await newUser.save();

        res.status(201).json({
            _id: newUser.id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        })
        }
        else{
            res.status(400).json({error:"Invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({error:'Internal server error'})
    }
}

export const login= async (req,res) =>{
    try {
        const {username, password}= req.body; //getting input from the user
        const user= await User.findOne({username}) // checking whether the user exists
        const isPasswordCorrect= await bcypt.compare(password, user?.password || "");//checks whether the password is correct or not
// If there is anything that fails the error ids returned.
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({error:'Internal server error'})
    }
}

export const logout= (req, res) =>{
    try {
        res.cookie("jwt",'', {maxAge:0})
        res.status(200).json({message:'Logged out successfully'});   
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({error:'Internal server error'})
    }
}