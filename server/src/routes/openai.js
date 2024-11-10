const express = require('express');
const multer = require('multer');
const router = express.Router();

//grab services
const {getOpenAIResponse} = require('../services/openaiService');
const {csvToJson} = require('../services/csvService');

//set up multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/companion-response', upload.single('file'), async (req, res) => {
  const file = req.file;
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