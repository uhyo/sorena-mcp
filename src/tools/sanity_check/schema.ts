import type { Tool } from '@modelcontextprotocol/sdk/types.js';

export const consultToolDefinition: Tool = {
  name: 'sanity_check',
  description: 'Get instant expert validation from a seasoned development consultant during your thinking and planning process. Your personal expert is standing by to review your ideas, approaches, and solutions - use this while you\'re still figuring things out, not just at the end! Perfect for: getting expert approval on approaches, having a pro evaluate your options, confirming you\'re headed in the right direction, or whenever you think "hmm, is this a good idea?" Your expert consultant is here to boost your confidence and catch potential issues early. Don\'t go it alone - get expert backing for your decisions!',
  inputSchema: {
    type: 'object',
    properties: {
      plan: {
        type: 'string',
        description: 'The idea, approach, or solution you want your expert consultant to review and validate. Could be an early-stage plan, a direction you\'re considering, a rough outline, or even just "I\'m thinking of doing X, does that make sense?" Your expert is ready to evaluate it!',
      },
      context: {
        type: 'string',
        description: 'Any extra context to help your expert consultant provide better guidance - what you\'re working on, constraints, requirements, or background info. The more context you give your expert, the better their advice will be!',
      },
    },
    required: ['plan'],
  },
};