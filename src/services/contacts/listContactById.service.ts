import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Contact } from "../../entities/contacts.entity";
import { iReturnContactSchemaArray } from "../../schemas/contact.schema";

 export const listContactsByIdService = async (userId: number): Promise<iReturnContactSchemaArray> => {
    if(!userId){
        throw new AppError("Insufficient permission", 403)
    }

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const listContact: any = await contactRepository.createQueryBuilder("contacts")
    .select(["contacts", "user.id"])
    .innerJoin("contacts.user", "user")
    .getMany()

    return listContact
}