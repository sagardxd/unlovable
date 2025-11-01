import type { Request, Response } from "express"
import { createUser, userExsists } from "../services/user.services"
import { logger } from "../utils/logger";
import { ErrorResponse, ServerErrorResponse } from "../utils/api.response";
import { jwtSign } from "../utils/jwt";
import { StatusCodes } from "http-status-codes";
import { isHashedPassMatch } from "../utils/hashPass";

export const signUpController = async (req: Request, res: Response) => {
    const { email, password } = req.body()
    try {
        const user = await createUser(email, password);
        if (!user) return ErrorResponse(res, StatusCodes.UNAUTHORIZED, 'Error creating user')

        const token = jwtSign({ email: user.email, id: user.id })
        return res.status(StatusCodes.OK).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    token
                }
            }
        })
    } catch (error) {
        logger.error('signUpController', 'error signing up', error)
        return ServerErrorResponse(res, 'Error signing up user')
    }
}

export const signInController = async (req: Request, res: Response) => {
    const { email, password } = req.body()
    try {
        const alreadyUser = await userExsists(email);
        if (!alreadyUser) return ErrorResponse(res, StatusCodes.NOT_FOUND, 'User not found')

        const isMatch = await isHashedPassMatch(password, alreadyUser.password)
        if (!isMatch) return ErrorResponse(res, StatusCodes.UNAUTHORIZED, 'Wrong password')

        const token = jwtSign({ email: alreadyUser.email, id: alreadyUser.id })
        
        return res.status(StatusCodes.OK).json({
            success: true,
            data: {
                user: {
                    id: alreadyUser.id,
                    email: alreadyUser.email,
                    token
                }
            }
        })
    } catch (error) {
        logger.error('signInController', 'error signing in', error)
        return ServerErrorResponse(res, 'Error signing in user')
    }
}