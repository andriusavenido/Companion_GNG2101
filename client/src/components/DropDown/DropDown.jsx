import React, { useState } from 'react';
import styles from './Dropdown.module.css';

const Dropdown = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdownTitle} onClick={toggleDropdown}>
                {title}
            </div>
            <div className={`${styles.dropdownContent} ${isOpen ? styles.open : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default Dropdown;