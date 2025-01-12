import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useCreateApplication = () => {
  const [error, setError] = useState(null);
  const { user: loggedUser } = useAuth();

  const createApplication = async (application) => {
    try {
      console.log('ode si ali je log null: ', JSON.stringify(loggedUser));
      if (loggedUser.role === 'student' || loggedUser.role === 'staff') {
        application.userId = loggedUser.id;
      }
      const response = await fetch('http://localhost:3000/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(application),
      });

      console.log(application);
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { createApplication, error };
};

export default useCreateApplication;
