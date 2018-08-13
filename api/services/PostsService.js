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
  try{
    let tag = await Tag.findOne({name: query}).populate('posts');
    let idPosts = [];
    for(let i = 0; i < tag.posts.length; i++){
      idPosts.push(tag.posts[i].id)
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
  }catch (err){
    console.log(err)
  }
};
const findPostByUser = async (query = keys.query, page = keys.page, size = keys.size, sortQuery = keys.sortQuery) => {
  try{
    let user = await User.findOne(query).populate('posts');
    let idPosts = [];
    for(let i = 0; i < user.posts.length; i++){
      idPosts.push(user.posts[i].id)
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
  }catch (err){
    console.log(err)
  }
};
module.exports = {
  allPost,
  findPostByTag,
  findPostByUser
}
