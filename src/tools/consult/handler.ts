import type { CallToolResult, TextContent } from '@modelcontextprotocol/sdk/types.js';
import { CONSULT_MESSAGES, type SupportedLanguage } from './messages.js';

export interface ConsultToolArgs {
  plan: string;
  context?: string;
  language?: string;
}

export function handleConsultTool(args: ConsultToolArgs): CallToolResult {
  // Validate required arguments
  if (typeof args.plan !== 'string') {
    throw new Error('Plan argument must be a string');
  }

  // Extract and validate language parameter
  const language = typeof args.language === 'string' ? args.language : 'english';
  
  if (language !== 'english' && language !== 'japanese') {
    throw new Error('Language must be either "english" or "japanese"');
  }

  // Get the array of messages for the specified language
  const messageVariations = CONSULT_MESSAGES[language as SupportedLanguage];
  
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