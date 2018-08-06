module.exports = {
  me: async(req, res) =>{
    let user = await User.findById(req.token.userId);
    res.json({
      success: true,
      payload: user
    });
  }
}
