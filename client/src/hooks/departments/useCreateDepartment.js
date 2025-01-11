import { useState } from 'react';

const useCreateDepartment = () => {
  const [error, setError] = useState(null);

  const createDepartment = async (department) => {
    try {
      const response = await fetch('http://localhost:3000/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(department),
      });

      console.log(department);
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { createDepartment, error };
};

export default useCreateDepartment;
