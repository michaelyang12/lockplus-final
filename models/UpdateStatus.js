import mongoose from 'mongoose';
const model_name = 'UpdateStatus';
const { Schema } = mongoose;

const usSchema = new Schema({
  lockCode: {
    type: String,
    required: true,
    unique: true,
  },
  account_email: {
    type: String,
    required: true,
    unique: true,
  },
  history_status: {
    type: Boolean,
    required: true,
    default: false,
  },
  user_status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

let UpdateStatus;

if (!modelAlreadyDeclared()) {
  UpdateStatus = mongoose.model(model_name, usSchema, 'update_status');
}

function modelAlreadyDeclared() {
  try {
    mongoose.model(model_name); // it throws an error if the model is still not defined
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = UpdateStatus;
