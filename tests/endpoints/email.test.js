import { PrismaClient, Prisma } from '@prisma/client'
import request from "supertest"
import app from "../../app.js"

async function cleanupDatabase() {
  const prisma = new PrismaClient();
  const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name);

  return Promise.all(
    modelNames.map((modelName) => prisma[modelName.toLowerCase()].deleteMany())
  );
}

describe("POST /api/login", () => {
  const user = {
    firstName: 'John',
    lastName: 'Wilson',
    email: 'john9',
    password: 'insecure',
  }

  beforeAll(async () => {
    await cleanupDatabase()

  })

  afterAll(async () => {
    await cleanupDatabase()
  })

  it("with invalid email format should return an error", async () => {
    const response = await request(app)
      .post('/api/login')
      .send(user)
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('User does not exist'); // check if password exists
  });
})