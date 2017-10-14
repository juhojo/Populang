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
    .get(langList.list_all_languages);

  app.route('/languages/:langNames')
    .get(langList.list_languages);

  // TODO Remove add, update and delete from routes

  // Single language routes
  app.route('/languages/add')
    .post(langList.create_a_language);

  app.route('/language/:langId')
    .get(langList.read_a_language)
    .put(langList.update_a_language)
    .delete(langList.delete_a_language);

};
