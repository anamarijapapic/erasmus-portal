import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';

const CreateDepartmentModal = ({
  isOpen,
  onClose,
  department,
  institutions,
  onChange,
  onSubmit,
}) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Create Department</Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              name="name"
              value={department.name}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="address" value="Address" />
            <TextInput
              id="address"
              name="address"
              value={department.address}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="contactPersonId" value="Contact Person" />
            <TextInput
              id="contactPersonId"
              name="contactPersonId"
              value={department.contactPersonId._id}
              onChange={onChange}
            />
          </div>
          <div>
            <Label htmlFor="institutionId" value="Institution" />
            <Select
              id="institutionId"
              name="institutionId"
              value={department.institutionId}
              onChange={onChange}
              required
            >
              <option value="">Select a Institution</option>
              {institutions.map((institution) => (
                <option key={institution._id} value={institution._id}>
                  {institution.name}
                </option>
              ))}
            </Select>
          </div>
          <Button type="submit">Create</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateDepartmentModal;
