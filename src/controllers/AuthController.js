const RegisterModel = require("../models/RegisterModel");
const LoginModel = require("../models/LoginModel");

class AuthController {
  login(req, res) {
    res.render("login.handlebars");
  }

  async signIn(req, res) {
    if (!req.body) return;
    try {
      console.log("Sended body:", req.body);
      const login = new LoginModel(req.body);
      await login.signIn();
      console.log("Post body:", login.body);

      if (login.errors.length > 0) {
        req.flash("error", login.errors);
        res.redirect("/login");
      }

      console.log("loginError:", login.errors);
      console.log("user:", login.user);

      req.session.user = {
        id: login.user.id,
        name: login.user.name,
        email: login.user.email,
      };
      console.log("USER!!", req.session.user);
      req.flash("success", login.success);
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.error("Critical Error:", err);
      req.flash("error", "Unexpected error.");
      return res.redirect("/login");
    }
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
      const newUser = new RegisterModel(req.body);
      await newUser.register();
      console.log("Body depois:", newUser.body);

      if (newUser.errors.length > 0) {
        req.flash("error", newUser.errors[0]);
        console.log("newUser.errors:", newUser.errors);
        console.log("newUser.errors1:", newUser.errors[0]);
        return res.redirect("/register");
      }

      req.session.user = {
        id: login.user.id,
        name: login.user.name,
        email: login.user.email,
      };

      console.log("USER!!", req.session.user);
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
