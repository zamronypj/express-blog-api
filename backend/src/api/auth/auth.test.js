import assert from 'assert';
import supertest from 'supertest';
import app from '../../app';
import User from '../users/users.model';
import authService from '../auth/auth.service';

const api = supertest(app);

beforeEach(async () => {
  await User.deleteOne({ email: 'test@test.com' });
  await User.deleteOne({ email: 'testLogin@test.com' });
  await authService.signup({
    email: 'testLogin@test.com',
    password: '123456',
    firstName: "TestLogin",
    lastName: "LastNameLogin"
  });
});

describe('GET /login', function() {
  it('should return 200', async function() {
    await api
      .post('/api/v1/auth/login')
      .send({ email: 'testLogin@test.com', password: '123456' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('GET /signup', function() {
  it('should return 201', async function() {
    await api
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: '123456',
        firstName: 'Test',
        lastName: 'Test Last Name'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
  });
});
