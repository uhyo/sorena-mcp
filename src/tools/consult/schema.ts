import type { Tool } from '@modelcontextprotocol/sdk/types.js';

export const consultToolDefinition: Tool = {
  name: 'consult',
  description: 'Consult with a senior expert when you need validation, face uncertainty, or want a confidence boost. Perfect for: complex architectural decisions, unfamiliar territory, implementation doubts, or when you want professional reassurance before proceeding with important changes',
  inputSchema: {
    type: 'object',
    properties: {
      plan: {
        type: 'string',
        description: 'Your implementation plan, architectural decision, or approach you want expert validation on. Include specifics about what you\'re building, technologies involved, and any concerns you have',
      },
      context: {
        type: 'string',
        description: 'Additional context that might influence the expert opinion: project constraints, team experience, timeline, existing systems, or specific challenges you\'re facing',
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