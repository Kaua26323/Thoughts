const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const validator = require("validator");
const argon2 = require("argon2");

const User = db.define("Users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: "Name value is required" },
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: "Email value is required" },
      isEmail: { msg: "Email is invalid!" },
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Password value is required" },
    },
  },
});

class UserModel {
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
      if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError"
      ) {
        err.errors.forEach((error) => {
          this.errors.push(error.message);
        });
      } else {
        this.errors.push("An internal error occurred. Please try again.");
        console.error(err);
      }
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

module.exports = { User, UserModel };
