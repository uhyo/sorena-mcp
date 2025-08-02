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
This is a Model Context Protocol (MCP) server that provides consultation services to AI agents. The server implements a single tool called `consult` that accepts questions and provides expert advice.

**Key Components:**
- **Server Instance**: Created using `@modelcontextprotocol/sdk` with stdio transport
- **Tool Registration**: Uses `ListToolsRequestSchema` handler to expose available tools
- **Tool Execution**: Uses `CallToolRequestSchema` handler to process tool calls
- **Error Handling**: Comprehensive error handling with proper MCP error responses

### Core Implementation Pattern
The server follows the standard MCP pattern:
1. Define server capabilities (tools, logging)
2. Register tool definitions with input schemas
3. Handle tool execution requests with validation and error handling
4. Connect to stdio transport for client communication

### Current Tool: `consult`
- **Purpose**: Provide expert advice and guidance to AI agents when they're uncertain about implementation plans
- **Parameters**: 
  - `question` (required): The question needing advice
  - `context` (optional): Additional background information  
  - `language` (optional): Response language (english/japanese)
- **Current State**: Placeholder implementation - returns generic advice

### TypeScript Configuration
The project uses strict TypeScript settings optimized for Node.js 22+:
- ES2024 target with nodenext module resolution
- Comprehensive strict settings including `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`
- Source maps and declarations generated for debugging

## Key Development Notes

### Extending Tools
To add new tools:
1. Add tool definition to the tools array in `ListToolsRequestSchema` handler (src/index.ts:29-57)
2. Add corresponding case in `CallToolRequestSchema` switch statement (src/index.ts:68-111)
3. Follow existing error handling patterns with try/catch and proper MCP error responses

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

## Documentation Maintenance

**Keep README.md in sync with implementation changes:**
- When adding new tools, update the "Available Tools" section in README.md
- When modifying tool parameters or behavior, update corresponding documentation
- When changing server capabilities or architecture, reflect changes in README.md overview
- Ensure examples in README.md match actual tool schemas and responses