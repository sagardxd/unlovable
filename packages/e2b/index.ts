import { Sandbox } from '@e2b/code-interpreter'
import { config } from '@repo/config'
import { redis } from './src/redis/index'

export class SandboxManager {
    private sandbox: Sandbox | null = null
    private sandboxExpoUrl: string | null = null

    public init = async (userId: string) => {
        const sandboxId = await redis.get(userId)

        if (sandboxId) {
            this.sandbox = await Sandbox.connect(sandboxId);
            return this.sandbox.sandboxId
        }

        this.sandbox = await Sandbox.create({ apiKey: config.E2B_API_KEY, timeoutMs: 30 * 60 * 1000, allowInternetAccess: true });
        await redis.set(userId, this.sandbox.sandboxId)
        return this.sandbox.sandboxId
    }

    private ensureSandbox = () => {
        if (!this.sandbox) throw new Error("Sandbox not initialized. Call init() first.");
    }

    public runExpo = async () => {
        let tunnelUrl = "";
        await this.sandbox!.commands.run("npx expo start --tunnel", {
            background: true,
            onStdout: (data) => {
                const line = data.toString();

                // Look for the exp:// URL
                if (line.includes("Metro waiting on")) {
                    const parts = line.split(" ");
                    const url = parts.find(p => p.startsWith("exp://"));
                    if (url) {
                        tunnelUrl = url;
                        this.sandboxExpoUrl = tunnelUrl
                        console.log("Tunnel URL:", tunnelUrl);
                    }
                }
            },
            onStderr: (data) => {
                console.log('errors are');
                console.log(data.toString());
            },
        })
        return this.sandboxExpoUrl;
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