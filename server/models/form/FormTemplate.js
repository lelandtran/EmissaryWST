/* Require mongoose to interact with mongoDB */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * This will be the Schema for the Form Template Documents.
 **/
const formTemplate = new mongoose.Schema({
  _admin_id: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  template: {
    type: Object,
  },
});

module.exports = mongoose.model('FormTemplate', formTemplate);
