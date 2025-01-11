import { useEffect, useState, useCallback } from 'react';

const useGetSubjectAreas = (searchQuery, limit) => {
  const [subjectAreas, setSubjectAreas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSubjectAreas = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/subjectAreas?page=${currentPage}&limit=${limit}&search=${searchQuery}`
      );
      const data = await response.json();
      setSubjectAreas(data.subjectAreas);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, searchQuery, limit]);

  useEffect(() => {
    fetchSubjectAreas();
  }, [currentPage, searchQuery, limit, fetchSubjectAreas]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const refreshSubjectAreas = () => {
    fetchSubjectAreas();
  };
  return {
    subjectAreas,
    currentPage,
    totalPages,
    onPageChange,
    refreshSubjectAreas,
  };
};

export default useGetSubjectAreas;
