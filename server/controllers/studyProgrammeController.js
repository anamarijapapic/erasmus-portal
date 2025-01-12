const StudyProgramme = require('../models/studyProgramme.model');
const SubjectArea = require('../models/subjectArea.model');
const Department = require('../models/department.model');

const getAllStudyProgrammes = async (req, res) => {
  try {
    // Fetch all
    const allStudyProgrammes = await StudyProgramme.find().lean();

    // Filter
    let studyProgrammes = allStudyProgrammes.filter((studyProgramme) => {
      const departmentId = req.query.department
        ? studyProgramme.departmentId &&
          studyProgramme.departmentId._id.toString() === req.query.department
        : true;

      const subjectAreaId = req.query.subjectArea
        ? studyProgramme.subjectAreaId &&
          studyProgramme.subjectAreaId._id.toString() === req.query.subjectArea
        : true;

      const academicEqfLevel = req.query.academicEqfLevel
        ? studyProgramme.academicEqfLevel.toString() ===
          req.query.academicEqfLevel
        : true;

      return departmentId && subjectAreaId && academicEqfLevel;
    });

    // Search
    if (req.query.search) {
      const search = req.query.search.toLowerCase();

      studyProgrammes = studyProgrammes.filter((studyProgramme) =>
        studyProgramme.name.toLowerCase().includes(search)
      );
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = studyProgrammes.length;
    const totalPages = Math.ceil(total / limit);

    studyProgrammes = studyProgrammes.slice(startIndex, endIndex);

    res.status(200).json({ studyProgrammes, page, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudyProgramme = async (req, res) => {
  const { id } = req.params;
  const studyProgramme = await StudyProgramme.findById(id).lean();

  if (!studyProgramme) {
    return res.status(404).json({ message: 'No study programme present' });
  }

  res.status(200).json(studyProgramme);
};

const createStudyProgramme = async (req, res) => {
  const { name, departmentId, subjectAreaId, academicEqfLevel } = req.body;

  try {
    const department = await Department.findById(departmentId).lean();
    const subjectArea = await SubjectArea.findById(subjectAreaId).lean();
    if (!subjectArea) {
      return res.status(404).json({ message: 'No subject area found' });
    }
    if (!department) {
      return res.status(404).json({ message: 'No department found' });
    }
    const studyProgramme = await StudyProgramme.create({
      name,
      departmentId,
      subjectAreaId,
      academicEqfLevel,
    });

    res.status(200).json(studyProgramme);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteStudyProgramme = async (req, res) => {
  try {
    const { id } = req.params;

    const studyProgramme = await StudyProgramme.findOneAndDelete({ _id: id });

    if (!studyProgramme) {
      return res.status(404).json({ message: 'No study programme present' });
    }

    res.status(200).json(studyProgramme);
  } catch (error) {
    return res.status(404).json({ message: 'No study programme present' });
  }
};

const updateStudyProgramme = async (req, res) => {
  const { id } = req.params;
  const { name, departmentId, subjectAreaId, academicEqfLevel } = req.body;

  try {
    const department = await Department.findById(departmentId).lean();
    const subjectArea = await SubjectArea.findById(subjectAreaId).lean();

    if (!subjectArea) {
      return res.status(404).json({ message: 'No subject area found' });
    }
    if (!department) {
      return res.status(404).json({ message: 'No department found' });
    }
    const updatedStudyProgramme = await StudyProgramme.findByIdAndUpdate(
      id,
      { name, departmentId, subjectAreaId, academicEqfLevel },
      { new: true }
    );

    if (!updatedStudyProgramme) {
      return res.status(404).json({ message: 'No study programme found' });
    }

    res.status(200).json(updatedStudyProgramme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllStudyProgrammes,
  getStudyProgramme,
  createStudyProgramme,
  deleteStudyProgramme,
  updateStudyProgramme,
};
