import type { Request, Response } from "express";
import { logger } from "../utils/logger";

export const createProjectController = (req: Request, res: Response) => {
    
    try {
        
    } catch (error) {
        logger.error('createProjectController', 'error creating new project')
    }
}