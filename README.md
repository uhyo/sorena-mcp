# @uhyo/sorena-mcp

[![npm version](https://badge.fury.io/js/%40uhyo%2Fsorena-mcp.svg)](https://badge.fury.io/js/%40uhyo%2Fsorena-mcp)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.0-blue)](https://www.typescriptlang.org/)

An MCP (Model Context Protocol) server that provides expert-level consultation services for AI agents. When AI agents are uncertain about their implementation plans or need guidance on complex problems, they can consult Sorena for thoughtful, expert advice and evaluation.

## Overview

Sorena MCP Server is designed to serve as a reliable consultant that AI agents can turn to when they need:

- **Expert evaluation** of implementation approaches
- **Guidance** on complex technical decisions  
- **Best practice recommendations** for various scenarios
- **Problem-solving strategies** when facing uncertainty

The server implements the Model Context Protocol, making it compatible with any MCP-enabled AI system or client.

## About the Name

"Sorena" derives from the Japanese expression "それな" (sore na), which means "exactly!" or "that's right!" - the phrase you say when someone hits the nail on the head or provides exactly the insight you needed. This captures the essence of what good consultation should be: that moment of clarity when you receive advice that perfectly addresses your situation and makes you think "それな!" In the context of AI consultation, Sorena aims to provide that same feeling of receiving exactly the right guidance at the right time.

## Features

- 🤖 **Expert Validation Tool**: Get instant professional approval and confidence-boosting feedback
- 🎯 **Confidence Building**: Designed to help AI agents feel assured about their implementation decisions
- 📋 **Context-Aware**: Provide additional context for more targeted expert validation
- ⚡ **Fast & Lightweight**: Built with TypeScript and minimal dependencies
- 🔧 **Easy Integration**: Standard MCP server that works with any MCP client

## Installation

This is an MCP (Model Context Protocol) server that communicates via stdio transport. It's designed to be integrated with MCP clients rather than run standalone.

### Prerequisites

- Node.js >= 22.0.0

### For Claude Code Users

The easiest way to install and configure this MCP server:

```bash
claude mcp add sorena -- npx @uhyo/sorena-mcp
```

This command automatically:
- Installs the server from npm
- Configures it in your Claude Code MCP settings
- Makes it immediately available for use

### Generic MCP Installation

For other MCP clients, this server can be run using:

```bash
npx @uhyo/sorena-mcp
```

The server uses stdio transport and is compatible with any MCP client that supports this communication method.

### Testing with MCP Inspector

You can test the server functionality using the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector npx @uhyo/sorena-mcp
```

### Available Tools

#### `sanity_check`

Get instant expert validation from a seasoned development consultant during your thinking and planning process.

**Parameters:**
- `plan` (string, required): The idea, approach, or solution you want your expert consultant to review and validate
- `context` (string, optional): Any extra context to help your expert consultant provide better guidance

**Example Usage:**

```json
{
  "name": "sanity_check",
  "arguments": {
    "plan": "1. Set up Node.js API server with Express\n2. Create PostgreSQL database with user and post tables\n3. Implement JWT authentication\n4. Build React frontend with user registration and feed\n5. Deploy to AWS with Docker containers",
    "context": "Building a social media platform with expected 10K users initially"
  }
}
```

### For Claude Desktop Users

Add this server to your Claude Desktop configuration file:

```json
{
  "mcpServers": {
    "sorena": {
      "command": "npx",
      "args": ["@uhyo/sorena-mcp"]
    }
  }
}
```

### For Developers

If you want to build from source for development or customization:

```bash
git clone https://github.com/uhyo/sorena-mcp.git
cd sorena-mcp
npm install
npm run build
```

Then use `npm run dev` for development with automatic rebuilding, or `npm run inspect` to test with MCP Inspector.

## Development

### Project Structure

```
@uhyo/sorena-mcp/
├── src/
│   ├── index.ts          # Main server entry point
│   └── tools/            # Modular tool implementations
│       ├── index.ts      # Tool registry and routing
│       └── sanity_check/ # Sanity check tool module
│           ├── index.ts  # Module exports
│           ├── schema.ts # Tool definition and schema
│           ├── messages.ts # Response messages
│           └── handler.ts # Tool execution logic
├── dist/                 # Compiled JavaScript output
├── package.json          # Project configuration
├── tsconfig.json         # TypeScript configuration
├── CLAUDE.md            # Development guidance
└── README.md            # This file
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start the compiled server
- `npm run dev` - Development mode with watch
- `npm run clean` - Remove compiled files
- `npm run rebuild` - Clean and rebuild
- `npm run typecheck` - Type checking without compilation
- `npm run inspect` - Launch MCP Inspector for testing

### Extending the Server

The server uses a modular architecture that makes it easy to extend:

**Updating Tool Response Messages:**
1. Edit the appropriate `messages.ts` file (e.g., `src/tools/sanity_check/messages.ts`)
2. Modify the response text without touching any other code
3. Rebuild with `npm run build`

**Modifying Tool Logic:**
1. Edit the appropriate `handler.ts` file (e.g., `src/tools/sanity_check/handler.ts`)
2. Update the tool execution logic as needed
3. Follow existing error handling patterns

### Adding New Tools

To add a completely new tool:

1. **Create the tool module structure:**
   ```bash
   mkdir src/tools/newtool
   ```

2. **Create the required files:**
   - `schema.ts`: Tool definition and input schema
   - `messages.ts`: Response messages for easy editing
   - `handler.ts`: Tool execution logic  
   - `index.ts`: Module exports

3. **Register the tool:**
   - Import in `src/tools/index.ts`
   - Add to `getToolDefinitions()` array
   - Add case to `handleToolCall()` switch statement

4. **Rebuild and test:**
   ```bash
   npm run build
   npm run inspect
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/uhyo/sorena-mcp/issues) page for existing solutions
2. Create a new issue with detailed description
3. For development questions, refer to the [MCP SDK documentation](https://github.com/modelcontextprotocol/sdk)

---

**Note**: This is a development version of Sorena MCP Server. The consultation logic is currently implemented as a placeholder and will be enhanced with more sophisticated advisory capabilities in future releases.