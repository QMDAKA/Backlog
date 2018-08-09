module.exports = {
  schema: true,
  attributes: {
    username: {
      type: 'string',
      defaultsTo: ''
    },
    email: {
      type: 'email',
    },
    token: {
      type: 'string'
    },
    thumbnail: {
      type: 'string'
    },
    socialId: {
      type: 'string'
    },
    posts: {
      collection: 'post',
      via: 'users',
    },
    favorite: {
      collection: 'favorite',
      via: 'userId'
    },
    toJSON: function () {
      let obj = this.toObject();
      return obj;
    }
  }
};
