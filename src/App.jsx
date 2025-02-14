import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Login from './components/Login/login'
import './App.css'
import Footer from './components/Footer/Footer'
import { LanguageProvider } from './translations/LanguageContext'
import Home from './pages/Home/Home'

function App() {
  return (
    <LanguageProvider>
      <div id="root">
        <Router>
          <div className="app-container">
            <Header />
            <div className="content-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
              </Routes>
              <Footer />
            </div>
          </div>
        </Router>
      </div>
    </LanguageProvider>
  )
}

export default App 