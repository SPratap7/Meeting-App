import Meeting from "../models/meetings.js";
import mongoose from 'mongoose';


var ObjectId = mongoose.Types.ObjectId;

export const getMeetings = async (req,res) => {
    const { id:_id } = req.params;
    console.log(_id);
    if(_id == null)
        return res.status(200).json(null);
    try {
        const meetings = await Meeting.find({createdBy:_id});
        res.status(200).json(meetings);
    }
    catch {
        res.status(404).json({message: error.message});
    }
}

export const createMeeting = async (req,res) => {
    const meetings = req.body;
    
    const newMeeting = new Meeting({...meetings});
    try {
        await newMeeting.save();
        res.status(201).json(newMeeting);
    }
    catch {
        res.status(409).json({message: error.message});
    }
}

export const updateMeeting = async (req,res) => {

    const { id:_id } = req.params;
    const meeting = req.body;
    console.log(meeting,"adasdasd",_id);
    if(!ObjectId.isValid(_id)){
        return res.status(404).send("No Meeting with that Id");
    }
    try {
        const updatedMeeting = await Meeting.findByIdAndUpdate(_id, meeting, { new:true });
        res.status(200).json(updatedMeeting);
    }
    catch {
        res.status(409).json({message: error.message});
    }
}

export const deleteMeeting = async (req,res) => {

    const { id:_id } = req.params;

    if(!ObjectId.isValid(_id)){
        return res.status(404).send("No Meeting with that Id");
    }

    try {
        await Meeting.findByIdAndDelete(_id);
        res.status(200).json();
    }
    
    catch {
        res.status(409).json({message: error.message});
    }
}