#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
  TextContent,
  CallToolResult,
  ListToolsResult,
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  {
    name: 'sorena-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      logging: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async (): Promise<ListToolsResult> => {
  return {
    tools: [
      {
        name: 'echo',
        description: 'Echo back the provided text',
        inputSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'Text to echo back',
            },
          },
          required: ['text'],
        },
      },
      {
        name: 'greet',
        description: 'Generate a greeting message',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name to greet',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'add',
        description: 'Add two numbers together',
        inputSchema: {
          type: 'object',
          properties: {
            a: {
              type: 'number',
              description: 'First number',
            },
            b: {
              type: 'number',
              description: 'Second number',
            },
          },
          required: ['a', 'b'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request): Promise<CallToolResult> => {
  const { name, arguments: args } = request.params;

  try {
    if (!args) {
      throw new Error('No arguments provided');
    }

    switch (name) {
      case 'echo':
        if (typeof args.text !== 'string') {
          throw new Error('Text argument must be a string');
        }
        
        return {
          content: [
            {
              type: 'text',
              text: `Echo: ${args.text}`,
            } as TextContent,
          ],
        };

      case 'greet':
        if (typeof args.name !== 'string') {
          throw new Error('Name argument must be a string');
        }
        
        return {
          content: [
            {
              type: 'text',
              text: `Hello, ${args.name}! Welcome to Sorena MCP server!`,
            } as TextContent,
          ],
        };

      case 'add':
        if (typeof args.a !== 'number' || typeof args.b !== 'number') {
          throw new Error('Both arguments must be numbers');
        }
        
        const result = args.a + args.b;
        
        return {
          content: [
            {
              type: 'text',
              text: `${args.a} + ${args.b} = ${result}`,
            } as TextContent,
          ],
        };

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Tool execution error for ${name}:`, errorMessage);
    
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
    
    console.error('✅ Sorena MCP server running on stdio');
    console.error('📋 Available tools: echo, greet, add');
    console.error('🔧 Use MCP Inspector to test: npm run inspect');
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('💥 Unhandled server error:', error);
  process.exit(1);
});