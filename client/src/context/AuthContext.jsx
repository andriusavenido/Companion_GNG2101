import { useContext, useState } from "react";

const AuthContext = useContext();

export const AuthContextProvider = ({children}) =>{
    const [user, setUser] = useState(null);

}

export const useAuthContext = () =>{

}