const request = require('supertest');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbHandler = require('./db-handler');

app.use(require('../router'));

// It's just so easy to connect to the MongoDB Memory Server
// By using mongoose.connect
beforeAll(async () => dbHandler.connect());
afterEach(async () => dbHandler.clearDatabase());
afterAll(async () => dbHandler.closeDatabase());

describe('UserController', () => {
  /* test */
  it('should return empty array on empty database', async (done) => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(0);
    done();
  });

  /* test */
  it('should return not deleted users', async (done) => {
    await request(app)
      .post('/users')
      .send({
        firstname: 'test',
        lastname: 'test',
        role: 'normal',
        email: 'test@test.test',
        password: 'password',
        deleted: false
      });
    await request(app)
      .post('/users')
      .send({
        firstname: 'test',
        lastname: 'test',
        role: 'normal',
        email: 'test@test.test',
        password: 'password',
        deleted: true
      });
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(1);
    done();
  });

  /* test */
  it('should create user', async (done) => {
    const name = 'voornaam';
    const res = await request(app)
      .post('/users')
      .send({
        firstname: name,
        lastname: 'test',
        role: 'normal',
        email: 'test@test.test',
        password: 'password',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.firstname).toBe(name);
    const id = res.body.data._id

    const foundUsers = await request(app).get('/user/' + id);
    expect(foundUsers.body.data.firstname).toBe(name);

    done();
  });

  /* test */
  it('should not add not existing value to a user', async (done) => {
    const name = 'voornaam';
    const res = await request(app)
      .post('/users')
      .send({
        firstname: name,
        lastname: 'test',
        role: 'normal',
        email: 'test@test.test',
        password: 'password',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.firstname).toBe(name);
    const id = res.body.data._id

    const foundUser = await request(app).get('/user/' + id);
    expect(foundUser.body.data.not_existing_value).toBe(undefined);

    done();
  });

  /* @test */
  it('should not create a user when data is missing', async (done) => {
    const res = await request(app)
      .post('/users');
    expect(res.status).toBe(400);
    done();
  });

  /* test */
  it('it should update a value of user', async (done) => {
    const name = 'voornaam';
    const res = await request(app)
      .post('/users')
      .send({
        firstname: 'test',
        lastname: 'test',
        role: 'normal',
        email: 'test@test.test',
        password: 'password',
      });
    const id = res.body.data._id

    const foundUser = await request(app)
      .put('/user/' + id)
      .send({
        firstname: name
      });
    expect(foundUser.status).toBe(200);

    expect(foundUser.body.data.firstname).toBe(name);
    done();
  });

  /* test */
  it('it should not update a value of user when illegal data is send', async (done) => {
    const res = await request(app)
      .post('/users')
      .send({
        firstname: 'test',
        lastname: 'test',
        role: 'normal',
        email: 'test@test.test',
        password: 'password',
      });
    const id = res.body.data._id

    const failedPut = await request(app)
      .put('/user/' + id)
      .send({
        email: 'test'
      });
    expect(failedPut.status).toBe(400);
    const foundUser = await request(app).get('/user/' + id);
    expect(foundUser.body.data.email).toBe('test@test.test');

    done();
  });

  /* test */
  it('it should delete a user', async (done) => {
    const name = 'tanden poetsen';
    const res = await request(app)
      .post('/users')
      .send({
        firstname: 'test',
        lastname: 'test',
        role: 'normal',
        email: 'test@test.test',
        password: 'password',
      });
    const id = res.body.data._id

    const foundUser = await request(app)
      .delete('/user/' + id)
    expect(foundUser.status).toBe(200);

    expect(foundUser.body.data.deleted).toBe(true);
    done();
  });

  /* test */
  it('it should add a facility to a user and the user to the facility', async (done) => {
    //create user
    const user = await request(app)
      .post('/users')
      .send({
        firstname: 'Jan',
        lastname: 'Pietersen',
        role: 'normal',
        email: 'test@test.nl',
        password: '123456789',
      });
    const user_id = user.body.data._id

    //create facilty 1
    const facility = await request(app)
      .post('/facilities')
      .send({
        name: 'test',
        email: 'test@test.nl',
        phonenumber: '0612345678',
        zipcode: '1234AB',
        housenumber: '12',
      });
    const facility_id = facility.body.data._id

    //create facility 2
    const facility2 = await request(app)
      .post('/facilities')
      .send({
        name: 'test2',
        email: 'test@test.nl',
        phonenumber: '0612345678',
        zipcode: '1234AB',
        housenumber: '12',
      });
    const facility2_id = facility2.body.data._id

    //bind facility 1 to user
    await request(app)
      .put('/user/bindToFacility/' + user_id)
      .send({
        facility_id: facility_id,
      });

    //bind facility 2 to user
    const userBindedToFacility = await request(app)
      .put('/user/bindToFacility/' + user_id)
      .send({
        facility_id: facility2_id,
      });

    expect(userBindedToFacility.status).toBe(200);

    expect(userBindedToFacility.body.data.facilities).toStrictEqual([facility_id, facility2_id]);

    //get the facility to check if the user is added to the facility too
    const bindedFacility = await request(app)
      .get('/facility/' + facility_id);
    expect(bindedFacility.body.data.users).toStrictEqual([user_id]);

    done();
  });

  /* test */
  it('it should not add the same facility to a user twice', async (done) => {
    //create user
    const user = await request(app)
      .post('/users')
      .send({
        firstname: 'Jan',
        lastname: 'Pietersen',
        role: 'normal',
        email: 'test@test.nl',
        password: '123456789',
      });
    const user_id = user.body.data._id

    //create facilty 1
    const facility = await request(app)
      .post('/facilities')
      .send({
        name: 'test',
        email: 'test@test.nl',
        phonenumber: '0612345678',
        zipcode: '1234AB',
        housenumber: '12',
      });
    const facility_id = facility.body.data._id

    //bind facility 1 to user
    await request(app)
      .put('/user/bindToFacility/' + user_id)
      .send({
        facility_id: facility_id,
      });

    //bind facility 1 for the second time to user
    const userBindedToFacility = await request(app)
      .put('/user/bindToFacility/' + user_id)
      .send({
        facility_id: facility_id,
      });


    expect(userBindedToFacility.status).toBe(200);

    expect(userBindedToFacility.body.data.facilities).toStrictEqual([facility_id]);
    done();
  });

  /* test */
  it('it should unbind a facility from a user and the user from the facility', async (done) => {
    //create user
    const user = await request(app)
      .post('/users')
      .send({
        firstname: 'Jan',
        lastname: 'Pietersen',
        role: 'normal',
        email: 'test@test.nl',
        password: '123456789',
      });
    const user_id = user.body.data._id

    //create facilty 1
    const facility = await request(app)
      .post('/facilities')
      .send({
        name: 'test',
        email: 'test@test.nl',
        phonenumber: '0612345678',
        zipcode: '1234AB',
        housenumber: '12',
      });
    const facility_id = facility.body.data._id

    //bind facility 1 to user
    const userBindedToFacility = await request(app)
      .put('/user/bindToFacility/' + user_id)
      .send({
        facility_id: facility_id,
      });

    expect(userBindedToFacility.body.data.facilities).toStrictEqual([facility_id]);

    //unbind facility 1 to user
    const userUnbindedToFacility = await request(app)
      .delete('/user/bindToFacility/' + user_id)
      .send({
        facility_id: facility_id,
      });

    expect(userUnbindedToFacility.status).toBe(200);
    expect(userUnbindedToFacility.body.data.facilities).toStrictEqual([]);

    //get the facility to check if the user is deleted from facility too
    const unbindedFacility = await request(app)
      .get('/facility/' + facility_id);

    expect(unbindedFacility.body.data.users).toStrictEqual([]);
    done();
  });
});
