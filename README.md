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

- 🤖 **Expert Consultation Tool**: Get thoughtful advice and guidance on various topics
- 🌐 **Multi-language Support**: Responses available in English and Japanese
- 📋 **Context-Aware**: Provide additional context for more targeted advice
- ⚡ **Fast & Lightweight**: Built with TypeScript and minimal dependencies
- 🔧 **Easy Integration**: Standard MCP server that works with any MCP client

## Installation

### Prerequisites

- Node.js >= 22.0.0
- npm or yarn

### Install from npm

```bash
npm install -g @uhyo/sorena-mcp
```

Or install locally in your project:

```bash
npm install @uhyo/sorena-mcp
```

### Install from Source

If you want to build from source:

1. Clone the repository:
```bash
git clone https://github.com/uhyo/sorena-mcp.git
cd sorena-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

### Starting the Server

#### If installed globally:
```bash
sorena-mcp
```

#### If installed locally:
```bash
npx @uhyo/sorena-mcp
```

#### If built from source:
```bash
npm start
```

Once running, the server will be available via stdio transport for MCP clients to connect to.

### Development Mode (Source Installation)

For development with automatic rebuilding:

```bash
npm run dev
```

### Testing with MCP Inspector

You can test the server using the MCP Inspector:

#### If installed globally:
```bash
npx @modelcontextprotocol/inspector sorena-mcp
```

#### If built from source:
```bash
npm run inspect
```

### Available Tools

#### `consult`

Get expert advice and guidance on various topics.

**Parameters:**
- `plan` (string, required): The implementation plan you want evaluated for feasibility and completeness
- `context` (string, optional): Additional context or background information
- `language` (string, optional): Response language - either "english" or "japanese" (defaults to "english")

**Example Usage:**

```json
{
  "name": "consult",
  "arguments": {
    "plan": "1. Set up Node.js API server with Express\n2. Create PostgreSQL database with user and post tables\n3. Implement JWT authentication\n4. Build React frontend with user registration and feed\n5. Deploy to AWS with Docker containers",
    "context": "Building a social media platform with expected 10K users initially",
    "language": "english"
  }
}
```

## Integration

### With Claude Desktop

Add this server to your Claude Desktop configuration:

#### If installed globally:
```json
{
  "mcpServers": {
    "sorena": {
      "command": "sorena-mcp"
    }
  }
}
```

#### If installed locally in a project:
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

#### If built from source:
```json
{
  "mcpServers": {
    "sorena": {
      "command": "node",
      "args": ["/path/to/sorena-mcp/dist/index.js"]
    }
  }
}
```

### With Other MCP Clients

The server follows the standard MCP protocol and can be integrated with any MCP-compatible client by connecting to the stdio transport. Use the appropriate command based on your installation method above.

## Development

### Project Structure

```
@uhyo/sorena-mcp/
├── src/
│   ├── index.ts          # Main server entry point
│   └── tools/            # Modular tool implementations
│       ├── index.ts      # Tool registry and routing
│       └── consult/      # Consult tool module
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
1. Edit the appropriate `messages.ts` file (e.g., `src/tools/consult/messages.ts`)
2. Modify the response text without touching any other code
3. Rebuild with `npm run build`

**Modifying Tool Logic:**
1. Edit the appropriate `handler.ts` file (e.g., `src/tools/consult/handler.ts`)
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