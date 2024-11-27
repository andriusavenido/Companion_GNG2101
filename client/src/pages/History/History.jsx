import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './History.module.css'; 
import useHistoryManager from '../../hooks/useHistoryManager';
import Conversation from '../../components/Conversation/Conversation';

const History = () => {

    const {conversationHistory,setConversationHistory,deleteConversation} = useHistoryManager();

    const handleDeletion = async (id) =>{
            try {
              // Call deleteConversation hook or service (if it interacts with a backend)
              await deleteConversation(id);
        
              // Remove the conversation from the local state
              setConversationHistory((prevHistory) =>
                prevHistory.filter((conversation) => conversation._id !== id)
              );
            } catch (error) {
              console.error("Failed to delete the conversation:", error);
              alert("An error occurred while trying to delete the conversation.");
            }
    }
  
    return (
        <div className={styles.pageContainer}>
           <header className={styles.header}>
                <h1>History</h1>
            </header>

            <div className={styles.conversationList}>
                {conversationHistory.length === 0 ? (
                    <p>No conversations found.</p>
                ) : (
                    [...conversationHistory]
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by latest date
                    .map((conversation) => (
                      <Conversation
                        key={conversation._id} // Assuming each conversation has a unique _id
                        id={conversation._id}
                        title={conversation.title}
                        messages={conversation.messages}
                        timestamp={conversation.timestamp}
                        handleDelete={() => handleDeletion(conversation._id)}
                      />
                    ))
                )}
            </div>
        </div>
    );
};

export default History;