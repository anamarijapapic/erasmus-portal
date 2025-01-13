import { Modal, Button } from 'flowbite-react';

const ApplicationDetailsModal = ({ isOpen, onClose, application }) => {
  if (!application) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Application Details</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p>
            <strong>Status:</strong> {application.status}
          </p>
          <p>
            <strong>Rating:</strong> {application.rating}
          </p>
          <p>
            <strong>User:</strong> {application.userId.firstName}{' '}
            {application.userId.lastName}
          </p>
          <p>
            <strong>Email:</strong> {application.userId.email}
          </p>
          <p>
            <strong>Contact Number:</strong> {application.userId.contactNumber}
          </p>
          <p>
            <strong>Year of study:</strong> {application.userId.yearOfStudy}
          </p>
          <p>
            <strong>Semester:</strong> {application.userId.semester}
          </p>
          <p>
            <strong>Mobility type:</strong> {application.mobilityId.type}
          </p>
          <p>
            <strong>Home institution name:</strong>{' '}
            {application.mobilityId.homeInstitutionId.name}
          </p>
          <p>
            <strong>Home institution country and code:</strong>{' '}
            {application.mobilityId.homeInstitutionId.country}{' '}
            {application.mobilityId.homeInstitutionId.erasmusCode}
          </p>
          <p>
            <strong>Home institution contact person:</strong>{' '}
            {application.mobilityId.homeInstitutionId.contactPersonId.firstName}{' '}
            {application.mobilityId.homeInstitutionId.contactPersonId.lastName}
          </p>
          <p>
            <strong>Home institution contact person contact data:</strong>{' '}
            {application.mobilityId.homeInstitutionId.contactPersonId.email}{' '}
            {
              application.mobilityId.homeInstitutionId.contactPersonId
                .contactNumber
            }
          </p>
          <p>
            <strong>Host study programme:</strong>{' '}
            {application.mobilityId.hostStudyProgrammeId.name}
          </p>
          <p>
            <strong>Host department name:</strong>{' '}
            {application.mobilityId.hostStudyProgrammeId.departmentId.name}
          </p>
          <p>
            <strong>Host department contact person:</strong>{' '}
            {
              application.mobilityId.hostStudyProgrammeId.departmentId
                .contactPersonId.firstName
            }{' '}
            {
              application.mobilityId.hostStudyProgrammeId.departmentId
                .contactPersonId.lastName
            }
          </p>
          <p>
            <strong>Host department contact person contact data:</strong>{' '}
            {
              application.mobilityId.hostStudyProgrammeId.departmentId
                .contactPersonId.email
            }{' '}
            {
              application.mobilityId.hostStudyProgrammeId.departmentId
                .contactPersonId.contactNumber
            }
          </p>
          <p>
            <strong>Study programee:</strong>{' '}
            {application.mobilityId.hostStudyProgrammeId.subjectAreaId.name}
          </p>
          <p>
            <strong>Duration:</strong> {application.mobilityId.duration}
          </p>
          <p>
            <strong>Home deadline:</strong>{' '}
            {application.mobilityId.homeApplicationDeadline}
          </p>
          <p>
            <strong>Host deadline:</strong>{' '}
            {application.mobilityId.homeApplicationDeadline}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplicationDetailsModal;
