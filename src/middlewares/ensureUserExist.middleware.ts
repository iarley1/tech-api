import { NextFunction, Request, Response } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors"
import { User } from "../entities/user.entity"

export const ensureUserExists = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOne({
        where: { id: parseInt(request.params.id) },
        withDeleted: true
    })

    if(!findUser){
        throw new AppError("User not found", 404)
    }
   
    return next()
    
}