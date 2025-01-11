import { useState } from 'react';

const useCreateInstitution = () => {
  const [error, setError] = useState(null);

  const createInstitution = async (institution) => {
    try {
      const response = await fetch('http://localhost:3000/institutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(institution),
      });

      console.log(institution);
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { createInstitution, error };
};

export default useCreateInstitution;
