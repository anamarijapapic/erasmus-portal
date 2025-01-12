import { Modal, Button } from 'flowbite-react';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>User Details</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p>
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
          <p>
            <strong>Date of Birth:</strong>{' '}
            {new Date(user.dateOfBirth).toLocaleDateString()}
          </p>
          <p>
            <strong>Place of Birth:</strong> {user.placeOfBirth}
          </p>
          <p>
            <strong>Citizenship:</strong> {user.citizenship}
          </p>
          <p>
            <strong>PIN/OIB:</strong> {user.pinOIB}
          </p>
          <p>
            <strong>ID Card Number:</strong> {user.idCardNumber}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Contact Number:</strong> {user.contactNumber}
          </p>
          <p>
            <strong>Semester:</strong> {user.semester}
          </p>
          <p>
            <strong>Year of Study:</strong> {user.yearOfStudy}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Study Program:</strong>{' '}
            {user.studyProgrammeId ? user.studyProgrammeId.name : ''}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;
