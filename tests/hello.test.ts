import assert from "node:assert/strict";
import { test } from "node:test";
import request from "supertest";
import { createApp } from "../src/app.js";

test("GET / renders the Hello world page", async () => {
  const response = await request(createApp()).get("/");

  assert.equal(response.status, 200);
  assert.match(response.headers["content-type"] ?? "", /text\/html/);
  assert.match(response.text, /<title>Thoughts From<\/title>/);
  assert.match(response.text, /<h1>Hello world<\/h1>/);
});

test("GET / trims and renders a supplied name", async () => {
  const response = await request(createApp())
    .get("/")
    .query({ name: "  Ada  " });

  assert.equal(response.status, 200);
  assert.match(response.text, /<h1>Hello Ada<\/h1>/);
});

test("GET / escapes user input in the rendered HTML", async () => {
  const response = await request(createApp())
    .get("/")
    .query({ name: '<script>alert("hello")</script>' });

  assert.equal(response.status, 200);
  assert.match(response.text, /&lt;script&gt;/);
  assert.doesNotMatch(response.text, /<script>/);
});

for (const name of ["", "   ", "a".repeat(81), ["Ada", "Grace"]]) {
  test(`GET / rejects an invalid name: ${JSON.stringify(name)}`, async () => {
    const response = await request(createApp()).get("/").query({ name });

    assert.equal(response.status, 400);
    assert.deepEqual(response.body, {
      error: {
        code: "invalid_request",
        message: "Name must be a single string between 1 and 80 characters.",
      },
    });
  });
}
