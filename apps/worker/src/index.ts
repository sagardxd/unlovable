import { Worker } from "bullmq";
import { QueueType} from '@repo/types'
import { SandboxManager } from "@repo/e2b";

const connection = { host: "localhost", port: 6379 };

const myWorker = new Worker(
 QueueType.PROJECT,

  async job => {
    console.log("Processing job:", job.name, job.data);

    const sandbox = new SandboxManager()
    const sandboxUrl =  await sandbox.init(job.data.projectId)
    console.log("sandboxUrl", sandboxUrl);
  },
  { connection }
);

myWorker.on("completed", job => {
  console.log(`Job ${job.id} completed`);
});
