import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/main.css'
import { Analytics } from "@vercel/analytics";

// Create root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Analytics></Analytics>
    <App />
  </React.StrictMode>
)