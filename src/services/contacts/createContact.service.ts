import { Repository } from "typeorm"
import { AppDataSource }  from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { contactSchema, iContact, iReturnContact, returnContactSchema } from "../../schemas/contact.schema"
import { Contact } from "../../entities/contacts.entity"

export const createContactService = async (userData: any, userId: number): Promise<iReturnContact> => {
    const validateContactData: iContact = contactSchema.parse(userData)

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const emailExists: Contact | null = await contactRepository.findOneBy({
        email: validateContactData.email
    })

    if(emailExists){
        throw new AppError("Email already exists", 409)
    }

    const user: User | null = await userRepository.findOneBy({
        id: userId
    })

    const contact: Contact = contactRepository.create(validateContactData)
    contact.user = user!

    await contactRepository.save(contact)

    const newContact: iReturnContact = {
        id: contact.id,
        name: contact.name,
        email: contact.email,
	    phoneNumber: contact.phoneNumber,
	    createdAt: contact.createdAt,
        userId: contact.user.id
    }

    return newContact
}