import { useState } from 'react';
import useGetDepartments from '../../hooks/departments/useGetDepartments';
import DepartmentDetailsModal from './DepartmentDetailsModal';
import CreateDepartmentModal from './CreateDepartmentModal';
import useCreateDepartment from '../../hooks/departments/useCreateDepartment';
import {
  Table,
  Pagination,
  TextInput,
  Label,
  Select,
  Modal,
  Button,
} from 'flowbite-react';
import useEditDepartment from '../../hooks/departments/useEditDepartment';
import EditDepartmentModal from './EditDepartmentModal';
import useDeleteDepartment from '../../hooks/departments/useDeleteDepartment';
import useGetInstitutions from '../../hooks/institutions/useGetInstitutions';

const Departments = () => {
  const [institutionFilter, setInstitutionFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    departments,
    currentPage,
    totalPages,
    onPageChange,
    refreshDepartments,
  } = useGetDepartments(institutionFilter, countryFilter, limit);

  const { institutions } = useGetInstitutions(searchQuery, '', null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    address: '',
    contactPersonId: '',
    institutionId: '',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editDepartment, setEditDepartment] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteDepartment, setDeleteDepartment] = useState(null);

  const { createDepartment } = useCreateDepartment();
  const { editDepartment: updateDepartment } = useEditDepartment();
  const { deleteDepartment: removeDepartment } = useDeleteDepartment();

  const handleInstitutionChange = (event) => {
    setInstitutionFilter(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountryFilter(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const openModal = (department) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewDepartment({
      name: '',
      address: '',
      contactPersonId: '',
      institutionId: '',
    });
  };

  const openEditModal = (department) => {
    console.log('pozvano', department);
    setEditDepartment(department);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditDepartment(null);
  };

  const openDeleteModal = (department) => {
    setDeleteDepartment(department);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteDepartment(null);
  };

  const handleCreateDepartmentChange = (event) => {
    const { name, value } = event.target;
    setNewDepartment((prevDepartment) => ({
      ...prevDepartment,
      [name]: value,
    }));
  };

  const handleEditDepartmentChange = (event) => {
    const { name, value } = event.target;
    setEditDepartment((prevDepartment) => ({
      ...prevDepartment,
      [name]: value,
    }));
  };

  const handleCreateDepartmentSubmit = async (event) => {
    event.preventDefault();

    if (newDepartment.contactPersonId === '') {
      delete newDepartment.contactPersonId;
    }

    if (newDepartment.institutionId === '') {
      delete newDepartment.institutionId;
    }

    await createDepartment(newDepartment);
    closeCreateModal();
    refreshDepartments();
  };

  const handleEditDepartmentSubmit = async (event) => {
    event.preventDefault();

    if (editDepartment.contactPersonId === '') {
      delete newDepartment.contactPersonId;
    }

    if (editDepartment.institutionId === '') {
      delete newDepartment.institutionId;
    }

    await updateDepartment(editDepartment);
    closeEditModal();
    refreshDepartments();
  };

  const handleDeleteDepartmentSubmit = async () => {
    await removeDepartment(deleteDepartment._id);
    closeDeleteModal();
    refreshDepartments();
  };

  return (
    <>
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="w-full px-4 mx-auto lg:px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="institution-filter"
                  value="Select a Institution"
                />
              </div>
              <Select
                id="institution-filter"
                value={institutionFilter}
                onChange={handleInstitutionChange}
              >
                <option value="">All Institutions</option>
                {institutions.map((institution) => (
                  <option key={institution._id} value={institution._id}>
                    {institution.name}{' '}
                  </option>
                ))}
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="country-filter" value="Select a country" />
              </div>
              <Select
                id="country-filter"
                value={countryFilter}
                onChange={handleCountryChange}
              >
                <option value="">All Countries</option>
                {[
                  ...new Set(
                    institutions.map((institution) => institution.country)
                  ),
                ].map((country) => (
                  <option key={country} value={country}>
                    {country}
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
            <Button onClick={openCreateModal}>Create Department</Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table hoverable>
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800">
                Departments
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse a list of departments.
                </p>
              </caption>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Address</Table.HeadCell>
                {/* <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Gender</Table.HeadCell> */}
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {departments.map((department) => (
                  <Table.Row key={department._id}>
                    <Table.Cell>{department.name}</Table.Cell>
                    <Table.Cell>{department.address}</Table.Cell>
                    {/* <Table.Cell>{department.contactPersonId}</Table.Cell>
                    <Table.Cell>{department.institutionId}</Table.Cell> */}
                    <Table.Cell>
                      <button
                        className="button"
                        onClick={() => openModal(department)}
                      >
                        Details
                      </button>

                      <button
                        className="button"
                        onClick={() => openEditModal(department)}
                      >
                        Edit
                      </button>
                      <button
                        className="button"
                        onClick={() => openDeleteModal(department)}
                      >
                        Delete
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

      <DepartmentDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        department={selectedDepartment}
      />

      <CreateDepartmentModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        department={newDepartment}
        institutions={institutions}
        onChange={handleCreateDepartmentChange}
        onSubmit={handleCreateDepartmentSubmit}
      />

      <EditDepartmentModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        department={editDepartment}
        institutions={institutions}
        onChange={handleEditDepartmentChange}
        onSubmit={handleEditDepartmentSubmit}
      />

      <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Modal.Header>Delete Department</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this department?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDeleteDepartmentSubmit}>
            Delete
          </Button>
          <Button onClick={closeDeleteModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Departments;
