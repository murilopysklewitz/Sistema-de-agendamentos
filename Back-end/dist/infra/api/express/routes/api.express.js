"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExpress = void 0;
const express_1 = __importDefault(require("express"));
const swagger_1 = require("../../../../config/swagger");
class ApiExpress {
    app;
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.addRoutes(routes);
        (0, swagger_1.setupSwagger)(this.app);
    }
    static create(routes) {
        return new ApiExpress(routes);
    }
    addRoutes(routes) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            const middlewares = route.getMiddlewares ? route.getMiddlewares() : [];
            if (middlewares.length > 0) {
                this.app[method](path, ...middlewares.map(m => m.handle.bind(m)), handler);
            }
            else {
                this.app[method](path, handler);
            }
        });
    }
    start(port) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}
exports.ApiExpress = ApiExpress;
