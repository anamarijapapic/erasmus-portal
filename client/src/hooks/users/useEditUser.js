import { useState } from 'react';

const useEditUser = () => {
  const [error, setError] = useState(null);

  const editUser = async (user) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { editUser, error };
};

export default useEditUser;
