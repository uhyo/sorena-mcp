import type { 
  CallToolResult, 
  ListToolsResult, 
  CallToolRequest 
} from '@modelcontextprotocol/sdk/types.js';
import { consultToolDefinition, handleConsultTool, type ConsultToolArgs } from './sanity_check/index.js';

/**
 * Get all available tools
 */
export function getToolDefinitions(): ListToolsResult {
  return {
    tools: [
      consultToolDefinition,
    ],
  };
}

/**
 * Handle tool execution requests
 */
export function handleToolCall(request: CallToolRequest['params']): CallToolResult {
  const { name, arguments: args } = request;

  if (!args) {
    throw new Error('No arguments provided');
  }

  switch (name) {
    case 'sanity_check':
      return handleConsultTool(args as unknown as ConsultToolArgs);
    
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}