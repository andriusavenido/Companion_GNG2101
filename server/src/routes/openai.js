const express = require('express');
const router = express.Router();

//grab service
const {getOpenAIResponse} = require('../services/openaiService');

router.post('/openAI-response', async (req, res) => {
    // const {message, rules } = req.body;
    // const json from parser
  
    // try {
    //   const openaiResponse = await getOpenAIResponseWithRules(message, rules);
    //   res.json({ openaiResponse });
    // } catch (error) {
    //   res.status(500).json({ error: error.message });
    // }
  });
  
module.exports=router;