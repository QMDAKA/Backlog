module.exports = {
  index: async (req, res) => {
    let name = '';
    if(!_.isUndefined(req.query.name)){
      name = req.query.name
    }
    let payload = await TagsService.allTags(name);
    return res.status(200).json({
      success: true,
      payload: payload
    });
  }
};
