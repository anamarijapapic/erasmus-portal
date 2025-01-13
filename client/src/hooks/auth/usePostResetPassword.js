import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const usePostResetPassword = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postResetPassword = async (
    password,
    confirmPassword,
    userId,
    token
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/auth/reset-password/${userId}/${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password, confirmPassword }),
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

  return { postResetPassword, error };
};

export default usePostResetPassword;
