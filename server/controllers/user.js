import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

var loggedInUser = import('../constants/userConstants.js');

export const login = async (req,res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser){
            return res.status(404).send({message: "User doesn't exist."});
        }

        const isPasswordCurrent = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCurrent){
            return res.status(404).send({message: "Invalid Credentials"});
        }
        const token = jwt.sign({ email: existingUser.email, id:existingUser.id }, 'test', {expiresIn: "1h"});

        loggedInUser.userId = existingUser._id;
        loggedInUser.userToken = token;
        
        res.status(200).json({result: existingUser, token});
    }
    catch(error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

export const signup = async (req,res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(401).send({message: "User already exists"});
        }
        if(password !== confirmPassword){
            return res.status(401).send({message: "Password don't match"});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({email,password: hashedPassword, name: `${firstName} ${lastName}`, isLoggedIn:true});
        const token = jwt.sign({ email: result.email, id: result.id }, 'test', {expiresIn: "1h"});

        loggedInUser.userId = result._id;
        loggedInUser.userToken = token;
        console.log("A");
        res.status(200).json({ result, token });
    }
    catch(error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

export const getUsers = async (req,res) => {
    const userIds = req.params.userIds.split(',');
    console.log(userIds,"B");
    try {
        let usersData = {};
        for (let i = 0; i < userIds.length; i++){
            let user = await User.findById(userIds[i]);
            usersData[userIds[i]] = user;
        }
        res.status(200).json(usersData);
    }
    catch(error) {
        res.status(500).json({message: "Something went wrong"});
    }
}