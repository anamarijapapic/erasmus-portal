import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import useGetStudyProgrammes from '../../hooks/studyProgrammes/useGetStudyProgrammes';
import useCreateStudyProgramme from '../../hooks/studyProgrammes/useCreateStudyProgramme';
import useEditStudyProgramme from '../../hooks/studyProgrammes/useEditStudyProgramme';
import useDeleteStudyProgramme from '../../hooks/studyProgrammes/useDeleteStudyProgramme';
import useGetSubjectAreas from '../../hooks/subjectAreas/useGetSubjectAreas';
import {
  Table,
  Pagination,
  TextInput,
  Label,
  Select,
  Button,
  Modal,
} from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import { GoInfo } from 'react-icons/go';
import { TbEdit } from 'react-icons/tb';
import { MdOutlineDelete } from 'react-icons/md';
import StudyProgrammeDetailsModal from './StudyProgrammeDetailsModal';
import CreateStudyProgrammeModal from './CreateStudyProgrammeModal';
import EditStudyProgrammeModal from './EditStudyProgrammeModal';
import useGetDepartments from '../../hooks/departments/useGetDepartments';

const StudyProgrammes = () => {
  const { user: loggedInUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [academicEqfLevelFilter, setAcademicEqfLevelFilter] = useState('');
  const [subjectAreaFilter, setSubjectAreaFilter] = useState('');
  const [limit, setLimit] = useState(10);

  const {
    studyProgrammes,
    currentPage,
    totalPages,
    onPageChange,
    refreshStudyProgrammes,
  } = useGetStudyProgrammes(
    searchQuery,
    departmentFilter,
    subjectAreaFilter,
    academicEqfLevelFilter,
    limit
  );

  const { subjectAreas } = useGetSubjectAreas('', null);
  const { departments } = useGetDepartments('', '', null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudyProgramme, setSelectedStudyProgramme] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newStudyProgramme, setNewStudyProgramme] = useState({
    subjectAreaId: '',
    departmentId: '',
    academicEqfLevel: '',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStudyProgramme, setEditStudyProgramme] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteStudyProgramme, setDeleteStudyProgramme] = useState(null);

  const { createStudyProgramme } = useCreateStudyProgramme();
  const { editStudyProgramme: updateStudyProgramme } = useEditStudyProgramme();
  const { deleteStudyProgramme: removeStudyProgramme } =
    useDeleteStudyProgramme();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  const handleAcademicEqfLevelChange = (event) => {
    setAcademicEqfLevelFilter(event.target.value);
  };

  const handleSubjectAreaChange = (event) => {
    setSubjectAreaFilter(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const openModal = (studyProgramme) => {
    setSelectedStudyProgramme(studyProgramme);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudyProgramme(null);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewStudyProgramme({
      subjectAreaId: '',
      departmentId: '',
      academicEqfLevel: '',
    });
  };

  const openEditModal = (studyProgramme) => {
    setEditStudyProgramme(studyProgramme);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditStudyProgramme(null);
  };

  const openDeleteModal = (studyProgramme) => {
    setDeleteStudyProgramme(studyProgramme);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteStudyProgramme(null);
  };

  const handleCreateStudyProgrammeChange = (event) => {
    const { name, value } = event.target;
    setNewStudyProgramme((prevStudyProgramme) => ({
      ...prevStudyProgramme,
      [name]: value,
    }));
  };

  const handleEditStudyProgrammeChange = (event) => {
    const { name, value } = event.target;
    setEditStudyProgramme((prevStudyProgramme) => ({
      ...prevStudyProgramme,
      [name]: value,
    }));
  };

  const handleCreateStudyProgrammeSubmit = async (event) => {
    event.preventDefault();

    if (newStudyProgramme.studyProgrammeId === '') {
      delete newStudyProgramme.studyProgrammeId;
    }

    await createStudyProgramme(newStudyProgramme);
    closeCreateModal();
    refreshStudyProgrammes();
  };

  const handleEditStudyProgrammeSubmit = async (event) => {
    event.preventDefault();
    await updateStudyProgramme(editStudyProgramme);
    closeEditModal();
    refreshStudyProgrammes();
  };

  const handleDeleteStudyProgrammeSubmit = async () => {
    await removeStudyProgramme(deleteStudyProgramme._id);
    closeDeleteModal();
    refreshStudyProgrammes();
  };

  const handleReset = (event) => {
    setSearchQuery('');
    setDepartmentFilter('');
    setAcademicEqfLevelFilter('');
    setSubjectAreaFilter('');
    setLimit(10);
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
                <Label
                  htmlFor="academicEqfLevel-filter"
                  value="Select a academicEqfLevel"
                />
              </div>
              <Select
                id="academicEqfLevel-filter"
                value={academicEqfLevelFilter}
                onChange={handleAcademicEqfLevelChange}
              >
                <option value="">All AcademicEqfLevels</option>
                <option value="Level 1">Level 1</option>
                <option value="Level 2">Level 2</option>
                <option value="Level 3">Level 3</option>
                <option value="Level 4">Level 4</option>
                <option value="Level 5">Level 5</option>
                <option value="Level 6">Level 6</option>
                <option value="Level 7">Level 7</option>
                <option value="Level 8">Level 8</option>
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="department-filter" value="Select departments" />
              </div>
              <Select
                id="department-filter"
                value={departmentFilter}
                onChange={handleDepartmentChange}
              >
                <option value="">All departments</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="department-filter"
                  value="Select subject area"
                />
              </div>
              <Select
                id="subjectArea-filter"
                value={subjectAreaFilter}
                onChange={handleSubjectAreaChange}
              >
                <option value="">All Subject Areas</option>
                {subjectAreas.map((subjectArea) => (
                  <option key={subjectArea._id} value={subjectArea._id}>
                    {subjectArea.name}
                  </option>
                ))}
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
            <Button className="m-1" onClick={handleReset}>
              Clear
            </Button>
            {['admin', 'coordinator'].includes(loggedInUser?.role) && (
              <Button className="m-1" onClick={openCreateModal}>
                Create Study Programme
              </Button>
            )}
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table hoverable>
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800">
                StudyProgrammes
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse a list of studyProgrammes.
                </p>
              </caption>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>AcademicEqfLevel</Table.HeadCell>
                <Table.HeadCell>Department</Table.HeadCell>
                <Table.HeadCell>Subject area</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Actions</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {studyProgrammes.map((studyProgramme) => (
                  <Table.Row key={studyProgramme._id}>
                    <Table.Cell>{studyProgramme.name}</Table.Cell>
                    <Table.Cell>{studyProgramme.academicEqfLevel}</Table.Cell>
                    <Table.Cell>{studyProgramme.departmentId.name}</Table.Cell>
                    <Table.Cell>{studyProgramme.subjectAreaId.name}</Table.Cell>
                    <Table.Cell>
                      <button
                        className="button mr-2"
                        title="Info"
                        onClick={() => openModal(studyProgramme)}
                      >
                        <GoInfo
                          className="text-blue-400"
                          style={{ fontSize: '1.5rem' }}
                        />
                      </button>
                      {['admin', 'coordinator'].includes(
                        loggedInUser?.role
                      ) && (
                        <>
                          <button
                            className="button mr-2"
                            title="Edit"
                            onClick={() => openEditModal(studyProgramme)}
                          >
                            <TbEdit
                              className="text-green-400"
                              style={{ fontSize: '1.5rem' }}
                            />
                          </button>
                          <button
                            className="button mr-2"
                            title="Delete"
                            onClick={() => openDeleteModal(studyProgramme)}
                          >
                            <MdOutlineDelete
                              className="text-red-400"
                              style={{ fontSize: '1.5rem' }}
                            />
                          </button>
                        </>
                      )}
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

      <StudyProgrammeDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        studyProgramme={selectedStudyProgramme}
      />

      <CreateStudyProgrammeModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        departments={departments}
        subjectAreas={subjectAreas}
        studyProgramme={newStudyProgramme}
        onChange={handleCreateStudyProgrammeChange}
        onSubmit={handleCreateStudyProgrammeSubmit}
      />

      <EditStudyProgrammeModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        departments={departments}
        subjectAreas={subjectAreas}
        studyProgramme={editStudyProgramme}
        onChange={handleEditStudyProgrammeChange}
        onSubmit={handleEditStudyProgrammeSubmit}
      />

      <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Modal.Header>Delete study programme</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this study programme?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDeleteStudyProgrammeSubmit}>
            Delete
          </Button>
          <Button onClick={closeDeleteModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudyProgrammes;
