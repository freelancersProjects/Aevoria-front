import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!storedToken || !userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiService.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (res) {
          setUser(res);
          setToken(storedToken);

          if (res.status === 'Offline') {
            await apiService.patchQuery(`/users/${userId}/status?newStatus=Active`);
          }
        } else {
          throw new Error('Utilisateur introuvable.');
        }
      } catch (err) {
        console.error('Erreur d\'auth :', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user?.userId) {
        navigator.sendBeacon(`${import.meta.env.VITE_API_URL}/users/${user.userId}/status?newStatus=Offline`);
      }
    };

    const handleVisibilityChange = () => {
      if (user?.userId) {
        if (document.hidden) {
          apiService.patchQuery(`/users/${user.userId}/status?newStatus=Offline`).catch(console.error);
        } else {
          apiService.patchQuery(`/users/${user.userId}/status?newStatus=Active`).catch(console.error);
        }
      }
    };

    if (user?.userId) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  const login = async ({ email, password }) => {
    try {
      const res = await apiService.post('/auth/login', { email, password });

      if (!res || !res.token) {
        throw new Error('Token non trouvé dans la réponse !');
      }

      const decoded = jwtDecode(res.token);
      const userId = decoded?.user_id;

      if (!userId) {
        throw new Error('user_id introuvable dans le token décodé.');
      }

      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', userId);
      setToken(res.token);

      await apiService.patchQuery(`/users/${userId}/status?newStatus=Active`);

      return { token: res.token, userId };
    } catch (err) {
      console.error('Erreur dans useAuth login:', err);
      throw err;
    }
  };

  const logout = () => {
    if (user?.userId) {
      apiService.patchQuery(`/users/${user.userId}/status?newStatus=Offline`).catch(console.error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
    setToken(null); // ← CLEAR TOKEN
  };

  return { login, logout, user, token, loading, error };
};

export default useAuth;
