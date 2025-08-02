import type { Tool } from '@modelcontextprotocol/sdk/types.js';

export const consultToolDefinition: Tool = {
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
};