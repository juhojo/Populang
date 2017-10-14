'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LangSchema = new Schema({
  name: {
    type: String,
    required: 'Please provide the name of the programming language'
  },
  total: {
    type: Number,
    default: 0,
  },
  popularity: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: '',
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
