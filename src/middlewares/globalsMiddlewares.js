exports.globalMiddleware = function (req, res, next) {
  res.locals.errors = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.session = req.session;
  next();
};
