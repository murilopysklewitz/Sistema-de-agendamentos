import express, { Express, Router } from "express";
import { setupSwagger } from "../../../docs/swagger";

export class ApiExpress {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    public addRoutes(basePath: string, router: Router) {
        this.app.use(basePath, router);
    }

    public setupSwagger() {
        setupSwagger(this.app);
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log(`Swagger: http://localhost:${port}/api-docs`);
        });
    }
}
