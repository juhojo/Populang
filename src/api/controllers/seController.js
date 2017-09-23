'use strict';
const mongoose = require('mongoose');
const request = require('request');
const moment = require('moment');
const config = require('../../../.config/config');
const responses = require('./responses');
const queries = require('./queryhelpers');
const { stackexchange: { baseUrl, separatorExp: exp } } = config;
const { response: resp, invalid } = responses;

const toUnix = (str) => Date.parse(str).getTime()/1000;

// Uri structure functions
const infoUri = (param) => `${baseUrl}tags/${param}/wikis?site=stackoverflow`;
const countUri = (params) => {
  console.log('asdasdasdasd', params);
  const optionalFields = queries.optional(params[0]);
  const thisYear = moment().year();
  let queryparts = [
    'site=stackoverflow'
  ];
  let uri = `${baseUrl}tags/${params.tags}/info?`;

  if (!params.order && !params.sortType && !params.site) {
    uri += queries.default();
    return uri;
  }



  // if (params.year) {
  //   if (Number(params.year) <= thisYear) {
  //     const from = toUnix(`01-Jan-${year} 00:00:00`);
  //     let to = '';
  //     if (Number(params.year) === thisYear) {
  //       to = Date.now()/1000;
  //     } else {
  //       to = Date.parse(`31-Dec-${year} 23:59:59`).getTime()/1000;
  //     }
  //     queryparts.push()
  //     // `${params.year}`
  //   }
  // }





  if (params.order) {
    let order = 'order=';
    if (params.order === 'desc') {
      order += 'desc';
    } else if (params.order === 'asc') {
      order += 'asc';
    }
    queryparts.push(order)
  } else {
    console.log('here a');
    queryparts.push('order=desc');
  }




  const defaultSort = 'popular'
  if (params.sortType) {
    let sort = 'sort=';
    if (params.sortType === defaultSort) {
      sort += defaultSort;
    } else if (params.sortType === 'activity') {
      sort += 'activity';
    } else if (params.sortType === 'name') {
      sort += 'name';
    }
    queryparts.push(sort);
  } else {
    console.log('here b');
    queryparts.push(`sort=${defaultSort}`);
  }

  console.log('queryparts', queryparts);

  uri += queryparts.join('&');
  // `${baseUrl}tags/${req.params.tags}/info?order=desc&sort=popular&site=stackoverflow`;
  return uri;
}

exports.read_tags_info = function(req, res) {
  if (!req.params.tags) {
    res.json(resp(invalid.requiredParam('tags')));
  }
  if (req.params.tags && !req.params.tags.match(exp)) {
    res.json(resp(invalid.separator(req.params.tags)));
  } else {
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
  if (!req.params.tags) {
    res.json(resp(invalid.requiredParam('tags')));
  }
  if (req.params.tags && !req.params.tags.match(exp)) {
    res.json(resp(invalid.separator(req.params.tags)));
  } else {
    const uri = countUri(req.params);
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
