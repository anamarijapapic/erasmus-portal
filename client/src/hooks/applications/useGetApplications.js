import { useEffect, useState, useCallback } from 'react';

const useGetApplications = (statusFilter, roleFilter, limit) => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchApplications = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/applications?page=${currentPage}&limit=${limit}&status=${statusFilter}&role=${roleFilter}`
      );
      const data = await response.json();
      setApplications(data.applicationsWithFiles);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, statusFilter, roleFilter, limit]);

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, roleFilter, limit, fetchApplications]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const refreshApplications = () => {
    fetchApplications();
  };

  return {
    applications,
    currentPage,
    totalPages,
    onPageChange,
    refreshApplications,
    setCurrentPage,
  };
};

export default useGetApplications;
