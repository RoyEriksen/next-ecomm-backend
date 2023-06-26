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

describe("POST /api/users", () => {
  const user = {
    firstName: 'John',
    lastName: 'Wilson',
    email: 'john9@example.com',
    password: 'insecure',
  }
  beforeAll(async () => {
    await cleanupDatabase()

  })

  afterAll(async () => {
    await cleanupDatabase()
  })

  it("with valid data should return 200", async () => {
    const response = await request(app)
      .post("/api/users")
      .send(user)
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeTruthy();
    expect(response.body.firstName).toBe(user.firstName);
    expect(response.body.lastName).toBe(user.lastName);
    expect(response.body.email).toBe(user.email);
    expect(response.body.password).toBe(undefined); // check if password exists
  });
})