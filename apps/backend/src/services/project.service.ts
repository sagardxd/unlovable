import { prisma } from "@repo/db"
import { logger } from "../utils/logger"
import { QueueJobType, type CreateProjectType } from "@repo/types"
import { addToQueue } from "../queue/enqueue"

export const createProject = async (data: CreateProjectType, userId: string) => {
    console.log('creating project');
    try {
        const project = await prisma.project.create({
            data: {
                slug: data.slug,
                userId,
            }
        })

        const converstation = await prisma.conversation.create({
            data: { projectId: project.id }
        })

        await prisma.message.create({
            data: {
                content: data.prompt,
                role: "User",
                conversationId: converstation.id
            }
        })

        console.log('adding to queue');
        await addToQueue(
            {
                projectId: project.id,
                prompt: data.prompt
            },
            QueueJobType.PROJECT_CREATE
        )

        return project.id;
    } catch (error) {
        logger.error('createProject', 'error creating project', error)
        return null
    }
}

export const chatWithProject = async (slug: string, prompt: string, userId: string) => {
    try {
        const project = await prisma.project.findUnique({
            where: {
                slug: slug,
                userId,
            }
        })

        if (!project) return null;

        const conversation = await prisma.conversation.findUnique({
            where: { projectId: project.id }
        })

        if (!conversation) return null;

        const message = await prisma.message.create({
            data: {
                content: prompt,
                role: "User",
                conversationId: conversation.id
            }
        })

        await addToQueue(
            {
                projectId: project.id,
                prompt: prompt
            },
            QueueJobType.PROJECT_CHAT
        )


    } catch (error) {
        logger.error('chatWithProject', 'error chating with project', error)
        return null
    }
}