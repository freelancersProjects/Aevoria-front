import React from 'react'
import ReactDOM from 'react-dom/client'
import { NotificationProvider } from './context/NotificationContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </React.StrictMode>
)
