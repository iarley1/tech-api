import { Request, Response } from "express";
import { createUserService } from "../services/users/createUser.service";
import { listUsersService } from "../services/users/listUsers.service";
import { iReturnUser } from "../schemas/user.schema";
import { deleteUserService } from "../services/users/deleteUser.service";

export const createUserController = async (request: Request, response: Response) => {
    const user: iReturnUser = await createUserService(request.body)

    return response.status(201).json(user)
}

export const listUsersController = async (request: Request, response: Response) => {
    const listUsers = await listUsersService(request.user.id)

    return response.status(200).json(listUsers)
}

/* const updateUserController = async (request: Request, response: Response) => {
    const updatedUser = await updateUserService(request.body, parseInt(request.params.id), request.user.admin, request.user.id)

    return response.status(200).json(updatedUser)
} */

export const deleteUserController = async (request: Request, response: Response) => {
    await deleteUserService(request.user.id)

    return response.status(204).send()
} 