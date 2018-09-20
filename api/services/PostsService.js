const keys = require('../../config/keys')
const allPost = async (page = keys.page, size = keys.size, query = keys.query, sortQuery = keys.sortQuery) => {
  try {
    let posts = await Post.find({
      sort: sortQuery
    }).populate('users').populate('tags').paginate({page: page, limit: size});
    let count = await Post.count({});
    let payload = {
      posts: posts,
      recordsFiltered: count,
      pageSize: parseInt(count / size) + 1
    }
    return Promise.resolve(payload)
  } catch (err) {
    return Promise.reject(err)
  }
};
const findPostByTag = async (query = keys.query, page = keys.page, size = keys.size, sortQuery = keys.sortQuery) => {
  try {
    let tag = await Tag.findOne({name: query}).populate('posts');
    let idPosts = [];
    for (let i = 0; i < tag.posts.length; i++) {
      idPosts.push(tag.posts[i].id)
    }
    let posts = await Post.find({
      id: idPosts,
      sort: sortQuery
    })
      .populate('tags').populate('users').paginate({page: page, limit: size});
    let count = await Post.count({
      id: idPosts
    });
    let payload = {
      posts: posts,
      recordsFiltered: count,
      pageSize: parseInt(count / size) + 1
    }
    return Promise.resolve(payload)
  } catch (err) {
    console.log(err)
  }
};
const findPostByUser = async (query = keys.query, page = keys.page, size = keys.size, sortQuery = keys.sortQuery) => {
  try {
    let user = await User.findOne(query).populate('posts');
    let idPosts = [];
    for (let i = 0; i < user.posts.length; i++) {
      idPosts.push(user.posts[i].id)
    }
    let posts = await Post.find({
      id: idPosts,
      sort: sortQuery
    })
      .populate('tags').populate('users').paginate({page: page, limit: size});
    let count = await Post.count({
      id: idPosts
    });
    let payload = {
      posts: posts,
      recordsFiltered: count,
      pageSize: parseInt(count / size) + 1
    }
    return Promise.resolve(payload)
  } catch (err) {
    console.log(err)
  }
};
const findPostByFavorite = async (query = keys.query, page = keys.page, size = keys.size, sortQuery = keys.sortQuery) => {
  try {
    let favorites = await Favorite.find({userId: query})
    let idPosts = [];
    for (let i = 0; i < favorites.length; i++) {
      idPosts.push(favorites[i].postId)
    }
    let posts = await Post.find({
      id: idPosts
    })
      .populate('tags').populate('users').paginate({page: page, limit: size});
    let count = await Post.count({
      id: idPosts
    });
    let payload = {
      posts: posts,
      recordsFiltered: count,
      pageSize: parseInt(count / size) + 1
    }
    return Promise.resolve(payload)
  } catch (err) {
    return Promise.reject(err)

  }
}
const uploadFile = (req) => {
  return new Promise(function (resolve, reject) {
    req.file('image').upload({
      maxBytes: 2000000,
      dirname: keys.destImage
    }, function (error, files) {
      return error ? reject(error) : resolve(files);
    })
  });
}
const selectByFav = async (req, res) => {
  try {
    let result = await new Promise((resolve, reject) =>{
      Favorite.native(function (err,collection) {
        if (err) return reject(err)
        collection.aggregate( {
            $group : {_id : "$postId", total : { $sum : 1 }}
          },
          {
            $sort : {total : -1}
          },
          {
            $limit : 4
          }
          ).toArray(function (err, results) {
          if (err) return reject(err)
          return resolve(results)
        });
      })
    })
    let postId = _.map(result, '_id')
    let post = await Post.find({id: postId}).populate('users')
    return Promise.resolve(post)
  } catch (e) {

  }
}
module.exports = {
  selectByFav,
  uploadFile,
  allPost,
  findPostByTag,
  findPostByUser,
  findPostByFavorite
}
