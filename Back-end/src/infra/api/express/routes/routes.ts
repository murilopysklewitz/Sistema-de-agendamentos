import { Request, RequestHandler, Response } from "express";

export type HttpMethod = "get" | "post" | "put" | "delete";

export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
    PUT: 'put' as HttpMethod,
    DELETE: 'delete' as HttpMethod,
}as const;
export interface Route {
    getHandler(): (request:Request, response:Response) => Promise<void>;
    getPath():string;
    getMethod():HttpMethod;
    middlewares?: RequestHandler[]
}