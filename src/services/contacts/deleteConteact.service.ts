import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors"
import { Contact } from "../../entities/contacts.entity"

export const deleteContactService = async (idContact: number, idAuthUser: number): Promise<void> => {
    const ContactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const contact: Contact | null = await ContactRepository.findOne({
        where: { id: idContact },
        relations: {
            user: true
        }
    })

    if(!contact){
        throw new AppError("Contact not found", 404)
    }

    if(contact?.user.id !== idAuthUser){
        throw new AppError("Insufficient permission", 403)
    }

    await ContactRepository.delete(idContact)
}