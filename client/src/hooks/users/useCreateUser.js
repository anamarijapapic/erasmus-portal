import { useState } from 'react';

const useCreateUser = () => {
  const [error, setError] = useState(null);

  const createUser = async (user) => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      console.log(user);
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { createUser, error };
};

export default useCreateUser;
