import mongoose from 'mongoose';

const ConversationSchema = mongoose.Schema({
    members: {
        type: Array,
    },
    roomName: {
        type: String,
        default: "",
    }
}, { timestamps: true })

export default mongoose.model("Conversation",ConversationSchema);