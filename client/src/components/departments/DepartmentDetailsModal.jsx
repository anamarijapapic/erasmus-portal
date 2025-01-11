import { Modal, Button } from 'flowbite-react';

const DepartmentDetailsModal = ({ isOpen, onClose, department }) => {
  if (!department) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Department Details</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p>
            <strong>Name:</strong> {department.name}
          </p>
          <p>
            <strong>Address:</strong> {department.address}
          </p>
          <p>
            <strong>Contact Person:</strong>{' '}
            {department.contactPersonId
              ? `${department.contactPersonId.firstName} ${department.contactPersonId.lastName}`
              : ''}
          </p>
          <p>
            <strong>Institution:</strong>{' '}
            {department.institutionId ? `${department.institutionId.name}` : ''}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DepartmentDetailsModal;
