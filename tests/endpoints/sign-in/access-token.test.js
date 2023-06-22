import { PrismaClient, Prisma } from '@prisma/client';
import request from 'supertest';
import app from '../../../app.js';

async function cleanupDatabase() {
  const prisma = new PrismaClient();
  const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name);

  return Promise.all(
    modelNames.map((modelName) => prisma[modelName.toLowerCase()].deleteMany())
  );
}

describe('User API', () => {
  const user = {
    firstName: 'John',
    lastName: 'Wilson',
    email: 'john9@example.com',
    password: 'insecure',
  };

  beforeAll(async () => {
    await cleanupDatabase()

  })

  afterAll(async () => {
    await cleanupDatabase()
  })

  it('should create a new user and return a token when logged in', async () => {
    // Create a new user
    const createUserResponse = await request(app)
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json');

    expect(createUserResponse.statusCode).toBe(200);

    // Log in the created user
    const loginResponse = await request(app)
      .post('/api/login')
      .send({ email: user.email, password: user.password })
      .set('Accept', 'application/json');
      

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.accessToken).toBeDefined();
  });
})
