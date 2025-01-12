import { useState } from 'react';

const useCreateApplication = () => {
  const [error, setError] = useState(null);

  const createApplication = async (application) => {
    try {
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
