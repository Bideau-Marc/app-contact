// models/api-error.model.ts
export interface ApiError {
    statusCode: number;
    message: string;
    error?: string;
    timestamp?: string;
    path?: string;
}