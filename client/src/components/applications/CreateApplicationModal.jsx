import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';

const CreateApplicationModal = ({
  isOpen,
  onClose,
  application,
  users,
  onChange,
  onSubmit,
}) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Create Application</Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="userId" value="User" />
            <Select
              id="userId"
              name="userId"
              value={application.userId}
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
              value={application.mobilityId}
              onChange={onChange}
              required
            />
          </div>
          <Button type="submit">Create</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateApplicationModal;
