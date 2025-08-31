/**
 * CUSTOM ERROR CLASSES
 *
 * Define different types of errors with appropriate HTTP status codes
 * These errors will be caught by the global error handler
 */

export class BusinessError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number = 400) {
      super(message);
      this.name = 'BusinessError';
      this.statusCode = statusCode;
    }
  }
  
  export class NotFoundError extends BusinessError {
    constructor(message: string = 'Resource not found') {
      super(message, 404);
      this.name = 'NotFoundError';
    }
  }
  
  export class ConflictError extends BusinessError {
    constructor(message: string) {
      super(message, 409);
      this.name = 'ConflictError';
    }
  }
  