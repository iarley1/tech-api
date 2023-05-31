import { Request, Response } from "express";
import { createUserService } from "../services/users/createUser.service";
import { listUsersService } from "../services/users/listUsers.service";
import { iReturnGetUser, iReturnUser } from "../schemas/user.schema";
import { deleteUserService } from "../services/users/deleteUser.service";
import { updateUserService } from "../services/users/updateUser.service";
import { listUserByIdService } from "../services/users/listUserById.service";

export const createUserController = async (request: Request, response: Response) => {
    const user: iReturnUser = await createUserService(request.body)

    return response.status(201).json(user)
}

export const listUsersController = async (request: Request, response: Response) => {
    const listUsers = await listUsersService(request.user.id)

    return response.status(200).json(listUsers)
}

export const listUserByIdController = async (request: Request, response: Response) => {
    const user = await listUserByIdService(parseInt(request.user.id))

    return response.status(200).json(user)
}

export const updateUserController = async (request: Request, response: Response) => {
    const updatedUser = await updateUserService(request.body, parseInt(request.params.id), request.user.id)

    return response.status(200).json(updatedUser)
}

export const deleteUserController = async (request: Request, response: Response) => {
    await deleteUserService(request.user.id, parseInt(request.params.id))

    return response.status(204).send()
} 