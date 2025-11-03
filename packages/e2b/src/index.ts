import { Sandbox } from '@e2b/code-interpreter'
import { config } from '@repo/config'
import { redis } from '@repo/redis-store'
import { RedisKeys } from '@repo/types'
import axios from 'axios'

export class SandboxManager {
    private sandbox: Sandbox | null = null
    private sandboxExpoUrl: string | null = null

    public init = async (projectId: string) => {
        const sandboxId = await redis.get(projectId, RedisKeys.SANDBOX_ID)

        if (sandboxId) {
            console.log('sandbox is already live');
            this.sandbox = await Sandbox.connect(sandboxId);
            this.sandboxExpoUrl = await redis.get(projectId, RedisKeys.SANDBOX_EXPO_URL)

            return this.sandboxExpoUrl
        }

        this.sandbox = await Sandbox.create(config.TEMPLATE_ID, { apiKey: config.E2B_API_KEY, timeoutMs: 30 * 60 * 1000, allowInternetAccess: true });
        this.sandboxExpoUrl = await this.fetchSandboxUrl()

        await redis.set(projectId, RedisKeys.SANDBOX_ID, this.sandbox.sandboxId)
        await redis.set(projectId, RedisKeys.SANDBOX_EXPO_URL, this.sandboxExpoUrl)
        return this.sandboxExpoUrl
    }

    private ensureSandbox = () => {
        if (!this.sandbox) throw new Error("Sandbox not initialized. Call init() first.");
    }

    public fetchSandboxUrl = async () => {
        try {
            const host = `https://8081-${this.sandbox?.sandboxId}.e2b.app`
            const response = await axios.get(host);
            const url = response.data.extra.expoGo.debuggerHost;
            return url;
        } catch (error) {
            console.log('getSandboxUrl, error getting url', error);
        }
    }

    public getChatHistory = async (projectId: string) => {
        const history = await redis.get(projectId, RedisKeys.PROJECT_CHAT_HISTORY);
        return history || [];
    }

    public writeFile = async (path: string, content: string) => {
        this.ensureSandbox();
        await this.sandbox!.files.write(path, content)
    }

    public readFile = async (path: string) => {
        this.ensureSandbox();
        await this.sandbox!.files.read(path);
    }

    public cleanup = async () => {
        if (this.sandbox) {
            await this.sandbox.kill();
            console.log("Sandbox closed.");
            this.sandbox = null;
        }
    };

}