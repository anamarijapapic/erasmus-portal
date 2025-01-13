import { useState } from 'react';
import useGetApplications from '../../hooks/applications/useGetApplications';
import useCreateApplication from '../../hooks/applications/useCreateApplication';
import useEditApplication from '../../hooks/applications/useEditApplication';
import useDeleteApplication from '../../hooks/applications/useDeleteApplication';
import useGetUsers from '../../hooks/users/useGetUsers';
import useGetMobilities from '../../hooks/mobilities/useGetMobilities';
import useGetUser from '../../hooks/users/useGetUser';
import { useAuth } from '../../context/AuthContext';
import {
  Table,
  Pagination,
  Label,
  Select,
  Button,
  Modal,
} from 'flowbite-react';
import { GoInfo } from 'react-icons/go';
import { TbEdit } from 'react-icons/tb';
import { MdOutlineDelete } from 'react-icons/md';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import ApplicationDetailsModal from './ApplicationDetailsModal';
import CreateApplicationModal from './CreateApplicationModal';
import EditApplicationModal from './EditApplicationModal';
import FilesModal from './FilesModal';

const Applications = () => {
  const { user: loggedUser } = useAuth();
  const { user: loggedUserData, error, loading } = useGetUser(loggedUser?.id);

  let coming = [];
  let leaving = [];
  let myApplications = [];

  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [limit, setLimit] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const { users } = useGetUsers('', '', '', '', null);
  const { mobilities } = useGetMobilities('', '', '', '', '', '', null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newApplication, setNewApplication] = useState({
    userId: '',
    mobilityId: '',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editApplication, setEditApplication] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteApplication, setDeleteApplication] = useState(null);

  const { createApplication } = useCreateApplication();
  const { editApplication: updateApplication } = useEditApplication();
  const { deleteApplication: removeApplication } = useDeleteApplication();

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

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewApplication({
      userId: '',
      mobilityId: '',
    });
  };

  const openEditModal = (application) => {
    setEditApplication(application);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditApplication(null);
  };

  const openDeleteModal = (application) => {
    setDeleteApplication(application);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteApplication(null);
  };

  const handleCreateApplicationChange = (event) => {
    const { name, value } = event.target;
    setNewApplication((prevApplication) => ({
      ...prevApplication,
      [name]: value,
    }));
  };

  const handleEditApplicationChange = (event) => {
    const { name, value } = event.target;
    setEditApplication((prevApplication) => ({
      ...prevApplication,
      [name]: value,
    }));
  };

  const handleCreateApplicationSubmit = async (event) => {
    event.preventDefault();
    await createApplication(newApplication);
    closeCreateModal();
    refreshApplications();
  };

  const handleEditApplicationSubmit = async (event) => {
    event.preventDefault();

    await updateApplication(editApplication);
    closeEditModal();
    refreshApplications();
  };

  const handleDeleteApplicationSubmit = async () => {
    await removeApplication(deleteApplication._id);
    closeDeleteModal();
    refreshApplications();
  };

  const refreshFiles = async (applicationId) => {
    const response = await fetch(
      `http://localhost:3000/applications/${applicationId}`
    );
    const data = await response.json();
    setSelectedApplication(data);
    refreshApplications();
  };

  const handleReset = (event) => {
    setStatusFilter('');
    setRoleFilter('');
    setCurrentPage(1);
    setLimit(10);
  };

  if (loggedUser.role === 'coordinator') {
    leaving = applications.filter((application) => {
      return (
        application.mobilityId.homeInstitutionId.contactPersonId._id ===
        loggedUser.id
      );
    });
    coming = applications.filter(
      (application) =>
        application.mobilityId.hostStudyProgrammeId.departmentId.contactPersonId
          ._id === loggedUser.id
    );
  }

  if (loggedUser.role === 'staff' || loggedUser.role === 'student') {
    myApplications = applications.filter((application) => {
      return application.userId._id === loggedUser.id;
    });
  }

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
                <option value="">All statuses</option>
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
                <option value="student">Student</option>
                <option value="staff">Staff</option>
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
            {loggedUser.role !== 'coordinator' && (
              <Button className="m-1" onClick={openCreateModal}>
                Create Applications
              </Button>
            )}
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
                  <span className="sr-only">Actions</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {loggedUser.role === 'coordinator' &&
                  coming.map((application) => (
                    <Table.Row key={application._id} className="text-green-700">
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
                          className="button mr-2"
                          onClick={() => openModal(application)}
                        >
                          <GoInfo
                            className="text-blue-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                        <button
                          className="button mr-2"
                          onClick={() => openEditModal(application)}
                        >
                          <TbEdit
                            className="text-green-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                        <button
                          className="button mr-2"
                          onClick={() => openDeleteModal(application)}
                        >
                          <MdOutlineDelete
                            className="text-red-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                        <button
                          className="button mr-2"
                          onClick={() => openFilesModal(application)}
                        >
                          <IoDocumentAttachOutline
                            className="text-teal-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                {loggedUser.role === 'coordinator' &&
                  leaving.map((application) => (
                    <Table.Row key={application._id} className="text-red-700">
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
                          className="button mr-2"
                          title="Info"
                          onClick={() => openModal(application)}
                        >
                          <GoInfo
                            className="text-blue-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                        <button
                          className="button mr-2"
                          title="Edit"
                          onClick={() => openEditModal(application)}
                        >
                          <TbEdit
                            className="text-green-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                        <button
                          className="button mr-2"
                          title="Delete"
                          onClick={() => openDeleteModal(application)}
                        >
                          <MdOutlineDelete
                            className="text-red-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                        <button
                          className="button mr-2"
                          title="Document attachments"
                          onClick={() => openFilesModal(application)}
                        >
                          <IoDocumentAttachOutline
                            className="text-teal-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                {loggedUser.role === 'admin' &&
                  applications.map((application) => (
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
                          className="button mr-2"
                          title="Info"
                          onClick={() => openModal(application)}
                        >
                          <GoInfo
                            className="text-blue-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                        <button
                          className="button mr-2"
                          title="Edit"
                          onClick={() => openEditModal(application)}
                        >
                          <TbEdit
                            className="text-green-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                        <button
                          className="button mr-2"
                          title="Delete"
                          onClick={() => openDeleteModal(application)}
                        >
                          <MdOutlineDelete
                            className="text-red-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                        <button
                          className="button mr-2"
                          title="Document attachments"
                          onClick={() => openFilesModal(application)}
                        >
                          <IoDocumentAttachOutline
                            className="text-teal-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                {['stuff', 'student'].includes(loggedUser?.role) &&
                  myApplications.map((application) => (
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
                          className="button mr-2"
                          title="Info"
                          onClick={() => openModal(application)}
                        >
                          <GoInfo
                            className="text-blue-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                        <button
                          className="button mr-2"
                          title="Delete"
                          onClick={() => openDeleteModal(application)}
                        >
                          <MdOutlineDelete
                            className="text-red-400"
                            style={{ fontSize: '1.5rem' }}
                          />
                        </button>
                        <button
                          className="button mr-2"
                          title="Attach documents"
                          onClick={() => openFilesModal(application)}
                        >
                          <IoDocumentAttachOutline
                            className="text-teal-400"
                            style={{ fontSize: '1.5rem' }}
                          />
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

      <ApplicationDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        application={selectedApplication}
      />

      <EditApplicationModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        application={editApplication}
        onChange={handleEditApplicationChange}
        onSubmit={handleEditApplicationSubmit}
      />

      <CreateApplicationModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        application={newApplication}
        users={users}
        loggedUser={loggedUser}
        loggedUserData={loggedUserData}
        mobilities={mobilities}
        onChange={handleCreateApplicationChange}
        onSubmit={handleCreateApplicationSubmit}
      />

      <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Modal.Header>Delete Application</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this application?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDeleteApplicationSubmit}>
            Delete
          </Button>
          <Button onClick={closeDeleteModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      <FilesModal
        isOpen={isFilesModalOpen}
        onClose={closeFilesModal}
        application={selectedApplication}
        refreshFiles={refreshFiles}
      />
    </>
  );
};

export default Applications;
