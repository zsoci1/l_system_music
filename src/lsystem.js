/**
 * @typedef {{
 *   axiom: string,
 *   rules: Record<string, string>,
 *   iterations: number
 * }} Grammar
 */

/**
 * Minden iterációban egyszerre alkalmazza a szabályokat az aktuális szöveg
 * minden szimbólumára; a szabály nélküli szimbólumok változatlanok maradnak.
 *
 * @param {Grammar} grammar
 * @returns {string}
 */
export function derive(grammar) {
  const { axiom, rules, iterations } = grammar;

  if (!Number.isInteger(iterations) || iterations < 0) {
    throw new TypeError("iterations must be a non-negative integer");
  }

  let current = axiom;

  for (let iteration = 0; iteration < iterations; iteration += 1) {
    let next = "";

    for (const symbol of current) {
      next += Object.hasOwn(rules, symbol) ? rules[symbol] : symbol;
    }

    current = next;
  }

  return current;
}

/**
 * Visszaadja az összes levezetési szintet, a kezdő axiómát is beleértve.
 *
 * @param {Grammar} grammar
 * @returns {string[]}
 */
export function deriveLevels(grammar) {
  const levels = [grammar.axiom];
  let current = grammar.axiom;

  for (let iteration = 0; iteration < grammar.iterations; iteration += 1) {
    current = derive({
      ...grammar,
      axiom: current,
      iterations: 1
    });
    levels.push(current);
  }

  return levels;
}
