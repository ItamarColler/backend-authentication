import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";

const app = express();

const sessionOptions = {
  secret: process.env.SECRET_SESSION ?? "default_secret",
  saveUninitialized: true,
  resave: true,
  cookie: { secure: false },
};

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(sessionOptions));

// TODO: move to root route
app.get("/", (req, res) => {
  res.json({ hello: "hello world" });
});
// TODO: define use cases to error handling
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).send(err);
});

export default app;
