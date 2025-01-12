import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const usePostLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        login({ email: data.email, role: data.role, id: data._id }, data.token);
        navigate('/');
      } else {
        const error = await response.json();
        setError(error.error);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return { postLogin, error };
};

export default usePostLogin;
