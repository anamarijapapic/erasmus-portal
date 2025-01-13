import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';

const CreateUserModal = ({
  isOpen,
  onClose,
  user,
  loggedInUser,
  onChange,
  onSubmit,
  studyProgrammes,
}) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Create User</Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="firstName" value="First Name" />
            <TextInput
              id="firstName"
              name="firstName"
              value={user.firstName}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName" value="Last Name" />
            <TextInput
              id="lastName"
              name="lastName"
              value={user.lastName}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="gender" value="Gender" />
            <Select
              id="gender"
              name="gender"
              value={user.gender}
              onChange={onChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="dateOfBirth" value="Date of Birth" />
            <TextInput
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={user.dateOfBirth}
              onChange={onChange}
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <Label htmlFor="placeOfBirth" value="Place of Birth" />
            <TextInput
              id="placeOfBirth"
              name="placeOfBirth"
              value={user.placeOfBirth}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="citizenship" value="Citizenship" />
            <TextInput
              id="citizenship"
              name="citizenship"
              value={user.citizenship}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="pinOIB" value="PIN/OIB" />
            <TextInput
              id="pinOIB"
              name="pinOIB"
              value={user.pinOIB}
              onChange={onChange}
              required
              min={11}
              max={11}
            />
          </div>
          <div>
            <Label htmlFor="idCardNumber" value="ID Card Number" />
            <TextInput
              id="idCardNumber"
              name="idCardNumber"
              value={user.idCardNumber}
              onChange={onChange}
              required
              max={9}
              min={9}
            />
          </div>
          <div>
            <Label htmlFor="address" value="Address" />
            <TextInput
              id="address"
              name="address"
              value={user.address}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="contactNumber" value="Contact Number" />
            <TextInput
              id="contactNumber"
              name="contactNumber"
              value={user.contactNumber}
              onChange={onChange}
              required
              min={8}
            />
          </div>
          <div>
            <Label htmlFor="semester" value="Semester" />
            <TextInput
              id="semester"
              name="semester"
              value={user.semester}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="yearOfStudy" value="Year of Study" />
            <TextInput
              id="yearOfStudy"
              name="yearOfStudy"
              value={user.yearOfStudy}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="role" value="Role" />
            <Select
              id="role"
              name="role"
              value={user.role}
              onChange={onChange}
              required
            >
              <option value="">Select Role</option>
              {loggedInUser?.role === 'admin' && (
                <>
                  <option value="admin">Admin</option>
                  <option value="coordinator">Coordinator</option>
                </>
              )}
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="studyProgrammeId" value="Study Programme" />
            <Select
              id="studyProgrammeId"
              name="studyProgrammeId"
              value={user.studyProgrammeId}
              onChange={onChange}
            >
              <option value="">Select Study Programme</option>
              {loggedInUser?.role === 'admin' && (
                <>
                  {studyProgrammes.map((studyProgramme) => (
                    <option key={studyProgramme._id} value={studyProgramme._id}>
                      {studyProgramme.name}
                    </option>
                  ))}
                </>
              )}
              {loggedInUser?.role === 'coordinator' && (
                <>
                  {studyProgrammes
                    .filter((studyProgramme) => {
                      const contactPersonIdforInstitutions =
                        studyProgramme.departmentId.institutionId
                          .contactPersonId?._id;
                      const contactPersonIdforDepartments =
                        studyProgramme.departmentId.contactPersonId?._id;
                      return (
                        contactPersonIdforInstitutions === loggedInUser.id ||
                        contactPersonIdforDepartments === loggedInUser.id
                      );
                    })
                    .map((studyProgramme) => (
                      <option
                        key={studyProgramme._id}
                        value={studyProgramme._id}
                      >
                        {studyProgramme.name}
                      </option>
                    ))}
                </>
              )}
            </Select>
          </div>
          <Button type="submit">Create</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateUserModal;
