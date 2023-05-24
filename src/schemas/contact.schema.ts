import { z } from "zod"
import { returnUserSchema } from "./user.schema"

export const contactSchema = z.object({
    name: z.string().max(45),
    email: z.string().email().max(45),
    phoneNumber: z.string().max(45),
})

export const returnContactSchema = contactSchema.extend({
    id: z.number(),
    createdAt: z.string().or(z.date()),
    user: returnUserSchema
})

export const returnContactSchemaArray = returnContactSchema.omit({ user: true }).array()

export type iContact = z.infer<typeof contactSchema>
export type iReturnContact = z.infer<typeof returnContactSchema>
export type iReturnUserContact = z.infer<typeof returnContactSchemaArray>