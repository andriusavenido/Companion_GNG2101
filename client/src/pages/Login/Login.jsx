import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [view, setView] = useState(''); // Manage which form is shown
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); // For registration

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const showRegister = () => setView('register');
    const showLogin = () => setView(''); // This switches back to the login view

    return (
        <div className={styles.LoginBox}>
            {view === '' && (
                <div>
                    <h2>Login / SignUp form</h2>
                    <div className={styles.FormContainer}>
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Username"
                            className={styles.Input}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            className={styles.Input}
                        />
                        <button onClick={() => navigate('/')} className={styles.Button}>Login</button>
                        <t>-------- or Sign Up--------</t>
                        <button onClick={showRegister} className={styles.Button}>Register</button>
                    </div>
                </div>
            )}

            {view === 'register' && (
                <div className={styles.FormContainer}>
                    <h2>Register</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        className={styles.Input}
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Username"
                        className={styles.Input}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        className={styles.Input}
                    />
                    <button onClick={showLogin} className={styles.Button}>Submit</button> {/* Corrected function call */}
                </div>
            )}

        </div>
    );
};

export default Login;

