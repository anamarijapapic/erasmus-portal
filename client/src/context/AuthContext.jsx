import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user'))
  );
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem('authToken')
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const authToken = localStorage.getItem('authToken');
    if (user && authToken) {
      setUser(user);
      setAuthToken(authToken);
    }
  }, []);

  const login = (user, token, id) => {
    setUser(user);
    setAuthToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authToken', token);
    localStorage.setItem('id', id);
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, authToken, setAuthToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
