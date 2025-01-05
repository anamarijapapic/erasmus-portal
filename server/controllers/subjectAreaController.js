// import User from "../models/UserModel.js";

const mongoose = require('mongoose');
const SubjectArea = require('../models/subjectArea.model');

const getAllSubjectAreas = async (req, res) => {
  try {
    const subjectAreas = await SubjectArea.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(subjectAreas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const searchSubjectAreas = async (req, res) => {
  const { searchInput } = req.params;
  const trimmedSearchInput = searchInput.trim();
  const searchRegex = new RegExp(trimmedSearchInput, 'i');
  try {
    let subjectAreaQuery = {
      $or: [{ name: { $regex: searchRegex } }],
    };

    const areas = await SubjectArea.find(subjectAreaQuery)
      .sort({
        createdAt: -1,
      })
      .lean();

    res.status(200).json(areas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSubjectArea = async (req, res) => {
  const { id } = req.params;

  const subjectArea = await SubjectArea.findById(id).lean();

  if (!subjectArea) {
    return res.status(404).json({ message: 'No subject area present' });
  }

  res.status(200).json(subjectArea);
};

const createSubjectArea = async (req, res) => {
  const { name } = req.body;

  try {
    const subjectArea = await SubjectArea.create({
      name,
    });

    res.status(200).json(subjectArea);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteSubjectArea = async (req, res) => {
  const { id } = req.params;

  const subjectArea = await SubjectArea.findOneAndDelete({ _id: id });

  if (!subjectArea) {
    return res.status(404).json({ message: 'No subjectArea present' });
  }

  res.status(200).json(subjectArea);
};

const updateSubjectArea = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedSubjectArea = await SubjectArea.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedSubjectArea) {
      return res.status(404).json({ message: 'No subject area found' });
    }
    res.status(200).json(updatedSubjectArea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllSubjectAreas,
  searchSubjectAreas,
  getSubjectArea,
  createSubjectArea,
  deleteSubjectArea,
  updateSubjectArea,
};
