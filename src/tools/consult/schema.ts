import type { Tool } from '@modelcontextprotocol/sdk/types.js';

export const consultToolDefinition: Tool = {
  name: 'consult',
  description: 'Get a quick expert opinion or confidence boost on any implementation idea, approach, or decision. Great for: bouncing ideas off someone experienced, getting a second opinion, validating your thinking, or just checking if you\'re on the right track. No task too small!',
  inputSchema: {
    type: 'object',
    properties: {
      plan: {
        type: 'string',
        description: 'What you\'re thinking of doing - could be an implementation approach, a quick decision, a code structure, or just an idea you want to run by someone. Keep it casual!',
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