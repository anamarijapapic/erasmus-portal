import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import useGetInstitutions from '../../hooks/institutions/useGetInstitutions';
import useCreateInstitution from '../../hooks/institutions/useCreateInstitution';
import useEditInstitution from '../../hooks/institutions/useEditInstitution';
import useDeleteInstitution from '../../hooks/institutions/useDeleteInstitution';
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
import InstitutionDetailsModal from './InstitutionDetailsModal';
import CreateInstitutionModal from './CreateInstitutionModal';
import EditInstitutionModal from './EditInstitutionModal';
import useGetUsers from '../../hooks/users/useGetUsers';

const Institutions = () => {
  const { user: loggedInUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [limit, setLimit] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newInstitution, setNewInstitution] = useState({
    name: '',
    erasmusCode: '',
    country: '',
    contactPersonId: '',
    address: '',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editInstitution, setEditInstitution] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteInstitution, setDeleteInstitution] = useState(null);

  const { createInstitution } = useCreateInstitution();
  const { editInstitution: updateInstitution } = useEditInstitution();
  const { deleteInstitution: removeInstitution } = useDeleteInstitution();

  const {
    institutions,
    currentPage,
    totalPages,
    onPageChange,
    setCurrentPage,
    refreshInstitutions,
  } = useGetInstitutions(searchQuery, countryFilter, limit);

  const { users } = useGetUsers('', '', '', '', null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountryFilter(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const openModal = (institution) => {
    setSelectedInstitution(institution);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInstitution(null);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewInstitution({
      name: '',
      erasmusCode: '',
      country: '',
      contactPersonId: '',
      address: '',
    });
  };

  const openEditModal = (institution) => {
    setEditInstitution(institution);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditInstitution(null);
  };

  const openDeleteModal = (institution) => {
    setDeleteInstitution(institution);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteInstitution(null);
  };

  const handleCreateInstitutionChange = (event) => {
    const { name, value } = event.target;
    setNewInstitution((prevInstitution) => ({
      ...prevInstitution,
      [name]: value,
    }));
  };

  const handleEditInstitutionChange = (event) => {
    const { name, value } = event.target;
    setEditInstitution((prevInstitution) => ({
      ...prevInstitution,
      [name]: value,
    }));
  };

  const handleCreateInstitutionSubmit = async (event) => {
    event.preventDefault();

    await createInstitution(newInstitution);
    closeCreateModal();
    refreshInstitutions();
  };

  const handleEditInstitutionSubmit = async (event) => {
    event.preventDefault();

    await updateInstitution(editInstitution);
    closeEditModal();
    refreshInstitutions();
  };

  const handleDeleteInstitutionSubmit = async () => {
    await removeInstitution(deleteInstitution._id);
    closeDeleteModal();
    refreshInstitutions();
  };

  const handleReset = (event) => {
    setSearchQuery('');
    setCountryFilter('');
    setCurrentPage(1);
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
                <Label htmlFor="country-filter" value="Select a country" />
              </div>
              <Select
                id="country-filter"
                value={countryFilter}
                onChange={handleCountryChange}
              >
                <option value="Croatia">Hrvatska</option>
                <option value="Bosna">Bosna</option>
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
            {loggedInUser?.role === 'admin' && (
              <Button className="m-1" onClick={openCreateModal}>
                Create Institutions
              </Button>
            )}
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table hoverable>
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800">
                Institutions
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse a list of institutions.
                </p>
              </caption>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Erasmus code</Table.HeadCell>
                <Table.HeadCell>Country</Table.HeadCell>
                <Table.HeadCell>Contact person</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Contact number</Table.HeadCell>
                <Table.HeadCell>address</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Actions</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {institutions.map((institution) => (
                  <Table.Row key={institution._id}>
                    <Table.Cell>{institution.name}</Table.Cell>
                    <Table.Cell>{institution.erasmusCode}</Table.Cell>
                    <Table.Cell>{institution.country}</Table.Cell>
                    <Table.Cell>
                      {institution.contactPersonId.firstName}{' '}
                      {institution.contactPersonId.lastName}
                    </Table.Cell>
                    <Table.Cell>{institution.contactPersonId.email}</Table.Cell>
                    <Table.Cell>
                      <a
                        href={`tel:${institution.contactPersonId.contactNumber}`}
                      >
                        {institution.contactPersonId.contactNumber}
                      </a>
                    </Table.Cell>
                    <Table.Cell>{institution.address}</Table.Cell>
                    <Table.Cell>
                      <button
                        className="button mr-2"
                        onClick={() => openModal(institution)}
                      >
                        <GoInfo
                          className="text-blue-400"
                          style={{ fontSize: '1.5rem' }}
                        />
                      </button>
                      {loggedInUser?.role === 'admin' && (
                        <>
                          <button
                            className="button mr-2"
                            onClick={() => openEditModal(institution)}
                          >
                            <TbEdit
                              className="text-green-400"
                              style={{ fontSize: '1.5rem' }}
                            />
                          </button>
                          <button
                            className="button mr-2"
                            onClick={() => openDeleteModal(institution)}
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

      <InstitutionDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        institution={selectedInstitution}
      />

      <CreateInstitutionModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        institution={newInstitution}
        users={users}
        onChange={handleCreateInstitutionChange}
        onSubmit={handleCreateInstitutionSubmit}
      />

      <EditInstitutionModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        institution={editInstitution}
        users={users}
        onChange={handleEditInstitutionChange}
        onSubmit={handleEditInstitutionSubmit}
      />

      <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Modal.Header>Delete Institution</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this institution?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDeleteInstitutionSubmit}>
            Delete
          </Button>
          <Button onClick={closeDeleteModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Institutions;
