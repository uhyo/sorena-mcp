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
- `question` (string, required): The question or topic you need advice about
- `context` (string, optional): Additional context or background information
- `language` (string, optional): Response language - either "english" or "japanese" (defaults to "english")

**Example Usage:**

```json
{
  "name": "consult",
  "arguments": {
    "question": "Should I use microservices or monolith architecture for my new project?",
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
│   └── index.ts          # Main server implementation
├── dist/                 # Compiled JavaScript output
├── package.json          # Project configuration
├── tsconfig.json         # TypeScript configuration
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

The current implementation provides a placeholder consultant tool. To extend it:

1. Modify the `consult` tool handler in `src/index.ts`
2. Add additional tools by updating the `ListToolsRequestSchema` handler
3. Implement corresponding tool handlers in the `CallToolRequestSchema` handler

### Adding New Tools

To add a new tool:

1. Add the tool definition to the tools array in the `ListToolsRequestSchema` handler
2. Add a new case in the `CallToolRequestSchema` handler switch statement
3. Implement the tool logic

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