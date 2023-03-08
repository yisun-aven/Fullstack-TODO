"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const todos_1 = __importDefault(require("./routes/todos"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/todos';
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/todos", todos_1.default);
mongoose_1.default.connect(MONGO_URI, () => {
    console.log("Database is connected");
});
app.use((err, req, res) => { res.status(500).json({ message: err.message }); });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
