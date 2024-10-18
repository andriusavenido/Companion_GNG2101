import { useState } from "react";

/**
 * Custom Hook to handle message and file state during conversations
 * 
 * @returns  messages (list), input(string text), setInput(function), sendMessage(function), handleFileUpload(function), uploadedFile(file)
 */
const useChatHandler = () =>{
    const [messages, setMessages] = useState([
        {id: 1, sender: 'bot', text: 'Hello World'},
    ]);
    const [input, setInput] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
  

    //add message to state
    const addMessage = (sender, text) =>{
        setMessages((previousMessages) =>[
            ...previousMessages,
            {id: previousMessages.length+1, sender, text},
        ]);
    };

    //send message for bot response
    const sendMessage = () =>{

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

    //scroll to bottom

    return {
        messages, input, setInput, sendMessage, handleFileUpload, uploadedFile
    };

}

export default useChatHandler;