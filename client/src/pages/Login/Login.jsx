import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; // Import the context to dispatch login
import { useLoginSignup } from '../../hooks/useLoginSignup'; // Assuming you still want to use this hook for signup

const Login = () => {
    const [view, setView] = useState(''); // Manage which form is shown
    const navigate = useNavigate();
    const { dispatch } = useAuthContext(); // Access context to dispatch login action

    const {login, signup, isLoading, error} = useLoginSignup(); // This hook might still be useful for signup

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); // For registration

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    const showRegister = () => setView('register');
    const showLogin = () => setView(''); // This switches back to the login view

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            // Call the login function from your hook or directly fetch API
            const loggedIn = await login(email, password);

            if (loggedIn) {
                // Save user data and token to localStorage
                const user = {
                    email,
                    username,
                    token: loggedIn.token, // Assuming the loggedIn object contains a token
                };
                localStorage.setItem('user', JSON.stringify(user));

                // Dispatch the LOGIN action to update the global state in AuthContext
                dispatch({ type: 'LOGIN', payload: user });

                // Navigate to home/dashboard after login
                navigate('/');
            }
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    // Handle Signup
    const handleSignUp = async (e) => {
        e.preventDefault();
        
        try {
            const signedUp = await signup(email, username, password);

            if (signedUp) {
                // Save user data and token to localStorage
                const user = {
                    email,
                    username,
                    token: signedUp.token, // Assuming the signedUp object contains a token
                };
                localStorage.setItem('user', JSON.stringify(user));

                // Dispatch the LOGIN action to update the global state in AuthContext
                dispatch({ type: 'LOGIN', payload: user });

                // Navigate to home/dashboard after signup
                navigate('/');
            }
        } catch (err) {
            console.error("Signup failed:", err);
        }
    };

    // Testing purposes: logging loading state and errors
    useEffect(() => {
        console.log(isLoading);
        console.log(error);
    }, [isLoading, error]);

    return (
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
                    <button onClick={handleSignUp} className={styles.Button}>Submit</button>
                </div>
            )}
        </div>
    );
};

export default Login;


