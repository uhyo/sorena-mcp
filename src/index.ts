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
        description: 'Get expert, professional evaluation of implementation plans to ensure they are well-thought-out, feasible, and follow industry best practices',
        inputSchema: {
          type: 'object',
          properties: {
            plan: {
              type: 'string',
              description: 'The implementation plan you want evaluated for feasibility and completeness',
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
          required: ['plan'],
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
        if (typeof args['plan'] !== 'string') {
          throw new Error('Plan argument must be a string');
        }
        
        const plan = args['plan'];
        const context = typeof args['context'] === 'string' ? args['context'] : '';
        const language = typeof args['language'] === 'string' ? args['language'] : 'english';
        
        // Validate language parameter
        if (language !== 'english' && language !== 'japanese') {
          throw new Error('Language must be either "english" or "japanese"');
        }
        
        // Placeholder logic - actual consultant implementation to be added later
        const isJapanese = language === 'japanese';
        const responseText = isJapanese ? 
          `📋 実装プラン評価ツールが呼び出されました
プラン: ${plan}
${context ? `コンテキスト: ${context}\n` : ''}
🤖 これはプレースホルダーの応答です。実際のプラン評価ロジックは後で実装されます。

とりあえず、一般的な評価を提供します：提示されたプランは実行可能に見えます。依存関係とリスクを考慮し、各ステップが明確に定義されていることを確認してください。必要に応じてプランを詳細化することを検討してください。` :
          `📋 Implementation Plan Evaluation Tool Called
Plan: ${plan}
${context ? `Context: ${context}\n` : ''}Language: ${language}

🤖 This is a placeholder response. The actual plan evaluation logic will be implemented later.

For now, here's a generic evaluation: The provided plan appears to be feasible. Consider dependencies and risks, and ensure each step is clearly defined. Consider refining the plan with more detail if needed.`;
        
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