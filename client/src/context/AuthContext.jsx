import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

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
        const user = JSON.parse(localStorage.getItem("user"));

        //check if token expired by check authentication api call
        const authCheck = async () =>{
            if (!user || !user.token){
                logoutUser();
                return;
            }

            try{
                const response = await fetch('/api/user/auth-check',{
                    headers:{
                        Authorization: `Bearer ${user.token}`
                    }
                });

                if (response.status===401){
                    const data = await response.json();
                    if (data.error === 'Expired Token'){    
                        logoutUser();
                    }else {
                        console.error('Unauthorized request:', data.error);
                    }
                }

            }catch(err){
                console.log("Error during authentication check", err);
            }
        }

        const logoutUser = () => {
            localStorage.removeItem("user");
            dispatch({ type: "LOGOUT" });
          };
      
          //login if login route went through
          if (user) {
            dispatch({ type: "LOGIN", payload: user });
            authCheck();
          }
    },[]);

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )

}

//accessor hook
export const useAuthContext = () =>{
    return useContext(AuthContext);

}