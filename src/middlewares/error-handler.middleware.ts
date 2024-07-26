import { NextFunction, Request, Response } from "express";
import { QueryFailedError } from "typeorm";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction)
{
    var statusCode = err.status || 500;

    const response: any = {
        error: {
            message: err.message || 'Internal Server Error'
        }
    };

    if (err instanceof QueryFailedError) {
        response.error.details = err.driverError;
    }

    if (process.env.APP_ENV === 'development') {
        response.error.stack = err.stack;
    }

    res.status(statusCode).json(response);
}