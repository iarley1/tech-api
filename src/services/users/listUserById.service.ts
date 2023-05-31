import { Repository } from "typeorm"
import { iReturnUserContact } from "../../schemas/contact.schema"
import { User } from "../../entities/user.entity"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors"
import { iReturnGetUser, returnUserContactSchema } from "../../schemas/user.schema"

export const listUserByIdService = async (userId: number): Promise<iReturnGetUser> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const listUser: any = await userRepository.findOne({
        where: {
            id: userId
        },
        relations: {
            contacts: true
        }
    })

    const user = returnUserContactSchema.parse(listUser)

    return user
}