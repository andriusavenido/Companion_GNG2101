import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useLoginSignup } from '../../hooks/useLoginSignup';

const Login = () => {
    const [view, setView] = useState('');
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const { login, signup, isLoading, error, resetState } = useLoginSignup();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    const showRegister = () => {
        setView('register');
        setUsername('');
        setPassword('');
        setEmail('');
        resetState();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loggedIn = await login(email, password);
            if (loggedIn) navigate('/');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const signedUp = await signup(email, username, password);
            if (signedUp) navigate('/');
        } catch (err) {
            console.error('Signup failed:', err);
        }
    };

    useEffect(() => {
        console.log(isLoading);
        console.log(error);
    }, [isLoading, error]);

    return (
        <div className={styles.LoginBackground}>
            <div className={styles.LoginBox}>
                {view === '' && (
                    <div>
                        <h2>Login / SignUp form</h2>
                        <div className={styles.FormContainer}>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Email"
                                className={styles.Input}
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Password"
                                className={styles.Input}
                            />
                            <button onClick={handleLogin} className={styles.Button}>
                                Login
                            </button>
                            <p>-------- or Sign Up--------</p>
                            <button onClick={showRegister} className={styles.Button}>
                                Register
                            </button>
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
                        <button onClick={handleSignUp} className={styles.Button}>
                            Submit
                        </button>
                    </div>
                )}

                {error && <div className={styles.error}>{error}</div>}
            </div>
        </div>
    );
};

export default Login;



