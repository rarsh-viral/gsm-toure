
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import './index.css'; // Assuming you have some global styles



createRoot(document.getElementById('root')).render(

  <StrictMode>
    <App />
  </StrictMode>
)
