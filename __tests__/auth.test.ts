import request from "supertest";

describe("AuthController", () => {
  it("should create a new user", async () => {
    const res = await request("http://localhost:8080")
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
    const res = await request("http://localhost:8080")
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
