import { useState } from 'react';
import useGetApplications from '../../hooks/applications/useGetApplications';
// import useCreateInstitution from '../../hooks/institutions/useCreateInstitution';
// import useEditInstitution from '../../hooks/institutions/useEditInstitution';
// import useDeleteInstitution from '../../hooks/institutions/useDeleteInstitution';
import {
  Table,
  Pagination,
  TextInput,
  Label,
  Select,
  Button,
  Modal,
} from 'flowbite-react';
import { HiDownload } from 'react-icons/hi';
import ApplicationDetailsModal from './ApplicationDetailsModal';
// import CreateInstitutionModal from './CreateInstitutionModal';
// import EditInstitutionModal from './EditInstitutionModal';

const Applications = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [limit, setLimit] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  //   const [newInstitution, setNewInstitution] = useState({
  //     name: '',
  //     erasmusCode: '',
  //     country: '',
  //     contactPersonId: '',
  //     address: '',
  //   });

  //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  //   const [editInstitution, setEditInstitution] = useState(null);

  //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  //   const [deleteInstitution, setDeleteInstitution] = useState(null);

  //   const { createInstitution } = useCreateInstitution();
  //   const { editInstitution: updateInstitution } = useEditInstitution();
  //   const { deleteInstitution: removeInstitution } = useDeleteInstitution();

  const {
    applications,
    currentPage,
    totalPages,
    onPageChange,
    refreshApplications,
    setCurrentPage,
  } = useGetApplications(statusFilter, roleFilter, limit);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const openModal = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  const openFilesModal = (application) => {
    setSelectedApplication(application);
    setIsFilesModalOpen(true);
  };

  const closeFilesModal = () => {
    setIsFilesModalOpen(false);
    setSelectedApplication(null);
  };

  //   const openCreateModal = () => {
  //     setIsCreateModalOpen(true);
  //   };

  //   const closeCreateModal = () => {
  //     setIsCreateModalOpen(false);
  //     setNewInstitution({
  //       name: '',
  //       erasmusCode: '',
  //       country: '',
  //       contactPersonId: '',
  //       address: '',
  //     });
  //   };

  //   const openEditModal = (institution) => {
  //     setEditInstitution(institution);
  //     setIsEditModalOpen(true);
  //   };

  //   const closeEditModal = () => {
  //     setIsEditModalOpen(false);
  //     setEditInstitution(null);
  //   };

  //   const openDeleteModal = (institution) => {
  //     setDeleteInstitution(institution);
  //     setIsDeleteModalOpen(true);
  //   };

  //   const closeDeleteModal = () => {
  //     setIsDeleteModalOpen(false);
  //     setDeleteInstitution(null);
  //   };

  //   const handleCreateInstitutionChange = (event) => {
  //     const { name, value } = event.target;
  //     setNewInstitution((prevInstitution) => ({
  //       ...prevInstitution,
  //       [name]: value,
  //     }));
  //   };

  //   const handleEditInstitutionChange = (event) => {
  //     const { name, value } = event.target;
  //     setEditInstitution((prevInstitution) => ({
  //       ...prevInstitution,
  //       [name]: value,
  //     }));
  //   };

  //   const handleCreateInstitutionSubmit = async (event) => {
  //     event.preventDefault();
  //     await createInstitution(newInstitution);
  //     closeCreateModal();
  //     refreshInstitutions();
  //   };

  //   const handleEditInstitutionSubmit = async (event) => {
  //     event.preventDefault();

  //     await updateInstitution(editInstitution);
  //     closeEditModal();
  //     refreshInstitutions();
  //   };

  //   const handleDeleteInstitutionSubmit = async () => {
  //     await removeInstitution(deleteInstitution._id);
  //     closeDeleteModal();
  //     refreshInstitutions();
  //   };

  const handleReset = (event) => {
    setStatusFilter('');
    setRoleFilter('');
    setCurrentPage(1);
    setLimit(10);
  };

  return (
    <>
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="w-full px-4 mx-auto lg:px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="status-filter" value="Select a status" />
              </div>
              <Select
                id="status-filter"
                value={statusFilter}
                onChange={handleStatusChange}
              >
                <option value="">All stasuses</option>
                <option value="prijavljeno">Prijavljeno</option>
                <option value="odobreno">Odboreno</option>
                <option value="odbijeno">Odbijeno</option>
              </Select>
            </div>
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
            <Button className="m-1">Create Applications</Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table hoverable>
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800">
                Applications
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse a list of applications.
                </p>
              </caption>
              <Table.Head>
                <Table.HeadCell>User</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Contact Number</Table.HeadCell>
                {/* <Table.HeadCell>Mobility</Table.HeadCell> */}
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Rating</Table.HeadCell>
                <Table.HeadCell>
                  <button
                    className="button"
                    onClick={() => openModal(institution)}
                  >
                    Details
                  </button>
                </Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {applications.map((application) => (
                  <Table.Row key={application._id}>
                    <Table.Cell>
                      {application.userId.firstName}{' '}
                      {application.userId.lastName}
                    </Table.Cell>
                    <Table.Cell>{application.userId.email}</Table.Cell>
                    <Table.Cell>
                      <a href={`tel:${application.userId.contactNumber}`}>
                        {application.userId.contactNumber}
                      </a>
                    </Table.Cell>
                    <Table.Cell>{application.status}</Table.Cell>
                    <Table.Cell>{application.rating}</Table.Cell>
                    <Table.Cell>
                      <button
                        className="button"
                        onClick={() => openModal(application)}
                      >
                        Details
                      </button>
                      <button
                        className="button"
                        onClick={() => openFilesModal(application)}
                      >
                        Attached Files
                      </button>
                      {/* <button
                        className="button"
                        onClick={() => openEditModal(institution)}
                      >
                        Edit
                      </button>
                      <button
                        className="button"
                        onClick={() => openDeleteModal(institution)}
                      >
                        Delete
                      </button> */}
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

      <ApplicationDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        application={selectedApplication}
      />
      {/*

      <CreateInstitutionModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        institution={newInstitution}
        onChange={handleCreateInstitutionChange}
        onSubmit={handleCreateInstitutionSubmit}
      />

      <EditInstitutionModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        institution={editInstitution}
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
      </Modal> */}

      <Modal show={isFilesModalOpen} onClose={closeFilesModal}>
        <Modal.Header>Attached Files</Modal.Header>
        <Modal.Body>
          <ul>
            {selectedApplication &&
              selectedApplication.files.map((file) => (
                <li key={file._id}>
                  <a
                    href={`http://localhost:3000/applications/downloadFile/${file._id}`}
                    target="_blank"
                    className="flex items-center"
                  >
                    <HiDownload className="mr-2" />
                    {file.filename}
                  </a>
                </li>
              ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeFilesModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Applications;
