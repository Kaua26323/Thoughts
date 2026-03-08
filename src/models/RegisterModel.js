const User = require("./UserModel");
const argon2 = require("argon2");
const catchErrors = require("../errors/catchError");

class RegisterModel {
  constructor(body) {
    this.body = body;
    this.user = null;
    this.errors = [];
    this.success = [];
  }

  async register() {
    this.validate();

    if (this.errors.length > 0) {
      return;
    }

    try {
      const hashPassword = await argon2.hash(this.body.password);
      console.log("hashPassword", hashPassword);
      console.log("hashPassword.length", hashPassword.length);

      this.user = await User.create({
        name: this.body.name,
        email: this.body.email,
        password: hashPassword,
      });

      this.success.push("Account created successfully!");
    } catch (err) {
      this.errors.push(catchErrors(err));
    }
  }

  validate() {
    this.cleanUp();
    this.errors = [];
    this.success = [];
    this.user = null;

    if (this.body.password.length < 6 || this.body.password.length > 50) {
      this.errors.push("Password must be 6-50 characters.");
      return;
    }
    if (this.body.password !== this.body.confirmPassword) {
      this.errors.push("Passwords do not match.");
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
      name: this.body.name,
      email: this.body.email,
      password: this.body.password,
      confirmPassword: this.body.confirmPassword,
    };
  }
}

module.exports = RegisterModel;
