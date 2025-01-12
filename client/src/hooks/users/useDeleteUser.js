import { useState } from 'react';

const useDeleteUser = () => {
  const [error, setError] = useState(null);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { deleteUser, error };
};

export default useDeleteUser;
