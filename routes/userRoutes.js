import express from "express";
import { addUser, login, logout } from "../controllers/saveUser.js";
import { validationsUserCreation } from "../validations/index.js";

const routerUser = express.Router();

routerUser.post("/", validationsUserCreation, addUser);

routerUser.post("/login", login);

routerUser.post("/logout", logout);

export default routerUser;
