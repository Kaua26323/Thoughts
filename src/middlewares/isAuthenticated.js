function isAuthenticated(req, res, next) {
  if (!req.session.user || !req.session.user.id) {
    req.flash("error", "Access denied. Please sign in.");

    return req.session.save(() => {
      res.redirect("/login");
    });
  }

  next();
}

module.exports = isAuthenticated;
