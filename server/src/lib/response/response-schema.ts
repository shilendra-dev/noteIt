import { z } from 'zod/v4';

/**
 * RESPONSE SCHEMAS
 *
 * Reusable Zod schemas for consistent API response structure
 */

// Generic success response wrapper
export function createSuccessSchema<T extends z.ZodType>(dataSchema: T) {
  return z.object({
    status: z.literal('success'),
    code: z.number(),
    message: z.string(),
    data: dataSchema,
  });
}

// Generic error response
export const errorResponseSchema = z.object({
  status: z.literal('error'),
  code: z.number(),
  message: z.string(),
});

// Common error responses
export const notFoundSchema = errorResponseSchema;
export const badRequestSchema = errorResponseSchema;
export const serverErrorSchema = errorResponseSchema;
