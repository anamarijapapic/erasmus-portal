import { useState } from 'react';

const useDeleteFile = () => {
  const [error, setError] = useState(null);

  const deleteFile = async (fileId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/applications/deleteFile/${fileId}`,
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

  return { deleteFile, error };
};

export default useDeleteFile;
