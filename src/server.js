require("dotenv").config();
const path = require("path");
const conn = require("./db/conn");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const { engine } = require("express-handlebars");
const { globalMiddleware } = require("./middlewares/globalsMiddlewares");

const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.PORT || 3000;

const Tought = require("./models/Tought");
const { User } = require("./models/UserModel");

app.use(
  session({
    name: "session",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: path.join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  }),
);

app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve("src/public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve("src/views"));

// Global middlewares
app.use(globalMiddleware);

// Routes
app.use(homeRoutes);
app.use(authRoutes);

conn
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running in http://localhost:${port}`);
    });
  })
  .catch((err) => console.error("!!!Error!!!:", err));
