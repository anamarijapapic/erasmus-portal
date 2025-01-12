import { useState } from 'react';

const useCreateMobility = () => {
  const [error, setError] = useState(null);

  const createMobility = async (mobility) => {
    try {
      const response = await fetch('http://localhost:3000/mobilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mobility),
      });

      console.log(mobility);
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { createMobility, error };
};

export default useCreateMobility;
