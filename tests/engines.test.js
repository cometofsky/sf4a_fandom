import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateStat,
  getDefenseMitigation,
  calculateDamage,
  generateBuildCode,
  parseBuildCode,
  simulateCombatLoop
} from '../js/engines.js';

test('calculateStat scales multiplicatively with hero and dojo levels', () => {
  // Base 100 at L1/L1 = 100
  assert.equal(calculateStat(100, 1, 1), 100);

  // At L13/L13: 100 * (1 + 12*0.1) * (1 + 12*0.1) = 100 * 2.2 * 2.2 = 484
  assert.equal(calculateStat(100, 13, 13), 484);

  // At L5/L7: 100 * (1 + 4*0.1) * (1 + 6*0.1) = 100 * 1.4 * 1.6 = 224
  assert.equal(calculateStat(100, 5, 7), 224);
});

test('getDefenseMitigation follows hyperbolic D / (D + 150) curve', () => {
  // Defense 150 -> 150 / (150 + 150) = 0.5
  assert.equal(getDefenseMitigation(150), 0.5);

  // Defense 0 -> 0
  assert.equal(getDefenseMitigation(0), 0);

  // Defense 300 -> 300 / 450 = 2/3
  assert.ok(Math.abs(getDefenseMitigation(300) - (2 / 3)) < 1e-6);
});

test('calculateDamage returns correct raw and mitigated damage', () => {
  const result = calculateDamage({
    attackerAttack: 120,
    defenderDefense: 150, // 50% mitigation
    actionPower: 110,     // 1.1 multiplier
    talentMultiplier: 1.0,
    weaponMultiplier: 1.0
  });

  // rawDamage = 120 * 1.1 = 132
  assert.equal(result.rawDamage, 132);
  // mitigatedDamage = 132 * 0.5 = 66
  assert.equal(result.mitigatedDamage, 66);
  assert.equal(result.mitigationPercent, 50.0);
});

test('generateBuildCode and parseBuildCode handle two-way conversion correctly', () => {
  const code = generateBuildCode("marcus", 1, [0, 1, 0, 1, 1]);
  assert.equal(code, "MAR-1-LRLRR");

  const parsed = parseBuildCode(code);
  assert.deepEqual(parsed, {
    valid: true,
    heroPrefix: "MAR",
    weaponIdx: 1,
    talents: [0, 1, 0, 1, 1]
  });
});

test('parseBuildCode handles invalid codes gracefully', () => {
  assert.equal(parseBuildCode(null), null);
  assert.equal(parseBuildCode("INVALID"), null);
  assert.equal(parseBuildCode("MAR-10-LLLLL"), null); // weaponIdx out of range
  assert.equal(parseBuildCode("MAR-1-LL"), null);     // wrong talent length
});

test('simulateCombatLoop calculates valid DPS and hits to KO', () => {
  const sim = simulateCombatLoop(
    { name: "Marcus", attack: 200, actionPower: 180, hitsPerSec: 1.0, critChance: 0.2 },
    { name: "Itu", defense: 150, hp: 1000 }
  );

  assert.ok(sim.dps > 0);
  assert.ok(sim.hitsToKO > 0);
  assert.ok(sim.combatLog.length > 0);
});
