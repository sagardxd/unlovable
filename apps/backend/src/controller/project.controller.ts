import type { Request, Response } from "express";
import { chatWithProjectSchema, createProjectScehma } from '@repo/types'
import { logger } from "../utils/logger";
import { chatWithProject, createProject } from "../services/project.service";
import { ErrorResponse } from "../utils/api.response";
import { StatusCodes } from "http-status-codes";

export const createProjectController = async (req: Request, res: Response) => {
    const parsed = createProjectScehma.safeParse(req.body)
    const userId = req.user!.id

    try {
        if (parsed.error) return ErrorResponse(res, StatusCodes.NOT_ACCEPTABLE, 'Invalid inputs')

        console.log('creating project');
        const project = await createProject(parsed.data, userId);
        console.log("project id", project);
        return res.json({ msg: "working", userId })

    } catch (error) {
        logger.error('createProjectController', 'error creating new project')
    }
}

export const chatWithProjectController = async (req: Request, res: Response) => {
    const { slug } = req.params
    const parsed = chatWithProjectSchema.safeParse(req.body)
    const userId = req.user!.id

    try {
        if (parsed.error || !slug) return ErrorResponse(res, StatusCodes.NOT_ACCEPTABLE, 'Invalid inputs')

        console.log('creating project');
        const project = await chatWithProject(slug, parsed.data.prompt, userId);
        console.log("project id", project);
        return res.json({ msg: "working", userId })

    } catch (error) {
        logger.error('createProjectController', 'error creating new project')
    }
}
