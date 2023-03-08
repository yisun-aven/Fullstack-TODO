"use strict";
// controllers need to be more specific -- ask shiting lee 
// change var to const to ensure safety
// Try to use functional programming on the project example - lines:56
// add some extension
// add test functions to test errors message 
// add front end
// comment out github 
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
const todos_1 = __importDefault(require("../models/todos"));
const createToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log("Data", data);
        const todos = yield todos_1.default.create(data);
        return res.status(200).json({ message: "Successfully created to-do!", data: todos });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createToDo = createToDo;
const getToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todos_1.default.find({});
        return res.status(200).json({ message: "Successfully retrieved all to-dos!", data: todos });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getToDo = getToDo;
const updateToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield todos_1.default.findById(id);
        if (!todo)
            return res.status(404).json({ message: "Failed to find to-do!" });
        const updateTodo = yield todos_1.default.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ message: "Successfully updated to-do!", data: updateTodo });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateToDo = updateToDo;
const deleteToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield todos_1.default.findById(id);
        if (!todo)
            return res.status(404).json({ message: "Failed to find to-do!" });
        const isDeleted = yield todos_1.default.findByIdAndDelete(id);
        if (!isDeleted)
            throw new Error("Failed to delete to-do");
        return res.status(200).json({ message: "Todo deleted successfully!" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteToDo = deleteToDo;
const clearToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isEverythingDeleted = yield todos_1.default.deleteMany({});
        if (!isEverythingDeleted)
            throw new Error("Failed to delete every todos");
        return res.status(200).json({ message: "Every Todos deleted successfully!" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.clearToDo = clearToDo;
const sortDateToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todos_1.default.find({});
        const sortedTodos = todos.sort((a, b) => {
            if (!a.dueDate && !b.dueDate) {
                return 0; // if both have no due date, they're equal
            }
            else if (!a.dueDate) {
                return 1; // if only a has no due date, it should be sorted last
            }
            else if (!b.dueDate) {
                return -1; // if only b has no due date, it should be sorted last
            }
            else {
                return a.dueDate.getTime() - b.dueDate.getTime(); // otherwise, sort by due date
            }
        });
        return res.status(200).json({ message: "Todos are sorted based on Date!", data: sortedTodos });
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
        const todos = yield todos_1.default.find({});
        const prioritizedTodos = todos.sort((a, b) => b.priority - a.priority);
        return res.status(200).json({ message: "Todos are sorted based on priority!", data: prioritizedTodos });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.prioritizeToDo = prioritizeToDo;
const findToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.params;
    const regex = new RegExp(title, 'i');
    try {
        const todo = yield todos_1.default.find({ title: { $regex: regex } });
        if (todo.length == 0)
            return res.status(404).json({ message: "Failed to find to-do!" });
        return res.status(200).json({ message: "This is what we found similar to what you searched for", data: todo });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.findToDo = findToDo;
