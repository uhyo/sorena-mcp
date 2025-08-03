#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import type {
  TextContent,
  CallToolResult,
  ListToolsResult,
} from '@modelcontextprotocol/sdk/types.js';
import { getToolDefinitions, handleToolCall } from './tools/index.js';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Read version from package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const VERSION = packageJson.version;

// Check for --version command line argument
if (process.argv.includes('--version') || process.argv.includes('-v')) {
  console.log(VERSION);
  process.exit(0);
}

const server = new Server(
  {
    name: 'sorena-mcp',
    title: 'Sorena: Your Friendly Coding Buddy',
    version: VERSION,
  },
  {
    capabilities: {
      tools: {},
      logging: {},
    },
    instructions: 'Your friendly coding buddy for quick expert opinions! **IMPORTANT WORKFLOW**: Always use `sanity_check` to validate your approach before presenting any implementation plan or technical decision to the user. This ensures quality and builds confidence. Think of it as having a supportive senior developer review your thinking first. No question too small, no idea too simple!',
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async (): Promise<ListToolsResult> => {
  return getToolDefinitions();
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request): Promise<CallToolResult> => {
  try {
    return handleToolCall(request.params);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Tool execution error for ${request.params.name}:`, errorMessage);
    
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${errorMessage}`,
        } as TextContent,
      ],
      isError: true,
    };
  }
});

async function main(): Promise<void> {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    console.error('✅ Sorena: Your Friendly Coding Buddy running on stdio');
    console.error('💬 Available tools: sanity_check (validate your approach before presenting to user)');
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('💥 Unhandled server error:', error);
  process.exit(1);
});