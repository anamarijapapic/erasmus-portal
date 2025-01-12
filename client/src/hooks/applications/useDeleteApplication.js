import { useState } from 'react';

const useDeleteApplication = () => {
  const [error, setError] = useState(null);

  const deleteApplication = async (applicationId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/applications/${applicationId}`,
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

  return { deleteApplication, error };
};

export default useDeleteApplication;
