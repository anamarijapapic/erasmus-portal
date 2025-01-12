import { useState } from 'react';

const useDeleteMobility = () => {
  const [error, setError] = useState(null);

  const deleteMobility = async (mobilityId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/mobilities/${mobilityId}`,
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

  return { deleteMobility, error };
};

export default useDeleteMobility;
