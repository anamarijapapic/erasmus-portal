import { Modal, Button, Label, Select } from 'flowbite-react';

const CreateApplicationModal = ({
  isOpen,
  onClose,
  application,
  users,
  loggedUser,
  loggedUserData,
  mobilities,
  onChange,
  onSubmit,
}) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Create Application</Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="userId" value="User" />
            {loggedUser.role === 'admin' && (
              <Select
                id="userId"
                name="userId"
                value={application.userId}
                onChange={onChange}
                required
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </Select>
            )}
            {['staff', 'student'].includes(loggedUser?.role) && (
              <Select
                id="userId"
                name="userId"
                value={application.userId}
                onChange={() => (application.userId = loggedUser.id)}
                required
              >
                <option key={loggedUser.id} value={loggedUser.id}>
                  {loggedUser.email}
                </option>
              </Select>
            )}
          </div>
          <div>
            <Label htmlFor="mobilityId" value="Mobility" />
            <Select
              id="mobilityId"
              name="mobilityId"
              value={application.mobilityId}
              onChange={onChange}
              required
            >
              <option value="">Select a mobility</option>
              {loggedUser.role === 'admin' &&
                mobilities
                  .filter((mobility) => {
                    const now = new Date();
                    const nowTime = now.getTime();
                    const deadlineTime = new Date(
                      mobility.homeApplicationDeadline
                    ).getTime();
                    return deadlineTime > nowTime;
                  })
                  .map((mobility) => (
                    <option key={mobility._id} value={mobility._id}>
                      Study programee: {mobility.hostStudyProgrammeId.name} ,
                      Department:{' '}
                      {mobility.hostStudyProgrammeId.departmentId.name},
                      Duration: {mobility.duration}, Season: {mobility.season}
                    </option>
                  ))}
              {loggedUser.role === 'staff' &&
                mobilities
                  .filter((mobility) => {
                    const now = new Date();
                    const nowTime = now.getTime();
                    const deadlineTime = new Date(
                      mobility.homeApplicationDeadline
                    ).getTime();
                    return deadlineTime > nowTime && mobility.type === 'staff';
                  })
                  .map((mobility) => (
                    <option key={mobility._id} value={mobility._id}>
                      Study programee: {mobility.hostStudyProgrammeId.name} ,
                      Department:{' '}
                      {mobility.hostStudyProgrammeId.departmentId.name},
                      Duration: {mobility.duration}, Season: {mobility.season}
                    </option>
                  ))}
              {loggedUser.role === 'student' &&
                mobilities
                  .filter((mobility) => {
                    const now = new Date();
                    const nowTime = now.getTime();
                    const deadlineTime = new Date(
                      mobility.homeApplicationDeadline
                    ).getTime();
                    const subjectAreaOfInterest =
                      mobility?.hostStudyProgrammeId?.subjectAreaId?._id ===
                      loggedUserData?.studyProgrammeId?.subjectAreaId?._id;
                    const differentInstitution =
                      loggedUserData?.studyProgrammeId?.departmentId
                        ?.institutionId._id !==
                      mobility?.hostStudyProgrammeId?.departmentId
                        ?.institutionId._id;

                    return (
                      deadlineTime > nowTime &&
                      mobility.type !== 'staff' &&
                      subjectAreaOfInterest &&
                      differentInstitution
                    );
                  })
                  .map((mobility) => (
                    <option key={mobility._id} value={mobility._id}>
                      Study programee: {mobility.hostStudyProgrammeId.name} ,
                      Department:{' '}
                      {mobility.hostStudyProgrammeId.departmentId.name},
                      Duration: {mobility.duration}, Season: {mobility.season}
                    </option>
                  ))}
            </Select>
          </div>
          <Button type="submit">Create</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateApplicationModal;
