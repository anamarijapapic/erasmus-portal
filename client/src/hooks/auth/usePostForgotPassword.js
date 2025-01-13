import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const usePostForgotPassword = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postForgotPassword = async (email) => {
    try {
      const response = await fetch(
        'http://localhost:3000/auth/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        navigate('/auth/login');
      } else {
        const error = await response.json();
        setError(error.error);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return { postForgotPassword, error };
};

export default usePostForgotPassword;
