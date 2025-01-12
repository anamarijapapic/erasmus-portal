const SubjectArea = require('../models/subjectArea.model');

const getAllSubjectAreas = async (req, res) => {
  try {
    let allSubjectAreas = await SubjectArea.find().lean();

    if (req.query.search) {
      const search = req.query.search.toLowerCase();

      allSubjectAreas = allSubjectAreas.filter((subjectArea) =>
        subjectArea.name.toLowerCase().includes(search)
      );
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const total = allSubjectAreas.length;
    const totalPages = Math.ceil(total / limit);

    // Apply pagination to the result
    const paginatedSubjectAreas = allSubjectAreas.slice(startIndex, endIndex);

    // Send response
    res.status(200).json({
      subjectAreas: paginatedSubjectAreas,
      page,
      totalPages,
    });
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
  getSubjectArea,
  createSubjectArea,
  deleteSubjectArea,
  updateSubjectArea,
};
