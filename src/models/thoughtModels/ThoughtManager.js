const { raw } = require("express");
const Thought = require("./ThoughtModel");

class ThoughtManager {
  static async getAllThoughtsByUserId(userId) {
    if (!userId) throw new Error("ID is invalid, Please sign in.");

    return await Thought.findAll({
      where: { userId: userId },
      raw: true,
    });
  }

  static async getThoughtById(thoughtId) {
    if (!thoughtId) throw new Error("Thought not found!");

    return Thought.findByPk(thoughtId, { raw: true });
  }

  static async updateThought({ thoughtId, text, userId }) {
    if (!userId) throw new Error("ID is invalid, Please sign in.");
    if (!thoughtId) throw new Error("Thought not found!");
    if (!text || text.trim().length === 0) throw new Error("Text is invalid!");

    return Thought.update({ text }, { where: { id: thoughtId, userId } });
  }

  static async create({ userId, text }) {
    if (!userId) throw new Error("ID is invalid, Please sign in.");
    if (!text || text.trim().length === 0) throw new Error("Text is invalid!");
    console.log("UserId:", userId);
    console.log("text:", text);
    console.log("Erro aqui:", text.trim().length === 0);

    return Thought.create({
      userId,
      text,
    });
  }

  static async remove({ thoughtId, userId }) {
    if (!userId) throw new Error("ID is invalid, Please sign in.");
    if (!thoughtId) throw new Error("Thought not found!");

    return Thought.destroy({
      where: { id: thoughtId, userId },
    });
  }
}

module.exports = ThoughtManager;
