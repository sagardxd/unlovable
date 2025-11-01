import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const ServerErrorResponse = (res: Response, errorMsg: string) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: errorMsg
    })
}

export const ErrorResponse = (res: Response, statusCode: number,  errorMsg: string) => {
    return res.status(statusCode).json({
        success: false,
        message: errorMsg
    })
}
