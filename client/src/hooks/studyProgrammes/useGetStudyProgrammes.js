import { useEffect, useState, useCallback } from 'react';

const useGetStudyProgrammes = (
  searchQuery,
  departmentFilter,
  subjectAreaFilter,
  academicEqfLevelFilter,
  limit
) => {
  const [studyProgrammes, setStudyProgrammes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStudyProgrammes = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/studyProgrammes?page=${currentPage}&limit=${limit}&search=${searchQuery}&subjectArea=${subjectAreaFilter}&department=${departmentFilter}&academicEqfLevel=${academicEqfLevelFilter}`
      );
      const data = await response.json();
      setStudyProgrammes(data.studyProgrammes);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  }, [
    currentPage,
    searchQuery,
    departmentFilter,
    subjectAreaFilter,
    academicEqfLevelFilter,
    limit,
  ]);

  useEffect(() => {
    fetchStudyProgrammes();
  }, [
    currentPage,
    searchQuery,
    departmentFilter,
    subjectAreaFilter,
    academicEqfLevelFilter,
    limit,
    fetchStudyProgrammes,
  ]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const refreshStudyProgrammes = () => {
    fetchStudyProgrammes();
  };

  return {
    studyProgrammes,
    currentPage,
    totalPages,
    onPageChange,
    refreshStudyProgrammes,
  };
};

export default useGetStudyProgrammes;
