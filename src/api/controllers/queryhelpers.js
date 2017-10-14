module.exports = {
  allowed: {
    tags: {
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
    questions: {
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
          key: 'activity',
          defaultOrder: -1,
        },
        {
          key: 'votes',
          defaultOrder: -1,
        },
        {
          key: 'creation',
          defaultOrder: -1,
        },
        {
          key: 'hot',
          defaultOrder: -1,
        },
        {
          key: 'week',
          defaultOrder: -1,
        },
        {
          key: 'month',
          defaultOrder: -1,
        },
      ],
    },
  },
  default(type) {
    if (type === 'tags') {
      return 'order=desc&sort=popular&site=stackoverflow';
    }
    return '';
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
