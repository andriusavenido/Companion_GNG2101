import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { HistoryContextProvider } from './context/HistoryContext.jsx'
import { OptionContextProvider } from './context/OptionsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <HistoryContextProvider>
        <OptionContextProvider>
            <App />
        </OptionContextProvider>
      </HistoryContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
