import Conversation from "../models/conversation.js";
import User from '../models/user.js';
import mongoose from 'mongoose';

export const getConversations = async (req,res) => {
    const { userId } = req.params;
    console.log("A",userId);
    if(userId == null)
        return res.status(200).json({message:"no data provided"});
    try {
        const conversation = await Conversation.find({
            members: { $in : [userId] },
        });
        res.status(200).json(conversation);
    }
    catch {
        res.status(500).json({message: error.message});
    }
}


export const createConversation = async (req,res) => {
    const membersEmail = req.body.membersEmail;
    let roomName = req.body.roomName;
    if(membersEmail.length < 2){
        return res.status(500).json({message: "Not Enough Member to make conversation"});
    }
    else if(membersEmail.length == 2){
        roomName = "";
    }
    let members = [];
    for (let i = 0; i < membersEmail.length; i++){
        let tempUser = await User.findOne({ email: membersEmail[i], });
        members.push(String(tempUser._id));
    }
    const newConversation = new Conversation({
        members: members,
        roomName: roomName,
    });

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }
    catch {
        res.status(500).json({message: error.message});
    }
}