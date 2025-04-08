import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/publisher/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';
import Developers from './pages/publisher/Developers/Developers';
import CreateDeveloper from './pages/publisher/Developers/CreateDeveloper/CreateDeveloper';
import Game from './pages/publisher/Game/Game';
import Calendar from './pages/publisher/Calendar/Calendar';
import Sales from './pages/publisher/Sales/Sales';
import PageSection from './pages/publisher/PageSection/PageSection';
import Notes from './pages/publisher/Notes/Notes';
import Analytics from './pages/publisher/Analytics/Analytics';
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
            <Route path="/games" element={<Game />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/pages" element={<PageSection />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
