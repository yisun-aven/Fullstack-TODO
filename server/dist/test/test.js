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
const app_1 = __importDefault(require("../app"));
const todos_1 = __importDefault(require("../models/todos"));
const { expect } = require('chai');
describe('Todo API Test', () => __awaiter(void 0, void 0, void 0, function* () {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield todos_1.default.deleteMany();
    }));
    it('should create a new todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01' });
        expect(res.body.data).to.have.property('title', 'Test Todo');
        expect(res.body.data).to.have.property('description', 'Test description');
        expect(res.body.data).to.have.property('dueDate');
        expect(res.body.data).to.have.property('completed');
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data).to.have.property('priority');
        expect(res.body.data._id).to.be.a('string');
        expect(res.statusCode).to.equal(200);
        const createdTodo = yield todos_1.default.findById(res.body.data._id);
        expect(createdTodo).to.have.property('title', 'Test Todo');
        expect(createdTodo).to.have.property('description', 'Test description');
        expect(createdTodo).to.have.property('dueDate');
        expect(createdTodo).to.have.property('completed');
        expect(createdTodo).to.have.property('priority');
    }));
    it('should return all todos', () => __awaiter(void 0, void 0, void 0, function* () {
        const todo = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01' });
        const res = yield requestTest(app_1.default).get('/todos');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data).to.have.lengthOf.at.least(1);
        expect(res.statusCode).to.equal(200);
    }));
    it('should update a specific todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const todo = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description' });
        expect(todo.body.data).to.have.property('title', 'Test Todo');
        expect(todo.body.data).to.have.property('description', 'Test description');
        const id = todo.body.data._id;
        const res = yield requestTest(app_1.default)
            .patch(`/todos/${id}`)
            .send({ title: 'Updated Todo' });
        expect(res.body.data).to.have.property('title', 'Updated Todo');
        expect(res.body.data).to.have.property('description', 'Test description');
        expect(res.statusCode).to.equal(200);
    }));
    it('should return error with missing title', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield requestTest(app_1.default)
            .post('/')
            .send({ description: 'Test describtion' });
        expect(res.statusCode).to.equal(500);
    }));
    it('should return error with missing description', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test title' });
        expect(res.statusCode).to.equal(500);
    }));
    it('should create default priority eqauls to 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01' });
        expect(res.body.data).to.have.property('priority', 1);
        expect(res.statusCode).to.equal(200);
    }));
    it('should create default completed eqauls to false', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01' });
        expect(res.body.data).to.have.property('completed', false);
        expect(res.statusCode).to.equal(200);
    }));
    it('should delete a specific todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const todo = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01' });
        const id = todo.body.data._id;
        const res = yield requestTest(app_1.default).delete(`/todos/${id}`);
        const findSpecificTodo = yield todos_1.default.findById(id);
        expect(!findSpecificTodo);
        expect(res.statusCode).to.equal(200);
    }));
    it('should clear all todos', () => __awaiter(void 0, void 0, void 0, function* () {
        const todo = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01' });
        const todo2 = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo 2', description: 'Test description 2', dueDate: '2023/03/01' });
        const res = yield requestTest(app_1.default).delete('/todos');
        const findSpecificTodoOne = yield todos_1.default.findById(todo.body.data._id);
        const findSpecificTodoTwo = yield todos_1.default.findById(todo2.body.data._id);
        expect(!findSpecificTodoOne && !findSpecificTodoTwo);
        expect(res.statusCode).to.equal(200);
    }));
    it('should prioritize todos', () => __awaiter(void 0, void 0, void 0, function* () {
        const todo = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01', priority: 5 });
        const todo2 = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo 2', description: 'Test description 2', dueDate: '2023/03/01', priority: 2 });
        const res = yield requestTest(app_1.default).get('/todos/prioritizeToDo');
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data.length).to.equal(2);
        expect(res.body.data[0].priority).to.be.greaterThan(res.body.data[1].priority);
    }));
    it('should sort todos based on due dates', () => __awaiter(void 0, void 0, void 0, function* () {
        const todo = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo early date', description: 'Test description', dueDate: '2023/02/01' });
        const todo2 = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo later date', description: 'Test description 2', dueDate: '2023/03/01' });
        const res = yield requestTest(app_1.default).patch('/todos');
        console.log(res.body.data);
        expect(res.body.data.length).to.equal(2);
        expect(res.body.data[0].title).to.equal('Test Todo early date');
        expect(res.body.data[1].title).to.equal('Test Todo later date');
        expect(res.statusCode).to.equal(200);
    }));
    it('should find todos based key words for title', () => __awaiter(void 0, void 0, void 0, function* () {
        const todo = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01' });
        const todo2 = yield requestTest(app_1.default)
            .post('/todos')
            .send({ title: 'Test Todo 2', description: 'Test description 2', dueDate: '2023/03/01' });
        const res = yield requestTest(app_1.default).get(`/todos/findTodo/${"Test"}`);
        expect(res.statusCode).to.equal(200);
        expect(res.body.data.length).to.equal(2);
        expect(res.body.data[0]).to.have.property('title', 'Test Todo');
        expect(res.body.data[1]).to.have.property('title', 'Test Todo 2');
        const res_two = yield requestTest(app_1.default).get(`/todos/findTodo/${"2"}`);
        expect(res_two.statusCode).to.equal(200);
        expect(res_two.body.data.length).to.equal(1);
        expect(res_two.body.data[0]).to.have.property('title', 'Test Todo 2');
    }));
}));
