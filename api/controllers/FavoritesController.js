module.exports = {
  create: async (req, res) => {
    let payload = await FavoritesService.createFav(req.token.userId, req.query.postId);
    return res.status(200).json({
      success: true,
      payload: payload
    });
  },
  delete: async (req, res) => {
    let payload = await FavoritesService.deleteFav(req.param('id'));
    return res.status(200).json({
      success: true,
      payload: payload
    });
  },
};
