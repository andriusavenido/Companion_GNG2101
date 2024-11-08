const Conversation = require('../models/conversationModel');
const mongoose = require('mongoose');

const getAllConversationsByUser = async (req, res) =>{
    const user_id = req.user._id;

    //get by user id, limit by 10
    const conversations = await Conversation.find({user_id}).limit(10);

    res.status(200).json(conversations);
}

const createConversation = async (req, res) =>{
    const {messages, timestamp} = req.body;
    const user_id = req.user._idl

    try{
        const conversation = await Conversation.create({user_id,messages, timestamp});
        res.status(200).json(conversation);
        
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const deleteConversation = async (req, res)=>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid Query Id'});
    }
    
    const conversation = await Conversation.findOneAndDelete({_id:id});

    if (!conversation){
        return res.status(400).json({error: 'No Conversation Exists'});
    }
    
    res.status(200).json({
        _id: conversation._id,
        msg: "Deleted Successfully"
    });
}

module.exports ={
    getAllConversationsByUser, createConversation, deleteConversation
}