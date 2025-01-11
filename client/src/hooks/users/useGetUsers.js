import { useEffect, useState, useCallback } from 'react';

const useGetUsers = (
  searchQuery,
  roleFilter,
  semesterFilter,
  yearOfStudyFilter,
  limit
) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?page=${currentPage}&limit=${limit}&search=${searchQuery}&role=${roleFilter}&semester=${semesterFilter}&yearOfStudy=${yearOfStudyFilter}`
      );
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  }, [
    currentPage,
    searchQuery,
    roleFilter,
    semesterFilter,
    yearOfStudyFilter,
    limit,
  ]);

  useEffect(() => {
    fetchUsers();
  }, [
    currentPage,
    searchQuery,
    roleFilter,
    semesterFilter,
    yearOfStudyFilter,
    limit,
    fetchUsers,
  ]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const refreshUsers = () => {
    fetchUsers();
  };

  return { users, currentPage, totalPages, onPageChange, refreshUsers };
};

export default useGetUsers;
