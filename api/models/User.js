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
    toJSON: function () {
      let obj = this.toObject();
      return obj;
    }
  }
};
