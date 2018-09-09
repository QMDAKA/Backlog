const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
const keys = require('../../config/keys');
var fs = require('fs');
module.exports = {
  upload: async (req, res) => {
    req.file('file').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10 * 1024 * 1024,
      dirname: keys.destImage
    }, async (err, files) => {
      await snooze(2000);
      console.log('done!');
      let baseUrl = req.headers.host;
      let imageUrl = 'http://' + baseUrl + keys.partUriImage + files[0].fd.split('/').reverse()[0];
      return res.status(200).json({
        link: imageUrl
      });
    });
  },
  show: async (req, res, next) => {
    let pathFile = sails.config.appPath + '/assets/images/' + req.param('thumb');
    fs.exists(pathFile, (exists) => {
      if (!exists) {
        return res.notFound('The requested file does not exist.')
      }
      fs.createReadStream(pathFile).pipe(res)
    })
  }
}
