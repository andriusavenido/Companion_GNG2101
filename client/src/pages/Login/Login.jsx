import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useLoginSignup } from '../../hooks/useLoginSignup';

/**
 * TODO: adding a error and loading state
 * @returns 
 */
const Login = () => {
    const [view, setView] = useState(''); // Manage which form is shown
    const navigate = useNavigate();
    const {login, signup, isLoading, error} = useLoginSignup();

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

    const handleLogin = async (e)=>{
        e.preventDefault();
        const loggedIn = await login(email,password);
        if (loggedIn){
            navigate('/');
        }
    }

    const handleSignUp = async (e)=>{
        e.preventDefault();
        
        const signedUp = await signup(email, username, password);
 
        if (signedUp){
         navigate('/');
        }
    }

    //testing purposes
    useEffect(()=>{
        console.log(isLoading);
        console.log(error);
    },[isLoading,error]);

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
                        <button onClick={handleLogin} className={styles.Button}>Login</button>
                        <p>-------- or Sign Up--------</p>
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
                    <button onClick={handleSignUp} className={styles.Button}>Submit</button> {/* Corrected function call */}
                </div>
            )}

        </div>
    );
};

export default Login;

