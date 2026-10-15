
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/800.css'
import '../../shared/styles/tokens.css'
import './styles/index.css'
import App from './App.jsx'
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
 
