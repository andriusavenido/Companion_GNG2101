import { useState } from "react";

/**
 * Custom Hook to handle message and file state during conversations
 * 
 * @returns  messages (list), input(string text), setInput(function), sendMessage(function), handleFileUpload(function), uploadedFile(file)
 */
const useChatHandler = () =>{
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [responseIsLoading, setResponseIsLoading] =useState(false);
  

    //add message to state
    const addMessage = (sender, text) =>{
        setMessages((previousMessages) =>[
            ...previousMessages,
            {id: previousMessages.length+1, sender, text},
        ]);
    };

    //send message for bot response; TODO api call etc
    const sendMessage = async () =>{
        if (input.trim() === '') return;

        addMessage('user', input);

        const formData = new FormData();
        formData.append('file', uploadedFile);
        formData.append('message', input);

        setResponseIsLoading(true);
        try {
            const response = await fetch("/api/openai/companion-response", {method: 'POST', body: formData,});
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
        
            const json = await response.json();
            addMessage('bot', json.openaiResponse);

            setResponseIsLoading(false);
          } catch (error) {
            console.error(error.message);
          }
        
    };

    const handleFileUpload = (file) =>{
        if (file === null){
            setUploadedFile(null);
        }

        if (file.type === 'text/csv'){
            setUploadedFile(file);
        } else{
            addMessage('bot','Uh Oh! It seems that you tried to upload a non .csv file, unfortunately I cannot read that.')
        }

    };

    //file handler


    return {
        messages, input, setInput, sendMessage, handleFileUpload, uploadedFile, responseIsLoading
    };

}

export default useChatHandler;