import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/publisher/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';
import Developers from './pages/publisher/Developers/Developers';
import CreateDeveloper from './pages/publisher/Developers/CreateDeveloper/CreateDeveloper';
import Calendar from './pages/publisher/Calendar/Calendar';
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
            <Route path="/developers/edit/:id" element={<CreateDeveloper />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
