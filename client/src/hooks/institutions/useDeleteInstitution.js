import { useState } from 'react';

const useDeleteInstitution = () => {
  const [error, setError] = useState(null);

  const deleteInstitution = async (institutionId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/institutions/${institutionId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { deleteInstitution, error };
};

export default useDeleteInstitution;
