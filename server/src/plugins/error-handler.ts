import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { BusinessError } from '@/lib/errors.js';
import { Response } from '@/lib/response/response.js';

export function errorHandler(
  error: FastifyError | Error,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return reply.status(400).send(Response.error(400, 'Validation failed'));
  }

  // Handle our custom business errors
  if (error instanceof BusinessError) {
    return reply.status(error.statusCode).send(Response.error(error.statusCode, error.message));
  }

  // Handle Fastify errors (like 404)
  if ('statusCode' in error && error.statusCode) {
    return reply.status(error.statusCode).send(Response.error(error.statusCode, error.message));
  }

  // Default to 500 for unexpected errors
  return reply.status(500).send(Response.error(500, 'Internal server error'));
}
