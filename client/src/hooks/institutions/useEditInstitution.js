import { useState } from 'react';

const useEditInstitution = () => {
  const [error, setError] = useState(null);

  const editInstitution = async (institution) => {
    if (institution.contactPersonId._id) {
      institution.contactPersonId = institution.contactPersonId._id;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/institutions/${institution._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(institution),
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

  return { editInstitution, error };
};

export default useEditInstitution;
