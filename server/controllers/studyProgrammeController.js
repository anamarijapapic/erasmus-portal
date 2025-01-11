const StudyProgramme = require('../models/studyProgramme.model');
const SubjectArea = require('../models/subjectArea.model');
const Department = require('../models/department.model');

const getAllStudyProgrammes = async (req, res) => {
  try {
    const { departmentId, subjectAreaId, academicEqfLevel } = req.query;
    const filter = {};
    if (departmentId) filter.departmentId = departmentId;
    if (subjectAreaId) filter.subjectAreaId = subjectAreaId;
    if (academicEqfLevel) filter.academicEqfLevel = academicEqfLevel;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalPages = Math.ceil(
      (await StudyProgramme.countDocuments(filter).lean()) /
        (parseInt(req.query.limit) || 10)
    );
    const skip = (page - 1) * limit;

    const studyProgammes = await StudyProgramme.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      })
      .lean();

    res.status(200).json({ studyProgammes, page, totalPages });
  } catch (error) {
    res.status(404).json({ message: error.message });
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
