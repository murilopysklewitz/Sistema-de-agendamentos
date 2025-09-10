import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import { Express } from "express";
import path from "path";

export function setupSwagger(app: Express) {
  const swaggerPath = path.resolve(__dirname, "./swagger.yaml");
  const swaggerDocument = yaml.load(swaggerPath);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
