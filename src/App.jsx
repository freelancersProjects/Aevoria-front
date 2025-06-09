import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import { LanguageProvider } from './translations/LanguageContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Cart from './pages/Cart/Cart';
import DemoForm from './pages/DemoForm/DemoForm';
import './App.css';
import Subscription from './pages/Subscription/Subscription';
import WishlistViewCanvas from './pages/WishlistViewCanvas/WishlistViewCanvas';
import Profile from './pages/Profile/Profile';
import ViewGame from './pages/ViewGame/ViewGame';
import MessagePage from './pages/Message/MessagePage';
import BlogPage from './pages/BlogPage/BlogPage';
import Payment from './pages/Payment/Payment';
import Terms from './pages/Legal/Terms/Terms';
import SearchPage from './pages/Search/SearchPage';
import NotFound from './pages/Error/NotFound/NotFound';


const hiddenLayouts = ['/login', '/register', '/demo-form', '/cart', '/subscription', '/wishlist-view', '/profile', '/message/', '/legal/', '/payment', '/gameview'];

function Layout({ children }) {
  const location = useLocation();
  const hideLayout = hiddenLayouts.some(path => location.pathname.startsWith(path));

  return (
    <div className="app-container">
      {!hideLayout && <Header onNotifClick={() => setDrawerOpen(true)} />}
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
            <Route path="/demo-form" element={<DemoForm />} />
            <Route path="/wishlist-view" element={<WishlistViewCanvas />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/game/:gameTitle/:gameId" element={<ViewGame />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/message/:userId/:friendId" element={<MessagePage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/legal/terms" element={<Terms />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App;
