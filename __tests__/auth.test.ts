import app from "../src/app";
import request from "supertest";
import { AppDataSource } from "../src/data-source";

describe("AuthController", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should create a new user", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({
        username: "test15",
        email: "test15@gmail14.com",
        password: "test123",
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);

    expect(res.body).toHaveProperty("username", "test15");
    expect(res.body).toHaveProperty("email", "test15@gmail14.com");
    expect(res.body).toHaveProperty("role", "user");
  });

  it("should login user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test15@gmail14.com",
        password: "test123",
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
