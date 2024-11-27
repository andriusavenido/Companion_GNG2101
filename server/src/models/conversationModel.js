const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    title:{
        type: String,
        required: true,
    },
    messages:[ {
        id: {
            type: Number,
            required: true,
        },
        sender: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },],
    timestamp: {
        type: Date,
        default: Date.now,
    }
},{collection:'conversations'});

module.exports = mongoose.model('Conversation',conversationSchema);