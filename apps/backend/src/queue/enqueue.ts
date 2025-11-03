import { QueueJobType, QueueType } from '@repo/types';
import { Queue } from 'bullmq';
import { logger } from '../utils/logger';

const projectQueue = new Queue(QueueType.PROJECT, {
    connection: { host: "localhost", port: 6379 }
});

export const addToQueue = async(data: {projectId: string, prompt: string}, jobType: QueueJobType) => {
    try {
        await projectQueue.add(jobType, data);
    } catch (error) {
        logger.error("addToQueue", "error adding to queue", error)
    }
}