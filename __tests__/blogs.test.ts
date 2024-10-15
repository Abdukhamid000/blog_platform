import request from "supertest";

describe("AuthController", () => {
  it("should create a new blog post", async () => {
    const res = await request("http://localhost:8080")
      .post("/blogs")
      .send({
        author_id: "08835c10-1dfe-4e8d-9869-129afdf3a4b1",
        title: "test",
        content: "this is test",
        tags: ["test"],
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("title", "test");
    expect(res.body.data).toHaveProperty("content", "this is test");
    expect(res.body.data).toHaveProperty("tags", ["test"]);
  });

  it("should edit blog post", async () => {
    const res = await request("http://localhost:8080")
      .patch("/blogs/03e37225-cc73-41b7-91ec-43e9befe32bc")
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
    const res = await request("http://localhost:8080").get("/blogs");

    expect(res.status).toBe(200);
  });

  it("should delete blog post", async () => {
    const res = await request("http://localhost:8080").delete(
      "/blogs/08835c10-1dfe-4e8d-9869-129afdf3a4b1"
    );

    expect(res.status).toBe(200);
  });
});
