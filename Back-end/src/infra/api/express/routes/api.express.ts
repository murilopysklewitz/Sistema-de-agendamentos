import { Api } from "../../api";
import express, { Express } from "express";
import { Route } from "./routes";
import { setupSwagger } from "../../../../config/swagger";

export class ApiExpress implements Api {

    private app: Express

    private constructor(routes: Route[]) {
        this.app = express();
        this.app.use(express.json())
        this.addRoutes(routes);

        setupSwagger(this.app)
    }


    public static create (route: Route[]) {
        return new ApiExpress(route)
    }

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();

            this.app[method](path, handler);
        })
    }

    public start(port:number) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        })
    }
}