// Data-Driven Lore Content, Rulings, Matchup Matrix & Expanded Quiz Pool

export const FACTION_LORE = {
  Legion: {
    title: "THE LEGION",
    tagline: "Iron, Discipline, and Absolute Order",
    desc: "A militaristic feudal society sworn to eradicate Shadow Energy from the world. Wearing heavy plate armor and wielding colossal medieval weapons, Legion heroes rely on sheer force and their signature Unbreakable State to trade blows through enemy attacks.",
    motto: "No retreat. No surrender. Iron stands eternal."
  },
  Dynasty: {
    title: "THE DYNASTY",
    tagline: "Agility, Flow, and Imperial Harmony",
    desc: "A vast empire celebrating martial arts, acrobatics, and fluid rhythm. Dynasty fighters weave rapid multi-hit combos, agile evasions, and elemental shadow synergies to overwhelm their opponents with unrelenting pressure.",
    motto: "Like flowing water, we adapt and conquer."
  },
  Heralds: {
    title: "THE HERALDS",
    tagline: "Precision, Technology, and Shadow Mastery",
    desc: "A secretive technocratic society that studies Shadow Energy to engineer precision weaponry. Heralds rely on high-leverage Critical Strikes, katana iaijutsu, and devastating Shadow abilities to end encounters in heartbeats.",
    motto: "In the quiet dark, precision strikes true."
  }
};

export const MATCHUP_MATRIX = [
  {
    id: "legion-vs-dynasty",
    title: "Legion vs. Dynasty",
    advantage: "Legion Advantage (Poise vs. Multi-Hit)",
    notes: "Legion's Unbreakable frames allow heavy armored heroes like Marcus and Ironclad to absorb Dynasty's rapid multi-hit flurries without flinching, counter-attacking during recovery.",
    exampleMatchup: { attacker: "marcus", defender: "shang" }
  },
  {
    id: "dynasty-vs-heralds",
    title: "Dynasty vs. Heralds",
    advantage: "Dynasty Advantage (Pressure vs. Precision)",
    notes: "Dynasty's relentless attack chains and mobility can bait Heralds into whiffing their precision strikes, resetting their critical charge counters.",
    exampleMatchup: { attacker: "shang", defender: "itu" }
  },
  {
    id: "heralds-vs-legion",
    title: "Heralds vs. Legion",
    advantage: "Heralds Advantage (Burst vs. Armor)",
    notes: "Heralds precision critical strikes deal massive single-hit burst damage that can pierce through Legion health pools before Unbreakable startups complete.",
    exampleMatchup: { attacker: "itu", defender: "marcus" }
  }
];

export const CHRONOLOGY_EVENTS = [
  {
    year: "Year 1042 — The Great Shadow Rift",
    title: "Opening of the Gates of Shadows",
    desc: "Shadow Energy floods the mortal realms after the destruction of the Sphere. Warriors across the three factions first discover shadow transformation."
  },
  {
    year: "Year 1055 — The Legion Crusade",
    title: "General Marcus & The Temporal Fracture",
    desc: "During the campaign against the Shadow Beasts, General Marcus falls through a temporal anomaly, acquiring his signature Glitch combat state."
  },
  {
    year: "Year 1068 — The Dynasty Succession",
    title: "Rise of the Shadow Monks",
    desc: "Shang the Morphos masters the Soul Amulet, combining traditional Dynasty wushu with forbidden Shadow manipulations."
  },
  {
    year: "Year 1079 — The Heralds Revolution",
    title: "Chancellor Itu & Spacetime Mastery",
    desc: "Itu perfects temporal iaijutsu within the Heralds Citadel, allowing him to slice through reality itself."
  },
  {
    year: "Year 1090 — The Shadow Tournament",
    title: "Shadow Mind Convening the Arena",
    desc: "The sentient Shadow Mind summons champions from all timelines into the timeless Arena to determine the ultimate ruler."
  }
];

export const DOJO_COUNCIL_RULINGS = [
  {
    date: "Patch 2.14.0 — Season of the Abyss",
    title: "Legion Heavy Weapon Re-Balancing",
    changes: [
      "Marcus: Heavy Attack startup speed increased by 1 frame to reward spacing.",
      "Ironclad: Stubbornness defense gain per charge adjusted from 2.5% to 2.2% to prevent stalemate loops.",
      "Sarge: Commander's Hammer stun duration normalized to 1.4 seconds."
    ]
  },
  {
    date: "Patch 2.13.2 — Temporal Dilation Update",
    title: "Heralds Critical Strike Calibration",
    changes: [
      "Itu: Spacetime Slash shadow charge requirement increased by 10%.",
      "Kibo: Shadow Dash distance extended by 15% to improve counter-zoner viability.",
      "Ling: Slashing Strike critical multiplier increased from 1.45x to 1.55x."
    ]
  },
  {
    date: "Patch 2.12.0 — Dynasty Agility Refinement",
    title: "Dynasty Combo Scaling & Recovery",
    changes: [
      "Shang: Soul Consumption healing cap adjusted to 25% max HP per round.",
      "Jet: Harmony stack expiration timer increased from 4s to 5s.",
      "Yukka: Shade regeneration cooldown reduced by 0.5s."
    ]
  }
];

export const QUIZ_QUESTIONS = [
  // --- Category: Lore & Chronology ---
  {
    id: "l1",
    category: "lore",
    question: "Which faction's core philosophy centers on discipline, heavy plate armor, and eradicating Shadow Energy?",
    options: ["The Legion", "The Dynasty", "The Heralds", "The Shadow Beasts"],
    correct: 0,
    explanation: "The Legion is sworn to destroy Shadow Energy and fights with medieval armor and discipline."
  },
  {
    id: "l2",
    category: "lore",
    question: "What mysterious anomaly causes General Marcus's attacks to glitch through space-time?",
    options: ["The Temporal Fracture", "The Soul Amulet", "The Shadow Sphere", "The Herald Catalyst"],
    correct: 0,
    explanation: "General Marcus fell into a Temporal Fracture during the Shadow Wars, giving him unpredictable glitch states."
  },
  {
    id: "l3",
    category: "lore",
    question: "Who is the sentient entity that summons warriors across timelines into the eternal Arena?",
    options: ["Shadow Mind", "Titan", "Tenebris", "Bolo"],
    correct: 0,
    explanation: "The Shadow Mind is the sentient embodiment of Shadow Energy that oversees the Arena."
  },
  {
    id: "l4",
    category: "lore",
    question: "Which Herald leader wields a katana capable of slicing through spacetime and slowing reality?",
    options: ["Itu", "Ling", "Azuma", "Fireguard"],
    correct: 0,
    explanation: "Chancellor Itu mastered temporal iaijutsu within the Heralds Citadel."
  },
  {
    id: "l5",
    category: "lore",
    question: "What artifact allowed Shang the Morphos to channel dark shadow souls?",
    options: ["The Soul Amulet", "The Crown of Light", "The Shadow Seal", "The Dragon Sphere"],
    correct: 0,
    explanation: "Shang uses the Soul Amulet to absorb shadow souls and regenerate health."
  },
  {
    id: "l6",
    category: "lore",
    question: "Which Legion princess abdicated her royal title to fight with the holy Shield of Light?",
    options: ["Helga", "Kate", "Jet", "June"],
    correct: 0,
    explanation: "Helga left the royal throne and channels holy Smite rays and Shield of Light."
  },
  {
    id: "l7",
    category: "lore",
    question: "What is the primary capital fortress of the Heralds faction?",
    options: ["The Heralds Citadel", "The Iron Keep", "The Imperial Palace", "The Shadow Rift"],
    correct: 0,
    explanation: "The Heralds Citadel is the technocratic hub where precision shadow experimentation occurs."
  },
  {
    id: "l8",
    category: "lore",
    question: "Which character is known as the stubborn outlaw who fights barefoot with iron gauntlets?",
    options: ["Ironclad", "Sarge", "Jack Bulwark", "Hong-Joo"],
    correct: 0,
    explanation: "Ironclad is a defiant brawler who refuses weapons, relying purely on his heavy iron gauntlets."
  },

  // --- Category: Mechanics & Math ---
  {
    id: "m1",
    category: "mechanics",
    question: "In Shadow Fight 4: Arena combat math, how much does each Hero level increase base stats multiplicatively?",
    options: ["10% per level", "5% per level", "15% per level", "25% per level"],
    correct: 0,
    explanation: "Stats scale multiplicatively by exactly 10% (0.1) per Hero and Dojo level."
  },
  {
    id: "m2",
    category: "mechanics",
    question: "What happens when a physical attack hits a hero who is currently in an Unbreakable State?",
    options: [
      "The hero absorbs the hit without flinching and completes their attack",
      "The hero takes zero damage and reflects the strike",
      "The hero is knocked down immediately",
      "The attack is parried and stuns the attacker"
    ],
    correct: 0,
    explanation: "Unbreakable State prevents stagger and interruption from normal physical hits."
  },
  {
    id: "m3",
    category: "mechanics",
    question: "According to the defense mitigation formula D / (D + 150), what mitigation percentage does 150 Defense grant?",
    options: ["50% mitigation", "33% mitigation", "75% mitigation", "25% mitigation"],
    correct: 0,
    explanation: "150 / (150 + 150) = 150 / 300 = 0.50 (50% physical damage reduction)."
  },
  {
    id: "m4",
    category: "mechanics",
    question: "In the combat priority triangle, which action successfully counters and interrupts a Throw attempt?",
    options: ["Fast Attack", "Block", "Taunt", "Walking backward"],
    correct: 0,
    explanation: "Attacks hit opponents before throw startup can grab, whereas Block loses to Throw."
  },
  {
    id: "m5",
    category: "mechanics",
    question: "What happens when a Throw is executed against an opponent who is holding Block?",
    options: [
      "The Throw bypasses the block and slams the opponent",
      "The Throw is deflected automatically",
      "Both fighters bounce backward",
      "The blocker gains Shadow Energy"
    ],
    correct: 0,
    explanation: "Throws cannot be blocked; they break open passive blocking guards."
  },
  {
    id: "m6",
    category: "mechanics",
    question: "Which combat state grants temporary glowing armor that ignores ranged projectile hits?",
    options: ["Unbreakable State", "Shadow Form", "Harmony State", "Critical Poise"],
    correct: 0,
    explanation: "Legion Unbreakable frames allow fighters to march straight through ranged weapons."
  },
  {
    id: "m7",
    category: "mechanics",
    question: "What is the standard damage multiplier applied when a Heralds hero lands a Critical Hit?",
    options: ["1.5x (50% bonus damage)", "2.0x (100% bonus damage)", "1.25x (25% bonus damage)", "3.0x (200% bonus damage)"],
    correct: 0,
    explanation: "Standard critical strikes deal 1.5x damage unless modified by specific talents or weapons."
  },
  {
    id: "m8",
    category: "mechanics",
    question: "How many talent tiers does each hero have available to configure in their build?",
    options: ["5 tiers (10 total talent choices)", "3 tiers (6 total choices)", "7 tiers (14 total choices)", "4 tiers (8 total choices)"],
    correct: 0,
    explanation: "Every hero features 5 talent tiers with Left and Right mutually exclusive choices."
  },

  // --- Category: Roster & Heroes ---
  {
    id: "r1",
    category: "roster",
    question: "Which Dynasty hero uses fireworks, acrobatics, and theatrical performance to entertain and destroy?",
    options: ["Hong-Joo", "Shang", "Jet", "Emperor"],
    correct: 0,
    explanation: "Hong-Joo is the grand theatrical performer wielding a Sansetsukon and fireworks."
  },
  {
    id: "r2",
    category: "roster",
    question: "Which Herald Feldsher specializes in neutralizing enemy Shadow Energy using a naginata?",
    options: ["Azuma", "Ling", "Kibo", "Midnight"],
    correct: 0,
    explanation: "Azuma is the Feldsher whose attacks apply Shadow Suppression."
  },
  {
    id: "r3",
    category: "roster",
    question: "What weapon does Jack Bulwark wield alongside his towering Great Shield?",
    options: ["Heavy Flail", "Bastard Sword", "War Hammer", "Katana"],
    correct: 0,
    explanation: "Jack Bulwark fights with a heavy Flail and Shield to inflict Fractures."
  },
  {
    id: "r4",
    category: "roster",
    question: "Which hero can transform into a ferocious Shadow Beast upon taking fatal damage?",
    options: ["The Emperor", "Shang", "Lynx", "Cobra"],
    correct: 0,
    explanation: "The Emperor houses a dark Shadow Beast inside him that awakens when defeated."
  },
  {
    id: "r5",
    category: "roster",
    question: "Which legendary Herald assassin uses claws and smoke bombs to turn invisible?",
    options: ["Lynx", "Midnight", "Itu", "Fireguard"],
    correct: 0,
    explanation: "Lynx the Order Leader uses Demonic Claws and smoke bombs to stalk his prey."
  },
  {
    id: "r6",
    category: "roster",
    question: "Which Dynasty warrior wields dual hook swords and can stack Harmony counters?",
    options: ["Jet", "Yukka", "Monkey King", "Xiang Tzu"],
    correct: 0,
    explanation: "Jet is a rebel leader whose rapid hook sword strikes build lethal Harmony stacks."
  },
  {
    id: "r7",
    category: "roster",
    question: "Which Legion Liquidator soldier drains enemy Shadow Energy with every sword and dagger strike?",
    options: ["Kate", "Helga", "Marcus", "Sarge"],
    correct: 0,
    explanation: "Kate is trained as a Liquidator to siphon enemy shadow pools."
  },
  {
    id: "r8",
    category: "roster",
    question: "Which Herald construct robot guards the Shadow Sphere and self-destructs upon defeat?",
    options: ["Fireguard", "Azuma", "Ling", "Cobra"],
    correct: 0,
    explanation: "Fireguard is a shadow-flame automaton programmed to defend shadow installations."
  }
];
