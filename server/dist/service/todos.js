"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_pattern_1 = require("ts-pattern");
class TodoService {
    constructor(repository) {
        this.repository = repository;
    }
    createToDo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.create(data);
        });
    }
    getToDo() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find();
        });
    }
    updateToDo(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.repository.findById(id);
            if (!todo)
                throw new Error("Failed to find to-do!");
            return this.repository.findByIdAndUpdate(id, data, { new: true });
        });
    }
    deleteToDo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.repository.findById(id);
            if (!todo)
                throw new Error("Failed to find to-do!");
            const isDeleted = yield this.repository.findByIdAndDelete(id);
            if (!isDeleted)
                throw new Error("Failed to delete to-do");
            return { message: "Todo deleted successfully!" };
        });
    }
    clearToDo() {
        return __awaiter(this, void 0, void 0, function* () {
            const isEverythingDeleted = yield this.repository.deleteMany();
            if (!isEverythingDeleted)
                throw new Error("Failed to delete every todos");
            return { message: "Every Todos deleted successfully!" };
        });
    }
    sortDateToDo() {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield this.repository.find();
            function compareTodos(a, b) {
                switch (true) {
                    case !a.dueDate && !b.dueDate:
                        return { type: 'no-date' };
                    case !a.dueDate:
                        return { type: 'a-no-date' };
                    case !b.dueDate:
                        return { type: 'b-no-date' };
                    default:
                        const result = a.dueDate.getTime() - b.dueDate.getTime();
                        return { type: 'sorted', result };
                }
            }
            const sortedTodos = todos.sort((a, b) => {
                const sortedResult = compareTodos(a, b);
                return (0, ts_pattern_1.match)(sortedResult.type)
                    .with('no-date', () => 0)
                    .with('a-no-date', () => 1)
                    .with('b-no-date', () => -1)
                    .with('sorted', () => a.dueDate.getTime() - b.dueDate.getTime())
                    .exhaustive();
            });
            return sortedTodos;
        });
    }
    prioritizeToDo(priority) {
        return __awaiter(this, void 0, void 0, function* () {
            if (priority < 1 || priority > 5) {
                throw new Error('Invalid priority value. Priority must be between 1 and 5.');
            }
            const todos = yield this.repository.find();
            const prioritizedTodos = todos.sort((a, b) => b.priority - a.priority);
            return prioritizedTodos;
        });
    }
    findToDo(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.repository.findWithTitle(title);
            if (todo.length == 0)
                throw new Error("Failed to find to-do!");
            return todo;
        });
    }
}
exports.default = TodoService;
