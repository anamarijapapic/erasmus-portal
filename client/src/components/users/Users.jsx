import { useState } from 'react';
import useGetUsers from '../../hooks/users/useGetUsers';
import useCreateUser from '../../hooks/users/useCreateUser';
import {
  Table,
  Pagination,
  TextInput,
  Label,
  Select,
  Button,
} from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import UserDetailsModal from './UserDetailsModal';
import CreateUserModal from './CreateUserModal';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [yearOfStudyFilter, setYearOfStudyFilter] = useState('');
  const [limit, setLimit] = useState(10);
  const { users, currentPage, totalPages, onPageChange, refreshUsers } =
    useGetUsers(
      searchQuery,
      roleFilter,
      semesterFilter,
      yearOfStudyFilter,
      limit
    );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    placeOfBirth: '',
    citizenship: '',
    pinOIB: '',
    idCardNumber: '',
    address: '',
    contactNumber: '',
    semester: '',
    yearOfStudy: '',
    role: '',
    studyProgrammeId: '',
  });

  const { createUser } = useCreateUser();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSemesterFilter(event.target.value);
  };

  const handleYearOfStudyChange = (event) => {
    setYearOfStudyFilter(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      dateOfBirth: '',
      placeOfBirth: '',
      citizenship: '',
      pinOIB: '',
      idCardNumber: '',
      address: '',
      contactNumber: '',
      semester: '',
      yearOfStudy: '',
      role: '',
      studyProgrammeId: '',
    });
  };

  const handleCreateUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCreateUserSubmit = async (event) => {
    event.preventDefault();

    if (newUser.studyProgrammeId === '') {
      delete newUser.studyProgrammeId;
    }

    await createUser(newUser);
    closeCreateModal();
    refreshUsers();
  };

  return (
    <>
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="w-full px-4 mx-auto lg:px-6">
          <Label
            htmlFor="table-search"
            className="text-sm font-semibold text-gray-900 dark:text-white"
          />
          <TextInput
            type="text"
            id="table-search"
            className="w-full sm:w-80 pb-2"
            icon={HiSearch}
            placeholder="Search for items"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="role-filter" value="Select a role" />
              </div>
              <Select
                id="role-filter"
                value={roleFilter}
                onChange={handleRoleChange}
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
                <option value="coordinator">Coordinator</option>
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="semester-filter" value="Select a semester" />
              </div>
              <Select
                id="semester-filter"
                value={semesterFilter}
                onChange={handleSemesterChange}
              >
                <option value="">All Semesters</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="year-of-study-filter"
                  value="Select a year of study"
                />
              </div>
              <Select
                id="year-of-study-filter"
                value={yearOfStudyFilter}
                onChange={handleYearOfStudyChange}
              >
                <option value="">All Years</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="limit-filter" value="Entries per page" />
              </div>
              <Select
                id="limit-filter"
                value={limit}
                onChange={handleLimitChange}
              >
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={openCreateModal}>Create User</Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table hoverable>
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800">
                Users
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse a list of users.
                </p>
              </caption>
              <Table.Head>
                <Table.HeadCell>First Name</Table.HeadCell>
                <Table.HeadCell>Last Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Gender</Table.HeadCell>
                <Table.HeadCell>Date of Birth</Table.HeadCell>
                <Table.HeadCell>Place of Birth</Table.HeadCell>
                <Table.HeadCell>Citizenship</Table.HeadCell>
                <Table.HeadCell>PIN/OIB</Table.HeadCell>
                <Table.HeadCell>ID Card Number</Table.HeadCell>
                <Table.HeadCell>Address</Table.HeadCell>
                <Table.HeadCell>Contact Number</Table.HeadCell>
                <Table.HeadCell>Semester</Table.HeadCell>
                <Table.HeadCell>Year of Study</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
                <Table.HeadCell>Study Program</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {users.map((user) => (
                  <Table.Row key={user._id}>
                    <Table.Cell>{user.firstName}</Table.Cell>
                    <Table.Cell>{user.lastName}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.gender}</Table.Cell>
                    <Table.Cell>
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{user.placeOfBirth}</Table.Cell>
                    <Table.Cell>{user.citizenship}</Table.Cell>
                    <Table.Cell>{user.pinOIB}</Table.Cell>
                    <Table.Cell>{user.idCardNumber}</Table.Cell>
                    <Table.Cell>{user.address}</Table.Cell>
                    <Table.Cell>
                      <a href={`tel:${user.contactNumber}`}>
                        {user.contactNumber}
                      </a>
                    </Table.Cell>
                    <Table.Cell>{user.semester}</Table.Cell>
                    <Table.Cell>{user.yearOfStudy}</Table.Cell>
                    <Table.Cell>{user.role}</Table.Cell>
                    <Table.Cell>
                      {user.studyProgrammeId ? user.studyProgrammeId.name : ''}
                    </Table.Cell>
                    <Table.Cell>
                      <button
                        className="button"
                        onClick={() => openModal(user)}
                      >
                        Details
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </section>

      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={selectedUser}
      />

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        user={newUser}
        onChange={handleCreateUserChange}
        onSubmit={handleCreateUserSubmit}
      />
    </>
  );
};

export default Users;
