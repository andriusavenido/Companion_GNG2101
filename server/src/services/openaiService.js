
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
const generateCompanionPromptWithCSV = (csvData) => {
    const csvText = JSON.stringify(csvData, null, 1);
    return `
     You are Companion a specialized tool for providing constructive feedback to professors on improving the accessibility of their course materials. 
    You are being presented in a chatbot interface on the Companion Website, therefore you should act as a chatbot and help the user on their questions.

    Details of the Companion Website if you need it or they ask:
    - Accessibility Resource Page
    - History Page (they can view and continue old conversations but they must login to do so)
    - About Page

    Below is a CSV file parsed to JSON that was generated using an accessibility tool (e.g., Ally), which scored the accessibility of their course content. 
    Analyze this file in your response while keeping in mind relevant accessibility regulations and best practices. 
  
    <CSV FILE>
    ${csvText}
    <END OF CSV FILE>

    When responding to the user's question:
    - Address their inquiry succinctly and accurately.
    - Ensure your suggestions align with accessibility best practices and standards.
    - Provide practical, constructive feedback aimed at improving the accessibility of course materials.
    - Do not help with anything that is not related to your role (you cannot code, write creatively, etc)
    `;
};


const generateCompanionPrompt = () =>{
    return `
     You are Companion a specialized tool for providing constructive feedback to professors on improving the accessibility of their course materials. 
    You are being presented in a chatbot interface on the Companion Website, therefore you should act as a chatbot and help the user on their questions.

    Details of the Companion Website if you need it or they ask:
    - Accessibility Resource Page
    - History Page (they can view and continue old conversations but they must login to do so)
    - About Page

    Their request is usually contains a csv file that contains feedback from their accesibility tool called Ally.
    If they ask you to analyze a file, tell them that they haven't uploaded their Ally feedback file.
    
     When responding to the user's question:
    - Address their inquiry succinctly and accurately.
    - Ensure your suggestions align with accessibility best practices and standards.
    - Provide practical, constructive feedback aimed at improving the accessibility of course materials.
    - Do not help with anything that is not related to your role (you cannot code, write creatively, etc)
    `;
}


/**x
 * Send request and receive response from OpenAI API
 * @param {String} message The user message
 * @param {Object} csvJSON Parsed CSV data in JSON format
 * @returns {String} The response text from OpenAI
 */
const getOpenAIResponse = async (messages, csvJSON, res) => {
    try {
        // Generate the companion prompt with the provided message and CSV data
        let prompt = null;
        if (!csvJSON){
            prompt=generateCompanionPrompt();
        }else{
            prompt= generateCompanionPromptWithCSV(csvJSON);
        }
        // Use the chat completions API in OpenAI
        const response = await openai.chat.completions.create({
            model: 'gpt-4o', // You can change this to gpt-4 if necessary
            messages: [
                { role: 'system', content: prompt },
               ...messages,
            ],
            max_tokens: 8192, // 8192 is recommended token limit (be careful with costs)
            temperature: 0.4,  
            stream:true,//collect a streamed response from api
        });
         //stream response to frontend send it incrementally; note that await pauses async function
         for await(const chunk of response){
            const newText= chunk.choices[0].delta.content ||'';
             // Use res.write to send each chunk of data to the frontend as it arrives
             res.write(newText);// This sends each chunk to the client in SSE FORMAT
         }

         
        // End the response once the streaming is finished
        res.end();

        // return response.choices[0].message.content; // Access the message content from the response
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        throw new Error('Failed to get OpenAI response');
    }
};

module.exports = { getOpenAIResponse };
