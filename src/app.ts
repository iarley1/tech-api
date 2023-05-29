import "reflect-metadata"
import "express-async-errors"
import express, { Application } from "express";
import { userRoutes } from "./routes/user.routes";
import { contactRoutes } from "./routes/contact.routes";
import { handleErros } from "./errors";
import { loginRoutes } from "./routes/login.routes";

export const app: Application = express()
const cors = require("cors")

app.use(cors())

app.use(express.json())

app.use("/users", userRoutes)
app.use("/login", loginRoutes)
app.use("/contacts", contactRoutes)

app.use(handleErros)