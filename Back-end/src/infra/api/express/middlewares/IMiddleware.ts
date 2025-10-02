import { NextFunction, Request, Response } from "express";

export interface IMiddleware  {
    handle(request: Request, response: Response, next: NextFunction): void
}