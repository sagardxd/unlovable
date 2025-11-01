import z from 'zod'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.resolve(__dirname, '../../../../.env')})

const envScehma = z.object({
    BACKEND_PORT: z.string().transform(Number),
    JWT_TOKEN_PASS: z.string(),
    HASH_SALT: z.string()
})

const env = envScehma.parse(process.env)

export const config = {
    BACKEND_PORT: env.BACKEND_PORT,
    JWT_TOKEN_PASS: env.JWT_TOKEN_PASS,
    HASH_SALT: env.HASH_SALT
}