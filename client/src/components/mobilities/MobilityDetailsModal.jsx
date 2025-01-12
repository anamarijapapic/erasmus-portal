import { Modal, Button } from 'flowbite-react';

const MobilityDetailsModal = ({ isOpen, onClose, mobility }) => {
  if (!mobility) return null;
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Mobility Details</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p>
            <strong>Type:</strong> {mobility.type}
          </p>
          <p>
            <strong>Home institution:</strong> {mobility.homeInstitutionId.erasmusCode}{' '}{mobility.homeInstitutionId.name}{' '}{mobility.homeInstitutionId.country}
          </p>
          <p>
            <strong>Department name:</strong> {mobility.hostStudyProgrammeId.departmentId.name}
          </p>
          <p>
            <strong>Host institution:</strong> {mobility.hostStudyProgrammeId.departmentId.institutionId.erasmusCode}{' '}{mobility.hostStudyProgrammeId.departmentId.institutionId.name}{' '}{mobility.hostStudyProgrammeId.departmentId.institutionId.country}
          </p>
          <p>
            <strong>Number of participants:</strong> {mobility.numberOfStudentsOrStaff}
          </p>
          <p>
            <strong>Duration:</strong> {mobility.duration} months
          </p>
          <p>
            <strong>Season:</strong> {mobility.season}
          </p>
          <p>
            <strong>Home application deadline:</strong> {new Date(mobility.homeApplicationDeadline).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p>
            <strong>Nomination deadline:</strong> {new Date(mobility.nominationDeadline).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p>
            <strong>Host application deadline:</strong> {new Date(mobility.hostApplicationDeadline).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MobilityDetailsModal;