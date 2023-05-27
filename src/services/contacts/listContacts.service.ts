import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { iReturnContactSchemaArray, returnContactSchemaArray } from "../../schemas/contact.schema";

 export const listContactsService = async (): Promise<iReturnContactSchemaArray> => {
    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const listContact: any = await contactRepository.createQueryBuilder("contacts")
    .select(["contacts", "user.id"])
    .innerJoin("contacts.user", "user")
    .getMany()

    return listContact
}