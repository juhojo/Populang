'use strict';
/**
 * [langList Routes (Languages collection)]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
module.exports = function(app) {
  const langList = require('../controllers/populangController');

  // Multiple languages routes
  app.route('/languages/all')
    .get(langList.list_all_languages)
    .post(langList.create_a_language);

  app.route('/languages/all/order/:order')
    .get(langList.list_all_languages_in_order);

  app.route('/languages/:langNames')
    .get(langList.list_languages);

  app.route('/languages/:langNames/order/:order')
    .get(langList.list_languages_in_order);

  app.route('/languages/:langNames/sort/:sortBy')
    .get(langList.sort_languages_by_sort_method);

  app.route('/languages/:langNames/sort/:sortBy/order/:order')
    .get(langList.sort_languages_by_sort_method_in_order);


  // Single language routes
  app.route('/language/:langId')
    .get(langList.read_a_language)
    .put(langList.update_a_language)
    .delete(langList.delete_a_language);

};
