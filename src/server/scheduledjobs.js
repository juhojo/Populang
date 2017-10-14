var schedule = require('node-schedule'),
    request = require('request'),
    Lang = require('../api/models/populangModel'), // Model
    methods = require('./methods');
    langList = require('../api/controllers/populangController'), // Populang controller
    seList = require('../api/controllers/seController'); // Stack Exchange controller


// { hour: 0, minute: 0, dayOfWeek: 0 }
// { second: 0 }

(() => {
  console.log('here');
  doOnce();
})();

// Initial population function.
function doOnce() {
  console.log('here 2');
  // Collection has to be clear before population.
  Lang.count({}, (err, count) => {
    if (count > 0) {
      console.log('Collection not empty, no need for population.');
    } else {
      let filter = '*MPoAL(IzytfBrg1';
      let uri = `https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow&filter=!${filter}`;
      request({
        uri,
        gzip: true,
      }, (error, response, body) => {
        if (error) {
          console.log(error);
        } else {
          const mostPopularItems = JSON.parse(body).items.map(item => ({ name: item.name, total: item.count }));

          const startQuery = mostPopularItems.slice(0, 15).map(item => encodeURIComponent(item.name)).join(';');
          const endQuery = mostPopularItems.slice(15).map(item => encodeURIComponent(item.name)).join(';');

          filter = '*Ly1)NusrofArER1';
          uri = `https://api.stackexchange.com/2.2/tags/${startQuery}/wikis?site=stackoverflow&filter=!${filter}`;
          request({
            uri,
            gzip: true,
          }, (error2, respose2, body2) => {
            if (error2) {
              console.log(error2);
            } else {
              let descriptions = JSON.parse(body2).items;

              mostPopularItems.forEach((item, i) => {
                descriptions.forEach((descItem) => {
                  if (item.name === descItem.tag_name) {
                    mostPopularItems[i].description = descItem.excerpt;
                  }
                });
              });

              uri = `https://api.stackexchange.com/2.2/tags/${endQuery}/wikis?site=stackoverflow&filter=!${filter}`;
              request({
                uri,
                gzip: true,
              }, (error3, respose3, body3) => {
                if (error3) {
                  console.log(error3);
                } else {
                  descriptions = JSON.parse(body3).items;

                  mostPopularItems.forEach((item, i) => {
                    descriptions.forEach((descItem) => {
                      if (item.name === descItem.tag_name) {
                        mostPopularItems[i].description = descItem.excerpt;
                      }
                    });
                  });

                  console.log(mostPopularItems);

                  methods.doMultipleInsert(mostPopularItems);
                }
              });
            }
          });
        }
      });
    }
  });
};

// Update once a week.
var weeklyJob = schedule.scheduleJob({ hour: 0, minute: 0, dayOfWeek: 0 }, () => {
  // Get all current documents.

  // Update values.

});
