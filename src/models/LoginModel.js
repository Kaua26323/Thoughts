const User = require("./UserModel");
const validetor = require("validator");
const argon2 = require("argon2");

class LoginModel {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.success = [];
    this.user = null;
  }

  async signIn() {
    this.validate();
    if (this.errors.length > 0) return;

    try {
      this.user = await User.findOne({ where: { email: this.body.email } });

      if (!this.user) {
        this.errors.push("Email/password is invalid!");
        return;
      }

      const verifyPassword = await argon2.verify(
        this.user.password,
        this.body.password,
      );

      if (!verifyPassword) {
        this.errors.push("Email/password is invalid!");
        return;
      }

      this.success.push("O login foi realizado com successo!");
    } catch (err) {
      this.errors.push(
        "Authentication service is currently unavailable. Please try again later.",
      );
      console.error(err);
    }
  }

  validate() {
    this.cleanUp();
    this.errors = [];
    this.success = [];
    this.user = null;

    if (!this.body.email) {
      this.errors.push("Email is required!");
      return;
    }

    if (!this.body.password) {
      this.errors.push("Password is required!");
      return;
    }

    if (!validetor.isEmail(this.body.email)) {
      this.errors.push("Email is invalid!");
      return;
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = LoginModel;
