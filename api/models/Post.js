module.exports = {
  schema: true,
  attributes: {
    title: {
      type: 'text',
      defaultsTo: ''
    },
    image: {
      type: 'string',
    },
    body: {
      type: 'longtext',
    },
    numberOfShare: {
      type: 'integer',
      defaultsTo: 0
    },
    users: {
      collection: 'user',
      via: 'posts',
      dominant: true
    },
    favorite: {
      collection: 'favorite',
      via: 'postId'
    },
    tags: {
      collection: 'tag',
      via: 'posts'
    }
  }
};
