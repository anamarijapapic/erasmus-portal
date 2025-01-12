import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';

const CreateSubjectAreaModal = ({ isOpen, onClose, subjectArea, onChange, onSubmit }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Create subject area</Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              name="name"
              value={subjectArea.name}
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

export default CreateSubjectAreaModal;