import { useEffect, useState, useCallback } from 'react';

const useGetDepartments = (institutionFilter, countryFilter, limit) => {
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDepartments = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/departments?page=${currentPage}&limit=${limit}&institutionId=${institutionFilter}&country=${countryFilter}`
      );
      const data = await response.json();
      setDepartments(data.departments);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, institutionFilter, countryFilter, limit]);

  useEffect(() => {
    fetchDepartments();
  }, [institutionFilter, countryFilter, limit, fetchDepartments]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const refreshDepartments = () => {
    fetchDepartments();
  };

  return {
    departments,
    currentPage,
    totalPages,
    onPageChange,
    refreshDepartments,
  };
};

export default useGetDepartments;
