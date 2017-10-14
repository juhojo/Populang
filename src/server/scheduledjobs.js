var schedule = require('node-schedule'),
    Lang = require('../api/models/populangModel'), // Model
    langList = require('../api/controllers/populangController'), // Populang controller
    seList = require('../api/controllers/seController'); // Stack Exchange controller

var job = schedule.scheduleJob({ minute: 0 }, () => {
  console.log('Do stuff once an hour');
  // console.log(Lang);
  const newLang = {
    name: '',
    total: 0,
    popularity: 0,
    description: '',
    wikipedia_uri: '',
    createdAt: Date.now(),
    status: ['pending'],
  };

  /*
  URL: 'https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow':
  returns: 30 most popular items.
  {
    "items": [
      {
        "count": 1488541,
        "name": "javascript"
      },
      {
        "count": 1324771,
        "name": "java"
      },
      ...
    ]
  }
  var mostPopularItems = data.items.map(item => (
    {
    	name: item.name,
    	total: item.count,
    }
  ));

  var setStart = mostPopularItems.slice(0, 15);
  var query1 = setStart.map(item => item.name).join(';');

  var setEnd = mostPopularItems.slice(15);
  var query2 = setStart.map(item => item.name).join(';');

  URL: "https://api.stackexchange.com/2.2/tags/${set}/wikis?site=stackoverflow"
  returns: 15 items: (x2).
  {
    "items": [
      {
        "exceprt": "Java (not to be confused with JavaScript or JScript) is ..."
      },
      {
        "exceprt": "Java (not to be confused with JavaScript or JScript) is ..."
      },
      ..
    ]
  }

  var descriptions = data.items.map(item => ({ name: item.tag_name, description: item.exceprt }));

  mostPopularItems.forEach((item, i) => {
    description.forEach((descItem) => {
      if (item.name === descItem.tag_name) {
        mostPopularItems[i].description = descItem.description;
      }
    });
  });
  */
});
