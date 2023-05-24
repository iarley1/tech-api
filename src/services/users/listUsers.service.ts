import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { iReturnUserArray, returnUserSchemaArray } from "../../schemas/user.schema";
import { User } from "../../entities/user.entity";

 export const listUsersService = async (userId: number): Promise<iReturnUserArray> => {
    if(!userId){
        throw new AppError("Insufficient permission", 403)
    }

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const listUsers: any = await userRepository.find({
        relations: {
            contacts: true
        }
    })

    const users = returnUserSchemaArray.parse(listUsers)

    return users
}