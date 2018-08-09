const dest = '../../assets/images';
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
module.exports = {
  upload: async(req,res) => {
    req.file('file').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10 * 1024 * 1024,
      dirname: dest
    }, async (err, files) => {
      await snooze(2000);
      console.log('done!');
      let baseUrl = req.headers.host;
      let imageUrl = 'http://' + baseUrl+ '/images/'+ files[0].fd.split('/').reverse()[0];
      return res.status(200).json({
        link: imageUrl
      });
    });
  }
}
