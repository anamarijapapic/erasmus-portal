import { useState } from 'react';

const useDeleteDepartment = () => {
  const [error, setError] = useState(null);

  const deleteDepartment = async (departmentId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/departments/${departmentId}`,
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

  return { deleteDepartment, error };
};

export default useDeleteDepartment;
