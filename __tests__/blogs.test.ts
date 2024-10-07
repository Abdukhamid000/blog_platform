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

  it("should create a new blog post", async () => {
    const res = await request(app)
      .post("/blogs")
      .send({
        title: "test",
        content: "this is test",
        tags: ["test"],
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);

    expect(res.body).toHaveProperty("title", "test");
    expect(res.body).toHaveProperty("content", "this is test");
    expect(res.body).toHaveProperty("tags", ["test"]);
  });

  it("should edit blog post", async () => {
    const res = await request(app)
      .patch("/blogs")
      .send({
        author_id: "08835c10-1dfe-4e8d-9869-129afdf3a4b1",
        title: "updated test",
        content: "updated test",
        tags: ["updated test"],
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
  });

  it("should get all blog posts", async () => {
    const res = await request(app).get("/blogs");

    expect(res.status).toBe(200);
  });
});
