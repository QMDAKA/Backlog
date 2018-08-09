const keys = require('../../config/keys')
const allTags = async (name, size = keys.sizeOfTags) => {
  try {
    let tags = await Tag.find({}).populate('posts')
    for (let i = 0; i < tags.length; i++) {
      tags[i].count = tags[i].posts.length
    }
    tags.sort(function (a, b) {
      return b.count - a.count;
    });
    let payload = [];
    let sizeAllOfTags = tags.length > size ? size : tags.length
    for(let i=0;i<sizeAllOfTags;i++){
      payload.push({
        name: tags[i].name,
        count: tags[i].count
      })
    }
    return Promise.resolve(payload)
  }catch (err)
  {
    console.log(err)
  }
}
module.exports = {
  allTags,
}
