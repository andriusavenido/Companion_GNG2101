import React from 'react';
import styles from './Dropdown.module.css';

const Dropdown = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className={styles.dropdown}>
            {/* Title Section */}
            <div
                className={styles.dropdownTitle}
                onClick={onToggle}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onToggle();
                }}
            >
                {title}
            </div>
            {/* Content Section */}
            <div className={`${styles.dropdownContent} ${isOpen ? styles.open : ''}`}>
                {isOpen && children}
            </div>
        </div>
    );
};

export default Dropdown;
