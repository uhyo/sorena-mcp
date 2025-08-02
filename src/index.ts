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
        name: 'consult',
        description: 'Get useful advice and guidance on various topics',
        inputSchema: {
          type: 'object',
          properties: {
            question: {
              type: 'string',
              description: 'The question or topic you need advice about',
            },
            context: {
              type: 'string',
              description: 'Additional context or background information (optional)',
            },
            language: {
              type: 'string',
              enum: ['english', 'japanese'],
              description: 'Language for the response (english or japanese)',
            },
          },
          required: ['question'],
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
      case 'consult':
        if (typeof args['question'] !== 'string') {
          throw new Error('Question argument must be a string');
        }
        
        const question = args['question'];
        const context = typeof args['context'] === 'string' ? args['context'] : '';
        const language = typeof args['language'] === 'string' ? args['language'] : 'english';
        
        // Validate language parameter
        if (language !== 'english' && language !== 'japanese') {
          throw new Error('Language must be either "english" or "japanese"');
        }
        
        // Placeholder logic - actual consultant implementation to be added later
        const isJapanese = language === 'japanese';
        const responseText = isJapanese ? 
          `📋 コンサルタントツールが呼び出されました
質問: ${question}
${context ? `コンテキスト: ${context}\n` : ''}
🤖 これはプレースホルダーの応答です。実際のコンサルタントロジックは後で実装されます。

とりあえず、一般的なアドバイスを提供します：複雑な問題はより小さく管理しやすい部分に分解することを検討してください。ベストプラクティスを研究し、ドキュメントを参照し、必要な時は遠慮なく助けを求めてください。` :
          `📋 Consultant Tool Called
Question: ${question}
${context ? `Context: ${context}\n` : ''}Language: ${language}

🤖 This is a placeholder response. The actual consultant logic will be implemented later.

For now, here's some generic advice: Consider breaking down complex problems into smaller, manageable parts. Research best practices, consult documentation, and don't hesitate to ask for help when needed.`;
        
        return {
          content: [
            {
              type: 'text',
              text: responseText,
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
    console.error('📋 Available tools: consult');
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