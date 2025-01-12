import { useState } from 'react';

const useEditMobility = () => {
  const [error, setError] = useState(null);
  const editMobility = async (mobility) => {
    if (mobility.homeInstitutionId._id) {
      mobility.homeInstitutionId = mobility.homeInstitutionId._id;
    }
    if (mobility.hostStudyProgrammeId._id) {
      mobility.hostStudyProgrammeId = mobility.hostStudyProgrammeId._id;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/mobilities/${mobility._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mobility),
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

  return { editMobility, error };
};

export default useEditMobility;
