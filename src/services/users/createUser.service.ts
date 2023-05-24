import { Repository } from "typeorm"
import { AppDataSource }  from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { iReturnUser, iUser, returnUserSchema, userSchema } from "../../schemas/user.schema"

export const createUserService = async (userData: any): Promise<iReturnUser> => {
    const validateUserData: iUser = userSchema.parse(userData)

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const emailExists = await userRepository.findOneBy({
        email: validateUserData.email
    })

    if(emailExists){
        throw new AppError("Email already exists", 409)
    }

    const user = userRepository.create(validateUserData)

    await userRepository.save(user)

    const newUser = returnUserSchema.parse(user)

    return newUser
}