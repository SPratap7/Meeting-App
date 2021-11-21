import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    isLoggedIn :  Boolean,
}, { timestamps: true })

export default mongoose.model("User",UserSchema);