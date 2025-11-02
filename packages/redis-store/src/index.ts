import Redis from 'ioredis';
import { RedisKeys } from '@repo/types';
import { getProjectConversationHistory, getProjectSandboxId } from './db';

const client = new Redis();
const TTL_SECONDS = 30 * 60

const makeKey = (projectId: string) => `projectId:${projectId}`;

const set = async (projectId: string, field: RedisKeys, value: unknown) => {
    const key = makeKey(projectId);
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    await client.hset(key, field, data,);
    await client.expire(key, TTL_SECONDS);
};

const get = async (projectId: string, field: RedisKeys) => {
    const key = makeKey(projectId);
    const raw = await client.hget(key, field);

    // TODO: currently not using the db persistent remove it

    // if (!raw) {
    //     if (field === RedisKeys.SANDBOX_ID) {
    //         const sandboxId = await getProjectSandboxId(projectId)
    //         if (sandboxId) set(projectId, RedisKeys.SANDBOX_ID, sandboxId)
    //         return sandboxId;
    //     }
    //     else if (field === RedisKeys.PROJECT_CHAT_HISTORY) {
    //         const chatHistory = await getProjectConversationHistory(projectId);
    //         if (chatHistory) set(projectId, RedisKeys.PROJECT_CHAT_HISTORY, chatHistory)
    //         return chatHistory
    //     }
    // }

    if (!raw) return null;

    try {
        return raw === null ? raw : JSON.parse(raw);
    } catch {
        return raw
    }
};

export const redis = { get, set };
