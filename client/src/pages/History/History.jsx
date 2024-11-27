import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './History.module.css'; 
import { ReactSVG } from 'react-svg';
import testSVG from '../../assets/svg/Rainbow.svg'; 

const History = () => {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();
  
    return (
        <div className={styles.pageContainer}>
           
        </div>
    );
};

export default History;