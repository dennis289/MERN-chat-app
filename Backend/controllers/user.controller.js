import User from "../models/user.models.js";

export const getUsersForSidebar= async (req,res) =>{
    try {
        const loggedInUserId= req.user._id;

        const filteredUsers= await User.find({ _id: {$ne: loggedInUserId}}).select('-password')// for all users in exeption of the logged in user
        return res.status(200).json(filteredUsers)

    } catch (error) {
        console.log('error in getUsersForSidebar',error.message)
        res.status(500).json({error:"Internal server error"})
    }
};