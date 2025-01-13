import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';

const CreateStudyProgrammeModal = ({
  isOpen,
  onClose,
  departments,
  subjectAreas,
  studyProgramme,
  onChange,
  onSubmit,
}) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Create study programme</Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              name="name"
              value={studyProgramme.name}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="departmentId" value="Department" />
            <Select
              id="departmentId"
              name="departmentId"
              value={studyProgramme.departmentId}
              onChange={onChange}
              required
            >
              <option value="">Select a department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="subjectAreaId" value="Subject Area" />
            <Select
              id="subjectAreaId"
              name="subjectAreaId"
              value={studyProgramme.subjectAreaId}
              onChange={onChange}
              required
            >
              <option value="">Select a subject area</option>
              {subjectAreas.map((area) => (
                <option key={area._id} value={area._id}>
                  {area.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="academicEqfLevel" value="Academic Eqf Level" />
            <Select
              id="academicEqfLevel"
              name="academicEqfLevel"
              value={studyProgramme.academicEqfLevel}
              onChange={onChange}
              required
            >
              <option value="">Select academic eqf level</option>
              <option value="Level 1">Level 1</option>
              <option value="Level 2">Level 2</option>
              <option value="Level 3">Level 3</option>
              <option value="Level 4">Level 4</option>
              <option value="Level 5">Level 5</option>
              <option value="Level 6">Level 6</option>
              <option value="Level 7">Level 7</option>
              <option value="Level 8">Level 8</option>
            </Select>
          </div>
          <Button type="submit">Create</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateStudyProgrammeModal;
