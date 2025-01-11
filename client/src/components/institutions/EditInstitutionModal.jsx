import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';

const EditInstitutionModal = ({
  isOpen,
  onClose,
  institution,
  onChange,
  onSubmit,
}) => {
  if (!institution) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Edit Institution</Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              name="name"
              value={institution.name}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="erasmusCode" value="Erasmus Code" />
            <TextInput
              id="erasmusCode"
              name="erasmusCode"
              value={institution.erasmusCode}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="country" value="Country" />
            <TextInput
              id="country"
              name="country"
              value={institution.country}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="contactPersonId" value="Contact person" />
            <TextInput
              id="contactPersonId"
              name="contactPersonId"
              value={institution.contactPersonId._id}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="address" value="Address" />
            <TextInput
              id="address"
              name="address"
              value={institution.address}
              onChange={onChange}
              required
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditInstitutionModal;
