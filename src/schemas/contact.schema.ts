import { z } from "zod"

export const contactSchema = z.object({
    name: z.string().max(45),
    email: z.string().email().max(45),
    phoneNumber: z.string().max(45),
})

export const returnContactSchema = contactSchema.extend({
    id: z.number(),
    createdAt: z.string().or(z.date()),
    userId: z.number()
})

export const returnContactSchemaArray = returnContactSchema.omit({ userId: true }).array()

export const contactUpdateSchema = z.object({
    name: z.string().max(45).optional().nullable(),
    email: z.string().email().max(45).optional().nullable(),
    phoneNumber: z.string().max(45).optional().nullable()
})

export const returnUpadateContactSchema = returnContactSchema.extend({}).omit({ userId: true })


export type iContact = z.infer<typeof contactSchema>
export type iReturnContact = z.infer<typeof returnContactSchema>
export type iReturnUserContact = z.infer<typeof returnContactSchemaArray>
export type iReturnContactSchemaArray = z.infer<typeof returnContactSchemaArray>
export type iReturnUpadateContactSchema = z.infer<typeof returnUpadateContactSchema>