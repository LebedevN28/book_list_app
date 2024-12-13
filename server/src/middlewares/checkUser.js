function checkUser(req, res, next) {
  const userId = res.locals.user?.id;

  if (!userId) {
    return res.status(403).json({ message: 'User not authorized' });
  }

  next();
}

module.exports = checkUser;
