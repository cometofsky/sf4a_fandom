// Complete 28-Hero Roster Database with Frame Data & Moves

export const HERO_DATABASE = [
  // --- LEGION (8 Heroes) ---
  {
    id: "marcus",
    name: "Marcus",
    faction: "Legion",
    avatar: "🛡️",
    photo: "marcus_avatar.jpg",
    baseStats: { attack: 120, defense: 140, shadow: 90, health: 1100 },
    bio: "A legendary commander of the Legion who fell into a space-time rift. Wields a massive Giant Sword with heavy, unbreakable strikes.",
    weapons: [
      { name: "Giant Sword (Default)", rarity: "Common", perk: "Standard issue greatsword.", attackMod: 1.0, defenseMod: 1.0 },
      { name: "Shadow Slayer", rarity: "Epic", perk: "Increases Shadow Energy generation rate by 15% and extends Unbreakable window.", attackMod: 1.08, defenseMod: 1.02 },
      { name: "Dread Tyrant", rarity: "Legendary", perk: "Every 4th attack breaks block. Increases basic Attack by 12%.", attackMod: 1.12, defenseMod: 0.98 }
    ],
    explicitTalents: true,
    talents: [
      [{ name: "General's Luck", desc: "Basic attacks have a 20% chance to break blocks." }, { name: "Shadow Warrior", desc: "Gain 25% more Shadow Energy from dealing damage." }],
      [{ name: "Rift Strike", desc: "Shadow ability leaves a ground rift dealing continuous damage." }, { name: "Healing Will", desc: "Entering Shadow Form instantly regenerates 10% max HP." }],
      [{ name: "Through the Glitch", desc: "Glitch status activates 30% faster, making attack startups faster." }, { name: "Legion's Hero", desc: "Unbreakable State grants complete immunity to ranged weapons." }],
      [{ name: "Explosive Will", desc: "Block breaks emit a short shockwave that staggers nearby enemies." }, { name: "Shadow Lord", desc: "Remain in Unbreakable State for the entire duration of Shadow Form." }],
      [{ name: "Absolute Control", desc: "Glitch states no longer disrupt your moves. Unbreakable attacks deal +15% damage." }, { name: "Time Glitch", desc: "Gain 3 seconds of invulnerability when health drops below 20%." }]
    ],
    moves: [
      { name: "Greatsword Cleave", type: "Physical", startup: "14f", recovery: "-6", damageMult: 1.1, property: "Unbreakable frames 6-18" },
      { name: "Overhead Execution", type: "Physical", startup: "22f", recovery: "-10", damageMult: 1.8, property: "20% Block Break Chance" },
      { name: "Somersault Slice", type: "Physical", startup: "16f", recovery: "-5", damageMult: 1.4, property: "Low evasion airborne startup" },
      { name: "Rift Impale", type: "Shadow", startup: "13f", recovery: "-12", damageMult: 2.2, property: "Unblockable Ground Spikes" }
    ]
  },
  {
    id: "ironclad",
    name: "Ironclad",
    faction: "Legion",
    avatar: "🥋",
    photo: "ironclad_avatar.jpg",
    baseStats: { attack: 110, defense: 160, shadow: 60, health: 1200 },
    bio: "A stubborn outlaw who fights with nothing but his heavy iron gauntlets, accumulating defense-boosting Stubbornness charges on hit.",
    weapons: [
      { name: "Fists (Default)", rarity: "Common", perk: "Standard gauntlets.", attackMod: 1.0, defenseMod: 1.0 },
      { name: "Champions Knuckles", rarity: "Epic", perk: "Increases defense by 5%. Counters have a 10% chance to stun.", attackMod: 1.04, defenseMod: 1.06 },
      { name: "Primal Fury", rarity: "Legendary", perk: "Every Stubbornness stack increases critical hit chance by 2%.", attackMod: 1.1, defenseMod: 1.0 }
    ],
    explicitTalents: true,
    talents: [
      [{ name: "Stubbornness", desc: "Gain +1 Defense charge whenever you are hit (max 20 stacks)." }, { name: "Berserk Instinct", desc: "Gain a critical hit chance increase of 10% when health drops below 50%." }],
      [{ name: "Hype Charges", desc: "Gain 5% Shadow Energy whenever you get hit while in Unbreakable State." }, { name: "Shadow Shield", desc: "Gain immunity to shadow damage status effects (poison, burn)." }],
      [{ name: "Heavy Knuckles", desc: "Basic punches deal +15% damage. Sweeps deal double damage." }, { name: "Phenom Resilience", desc: "Increases defense boost per Stubbornness stack by an additional 25%." }],
      [{ name: "Wound Bandaging", desc: "Heal 5% of missing health upon winning a round or when switching heroes." }, { name: "Knockout Blow", desc: "Heavy punch stuns the enemy for 1 second if they are in unbreakable state." }],
      [{ name: "Eternal Stubbornness", desc: "Defense charges carry over between rounds and cannot be removed." }, { name: "Final Stand Rage", desc: "Instantly enter Shadow Form and gain full Unbreakable state upon reaching 0 HP (once)." }]
    ],
    moves: [
      { name: "Knuckle Flurry", type: "Physical", startup: "10f", recovery: "-3", damageMult: 1.05, property: "Generates Stubbornness on hit" },
      { name: "Haymaker Hook", type: "Physical", startup: "18f", recovery: "-8", damageMult: 1.75, property: "Unbreakable frames 4-16" },
      { name: "Dropkick Smash", type: "Physical", startup: "15f", recovery: "-4", damageMult: 1.35, property: "Wall bounce knockdown" },
      { name: "Shadow Rush", type: "Shadow", startup: "11f", recovery: "-9", damageMult: 2.0, property: "Unblockable shoulder charge" }
    ]
  },
  {
    id: "sarge",
    name: "Sarge",
    faction: "Legion",
    avatar: "🔨",
    baseStats: { attack: 130, defense: 120, shadow: 80, health: 1050 },
    bio: "Otto Heim, a ruthless Legion commander. He uses dual hammers to knock enemies down and enters an invincible shadow state.",
    explicitTalents: false,
    weaponType: "Dual Hammers",
    perk: "Hammer strikes have a chance to inflict fall/knockdown."
  },
  {
    id: "helga",
    name: "Helga",
    faction: "Legion",
    avatar: "✨",
    baseStats: { attack: 100, defense: 130, shadow: 110, health: 1080 },
    bio: "The abdicated daughter of the Legion. Wields a Bastard Sword and calls down holy Smite rays that deal light-damage.",
    explicitTalents: false,
    weaponType: "Bastard Sword",
    perk: "Enters Shield of Light state upon fatal hit, gaining 6s invincibility."
  },
  {
    id: "kate",
    name: "Kate",
    faction: "Legion",
    avatar: "⚔️",
    baseStats: { attack: 115, defense: 115, shadow: 100, health: 1040 },
    bio: "A liquidator soldier trained to drain the enemy's shadow energy. She fights with a sword and dagger.",
    explicitTalents: false,
    weaponType: "Liquidator Blades",
    perk: "Attacks steal the opponent's Shadow Energy, dealing bonus physical damage."
  },
  {
    id: "jack",
    name: "Jack Bulwark",
    faction: "Legion",
    avatar: "⛓️",
    baseStats: { attack: 105, defense: 150, shadow: 75, health: 1150 },
    bio: "An iron fortress commander. He uses a heavy flail and shield to deflect ranged attacks and apply fracture tags to enemies.",
    explicitTalents: false,
    weaponType: "Flail and Shield",
    perk: "Blocks are unbreakable. Hits apply permanent Fractures which reduce defense."
  },
  {
    id: "king",
    name: "King of the Legion",
    faction: "Legion",
    avatar: "👑",
    baseStats: { attack: 140, defense: 130, shadow: 100, health: 1120 },
    bio: "The sovereign of the Legion. Wields a colossal Greatsword, draining his own health to perform devastating dark shadow moves.",
    explicitTalents: false,
    weaponType: "Royal Greatsword",
    perk: "Resurrects once per match as a wraith with shadow attacks."
  },
  {
    id: "clad_champion",
    name: "Champion of the Arena",
    faction: "Legion",
    avatar: "🏆",
    baseStats: { attack: 125, defense: 145, shadow: 85, health: 1110 },
    bio: "An elite gladiator version of Legion champions, adorned in gold plate and specialized in crowd-pleasing executions.",
    explicitTalents: false,
    weaponType: "Gladiator Halberd",
    perk: "Gains bonus attack power as audience excitement builds."
  },

  // --- DYNASTY (10 Heroes) ---
  {
    id: "shang",
    name: "Shang",
    faction: "Dynasty",
    avatar: "🐲",
    photo: "shang_avatar.jpg",
    baseStats: { attack: 105, defense: 95, shadow: 145, health: 980 },
    bio: "A power-hungry monk who worships Shadow Energy. His Guandao strikes feed his shadow form, allowing him to chain devastating shadow combos.",
    explicitTalents: true,
    talents: [
      [{ name: "Shadow Consumption", desc: "Regenerate health equal to 15% of shadow damage dealt." }, { name: "Scourge Arrow", desc: "Ranged attack applies shadow burn over 4 seconds." }],
      [{ name: "Weak Points", desc: "Every shadow hit increases subsequent shadow damage by 8%." }, { name: "Shadow Finale", desc: "Exiting shadow form triggers a knockback explosion." }],
      [{ name: "Trance State", desc: "Shadow form lasts 4 seconds longer." }, { name: "Dragon Style", desc: "Guandao combos execute 15% faster." }],
      [{ name: "Gloom Genesis", desc: "Start every round with 40% Shadow Energy." }, { name: "Shattered Soul", desc: "Defeating an opponent restores 50% Shadow Energy immediately." }],
      [{ name: "Supreme Dominion", desc: "Shadow abilities can be chained without cooldown during Shadow Form." }, { name: "Eternal Monk", desc: "Fatal hits leave you at 1 HP and trigger an immediate Shadow Form burst." }]
    ],
    moves: [
      { name: "Guandao Flourish", type: "Physical", startup: "11f", recovery: "-4", damageMult: 1.05, property: "Multi-hit polearm sweep" },
      { name: "Dragon Tail Sweep", type: "Physical", startup: "13f", recovery: "-5", damageMult: 1.25, property: "Low tripping attack" },
      { name: "Soul Eruption", type: "Shadow", startup: "12f", recovery: "-9", damageMult: 1.95, property: "Launches enemy into air" },
      { name: "Shadow Whirlwind", type: "Shadow", startup: "14f", recovery: "-10", damageMult: 2.3, property: "Unblockable cyclone vortex" }
    ]
  },
  {
    id: "jet",
    name: "Jet",
    faction: "Dynasty",
    avatar: "🌪️",
    baseStats: { attack: 115, defense: 100, shadow: 90, health: 1000 },
    bio: "A desert rebel leader who fights with Hook Swords. She accumulates Harmony charges with every hit to unleash shield-breaking combos.",
    explicitTalents: false,
    weaponType: "Hook Swords",
    perk: "Hits build Harmony stacks; at 16 stacks, her next attack breaks block."
  },
  {
    id: "yukka",
    name: "Yukka",
    faction: "Dynasty",
    avatar: "🐱",
    baseStats: { attack: 110, defense: 90, shadow: 120, health: 960 },
    bio: "A rebel fighter accompanied by her shadow cat Shade. She inflicts deep wound bleed debuffs while Shade interrupts enemy combos.",
    explicitTalents: false,
    weaponType: "Guillotine Blade",
    perk: "Shade can be summoned to break enemy combos and apply Bleed."
  },
  {
    id: "hong_joo",
    name: "Hong-Joo",
    faction: "Dynasty",
    avatar: "🎆",
    baseStats: { attack: 125, defense: 135, shadow: 70, health: 1180 },
    bio: "A joyous theatrical performer. He wields a long-reaching Sansetsukon and fills a Triumph bar to unleash unblockable fireworks.",
    explicitTalents: false,
    weaponType: "Three-Section Staff",
    perk: "Fills Triumph bar to perform Blazing Fireworks execution."
  },
  {
    id: "emperor",
    name: "The Emperor",
    faction: "Dynasty",
    avatar: "👹",
    baseStats: { attack: 100, defense: 110, shadow: 140, health: 1050 },
    bio: "The benevolent ruler of the Dynasty. When defeated, his human form collapses and transforms into a terrifying, lifestealing Shadow Beast.",
    explicitTalents: false,
    weaponType: "Royal Martial Arts",
    perk: "Transforms into Shadow Beast upon fatal hit, gaining lifesteal claws."
  },
  {
    id: "monkey_king",
    name: "Monkey King",
    faction: "Dynasty",
    avatar: "🐵",
    baseStats: { attack: 130, defense: 105, shadow: 110, health: 1020 },
    bio: "Sun Wukong, the trickster immortal. He perches on his staff Jingu Bang to mock enemies before dropping unblockable Heavenly Strikes.",
    explicitTalents: false,
    weaponType: "Jingu Bang Staff",
    perk: "Ascends staff to dodge attacks and drop Heavenly Strikes."
  },
  {
    id: "butcher",
    name: "Butcher",
    faction: "Dynasty",
    avatar: "🔪",
    baseStats: { attack: 135, defense: 125, shadow: 95, health: 1100 },
    bio: "A demon from the Underworld wielding meat cleavers. He traps victims in a Cage of Torment where all his attacks cause bleeding.",
    explicitTalents: false,
    weaponType: "Demonic Cleavers",
    perk: "Summons Shadow Cage where enemies cannot escape."
  },
  {
    id: "xiang_tzu",
    name: "Xiang Tzu",
    faction: "Dynasty",
    avatar: "💢",
    baseStats: { attack: 140, defense: 95, shadow: 80, health: 990 },
    bio: "A furious self-taught warrior who switches rapidly between three distinct weapons: Staff, Sai, and Broadsword, entering Rage mode.",
    explicitTalents: false,
    weaponType: "Tri-Weapon Arsenal",
    perk: "Enters Rage mode when damaged, ignoring pain and boosting attack."
  },
  {
    id: "june",
    name: "June",
    faction: "Dynasty",
    avatar: "☄️",
    baseStats: { attack: 120, defense: 100, shadow: 130, health: 980 },
    bio: "The Imperial Princess wielding a Meteor Hammer. She manipulates chaotic Astral Energy to summon meteor impacts across the arena.",
    explicitTalents: false,
    weaponType: "Meteor Hammer",
    perk: "Controls Astral Energy to pull and crush opponents."
  },
  {
    id: "yunlin",
    name: "Yunlin",
    faction: "Dynasty",
    avatar: "🪈",
    baseStats: { attack: 105, defense: 100, shadow: 135, health: 950 },
    bio: "A mystical girl with a magical flute. She can heal herself, teleport through shadows, and stun enemies with ethereal melodies.",
    explicitTalents: false,
    weaponType: "Spirit Flute & Staff",
    perk: "Plays spirit flute melodies to stun, heal, or teleport."
  },

  // --- HERALDS (10 Heroes) ---
  {
    id: "itu",
    name: "Itu",
    faction: "Heralds",
    avatar: "⌛",
    photo: "itu_avatar.jpg",
    baseStats: { attack: 130, defense: 110, shadow: 120, health: 1020 },
    bio: "A master swordsman who can manipulate spacetime. He enters temporal meditation to heal and deflect attacks, then slices reality itself.",
    explicitTalents: true,
    talents: [
      [{ name: "Temporal Advantage", desc: "Time manipulation lasts 25% longer." }, { name: "Beholder's Focus", desc: "Critical hits restore 10% Shadow Energy." }],
      [{ name: "Precision Cut", desc: "Iaijutsu strike deals +20% damage against bleeding targets." }, { name: "Quintessence", desc: "Enter meditation 50% faster." }],
      [{ name: "Shadow Dilation", desc: "Enemy shadow abilities move 40% slower near you." }, { name: "Paradox Guard", desc: "Parrying an attack reflects 30% damage back." }],
      [{ name: "Time Slip", desc: "Dodging a shadow attack grants immediate critical charge." }, { name: "Blade Mastery", desc: "Basic attacks deal +12% physical damage." }],
      [{ name: "Spacetime Severance", desc: "Shadow Slash ignores 50% of enemy defense." }, { name: "Eternal Meditation", desc: "Meditation heals an extra 3% HP per second." }]
    ],
    moves: [
      { name: "Iaijutsu Quickdraw", type: "Physical", startup: "9f", recovery: "-3", damageMult: 1.15, property: "Guaranteed Critical when charged" },
      { name: "Temporal Slash", type: "Physical", startup: "15f", recovery: "-6", damageMult: 1.6, property: "Slows enemy recovery by 20%" },
      { name: "Meditation Counter", type: "Physical", startup: "6f", recovery: "-4", damageMult: 1.3, property: "Parries incoming strike" },
      { name: "Spacetime Severance", type: "Shadow", startup: "10f", recovery: "-8", damageMult: 2.4, property: "Unblockable reality cut" }
    ]
  },
  {
    id: "ling",
    name: "Ling",
    faction: "Heralds",
    avatar: "🍶",
    baseStats: { attack: 125, defense: 125, shadow: 100, health: 1060 },
    bio: "A veteran shadow smith who drinks shadow flask brew. Every two successful hits grant him Slashing Strike, making his next hit a guaranteed critical.",
    explicitTalents: false,
    weaponType: "Katana & Flask",
    perk: "Every second hit charges Slashing Strike (Guaranteed Critical & Block Break)."
  },
  {
    id: "kibo",
    name: "Kibo",
    faction: "Heralds",
    avatar: "⚡",
    baseStats: { attack: 135, defense: 85, shadow: 130, health: 930 },
    bio: "A fierce warrior whose eyes glow with shadow fire. When her shadow energy is high, her katana dashes forward with Shadow Onslaught.",
    explicitTalents: false,
    weaponType: "Shadow Katana",
    perk: "Shadow Onslaught allows lightning-fast dash attacks."
  },
  {
    id: "azuma",
    name: "Azuma",
    faction: "Heralds",
    avatar: "💉",
    baseStats: { attack: 120, defense: 110, shadow: 125, health: 1000 },
    bio: "A Feldsher specialist tasked with neutralizing shadow threats. His Naginata attacks apply Shadow Suppression, locking enemy shadow abilities.",
    explicitTalents: false,
    weaponType: "Feldsher Naginata",
    perk: "Attacks apply Shadow Suppression, blocking opponent's Shadow Form."
  },
  {
    id: "fireguard",
    name: "Fireguard",
    faction: "Heralds",
    avatar: "🤖",
    baseStats: { attack: 115, defense: 120, shadow: 140, health: 990 },
    bio: "An autonomous shadow-flame construct guarding the Heralds' sacred installations. Generates shadow energy passively and self-destructs upon defeat.",
    explicitTalents: false,
    weaponType: "Kama & Flamethrower",
    perk: "Passive Shadow regeneration & Countdown Self-Destruct on fatal hit."
  },
  {
    id: "midnight",
    name: "Midnight",
    faction: "Heralds",
    avatar: "🗡️",
    baseStats: { attack: 130, defense: 90, shadow: 115, health: 940 },
    bio: "An elusive assassin wielding Sai daggers. Whenever she misses an attack intentionally, she blinks out of reality to evade counters.",
    explicitTalents: false,
    weaponType: "Assassins Sai",
    perk: "Blinks into Shadow Shift evasion upon whiffing an attack."
  },
  {
    id: "lynx",
    name: "Lynx",
    faction: "Heralds",
    avatar: "🐾",
    baseStats: { attack: 140, defense: 85, shadow: 120, health: 920 },
    bio: "The leader of the Order of Assassins. He uses Demonic Claws and throws smoke bombs to turn invisible and break enemy defense.",
    explicitTalents: false,
    weaponType: "Demonic Claws",
    perk: "Smoke Bomb invisibility allows unblockable critical ambush."
  },
  {
    id: "cobra",
    name: "Cobra",
    faction: "Heralds",
    avatar: "🐍",
    baseStats: { attack: 125, defense: 100, shadow: 110, health: 960 },
    bio: "A toxic chemist wielding Katar blades. She coats her weapons in Serpent Toxic venom that damages opponents over time and slows their movement.",
    explicitTalents: false,
    weaponType: "Venom Katars",
    perk: "Serpent Toxic venom stacks poison damage over time."
  },
  {
    id: "gideon",
    name: "Gideon",
    faction: "Heralds",
    avatar: "🔫",
    baseStats: { attack: 135, defense: 100, shadow: 115, health: 970 },
    bio: "A ruthless syndicate contractor wielding a cane sword and a shadow-repeater pistol. Operates with clinical precision.",
    explicitTalents: false,
    weaponType: "Cane Sword & Pistol",
    perk: "Ranged pistol shots interrupt startups and apply Target Lock."
  },
  {
    id: "moo_hyuk",
    name: "Moo-Hyuk",
    faction: "Heralds",
    avatar: "🦾",
    baseStats: { attack: 130, defense: 115, shadow: 125, health: 1010 },
    bio: "A cybernetically enhanced Herald enforcer. Uses high-frequency shockblades that overload enemy shields.",
    explicitTalents: false,
    weaponType: "Shockblades",
    perk: "Overloads enemy defense rating on consecutive hits."
  }
];

/**
 * Ensures all 28 heroes have standardized weapons, talent trees, and rich special moves arrays.
 */
export function populateHeroFallbacks() {
  HERO_DATABASE.forEach(hero => {
    // 1. Ensure weapons exist
    if (!hero.weapons || hero.weapons.length === 0) {
      const wName = hero.weaponType || "Standard Issue";
      hero.weapons = [
        { name: `${wName} (Default)`, rarity: "Common", perk: hero.perk || "Standard combat armaments.", attackMod: 1.0, defenseMod: 1.0 },
        { name: `Reforged ${wName}`, rarity: "Epic", perk: "Increases shadow energy gain by 10% on hit.", attackMod: 1.06, defenseMod: 1.03 },
        { name: `Sovereign ${wName}`, rarity: "Legendary", perk: "Grants +12% physical damage and +5% critical strike chance.", attackMod: 1.12, defenseMod: 0.98 }
      ];
    }

    // 2. Ensure talents exist
    if (!hero.talents || hero.talents.length === 0) {
      hero.talents = [
        [
          { name: "Offensive Momentum", desc: "Increases basic strike damage by 10%." },
          { name: "Defensive Poise", desc: "Reduces incoming damage by 8% while above 50% HP." }
        ],
        [
          { name: "Shadow Surge", desc: "Shadow abilities charge 15% faster." },
          { name: "Combat Conditioning", desc: "Regenerate 2% max health every 4 seconds." }
        ],
        [
          { name: "Piercing Strike", desc: "Heavy attacks ignore 20% of opponent defense." },
          { name: "Tactical Evasion", desc: "Dodging grants a brief movement speed boost." }
        ],
        [
          { name: "Critical Focus", desc: "Increases critical hit multiplier by +0.25x." },
          { name: "Unshakable Will", desc: "Reduces duration of enemy stun and slow effects by 30%." }
        ],
        [
          { name: "Apex Mastery", desc: "All special attacks deal +18% bonus damage." },
          { name: "Last Stand", desc: "Survive a lethal hit with 1 HP and gain full Shadow Energy once per match." }
        ]
      ];
    }

    // 3. Ensure moves array exists
    if (!hero.moves || hero.moves.length === 0) {
      const wName = hero.weaponType || "Weapon";
      hero.moves = [
        { name: `${wName} Combo`, type: "Physical", startup: "11f", recovery: "-4", damageMult: 1.1, property: "3-hit rapid string" },
        { name: `Heavy ${wName} Strike`, type: "Physical", startup: "19f", recovery: "-7", damageMult: 1.65, property: "High knockback distance" },
        { name: "Tactical Counter", type: "Physical", startup: "14f", recovery: "-5", damageMult: 1.35, property: "Interrupts enemy startup" },
        { name: "Shadow Execution", type: "Shadow", startup: "12f", recovery: "-9", damageMult: 2.15, property: "Unblockable shadow sequence" }
      ];
    }
  });
}

// Run fallbacks immediately upon module load
populateHeroFallbacks();
