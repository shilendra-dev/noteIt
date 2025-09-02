//RESPONSE HELPER for same format response
export interface SuccessResponse<T = unknown> {
    status: 'success';
    code: number;
    message: string;
    data: T;
}

export interface ErrorResponse {
    status: 'error';
    code: number;
    message: string;
}

export class Response {
    static success<T>(data: T, code = 200, message = 'success'): SuccessResponse<T> {
        return {
            status: 'success',
            code,
            message,
            data,
        }
    }
    static error(code = 400, message = 'error'): ErrorResponse {
        return {
            status: 'error',
            code,
            message,
        };
    }
}