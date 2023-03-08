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
const requestTest = require('supertest');
const app_1 = __importDefault(require("./app"));
const { expect } = require('chai');
const crypto = require("crypto");
const todos_1 = require("./controller/todos");
jest.mock('../services/todoService');
describe('Todo API Test', () => {
    let requestMock = {
        body: {
            title: {},
            description: {}
        }
    };
    let responseMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    it('should return a 400 error if title is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, todos_1.createToDo)(requestMock, responseMock);
        expect(responseMock.status).toHaveBeenCalledWith(400);
    }));
    it('should create a new todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test describtion' });
        expect(res.statusCode).to.equal(201);
    }));
    it('should return all todos', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield requestTest(app_1.default).get('/todos');
        expect(res.statusCode).to.equal(200);
    }));
    it('should update a specific todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = crypto.randomBytes(12).toString("hex");
        const todo = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test describtion', _id: id });
        const res = yield requestTest(app_1.default)
            .patch(`/todos/${id}`)
            .send({ title: 'Updated Todo' });
        expect(res.statusCode).to.equal(200);
    }));
    it('should delete a specific todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = crypto.randomBytes(12).toString("hex");
        const todo = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test describtion', _id: id });
        const res = yield requestTest(app_1.default).delete(`/todos/${id}`);
        expect(res.statusCode).to.equal(200);
    }));
    it('should clear all todos', () => __awaiter(void 0, void 0, void 0, function* () {
        const todo = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test describtion' });
        const todo2 = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo 2', description: 'Test describtion 2' });
        const res = yield requestTest(app_1.default).delete('/todos');
        expect(res.statusCode).to.equal(200);
    }));
    it('should prioritize todos', () => __awaiter(void 0, void 0, void 0, function* () {
        const todo = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test describtion' });
        const todo2 = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo 2', description: 'Test describtion 2' });
        const res = yield requestTest(app_1.default).get('/todos/prioritizeToDo');
        expect(res.statusCode).to.equal(200);
    }));
    it('should sort todos based on due dates', () => __awaiter(void 0, void 0, void 0, function* () {
        const todo = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test describtion' });
        const todo2 = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo 2', description: 'Test describtion 2' });
        const res = yield requestTest(app_1.default).patch('/todos');
        expect(res.statusCode).to.equal(200);
    }));
    it('should find todos based key words for title', () => __awaiter(void 0, void 0, void 0, function* () {
        const todo = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test describtion' });
        const todo2 = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo 2', description: 'Test describtion 2' });
        const res = yield requestTest(app_1.default).get(`/todos/findTodo/${"Test"}`);
        expect(res.statusCode).to.equal(200);
    }));
});
