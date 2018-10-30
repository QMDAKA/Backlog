module.exports = {
  home: async (req,res) => {
    const fs = require('fs')
    const path = require('path');
    let pathFile = path.join(__dirname, '..', '..', 'views', 'Frontlog', 'dist', 'index.html')
    fs.readFile(pathFile, 'utf8', async function (err,data) {
      try {
        if (err) {
          return console.log(err);
        }
        if (req.params[0].indexOf('blog/') == 0) {
          try {
            let arr = req.params[0].split('/')
            let idPost = arr[1]
            let post = await Post.findOne({id: idPost});
            data = data.replace(/\$OG_TITLE/g, '\'' + post.title + ' \'');
            data = data.replace(/\$OG_DESCRIPTION/g, '\'' + post.abstract + ' \'');
            data = data.replace(/\$OG_URL/g, req.baseUrl + req.originalUrl);
            result = data.replace(/\$OG_IMAGE/g, post.image);
            res.send(result);
          } catch (e) {
            console.log(e);
          }
        }
        fs.createReadStream(pathFile).pipe(res)
      }catch (e) {
        console.log(e);
      }
    });
  }
}
