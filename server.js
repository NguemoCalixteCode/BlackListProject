import chalk from "chalk";
import cookieParser from "cookie-parser";
import express from "express";

import Database from "./database/index.js";
import routerUser from "./routes/userRoutes.js";
import blacklistRoute from "./routes/blacklistRoutes.js";

const log = console.log;
const app = express();

app.use(express.json());
app.use(cookieParser());

Database.connect()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to the database");
  });

app.use("/blacklist", blacklistRoute);
app.use("/user", routerUser);

app.listen(5000, () => {
  log(chalk.green("Server is running on port: 5000"));
});
