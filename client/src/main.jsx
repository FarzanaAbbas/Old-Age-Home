import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* wrapping our app with Browser Router . So React-Router-dom is only package used*/}
        <App />
    </BrowserRouter>

  </React.StrictMode>,
)
