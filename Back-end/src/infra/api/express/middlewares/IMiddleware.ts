import { NextFunction, Request, Response } from "express";

export interface IMiddleware<RequestType extends Request = Request> {
    handle(request: Request, response: Response, next: NextFunction): void
}