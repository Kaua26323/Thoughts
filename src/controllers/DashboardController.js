const ThoughtManager = require("../models/thoughtModels/ThoughtManager");

class DashboardController {
  async dashboard(req, res) {
    try {
      const userId = req.session.user.id;
      const thoughts = await ThoughtManager.getAllThoughtsByUserId(userId);

      res.render("dashboard/dashboard.handlebars", {
        thoughts,
        emptyThoughts: thoughts.length === 0,
      });
    } catch (err) {
      console.error("Critical Error:", err);
      req.flash("error", err.message);
      return res.redirect("/dashboard");
    }
  }

  createThoughtPage(req, res) {
    res.render("dashboard/create.handlebars");
  }

  async createThought(req, res) {
    if (!req.body) return res.status(400).send("Bad Request!");
    try {
      const data = {
        userId: req.session.user.id,
        text: req.body.text,
      };
      console.log(data);
      const newThought = await ThoughtManager.create(data);
      console.log("New Thought:", newThought);

      req.flash("success", "Thought was created successfully!");
      req.session.save(() => {
        res.redirect("/dashboard/create");
      });
    } catch (err) {
      console.error("Critical Error:", err);
      req.flash("error", err.message);
      return res.redirect("/dashboard/create");
    }
  }

  async getThought(req, res) {
    if (!req.params.id) return res.status(400).send("Bad Request!");
    try {
      const thoughtId = req.params.id;
      const thought = await ThoughtManager.getThoughtById(thoughtId);

      console.log("thought:", thought);

      if (!thought) {
        req.flash("error", "Thought not found!");
        return res.redirect("/dashboard");
      }

      req.flash("success", "Update the thought!");
      req.session.save(() => {
        res.render("dashboard/edit.handlebars", {
          thought: thought,
        });
      });
    } catch (err) {
      console.error("Critical Error:", err);
      req.flash("error", err.message);
      return res.redirect("/dashboard");
    }
  }

  async updateThought(req, res) {
    if (!req.body) return res.status(400).send("Bad Request!");

    try {
      const data = {
        thoughtId: req.body.thoughtId,
        text: req.body.text,
        userId: req.session.user.id,
      };

      const n = await ThoughtManager.updateThought(data);

      console.log("Tarefa atualizada com successo:", n);
      req.flash("success", "Thought was updeted!");
      req.session.save(() => {
        res.redirect("/dashboard");
      });
    } catch (err) {
      console.error("Critical Error:", err);
      req.flash("error", err.message);
      return res.redirect(`/dashboard/edit/${req.body.thoughtId}`);
    }
  }

  async removeThought(req, res) {
    if (!req.body) return res.status(400).send("Bad Request!");
    try {
      const data = {
        thoughtId: req.body.id,
        userId: req.session.user.id,
      };

      const removeThought = await ThoughtManager.remove(data);

      req.flash("success", "Thought was deleted successfully!");
      console.log("removeThought:", removeThought);
      req.session.save(() => {
        res.redirect("/dashboard");
      });
    } catch (err) {
      console.error("Critical Error:", err);
      req.flash("error", err.message);
      return res.redirect("/dashboard");
    }
  }
}
module.exports = new DashboardController();
