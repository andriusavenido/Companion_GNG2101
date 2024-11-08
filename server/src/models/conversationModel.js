const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Schema for storing individual messages in a conversation.
 * @property {string} sender - The sender of the message ('user' or 'bot').
 * @property {string} text - The content of the message.
 */
const messageSchema = new Schema({
    sender:{
        type: String,
        enum: ['user', 'bot'],
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
});

/**
 * Schema for storing a log of a user's conversation with ChatGPT.
 * @property {Schema.Types.ObjectId} userId - The ID of the user having the conversation.
 * @property {Message[]} messages - An array of message objects representing the conversation.
 * @property {Date} timestamp - The timestamp of the conversation
 */
const conversationSchema = new Schema ({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:'true',
    },
    messages:[messageSchema],
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Conversation',conversationSchema);