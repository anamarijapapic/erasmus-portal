const mongoose = require('mongoose');
const checkExistingModel = async (model, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Id is not valid');
  }

  const modelExists = await model.findById(id).lean();
  if (!modelExists) {
    throw new Error(`No ${model.collection.collectionName} present`);
  }

  return modelExists;
};

module.exports = checkExistingModel;
