const request = require('supertest');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbHandler = require('./db-handler');
const FacilityModel = require('../models/facility.model');

app.use(require('../router'));

// It's just so easy to connect to the MongoDB Memory Server
// By using mongoose.connect
beforeAll(async () => dbHandler.connect());
afterEach(async () => dbHandler.clearDatabase());
afterAll(async () => dbHandler.closeDatabase());

describe('FacilityController', () => {
  /* test */
  it('should return empty array on empty database', async (done) => {
    const res = await request(app).get('/facilities');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(0);
    done();
  });

  /* test */
  it('should return not deleted facility', async (done) => {
    await request(app)
      .post('/facilities')
      .send({
        name: 'test',
        email: 'test@test.nl',
        phonenumber: '0612345678',
        zipcode: '1234AB',
        housenumber: '12',
        deleted: false
      });
    await request(app)
      .post('/facilities')
      .send({
        name: 'test',
        email: 'test@test.nl',
        phonenumber: '0612345678',
        zipcode: '1234AB',
        housenumber: '12',
        deleted: true
      });
    const res = await request(app).get('/facilities');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(1);
    done();
  });

  /* test */
  it('should create facility', async (done) => {
    const name = 'test';
    const res = await request(app)
      .post('/facilities')
      .send({
        name,
        email: 'test@test.nl',
        phonenumber: '0612345678',
        zipcode: '1234AB',
        housenumber: '12',
        deleted: true
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.name).toBe(name);
    const id = res.body.data._id

    const foundFacility = await request(app).get('/facility/' + id);
    expect(foundFacility.body.data.name).toBe(name);

    done();
  });

  /* test */
  it('should not create facility when email does not match regex', async (done) => {
    const name = 'test';
    const res = await request(app)
      .post('/facilities')
      .send({
        name,
        email: 'test', //wrong mail
        phonenumber: '0612345678',
        zipcode: '1234AB',
        housenumber: '12',
        deleted: true
      });
    expect(res.status).toBe(400);
    expect(res.body.error.errors.email).toHaveProperty('message');
    done();
  });

  /* test */
  it('should not create facility when phonenumber does not match regex', async (done) => {
    const name = 'test';
    const res = await request(app)
      .post('/facilities')
      .send({
        name,
        email: 'test@test.nl',
        phonenumber: '06123456', //wrong phonenumber
        zipcode: '1234AB',
        housenumber: '12',
        deleted: true
      });
    expect(res.status).toBe(400);
    expect(res.body.error.errors.phonenumber).toHaveProperty('message');
    done();
  });

  /* test */
  it('should not create facility when zipcode does not match regex', async (done) => {
    const name = 'test';
    const res = await request(app)
      .post('/facilities')
      .send({
        name,
        email: 'test@test.nl',
        phonenumber: '0612345678',
        zipcode: '1234', //wrong zipcode
        housenumber: '12',
        deleted: true
      });
    expect(res.status).toBe(400);
    expect(res.body.error.errors.zipcode).toHaveProperty('message');
    done();
  });


  /* test */
  it('should not add not existing value to a facility', async (done) => {
    const name = 'test';
    const res = await request(app)
      .post('/facilities')
      .send({
        name,
        email: 'test@test.nl',
        phonenumber: '0612345678',
        zipcode: '1234AB',
        housenumber: '12',
        not_existing_value: 'bestaat niet',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.name).toBe(name);
    const id = res.body.data._id

    const foundFacility = await request(app).get('/facility/' + id);
    expect(foundFacility.body.data.not_existing_value).toBe(undefined);

    done();
  });

  /* @test */
  it('should not create a facility when data is missing', async (done) => {
    const res = await request(app)
      .post('/facilities');
    expect(res.status).toBe(400);
    done();
  });

  /* test */
  it('it should update a value of facility', async (done) => {
    const name = 'test';
    const res = await request(app)
      .post('/facilities')
      .send({
        name,
        email: 'test@test.nl',
        phonenumber: '0612345678',
        zipcode: '1234AB',
        housenumber: '12',
      });
    const id = res.body.data._id

    const foundFacility = await request(app)
      .put('/facility/' + id)
      .send({
        name: name
      });

    expect(foundFacility.body.data.name).toBe(name);
    done();
  });

  /* test */
  it('it should delete a facility', async (done) => {
    const name = 'facility';
    const res = await request(app)
      .post('/facilities')
      .send({
        name,
        email: 'test@test.nl',
        phonenumber: '0612345678',
        zipcode: '1234AB',
        housenumber: '12',
      });
    const id = res.body.data._id

    const foundFacility = await request(app)
      .delete('/facility/' + id)

    expect(foundFacility.body.data.deleted).toBe(true);
    done();
  });

  /* test */
  it('it should add multiple users to a facility and the facility to the users', async (done) => {
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

    //create user2
    const user2 = await request(app)
      .post('/users')
      .send({
        firstname: 'Jan2',
        lastname: 'Pietersen2',
        role: 'normal',
        email: 'test@test2.nl',
        password: '1234567892',
      });
    const user2_id = user2.body.data._id

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

    //bind facillities to user
    const userBindedToFacility = await request(app)
      .put('/facility/bindToUser/' + facility_id)
      .send({
        user_id: [user2_id, user_id],
      });

    expect(userBindedToFacility.status).toBe(200);
    expect(userBindedToFacility.body.data.users).toStrictEqual([user2_id, user_id]);

    //get the user to check if the user is added to the facility too
    const bindedFacility = await request(app)
      .get('/user/' + user_id);
    expect(bindedFacility.body.data.facilities).toStrictEqual([facility_id]);

    done();
  });

  /* test */
  it('it should remove multiple users from a facility and the facility from the users', async (done) => {
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

    //create user2
    const user2 = await request(app)
      .post('/users')
      .send({
        firstname: 'Jan2',
        lastname: 'Pietersen2',
        role: 'normal',
        email: 'test@test2.nl',
        password: '1234567892',
      });
    const user2_id = user2.body.data._id

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

    //bind user to facility
    const userBindedToFacility = await request(app)
      .put('/facility/bindToUser/' + facility_id)
      .send({
        user_id: [user2_id, user_id],
      });


    //unbind user from facility
    const userUnbindedToFacility = await request(app)
      .put('/facility/unbindToUser/' + facility_id)
      .send({
        user_id: [user2_id, user_id],
      });

    expect(userUnbindedToFacility.status).toBe(200);
    expect(userUnbindedToFacility.body.data.users).toStrictEqual([]);

    //get the user to check if the user is added to the facility too
    const bindedFacility = await request(app)
      .get('/user/' + user_id);
    expect(bindedFacility.body.data.facilities).toStrictEqual([]);

    done();
  });
});
