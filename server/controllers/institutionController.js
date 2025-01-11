const mongoose = require('mongoose');
const User = require('../models/user.model.js');
const Institution = require('../models/institution.model.js');

const createInstitution = async (req, res) => {
  try {
    const { name, erasmusCode, country, contactPersonId, address } = req.body;

    if (!mongoose.Types.ObjectId.isValid(contactPersonId)) {
      return res.status(404).json({ message: 'Id is not valid' });
    } else {
      const contactPerson = await User.findById(contactPersonId);
      if (!contactPerson) {
        return res.status(404).json({ message: 'No contact person present' });
      }
    }

    const institution = await Institution.create({
      name,
      erasmusCode,
      country,
      contactPersonId,
      address,
    });
    res.status(200).json(institution);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to create institution: ${error.message}` });
  }
};

const getInstitutions = async (req, res) => {
  const country = req.query.country;
  const name = req.query.name;

  let query = country ? { country } : {};

  if (name) {
    const trimmedSearchInput = name.trim();
    const searchRegex = new RegExp(trimmedSearchInput, 'i');
    query = {
      $or: [{ name: { $regex: searchRegex } }],
    };
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const totalPages = Math.ceil(
    (await Institution.countDocuments(query).lean()) /
      (parseInt(req.query.limit) || 10)
  );
  const skip = (page - 1) * limit;

  try {
    const institutions = await Institution.find(query)
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      })
      .lean();
    res.status(200).json({ institutions, page, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInstitution = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Id is not valid' });
    }

    const institution = await Institution.findById(id).lean();
    if (!institution) {
      return res.status(404).json({ message: 'No institution present' });
    }

    res.status(200).json(institution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInstitution = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Id is not valid' });
    }

    const institution = await Institution.findOneAndDelete({ _id: id });

    if (!institution) {
      return res.status(404).json({ message: 'No institution present' });
    }

    res.status(200).json(institution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInstitution = async (req, res) => {
  try {
    const { id } = req.params;
    const { contactPersonId } = req.body;

    if (contactPersonId) {
      if (!mongoose.Types.ObjectId.isValid(contactPersonId)) {
        return res.status(404).json({ message: 'Id is not valid' });
      } else {
        const contactPerson = await User.findById(contactPersonId);
        if (!contactPerson) {
          return res.status(404).json({ message: 'No contact person present' });
        }
      }
    }

    const institution = await Institution.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!institution) {
      return res.status(404).json({ message: 'No institution present' });
    }

    res.status(200).json(institution);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to update institution: ${error.message}` });
  }
};

module.exports = {
  createInstitution,
  getInstitutions,
  getInstitution,
  deleteInstitution,
  updateInstitution,
};
