import { useState } from 'react';

const useCreateStudyProgramme = () => {
  const [error, setError] = useState(null);

  const createStudyProgramme = async (studyProgramme) => {
    try {
      const response = await fetch('http://localhost:3000/studyProgrammes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studyProgramme),
      });

      console.log(studyProgramme);
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { createStudyProgramme, error };
};

export default useCreateStudyProgramme;
