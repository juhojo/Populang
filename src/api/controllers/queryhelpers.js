module.exports = {
  allowed: {
    order: [
      {
        key: 'asc',
        value: 1,
      },
      {
        key: 'desc',
        value: -1,
      },
      {
        key: '1',
        value: 1,
      },
      {
        key: '-1',
        value: -1,
      }
    ],
    sort: [
      {
        key: 'popularity',
        defaultOrder: -1,
      },
      {
        key: 'total',
        defaultOrder: -1,
      },
      {
        key: 'name',
        defaultOrder: 1,
      },
    ],
  },
  optional(param) {
    let stringClone = param.slice();
    const fields = {};

    const equalIndex = (string) => string.indexOf('=');
    const andIndex = (string) => string.indexOf('&');

    let eIndex = equalIndex(stringClone);
    let aIndex = andIndex(stringClone);

    while (eIndex > -1) {
    	const key = stringClone.substring(0, eIndex);
      const valueEndIndex = (aIndex > -1) ? aIndex : stringClone.length;
      const value = stringClone.substring(eIndex + 1, valueEndIndex);

      // Set key + value
      fields[key] = value;

      stringClone = stringClone.substring(valueEndIndex + 1, stringClone.length);
      eIndex = equalIndex(stringClone);
      aIndex = andIndex(stringClone);
    }

    console.log('fields:', fields);
    return fields;
  },
  default() {
    return 'order=desc&sort=popular&site=stackoverflow';
  },
  defaults: {
    order() {
      return 'order=desc';
    },
    sortType() {
      return 'sort=popular';
    },
    site() {
      return 'site=stackoverflow';
    },
  }
}
