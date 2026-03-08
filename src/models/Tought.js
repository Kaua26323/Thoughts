const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const User = require("./UserModel");

const Tought = db.define("Toughts", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

Tought.belongsTo(User);
User.hasMany(Tought);

module.exports = Tought;
