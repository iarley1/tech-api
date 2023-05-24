import { Router } from "express"
import { createUserController, deleteUserController, listUsersController } from "../controllers/users.controllers"
import { ensureTokenIsValid } from "../middlewares/ensureTokesIsValid.middleware"

export const userRoutes: Router = Router()

userRoutes.post("", createUserController)
userRoutes.get("", ensureTokenIsValid, listUsersController)
userRoutes.patch("/:id", )
userRoutes.delete("", ensureTokenIsValid, deleteUserController)