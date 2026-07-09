// Shadow Fight 4: Arena Fandom App Logic

// --- Extended Hero Roster Database (All 28 Heroes) ---
const HERO_DATABASE = [
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
    ]
  },
  {
    id: "sarge",
    name: "Sarge",
    faction: "Legion",
    avatar: "🔨",
    baseStats: { attack: 130, defense: 120, shadow: 80 },
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
    baseStats: { attack: 100, defense: 130, shadow: 110 },
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
    baseStats: { attack: 115, defense: 115, shadow: 100 },
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
    baseStats: { attack: 105, defense: 150, shadow: 75 },
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
    baseStats: { attack: 140, defense: 130, shadow: 100 },
    bio: "The sovereign of the Legion. Wields a colossal Greatsword, draining his own health to perform devastating dark shadow moves.",
    explicitTalents: false,
    weaponType: "Royal Greatsword",
    perk: "Drains own HP for shadow attacks. Enters Sovereign state to delay death."
  },
  {
    id: "gideon",
    name: "Lord Gideon",
    faction: "Legion",
    avatar: "🔫",
    baseStats: { attack: 125, defense: 110, shadow: 105 },
    bio: "A high noble who fights with a combination of a precise fencing Rapier and a hidden repeating black-powder Rifle.",
    explicitTalents: false,
    weaponType: "Rapier and Gun",
    perk: "Ranged attacks shoot physical gun projectiles that break blocks."
  },

  // --- DYNASTY (9 Heroes) ---
  {
    id: "shang",
    name: "Shang",
    faction: "Dynasty",
    avatar: "🐉",
    photo: "shang_avatar.jpg",
    baseStats: { attack: 100, defense: 110, shadow: 150, health: 900 },
    bio: "A monk who unlocked the secrets of Shadow Essence. He uses a Guandao staff to quickly chain unblockable Shadow storm combos.",
    weapons: [
      { name: "Guandao (Default)", rarity: "Common", perk: "Standard issue Guandao.", attackMod: 1.0, defenseMod: 1.0 },
      { name: "Dragon Breath", rarity: "Epic", perk: "Increases Shadow form duration by 20%. Shadow attacks inflict burn status.", attackMod: 1.05, defenseMod: 1.05 },
      { name: "Monk's Devotion", rarity: "Legendary", perk: "Reduces Shadow Energy required by 15%. Adds +12% Shadow power.", attackMod: 1.08, defenseMod: 1.02 }
    ],
    explicitTalents: true,
    talents: [
      [{ name: "Shadow Genesis", desc: "Start the battle with 25% Shadow Energy already filled." }, { name: "Gloom Strike", desc: "Shadow attacks poison the enemy, dealing 3% HP damage over 5 seconds." }],
      [{ name: "Scourge Mastery", desc: "Each Shadow Ability costs 10% less energy to execute." }, { name: "Whirlwind Blast", desc: "Ranged Shadow Ability shoots a secondary projectile that sweeps the ground." }],
      [{ name: "Trance State", desc: "Increases your physical defense rating by 15% while in Shadow Form." }, { name: "Shadow Feast", desc: "Regenerate 8% health for every successful Shadow Ability hit." }],
      [{ name: "Weak Points", desc: "Dealing Shadow damage permanently reduces the enemy's physical defense by 5%." }, { name: "Viper Swiftness", desc: "Increases movement speed and roll distance by 10%." }],
      [{ name: "Shadow Suppression", desc: "Deal 25% extra damage if the opponent has a full Shadow Energy meter." }, { name: "Style of the Dragon", desc: "Combine all shadow abilities into a continuous, unstoppable storm combo." }]
    ]
  },
  {
    id: "emperor",
    name: "The Emperor",
    faction: "Dynasty",
    avatar: "🐯",
    baseStats: { attack: 115, defense: 120, shadow: 135 },
    bio: "The ruler of the Dynasty, possessed by the Shadow Beast. He transforms into a feral monster that drains the enemy's life.",
    explicitTalents: false,
    weaponType: "Imperial Claws",
    perk: "Enters Shadow Beast mode to transform, gaining massive attack power and lifesteal."
  },
  {
    id: "hongjoo",
    name: "Hong-Joo",
    faction: "Dynasty",
    avatar: "🎭",
    baseStats: { attack: 110, defense: 125, shadow: 95 },
    bio: "A theatrical circus performer. Wields a giant Dadao blade, blasting opponents with firework projectiles.",
    explicitTalents: false,
    weaponType: "Giant Dadao",
    perk: "Fills Triumph bar with attacks. Unleashes unblockable fireworks blast."
  },
  {
    id: "monkey",
    name: "Monkey King",
    faction: "Dynasty",
    avatar: "🐒",
    baseStats: { attack: 130, defense: 120, shadow: 110 },
    bio: "Sun Wukong, the trickster sage. He uses his legendary Staff to perform heavenly blocks and ground-breaking slams.",
    explicitTalents: false,
    weaponType: "Jingu Bang Staff",
    perk: "Ascends to the top of the screen to perform unblockable wind strikes."
  },
  {
    id: "jet",
    name: "Jet",
    faction: "Dynasty",
    avatar: "💨",
    baseStats: { attack: 125, defense: 100, shadow: 90 },
    bio: "A fast scavenger fighting for the slums. Wields composite Pole Glaives that she splits into two for infinite attack chains.",
    explicitTalents: false,
    weaponType: "Composite Glaives",
    perk: "Accumulates Shadow Harmony charges to increase attack output by 50%."
  },
  {
    id: "xiang",
    name: "Xiang Tzu",
    faction: "Dynasty",
    avatar: "🔥",
    baseStats: { attack: 135, defense: 95, shadow: 100 },
    bio: "A hot-headed warrior who has mastered various styles, entering a state of Rage that prevents him from being staggered.",
    explicitTalents: false,
    weaponType: "Three-Section Staff",
    perk: "Entering Rage grants unbreakable armor and heals a portion of damage taken."
  },
  {
    id: "june",
    name: "June",
    faction: "Dynasty",
    avatar: "🎗️",
    baseStats: { attack: 120, defense: 105, shadow: 115 },
    bio: "The princess of the Dynasty. Wields a flexible Chain Knife, striking from long range and manipulating shadow portals.",
    explicitTalents: false,
    weaponType: "Chain Knife",
    perk: "Performs sweeps and long range portal displacements."
  },
  {
    id: "yunlin",
    name: "Yunlin",
    faction: "Dynasty",
    avatar: "🎵",
    baseStats: { attack: 95, defense: 110, shadow: 140 },
    bio: "A musical prodigy. She plays her Flute during battle to teleport, stun, or shield herself with nature energy.",
    explicitTalents: false,
    weaponType: "Musical Flute & Dagger",
    perk: "Music tunes apply teleportation or stun triggers on the enemy."
  },
  {
    id: "butcher",
    name: "Butcher",
    faction: "Dynasty",
    avatar: "🥩",
    baseStats: { attack: 130, defense: 130, shadow: 80 },
    bio: "The leader of the underground gang. He uses dual Cleavers to chop enemies and traps them inside a shadow cage.",
    explicitTalents: false,
    weaponType: "Dual Cleavers",
    perk: "Enters a shadow cage arena where the enemy's speed is halved."
  },
  {
    id: "nonna",
    name: "Nonna",
    faction: "Dynasty",
    avatar: "🌾",
    baseStats: { attack: 125, defense: 120, shadow: 100 },
    bio: "A disciplined spear-maiden. She uses a heavy polearm to poke enemies, keeping them at bay with defensive sweeps.",
    explicitTalents: false,
    weaponType: "Dynasty Halberd",
    perk: "Swings have massive range and block-pushback effects."
  },

  // --- HERALDS (10 Heroes) ---
  {
    id: "itu",
    name: "Itu",
    faction: "Heralds",
    avatar: "👁️",
    photo: "itu_avatar.jpg",
    baseStats: { attack: 130, defense: 100, shadow: 130, health: 950 },
    bio: "A researcher who manipulates timeline coordinates. Wields a Katana, using Time Shift to slow time and regenerate health.",
    weapons: [
      { name: "Katana (Default)", rarity: "Common", perk: "Standard Issue Katana.", attackMod: 1.0, defenseMod: 1.0 },
      { name: "Temporal Edge", rarity: "Epic", perk: "Reduces Time Shift cooldown by 20%. Increases Critical Hit multiplier by 15%.", attackMod: 1.06, defenseMod: 1.04 },
      { name: "Muramasa", rarity: "Legendary", perk: "Entering Time Shift triggers a critical slash charge immediately.", attackMod: 1.1, defenseMod: 1.0 }
    ],
    explicitTalents: true,
    talents: [
      [{ name: "Spatial Distortion", desc: "Time Shift now slows down the opponent's moves by an extra 15%." }, { name: "Time Shift Shift", desc: "Extends the duration of Time Shift active state by 1.5 seconds." }],
      [{ name: "Critical Multiplier", desc: "Increases Critical Strike damage from x1.5 to x1.85." }, { name: "Forgotten Art", desc: "Slowly regenerate Shadow Energy over time when stationary." }],
      [{ name: "Behold the Blade", desc: "First hit after activating Time Shift deals +30% physical damage." }, { name: "Future Sight", desc: "Blocking an opponent's physical special attack fills 20% Shadow meter." }],
      [{ name: "Chrono-shield", desc: "Gain a barrier that absorbs up to 15% of your max HP in damage during Time Shift." }, { name: "Shadow Rift", desc: "Instantly teleport behind the enemy when entering Shadow Form." }],
      [{ name: "Paradox Revival", desc: "When receiving fatal damage, rewind time to revive with 15% HP (once per round)." }, { name: "Master of Time", desc: "Time Shift recovers automatically after landing 5 physical strikes." }]
    ]
  },
  {
    id: "ling",
    name: "Ling",
    faction: "Heralds",
    avatar: "🍶",
    baseStats: { attack: 125, defense: 115, shadow: 90 },
    bio: "An old tavern keeper and sword master. Wields a Katana and drinks from a flask to spit fire and gain critical buffs.",
    explicitTalents: false,
    weaponType: "Master Katana",
    perk: "Every 4th attack is a guaranteed critical hit that breaks blocks."
  },
  {
    id: "fireguard",
    name: "Fireguard",
    faction: "Heralds",
    avatar: "🤖",
    baseStats: { attack: 110, defense: 100, shadow: 140 },
    bio: "A cybernetic combat automaton built by the Heralds. It regenerates shadow energy automatically and explodes on defeat.",
    explicitTalents: false,
    weaponType: "Flame Glaives",
    perk: "Regenerates shadow energy passively. Shoots flame streams."
  },
  {
    id: "kibo",
    name: "Kibo",
    faction: "Heralds",
    avatar: "⚡",
    baseStats: { attack: 135, defense: 90, shadow: 115 },
    bio: "A shadow-infected swordmaster. Kibo uses a Katana to perform teleporting dashes and enters a fast shadow onslaught state.",
    explicitTalents: false,
    weaponType: "Teleport Katana",
    perk: "Shadow form increases attack speed and replaces rolls with short teleports."
  },
  {
    id: "azuma",
    name: "Azuma",
    faction: "Heralds",
    avatar: "☣️",
    baseStats: { attack: 115, defense: 120, shadow: 120 },
    bio: "A shadow researcher trained in containment. Wields a long Naginata, neutralizing shadow energy and locking down enemies.",
    explicitTalents: false,
    weaponType: "containment Naginata",
    perk: "Hits neutralize shadow users, kicking them out of shadow form."
  },
  {
    id: "midnight",
    name: "Midnight",
    faction: "Heralds",
    avatar: "🕵️",
    baseStats: { attack: 130, defense: 95, shadow: 110 },
    bio: "A high-tech assassin. She uses twin Sai blades and teleports into shadow shift after every missed attack.",
    explicitTalents: false,
    weaponType: "High-Tech Sai",
    perk: "Missed attacks trigger immediate backstep teleportation."
  },
  {
    id: "cobra",
    name: "Cobra",
    faction: "Heralds",
    avatar: "🐍",
    baseStats: { attack: 120, defense: 100, shadow: 110 },
    bio: "A corporate agent wielding self-acting daggers. She sprays shadow gas that poisons and slows the enemy.",
    explicitTalents: false,
    weaponType: "Self-Acting Daggers",
    perk: "Charges blades to bypass block. Applies poison tags."
  },
  {
    id: "lynx",
    name: "Lynx",
    faction: "Heralds",
    avatar: "😼",
    baseStats: { attack: 140, defense: 85, shadow: 120 },
    bio: "The leader of the Order of Assassins. He uses razor-sharp Claws, throwing smoke bombs to trigger critical stealth hits.",
    explicitTalents: false,
    weaponType: "Demonic Claws",
    perk: "Ranged attack throws smoke bomb, making the next physical hit a critical strike."
  },
  {
    id: "widow",
    name: "Widow",
    faction: "Heralds",
    avatar: "🪭",
    baseStats: { attack: 115, defense: 110, shadow: 130 },
    bio: "A beautiful, deadly assassin who uses dual steel Fans to float, strike from the air, and drain the enemy's shadow bar.",
    explicitTalents: false,
    weaponType: "Steel Fans",
    perk: "Can float in the air. Hits drain shadow energy."
  },
  {
    id: "raikichi",
    name: "Raikichi",
    faction: "Heralds",
    avatar: "⚡",
    baseStats: { attack: 130, defense: 105, shadow: 110 },
    bio: "A cyber-samurai who dual-wields energy Katanas. He chains rapid slashes and fires electrical kinetic charges.",
    explicitTalents: false,
    weaponType: "Dual Plasma Katanas",
    perk: "Applies static charge. Enters electrical burst on hit."
  }
];

// --- Programmatic Talent & Weapon Generator for non-explicit heroes ---
function populateHeroFallbacks() {
  HERO_DATABASE.forEach(hero => {
    // Assign health fallback if not explicitly defined
    if (!hero.baseStats.health) {
      if (hero.faction === "Legion") hero.baseStats.health = 1100;
      else if (hero.faction === "Dynasty") hero.baseStats.health = 1000;
      else hero.baseStats.health = 950;
    }

    if (!hero.explicitTalents) {
      // Generate 3 standard weapons
      hero.weapons = [
        { name: `${hero.weaponType} (Default)`, rarity: "Common", perk: "Standard issue weapon.", attackMod: 1.0, defenseMod: 1.0 },
        { name: `Vanguard ${hero.name}`, rarity: "Epic", perk: `${hero.perk || 'Increases attack.'} Adds +5% physical power.`, attackMod: 1.06, defenseMod: 1.02 },
        { name: `Abyss ${hero.name}`, rarity: "Legendary", perk: `Enables double status damage. Adds +10% attack.`, attackMod: 1.10, defenseMod: 1.0 }
      ];

      // Generate 5 tiers of standard talents based on faction
      const isLegion = hero.faction === "Legion";
      const isDynasty = hero.faction === "Dynasty";
      
      const leftNames = [
        isLegion ? "Iron Will" : isDynasty ? "Swift Foot" : "Precision Lock",
        "Abyssal Flow",
        "Vanguard Fury",
        "Shield Breaker",
        "Aegis Protection"
      ];
      const rightNames = [
        "Shadow Surge",
        "Healing Burst",
        "Counter Mastery",
        "Fracture Stagger",
        "Fatal Strike"
      ];
      const leftDescs = [
        isLegion ? "Increase unbreakable state duration by 20%." : isDynasty ? "Increase roll and jump speed by 15%." : "Increases weapon critical multiplier by 10%.",
        "Gain 10% more shadow energy from hits.",
        "Increase physical attack damage by 8%.",
        "Attacks have a 15% chance to break blocks.",
        "Gain a shield absorbing 10% max HP damage on round start."
      ];
      const rightDescs = [
        "Enters shadow form 1.5 seconds longer.",
        "Entering shadow form regenerates 8% health.",
        "Successful counters deal +20% damage.",
        "Fractures or poison tags apply 15% slower but deal +30% damage.",
        "Fatal attacks have a 25% chance to trigger an unblockable kinetic blast."
      ];

      hero.talents = [];
      for (let i = 0; i < 5; i++) {
        hero.talents.push([
          { name: leftNames[i], desc: leftDescs[i] },
          { name: rightNames[i], desc: rightDescs[i] }
        ]);
      }
    }
  });
}

// --- Faction Perspective Summaries ---
const PERSPECTIVE_DATA = {
  standard: {
    banner: "UNLEASH THE SHADOW",
    intro: "Interactive Character database, tactical talent builders, damage simulation engines, and gameplay trainers for Nekki's cross-platform fighter.",
    legion: "A militaristic medieval faction that views Shadow Energy as a dangerous plague. They value physical strength, discipline, and heavy armor above all else.",
    dynasty: "A vibrant, Chinese-inspired imperial coalition representing thousands of martial arts schools. They believe Shadow Energy should be integrated into daily life and tech.",
    heralds: "An enigmatic, advanced Japanese-inspired faction. They treat Shadow Energy with scientific precision, designing advanced gear, cybernetics, and nanotech."
  },
  legion: {
    banner: "SECURE THE WALLS",
    intro: "Legion Command Archives. Tracking the shadow abominations and cataloging the pure physical weaponry of the crusaders who will cleanse the earth.",
    legion: "🛡️ The noble Shield of Humanity. Our righteous order stands against the corrupting shadow plague, maintaining absolute discipline and physical purity.",
    dynasty: "🐉 Lawless magic-hoarders. The Dynasty plays with shadow fire like children, unaware of the corruption rotting their schools and cities.",
    heralds: "👁️ Enigmatic dome-dwellers. The Heralds have completely merged their minds with the shadow disease, creating soulless mechanical weapons."
  },
  dynasty: {
    banner: "FLOW WITH THE WIND",
    intro: "Dynasty Chronicles. Celebrating the harmonious flow of natural energy, acrobatics, and the diverse schools of martial arts in our prosperous Empire.",
    legion: "🛡️ Stubborn, blockheaded tyrants. The Legion seeks to quarantine progress, building walls and destroying the very life-energy that can save us.",
    dynasty: "🐉 The flow of nature. We embrace the shadow essence, integrating it with grace into our architecture, arts, and combat styles.",
    heralds: "👁️ Cold, computing hermits. The Heralds dissect the life-energy under their microscopes, completely missing the emotional spirit of combat."
  },
  heralds: {
    banner: "PERFECT. TRANSCEND.",
    intro: "Herald Cyber-Archives. Recording the physical parameters, coordinate metrics, and timeline vectors of the Arena's test subjects.",
    legion: "🛡️ Superstitious luddites. The Legion fears the future, attempting to burn the energy they lack the cognitive capacity to analyze.",
    dynasty: "🐉 Unpredictable showmen. The Dynasty treats shadow energy as a performance art, lacking the scientific control required for true mastery.",
    heralds: "👁️ The apex of logic. We analyze and control the shadow energy wave-functions, adapting physical bodies to achieve kinetic transcendence."
  }
};

// --- Global App State ---
const state = {
  activeTab: "factions",
  selectedHeroId: "marcus",
  activePerspective: "standard",
  builderBuilds: {}, // Populated dynamically
  calculator: {
    attackerId: "marcus",
    attackerHLevel: 1,
    attackerDLevel: 1,
    attackerAction: "basic",
    defenderId: "itu",
    defenderHLevel: 1,
    defenderDLevel: 1,
    defenderHPMax: 1000,
    defenderHPCurrent: 1000
  },
  simulator: {
    playerHP: 1000,
    playerShadow: 0,
    playerHeroId: "marcus",
    opponentHP: 1000,
    opponentShadow: 0,
    opponentHeroId: "itu",
    isPlaying: false
  }
};

// --- Populate Initial Builds ---
function initBuilds() {
  HERO_DATABASE.forEach(hero => {
    state.builderBuilds[hero.id] = {
      talents: [0, 0, 0, 0, 0],
      weaponIdx: 0
    };
  });
}

// --- DOM References ---
const navLinks = document.querySelectorAll(".nav-link");
const tabContents = document.querySelectorAll(".tab-content");
const perspectiveSelect = document.getElementById("perspective-select");

const bannerTitle = document.querySelector(".banner-text h1");
const bannerIntro = document.querySelector(".banner-text p");
const legionDesc = document.querySelector(".faction-legion .faction-body > p");
const dynastyDesc = document.querySelector(".faction-dynasty .faction-body > p");
const heraldsDesc = document.querySelector(".faction-heralds .faction-body > p");

// --- Tab Controller ---
function initTabs() {
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const tabId = link.getAttribute("data-tab");
      
      navLinks.forEach(l => l.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      
      link.classList.add("active");
      const targetContent = document.getElementById(`${tabId}-tab`);
      if (targetContent) targetContent.classList.add("active");
      
      state.activeTab = tabId;
      
      if (tabId === "builder") {
        renderBuilder();
      } else if (tabId === "calculator") {
        initCalculator();
      } else if (tabId === "simulator") {
        initSimulator();
      } else if (tabId === "tierlist") {
        initTierList();
      } else if (tabId === "rulings") {
        renderRulings();
      }
    });
  });
}


// --- Lore Perspective Toggle (Continuity Switcher) ---
function initPerspectiveSwitcher() {
  perspectiveSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    state.activePerspective = val;
    
    // Shift CSS Class on Body
    document.body.className = "";
    if (val !== "standard") {
      document.body.classList.add(`lens-${val}`);
    }
    
    // Update Text Blocks Dynamically
    const content = PERSPECTIVE_DATA[val];
    bannerTitle.textContent = content.banner;
    bannerIntro.textContent = content.intro;
    
    legionDesc.innerHTML = content.legion;
    dynastyDesc.innerHTML = content.dynasty;
    heraldsDesc.innerHTML = content.heralds;
    
    // Re-render hero lists to update biographies if details modal is open
    renderHeroCards(document.querySelector(".filter-btn.active").getAttribute("data-filter"), document.getElementById("hero-search").value);
  });
}

// --- Dynamic Stat Calculator Formula ---
function calculateStat(base, heroLevel, dojoLevel) {
  return Math.round(base * (1 + (heroLevel - 1) * 0.1) * (1 + (dojoLevel - 1) * 0.1));
}

function getDefenseMitigation(defenseRating) {
  return defenseRating / (defenseRating + 150);
}

// --- Estimated Frame Advantage (community-derived, not official data) ---
const ACTION_BASE_ADVANTAGE = { basic: 2, heavy: -8, special: -4, shadow: -12 };

function getEstimatedAdvantage(action, defenderBaseDefense) {
  const base = ACTION_BASE_ADVANTAGE[action] ?? 0;
  const defenseModifier = (100 - defenderBaseDefense) / 50;
  return Math.round(base + defenseModifier);
}

// --- Community Tier List: seed score from base stats ---
function getHeroSeedScore(hero) {
  return hero.baseStats.attack + hero.baseStats.defense + hero.baseStats.shadow + (hero.baseStats.health / 10);
}

// --- Hero Archives / Database Section ---
const heroesGridContainer = document.getElementById("heroes-grid-container");
const heroSearch = document.getElementById("hero-search");
const filterButtons = document.querySelectorAll(".filter-btn");
const heroModal = document.getElementById("hero-modal");
const modalContentWrapper = document.getElementById("modal-hero-content");

function renderHeroCards(filter = "all", query = "") {
  heroesGridContainer.innerHTML = "";
  
  const filtered = HERO_DATABASE.filter(hero => {
    const matchesFilter = filter === "all" || hero.faction.toLowerCase() === filter.toLowerCase();
    const matchesSearch = hero.name.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  filtered.forEach(hero => {
    const card = document.createElement("div");
    card.className = "hero-card";
    
    let glowColor = "var(--color-shadow)";
    if (hero.faction === "Legion") glowColor = "var(--color-legion)";
    if (hero.faction === "Dynasty") glowColor = "var(--color-dynasty)";
    if (hero.faction === "Heralds") glowColor = "var(--color-heralds)";
    
    const avatarContent = hero.photo 
      ? `<img src="${hero.photo}" alt="${hero.name}" class="hero-photo">` 
      : `<span class="hero-shadow-avatar">${hero.avatar}</span>`;
      
    card.innerHTML = `
      <div class="hero-card-glow" style="background: radial-gradient(circle, ${glowColor} 0%, transparent 80%)"></div>
      <div class="hero-avatar-area">${avatarContent}</div>
      <h3>${hero.name}</h3>
      <span class="hero-faction-badge faction-badge-${hero.faction.toLowerCase()}">${hero.faction}</span>
      <div class="hero-card-footer">
        <span>⚔️ Atk: ${hero.baseStats.attack}</span>
        <span>🛡️ Def: ${hero.baseStats.defense}</span>
      </div>
    `;
    
    card.addEventListener("click", () => openHeroDetailsModal(hero.id));
    heroesGridContainer.appendChild(card);
  });
}

function openHeroDetailsModal(heroId) {
  const hero = HERO_DATABASE.find(h => h.id === heroId);
  if (!hero) return;
  
  let scaleHLvl = 1;
  let scaleDLvl = 1;
  
  // Resolve weapon configuration from active builder state
  const builderConfig = state.builderBuilds[hero.id] || { weaponIdx: 0 };
  const equippedWeapon = hero.weapons[builderConfig.weaponIdx];

  // Bias the biography based on active Lore Lens!
  let bioText = hero.bio;
  if (state.activePerspective === "legion") {
    if (hero.faction === "Legion") bioText = `[APPROVED ARCHIVE] ${hero.bio} A paragon of the Legion's unbreakable spirit.`;
    else bioText = `[THREAT WARNING] ${hero.bio} Caution: Exhibits severe shadow contamination and unstable combat anomalies.`;
  } else if (state.activePerspective === "dynasty") {
    if (hero.faction === "Dynasty") bioText = `[SCHOOL ROLL] ${hero.bio} A master who channels the natural shadow streams gracefully.`;
    else bioText = `[FOREIGN CHRONICLE] ${hero.bio} Fights with stiff, blocky patterns, rejecting martial harmony.`;
  } else if (state.activePerspective === "heralds") {
    if (hero.faction === "Heralds") bioText = `[TRANS-LOG] ${hero.bio} Subject exhibits perfect temporal and spatial synchronization indices.`;
    else bioText = `[OBSERVATIONAL STUDY] ${hero.bio} High physical power output but utilizes zero logic metrics.`;
  }

  const modalAvatarContent = hero.photo
    ? `<img src="${hero.photo}" alt="${hero.name}" class="modal-photo">`
    : `<span class="hero-shadow-avatar">${hero.avatar}</span>`;

  const FACTION_MATCHUP_TIP = {
    Legion: "Beats Dynasty's combos with Unbreakable State; watch out for Heralds' critical counters.",
    Dynasty: "Speed can rush down Heralds; struggles trading blows with Legion's Unbreakable State.",
    Heralds: "Critical counters punish Legion's slow recovery; vulnerable to Dynasty's fast combo pressure."
  };
  const topTalent = hero.talents[0][0];

  // Render static frame once
  modalContentWrapper.innerHTML = `
    <div class="modal-hero-top">
      <div class="modal-avatar">${modalAvatarContent}</div>
      <div class="modal-hero-title">
        <h3>${hero.name}</h3>
        <span class="hero-faction-badge faction-badge-${hero.faction.toLowerCase()}">${hero.faction}</span>
      </div>
    </div>

    <div class="modal-view-toggle">
      <button type="button" class="modal-view-btn active" data-view="bio">Full Bio</button>
      <button type="button" class="modal-view-btn" data-view="cheatsheet">Cheat Sheet</button>
    </div>

    <div class="modal-view-panel" id="modal-view-bio">
      <p class="modal-hero-desc">${bioText}</p>
    </div>

    <div class="modal-view-panel" id="modal-view-cheatsheet" style="display:none;">
      <ul class="cheat-sheet-list">
        <li><strong>Best Weapon:</strong> ${hero.weapons[hero.weapons.length - 1].name}</li>
        <li><strong>Top Talent:</strong> ${topTalent.name} &mdash; ${topTalent.desc}</li>
        <li><strong>Faction Matchup Tip:</strong> ${FACTION_MATCHUP_TIP[hero.faction]}</li>
      </ul>
    </div>

    <div class="modal-scaling-panel">
      <h4>Dynamic Stat Scaling</h4>
      <div class="modal-sliders">
        <div class="slider-row">
          <label for="modal-hl-slider">Hero Level: <span id="lbl-modal-hl">${scaleHLvl}</span></label>
          <input type="range" id="modal-hl-slider" min="1" max="13" value="${scaleHLvl}">
        </div>
        <div class="slider-row">
          <label for="modal-dl-slider">Dojo Level: <span id="lbl-modal-dl">${scaleDLvl}</span></label>
          <input type="range" id="modal-dl-slider" min="1" max="13" value="${scaleDLvl}">
        </div>
      </div>
      
      <div class="modal-stats-row">
        <div class="stat-box">
          <div class="stat-label">⚔️ Attack</div>
          <div class="stat-val text-gold" id="modal-atk-val">0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">🛡️ Defense</div>
          <div class="stat-val text-cyan" id="modal-def-val">0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">⚡ Shadow Power</div>
          <div class="stat-val text-purple" id="modal-shd-val">0</div>
        </div>
      </div>
      <div class="modal-weapon-stat-notice" style="font-size: 0.75rem; text-align: center; color: var(--text-muted); margin-top: 0.75rem;">
        Stats include active gear: <strong>${equippedWeapon.name}</strong>
      </div>
    </div>
  `;
  
  const viewBioPanel = document.getElementById("modal-view-bio");
  const viewCheatsheetPanel = document.getElementById("modal-view-cheatsheet");
  modalContentWrapper.querySelectorAll(".modal-view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      modalContentWrapper.querySelectorAll(".modal-view-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const view = btn.getAttribute("data-view");
      viewBioPanel.style.display = view === "bio" ? "block" : "none";
      viewCheatsheetPanel.style.display = view === "cheatsheet" ? "block" : "none";
    });
  });

  const lblHl = document.getElementById("lbl-modal-hl");
  const lblDl = document.getElementById("lbl-modal-dl");
  const valAtk = document.getElementById("modal-atk-val");
  const valDef = document.getElementById("modal-def-val");
  const valShd = document.getElementById("modal-shd-val");
  
  const updateModalStats = () => {
    const finalAtk = Math.round(calculateStat(hero.baseStats.attack, scaleHLvl, scaleDLvl) * equippedWeapon.attackMod);
    const finalDef = Math.round(calculateStat(hero.baseStats.defense, scaleHLvl, scaleDLvl) * equippedWeapon.defenseMod);
    const finalShd = Math.round(calculateStat(hero.baseStats.shadow, scaleHLvl, scaleDLvl) * equippedWeapon.attackMod);
    const mitigation = Math.round(getDefenseMitigation(finalDef) * 100);
    
    lblHl.textContent = scaleHLvl;
    lblDl.textContent = scaleDLvl;
    valAtk.textContent = finalAtk;
    valDef.innerHTML = `${finalDef} <span style="font-size:0.7rem; color:var(--text-muted);">(-${mitigation}%)</span>`;
    valShd.textContent = finalShd;
  };

  const hlSlider = document.getElementById("modal-hl-slider");
  const dlSlider = document.getElementById("modal-dl-slider");
  
  hlSlider.addEventListener("input", (e) => {
    scaleHLvl = parseInt(e.target.value);
    updateModalStats();
  });
  
  dlSlider.addEventListener("input", (e) => {
    scaleDLvl = parseInt(e.target.value);
    updateModalStats();
  });

  // Calculate and display initial values
  updateModalStats();
  heroModal.showModal();
}

function initHeroArchive() {
  renderHeroCards();
  
  heroSearch.addEventListener("input", (e) => {
    const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter");
    renderHeroCards(activeFilter, e.target.value);
  });
  
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const activeFilter = btn.getAttribute("data-filter");
      renderHeroCards(activeFilter, heroSearch.value);
    });
  });
  
  document.querySelector(".modal-close-btn").addEventListener("click", () => {
    heroModal.close();
  });
}

// --- Talent Builder Section ---
const builderHeroSelector = document.getElementById("builder-hero-selector");
const builderHeroHeader = document.getElementById("builder-hero-header");
const talentTreeGrid = document.getElementById("talent-tree-grid");
const weaponSelect = document.getElementById("weapon-select");
const weaponPerkDesc = document.getElementById("weapon-perk-desc");
const buildActiveList = document.getElementById("build-active-list");
const buildCodeInput = document.getElementById("build-code-input");
const copyBuildBtn = document.getElementById("copy-build-btn");
const copyToast = document.getElementById("copy-toast");

function initBuilderData() {
  builderHeroSelector.innerHTML = "";
  HERO_DATABASE.forEach(hero => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `builder-hero-btn ${state.selectedHeroId === hero.id ? 'active' : ''}`;
    const iconContent = hero.photo 
      ? `<img src="${hero.photo}" class="hero-micro-photo" style="margin-inline-end: 0.5rem;">` 
      : `<span class="hero-small-icon" style="margin-inline-end: 0.5rem;">${hero.avatar}</span>`;
    btn.innerHTML = `${iconContent} <span>${hero.name}</span>`;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".builder-hero-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.selectedHeroId = hero.id;
      renderBuilder();
    });
    builderHeroSelector.appendChild(btn);
  });
}

function renderBuilder() {
  const hero = HERO_DATABASE.find(h => h.id === state.selectedHeroId);
  if (!hero) return;
  
  const userConfig = state.builderBuilds[hero.id];
  
  const builderAvatar = hero.photo 
    ? `<img src="${hero.photo}" alt="${hero.name}" class="badge-photo">` 
    : `<span class="hero-shadow-avatar" style="font-size: 2rem;">${hero.avatar}</span>`;
    
  builderHeroHeader.innerHTML = `
    <div class="modal-avatar" style="width:70px; height:70px; display:flex; align-items:center; justify-content:center;">${builderAvatar}</div>
    <div>
      <h3>${hero.name}</h3>
      <span class="hero-faction-badge faction-badge-${hero.faction.toLowerCase()}">${hero.faction}</span>
    </div>
  `;
  
  weaponSelect.innerHTML = "";
  hero.weapons.forEach((w, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = `${w.name} (${w.rarity})`;
    if (idx === userConfig.weaponIdx) opt.selected = true;
    weaponSelect.appendChild(opt);
  });
  
  weaponSelect.onchange = (e) => {
    userConfig.weaponIdx = parseInt(e.target.value);
    updateBuilderOutputs(hero);
  };
  
  talentTreeGrid.innerHTML = "";
  hero.talents.forEach((tier, tierIdx) => {
    const row = document.createElement("div");
    row.className = "talent-tier-row";
    row.innerHTML = `<div class="tier-label">T${tierIdx + 1}</div>`;
    
    tier.forEach((talent, choiceIdx) => {
      const node = document.createElement("div");
      const isActive = userConfig.talents[tierIdx] === choiceIdx;
      node.className = `talent-node ${isActive ? 'active' : ''}`;
      node.innerHTML = `
        <div class="talent-title">
          <span>${choiceIdx === 0 ? '◀' : '▶'}</span>
          <span>${talent.name}</span>
        </div>
        <div class="talent-desc">${talent.desc}</div>
      `;
      
      node.addEventListener("click", () => {
        userConfig.talents[tierIdx] = choiceIdx;
        renderBuilder();
      });
      row.appendChild(node);
    });
    talentTreeGrid.appendChild(row);
  });
  
  updateBuilderOutputs(hero);
}

function updateBuilderOutputs(hero) {
  const userConfig = state.builderBuilds[hero.id];
  const weapon = hero.weapons[userConfig.weaponIdx];
  
  weaponPerkDesc.style.display = "block";
  weaponPerkDesc.innerHTML = `<strong>Weapon Perk:</strong> ${weapon.perk}`;
  
  buildActiveList.innerHTML = `
    <li>Faction: <span>${hero.faction}</span></li>
    <li>Physical Atk Modifier: <span>x${weapon.attackMod.toFixed(2)}</span></li>
    <li>Defense Modifier: <span>x${weapon.defenseMod.toFixed(2)}</span></li>
  `;
  
  hero.talents.forEach((tier, tierIdx) => {
    const chosenIdx = userConfig.talents[tierIdx];
    const talent = tier[chosenIdx];
    const li = document.createElement("li");
    li.innerHTML = `Tier ${tierIdx + 1}: <span>${talent.name}</span>`;
    buildActiveList.appendChild(li);
  });
  
  const prefix = hero.name.substring(0, 3).toUpperCase();
  const talentCode = userConfig.talents.map(idx => idx === 0 ? 'L' : 'R').join("");
  const code = `${prefix}-${userConfig.weaponIdx + 1}-${talentCode}`;
  buildCodeInput.value = code;
}

function importBuildCode(code) {
  if (!code) return;
  const parts = code.trim().split("-");
  if (parts.length !== 3) return;
  
  const prefix = parts[0].toUpperCase();
  const weaponNum = parseInt(parts[1]);
  const talentStr = parts[2].toUpperCase();
  
  const hero = HERO_DATABASE.find(h => h.id === state.selectedHeroId);
  if (!hero) return;
  
  const expectedPrefix = hero.name.substring(0, 3).toUpperCase();
  if (prefix !== expectedPrefix) return;
  
  if (isNaN(weaponNum) || weaponNum < 1 || weaponNum > hero.weapons.length) return;
  if (talentStr.length !== 5 || !/^[LR]{5}$/.test(talentStr)) return;
  
  const userConfig = state.builderBuilds[hero.id];
  userConfig.weaponIdx = weaponNum - 1;
  userConfig.talents = talentStr.split("").map(char => char === 'L' ? 0 : 1);
  
  renderBuilder();
}

function initBuilder() {
  initBuilderData();
  
  copyBuildBtn.addEventListener("click", () => {
    buildCodeInput.select();
    navigator.clipboard.writeText(buildCodeInput.value)
      .then(() => {
        copyToast.classList.add("show");
        setTimeout(() => copyToast.classList.remove("show"), 2000);
      });
  });

  buildCodeInput.addEventListener("input", (e) => {
    importBuildCode(e.target.value);
  });
}

// --- Combat Damage Calculator Section ---
const calcAttackerSelect = document.getElementById("calc-attacker-select");
const attHLvlSlider = document.getElementById("attacker-hero-lvl");
const attDLvlSlider = document.getElementById("attacker-dojo-lvl");
const valAttHl = document.getElementById("val-att-hl");
const valAttDl = document.getElementById("val-att-dl");
const attackerStatsReadout = document.getElementById("attacker-stats-readout");
const attackerActionSelect = document.getElementById("attacker-action-select");

const calcDefenderSelect = document.getElementById("calc-defender-select");
const defHLvlSlider = document.getElementById("defender-hero-lvl");
const defDLvlSlider = document.getElementById("defender-dojo-lvl");
const valDefHl = document.getElementById("val-def-hl");
const valDefDl = document.getElementById("val-def-dl");
const defenderStatsReadout = document.getElementById("defender-stats-readout");

const combatAttName = document.getElementById("combat-att-name");
const combatDefName = document.getElementById("combat-def-name");
const triggerCombatBtn = document.getElementById("trigger-combat-btn");

const visualAttacker = document.getElementById("visual-attacker");
const visualDefender = document.getElementById("visual-defender");
const visualDamageNumber = document.getElementById("visual-damage-number");

const calcHpFill = document.getElementById("calc-hp-fill");
const calcHpRatio = document.getElementById("calc-hp-ratio");

const repBasePower = document.getElementById("rep-base-power");
const repAttMultiplier = document.getElementById("rep-att-multiplier");
const repDefReduction = document.getElementById("rep-def-reduction");
const repNetDamage = document.getElementById("rep-net-damage");
const repAdvantage = document.getElementById("rep-advantage");
const repPunishText = document.getElementById("rep-punish-text");

function initCalculator() {
  calcAttackerSelect.innerHTML = "";
  calcDefenderSelect.innerHTML = "";
  
  HERO_DATABASE.forEach(hero => {
    const opt1 = document.createElement("option");
    opt1.value = hero.id;
    opt1.textContent = `${hero.name} (${hero.faction})`;
    if (hero.id === state.calculator.attackerId) opt1.selected = true;
    calcAttackerSelect.appendChild(opt1);
    
    const opt2 = document.createElement("option");
    opt2.value = hero.id;
    opt2.textContent = `${hero.name} (${hero.faction})`;
    if (hero.id === state.calculator.defenderId) opt2.selected = true;
    calcDefenderSelect.appendChild(opt2);
  });
  
  calcAttackerSelect.onchange = (e) => {
    state.calculator.attackerId = e.target.value;
    updateCalculatorStats();
  };
  calcDefenderSelect.onchange = (e) => {
    state.calculator.defenderId = e.target.value;
    resetDefenderHP();
    updateCalculatorStats();
  };
  
  const setupSlider = (slider, valueLabel, stateProp) => {
    slider.oninput = (e) => {
      const val = parseInt(e.target.value);
      valueLabel.textContent = val;
      state.calculator[stateProp] = val;
      updateCalculatorStats();
    };
  };
  
  setupSlider(attHLvlSlider, valAttHl, "attackerHLevel");
  setupSlider(attDLvlSlider, valAttDl, "attackerDLevel");
  setupSlider(defHLvlSlider, valDefHl, "defenderHLevel");
  setupSlider(defDLvlSlider, valDefDl, "defenderDLevel");
  
  attackerActionSelect.onchange = (e) => {
    state.calculator.attackerAction = e.target.value;
  };
  
  triggerCombatBtn.onclick = executeSimulatedHit;
  
  updateCalculatorStats();
  resetDefenderHP();
}

function updateCalculatorStats() {
  const attacker = HERO_DATABASE.find(h => h.id === state.calculator.attackerId);
  const defender = HERO_DATABASE.find(h => h.id === state.calculator.defenderId);
  
  if (!attacker || !defender) return;
  
  combatAttName.textContent = attacker.name;
  combatDefName.textContent = defender.name;
  
  const attackerAvatar = attacker.photo 
    ? `<img src="${attacker.photo}" alt="${attacker.name}" class="calc-photo">` 
    : `<span class="hero-shadow-avatar">${attacker.avatar}</span>`;
  const defenderAvatar = defender.photo 
    ? `<img src="${defender.photo}" alt="${defender.name}" class="calc-photo">` 
    : `<span class="hero-shadow-avatar">${defender.avatar}</span>`;
    
  visualAttacker.innerHTML = attackerAvatar;
  visualDefender.innerHTML = defenderAvatar;
  
  const attackerBuild = state.builderBuilds[attacker.id] || { weaponIdx: 0 };
  const attackerWeapon = attacker.weapons[attackerBuild.weaponIdx];
  const rawAttAttack = calculateStat(attacker.baseStats.attack, state.calculator.attackerHLevel, state.calculator.attackerDLevel);
  const attackerAttack = Math.round(rawAttAttack * attackerWeapon.attackMod);
  const attackerShadow = Math.round(calculateStat(attacker.baseStats.shadow, state.calculator.attackerHLevel, state.calculator.attackerDLevel) * attackerWeapon.attackMod);
  
  attackerStatsReadout.innerHTML = `
    <div class="stats-panel-readout-row"><span>⚔️ Boosted Attack:</span> <span>${attackerAttack}</span></div>
    <div class="stats-panel-readout-row"><span>⚡ Boosted Shadow:</span> <span>${attackerShadow}</span></div>
    <div class="stats-panel-readout-row"><span>Weapon:</span> <span>${attackerWeapon.name}</span></div>
  `;
  
  const defenderBuild = state.builderBuilds[defender.id] || { weaponIdx: 0 };
  const defenderWeapon = defender.weapons[defenderBuild.weaponIdx];
  const rawDefDefense = calculateStat(defender.baseStats.defense, state.calculator.defenderHLevel, state.calculator.defenderDLevel);
  const defenderDefense = Math.round(rawDefDefense * defenderWeapon.defenseMod);
  const maxHP = calculateStat(defender.baseStats.health, state.calculator.defenderHLevel, state.calculator.defenderDLevel);
  
  if (state.calculator.defenderHPMax !== maxHP) {
    const hpPercent = state.calculator.defenderHPCurrent / state.calculator.defenderHPMax;
    state.calculator.defenderHPMax = maxHP;
    state.calculator.defenderHPCurrent = Math.round(maxHP * (isNaN(hpPercent) ? 1 : hpPercent));
    updateHPBar();
  }
  
  const mitigation = Math.round(getDefenseMitigation(defenderDefense) * 100);
  
  defenderStatsReadout.innerHTML = `
    <div class="stats-panel-readout-row"><span>🛡️ Boosted Defense:</span> <span>${defenderDefense}</span></div>
    <div class="stats-panel-readout-row"><span>Mitigation Rate:</span> <span>-${mitigation}%</span></div>
    <div class="stats-panel-readout-row"><span>Max HP:</span> <span>${maxHP}</span></div>
  `;
}

function resetDefenderHP() {
  const defender = HERO_DATABASE.find(h => h.id === state.calculator.defenderId);
  if (!defender) return;
  const maxHP = calculateStat(defender.baseStats.health, state.calculator.defenderHLevel, state.calculator.defenderDLevel);
  state.calculator.defenderHPMax = maxHP;
  state.calculator.defenderHPCurrent = maxHP;
  updateHPBar();
}

function updateHPBar() {
  const percent = Math.max(0, (state.calculator.defenderHPCurrent / state.calculator.defenderHPMax) * 100);
  calcHpFill.style.width = `${percent}%`;
  calcHpRatio.textContent = `${state.calculator.defenderHPCurrent} / ${state.calculator.defenderHPMax}`;
  
  if (percent <= 20) {
    calcHpFill.style.background = "#dc2626";
  } else {
    calcHpFill.style.background = "#ef4444";
  }
}

function executeSimulatedHit() {
  const attacker = HERO_DATABASE.find(h => h.id === state.calculator.attackerId);
  const defender = HERO_DATABASE.find(h => h.id === state.calculator.defenderId);
  if (!attacker || !defender) return;
  
  let baseActionPower = 100;
  let isShadow = false;
  
  switch(state.calculator.attackerAction) {
    case "basic": baseActionPower = 110; break;
    case "heavy": baseActionPower = 180; break;
    case "special": baseActionPower = 250; break;
    case "shadow": baseActionPower = 320; isShadow = true; break;
  }
  
  const attackerBuild = state.builderBuilds[attacker.id] || { weaponIdx: 0 };
  const attackerWeapon = attacker.weapons[attackerBuild.weaponIdx];
  const rawAttAttack = calculateStat(attacker.baseStats.attack, state.calculator.attackerHLevel, state.calculator.attackerDLevel);
  const attackerAttack = Math.round(rawAttAttack * attackerWeapon.attackMod);
  const attackerShadow = Math.round(calculateStat(attacker.baseStats.shadow, state.calculator.attackerHLevel, state.calculator.attackerDLevel) * attackerWeapon.attackMod);
  
  const defenderBuild = state.builderBuilds[defender.id] || { weaponIdx: 0 };
  const defenderWeapon = defender.weapons[defenderBuild.weaponIdx];
  const rawDefDefense = calculateStat(defender.baseStats.defense, state.calculator.defenderHLevel, state.calculator.defenderDLevel);
  const defenderDefense = Math.round(rawDefDefense * defenderWeapon.defenseMod);
  
  const attBoost = isShadow ? attackerShadow : attackerAttack;
  const rawDamage = baseActionPower * (attBoost / 100);
  const mitigationRate = getDefenseMitigation(defenderDefense);
  const netDamage = Math.round(rawDamage * (1 - mitigationRate));
  
  state.calculator.defenderHPCurrent = Math.max(0, state.calculator.defenderHPCurrent - netDamage);
  updateHPBar();
  
  repBasePower.textContent = baseActionPower;
  repAttMultiplier.textContent = `x${(attBoost/100).toFixed(2)}`;
  repDefReduction.textContent = `-${Math.round(mitigationRate * 100)}%`;
  repNetDamage.textContent = netDamage;

  const advantage = getEstimatedAdvantage(state.calculator.attackerAction, defender.baseStats.defense);
  repAdvantage.textContent = advantage >= 0 ? `+${advantage}` : `${advantage}`;
  repAdvantage.style.color = advantage >= 0 ? "#10b981" : "#ef4444";
  if (advantage < 0) {
    repPunishText.textContent = `${defender.name} can punish this on block!`;
  } else {
    repPunishText.textContent = `${attacker.name}'s action is safe on block.`;
  }
  
  visualDamageNumber.textContent = `-${netDamage}`;
  visualDamageNumber.classList.remove("show");
  void visualDamageNumber.offsetWidth;
  visualDamageNumber.classList.add("show");
  
  visualAttacker.classList.add("hitting");
  setTimeout(() => visualAttacker.classList.remove("hitting"), 300);
  
  setTimeout(() => {
    visualDefender.classList.add("shaking");
    setTimeout(() => visualDefender.classList.remove("shaking"), 300);
  }, 100);
  
  if (state.calculator.defenderHPCurrent <= 0) {
    setTimeout(() => {
      alert(`${defender.name} has been defeated! Resetting defender HP.`);
      resetDefenderHP();
    }, 800);
  }
}

// --- Arena Simulator Mini-Game Section ---
const simPlayerHP = document.getElementById("sim-player-hp");
const simPlayerShadow = document.getElementById("sim-player-shadow");
const simPlayerAction = document.getElementById("sim-player-action");
const simPlayerSprite = document.getElementById("sim-player-sprite");
const simPlayerTitle = document.getElementById("sim-player-title");

const simOpponentHP = document.getElementById("sim-opponent-hp");
const simOpponentShadow = document.getElementById("sim-opponent-shadow");
const simOpponentAction = document.getElementById("sim-opponent-action");
const simOpponentSprite = document.getElementById("sim-opponent-sprite");

const simCombatLog = document.getElementById("sim-combat-log");
const simShadowBtn = document.getElementById("sim-shadow-btn");
const simHeroPicks = document.getElementById("sim-hero-picks");

function initSimulator() {
  simHeroPicks.innerHTML = "";
  
  // Show a select subset of diverse heroes for the sim game
  const simChoices = ["marcus", "shang", "itu", "ironclad", "lynx"];
  
  simChoices.forEach(heroId => {
    const hero = HERO_DATABASE.find(h => h.id === heroId);
    if (!hero) return;
    
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `sim-choice-btn ${state.simulator.playerHeroId === hero.id ? 'active' : ''}`;
    btn.textContent = hero.name;
    btn.onclick = () => {
      document.querySelectorAll(".sim-choice-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.simulator.playerHeroId = hero.id;
      resetSimGame();
    };
    simHeroPicks.appendChild(btn);
  });
  
  const controls = document.querySelectorAll(".sim-action-btn:not(.shadow-release-btn)");
  controls.forEach(btn => {
    btn.onclick = () => {
      const act = btn.getAttribute("data-action");
      executeSimTurn(act);
    };
  });
  
  simShadowBtn.onclick = () => {
    executeSimTurn("shadow");
  };
  
  resetSimGame();
}

function resetSimGame() {
  const player = HERO_DATABASE.find(h => h.id === state.simulator.playerHeroId);
  const opponent = HERO_DATABASE.find(h => h.id === state.simulator.opponentHeroId);
  
  state.simulator.playerHP = 1000;
  state.simulator.playerShadow = 0;
  state.simulator.opponentHP = 1000;
  state.simulator.opponentShadow = 0;
  state.simulator.isPlaying = true;
  
  simPlayerTitle.textContent = player.name;
  simPlayerSprite.innerHTML = player.photo 
    ? `<img src="${player.photo}" class="calc-photo">` 
    : `<span class="hero-shadow-avatar">${player.avatar}</span>`;
  simOpponentSprite.innerHTML = opponent.photo 
    ? `<img src="${opponent.photo}" class="calc-photo">` 
    : `<span class="hero-shadow-avatar">${opponent.avatar}</span>`;
  
  simPlayerAction.textContent = "READY";
  simOpponentAction.textContent = "READY";
  
  simCombatLog.innerHTML = `<div class="log-entry system-msg">Arena battle initialized: ${player.name} vs Shadow AI (${opponent.name}). Start!</div>`;
  
  updateSimUI();
}

function updateSimUI() {
  simPlayerHP.style.width = `${(state.simulator.playerHP / 1000) * 100}%`;
  simPlayerShadow.style.width = `${state.simulator.playerShadow}%`;
  
  simOpponentHP.style.width = `${(state.simulator.opponentHP / 1000) * 100}%`;
  simOpponentShadow.style.width = `${state.simulator.opponentShadow}%`;
  
  if (state.simulator.playerShadow >= 100) {
    simShadowBtn.disabled = false;
  } else {
    simShadowBtn.disabled = true;
  }
}

function logSimMessage(msg, type = "system-msg") {
  const entry = document.createElement("div");
  entry.className = `log-entry ${type}`;
  entry.textContent = msg;
  simCombatLog.appendChild(entry);
  simCombatLog.scrollTop = simCombatLog.scrollHeight;
}

function executeSimTurn(playerMove) {
  if (!state.simulator.isPlaying) return;
  
  const player = HERO_DATABASE.find(h => h.id === state.simulator.playerHeroId);
  const opponent = HERO_DATABASE.find(h => h.id === state.simulator.opponentHeroId);
  
  let aiMove = "attack";
  if (state.simulator.opponentShadow >= 100) {
    aiMove = "shadow";
  } else {
    const rand = Math.random();
    if (rand < 0.4) aiMove = "attack";
    else if (rand < 0.7) aiMove = "block";
    else aiMove = "throw";
  }
  
  simPlayerAction.textContent = playerMove;
  simOpponentAction.textContent = aiMove;
  
  if (playerMove === "attack" || playerMove === "shadow") {
    simPlayerSprite.classList.add("sprite-attack");
    setTimeout(() => simPlayerSprite.classList.remove("sprite-attack"), 300);
  }
  if (aiMove === "attack" || aiMove === "shadow") {
    simOpponentSprite.classList.add("sprite-attack");
    setTimeout(() => simOpponentSprite.classList.remove("sprite-attack"), 300);
  }
  
  let pDmg = 0;
  let oDmg = 0;
  let pShadowGain = 0;
  let oShadowGain = 0;
  
  if (playerMove === "shadow" && aiMove === "shadow") {
    logSimMessage("⚡ SHADOW CLASH! Both fighters unleash shadow storm. The shockwave pushes them back!", "shadow-attack");
    pDmg = 120;
    oDmg = 120;
    state.simulator.playerShadow = 0;
    state.simulator.opponentShadow = 0;
  } else if (playerMove === "shadow") {
    logSimMessage(`⚡ ${player.name} enters SHADOW FORM and hits with an unblockable Shadow Ability!`, "shadow-attack");
    oDmg = 250;
    state.simulator.playerShadow = 0;
    pShadowGain = 0;
    oShadowGain = 10;
  } else if (aiMove === "shadow") {
    logSimMessage(`⚡ Opponent enters SHADOW FORM and lands a devastating unblockable slam!`, "shadow-attack");
    pDmg = 250;
    state.simulator.opponentShadow = 0;
    oShadowGain = 0;
    pShadowGain = 10;
  } else {
    if (playerMove === aiMove) {
      logSimMessage(`💥 Clash! Both chose ${playerMove.toUpperCase()}. Weapons recoil!`, "system-msg");
      pDmg = 30;
      oDmg = 30;
      pShadowGain = 8;
      oShadowGain = 8;
    } else if (playerMove === "attack" && aiMove === "throw") {
      logSimMessage(`⚔️ ${player.name} intercepts the throw with a swift Attack, dealing strike damage!`, "player-win");
      oDmg = 140;
      pShadowGain = 20;
      oShadowGain = 5;
    } else if (playerMove === "throw" && aiMove === "attack") {
      logSimMessage(`👤 Opponent AI blocks your throw with a quick punch!`, "opponent-win");
      pDmg = 140;
      pShadowGain = 5;
      oShadowGain = 20;
    } else if (playerMove === "block" && aiMove === "attack") {
      logSimMessage(`🛡️ Perfect Guard! ${player.name} blocks the strike and counters with a shield bash!`, "player-win");
      oDmg = 90;
      pShadowGain = 15;
      oShadowGain = 5;
    } else if (playerMove === "attack" && aiMove === "block") {
      logSimMessage(`👤 Opponent AI blocks your strike and executes a rapid counter-punch!`, "opponent-win");
      pDmg = 90;
      pShadowGain = 5;
      oShadowGain = 15;
    } else if (playerMove === "throw" && aiMove === "block") {
      logSimMessage(`🤼 Gotcha! ${player.name} grabs the blocking opponent and slams them to the floor!`, "player-win");
      oDmg = 170;
      pShadowGain = 18;
      oShadowGain = 3;
    } else if (playerMove === "block" && aiMove === "throw") {
      logSimMessage(`👤 Opponent AI grabs your guard and performs a high shoulder throw!`, "opponent-win");
      pDmg = 170;
      pShadowGain = 3;
      oShadowGain = 18;
    }
  }
  
  if (oDmg > 0) {
    state.simulator.opponentHP = Math.max(0, state.simulator.opponentHP - oDmg);
    simOpponentSprite.classList.add("sprite-hurt");
    setTimeout(() => simOpponentSprite.classList.remove("sprite-hurt"), 300);
  }
  if (pDmg > 0) {
    state.simulator.playerHP = Math.max(0, state.simulator.playerHP - pDmg);
    simPlayerSprite.classList.add("sprite-hurt");
    setTimeout(() => simPlayerSprite.classList.remove("sprite-hurt"), 300);
  }
  
  state.simulator.playerShadow = Math.min(100, state.simulator.playerShadow + pShadowGain);
  state.simulator.opponentShadow = Math.min(100, state.simulator.opponentShadow + oShadowGain);
  
  updateSimUI();
  
  if (state.simulator.playerHP <= 0 && state.simulator.opponentHP <= 0) {
    logSimMessage("💀 DOUBLE KNOCKOUT! The duel ends in a draw.", "system-msg");
    state.simulator.isPlaying = false;
  } else if (state.simulator.playerHP <= 0) {
    logSimMessage(`💀 DEFEAT! You were beaten by the Shadow AI. Try again!`, "opponent-win");
    state.simulator.isPlaying = false;
  } else if (state.simulator.opponentHP <= 0) {
    logSimMessage(`🏆 VICTORY! You defeated the Shadow opponent! Excellent work.`, "player-win");
    state.simulator.isPlaying = false;
  }
}

// --- Quiz Section State & Logic ---
const QUIZ_QUESTIONS = [
  {
    q: "Who was the warrior that originally opened the Gates of Shadows, unleashing the demons?",
    options: ["Marcus", "Shadow", "Itu", "Sarge"],
    correct: 1
  },
  {
    q: "What is the signature combat mechanic of the Legion faction, enabling uninterrupted trades?",
    options: ["Critical Focus", "Time Shift", "Unbreakable State", "Lifesteal Beast"],
    correct: 2
  },
  {
    q: "Which physics-based animation software is used internally by Nekki to animate the Shadow Fight games?",
    options: ["Blender Physics", "Cascadeur", "Autodesk Maya", "Unreal Engine ControlRig"],
    correct: 1
  },
  {
    q: "What is the name of the sentient Shadow force that tears space-time to host the Arena tournament?",
    options: ["Shadow Beast", "Shadow Lord", "Shadow Mind", "The Emperor"],
    correct: 2
  },
  {
    q: "Which faction treats Shadow Energy with scientific precision, using cyber-technology under a dome?",
    options: ["Legion", "Dynasty", "Heralds", "Liquidators"],
    correct: 2
  }
];

const quizState = {
  currentIdx: 0,
  score: 0,
  answered: false
};

const quizQuestionCard = document.getElementById("quiz-question-card");
const quizResultCard = document.getElementById("quiz-result-card");
const quizCurrentNum = document.getElementById("quiz-current-num");
const quizQuestionText = document.getElementById("quiz-question-text");
const quizOptionsContainer = document.getElementById("quiz-options-container");
const quizNextBtn = document.getElementById("quiz-next-btn");

const quizScoreFraction = document.getElementById("quiz-score-fraction");
const quizRankTitle = document.getElementById("quiz-rank-title");
const quizFeedbackText = document.getElementById("quiz-feedback-text");
const quizBadgeUnlock = document.getElementById("quiz-badge-unlock");
const quizRetryBtn = document.getElementById("quiz-retry-btn");

function initQuiz() {
  quizState.currentIdx = 0;
  quizState.score = 0;
  quizState.answered = false;
  
  quizQuestionCard.style.display = "flex";
  quizResultCard.style.display = "none";
  quizNextBtn.style.display = "none";
  
  renderQuizQuestion();
  
  quizNextBtn.onclick = handleQuizNext;
  quizRetryBtn.onclick = initQuiz;
}

function renderQuizQuestion() {
  quizState.answered = false;
  quizNextBtn.style.display = "none";
  
  const qObj = QUIZ_QUESTIONS[quizState.currentIdx];
  quizCurrentNum.textContent = quizState.currentIdx + 1;
  quizQuestionText.textContent = qObj.q;
  
  quizOptionsContainer.innerHTML = "";
  
  qObj.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-opt-btn";
    btn.textContent = opt;
    btn.onclick = () => handleQuizAnswerSelect(idx);
    quizOptionsContainer.appendChild(btn);
  });
}

function handleQuizAnswerSelect(chosenIdx) {
  if (quizState.answered) return;
  quizState.answered = true;
  
  const qObj = QUIZ_QUESTIONS[quizState.currentIdx];
  const buttons = quizOptionsContainer.querySelectorAll(".quiz-opt-btn");
  
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === qObj.correct) {
      btn.classList.add("correct");
    }
    if (idx === chosenIdx && chosenIdx !== qObj.correct) {
      btn.classList.add("incorrect");
    }
  });
  
  if (chosenIdx === qObj.correct) {
    quizState.score++;
  }
  
  quizNextBtn.style.display = "block";
}

function handleQuizNext() {
  quizState.currentIdx++;
  if (quizState.currentIdx < QUIZ_QUESTIONS.length) {
    renderQuizQuestion();
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  quizQuestionCard.style.display = "none";
  quizResultCard.style.display = "flex";
  
  quizScoreFraction.textContent = `${quizState.score} / ${QUIZ_QUESTIONS.length}`;
  
  let rank = "Novice";
  let feedback = "Keep training in the archives to master the lore!";
  let showBadge = false;
  
  if (quizState.score === 5) {
    rank = "Shadow Scholar 🏆";
    feedback = "Phenomenal! You possess complete mastery of the Shadow Fight universe history and mechanics!";
    showBadge = true;
  } else if (quizState.score === 4) {
    rank = "Legion Sentinel 🛡️";
    feedback = "Great job! A few more scrolls and you will be a true master.";
  } else if (quizState.score === 3) {
    rank = "Herald Apprentice 👁️";
    feedback = "Good effort. Study the faction summaries and try again.";
  } else {
    rank = "Initiate 👤";
    feedback = "The shadow trials are tough. Re-read the Chronology tab and try again!";
  }
  
  quizRankTitle.textContent = `Rank: ${rank}`;
  quizFeedbackText.textContent = feedback;
  quizBadgeUnlock.style.display = showBadge ? "flex" : "none";
}

// --- Community Tier List Section ---
const TIER_VOTES_STORAGE_KEY = "sf4a_tier_votes";
const tierVoteMatchup = document.getElementById("tier-vote-matchup");
const tierVoteCount = document.getElementById("tier-vote-count");
const tierRowsContainer = document.getElementById("tier-rows-container");
const tierResetBtn = document.getElementById("tier-reset-btn");

let tierVoteState = { votes: {}, sessionVotes: 0 };
let currentTierMatchup = null;

function loadTierVotes() {
  try {
    const raw = localStorage.getItem(TIER_VOTES_STORAGE_KEY);
    tierVoteState.votes = raw ? JSON.parse(raw) : {};
  } catch (e) {
    tierVoteState.votes = {};
  }
}

function saveTierVotes() {
  localStorage.setItem(TIER_VOTES_STORAGE_KEY, JSON.stringify(tierVoteState.votes));
}

function getHeroTierScore(hero) {
  return getHeroSeedScore(hero) + (tierVoteState.votes[hero.id] || 0);
}

function pickRandomMatchup() {
  const a = HERO_DATABASE[Math.floor(Math.random() * HERO_DATABASE.length)];
  let b = HERO_DATABASE[Math.floor(Math.random() * HERO_DATABASE.length)];
  while (b.id === a.id) {
    b = HERO_DATABASE[Math.floor(Math.random() * HERO_DATABASE.length)];
  }
  return [a, b];
}

function renderTierMatchup() {
  currentTierMatchup = pickRandomMatchup();
  const [a, b] = currentTierMatchup;
  const avatarFor = (h) => h.photo
    ? `<img src="${h.photo}" alt="${h.name}" class="tier-vote-photo">`
    : `<span class="hero-shadow-avatar">${h.avatar}</span>`;

  tierVoteMatchup.innerHTML = `
    <button type="button" class="tier-vote-fighter" data-winner="${a.id}" data-loser="${b.id}">
      ${avatarFor(a)}
      <span>${a.name}</span>
    </button>
    <span class="tier-vote-vs">VS</span>
    <button type="button" class="tier-vote-fighter" data-winner="${b.id}" data-loser="${a.id}">
      ${avatarFor(b)}
      <span>${b.name}</span>
    </button>
  `;

  tierVoteMatchup.querySelectorAll(".tier-vote-fighter").forEach(btn => {
    btn.addEventListener("click", () => {
      const winnerId = btn.getAttribute("data-winner");
      const loserId = btn.getAttribute("data-loser");
      tierVoteState.votes[winnerId] = (tierVoteState.votes[winnerId] || 0) + 15;
      tierVoteState.votes[loserId] = (tierVoteState.votes[loserId] || 0) - 15;
      tierVoteState.sessionVotes++;
      saveTierVotes();
      tierVoteCount.textContent = tierVoteState.sessionVotes;
      renderTierRows();
      renderTierMatchup();
    });
  });
}

function renderTierRows() {
  const ranked = [...HERO_DATABASE].sort((h1, h2) => getHeroTierScore(h2) - getHeroTierScore(h1));
  const tierCount = ranked.length;
  const bands = [
    { label: "S", cls: "tier-band-s", cut: Math.ceil(tierCount * 0.12) },
    { label: "A", cls: "tier-band-a", cut: Math.ceil(tierCount * 0.32) },
    { label: "B", cls: "tier-band-b", cut: Math.ceil(tierCount * 0.60) },
    { label: "C", cls: "tier-band-c", cut: Math.ceil(tierCount * 0.85) },
    { label: "D", cls: "tier-band-d", cut: tierCount }
  ];

  let idx = 0;
  tierRowsContainer.innerHTML = bands.map(band => {
    const rowHeroes = ranked.slice(idx, band.cut);
    idx = band.cut;
    const chips = rowHeroes.map(h => `
      <div class="tier-hero-chip" title="${h.name}">
        ${h.photo ? `<img src="${h.photo}" alt="${h.name}">` : `<span>${h.avatar}</span>`}
        <span>${h.name}</span>
      </div>
    `).join("");
    return `
      <div class="tier-row">
        <div class="tier-row-label ${band.cls}">${band.label}</div>
        <div class="tier-row-chips">${chips}</div>
      </div>
    `;
  }).join("");
}

function initTierList() {
  loadTierVotes();
  tierVoteCount.textContent = tierVoteState.sessionVotes;
  renderTierMatchup();
  renderTierRows();

  tierResetBtn.onclick = () => {
    tierVoteState.votes = {};
    tierVoteState.sessionVotes = 0;
    saveTierVotes();
    tierVoteCount.textContent = 0;
    renderTierRows();
    renderTierMatchup();
  };
}

// --- Dojo Council Rulings (Balance Changelog) Section ---
const rulingsListContainer = document.getElementById("rulings-list-container");

const COUNCIL_RULINGS = [
  {
    date: "2026.06.15",
    title: "Legion Audit",
    entries: [
      "Ironclad: Defense 140 → 132 (Unbreakable State deemed too punishing in prolonged trades)"
    ]
  },
  {
    date: "2026.05.02",
    title: "Dynasty Review",
    entries: [
      "Itu: Shadow 90 → 98 (rewarding aggressive, high-hit-count playstyles)"
    ]
  },
  {
    date: "2026.03.20",
    title: "Heralds Calibration",
    entries: [
      "Shang: Attack 118 → 112 (critical counter windows were outperforming risk/reward design)"
    ]
  },
  {
    date: "2026.02.11",
    title: "Cross-Faction Pass",
    entries: [
      "Marcus: Health 1100 → 1150 (durability brought in line with heavy-armor archetypes)",
      "Global: Shadow Ability cost adjusted for smoother meter pacing across all factions"
    ]
  },
  {
    date: "2026.01.04",
    title: "Founding Ruling",
    entries: [
      "Initial baseline stats ratified by the Dojo Council for all three coalitions"
    ]
  }
];

function renderRulings() {
  rulingsListContainer.innerHTML = COUNCIL_RULINGS.map(entry => `
    <div class="ruling-card">
      <div class="ruling-header">
        <span class="ruling-date">${entry.date}</span>
        <h4>${entry.title}</h4>
      </div>
      <ul class="ruling-entries">
        ${entry.entries.map(e => `<li>${e}</li>`).join("")}
      </ul>
    </div>
  `).join("");
}

// --- App Initialization Entrypoint ---
document.addEventListener("DOMContentLoaded", () => {
  populateHeroFallbacks();
  initBuilds();
  initTabs();
  initPerspectiveSwitcher();
  initHeroArchive();
  initBuilder();
  initQuiz();
});

