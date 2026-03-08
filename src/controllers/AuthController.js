const { UserModel } = require("../models/UserModel");

class AuthController {
  login(req, res) {
    res.render("login.handlebars");
  }

  logOut(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }

  registerPage(req, res) {
    res.render("register.handlebars");
  }

  async createUser(req, res) {
    if (!req.body) return;
    try {
      console.log("Body enviado:", req.body);
      const newUser = new UserModel(req.body);
      await newUser.register();
      console.log("Body depois:", newUser.body);

      if (newUser.errors.length > 0) {
        req.flash("error", newUser.errors[0]);
        console.log("newUser.errors:", newUser.errors);
        console.log("newUser.errors1:", newUser.errors[0]);
        return res.redirect("/register");
      }

      req.session.user = newUser.user;
      console.log("USER!!", newUser.user);
      req.flash("success", newUser.success);

      return req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.error("Critical Error:", err);
      req.flash("error", "Unexpected error.");
      return res.redirect("/register");
    }
  }
}

module.exports = new AuthController();
