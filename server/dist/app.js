"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require('mongoose');
const todos_1 = __importDefault(require("./routes/todos"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/react-todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);
app.use("/todos", todos_1.default);
app.use((err, req, res) => { res.status(500).json({ message: err.message }); });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
