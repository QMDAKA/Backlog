module.exports = {
  schema: true,
  attributes: {
    name: {
      type: 'string',
      defaultsTo: ''
    },
    posts: {
      collection: 'post',
      via: 'tags',
      dominant: true
    }
  }
};
