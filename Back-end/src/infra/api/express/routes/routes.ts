import { Request, RequestHandler, Response } from "express";
import { IMiddleware } from "../middlewares/IMiddleware";

export type HttpMethod = "get" | "post" | "put" | "delete";

export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
    PUT: 'put' as HttpMethod,
    DELETE: 'delete' as HttpMethod,
}as const;
export interface Route<RequestType extends Request = Request> {
    getHandler(): (request:Request, response:Response) => Promise<void>;
    getPath():string;
    getMethod():HttpMethod;
    middlewares?: IMiddleware<RequestType>[]
}