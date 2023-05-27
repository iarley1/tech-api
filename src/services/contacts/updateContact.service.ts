import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors"
import { Contact } from "../../entities/contacts.entity"
import { contactUpdateSchema, iReturnUpadateContactSchema, returnUpadateContactSchema } from "../../schemas/contact.schema"

export const updateContactService = async (contactData: any, idContact: number, idUser: number): Promise<iReturnUpadateContactSchema> => {
    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const contact: Contact | null = await contactRepository.findOne({
        where: { id: idContact },
        relations: { user: true }
    })

    if(!contact){
        throw new AppError("Contact not found", 404)
    }

    if(idUser !== contact.user.id){
        throw new AppError("Insufficient permission", 403)
    }

    const validateContactData: any = contactUpdateSchema.parse(contactData)

    const findContacts: Contact[] = await contactRepository.find()

    const emailExists = findContacts.some(element => element.email === validateContactData.email)

    if(emailExists){
        throw new AppError("email already exists", 409)
    }

    const newContact = contactRepository.create({
        ...contact,
        ...validateContactData
    })

    const contactUpdate: any = await contactRepository.save(newContact)

    const newContactUpdate = returnUpadateContactSchema.parse(contactUpdate)

    return newContactUpdate
}