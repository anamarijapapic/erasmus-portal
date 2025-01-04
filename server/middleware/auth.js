const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const token = authorization.split(' ')[1];
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id }).lean();
    if (!user) {
      return res.status(401).json({ error: 'Access denied' });
    }

    req.user = user._id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = verifyToken;
