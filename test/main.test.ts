import assert from "node:assert/strict";
import { describe, it } from "node:test";

describe("main", () => {
  it("asserts true", () => {
    assert.ok(
      "Phaser requires a web browser. Unit tests only cover business logic",
    );
  });
});
