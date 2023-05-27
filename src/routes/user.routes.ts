import { Router } from "express"
import { createUserController, deleteUserController, listUsersController, updateUserController } from "../controllers/users.controllers"
import { ensureTokenIsValid } from "../middlewares/ensureTokesIsValid.middleware"
import { ensureUserExists } from "../middlewares/ensureUserExist.middleware"

export const userRoutes: Router = Router()

userRoutes.post("", createUserController)
userRoutes.get("", ensureTokenIsValid, listUsersController)
userRoutes.patch("/:id",ensureTokenIsValid, ensureUserExists, updateUserController)
userRoutes.delete("/:id", ensureUserExists, ensureTokenIsValid, deleteUserController)