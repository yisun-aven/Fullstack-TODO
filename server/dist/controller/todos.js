"use strict";
// // comment out github 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findToDo = exports.prioritizeToDo = exports.sortDateToDo = exports.clearToDo = exports.deleteToDo = exports.updateToDo = exports.getToDo = exports.createToDo = void 0;
const todos_1 = __importDefault(require("../service/todos"));
const todos_2 = __importDefault(require("../repository/todos"));
const todoRepository = new todos_2.default();
const todoService = new todos_1.default(todoRepository);
const createToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todoService.createToDo(req.body);
        return res.status(200).json(todo);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createToDo = createToDo;
const getToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoService.getToDo();
        return res.status(200).json(todos);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getToDo = getToDo;
const updateToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateTodo = yield todoService.updateToDo(id, req.body);
        return res.status(200).json(updateTodo);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateToDo = updateToDo;
const deleteToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const isDeleted = yield todoService.deleteToDo(id);
        if (!isDeleted) {
            throw new Error("Failed to delete to-do");
        }
        return res.status(200).json({ message: "Todo deleted successfully!" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteToDo = deleteToDo;
const clearToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isEverythingDeleted = yield todoService.clearToDo();
        if (!isEverythingDeleted) {
            throw new Error("Failed to delete every todos");
        }
        return res.status(200).json({ message: "Every Todos deleted successfully!" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.clearToDo = clearToDo;
const sortDateToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sortedTodos = yield todoService.sortDateToDo();
        return res.status(200).json(sortedTodos);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.sortDateToDo = sortDateToDo;
const prioritizeToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { priority } = req.body;
    if (priority < 1 || priority > 5) {
        res.status(400).json({ message: 'Invalid priority value. Priority must be between 1 and 5.' });
        return;
    }
    try {
        const prioritizedTodos = yield todoService.prioritizeToDo(priority);
        return res.status(200).json(prioritizedTodos);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.prioritizeToDo = prioritizeToDo;
const findToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.params;
    try {
        const todos = yield todoService.findToDo(title);
        if (todos.length === 0) {
            return res.status(404).json({ message: "Failed to find to-do!" });
        }
        return res.status(200).json(todos);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.findToDo = findToDo;
