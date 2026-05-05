import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'eventhub-auth';

function getSavedAuth() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { token: '', user: null };
  try {
    return JSON.parse(raw);
  } catch {
    return { token: '', user: null };
  }
}

export function AuthProvider({ children }) {
  const saved = getSavedAuth();
  const [token, setToken] = useState(saved.token || '');
  const [user, setUser] = useState(saved.user || null);

  const value = useMemo(() => {
    const save = (nextToken, nextUser) => {
      setToken(nextToken);
      setUser(nextUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: nextToken, user: nextUser }));
    };

    return {
      token,
      user,
      isAuthenticated: Boolean(token && user),
      login: (nextToken, nextUser) => save(nextToken, nextUser),
      logout: () => {
        setToken('');
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
      },
      updateUser: (nextUserData) => {
        const nextUser = { ...user, ...nextUserData };
        setUser(nextUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user: nextUser }));
      }
    };
  }, [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

