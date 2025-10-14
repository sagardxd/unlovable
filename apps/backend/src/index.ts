import express from "express";
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';
import { SYSTEM_PROMPT } from "./utils/system-prompt";
import { createFile, updateFile, deleteFile, readFile } from "./tools";
import dotenv from 'dotenv'
import { Sandbox } from '@e2b/code-interpreter'
dotenv.config();

console.log(process.env.E2B_API_KEY);

const app = express();

app.use(express.json());

app.post("/prompt", async (req, res) => {
    const { prompt } = req.body;    

    const sandbox = await Sandbox.create("2ol5qvsyjsi6y1xd0462", {apiKey: process.env.E2B_API_KEY})
    const host = sandbox.getHost(5173)
    console.log('host', host);

    // TODO:  create sandbox for user

    const openrouter = createOpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY,
    });
    const response = streamText({
        model: openrouter("gpt-4o-mini"),
        tools: {
            createFile: createFile,
            updateFile: updateFile,
            deleteFile: deleteFile,
            readFile: readFile
        },
        messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT
            },
            {
                role: "user",
                content: prompt
            }
        ]
    });

    response.pipeTextStreamToResponse(res);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});