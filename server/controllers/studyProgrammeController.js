const mongoose = require('mongoose');
const StudyProgramme = require('../models/studyProgramme.model');
const SubjectArea = require('../models/subjectArea.model');

const getAllStudyProgrammes = async (req, res) => {
  try {
    const studyProgammes = await StudyProgramme.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(studyProgammes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getStudyProgramme = async (req, res) => {
  const { id } = req.params;
  const studyProgramme = await StudyProgramme.findById(id).lean();

  if (!studyProgramme) {
    return res.status(404).json({ message: 'No subject area present' });
  }

  res.status(200).json(studyProgramme);
};

const createStudyProgramme = async (req, res) => {
  const { departmentId, subjectAreaId, academicEqfLevel } = req.body;

  try {
    //const department = await StudyProgramme.findById(id).lean();
    const subjectArea = await SubjectArea.findById(subjectAreaId).lean();
    if (!subjectArea) {
      return res.status(404).json({ message: 'No subject area found' });
    }
    const studyProgramme = await StudyProgramme.create({
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
  const { departmentId, subjectAreaId, academicEqfLevel } = req.body;

  try {
    const updatedStudyProgramme = await StudyProgramme.findByIdAndUpdate(
      id,
      { departmentId, subjectAreaId, academicEqfLevel },
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

const filterStudyProgrammes = async (req, res) => {
  const { departmentId, subjectAreaId, academicEqfLevel } = req.query;

  const filter = {};
  if (departmentId) filter.departmentId = departmentId;
  if (subjectAreaId) filter.subjectAreaId = subjectAreaId;
  if (academicEqfLevel) filter.academicEqfLevel = academicEqfLevel;

  try {
    const studyProgrammes = await StudyProgramme.find(filter).lean();
    res.status(200).json(studyProgrammes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStudyProgrammes,
  filterStudyProgrammes,
  getStudyProgramme,
  createStudyProgramme,
  deleteStudyProgramme,
  updateStudyProgramme,
};
