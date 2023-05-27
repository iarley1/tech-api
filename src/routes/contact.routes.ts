import { Router } from "express"
import { ensureTokenIsValid } from "../middlewares/ensureTokesIsValid.middleware"
import { createContactController, deleteContactController, listContactController, updateContactController } from "../controllers/contacts.controllers"

export const contactRoutes: Router = Router()

contactRoutes.post("", ensureTokenIsValid, createContactController)
contactRoutes.get("", ensureTokenIsValid, listContactController)
contactRoutes.patch("/:id", ensureTokenIsValid, updateContactController)
contactRoutes.delete("/:id", ensureTokenIsValid, deleteContactController)