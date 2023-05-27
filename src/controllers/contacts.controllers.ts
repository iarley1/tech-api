import { Request, Response } from "express";
import { createContactService } from "../services/contacts/createContact.service";
import { listContactsService } from "../services/contacts/listContacts.service";
import { deleteContactService } from "../services/contacts/deleteConteact.service";
import { updateContactService } from "../services/contacts/updateContact.service";

export const createContactController = async (request: Request, response: Response) => {
    const contact = await createContactService(request.body, request.user.id)

    return response.status(201).json(contact)
}

export const listContactController = async (request: Request, response: Response) => {
    const contact = await listContactsService()

    return response.status(201).json(contact)
}

export const deleteContactController = async (request: Request, response: Response) => {
    await deleteContactService(parseInt(request.params.id), request.user.id)

    return response.status(204).send()
}

export const updateContactController = async (request: Request, response: Response) => {
    const contact = await updateContactService(request.body, parseInt(request.params.id), request.user.id)

    return response.status(200).json(contact)
}