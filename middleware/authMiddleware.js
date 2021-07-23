const protect = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({
      message: 'Unauthorized',
      status: 401
    });
  }

  req.user = user;
  next();
}

module.exports = protect;