import { useState } from 'react';

const useEditApplication = () => {
  const [error, setError] = useState(null);

  const editApplication = async (application) => {
    try {
      if (application.userId._id) {
        application.userId = application.userId._id;
      }
      if (application.mobilityId._id) {
        application.mobilityId = application.mobilityId._id;
      }
      const response = await fetch(
        `http://localhost:3000/applications/${application._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(application),
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

  return { editApplication, error };
};

export default useEditApplication;
