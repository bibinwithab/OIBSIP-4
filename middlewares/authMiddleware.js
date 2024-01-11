function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }
  next();
}

module.exports = authMiddleware;
