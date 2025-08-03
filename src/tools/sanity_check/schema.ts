import type { Tool } from '@modelcontextprotocol/sdk/types.js';

export const consultToolDefinition: Tool = {
  name: 'sanity_check',
  description: 'Quick sanity check during your thinking and planning process. Use this while you\'re still figuring things out - not just at the end! Perfect for: brainstorming approaches, evaluating options, checking if you\'re headed in the right direction, or whenever you think "hmm, is this a good idea?" Don\'t wait until you\'re done - use it while you\'re working through problems.',
  inputSchema: {
    type: 'object',
    properties: {
      plan: {
        type: 'string',
        description: 'The idea, approach, or partial solution you\'re thinking about. Could be an early-stage plan, a direction you\'re considering, a rough outline, or even just "I\'m thinking of doing X, does that make sense?"',
      },
      context: {
        type: 'string',
        description: 'Any extra details that might be helpful - what you\'re working on, constraints, or just background info. Optional but helpful!',
      },
    },
    required: ['plan'],
  },
};