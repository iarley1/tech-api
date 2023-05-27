import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors"
import { User } from "../../entities/user.entity"

export const deleteUserService = async (idUser: number, idRequest: number): Promise<void> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: { id: idRequest },
        withDeleted: true
    })

    if(idUser !== idRequest){
        throw new AppError("Insufficient permission", 403)
    }

    if(user?.deletedAt){
        throw new AppError("user has been deleted", 400)
    }

    await userRepository.softRemove(user!)
}