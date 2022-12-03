const request = require('supertest');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbHandler = require('./db-handler');
const TaskModel = require('../models/task.model');

app.use(require('../router'));

// It's just so easy to connect to the MongoDB Memory Server
// By using mongoose.connect
beforeAll(async () => dbHandler.connect());
afterEach(async () => dbHandler.clearDatabase());
afterAll(async () => dbHandler.closeDatabase());

describe('TaskController', () => {
  /* test */
  it('should return empty array on empty database', async (done) => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(0);
    done();
  });

  /* test */
  it('should return not deleted tasks', async (done) => {
    await request(app)
      .post('/tasks')
      .send({
        name: 'test',
        category: 'test',
        public_template: true,
        private_template: true,
        deleted: false
      });
    await request(app)
      .post('/tasks')
      .send({
        name: 'test',
        category: 'test',
        public_template: true,
        private_template: true,
        deleted: true
      });
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(1);
    done();
  });

  /* test */
  it('should create task', async (done) => {
    const name = 'tanden poetsen';
    const res = await request(app)
      .post('/tasks')
      .send({
        name,
        description: 'poets je tanden',
        symbol: 'testurl',
        category: 'normal',
        public_template: false,
        private_template: true,
        user_id: '0023244324djkfdsfsdnjfks',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.name).toBe(name);
    const id = res.body.data._id

    const foundTask = await request(app).get('/task/' + id);
    expect(foundTask.body.data.name).toBe(name);

    done();
  });

  /* test */
  it('should not add not existing value to a task', async (done) => {
    const name = 'tanden poetsen';
    const res = await request(app)
      .post('/tasks')
      .send({
        name,
        description: 'poets je tanden',
        symbol: 'testurl',
        category: 'normal',
        public_template: false,
        private_template: true,
        not_existing_value: 'bestaat niet',
        user_id: '0023244324djkfdsfsdnjfks',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.name).toBe(name);
    const id = res.body.data._id

    const foundTask = await request(app).get('/task/' + id);
    expect(foundTask.body.data.not_existing_value).toBe(undefined);

    done();
  });

  /* test */
  it('should not create a task when data is missing', async (done) => {
    const name = 'tanden poetsen';
    const res = await request(app)
      .post('/tasks');
    expect(res.status).toBe(400);
    done();
  });

  /* test */
  it('it should update a value of task', async (done) => {
    const name = 'tanden poetsen';
    const res = await request(app)
      .post('/tasks')
      .send({
        name: 'test',
        description: 'poets je tanden',
        category: 'normal',
        public_template: false,
        private_template: true,
      });
    const id = res.body.data._id

    const foundTask = await request(app)
      .put('/task/' + id)
      .send({
        name: name
      });
    expect(foundTask.status).toBe(200);

    expect(foundTask.body.data.name).toBe(name);
    done();
  });

  /* test */
  it('it should not update a value of task when illegal data is send', async (done) => {
    const res = await request(app)
      .post('/tasks')
      .send({
        name: 'test',
        description: 'poets je tanden',
        category: 'normal',
        public_template: false,
        private_template: true,
      });
    const id = res.body.data._id

    const failedPut = await request(app)
      .put('/task/' + id)
      .send({
        name: ''
      });
    expect(failedPut.status).toBe(400);
    const foundTask = await request(app).get('/task/' + id);
    expect(foundTask.body.data.name).toBe('test');

    done();
  });

  /* test */
  it('it should delete a task', async (done) => {
    const name = 'tanden poetsen';
    const res = await request(app)
      .post('/tasks')
      .send({
        name: 'test',
        description: 'poets je tanden',
        category: 'normal',
        public_template: false,
        private_template: true,
      });
    const id = res.body.data._id

    const foundTask = await request(app)
      .delete('/task/' + id)
    expect(foundTask.status).toBe(200);

    expect(foundTask.body.data.deleted).toBe(true);
    done();
  });

  /* test */
  it('it should add tasks to a task', async (done) => {
    const mainTask = await request(app)
      .post('/tasks')
      .send({
        name: 'maintask',
        description: 'poets je tanden',
        category: 'normal',
        public_template: false,
        private_template: true,
      });
    const mainTask_id = mainTask.body.data._id

    const subtask1 = await request(app)
      .post('/tasks')
      .send({
        name: 'test',
        category: 'test',
        public_template: true,
        private_template: true,
        deleted: false
      });
    const subtask1_id = subtask1.body.data._id;

    const subtask2 = await request(app)
      .post('/tasks')
      .send({
        name: 'test',
        category: 'test',
        public_template: true,
        private_template: true,
        deleted: true
      });
    const subtask2_id = subtask2.body.data._id;

    const tasks = [
      {
        _id: subtask1_id,
        position: 1,
        time: "09:30",
      }, {
        _id: subtask2_id,
        position: 2,
        time: "10:30",
      }
    ];
    
    const addedToTask = await request(app)
      .put('/task/bindToTask/' + mainTask_id)
      .send({
        tasks: tasks,
      });
    expect(addedToTask.body.data.tasks).toStrictEqual(tasks);
    done();
  });
});
