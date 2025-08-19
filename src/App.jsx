import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import { LanguageProvider } from './translations/LanguageContext';
import { NotificationProvider } from './context/NotificationContext';
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
import CategorieView from './pages/CategorieView/CategorieView';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';
import PlatformPage from './pages/Platform/PlatformPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const hiddenLayouts = ['/login', '/register', '/demo-form', '/cart', '/subscription', '/wishlist-view', '/profile', '/message/', '/legal/', '/payment', '/gameview'];
const Layout = ({ children }) => {
  const location = useLocation();
  const shouldHideLayout = hiddenLayouts.some(path => location.pathname.startsWith(path));

  return (
    <div className="app-container">
      {!shouldHideLayout && <Header />}
      <main className="content-container">{children}</main>
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

function App () {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <NotificationProvider>
          <AuthProvider>
            <Layout>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/demo-form" element={<DemoForm />} />
                <Route path="/platform/:platform" element={<PlatformPage />} />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sub"
                  element={
                    <ProtectedRoute>
                      <Subscription />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/wishlist-view"
                  element={
                    <ProtectedRoute>
                      <WishlistViewCanvas />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile/*"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/game/:gameTitle/:gameId"
                  element={
                    <ProtectedRoute>
                      <ViewGame />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <ProtectedRoute>
                      <BlogPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/message/:conversationId/:messageId"
                  element={
                    <ProtectedRoute>
                      <MessagePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/legal/terms"
                  element={
                    <ProtectedRoute>
                      <Terms />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <SearchPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/categorie/:genreId"
                  element={
                    <ProtectedRoute>
                      <CategorieView />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </AuthProvider>
        </NotificationProvider>
      </Router>
    </LanguageProvider>
  );
}

export default App;
