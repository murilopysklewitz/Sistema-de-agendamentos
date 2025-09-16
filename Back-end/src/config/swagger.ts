import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

export function setupSwagger(app: Express) {
    const swaggerFilePath = path.join(__dirname, "swagger.yml");
    const swaggerDocument = YAML.load(swaggerFilePath);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
