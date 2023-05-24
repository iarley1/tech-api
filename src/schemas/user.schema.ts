import { z } from "zod"
import { returnContactSchemaArray } from "./contact.schema"

export const userSchema = z.object({
    name: z.string().max(45),
    email: z.string().email().max(45),
    phoneNumber: z.string().max(45),
    password: z.string().max(120)
})

export const returnUserSchema = userSchema.extend({
    id: z.number(),
    createdAt: z.string().or(z.date()),
    deletedAt: z.string().or(z.date()).nullable()
}).omit({ password: true })

export const returnUserContactSchema = returnUserSchema.extend({
    contacts: returnContactSchemaArray
})

export const returnUserSchemaArray = returnUserContactSchema.array()

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type iUser = z.infer<typeof userSchema>
export type iReturnUser = z.infer<typeof returnUserSchema>
export type iReturnUserArray = z.infer<typeof returnUserSchemaArray>
export type iLogin = z.infer<typeof loginSchema>