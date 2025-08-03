import type { Tool } from '@modelcontextprotocol/sdk/types.js';

export const consultToolDefinition: Tool = {
  name: 'sanity_check',
  description: 'Quick sanity check for any code, approach, or technical decision before presenting it to the user. Use this to validate your thinking, catch potential issues, and build confidence in your solutions. Perfect for: implementation plans, architectural choices, code approaches, or any "does this make sense?" moments.',
  inputSchema: {
    type: 'object',
    properties: {
      plan: {
        type: 'string',
        description: 'The approach, solution, or plan you want to sanity check before showing the user. Could be code, architecture, implementation steps, or any technical decision.',
      },
      context: {
        type: 'string',
        description: 'Any extra details that might be helpful - what you\'re working on, constraints, or just background info. Optional but helpful!',
      },
      language: {
        type: 'string',
        enum: ['english', 'japanese'],
        description: 'Language for the expert response',
      },
    },
    required: ['plan'],
  },
};