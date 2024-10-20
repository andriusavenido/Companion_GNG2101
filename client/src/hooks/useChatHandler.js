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
    const [reponseIsLoading, setResponseIsLoading] =useState(false);
  

    //add message to state
    const addMessage = (sender, text) =>{
        setMessages((previousMessages) =>[
            ...previousMessages,
            {id: previousMessages.length+1, sender, text},
        ]);
    };

    //send message for bot response; TODO api call etc
    const sendMessage = () =>{
        if (input.trim() === '') return;

        addMessage('user', input);

        //for prototype 1:
        setResponseIsLoading(true);
        setTimeout(()=>{
            const botResponse = `Bot Response! You said: ${input}`;
            addMessage('bot', botResponse);
            setResponseIsLoading(false);
        },700);
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
        messages, input, setInput, sendMessage, handleFileUpload, uploadedFile, reponseIsLoading
    };

}

export default useChatHandler;