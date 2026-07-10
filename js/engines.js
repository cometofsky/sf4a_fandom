// Pure Mathematical Engines & Combat Simulation Logic
import { CONFIG } from './config.js';

/**
 * Calculates a scaled stat based on multiplicative Hero and Dojo levels.
 * @param {number} baseValue
 * @param {number} heroLevel - [1..13]
 * @param {number} dojoLevel - [1..13]
 * @returns {number}
 */
export function calculateStat(baseValue, heroLevel = 1, dojoLevel = 1) {
  const hLevel = Math.max(1, Math.min(13, Number(heroLevel) || 1));
  const dLevel = Math.max(1, Math.min(13, Number(dojoLevel) || 1));
  const hMult = 1 + (hLevel - 1) * CONFIG.MATH.LEVEL_STAT_MULTIPLIER;
  const dMult = 1 + (dLevel - 1) * CONFIG.MATH.LEVEL_STAT_MULTIPLIER;
  return Math.round(baseValue * hMult * dMult);
}

/**
 * Calculates physical damage mitigation percentage (0.0 to 1.0) along a hyperbolic curve.
 * @param {number} defenseRating
 * @returns {number}
 */
export function getDefenseMitigation(defenseRating) {
  const def = Math.max(0, Number(defenseRating) || 0);
  return def / (def + CONFIG.MATH.DEFENSE_MITIGATION_CONSTANT);
}

/**
 * Calculates raw and mitigated damage for a single attack.
 * @param {Object} params
 * @returns {{ rawDamage: number, mitigatedDamage: number, mitigationPercent: number }}
 */
export function calculateDamage({
  attackerAttack = 100,
  defenderDefense = 100,
  actionPower = 110,
  talentMultiplier = 1.0,
  weaponMultiplier = 1.0
}) {
  const rawDamage = Math.round(
    (attackerAttack * (actionPower / 100)) * talentMultiplier * weaponMultiplier
  );
  const mitigationRate = getDefenseMitigation(defenderDefense);
  const mitigatedDamage = Math.round(rawDamage * (1 - mitigationRate));

  return {
    rawDamage,
    mitigatedDamage,
    mitigationPercent: Math.round(mitigationRate * 1000) / 10
  };
}

/**
 * Generates a shareable Build Code string: [3-LETTER-PREFIX]-[WEAPON_IDX]-[TALENTS]
 * e.g., MAR-1-LLLLL
 * @param {string} heroId
 * @param {number} weaponIdx
 * @param {Array<number>} talents - Array of 5 choices (0 = L, 1 = R)
 * @returns {string}
 */
export function generateBuildCode(heroId, weaponIdx = 0, talents = [0, 0, 0, 0, 0]) {
  const prefix = (heroId || "HER").toUpperCase().slice(0, 3);
  const talentStr = (talents || [0, 0, 0, 0, 0])
    .map(t => (t === 1 ? 'R' : 'L'))
    .join('');
  return `${prefix}-${Math.max(0, Number(weaponIdx) || 0)}-${talentStr}`;
}

/**
 * Parses a Build Code string back into { heroPrefix, weaponIdx, talents }
 * @param {string} code
 * @returns {{ valid: boolean, heroPrefix: string, weaponIdx: number, talents: number[] } | null}
 */
export function parseBuildCode(code) {
  if (!code || typeof code !== 'string') return null;
  const clean = code.trim().toUpperCase();
  const parts = clean.split('-');
  if (parts.length !== 3) return null;

  const [heroPrefix, weaponStr, talentStr] = parts;
  if (heroPrefix.length < 2 || heroPrefix.length > 4) return null;
  const weaponIdx = parseInt(weaponStr, 10);
  if (isNaN(weaponIdx) || weaponIdx < 0 || weaponIdx > 9) return null;
  if (talentStr.length !== 5 || !/^[LR]{5}$/.test(talentStr)) return null;

  const talents = talentStr.split('').map(char => (char === 'R' ? 1 : 0));
  return {
    valid: true,
    heroPrefix,
    weaponIdx,
    talents
  };
}

/**
 * Simulates a continuous fight-to-KO loop between two builds/heroes and calculates DPS metrics.
 * @param {Object} attacker - { name, attack, actionPower, hitsPerSec, critChance }
 * @param {Object} defender - { name, defense, hp }
 * @returns {Object}
 */
export function simulateCombatLoop(attacker, defender) {
  const hitsPerSec = attacker.hitsPerSec || 1.25; // Default average strike frequency
  const critChance = attacker.critChance || 0.15;
  const dmgResult = calculateDamage({
    attackerAttack: attacker.attack,
    defenderDefense: defender.defense,
    actionPower: attacker.actionPower || 110
  });

  // Calculate expected average damage per hit including critical strikes
  const baseHitDmg = dmgResult.mitigatedDamage;
  const avgHitDmg = Math.round(baseHitDmg * (1 - critChance) + (baseHitDmg * CONFIG.MATH.DEFAULT_CRIT_MULTIPLIER) * critChance);
  const dps = Math.round(avgHitDmg * hitsPerSec);

  const effectiveHP = defender.hp;
  const hitsToKO = Math.max(1, Math.ceil(effectiveHP / Math.max(1, avgHitDmg)));
  const timeToKO = Math.round((hitsToKO / hitsPerSec) * 10) / 10;

  // Generate combat trade sequence log (first 6 exchanges)
  const combatLog = [];
  let remainingHP = effectiveHP;
  let hitNumber = 1;

  while (remainingHP > 0 && hitNumber <= 8) {
    const isCrit = (hitNumber % 4 === 0);
    const hitDamage = isCrit ? Math.round(baseHitDmg * CONFIG.MATH.DEFAULT_CRIT_MULTIPLIER) : baseHitDmg;
    remainingHP = Math.max(0, remainingHP - hitDamage);
    combatLog.push({
      hitNumber,
      isCrit,
      damage: hitDamage,
      remainingHP
    });
    hitNumber++;
  }

  return {
    baseHitDmg,
    avgHitDmg,
    dps,
    hitsToKO,
    timeToKO,
    mitigationPercent: dmgResult.mitigationPercent,
    combatLog
  };
}
