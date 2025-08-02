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

  // Get the appropriate response message
  const responseText = CONSULT_MESSAGES[language as SupportedLanguage];

  return {
    content: [
      {
        type: 'text',
        text: responseText,
      } as TextContent,
    ],
  };
}