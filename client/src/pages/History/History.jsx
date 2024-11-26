import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './History.module.css'; 
import { ReactSVG } from 'react-svg';
import testSVG from '../../assets/svg/Rainbow.svg'; 

const History = () => {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();
    const jwt = require('jsonwebtoken');

    useEffect(() => {
        console.log("History component mounted");
        // Fetch conversation history from the backend
        const fetchHistory = async () => {
            try {
                const response = await fetch('/api/conversations', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer jwt' , // Replace with your actual JWT
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched history:", data);
                setHistory(data);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, []);

    const handleConversationClick = (conversationId) => {
        navigate(`/chat/${conversationId}`);
    };

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <ReactSVG src={testSVG} className={styles.icon} />
                <h1>History</h1>
            </header>
            <div className={styles.historyContainer}>
                {history.length === 0 && <p>No conversation history available.</p>}
                {history.map((conversation) => (
                    <div 
                        key={conversation._id} 
                        className={styles.conversationBox} 
                        onClick={() => handleConversationClick(conversation._id)}
                    >
                        <div className={styles.conversationHeader}>
                            <span className={styles.conversationDate}>
                                {new Date(conversation.timestamp).toLocaleString()}
                            </span>
                        </div>
                        <div className={styles.conversationPreview}>
                            {conversation.messages.length > 0 ? conversation.messages[0].text : 'No messages'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;