import mongoose from 'mongoose';

const MeetingSchema = mongoose.Schema({
    title: String,
    from: {
        type: Date,
        default: new Date()
    },
    to: {
        type: Date,
        default: new Date()
    },
    dateOn:{
        type: Date,
        default: new Date()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

export default mongoose.model("Meetings",MeetingSchema);