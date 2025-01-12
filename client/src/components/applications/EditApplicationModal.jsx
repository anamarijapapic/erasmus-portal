import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';

const EditApplicationModal = ({
  isOpen,
  onClose,
  application,
  users,
  onChange,
  onSubmit,
}) => {
  if (!application) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Edit Application</Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="userId" value="User" />
            <Select
              id="userId"
              name="userId"
              value={application.userId._id}
              onChange={onChange}
              required
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="mobilityId" value="Mobility" />
            <TextInput
              id="mobilityId"
              name="mobilityId"
              value={application.mobilityId._id}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="status" value="Status" />
            <Select
              id="status"
              name="status"
              value={application.status}
              onChange={onChange}
              required
            >
              <option value="">Select Role</option>
              <option value="prijavljeno">Prijavljeno</option>
              <option value="odobreno">Odobreno</option>
              <option value="odbijeno">Odbijeno</option>
            </Select>
          </div>
          <Button type="submit">Save</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditApplicationModal;
