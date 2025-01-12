import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';

const CreateMobilityModal = ({
  isOpen,
  onClose,
  institutions,
  studyProgrammes,
  mobility,
  onChange,
  onSubmit,
}) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Create mobility</Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="type" value="Type" />
            <Select
              id="type"
              name="type"
              value={mobility.type}
              onChange={onChange}
              required
            >
              <option value="">Select type</option>
              <option value="studijski">Studijski</option>
              <option value="praksa">Praksa</option>
              <option value="staff">Staff</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="homeInstitutionId" value="Institution" />
            <Select
              id="homeInstitutionId"
              name="homeInstitutionId"
              value={mobility.homeInstitutionId}
              onChange={onChange}
              required
            >
              <option value="">Select a home institution</option>
              {institutions.map((institution) => (
                <option key={institution._id} value={institution._id}>
                  {institution.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="hostStudyProgrammeId" value="Study Programme" />
            <Select
              id="hostStudyProgrammeId"
              name="hostStudyProgrammeId"
              value={mobility.hostStudyProgrammeId}
              onChange={onChange}
              required
            >
              <option value="">Select a host study programme</option>
              {studyProgrammes.map((studyProgramme) => (
                <option key={studyProgramme._id} value={studyProgramme._id}>
                  {studyProgramme.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label
              htmlFor="numberOfStudentsOrStaff"
              value="Number of Students or Staff"
            />
            <TextInput
              id="numberOfStudentsOrStaff"
              name="numberOfStudentsOrStaff"
              type="number"
              value={mobility.numberOfStudentsOrStaff}
              onChange={onChange}
              required
              max={6}
              min={1}
            />
          </div>
          <div>
            <Label htmlFor="duration" value="Duration (in months)" />
            <TextInput
              id="duration"
              name="duration"
              type="number"
              value={mobility.duration}
              onChange={onChange}
              required
              max={12}
              min={1}
            />
          </div>
          <div>
            <Label
              htmlFor="homeApplicationDeadline"
              value="Home Application Deadline"
            />
            <TextInput
              id="homeApplicationDeadline"
              name="homeApplicationDeadline"
              type="date"
              value={mobility.homeApplicationDeadline}
              onChange={onChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <Label htmlFor="nominationDeadline" value="Nomination Deadline" />
            <TextInput
              id="nominationDeadline"
              name="nominationDeadline"
              type="date"
              value={mobility.nominationDeadline}
              onChange={onChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <Label
              htmlFor="hostApplicationDeadline"
              value="Host Application Deadline"
            />
            <TextInput
              id="hostApplicationDeadline"
              name="hostApplicationDeadline"
              type="date"
              value={mobility.hostApplicationDeadline}
              onChange={onChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <Label htmlFor="season" value="Season" />
            <TextInput
              id="season"
              name="season"
              value={mobility.season}
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

export default CreateMobilityModal;
