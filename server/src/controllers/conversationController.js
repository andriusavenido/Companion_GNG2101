const Conversation = require('../models/conversationModel');
const mongoose = require('mongoose');

const getAllConversationsByUser = async (req, res) => {
    const user_id = req.user._id;

    try {
        const conversations = await Conversation.find({ user_id }).limit(10);
        res.status(200).json(conversations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createConversation = async (req, res) => {
    const { messages, timestamp } = req.body;
    const user_id = req.user._id;

    // Ensure messages array is not empty and contains valid message objects
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required and cannot be empty' });
    }

    try {
        const conversation = await Conversation.create({ user_id, messages, timestamp });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteConversation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid Query Id' });
    }

    try {
        const conversation = await Conversation.findOneAndDelete({ _id: id });

        if (!conversation) {
            return res.status(400).json({ error: 'No Conversation Exists' });
        }

        res.status(200).json({
            _id: conversation._id,
            msg: "Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllConversationsByUser, createConversation, deleteConversation
}