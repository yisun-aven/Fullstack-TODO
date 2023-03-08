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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todos_1 = __importDefault(require("../models/todos"));
class TodoRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield todos_1.default.create(data);
            return todos;
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield todos_1.default.find({});
            return todos;
        });
    }
    findWithTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp(title, 'i');
            const todo = yield todos_1.default.find({ title: { $regex: regex } });
            return todo;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield todos_1.default.findById(id);
            return todo;
        });
    }
    findByIdAndUpdate(id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedTodo = yield todos_1.default.findByIdAndUpdate(id, data, options);
            return updatedTodo;
        });
    }
    findByIdAndDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield todos_1.default.findByIdAndDelete(id);
            return isDeleted;
        });
    }
    deleteMany() {
        return __awaiter(this, void 0, void 0, function* () {
            const isEverythingDeleted = yield todos_1.default.deleteMany();
            return isEverythingDeleted;
        });
    }
}
exports.default = TodoRepository;
