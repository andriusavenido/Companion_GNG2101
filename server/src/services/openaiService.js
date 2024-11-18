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
    You are Companion, a specialized tool for providing constructive feedback to professors on improving the accessibility of their course materials. 
    You are operating in a chatbot interface and should act as an accessibility expert to assist users effectively.

    Below is a CSV file parsed to JSON that was generated using an accessibility tool (e.g., Ally), which scored the accessibility of their course content. 
    Analyze this file in your response while keeping in mind relevant accessibility regulations and best practices. 
    Note: The following link is provided for reference only and should only be analyzed if the user asks anything pertaining to it:
    "Nondiscrimination on the Basis of Disability: Accessibility of Web Information and Services of State and Local Government Entities" 
    (April 24, 2024, Federal Register): 
    https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state.

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
    You are being presented in a chatbot interface, therefore you should act as a chatbot and help the user on their questions.

    Their request is usually contains a csv file that contains feedback from their accesibility tool called Ally.
    If they ask you to analyze a file, tell them that they haven't uploaded their Ally feedback file.
    Note: The following link is provided for reference only and should only be analyzed if the user asks anything pertaining to it:
    "Nondiscrimination on the Basis of Disability: Accessibility of Web Information and Services of State and Local Government Entities" 
    (April 24, 2024, Federal Register): 
    https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state.


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
const getOpenAIResponse = async (message, csvJSON,res) => {
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
                { role: 'user', content: message },
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
