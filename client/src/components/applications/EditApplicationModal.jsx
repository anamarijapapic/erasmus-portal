import { Modal, Button, Label, Select, TextInput } from 'flowbite-react';

const EditApplicationModal = ({
  isOpen,
  onClose,
  application,
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
            <Label htmlFor="status" value="Status" />
            <Select
              id="status"
              name="status"
              value={application.status}
              onChange={onChange}
              required
            >
              <option value="prijavljeno">Prijavljeno</option>
              <option value="odobreno">Odobreno</option>
              <option value="odbijeno">Odbijeno</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="rating" value="Rating" />
            <TextInput
              id="rating"
              name="rating"
              type="number"
              required
              max={100}
              min={0}
              step={0.1}
              value={application.rating}
              onChange={onChange}
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditApplicationModal;
