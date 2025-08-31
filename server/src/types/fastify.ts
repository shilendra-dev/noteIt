import type { FastifyInstance } from 'fastify';
import type { FastifyZodOpenApiTypeProvider } from 'fastify-zod-openapi';

// Type for Fastify instance with Zod OpenAPI type provider
// Using defaults from Fastify's generic parameters
export type TypedFastifyInstance = FastifyInstance<
  import('http').Server,
  import('http').IncomingMessage,
  import('http').ServerResponse,
  import('fastify').FastifyBaseLogger,
  FastifyZodOpenApiTypeProvider
>;
