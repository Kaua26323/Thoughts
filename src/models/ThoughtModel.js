const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const User = require("./UserModel");
const catchErrors = require("../errors/catchError");

const Thought = db.define("thoughts", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Thought value is required" },
    },
  },
});

Thought.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Thought, { foreignKey: "userId" });

class ThoughtModel {
  constructor({ text, userId, isPOST }) {
    this.text = text;
    this.errors = [];
    this.success = [];
    this.userId = userId;
    this.isPOST = isPOST;
    this.thoughts = [];
  }

  async getThoughts() {
    this.validate();

    try {
      const thoughts = await Thought.findAll({
        where: { userId: this.userId },
      });

      thoughts.map((item) => {
        this.thoughts.push(item.dataValues);
        console.log("this.thoughts:", item);
      });

      return this.thoughts;
    } catch (err) {
      this.errors.push(catchErrors(err));
    }
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    try {
      const data = {
        text: this.text,
        userId: this.userId,
      };

      await Thought.create(data);

      this.success.push("Thought was created with successfully!");
    } catch (err) {
      this.errors.push(catchErrors(err));
    }
  }

  validate() {
    this.errors = [];
    this.success = [];
    this.thoughts = [];

    console.log("this.text", this.text);
    console.log("this.userId", this.userId);
    console.log("this.isPOST", this.isPOST);

    if (this.isPOST && typeof this.text !== "string") {
      this.errors.push("Text is invalid!");
      return;
    }

    if (!this.userId) {
      console.log("UseId dentro do if:", this.userId);
      this.errors.push("ID is invalid, Please sign in.");
      return;
    }
  }
}

module.exports = { Thought, ThoughtModel };
