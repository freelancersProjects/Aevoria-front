import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Login from './components/Login/login'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Le reste du contenu viendra ici */}
        </Routes>
      </div>
    </Router>
  )
}

export default App 