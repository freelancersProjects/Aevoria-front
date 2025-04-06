import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/publisher/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';
import Developers from './pages/publisher/Developers/Developers';
import CreateDeveloper from './pages/publisher/Developers/CreateDeveloper/CreateDeveloper';
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/developers/create" element={<CreateDeveloper />} />
            {/* Autres routes ici */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
