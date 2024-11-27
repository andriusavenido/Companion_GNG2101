import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";

const useHistoryManager = () => {
    const {user} = useAuthContext();
    const [conversationHistory,setConversationHistory]= useState([]);

     // Fetch conversations when the component mounts
     useEffect(() => {
        if (user) {
            fetchConversations();
        }
    }, [user]);

    const fetchConversations = async()=>{
        try {
            const response = await fetch("/api/conversations/", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${user.token}`, // Assuming JWT is used for auth
              },
            });
      
            if (!response.ok) {
              throw new Error("Failed to fetch conversations");
            }
      
            const data = await response.json();
            setConversationHistory(data);
          } catch (error) {
            console.error("Error fetching conversations:", error);
          }
    }

    const createConversation= async (messages) =>{
         // Set the title to the first message's text, truncated to 10 characters with "..."
        const title = messages[0].text.length > 10 ? `${messages[messages.length-1].text.substring(0, 50)}...`: messages[0].text;

        // Prepare conversation data with title and timestamp
        const conversationData = {
            messages,
            title,
            timestamp: new Date().toISOString(), // Add current timestamp
        };
        try {
            const response = await fetch("/api/conversations/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify(conversationData),
            });
      
            if (!response.ok) {
              throw new Error("Failed to create conversation");
            }
      
            const newConversation = await response.json();
            setConversationHistory((prev) => [...prev, newConversation]);
          } catch (error) {
            console.error("Error creating conversation:", error);
          }
    }

    const deleteConversation = async (conversationId) =>{
        try {
            const response = await fetch(`/api/conversations/${conversationId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            });
      
            if (!response.ok) {
              throw new Error("Failed to delete conversation");
            }
      
            // Remove the deleted conversation from state
            setConversationHistory((prev) =>
              prev.filter((conv) => conv._id !== conversationId)
            );
          } catch (error) {
            console.error("Error deleting conversation:", error);
          }
    }

    return {conversationHistory,setConversationHistory, fetchConversations,createConversation,deleteConversation};
}
 
export default useHistoryManager;