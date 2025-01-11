import { useState } from 'react';

const useCreateSubjectArea = () => {
  const [error, setError] = useState(null);

  const createSubjectArea = async (subjectArea) => {
    try {
      const response = await fetch('http://localhost:3000/subjectAreas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subjectArea),
      });
      console.log(subjectArea);
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { createSubjectArea, error };
};

export default useCreateSubjectArea;
