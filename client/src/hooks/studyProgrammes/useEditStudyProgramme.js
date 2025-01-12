import { useState } from 'react';

const useEditStudyProgramme = () => {
  const [error, setError] = useState(null);

  const editStudyProgramme = async (studyProgramme) => {
    try {
      if (studyProgramme.departmentId._id) {
        studyProgramme.departmentId = studyProgramme.departmentId._id;
      }
      if (studyProgramme.subjectAreaId._id) {
        studyProgramme.subjectAreaId = studyProgramme.subjectAreaId._id;
      }
      const response = await fetch(
        `http://localhost:3000/studyProgrammes/${studyProgramme._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studyProgramme),
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

  return { editStudyProgramme, error };
};

export default useEditStudyProgramme;
