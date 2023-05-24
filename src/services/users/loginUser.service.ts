import { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors"
import "dotenv/config"
import { Repository } from "typeorm"
import { iLogin, loginSchema } from "../../schemas/user.schema"
import { User } from "../../entities/user.entity"

export const loginService = async (loginData: iLogin): Promise<string> => {
    const validateLoginData: iLogin = loginSchema.parse(loginData)

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({
        email: validateLoginData.email
    })

    if(!user){
        throw new AppError("Invalid credentials", 401)
    }

    const validatePassword: boolean = await compare(validateLoginData.password, user.password)

    if(!validatePassword){
        throw new AppError("Invalid credentials", 401)
    }

    const token: string = jwt.sign(
        {
            userId: user.id
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: process.env.EXPIRES_IN,
            subject: String(user.id)
        }
    )

    return token
}