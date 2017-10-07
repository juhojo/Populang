'use strict';
const mongoose = require('mongoose');
const responses = require('./responses');
const helpers = require('./queryhelpers');
const Lang = mongoose.model('Languages');

/* Multiple languages methods */

exports.list_all_languages = function(req, res) {
  const { response, invalid } = responses;
  const { allowed: { sort, order }} = helpers;
  const { sort: sortQuery, order: orderQuery } = req.query;
  let ord = -1;
  let sortBy = 'popularity';
  let sIndx = -1;
  let oIndx = -1;
  let error = false;

  if (sortQuery) {
    sort.forEach((item, i) => {
      if (item.key === sortQuery) {
        sIndx = i;
      }
    });

    if (sIndx !== -1) {
      sortBy = sort[sIndx].key;
      ord = sort[sIndx].defaultOrder;
    } else {
      res.json(response(invalid.param(sortQuery)));
      error = true;
    }
  }

  if (orderQuery) {
    order.forEach((item, i) => {
      if (item.key === orderQuery) {
        oIndx = i;
      }
    });

    if (oIndx !== -1) {
      ord = order[oIndx].value;
    } else {
      res.json(response(invalid.param(orderQuery)));
      error = true;
    }
  }

  if (!error) {
    Lang.find({}, function(err, lang) {
      if (err) {
        res.send(err);
      } else {
        res.json(lang);
      }
    }).sort({ [sortBy]: ord });
  }
};

exports.graph_all_languages = function(req, res) {

};

exports.list_languages = function(req, res) {
  const langArray = req.params.langNames.split(',');
  const { response, invalid } = responses;
  const { allowed: { sort, order }} = helpers;
  const { sort: sortQuery, order: orderQuery } = req.query;
  let ord = -1;
  let sortBy = 'popularity';
  let sIndx = -1;
  let oIndx = -1;
  let error = false;

  if (sortQuery) {
    sort.forEach((item, i) => {
      if (item.key === sortQuery) {
        sIndx = i;
      }
    });

    if (sIndx !== -1) {
      sortBy = sort[sIndx].key;
      ord = sort[sIndx].defaultOrder;
    } else {
      res.json(response(invalid.param(sortQuery)));
      error = true;
    }
  }

  if (orderQuery) {
    order.forEach((item, i) => {
      if (item.key === orderQuery) {
        oIndx = i;
      }
    });

    if (oIndx !== -1) {
      ord = order[oIndx].value;
    } else {
      res.json(response(invalid.param(orderQuery)));
      error = true;
    }
  }

  if (!error) {
    Lang.find({ name: { $in: langArray } }, function(err, lang) {
      if (err)
        res.send(err);
      res.json(lang);
    }).sort({ [sortBy]: ord });
  }
};

exports.graph_languages = function(req, res) {

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
