import { Request, Response } from "express";
import { loginService } from "../services/users/loginUser.service";

export const loginController = async (request: Request, response: Response): Promise<Response> => {
    const token = await loginService(request.body)

    return response.status(200).json(token)
}