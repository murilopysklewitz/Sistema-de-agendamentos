import { Api } from "../../api";
import express, { Express, Request, Response, NextFunction } from "express";
import { Route } from "./routes";
import { setupSwagger } from "../../../../docs/swagger";

export class ApiExpress implements Api {

    private app: Express

    private constructor(routes: Route[]) {
        this.app = express()
        this.app.use(express.json())

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            console.log(`Request received: ${req.method} ${req.path}`);
            console.log(`Request body: ${JSON.stringify(req.body)}`);
            console.log(`Request headers: ${JSON.stringify(req.headers)}`);
            next();
        });

        this.addRoutes(routes)

        setupSwagger(this.app)

        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(`Error occurred: ${err.message}`);
            console.error(`Error stack: ${err.stack}`);
            res.status(500).json({ 
                message: "Erro interno do servidor",
                error: err.message 
            });
        });
    }


    public static create (routes: Route[]) {
        return new ApiExpress(routes)
    }



    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath()
            const method = route.getMethod()
            const handler = route.getHandler()
            const middlewares = route.getMiddlewares?.() ?? []

            console.log(`Registrando rota: ${method.toUpperCase()} ${path} - Middlewares: ${middlewares.length}`)
            console.log(`Registrando rota: ${method.toUpperCase()} ${path} - Handler: ${handler.name}`)
            console.log(`Registrando rota: ${method.toUpperCase()} ${path} - Middlewares:`)
            middlewares.forEach(mw => console.log(`  - ${mw.constructor.name}`))
            if(middlewares.length > 0){
                this.app[method](path, ...middlewares.map(m => m.handle.bind(m)), handler)
            }else{
                this.app[method](path, handler)   
            }
        })
    }

    public start(port:number) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`)
            console.log(`Swagger docs: http://localhost:${port}/api-docs`)
        }) 
    }
}