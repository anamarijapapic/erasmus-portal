import { Modal, Button } from 'flowbite-react';

const StudyProgrammeDetailsModal = ({ isOpen, onClose, studyProgramme }) => {
  if (!studyProgramme) return null;
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>StudyProgramme Details</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p>
            <strong>Name:</strong> {studyProgramme.name}
          </p>
          <p>
            <strong>Department:</strong> {studyProgramme.departmentId.name}
          </p>
          <p>
            <strong>Address:</strong> {studyProgramme.departmentId.address}
          </p>
          <p>
            <strong>Institution:</strong>{' '}
            {studyProgramme.departmentId.institutionId.name}
          </p>
          <p>
            <strong>Subject area:</strong> {studyProgramme.subjectAreaId.name}
          </p>
          <p>
            <strong>Academic eqf level:</strong>{' '}
            {studyProgramme.academicEqfLevel}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudyProgrammeDetailsModal;
