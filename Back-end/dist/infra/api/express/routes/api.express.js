"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExpress = void 0;
const express_1 = __importDefault(require("express"));
class ApiExpress {
    app;
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.addRoutes(routes);
    }
    static create(route) {
        return new ApiExpress(route);
    }
    addRoutes(routes) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            this.app[method](path, handler);
        });
    }
    start(port) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}
exports.ApiExpress = ApiExpress;
