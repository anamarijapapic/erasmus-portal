import { useState } from 'react';
import useGetSubjectAreas from '../../hooks/subjectAreas/useGetSubjectAreas';
import useCreateSubjectArea from '../../hooks/subjectAreas/useCreateSubjectArea';
import useDeleteSubjectArea from '../../hooks/subjectAreas/useDeleteSubjectArea';
import {
  Table,
  Pagination,
  TextInput,
  Label,
  Select,
  Button,
  Modal
} from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import CreateSubjectAreaModal from './CreateSubjectAreaModal';

const SubjectAreas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const { subjectAreas, currentPage, totalPages, onPageChange, refreshSubjectAreas } =
    useGetSubjectAreas(
      searchQuery,
      limit
    );

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedSubjectArea, setSelectedSubjectArea] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newSubjectArea, setNewSubjectArea] = useState({
    name: '',
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteSubjectArea, setDeleteSubjectArea] = useState(null);

  const { createSubjectArea } = useCreateSubjectArea();
  const { deleteSubjectArea: removeSubjectArea } = useDeleteSubjectArea();
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewSubjectArea({
      name: '',
    });
  };
  const openDeleteModal = (subjectArea) => {
    setDeleteSubjectArea(subjectArea);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteSubjectArea(null);
  };

  const handleCreateSubjectAreaChange = (event) => {
    const { name, value } = event.target;

    setNewSubjectArea((prevSubjectArea) => ({
      ...prevSubjectArea,
      [name]: value,
    }));
  };

  const handleCreateSubjectAreaSubmit = async (event) => {
    event.preventDefault();

    await createSubjectArea(newSubjectArea);
    closeCreateModal();
    refreshSubjectAreas();
  };
  const handleDeleteSubjectAreaSubmit = async () => {
    await removeSubjectArea(deleteSubjectArea._id);
    closeDeleteModal();
    refreshSubjectAreas();
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
            <Button onClick={openCreateModal}>Create Subject Area</Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table hoverable>
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800">
                SubjectAreas
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse a list of subjectAreas.
                </p>
              </caption>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {subjectAreas.map((subjectArea) => (
                  <Table.Row key={subjectArea._id}>
                    <Table.Cell>{subjectArea.name}</Table.Cell>
                    <Table.Cell>
                      <button
                        className="button"
                        onClick={() => openDeleteModal(subjectArea)}
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
      <CreateSubjectAreaModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        subjectArea={newSubjectArea}
        onChange={handleCreateSubjectAreaChange}
        onSubmit={handleCreateSubjectAreaSubmit}
      />
      <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Modal.Header>Delete subject area</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this subject area?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDeleteSubjectAreaSubmit}>
            Delete
          </Button>
          <Button onClick={closeDeleteModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubjectAreas;