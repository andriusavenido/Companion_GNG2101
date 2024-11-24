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
    
        const parsedMessages = JSON.parse(req.body.message);//unstring the json messages array
        const messages = convertMessagesToGPTRoles(parsedMessages);  //convert to gpt acceptable format

        // Send the parsed CSV JSON and message to OpenAI service and stream the response
        res.setHeader('Content-Type', 'application/json');
        await getOpenAIResponse(messages, csvJSON,res); //pass res object to directly stream to it

        // // Send the OpenAI response back to the client
        // res.json({ openaiResponse });

    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Reformats an array of objects from front end (message history), into defined roles for chatgpt
 * 
 * @param {*} messages 
 * @returns array of objects
 */
function convertMessagesToGPTRoles(messages){
    //grab the latest 6 messages
    const latestMessages = messages.slice(-10);

    return latestMessages.map(message=>{
        const role = message.sender === 'user'?'user':'assistant';
        return {
            role:role,
            content:message.text
        }
    })
}

module.exports = router;