'use strict';
const mongoose = require('mongoose');
const responses = require('./responses');
const helpers = require('./queryhelpers');
const Lang = mongoose.model('Languages');

/* Multiple languages methods */

exports.list_all_languages = function(req, res) {
  Lang.find({}, function(err, lang) {
    if (err) {
      res.send(err);
    } else {
      res.json(lang);
    }
  });
};

exports.list_all_languages_in_order = function(req, res) {
  const { response, invalid } = responses;
  const { allowed: order } = helpers;
  let ord = -1; // Descending by default
  let indx = -1;

  order.some((item, i) => {
    indx = i;
    return item.key === req.params.order;
  });
  if (indx !== -1) {
    ord = order[indx].value;
  } else {
    res.json(response(invalid.param(req.params.order)));
  }

  // let order = -1; // Descending
  // if (req.params.order === 'desc') {
  //   order = -1;
  // } else if (req.params.order === 'asc') {
  //   order = 1;
  // } else {
  //   res.json(response(invalid.param(req.params.order)));
  // }

  Lang.find().sort({ popularity: ord }, function(err, lang) {
    if (err)
      res.send(err);
    res.json(lang);
  });
}

exports.sort_all_languages_by_sort_method_in_order = function(req, res) {

};

exports.graph_all_languages = function(req, res) {

};

exports.graph_all_languages_from_to = function(req, res) {

};

exports.graph_all_languages_from_to_by_sort_method = function (req, res) {

};

exports.list_languages = function(req, res) {
  const langArray = req.params.langNames.split(',');
  Lang.find({ name: { $in: langArray }}, function(err, lang) {
    if (err)
      res.send(err);
    res.json(lang);
  });
};

exports.list_languages_in_order = function(req, res) {
  const langArray = req.params.langNames.split(',');
  const { response, invalid } = responses;
  let order = -1;
  if (req.params.order === 'desc') {
    order = -1;
  } else if (req.params.order === 'asc') {
    order = 1;
  } else {
    res.json(response(invalid.param(req.params.order)));
  }

  Lang.find({ name: { $in: langArray } }).sort({ popularity: order }, function(err, lang) {
    if (err)
      res.send(err);
    res.json(lang);
  });
};

exports.sort_languages_by_sort_method_in_order = function(req, res) {
  const langArray = req.params.langNames.split(',');
  const { response, invalid } = responses;
  let sort = 'popularity';
  let order = -1;

  // if (req.params.order === 'desc' || )

  if (req.params.sort_method === 'popularity') {
    sort = 'popularity';
  } else if (req.params.sort_method === 'total') {
    sort = 'total';
  } else if (req.params.sort_method === 'name') {
    sort = 'name';
  } else {
    res.json(response(invalid.param(req.params.sort_method)));
  }

  Lang.find({ name: { $in: langArray } }).sort({ [sort]: -1 });
};

/* Single language methods */

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

exports.graph_a_language = function(req, res) {
  const lang = Lang.findById(reg.params.langId, function(err, lang) {
    if (err)
      res.send(err);
    // TODO Create a graph from lang.
  });
};

exports.graph_a_language_from_to = function(req, res) {
  const lang = Lang.findById(reg.params.langId, function(err, lang) {
    if (err)
      res.send(err);
    // TODO Create a graph from lang.
    // Posts from req.param.from to req.param.to
  });
};

exports.graph_a_language_from_to_by_sort_method = function(req, res) {
  const lang = Lang.findById(reg.params.langId, function(err, lang) {
    if (err)
      res.send(err);
    // TODO Create a graph from lang.
    // Posts from req.param.from to req.param.to.
    // Sort by:
    // - asc / desc popularity
    // - asc / desc total
    // - name
  });
};
