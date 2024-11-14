const express = require('express');
const multer = require('multer');
const router = express.Router();

// Grab services
const { getOpenAIResponse } = require('../services/openaiService');
const { csvToJson } = require('../services/csvService');

// Set up multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/companion-response', upload.single('file'), async (req, res) => {
    const file = req.file;

    try {
        let csvJSON = null;
        if (file){
            csvJSON = await csvToJson(file.buffer);
        }
        
        const { message} = req.body; 
        
        // Send the parsed CSV JSON and message to OpenAI service
        const openaiResponse = await getOpenAIResponse(message, csvJSON);

        // Send the OpenAI response back to the client
        res.json({ openaiResponse });

    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;