import { Modal, Button } from 'flowbite-react';

const InstitutionDetailsModal = ({ isOpen, onClose, institution }) => {
  if (!institution) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Institution Details</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p>
            <strong>Name:</strong> {institution.name}
          </p>
          <p>
            <strong>Erasmus code:</strong> {institution.erasmusCode}
          </p>
          <p>
            <strong>Country:</strong> {institution.country}
          </p>
          <p>
            <strong>Address:</strong> {institution.address}
          </p>
          <p>
            <strong>Contact person:</strong>{' '}
            {institution.contactPersonId.firstName}{' '}
            {institution.contactPersonId.lastName}
          </p>
          <p>
            <strong>Contact person email:</strong>{' '}
            {institution.contactPersonId.email}
          </p>
          <p>
            <strong>Contact number:</strong>{' '}
            {institution.contactPersonId.contactNumber}
          </p>
          <p>
            <strong>Contact citizenship:</strong>{' '}
            {institution.contactPersonId.citizenship}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InstitutionDetailsModal;
