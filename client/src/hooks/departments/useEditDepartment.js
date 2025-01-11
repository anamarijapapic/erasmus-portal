import { useState } from 'react';

const useEditDepartment = () => {
  const [error, setError] = useState(null);

  const editDepartment = async (department) => {
    try {
      if (department.contactPersonId._id) {
        department.contactPersonId = department.contactPersonId._id;
      }
      if (department.institutionId._id) {
        department.institutionId = department.institutionId._id;
      }
      const response = await fetch(
        `http://localhost:3000/departments/${department._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(department),
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

  return { editDepartment, error };
};

export default useEditDepartment;
