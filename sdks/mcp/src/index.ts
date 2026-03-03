import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { TheOneCrawl } from '@theonecrawl/js';
import { allTools, toolMap } from './tools/index.js';

const server = new Server(
  { name: 'theonecrawl', version: '0.1.0' },
  { capabilities: { tools: {} } },
);

// Lazy client init (only when first tool is called)
let client: TheOneCrawl | null = null;
function getClient(): TheOneCrawl {
  if (!client) {
    client = new TheOneCrawl();
  }
  return client;
}

// List tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: allTools.map((t) => ({
    name: t.name,
    description: t.description,
    inputSchema: t.inputSchema,
  })),
}));

// Call tool
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;

  const tool = toolMap.get(name);
  if (!tool) {
    return {
      content: [{ type: 'text', text: `Unknown tool: ${name}` }],
      isError: true,
    };
  }

  try {
    const result = await tool.handler(getClient(), args as Record<string, unknown>);
    return {
      content: [{ type: 'text', text: result }],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: 'text', text: `Error: ${message}` }],
      isError: true,
    };
  }
});

// Start
const transport = new StdioServerTransport();
await server.connect(transport);
