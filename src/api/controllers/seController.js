'use strict';
const mongoose = require('mongoose');
const request = require('request');
const moment = require('moment');
const config = require('../../../.config/config');
const responses = require('./responses');
const helpers = require('./queryhelpers');
const { stackexchange: { baseUrl, separatorExp: exp } } = config;
const { response: resp, invalid } = responses;

const toUnix = (str) => Date.parse(str).getTime()/1000;

// Validate tags

const tagsValid = (res, tags) => {
  if (!tags) {
    res.json(resp(invalid.requiredParam('tags')));
    return false;
  }
  if (!tags.match(exp)) {
    res.json(resp(invalid.separator(tags)));
    return false;
  }
  return true;
};

// Uri structure functions

const infoUri = (param) => `${baseUrl}tags/${param}/wikis?site=stackoverflow`;

const countUri = (tags, query) => {
  const { sort: sortQuery, order: orderQuery, site: siteQuery } = query;
  const { allowed: { tags: { sort, order } } } = helpers;
  let queryparts = [''];
  let uri = `${baseUrl}tags/${tags}/info?site=stackoverflow`;

  if (!orderQuery && !sortQuery) {
    uri += helpers.default('tags');
    return uri;
  }

  let sortBy = 'sort=popular';
  let orderBy = 'order=desc';
  if (sortQuery) {
    if (sort.some(item => item.key === sortQuery)) {
      sortBy = `sort=${sortQuery}`;
      sort.forEach((item) => {
        if (item.key === sortQuery) {
          orderBy = `order=${item.defaultOrder}`;
        }
      });
    }
  }

  queryparts.push(sortBy);

  if (orderQuery) {
    order.forEach((item) => {
      if (item.key === orderQuery) {
        orderBy = `order=${item.value}`;
      }
    });
  }

  queryparts.push(orderBy);

  uri += queryparts.join('&');
  return uri;
};

const questionUri = (tags, query) => {
  const {
    fromdate: fromQuery,
    todate: toQuery,
    sort: sortQuery,
    order: orderQuery,
  } = query;
  const { allowed: { questions: { sort, order } } } = helpers;
  let queryparts = [''];
  let uri = `${baseUrl}questions?tagged=${tags}&site=stackoverflow`;

  let sortBy = 'sort=votes';
  let orderBy = 'order=desc';

  if (sortQuery) {
    if (sort.some(item => item.key === sortQuery)) {
      sortBy = `sort=${sortQuery}`;
      sort.forEach((item) => {
        if (item.key === sortQuery) {
          orderBy = `order=${item.defaultOrder}`;
        }
      });
    }
  }

  queryparts.push(sortBy);

  if (orderQuery) {
    order.forEach((item) => {
      if (item.key === orderQuery) {
        orderBy = `order=${item.value}`;
      }
    });
  }

  queryparts.push(orderBy);

  let fromUnix;

  if (fromQuery) {
    const unix = Number(fromQuery);
    if (!isNaN(unix) && unix < Date.now() && unix > 0) {
      queryparts.push(`fromdate=${unix}`);
      fromUnix = unix;
    }
  }

  if (toQuery) {
    const unix = Number(toQuery);
    if (!isNaN(unix) && unix < Date.now() && unix > 0) {
      if (!fromUnix || unix > fromUnix) {
        queryparts.push(`todate=${unix}`);
      }
    }
  }

  uri += queryparts.join('&');
  return uri;
};

// Exports

exports.read_tags_info = function(req, res) {
  const tags = req.params.tags;
  if (tagsValid(res, tags)) {
    const uri = infoUri(req.params.tags);
    request({
      uri,
      gzip: true,
    }, (error, response, body) => {
      if (error) {
        res.send(error);
      } else {
        const parsed = JSON.parse(body);
        if (parsed.items.length > 0) {
          const data = parsed.items.map(item => (
            {
              'name': item.tag_name,
              'description': item.excerpt
            }
          ));
          res.json(data);
        } else {
          res.json(resp(invalid.length(req.params.tags)));
        }
      }
    });
  }
};

exports.read_tags_postcount = function(req, res) {
  const tags = req.params.tags;
  if (tagsValid(res, tags)) {
    const uri = countUri(tags, req.query);
    request({
      uri,
      gzip: true,
    }, (error, response, body) => {
      if (error) {
        res.send(error);
      } else {
        const parsed = JSON.parse(body);
        if (parsed.items.length > 0) {
          const data = parsed.items.map(item => (
            {
              'name': item.name,
              'popularity': item.count
            }
          ));
          res.json(data);
        } else {
          res.json(resp(invalid.length(req.params.tags)));
        }
      }
    });
  }
}

exports.read_questions_with_tags = function(req, res) {
  const tags = req.params.tags;
  console.log(tags);
  if (tagsValid(res, tags)) {
    const uri = questionUri(tags, req.query);
    request({
      uri,
      gzip: true,
    }, (error, response, body) => {
      if (error) {
        res.send(error);
      } else {
        const parsed = JSON.parse(body);
        if (parsed.items.length > 0) {
          const data = parsed.items.map(item => (
            {
              'tags': item.tags,
              'score': item.score,
              'answer_count': item.answer_count,
              'view_count': item.view_count,
            }
          ));
          res.json(data);
        } else {
          res.json(resp(invalid.length(req.params.tags)));
        }
      }
    });
  }
}
