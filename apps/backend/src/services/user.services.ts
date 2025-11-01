import {prisma} from '@repo/db'
import { logger } from '../utils/logger'

export const userExsists = async(email: string) => {
    try {   
        const user = await prisma.user.findUnique({
            where: {email: email}
        })
        if (user) return user
        
        return null
    } catch (error) {
        logger.error('userExsists', 'error finding if user exsists', error)
        return null
    }
}


export const createUser = async(email: string, password: string) => {
    try {   
        const user = await prisma.user.create({
            data: {
                email,
                password,
            }
        })
        if (user) return user
        return null
    } catch (error) {
        logger.error('createUser', 'error creating user', error)
        return null
    }
}
