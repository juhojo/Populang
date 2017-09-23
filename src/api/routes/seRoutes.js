'use strict';
module.exports = function(app) {
  const seList = require('../controllers/seController');

  // Stack Exchange Routes
  app.route('/tags/:tags/info')
    .get(seList.read_tags_info);
  app.route('/tags/:tags/popularity/*?')
    .get(seList.read_tags_postcount);
};
