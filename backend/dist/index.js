"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const http_1 = __importDefault(require("http"));
const db_config_1 = __importDefault(require("./configs/db.config"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use("/", routes_1.default);
app.get('/', (req, res) => {
    res.send(new Date());
});
console.log("🚀 ~ process.env.NODE_ENV:", process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
    const server = http_1.default.createServer(app);
    server.listen(3000, async () => {
        console.log("🚀 Server running on http://localhost:3000");
    });
}
(async () => {
    try {
        await db_config_1.default.authenticate();
        console.log("🚀🚀🚀 DB CONNECTION: SUCCESSFULLY");
    }
    catch (err) {
        console.error("🚫🚫🚫 DB CONNECTION:", err);
    }
})();
exports.default = app;
