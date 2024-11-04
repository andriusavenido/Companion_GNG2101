const {Configuration, OpenAIApi} = require('openai');

//configure key
const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAIKEY
}));

/**
 * Create custom prompt with all of our parameters
 * @param {JSON} jsonData to be attatched into parameter
 * 
 * TODO: we want to add more things when creating prompt, like rules and regulations etc...
 */
const generateCompanionPrompt = (jsonData)=>{

};


/**
 * Send request and receive response from openai api services
 * @param {String} message 
 * @param {JSON} csvJSON 
 */
const getOpenAIResponse = async (message, csvJSON) =>{
    const prompt = generateCompanionPrompt(csvJSON);


};

module.exports = {getOpenAIResponse};