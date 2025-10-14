import { z } from "zod";
import type { Tool} from "ai";

export const createFile: Tool<{
    location: string;
}> = {
    description: 'Create a file at a certain directory',
    inputSchema: z.object({
        location: z
            .string()
            .describe('Relative path to the file')
    }),
    execute: async ({ location }: { location: string }) => {
        return `File created`;
    },
};

export const updateFile: Tool<{
    location: string;
    content: string;    
}> = {
    description: 'Update a file at a certain directory',
    inputSchema: z.object({
        location: z.string().describe('Relative path to the file'),
        content: z.string().describe('Content of the file'),
    }),
    execute: async ({ location, content }: { location: string, content: string }) => {
        return `File updated`;
    },
};

export const deleteFile: Tool<{
    location: string;
}> = {
    description: 'Delete a file at a certain directory',
    inputSchema: z.object({
        location: z.string().describe('Relative path to the file'),
    }),
    execute: async ({ location }: { location: string }) => {
        return `File deleted`;
    },
};

export const readFile: Tool<{
    location: string;
}> = {
    description: 'Read a file at a certain directory',
    inputSchema: z.object({
        location: z.string().describe('Relative path to the file'),
    }),
    execute: async ({ location }: { location: string }) => {
        return `File Contents`;
    },
};
