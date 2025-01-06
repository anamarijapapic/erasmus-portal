const {
  passwordValidation,
  userValidation,
} = require('../validators/validation');
const User = require('../models/user.model');
const StudyProgramme = require('../models/studyProgramme.model');
const Department = require('../models/department.model');
const Institution = require('../models/institution.model');
const generator = require('generate-password');
const { sendEmail } = require('../utils/mailer');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  try {
    // Fetch all with nested population
    const allUsers = await User.find()
      .populate({
        path: 'studyProgrammeId',
        populate: {
          path: 'departmentId',
          populate: {
            path: 'institutionId',
          },
        },
      })
      .lean();

    // Filter
    let users = allUsers.filter((user) => {
      const role = req.query.role ? user.role === req.query.role : true;
      const semester = req.query.semester
        ? user.semester.toString() === req.query.semester
        : true;
      const yearOfStudy = req.query.yearOfStudy
        ? user.yearOfStudy.toString() === req.query.yearOfStudy
        : true;
      const studyProgrammeId = req.query.studyProgrammeId
        ? user.studyProgrammeId &&
          user.studyProgrammeId._id.toString() === req.query.studyProgrammeId
        : true;
      const departmentId = req.query.departmentId
        ? user.studyProgrammeId &&
          user.studyProgrammeId.departmentId &&
          user.studyProgrammeId.departmentId._id.toString() ===
            req.query.departmentId
        : true;
      const institutionId = req.query.institutionId
        ? user.studyProgrammeId &&
          user.studyProgrammeId.departmentId &&
          user.studyProgrammeId.departmentId.institutionId &&
          user.studyProgrammeId.departmentId.institutionId._id.toString() ===
            req.query.institutionId
        : true;

      return (
        role &&
        studyProgrammeId &&
        departmentId &&
        institutionId &&
        semester &&
        yearOfStudy
      );
    });

    // Search
    if (req.query.search) {
      const search = req.query.search.toLowerCase();
      users = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(search) ||
          user.lastName.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search)
      );
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = users.length;

    const totalPages = Math.ceil(total / limit);
    users = users.slice(startIndex, endIndex);

    res.status(200).json({ users, page, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    // Generate a random password
    const password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
      strict: true,
    });

    req.body.password = password;

    const { error } = userValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const studyProgramme = await StudyProgramme.findById(
      req.body.studyProgrammeId
    ).lean();

    if (!studyProgramme) {
      return res.status(404).json({ message: 'No study programme present' });
    }
    const user = await User.create(req.body);
    res.status(201).json(user);

    // Send password to user's email
    const subject = '[erasmus-portal] Welcome - Your new password';
    const text = `
        <h3>Welcome to erasmus-portal app, ${user.firstName} ${user.lastName}!</h3>
        <p>Your new password is: <b>${password}</b>.</p>
        <p>Please change your password after you log in.</p>
    `;
    sendEmail(req.body.email, subject, text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid old password' });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const { error } = passwordValidation({
      password: newPassword,
      confirmPassword: confirmNewPassword,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    user.password = newPassword;

    await user.save();
    res.json({ message: 'Password updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
};
