import Message from "../models/message.js";
import mongoose from 'mongoose';

export const getMessages = async (req,res) => {
    const { conversationId } = req.params;
    console.log(conversationId);
    if(conversationId == null)
        return res.status(200).json(null);
    try {
        const conversation = await Message.find({
            conversationId: conversationId,
        });
        res.status(200).json(conversation);
    }
    catch {
        res.status(500).json({message: error.message});
    }
}


export const createMessage = async (req,res) => {
    let message = req.body;
    console.log(message);
    try{
        const newMessage = new Message(message);
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }
    catch {
        res.status(500).json({message: error.message});
    }
}