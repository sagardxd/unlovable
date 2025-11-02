import { prisma } from "@repo/db"

export const getProjectSandboxId = async (projectId: string) => {
    try {
        const data = await prisma.project.findUnique({
            where: { id: projectId }
        })
        return data;
    } catch (error) {
        console.log(`getProjectSandboxId | error: ${error}}`)
        return null;
    }
}

export const getProjectConversationHistory = async (projectId: string) => {
    try {
        const messages = await prisma.message.findMany({
            where: {conversation: { projectId }},
            orderBy: { createdAt: 'desc'}
        })
        return messages ?? [];
    } catch (error) {
        console.log(`getProjectConversationHistory | error: ${error}}`)
        return [];
    }
}