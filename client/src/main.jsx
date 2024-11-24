import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { HistoryContextProvider } from './context/HistoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <HistoryContextProvider>
         <App />
      </HistoryContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
