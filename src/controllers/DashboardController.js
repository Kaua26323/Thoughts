const { ThoughtModel } = require("../models/ThoughtModel");

class DashboardController {
  async dashboard(req, res) {
    const data = {
      text: null,
      userId: req.session.user.id,
      isPOST: false,
    };
    try {
      const thought = new ThoughtModel(data);
      await thought.getThoughts();

      console.log("My thought:", thought);
      console.log("inst thought:", thought.thoughts);

      res.render("dashboard/dashboard.handlebars", {
        thoughts: thought.thoughts,
      });
    } catch (err) {
      console.error("Critical Error:", err);
      req.flash("error", "Unexpected error.");
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
        text: req.body.text,
        userId: req.session.user.id,
        isPOST: true,
      };

      const thoughtModel = new ThoughtModel(data);
      await thoughtModel.register();

      if (thoughtModel.errors.length > 0) {
        console.log("thoughtModel.errors:", thoughtModel.errors);
        req.flash("error", thoughtModel.errors);
        return res.redirect("/dashboard/create");
      }

      req.flash("success", thoughtModel.success);
      console.log("thoughtModel.success:", thoughtModel.success);
      req.session.save(() => {
        res.redirect("/dashboard/create");
      });
    } catch (err) {
      console.error("Critical Error:", err);
      req.flash("error", "Unexpected error.");
      return res.redirect("/dashboard/create");
    }
  }
}
module.exports = new DashboardController();
