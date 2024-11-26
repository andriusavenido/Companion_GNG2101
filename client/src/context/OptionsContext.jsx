import { createContext, useContext, useEffect,useState } from "react";


const OptionContext=createContext();

export const OptionContextProvider = ({children}) =>{

    const[theme, setTheme] = useState(()=>{
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme: 'default';
    })

    useEffect(()=>{
        const root = document.documentElement;

        switch(theme){
            case 'default':
                root.style.setProperty('--var-bg-color','var(--background-dark)');
                root.style.setProperty('--var-bg-accent','var(--dark-deep)');
                root.style.setProperty('--var-font-color','var(--white-main)');
                root.style.setProperty('--var-speech-color', 'var(--white-main)');
                break;
            case 'light':
                root.style.setProperty('--var-bg-color','var(--white-main)');
                root.style.setProperty('--var-bg-accent','var(--white-deep)');
                root.style.setProperty('--var-font-color','#000000');
                root.style.setProperty('--var-speech-color', '#000000');
                break;
            case 'highcontrast':
                root.style.setProperty('--var-bg-color', 'var(--high-contrast-background)');
                root.style.setProperty('--var-bg-accent', 'var(--high-contrast-accent)');
                root.style.setProperty('--var-font-color', 'var(--high-contrast-font)');
                root.style.setProperty('--var-speech-color', '#000000');
                break;
        }

        localStorage.setItem('theme',theme);
    },[theme]);

    return(
        <OptionContext.Provider value={{theme,setTheme}}>
            {children}
        </OptionContext.Provider>
    );
}

export const useOptionsContext=()=>{
    const context = useContext(OptionContext);

    if (!context){
        throw Error ('Error in optionsContext');
    }

    return context;
}