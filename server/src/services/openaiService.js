const { OpenAI } = require('openai');

// Initialize OpenAI with the API key
const openai = new OpenAI({
    apiKey: process.env.OPENAIKEY,
});


/**
 * Create custom prompt with all of our parameters
 * @param {JSON} jsonData to be attatched into parameter
 * 
 * TODO: we want to add more things when creating prompt, like rules and regulations etc...
 */

//Wasnt to sure of format, so change if neccessary
const generateCompanionPrompt = (message, csvData) => {
    const csvText = JSON.stringify(csvData, null, 2);  
    return `
    Here is a set of data in JSON format: 
    ${csvText}

    Please respond to the following message with the best possible answer:
    ${message}
    `;
};


/**
 * Send request and receive response from OpenAI API
 * @param {String} message The user message
 * @param {Object} csvJSON Parsed CSV data in JSON format
 * @returns {String} The response text from OpenAI
 */
const getOpenAIResponse = async (message, csvJSON) => {
    try {
        // Generate the companion prompt with the provided message and CSV data
        const prompt = generateCompanionPrompt(message, csvJSON);  

        // Use the chat completions API in OpenAI
        const response = await openai.chat.completions.create({
            model: 'gpt-4o', // You can change this to gpt-4 if necessary
            messages: [
                { role: 'system', content: 'You are an assistant that analyzes data.' },
                { role: 'user', content: prompt },
            ],
            max_tokens: 1000, // Adjust token limit as necessary
            temperature: 0.4,  
        });

        return response.choices[0].message.content; // Access the message content from the response
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        throw new Error('Failed to get OpenAI response');
    }
};

module.exports = { getOpenAIResponse };
