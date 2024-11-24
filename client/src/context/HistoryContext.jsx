import { createContext, useContext, useState } from "react";

const HistoryContext = createContext();

export const HistoryContextProvider= ({children})=>{
    const [messageHistory, setMessageHistory] = useState([]);

    const clearMessageHistory = () =>{
        setMessageHistory([]);
    }

    return (<HistoryContext.Provider value={{messageHistory, setMessageHistory, clearMessageHistory}}>
        {children}
    </HistoryContext.Provider>);
}

export const useHistoryContext = () =>{
    return useContext(HistoryContext);
}