const createFav = async (idUser, idPost) => {
  try {
    let ele = await Favorite.findOne({
      userId: idUser,
      postId: idPost
    });
    if (_.isUndefined(ele)) {
      let user = await User.findOne(idUser);
      let post = await Post.findOne(idPost);
      let fav = await Favorite.create({
        userId: user,
        postId: post,
      });
      console.log(fav)
      return Promise.resolve({
        fav: fav,
        status: 'created'
      })
    }
    return Promise.resolve({
      fav: ele,
      status: 'exist'
    })
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
};
const deleteFav = async (idFav) => {
  try {
    let ele = await Favorite.findOne(idFav);
    let idUser = ele.idUser;
    ele = await Favorite.destroy({id: idFav});
    return Promise.resolve(ele)
  }catch (err) {
    return Promise.reject(err)
  }
}
module.exports = {
  createFav,
  deleteFav
}
