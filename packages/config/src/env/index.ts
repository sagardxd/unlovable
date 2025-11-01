import z from 'zod'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.resolve(__dirname, '../../../../.env')})

const envScehma = z.object({
    BACKEND_PORT: z.string().transform(Number)
})

const env = envScehma.parse(process.env)

export const config = {
    BACKEND_PORT: env.BACKEND_PORT
}