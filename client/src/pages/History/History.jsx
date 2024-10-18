import React, { useState } from 'react';
import styles from './History.module.css'; 
import { ReactSVG } from 'react-svg';
import testSVG from '../../assets/svg/Rainbow.svg'; 

const History = () => {
    const [history, setHistory] = useState([
        { 
            question: 'What is React?', 
            response: 'React is a JavaScript library for building user interfaces.',
            date: '2024-10-18'
        },
        { 
            question: 'What is JSX?', 
            response: 'JSX stands for JavaScript XML.',
            date: '2024-10-17'
        },
        { 
            question: 'How does useState work?', 
            response: 'It allows you to add state to functional components.',
            date: '2024-10-16'
        }
    ]);

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <ReactSVG src={testSVG} className={styles.icon} />
                <h1>History</h1>
            </header>
            <div className={styles.historyContainer}>
                {history.map((entry, index) => (
                    <Block 
                        key={index} 
                        question={entry.question} 
                        response={entry.response} 
                        date={entry.date} 
                    />
                ))}
            </div>
        </div>
    );
};

// Block component for each question-response pair
const Block = ({ question, response, date }) => {
    return (
        <div className={styles.blockContainer}>
            <div className={styles.blockHeader}>
                <span className={styles.blockDate}>{date}</span>
            </div>
            <h3>Question: {question}</h3>
            <div className={styles.responseContainer}>
                <ReactSVG src={testSVG} className={styles.icon} />
                <p>{response}</p>
            </div>
        </div>
    );
};

export default History;

