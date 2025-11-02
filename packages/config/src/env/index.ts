import z from 'zod'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.resolve(__dirname, '../../../../.env')})

const envScehma = z.object({
    BACKEND_PORT: z.string().transform(Number),
    JWT_TOKEN_PASS: z.string(),
    HASH_SALT: z.string(),
    OPENROUTER_API_KEY: z.string(),
    E2B_API_KEY: z.string(),
    TEMPLATE_ID: z.string(),
    REDIS_URL: z.string()
})

const env = envScehma.parse(process.env)

export const config = {
    BACKEND_PORT: env.BACKEND_PORT,
    JWT_TOKEN_PASS: env.JWT_TOKEN_PASS,
    HASH_SALT: env.HASH_SALT,
    OPENROUTER_API_KEY: env.OPENROUTER_API_KEY,
    E2B_API_KEY: env.E2B_API_KEY,
    TEMPLATE_ID: env.TEMPLATE_ID,
    REDIS_URL: env.REDIS_URL
}