const {
  loginValidation,
  passwordValidation,
} = require('../validators/validation');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const sendPasswordResetEmail = require('../utils/mailer.js');
const Token = require('../models/token.model.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: 'Email is not found' });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({ error: 'Wrong credentials' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      _id: user._id,
      email: user.email,
      token: token,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ error: 'Email is not found' });
  }
  try {
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userID: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save();
    }

    const link = `http://localhost:5173/reset-password/${encodeURIComponent(
      user._id
    )}/${encodeURIComponent(token.token)}`;

    sendPasswordResetEmail(user.email, link);

    res.status(200).json({ email: user.email, token: token.token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'An error occurred. Please try again.' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { error } = passwordValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findById(req.params.userID);
    if (!user)
      return res.status(400).json({ error: 'Invalid link or expired' });

    const token = await Token.findOne({
      userID: user._id,
      token: req.params.token,
    });

    if (!token)
      return res.status(400).json({ error: 'Invalid link or expired' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;

    await user.save();
    await Token.findByIdAndDelete(token._id);

    res.status(200).json({ message: 'Password set successfully.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'An error occurred. Please try again.' });
  }
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
};
