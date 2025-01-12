import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import useGetMobilities from '../../hooks/mobilities/useGetMobilities';
import useCreateMobility from '../../hooks/mobilities/useCreateMobility';
import useEditMobility from '../../hooks/mobilities/useEditMobility';
import useDeleteMobility from '../../hooks/mobilities/useDeleteMobility';
import useGetStudyProgrammes from '../../hooks/studyProgrammes/useGetStudyProgrammes';
import useGetInstitutions from '../../hooks/institutions/useGetInstitutions';

import {
  Table,
  Pagination,
  TextInput,
  Label,
  Select,
  Button,
  Modal,
} from 'flowbite-react';
import { GoInfo } from 'react-icons/go';
import { TbEdit } from 'react-icons/tb';
import { MdOutlineDelete } from 'react-icons/md';
import MobilityDetailsModal from './MobilityDetailsModal';
import CreateMobilityModal from './CreateMobilityModal';
import EditMobilityModal from './EditMobilityModal';

const Mobilities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [homeInstitutionFilter, setHomeInstitutionFilter] = useState('');
  const [hostInstitutionFilter, setHostInstitutionFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [studyProgrammeFilter, setStudyProgrammeFilter] = useState('');
  const [seasonFilter, setSeasoneFilter] = useState('');
  const [limit, setLimit] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMobility, setSelectedMobility] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newMobility, setNewMobility] = useState({
    type: '',
    homeInstitutionId: '',
    hostStudyProgrammeId: '',
    numberOfStudentsOrStaff: '',
    duration: '',
    homeApplicationDeadline: '',
    nominationDeadline: '',
    hostApplicationDeadline: '',
    season: '',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMobility, setEditMobility] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMobility, setDeleteMobility] = useState(null);

  const { createMobility } = useCreateMobility();
  const { editMobility: updateMobility } = useEditMobility();
  const { deleteMobility: removeMobility } = useDeleteMobility();

  const {
    mobilities,
    currentPage,
    totalPages,
    onPageChange,
    setCurrentPage,
    refreshMobilities,
  } = useGetMobilities(
    searchQuery,
    homeInstitutionFilter,
    hostInstitutionFilter,
    typeFilter,
    studyProgrammeFilter,
    seasonFilter,
    limit
  );

  const { studyProgrammes } = useGetStudyProgrammes('', '', '', '', null);
  const { institutions } = useGetInstitutions('', '', null);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleHomeInstitutionChange = (event) => {
    setHomeInstitutionFilter(event.target.value);
  };

  const handleHostInstitutionChange = (event) => {
    setHostInstitutionFilter(event.target.value);
  };

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleStudyProgrammeChange = (event) => {
    setStudyProgrammeFilter(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSeasoneFilter(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const openModal = (mobility) => {
    setSelectedMobility(mobility);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMobility(null);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewMobility({
      type: '',
      homeInstitutionId: '',
      hostStudyProgrammeId: '',
      numberOfStudentsOrStaff: '',
      duration: '',
      homeApplicationDeadline: '',
      nominationDeadline: '',
      hostApplicationDeadline: '',
      season: '',
    });
  };

  const openEditModal = (mobility) => {
    setEditMobility(mobility);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditMobility(null);
  };

  const openDeleteModal = (mobility) => {
    setDeleteMobility(mobility);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteMobility(null);
  };

  const handleCreateMobilityChange = (event) => {
    const { name, value } = event.target;
    setNewMobility((prevMobility) => ({
      ...prevMobility,
      [name]: value,
    }));
  };

  const handleEditMobilityChange = (event) => {
    const { name, value } = event.target;
    setEditMobility((prevMobility) => ({
      ...prevMobility,
      [name]: value,
    }));
  };

  const handleCreateMobilitySubmit = async (event) => {
    event.preventDefault();

    await createMobility(newMobility);
    closeCreateModal();
    refreshMobilities();
  };

  const handleEditMobilitySubmit = async (event) => {
    event.preventDefault();
    await updateMobility(editMobility);
    closeEditModal();
    refreshMobilities();
  };

  const handleDeleteMobilitySubmit = async () => {
    await removeMobility(deleteMobility._id);
    closeDeleteModal();
    refreshMobilities();
  };

  const handleReset = (event) => {
    setSearchQuery('');
    setHomeInstitutionFilter('');
    setHostInstitutionFilter('');
    setTypeFilter('');
    setSeasoneFilter('');
    setStudyProgrammeFilter('');
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
                <Label
                  htmlFor="homeInstitution-filter"
                  value="Select home institution"
                />
              </div>
              <Select
                id="homeInstitution-filter"
                value={homeInstitutionFilter}
                onChange={handleHomeInstitutionChange}
              >
                <option value="">All home institutions</option>
                {institutions.map((institution) => (
                  <option key={institution._id} value={institution._id}>
                    {institution.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="hostInstitution-filter"
                  value="Select host institution"
                />
              </div>
              <Select
                id="hostInstitution-filter"
                value={hostInstitutionFilter}
                onChange={handleHostInstitutionChange}
              >
                <option value="">All host institutions</option>
                {studyProgrammes.map((program) => (
                  <option
                    key={program.departmentId.institutionId._id}
                    value={program.departmentId.institutionId._id}
                  >
                    {program.departmentId.institutionId.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="type-filter" value="Select a type" />
              </div>
              <Select
                id="type-filter"
                value={typeFilter}
                onChange={handleTypeChange}
              >
                <option value="">Select type</option>
                <option value="studijski">Studijski</option>
                <option value="praksa">Praksa</option>
                <option value="staff">Staff</option>
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="studyProgramme-filter"
                  value="Select study programme"
                />
              </div>
              <Select
                id="studyProgramme-filter"
                value={studyProgrammeFilter}
                onChange={handleStudyProgrammeChange}
              >
                <option value="">All study programmes</option>
                {studyProgrammes.map((program) => (
                  <option key={program._id} value={program._id}>
                    {program.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="season-filter" value="Select a season" />
              </div>
              <Select
                id="season-filter"
                value={seasonFilter}
                onChange={handleSeasonChange}
              >
                <option value="">All seasons</option>
                {[
                  ...new Set(mobilities.map((mobility) => mobility.season)),
                ].map((season) => (
                  <option key={season} value={season}>
                    {season}
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
            <Button className="m-1" onClick={openCreateModal}>
              Create Mobilities
            </Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table hoverable>
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800">
                Mobilities
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse a list of Mobilities.
                </p>
              </caption>
              <Table.Head>
                <Table.HeadCell>Home institution</Table.HeadCell>
                <Table.HeadCell>Host study programme</Table.HeadCell>
                <Table.HeadCell>Duration</Table.HeadCell>
                <Table.HeadCell>Number of participants</Table.HeadCell>
                <Table.HeadCell>Season</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Actions</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {mobilities.map((mobility) => (
                  <Table.Row key={mobility._id}>
                    <Table.Cell>{mobility.homeInstitutionId.name}</Table.Cell>
                    <Table.Cell>
                      {mobility.hostStudyProgrammeId.name}{' '}
                      {
                        mobility.hostStudyProgrammeId.departmentId.institutionId
                          .name
                      }
                    </Table.Cell>
                    <Table.Cell>{mobility.duration} months</Table.Cell>
                    <Table.Cell>{mobility.numberOfStudentsOrStaff}</Table.Cell>
                    <Table.Cell>{mobility.season}</Table.Cell>
                    <Table.Cell>
                      <button
                        className="button mr-2"
                        onClick={() => openModal(mobility)}
                      >
                        <GoInfo
                          className="text-blue-400"
                          style={{ fontSize: '1.5rem' }}
                        />
                      </button>
                      <button
                        className="button mr-2"
                        onClick={() => openEditModal(mobility)}
                      >
                        <TbEdit
                          className="text-green-400"
                          style={{ fontSize: '1.5rem' }}
                        />
                      </button>
                      <button
                        className="button mr-2"
                        onClick={() => openDeleteModal(mobility)}
                      >
                        <MdOutlineDelete
                          className="text-red-400"
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

      <MobilityDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mobility={selectedMobility}
      />

      <CreateMobilityModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        institutions={institutions}
        studyProgrammes={studyProgrammes}
        mobility={newMobility}
        onChange={handleCreateMobilityChange}
        onSubmit={handleCreateMobilitySubmit}
      />

      <EditMobilityModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        institutions={institutions}
        studyProgrammes={studyProgrammes}
        mobility={editMobility}
        onChange={handleEditMobilityChange}
        onSubmit={handleEditMobilitySubmit}
      />

      <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Modal.Header>Delete mobility</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this mobility?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDeleteMobilitySubmit}>
            Delete
          </Button>
          <Button onClick={closeDeleteModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Mobilities;
