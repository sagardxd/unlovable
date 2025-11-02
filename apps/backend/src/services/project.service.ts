import { prisma } from "@repo/db"
import { logger } from "../utils/logger"
import type { CreateProjectType } from "@repo/types"

export const createProject = async (data: CreateProjectType, userId: string) => {
    try {
        const project = await prisma.project.create({
            data: {
                slug: data.slug,
                userId
            }
        })

        const converstation = await prisma.conversation.create({
            data: { projectId: project.id }
        })

        prisma.message.create({
            data: {
                content: data.prompt,
                role: "User",
                conversationId: converstation.id
            }
        })

        return project.id;
    } catch (error) {
        logger.error('createProject', 'error creating project', error)
        return null
    }
}