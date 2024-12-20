import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export const useLoginSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const json = await response.json(); // res is {email, username, token}

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
            return false;
        }

        if (response.ok) {
            // Save user to local storage, including the token
            localStorage.setItem('user', JSON.stringify(json)); 
            
            // Update auth context with the user data
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
        return true;
    };

    const signup = async (email, username, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password }),
        });

        const json = await response.json(); // res is {email, username, token}

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
            return false;
        }

        if (response.ok) {
            // Save user to local storage, including the token
            localStorage.setItem('user', JSON.stringify(json)); 
            
            // Update auth context with the user data
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
        return true;
    };

    const resetState = () =>{
        setError(null);
        setIsLoading(false);
    }

    const signout = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };

    return { login, signup, signout, isLoading, error,resetState };
};
