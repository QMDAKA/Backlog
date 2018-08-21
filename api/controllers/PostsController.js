const dest = '../../assets/images';
const _ = require('lodash')
module.exports = {
  create: async (req, res) => {
    let randomstring = Math.random().toString(36).slice(-8);
    req.file('image').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10 * 1024 * 1024,
      dirname: dest
    }, async (err, files) => {
      if (err)
        return res.serverError(err);
      try {
        let baseUrl = req.headers.host;
        let avatarUrl = 'http://' + baseUrl + '/images/' + files[0].fd.split('/').reverse()[0];
        let user = await User.findOne(req.token.userId);
        let post = {
          title: req.query.title,
          body: req.query.body,
          abstract: req.query.abstract,
          image: avatarUrl
        };
        let tags = [...new Set(req.query.tags)];
        post = await Post.create(post);
        post.users.add(user);
        for (let i = 0; i < tags.length; i++) {
          let tmp = await Tag.findOne({'name': tags[i]})
          if (_.isUndefined(tmp)) {
            let tag = await Tag.create({
              name: tags[i]
            })
            post.tags.add(tag)
          } else {
            post.tags.add(tmp)
          }
        }
        let result = await post.save();
        result = await Post.findById(post.id).populate('users').populate('tags')
        console.log(result);
        return res.status(200).json({
          success: true,
          payload: result
        });
      } catch (err) {
        console.log(err)
        res.status(400).json({
          success: false,
          err: req.__('Bad Request')
        });
      }
      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  },
  index: async (req, res) => {
    let payload
    if (!_.isUndefined(req.param('idUser'))) {
      payload = await PostsService.findPostByUser(req.param('idUser'), req.query.page, req.query.size)
    }
    else if (_.isUndefined(req.query.idUser) && _.isUndefined(req.query.tag)) {
      payload = await PostsService.allPost(req.query.page, req.query.size)
    } else if (!_.isUndefined(req.query.idUser)) {
      payload = await PostsService.findPostByUser(req.query.idUser, req.query.page, req.query.size)
    } else {
      payload = await PostsService.findPostByTag(req.query.tag, req.query.page, req.query.size)
    }
    return res.status(200).json({
      success: true,
      payload: payload
    });
  },
  favorites: async (req, res) => {
    let payload = await PostsService.findPostByFavorite(req.token.userId, req.query.page, req.query.size)
    return res.status(200).json({
      success: true,
      payload: payload
    });
  },
  show: async (req, res) => {
    try {
      let countFav = await Favorite.count({postId: req.param('id')})
      let result = await Post.findOne({id: req.param('id')}).populate('users').populate('tags');
      if (_.isUndefined(result)) {
        return res.status(404).json({
          success: false,
          payload: "Not found"
        });
      } else {
        result.countFav = countFav
        return res.status(200).json({
          success: true,
          payload: result
        });
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        err: req.__('Bad Request')
      });
    }
  },
  delete: async (req, res) => {
    try {
      let post = await Post.findOne(req.param('id'))
      post.tags = null;
      post.users = null;
      let result = await post.save()
      let payload = await Post.destroy({id: req.param('id')})
      return res.status(200).json({
        success: true,
        payload: payload
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        err: req.__('Bad Request')
      });
    }
  },
  update: async (req, res) => {
    try {
      let post = await Post.findOne({id: req.param('id')}).populate('tags')
      post.title = req.query.title
      post.abstract = req.query.abstract
      post.body = req.query.body
      let result = ''
      let newTags = [...new Set(req.query.tags)];
      let normalTags = _.map(post.tags, 'name')
      let tagDiff = _.xor(newTags, normalTags, _.isEqual);
      for (let i = 0; i < tagDiff.length; i++) {
        let tmp = await Tag.findOne({'name': tagDiff[i]})
        if (_.isUndefined(tmp)) {
          let tag = await Tag.create({
            name: tagDiff[i]
          })
          post.tags.add(tag)
        } else {
          post.tags.add(tmp)
        }
      }
      if (req.query.changeImage === 'true') {
        let result = await PostsService.uploadFile(req)
        console.log(result)
        let baseUrl = req.headers.host;
        let avatarUrl = 'http://' + baseUrl + '/images/' + result[0].fd.split('/').reverse()[0];
        post.image = avatarUrl
      }
      await post.save()
      let pay = await Post.findOne({id: req.param('id')}).populate('tags')
      return res.status(200).json({
        success: true,
        payload: pay
      });
    } catch (err) {
      console.log(err)
    }
  }
}
