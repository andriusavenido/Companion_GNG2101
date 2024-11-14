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

//TODO: prompt is not finished -> more testing required
//TODO: ADDING CHAT HISTORY from front end
const generateCompanionPromptWithCSV = (message, csvData) => {
    const csvText = JSON.stringify(csvData, null, 1);  
    return `
    You are Companion a specialized tool for providing constructive feedback to professors on improving the accessibility of their course materials. 
    You are being presented in a chatbot interface, therefore you should act as a chatbot and help the user on their questions.

    Below CSV file parsed to JSON that was given to the professor using another
    accessibility tool Ally which scored their course content. Analyze this file to keep in mind when 
    answering the questions of the professor.

    <CSV FILE>
    ${csvText}
    <END OF CSV FILE>

    Keep your responses brief. 
    Please respond to the following message sent by the user, and respond accurately:
    <START OF MESSAGE>
    ${message}
    <END OF MESSAGE>


    `;
};

const generateCompanionPrompt = (message) =>{
    return `
     You are Companion a specialized tool for providing constructive feedback to professors on improving the accessibility of their course materials. 
    You are being presented in a chatbot interface, therefore you should act as a chatbot and help the user on their questions.

    Their request is usually contains a csv file that contains feedback from their accesibility tool called Ally.
    If they ask you to analyze a file, tell them that they haven't uploaded their Ally feedback file.

    Rules:
    - Keep your responses brief. 
    - Only answer questions and topics pertaining to your role, do not go off topic and tell them if they ask.
    Please respond to the following message sent by the user, and respond accurately:
    <START OF MESSAGE>
    ${message}
    <END OF MESSAGE>
    `;
}


/**x
 * Send request and receive response from OpenAI API
 * @param {String} message The user message
 * @param {Object} csvJSON Parsed CSV data in JSON format
 * @returns {String} The response text from OpenAI
 */
const getOpenAIResponse = async (message, csvJSON) => {
    try {
        // Generate the companion prompt with the provided message and CSV data
        let prompt = null;
        if (!csvJSON){
            prompt=generateCompanionPrompt(message);
        }else{
            prompt= generateCompanionPromptWithCSV(message, csvJSON);
        }

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
