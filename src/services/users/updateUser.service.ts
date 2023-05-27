import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { iReturnUser, returnUserSchema, userUpdateSchema } from "../../schemas/user.schema"


export const updateUserService = async (userData: any, idUser: number, idUserAuth: number): Promise<iReturnUser> => {
    if(idUser !== idUserAuth){
        throw new AppError("Insufficient permission", 403)
    }

    const validateUserData: any = userUpdateSchema.parse(userData)

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const findUsers: User[] = await userRepository.find()

    const emailExists = findUsers.some(element => element.email === validateUserData.email)

    if(emailExists){
        throw new AppError("email already exists", 409)
    }

    const oldUser: User | null = await userRepository.findOneBy({
        id: idUser
    })

    const user = userRepository.create({
        ...oldUser,
        ...validateUserData
    })

    const userUpdate: any = await userRepository.save(user)

    const newUserUpdate = returnUserSchema.parse(userUpdate)

    return newUserUpdate
}