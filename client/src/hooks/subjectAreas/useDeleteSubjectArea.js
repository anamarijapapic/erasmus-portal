import { useState } from 'react';

const useDeleteSubjectArea = () => {
  const [error, setError] = useState(null);

  const deleteSubjectArea = async (subjectAreaId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/subjectAreas/${subjectAreaId}`,
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

  return { deleteSubjectArea, error };
};

export default useDeleteSubjectArea;
