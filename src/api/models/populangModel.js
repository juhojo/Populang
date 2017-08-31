'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LangSchema = new Schema({
  name: {
    type: String,
    required: 'Please provide the name of the programming language'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Languages', LangSchema);
