import { useState } from 'react';

const useDeleteStudyProgramme = () => {
  const [error, setError] = useState(null);

  const deleteStudyProgramme = async (studyProgrammeId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/studyProgrammes/${studyProgrammeId}`,
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

  return { deleteStudyProgramme, error };
};

export default useDeleteStudyProgramme;
