module.exports = {
  home: async (req,res) => {
    const fs = require('fs')
    const path = require('path');
    let pathFile = path.join(__dirname, '..', '..', 'views', 'Frontlog', 'dist', 'index.html')
    console.log(pathFile)
    fs.exists(pathFile, (exists) => {
      if (!exists) {
        return res.notFound('The requested file does not exist.')
      }
      fs.createReadStream(pathFile).pipe(res)
    })
  }
}
