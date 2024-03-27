import { getRecieverSocketId, io } from "../Socket/socket.js";
import Conversation from "../models/conversation.models.js";
import Message from "../models/message.model.js"

export const sendMessage= async(req,res) =>{
    try {
        const {message} = req.body //input message from the user 
        const {id:recieverId} =req.params; //get user ID
        const senderId = req.user._id
//check conversation between the two users
        let conversation= await Conversation.findOne({
            participants:{$all: [senderId,recieverId]}
        })
//creating a conversation if it does not exist
        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,recieverId]
            })
        }
//create a new message
        const newMessage= new Message({
            senderId,
            recieverId,
            message,
        })
        //put the message into the messages array in this conversation
        if (newMessage){
            conversation.messages.push(newMessage._id)
        }
        // await conversation.save();
        // await newMessage.save();

        // this will now run in parallel to increase optimization

        await Promise.all([conversation.save(),newMessage.save()])
// soket io will go here when the conversation will be real-time
        const recieverSocketId= getRecieverSocketId(recieverId) 
        if (recieverSocketId){
            //io.to (<socketId>).emit('event',data) will send the event to the specific user
            io.to(recieverSocketId).emit('newMessage',newMessage)
        }

        
        ///send the message as a responce
        res.status(201).json(newMessage)
    } catch (error) {
        console.log('Error in sendmessage controller:',error.message)
        res.status(400).json({error:"Internal server error"})
    }
}

export const getMessages = async (req,res) =>{
    try {
        const {id:userToChatId} = req.params;
        const senderId= req.user._id;

        const conversation= await Conversation.findOne({
            participants:{ $all:[senderId,userToChatId]}
        }).populate('messages') //not reference but the message itself
        if (!conversation) return res.status(200).json([])
        const messages= conversation.messages;
        res.status(200).json(messages)



    } catch (error) {
        console.log('Error in sendmessage controller:',error.message)
        res.status(400).json({error:"Internal server error"})
    }
}