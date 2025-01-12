import { useEffect, useState, useCallback } from 'react';

const useGetMobilities = (
  searchQuery,
  homeInstitutionFilter,
  hostInstitutionFilter,
  typeFilter,
  studyProgrammeFilter,
  seasonFilter,
  limit
) => {
  const [mobilities, setMobilities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMobilities = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/mobilities?page=${currentPage}&limit=${limit}&name=${searchQuery}&homeInstitutionId=${homeInstitutionFilter}&hostInstitutionId=${hostInstitutionFilter}&type=${typeFilter}&studyProgrammeId=${studyProgrammeFilter}&season=${seasonFilter}`
      );
      const data = await response.json();
      setMobilities(data.mobilities);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  }, [
    currentPage,
    searchQuery,
    homeInstitutionFilter,
    hostInstitutionFilter,
    typeFilter,
    studyProgrammeFilter,
    seasonFilter,
    limit,
  ]);

  useEffect(() => {
    fetchMobilities();
  }, [
    currentPage,
    searchQuery,
    homeInstitutionFilter,
    hostInstitutionFilter,
    typeFilter,
    studyProgrammeFilter,
    seasonFilter,
    limit,
    fetchMobilities,
  ]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const refreshMobilities = () => {
    fetchMobilities();
  };

  return {
    mobilities,
    currentPage,
    totalPages,
    onPageChange,
    setCurrentPage,
    refreshMobilities,
  };
};

export default useGetMobilities;
