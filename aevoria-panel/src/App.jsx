import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
} from 'react-router-dom';

import Home from './pages/publisher/Home/Home';
import Developers from './pages/publisher/Developers/Developers';
import CreateDeveloper from './pages/publisher/Developers/CreateDeveloper/CreateDeveloper';
import Game from './pages/publisher/Game/Game';
import Calendar from './pages/publisher/Calendar/Calendar';
import Sales from './pages/publisher/Sales/Sales';
import PageSection from './pages/publisher/PageSection/PageSection';
import Notes from './pages/publisher/Notes/Notes';
import Analytics from './pages/publisher/Analytics/Analytics';
import NoPublisherPage from './pages/publisher/NoPublisherPage/NoPublisherPage';
import ApiKey from './pages/publisher/ApiKey/ApiKey';
import Login from './pages/Login/Login';

import Sidebar from './components/Sidebar/Sidebar';
import ProtectedRoute from './auth/ProtectedRoute';
import ProtectedWithPublisher from './auth/ProtectedWithPublisher';

import './App.scss';

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-layout">
      {!isLoginPage && <Sidebar />}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/no-publisher"
            element={
              <ProtectedRoute>
                <NoPublisherPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/api-key"
            element={
              <ProtectedRoute>
                <ProtectedWithPublisher>
                  <ApiKey />
                </ProtectedWithPublisher>
              </ProtectedRoute>
            }
          />
          <Route
            path="/developers"
            element={
              <ProtectedRoute>
                <ProtectedWithPublisher>
                  <Developers />
                </ProtectedWithPublisher>
              </ProtectedRoute>
            }
          />
          <Route
            path="/developers/create"
            element={
              <ProtectedRoute>
                <ProtectedWithPublisher>
                  <CreateDeveloper />
                </ProtectedWithPublisher>
              </ProtectedRoute>
            }
          />
          <Route
            path="/developers/edit/:id"
            element={
              <ProtectedRoute>
                <ProtectedWithPublisher>
                  <CreateDeveloper />
                </ProtectedWithPublisher>
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <ProtectedWithPublisher>
                  <Calendar />
                </ProtectedWithPublisher>
              </ProtectedRoute>
            }
          />
          <Route
            path="/games"
            element={
              <ProtectedRoute>
                <ProtectedWithPublisher>
                  <Game />
                </ProtectedWithPublisher>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <ProtectedWithPublisher>
                  <Sales />
                </ProtectedWithPublisher>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pages"
            element={
              <ProtectedRoute>
                <ProtectedWithPublisher>
                  <PageSection />
                </ProtectedWithPublisher>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <ProtectedWithPublisher>
                  <Notes />
                </ProtectedWithPublisher>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <ProtectedWithPublisher>
                  <Analytics />
                </ProtectedWithPublisher>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
