var Lang = require('../api/models/populangModel'); // Model

module.exports = {
  doMultipleInsert(items) {
    items.forEach((item) => {
      this.doInsert(item);
    });
  },
  doInsert(item) {
    const newLang = new Lang(item);
    newLang.save(function(err, lang) {
      if (err)
        console.log(err);
      console.log('success');
    });
  },
  doRemove() {
    Lang.remove({}, function(err, lang) {
      if (err)
        console.log(err);
      console.log('Languages successfully deleted');
    });
  },
};
