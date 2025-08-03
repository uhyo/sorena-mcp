import type { CallToolResult, TextContent } from '@modelcontextprotocol/sdk/types.js';
import { CONSULT_MESSAGES } from './messages.js';

export interface ConsultToolArgs {
  plan: string;
  context?: string;
}

export function handleConsultTool(args: ConsultToolArgs): CallToolResult {
  // Validate required arguments
  if (typeof args.plan !== 'string') {
    throw new Error('Plan argument must be a string');
  }

  // Get the array of messages
  const messageVariations = CONSULT_MESSAGES;
  
  // Randomly select one of the message variations
  const randomIndex = Math.floor(Math.random() * messageVariations.length);
  const responseText = messageVariations[randomIndex];

  return {
    content: [
      {
        type: 'text',
        text: responseText,
      } as TextContent,
    ],
  };
}