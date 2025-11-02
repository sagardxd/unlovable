import type { Request, Response } from "express";
import { createProjectScehma } from '@repo/types'
import { logger } from "../utils/logger";
import { createProject } from "../services/project.service";
import { ErrorResponse } from "../utils/api.response";
import { StatusCodes } from "http-status-codes";

export const createProjectController = (req: Request, res: Response) => {
    const parsed = createProjectScehma.safeParse((req.body()))
    const userId = req.user!.id
    
    try {
        if (parsed.error) return ErrorResponse(res, StatusCodes.NOT_ACCEPTABLE, 'Invalid inputs')

        const project = createProject(parsed.data, userId);
        
    } catch (error) {
        logger.error('createProjectController', 'error creating new project')
    }
}