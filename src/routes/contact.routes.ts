import { Router } from "express"
import { ensureTokenIsValid } from "../middlewares/ensureTokesIsValid.middleware"
import { createContactController } from "../controllers/contacts.controllers"

export const contactRoutes: Router = Router()

contactRoutes.post("", ensureTokenIsValid, createContactController)
contactRoutes.get("", )
contactRoutes.patch("/:id", )
contactRoutes.delete("/:id", )