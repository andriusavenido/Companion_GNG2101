const express = require("express");
const router = express.Router();

const {getAllConversationsByUser,createConversation,deleteConversation} = require('../controllers/conversationController');
const {userAuth}= require('../middleware/userAuth');

router.use(userAuth);

router.get('/',getAllConversationsByUser);

router.post('/', createConversation);

router.delete('/:id', deleteConversation);


module.exports=router;