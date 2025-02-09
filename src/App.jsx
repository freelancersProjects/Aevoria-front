import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header/Header'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Le reste du contenu viendra ici */}
      </div>
    </Router>
  )
}

export default App 