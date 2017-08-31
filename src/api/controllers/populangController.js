'use strict';
const mongoose = require('mongoose');
const Lang = mongoose.model('Languages');

exports.list_all_languages = function(req, res) {
  Lang.find({}, function(err, lang) {
    if (err) {
      res.send(err);
    } else {
      res.json(lang);
    }
  });
};

exports.create_a_language = function(req, res) {
  const newLang = new Lang(req.body);
  newLang.save(function(err, lang) {
    if (err)
      res.send(err);
    res.json(lang);
  });
};

exports.read_a_language = function(req, res) {
  Lang.findById(req.params.langId, function(err, lang) {
    if (err)
      res.send(err);
    res.json(lang);
  });
};

exports.update_a_language = function(req, res) {
  Lang.findOneAndUpdate({ _id: req.params.langId }, req.body, { new: true }, function(err, lang) {
    if (err)
      res.send(err);
    res.json(lang);
  });
};

exports.delete_a_language = function(req, res) {
  Lang.remove({
    _id: req.params.langId
  }, function(err, lang) {
    if (err)
      res.send(err);
    res.json({ message: 'Language successfully deleted' });
  });
};
