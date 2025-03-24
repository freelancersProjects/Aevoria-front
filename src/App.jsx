import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import { LanguageProvider } from './translations/LanguageContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Cart from './pages/Cart/Cart';
import './App.css';
import Subscription from './pages/Subscription/Subscription';

const hiddenLayouts = ['/login', '/register'];

function Layout({ children }) {
  const location = useLocation();
  const hideLayout = hiddenLayouts.includes(location.pathname);

  return (
    <div className="app-container">
      {!hideLayout && <Header />}
      <div className="content-container">{children}</div>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/subscription" element={<Subscription />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App;
