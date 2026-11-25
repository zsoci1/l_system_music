import test from "node:test";
import assert from "node:assert/strict";
import { derive, deriveLevels } from "../src/lsystem.js";

const fibonacciGrammar = {
  axiom: "A",
  rules: {
    A: "AB",
    B: "A"
  },
  iterations: 3
};

test("derives the deterministic example in parallel", () => {
  assert.deepEqual(deriveLevels(fibonacciGrammar), ["A", "AB", "ABA", "ABAAB"]);
});

test("zero iterations return the axiom", () => {
  assert.equal(derive({ ...fibonacciGrammar, iterations: 0 }), "A");
});

test("symbols without productions pass through unchanged", () => {
  assert.equal(
    derive({ axiom: "AX", rules: { A: "AB" }, iterations: 1 }),
    "ABX"
  );
});

test("rejects negative or non-integer iteration counts", () => {
  assert.throws(
    () => derive({ ...fibonacciGrammar, iterations: -1 }),
    /iterations must be a non-negative integer/
  );
  assert.throws(
    () => derive({ ...fibonacciGrammar, iterations: 1.5 }),
    /iterations must be a non-negative integer/
  );
});
