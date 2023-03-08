const requestTest = require('supertest');
import app from "../app"
import Todo from "../models/todos";
const { expect } = require('chai');

describe('Todo API Test', async() => {

    beforeEach(async () => {
        await Todo.deleteMany();
    });

    it('should create a new todo', async () => {
        const res = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01'})
        expect(res.body.data).to.have.property('title', 'Test Todo');
        expect(res.body.data).to.have.property('description', 'Test description');
        expect(res.body.data).to.have.property('dueDate');
        expect(res.body.data).to.have.property('completed');

        expect(res.body.data).to.have.property('_id');
        expect(res.body.data).to.have.property('priority');
        expect(res.body.data._id).to.be.a('string');
        expect(res.statusCode).to.equal(200);

        const createdTodo = await Todo.findById(res.body.data._id);
        expect(createdTodo).to.have.property('title', 'Test Todo');
        expect(createdTodo).to.have.property('description', 'Test description');
        expect(createdTodo).to.have.property('dueDate');
        expect(createdTodo).to.have.property('completed');
        expect(createdTodo).to.have.property('priority');
    });


    it('should return all todos', async () => {
        const todo = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01'})
        const res = await requestTest(app).get('/todos');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data).to.have.lengthOf.at.least(1);
        expect(res.statusCode).to.equal(200);
    });

    it('should update a specific todo', async () => {
        const todo = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description'});
        expect(todo.body.data).to.have.property('title', 'Test Todo');
        expect(todo.body.data).to.have.property('description', 'Test description');
        const id = todo.body.data._id;
        const res = await requestTest(app)
            .patch(`/todos/${id}`)
            .send({ title: 'Updated Todo' });
        expect(res.body.data).to.have.property('title', 'Updated Todo');
        expect(res.body.data).to.have.property('description', 'Test description');
        expect(res.statusCode).to.equal(200);
    });

    it('should return error with missing title', async () => {
        const res = await requestTest(app)
            .post('/')
            .send({ description: 'Test describtion'});
        expect(res.statusCode).to.equal(500);
    });

    it('should return error with missing description', async () => {
        const res = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test title'});
        expect(res.statusCode).to.equal(500);
    });

    it('should create default priority eqauls to 1', async () => {
        const res = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01'})
        expect(res.body.data).to.have.property('priority', 1);
        expect(res.statusCode).to.equal(200);
        
    });

    it('should create default completed eqauls to false', async () => {
        const res = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01'})
        expect(res.body.data).to.have.property('completed', false);
        expect(res.statusCode).to.equal(200);
        
    });

    it('should delete a specific todo', async () => {
        const todo = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01'})
        const id = todo.body.data._id;
        const res = await requestTest(app).delete(`/todos/${id}`);
        const findSpecificTodo = await Todo.findById(id);
        expect(!findSpecificTodo);
        expect(res.statusCode).to.equal(200);
    });

    it('should clear all todos', async () => {
        const todo = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01'})
        const todo2 = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo 2', description: 'Test description 2',  dueDate: '2023/03/01' });
        const res = await requestTest(app).delete('/todos');
        const findSpecificTodoOne = await Todo.findById(todo.body.data._id);
        const findSpecificTodoTwo = await Todo.findById(todo2.body.data._id);
        expect(!findSpecificTodoOne && !findSpecificTodoTwo);
        expect(res.statusCode).to.equal(200);
    });


    it('should prioritize todos', async () => {
        const todo = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01', priority: 5})
        const todo2 = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo 2', description: 'Test description 2',  dueDate: '2023/03/01', priority: 2});
        const res = await requestTest(app).get('/todos/prioritizeToDo');
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data.length).to.equal(2);
        expect(res.body.data[0].priority).to.be.greaterThan(res.body.data[1].priority);
    });


    it('should sort todos based on due dates', async () => {
        const todo = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo early date', description: 'Test description', dueDate: '2023/02/01'})
        const todo2 = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo later date', description: 'Test description 2',  dueDate: '2023/03/01' });
        const res = await requestTest(app).patch('/todos');
        console.log(res.body.data);
        expect(res.body.data.length).to.equal(2);
        expect(res.body.data[0].title).to.equal('Test Todo early date');
        expect(res.body.data[1].title).to.equal('Test Todo later date');
        expect(res.statusCode).to.equal(200);
    });


    it('should find todos based key words for title', async () => {
        const todo = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo', description: 'Test description', dueDate: '2023/03/01'})
        const todo2 = await requestTest(app)
            .post('/todos')
            .send({ title: 'Test Todo 2', description: 'Test description 2',  dueDate: '2023/03/01' });
        const res = await requestTest(app).get(`/todos/findTodo/${"Test"}`);
        expect(res.statusCode).to.equal(200);
        expect(res.body.data.length).to.equal(2);
        expect(res.body.data[0]).to.have.property('title', 'Test Todo');
        expect(res.body.data[1]).to.have.property('title', 'Test Todo 2');

        const res_two = await requestTest(app).get(`/todos/findTodo/${"2"}`);
        expect(res_two.statusCode).to.equal(200);
        expect(res_two.body.data.length).to.equal(1);
        expect(res_two.body.data[0]).to.have.property('title', 'Test Todo 2');
    });
});