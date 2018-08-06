const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const dest = '../../assets/images';
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
          image: avatarUrl
        };
        let tags = req.query.tags
        post = await Post.create(post);
        post.users.add(user);
        for (let i = 0; i < tags.length; i++) {
          let count = await Tag.find({name: tags[i]})
          if(count == 0) {
            let tag = await Tag.create({
              name: tags[i]
            })
            post.tags.add(tag)
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
  index : async(req,res) => {
    if(_.isUndefined(req.param('idUser'))){

  }}
  ,
  show: async(req,res) => {
    try{
      let result = await Post.findOne({id: req.param('id')});
      if(_.isUndefined(result)){
        return res.status(404).json({
          success: false,
          payload: "Not found"
        });
      }else {
        return res.status(200).json({
          success: true,
          payload: result
        });
      }
    }catch (err) {
      res.status(400).json({
        success: false,
        err: req.__('Bad Request')
      });
    }
  },
}
