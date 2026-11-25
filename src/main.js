import { deriveLevels } from "./lsystem.js";
import "./style.css";

const grammar = {
  axiom: "A",
  rules: {
    A: "AB",
    B: "A"
  },
  iterations: 3
};

const derivation = document.querySelector("#derivation");
const levels = deriveLevels(grammar);

derivation.textContent = levels
  .map((value, iteration) => `Iteration ${iteration}: ${value}`)
  .join("\n");
