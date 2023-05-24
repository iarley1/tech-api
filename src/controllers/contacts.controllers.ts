import { Request, Response } from "express";
import { createContactService } from "../services/contacts/createContact.service";

export const createContactController = async (request: Request, response: Response) => {
    const contact = await createContactService(request.body, request.user.id)

    return response.status(201).json(contact)
}