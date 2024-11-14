import { useContext, useReducer, useState } from "react";

const AuthContext = useContext();

//reducer to control what functions to do LOGIN AND LOGOUT -- SETTING USER GLOBAL STATE
const authReducer = (state, action)=>{
    switch(action.type){
        case "LOGIN":
            return {user:action.payload};
        case "LOGOUT":
            return {user:null};
        default:
            return state;
    }
}

//this context only handles the state of the program, not where login and sign up routes are called
export const AuthContextProvider = ({children}) =>{
   const [state, dispatch] = useReducer(authReducer,{
    user:null,
   })

   //on mount, try to do an auto login if their token is still valid
    useEffect(() =>{
        const userLocal = JSON.parse(localStorage.getItem("user"));

        //check if token expired by api call

        const logoutUser = () => {
            localStorage.removeItem("user");
            dispatch({ type: "LOGOUT" });
          };
      
          //login if login route went through
          if (user) {
            dispatch({ type: "LOGIN", payload: user });
            fetchCheck();
          }
    });

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuthContext = () =>{

}