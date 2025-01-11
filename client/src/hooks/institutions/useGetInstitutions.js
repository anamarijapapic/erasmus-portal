import { useEffect, useState, useCallback } from 'react';

const useGetInstitutions = (searchQuery, countryFilter, limit) => {
  const [institutions, setInstitutions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchInstitutions = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/institutions?page=${currentPage}&limit=${limit}&name=${searchQuery}&country=${countryFilter}`
      );
      const data = await response.json();
      setInstitutions(data.institutions);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, searchQuery, countryFilter, limit]);

  useEffect(() => {
    fetchInstitutions();
  }, [currentPage, searchQuery, countryFilter, limit, fetchInstitutions]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const refreshInstitutions = () => {
    fetchInstitutions();
  };

  return {
    institutions,
    currentPage,
    totalPages,
    onPageChange,
    setCurrentPage,
    refreshInstitutions,
  };
};

export default useGetInstitutions;
