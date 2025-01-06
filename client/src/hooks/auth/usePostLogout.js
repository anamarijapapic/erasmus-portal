import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const usePostLogout = () => {
  const { logout } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postLogout = async () => {
    try {
      logout();
      navigate('/auth/login');
    } catch (error) {
      setError(error);
    }
  };

  return { postLogout, error };
};

export default usePostLogout;
