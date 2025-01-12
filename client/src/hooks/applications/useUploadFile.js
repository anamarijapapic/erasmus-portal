import { useState } from 'react';

const useUploadFile = () => {
  const [error, setError] = useState(null);

  const uploadFile = async (applicationId, file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(
        `http://localhost:3000/applications/uploadFile/${applicationId}`,
        {
          method: 'POST',
          body: formData,
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

  return { uploadFile, error };
};

export default useUploadFile;
