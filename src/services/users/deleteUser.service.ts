import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors"
import { User } from "../../entities/user.entity"

const deleteUserService = async (idUser: number): Promise<void> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        id: idUser
    })

    await userRepository.softRemove(user!)
}

export { deleteUserService }