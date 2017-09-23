'use strict';
module.exports = function(app) {
  const langList = require('../controllers/populangController');

  // langList Routes
  app.route('/languages')
    .get(langList.list_all_languages)
    .post(langList.create_a_language);

  app.route('/languages/:langId')
    .get(langList.read_a_language)
    .put(langList.update_a_language)
    .delete(langList.delete_a_language);

  app.route('/languages?order=:order')
    .get(langList.list_all_languages_in_order);
};
