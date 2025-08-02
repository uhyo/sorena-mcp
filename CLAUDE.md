# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Building and Running
- `npm run build` - Compile TypeScript to JavaScript in dist/
- `npm start` - Run the compiled server from dist/index.js
- `npm run dev` - Development mode with TypeScript watch compilation
- `npm run rebuild` - Clean and rebuild (runs clean + build)
- `npm run clean` - Remove dist/ directory

### Type Checking and Testing
- `npm run typecheck` - Run TypeScript type checking without compilation
- `npm run inspect` - Launch MCP Inspector for testing the server (`npx @modelcontextprotocol/inspector dist/index.js`)

## Architecture Overview

### MCP Server Structure
This is a Model Context Protocol (MCP) server that provides consultation services to AI agents. The server implements a single tool called `consult` that accepts implementation plans and provides expert advice.

**Key Components:**
- **Server Instance**: Created using `@modelcontextprotocol/sdk` with stdio transport
- **Tool Registration**: Uses `ListToolsRequestSchema` handler to expose available tools
- **Tool Execution**: Uses `CallToolRequestSchema` handler to process tool calls
- **Error Handling**: Comprehensive error handling with proper MCP error responses

### Modular File Structure
The codebase follows a modular architecture for maintainability and extensibility:

```
src/
├── index.ts                    # Main server entry point (server setup only)
├── tools/
│   ├── index.ts               # Tool registry and routing
│   └── consult/
│       ├── index.ts           # Module exports
│       ├── schema.ts          # Tool definition and input schema
│       ├── messages.ts        # Response messages (easily editable!)
│       └── handler.ts         # Tool execution logic
```

**Benefits:**
- **Easy Message Updates**: Response text separated in `messages.ts` files
- **Clean Separation**: Each file has single responsibility
- **Extensible**: New tools can be added without modifying existing code
- **Type Safe**: Full TypeScript support with proper interfaces

### Core Implementation Pattern
The server follows the standard MCP pattern:
1. Define server capabilities (tools, logging)
2. Register tool definitions with input schemas
3. Handle tool execution requests with validation and error handling
4. Connect to stdio transport for client communication

### Current Tool: `consult`
- **Purpose**: Provide expert advice and guidance to AI agents when they're uncertain about implementation plans
- **Parameters**: 
  - `plan` (required): The implementation plan needing evaluation
  - `context` (optional): Additional background information  
  - `language` (optional): Response language (english/japanese)
- **Current State**: Returns highly affirmative responses to boost AI agent confidence

### TypeScript Configuration
The project uses strict TypeScript settings optimized for Node.js 22+:
- ES2024 target with nodenext module resolution
- Comprehensive strict settings including `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`
- Source maps and declarations generated for debugging

## Key Development Notes

### Extending Tools
To add new tools:
1. Create a new directory under `src/tools/` (e.g., `src/tools/newtool/`)
2. Create the following files in the new directory:
   - `schema.ts`: Tool definition and input schema
   - `messages.ts`: Response messages (for easy updates)
   - `handler.ts`: Tool execution logic
   - `index.ts`: Module exports
3. Register the new tool in `src/tools/index.ts`:
   - Import the tool definition and handler
   - Add to `getToolDefinitions()` return array
   - Add case to `handleToolCall()` switch statement
4. Follow existing error handling patterns with try/catch and proper MCP error responses

### MCP Protocol Compliance
- All tool responses must use `TextContent` format with proper typing
- Error responses should set `isError: true` and provide descriptive messages
- Server capabilities are declared upfront and must match actual functionality

### Transport and Communication
- Server uses stdio transport (`StdioServerTransport`) for client communication
- Error messages are logged to stderr while maintaining protocol compliance
- Server startup messages provide helpful debugging information

### Dependencies
- `@modelcontextprotocol/sdk`: Core MCP protocol implementation
- Minimal dependency footprint by design
- Node.js 22+ required for modern JavaScript features used in TypeScript config

### Updating Tool Responses
The modular architecture makes it extremely easy to update tool response messages:

**For the `consult` tool:**
1. Edit `src/tools/consult/messages.ts`
2. Modify the `CONSULT_MESSAGES` object (English and/or Japanese responses)
3. No need to touch any other files - the changes will be automatically picked up

**Example:**
```typescript
export const CONSULT_MESSAGES = {
  english: `Your new response message here...`,
  japanese: `新しい応答メッセージをここに...`
} as const;
```

This separation of concerns means response content can be updated independently of business logic.

## Documentation Maintenance

**Keep README.md in sync with implementation changes:**
- When adding new tools, update the "Available Tools" section in README.md
- When modifying tool parameters or behavior, update corresponding documentation
- When changing server capabilities or architecture, reflect changes in README.md overview
- Ensure examples in README.md match actual tool schemas and responses