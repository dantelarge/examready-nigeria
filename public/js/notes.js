/* ============================================================
   ExamReady Nigeria — notes.js
   Study notes data + render engine
   ============================================================ */

'use strict';

const NOTES_DATA = {
  'Mathematics': {
    emoji: '🔢',
    desc: 'Algebra, geometry, statistics, calculus and number theory',
    topics: [
      {
        title: 'Algebra & Equations',
        points: [
          'Linear equation: isolate x — e.g. 2x + 3 = 11 → x = 4',
          'Quadratic formula: x = (−b ± √(b²−4ac)) / 2a',
          'Factorisation: x² + 5x + 6 = (x+2)(x+3) — find two numbers that add to 5 and multiply to 6',
          'Completing the square: x² + bx = (x + b/2)² − (b/2)²',
          'Simultaneous equations: use elimination or substitution method',
          'Inequalities: flip the inequality sign when dividing by a negative number',
          'Nature of roots: b²−4ac > 0 (two real roots), = 0 (equal roots), < 0 (no real roots)',
        ]
      },
      {
        title: 'Numbers & Indices',
        points: [
          'LCM: lowest common multiple (use prime factorisation)',
          'HCF: highest common factor',
          'Laws of indices: a^m × a^n = a^(m+n); a^m ÷ a^n = a^(m−n); (a^m)^n = a^(mn)',
          'Special indices: a^0 = 1; a^(−n) = 1/a^n; a^(1/n) = nth root of a',
          'Logarithm: log_a(x) = n means a^n = x; log(AB) = logA + logB; log(A^n) = n logA',
          'Surds: √a × √b = √(ab); rationalise denominator by multiplying by conjugate',
          'Standard form: write as A × 10^n where 1 ≤ A < 10',
        ]
      },
      {
        title: 'Geometry & Mensuration',
        points: [
          'Area of circle = πr²; circumference = 2πr (use π = 22/7 or 3.142)',
          'Pythagoras theorem: c² = a² + b² (for right-angled triangles only)',
          'Volume: cylinder = πr²h; cone = (1/3)πr²h; sphere = (4/3)πr³',
          'Sum of interior angles of a polygon = (n−2) × 180°; exterior angles sum = 360°',
          'Trigonometry: SOH-CAH-TOA; sin30°=0.5, cos60°=0.5, tan45°=1, sin90°=1',
          'Sector area = (θ/360°) × πr²; Arc length = (θ/360°) × 2πr',
          'Similar shapes: area ratio = (length ratio)²; volume ratio = (length ratio)³',
        ]
      },
      {
        title: 'Statistics & Probability',
        points: [
          'Mean = sum of all values ÷ number of values',
          'Median = middle value when arranged in order (average middle two if even count)',
          'Mode = most frequently occurring value',
          'Range = highest value − lowest value',
          'Probability = favourable outcomes ÷ total possible outcomes (always 0 to 1)',
          'P(A or B) = P(A) + P(B) − P(A and B); for mutually exclusive: P(A or B) = P(A) + P(B)',
          'P(A and B) = P(A) × P(B) for independent events',
        ]
      },
      {
        title: 'Sequences & Series',
        points: [
          'Arithmetic Progression (AP): nth term = a + (n−1)d; Sum = n/2 × [2a + (n−1)d]',
          'Geometric Progression (GP): nth term = ar^(n−1); Sum = a(1−r^n)/(1−r) for r ≠ 1',
          'Sum to infinity of GP (|r| < 1): S∞ = a/(1−r)',
          'a = first term, d = common difference, r = common ratio',
          'Simple Interest: SI = PRT/100; Amount = P + SI',
          'Compound Interest: A = P(1 + r/100)^n',
          'Depreciation: A = P(1 − r/100)^n',
        ]
      },
      {
        title: 'Sets & Coordinate Geometry',
        points: [
          'Venn diagram: n(A ∪ B) = n(A) + n(B) − n(A ∩ B)',
          'Gradient of a line: m = (y₂ − y₁) / (x₂ − x₁)',
          'Equation of a line: y = mx + c (slope-intercept form)',
          'Midpoint: ((x₁ + x₂)/2, (y₁ + y₂)/2)',
          'Distance between two points: d = √[(x₂−x₁)² + (y₂−y₁)²]',
          'Perpendicular lines: product of gradients = −1 (m₁ × m₂ = −1)',
          'Equation of circle with centre (a, b) and radius r: (x−a)² + (y−b)² = r²',
        ]
      },
      {
        title: 'Permutation & Combination',
        points: [
          'Permutation (order matters): nPr = n! / (n−r)!',
          'Combination (order does not matter): nCr = n! / [r!(n−r)!]',
          'n! = n × (n−1) × ... × 2 × 1; by definition 0! = 1',
          'Arrangements with repetitions: n! / (p! × q! × ...) for p, q identical objects',
          'Binomial expansion: (a+b)^n — coefficients from Pascal\'s triangle or nCr formula',
          'Fundamental counting principle: if event A can occur m ways and B can occur n ways, both = m × n',
        ]
      },
      {
        title: 'Vectors & Matrices',
        points: [
          'Vector has magnitude and direction; scalar has magnitude only',
          'Position vector of (x, y): xi + yj; magnitude |v| = √(x² + y²)',
          'Adding vectors: add corresponding components',
          'Matrix multiplication: (m×n) × (n×p) gives (m×p) — inner dimensions must match',
          'Determinant of 2×2: det [[a,b],[c,d]] = ad − bc',
          'Inverse of 2×2: (1/det) × [[d,−b],[−c,a]]',
          'Identity matrix I has 1s on diagonal, 0s elsewhere; A × I = A',
        ]
      },
    ]
  },

  'English Language': {
    emoji: '📝',
    desc: 'Grammar, vocabulary, comprehension, oral English and essay writing',
    topics: [
      {
        title: 'Parts of Speech',
        points: [
          'Noun: name of a person, place, thing or idea (proper, common, abstract, collective)',
          'Pronoun: replaces a noun — I, he, she, they, it, we, you, who, which',
          'Adjective: describes a noun — tall, beautiful, three, many, this',
          'Verb: action or state — run, think, is, become, seem',
          'Adverb: modifies verb/adjective/adverb — quickly, very, always, never',
          'Preposition: shows relationship — in, on, at, by, under, through, between',
          'Conjunction: joins clauses — and, but, because, although, since, unless',
          'Interjection: exclamation — oh!, wow!, alas!, indeed!',
        ]
      },
      {
        title: 'Tenses & Grammar',
        points: [
          'Simple present: He runs. Simple past: He ran. Simple future: He will run.',
          'Present continuous: He is running. Past continuous: He was running.',
          'Present perfect: He has run. Past perfect: He had run.',
          'Conditional: If I study hard, I will pass (Type 1 — real); If I studied, I would pass (Type 2 — unreal)',
          'Subject-verb agreement: singular subject takes singular verb (The team IS ready)',
          'Passive voice: subject receives action — "The book was read by her"',
          'Reported speech: tenses shift back; pronouns and time references change',
        ]
      },
      {
        title: 'Figures of Speech',
        points: [
          'Simile: comparison using "like" or "as" — "brave as a lion"',
          'Metaphor: direct comparison without "like/as" — "life is a journey"',
          'Personification: human qualities given to non-human things — "the wind howled"',
          'Hyperbole: deliberate exaggeration for emphasis — "a mountain of work"',
          'Irony: saying the opposite of what is meant',
          'Oxymoron: contradictory terms combined — "deafening silence", "living death"',
          'Alliteration: repetition of consonant sounds — "Peter Piper picked"',
          'Onomatopoeia: words that sound like their meaning — buzz, hiss, bang, murmur',
        ]
      },
      {
        title: 'Vocabulary',
        points: [
          'Synonym: word with similar meaning (benevolent = generous, kind)',
          'Antonym: word with opposite meaning (verbose ≠ concise)',
          'Homophone: same sound, different spelling/meaning — their/there/they\'re',
          'Homonym: same spelling, different meaning — bat (animal/cricket)',
          'Commonly confused: affect (verb) / effect (noun); principal (head) / principle (rule)',
          'Prefixes: un- (not), re- (again), mis- (wrong), pre- (before), dis- (opposite)',
          'Suffixes: -tion/-sion (noun), -ous/-ful (adjective), -ly (adverb), -ness (noun)',
        ]
      },
      {
        title: 'Comprehension Skills',
        points: [
          'Read the passage at least twice before answering questions',
          'Identify the main idea — usually in the opening or closing paragraph',
          'Paraphrase answers — do not copy verbatim from the passage',
          'Inferential questions: read between the lines; the answer is implied, not stated',
          'Vocabulary in context: use surrounding sentences to determine word meaning',
          'Summary writing: include only points asked for; no padding or personal opinions',
          'Tone: identify whether the writer is critical, supportive, ironic, humorous, etc.',
        ]
      },
      {
        title: 'Oral English & Phonetics',
        points: [
          'Short vowels: /ɪ/ (sit), /e/ (bed), /æ/ (cat), /ɒ/ (hot), /ʊ/ (book), /ʌ/ (cup)',
          'Long vowels: /iː/ (feet), /ɑː/ (car), /ɔː/ (door), /uː/ (food), /ɜː/ (bird)',
          'Consonants: voiced (/b/, /d/, /g/, /v/) vs voiceless (/p/, /t/, /k/, /f/)',
          'Word stress: con-TENT (noun) vs CON-tent (adjective); re-CORD vs REC-ord',
          'Intonation: rises for yes/no questions; falls for statements and wh- questions',
          'Rhyme: words ending with the same sound — feet/beat, rain/train, show/go',
        ]
      },
      {
        title: 'Essay & Letter Writing',
        points: [
          'Formal letter format: sender\'s address → date → recipient\'s address → Dear Sir/Madam → body → Yours faithfully',
          'Informal letter: date → Dear [Name] → body → Yours sincerely / Your friend',
          'Expository essay: explains a topic clearly using facts and examples',
          'Argumentative essay: takes a clear position and defends it with evidence',
          'Narrative essay: tells a story with vivid language; use chronological order',
          'Descriptive essay: paints a picture using all five senses and figurative language',
          'Always write a clear introduction, developed body paragraphs and a conclusion',
        ]
      },
    ]
  },

  'Physics': {
    emoji: '⚡',
    desc: 'Mechanics, waves, optics, electricity, thermodynamics and modern physics',
    topics: [
      {
        title: 'Mechanics & Motion',
        points: [
          'Newton\'s 1st law: object stays at rest or uniform motion unless net force acts on it',
          'Newton\'s 2nd law: F = ma (net force = mass × acceleration)',
          'Newton\'s 3rd law: every action has an equal and opposite reaction',
          'Equations of motion (uniform acceleration): v = u + at; s = ut + ½at²; v² = u² + 2as',
          'Projectile: horizontal velocity constant; vertical acceleration = g (9.8 m/s²)',
          'Momentum = mv; Conservation of momentum: total momentum before = total after',
          'Impulse = F × t = change in momentum',
        ]
      },
      {
        title: 'Energy, Work & Power',
        points: [
          'Work done = F × d × cos θ (unit: Joule, J)',
          'Kinetic energy (KE) = ½mv²; Gravitational potential energy (GPE) = mgh',
          'Conservation of energy: total energy stays constant; KE + GPE = constant',
          'Power = Work / Time (unit: Watt, W = J/s)',
          'Efficiency = (useful output energy / total input energy) × 100%',
          'Machine: Mechanical Advantage = Load/Effort; Velocity Ratio = distance effort/distance load',
          'Renewable energy: solar, wind, hydroelectric, biomass; Non-renewable: fossil fuels',
        ]
      },
      {
        title: 'Waves & Sound',
        points: [
          'Wave equation: v = fλ (speed = frequency × wavelength)',
          'Period T = 1/f; frequency is measured in Hertz (Hz)',
          'Transverse waves: vibration perpendicular to wave direction (light, water ripples)',
          'Longitudinal waves: vibration parallel to wave direction (sound, compression waves)',
          'Speed of sound in air ≈ 340 m/s; faster in solids and liquids than gases',
          'Resonance: forced oscillation at natural frequency produces maximum amplitude',
          'Echoes: reflected sound; sonar and ultrasound use echo principles',
        ]
      },
      {
        title: 'Light & Optics',
        points: [
          'Reflection: angle of incidence = angle of reflection (both measured from normal)',
          'Refraction: light bends when entering denser medium; Snell\'s law: n₁sinθ₁ = n₂sinθ₂',
          'Refractive index n = speed of light in vacuum / speed in medium',
          'Total internal reflection occurs when angle exceeds critical angle (sin C = 1/n)',
          'Concave (converging) mirror: used in torches, telescopes, makeup mirrors',
          'Convex (diverging) mirror: wider field of view, used in rear-view mirrors and road junctions',
          'Lens formula: 1/f = 1/v − 1/u; magnification m = image distance / object distance',
        ]
      },
      {
        title: 'Electricity & Magnetism',
        points: [
          'Ohm\'s law: V = IR (Voltage = Current × Resistance)',
          'Series circuit: same current; total resistance R = R₁ + R₂ + ...',
          'Parallel circuit: same voltage; 1/R_total = 1/R₁ + 1/R₂ + ...',
          'Electrical power: P = IV = I²R = V²/R',
          'Charge Q = It; Energy E = VIt = Pt (unit: Joule or kWh)',
          'Like poles repel; unlike poles attract; magnetic field lines N → S',
          'Electromagnetic induction (Faraday): moving magnet in coil induces EMF',
          'Fleming\'s left-hand rule: motor effect (force, field, current direction)',
        ]
      },
      {
        title: 'Heat & Thermodynamics',
        points: [
          'Specific heat capacity (c): Q = mcΔT — different materials need different heat per degree',
          'Latent heat of fusion: heat to melt solid at constant temperature',
          'Latent heat of vaporisation: heat to boil liquid at constant temperature',
          'Boyle\'s Law: P₁V₁ = P₂V₂ (constant temperature)',
          'Charles\' Law: V₁/T₁ = V₂/T₂ (constant pressure; T must be in Kelvin)',
          'Kelvin and Celsius: K = °C + 273; Absolute zero = 0 K = −273°C',
          'Heat transfer: conduction (solids — slow), convection (fluids), radiation (no medium needed)',
        ]
      },
      {
        title: 'Pressure & Fluids',
        points: [
          'Pressure = Force / Area (unit: Pascal, Pa = N/m²)',
          'Pressure in a fluid: P = hρg (depth × density × gravitational field strength)',
          'Archimedes\' principle: upthrust (buoyant force) = weight of fluid displaced',
          'Object floats if density < fluid density; sinks if density > fluid density',
          'Atmospheric pressure at sea level ≈ 101,325 Pa = 760 mmHg = 1 atm',
          'Hydraulic press: uses Pascal\'s principle — pressure applied = pressure transmitted',
        ]
      },
      {
        title: 'Modern Physics & Radioactivity',
        points: [
          'Alpha (α): helium nucleus (2p + 2n); stopped by paper; highly ionising',
          'Beta (β): fast electron; stopped by thin aluminium; moderately ionising',
          'Gamma (γ): electromagnetic radiation; stopped by thick lead; least ionising',
          'Half-life: time for half the radioactive nuclei to decay (constant for each element)',
          'Nuclear fission: heavy nucleus splits → energy (nuclear reactor, atomic bomb)',
          'Nuclear fusion: light nuclei fuse → energy (the sun, hydrogen bomb)',
          'Photoelectric effect: light ejects electrons from metal if frequency > threshold',
        ]
      },
    ]
  },

  'Chemistry': {
    emoji: '🧪',
    desc: 'Atomic structure, bonding, reactions, equilibrium and organic chemistry',
    topics: [
      {
        title: 'Atomic Structure & Periodic Table',
        points: [
          'Atom: nucleus (protons + neutrons) surrounded by electrons in shells (2, 8, 8, 18...)',
          'Atomic number = number of protons; Mass number = protons + neutrons',
          'Isotopes: same atomic number, different mass numbers (C-12 and C-14)',
          'Period (horizontal row): same number of electron shells',
          'Group (vertical column): same number of valence electrons → similar properties',
          'Metallic character: increases down a group and from right to left across a period',
          'Electronegativity: increases across a period (left to right) and up a group',
        ]
      },
      {
        title: 'Chemical Bonding',
        points: [
          'Ionic bond: electron transfer from metal to non-metal; forms crystal lattice (NaCl)',
          'Covalent bond: sharing of electron pairs between non-metals (H₂O, CO₂, NH₃)',
          'Dative (coordinate) covalent bond: one atom provides both electrons in the pair (NH₄⁺)',
          'Metallic bond: free (delocalised) electrons in a lattice of positive ions',
          'Hydrogen bond: weak attraction between H and electronegative atom (N, O, F) — explains water surface tension',
          'van der Waals forces: very weak temporary dipoles between all atoms',
          'VSEPR theory: electron pairs repel → determines molecule geometry',
        ]
      },
      {
        title: 'Chemical Reactions',
        points: [
          'OIL RIG: Oxidation Is Loss (of electrons); Reduction Is Gain (of electrons)',
          'Acid: proton (H⁺) donor; Base: proton acceptor (Bronsted-Lowry definition)',
          'pH: 0–6 acidic, 7 neutral, 8–14 alkaline; pH = −log[H⁺]',
          'Neutralisation: acid + base → salt + water (exothermic)',
          'Rate of reaction increases with: higher temperature, greater concentration, smaller particle size, catalyst, higher pressure (gases only)',
          'Activation energy: minimum energy needed for reaction to occur',
          'Catalyst: lowers activation energy; speeds up reaction without being used up',
        ]
      },
      {
        title: 'Chemical Equilibrium',
        points: [
          'Dynamic equilibrium: forward and reverse reaction rates are equal',
          'Le Chatelier\'s Principle: equilibrium shifts to oppose any change applied to it',
          'Increasing reactant concentration → equilibrium shifts forward (more products formed)',
          'Increasing temperature → equilibrium shifts in endothermic direction',
          'Increasing pressure → equilibrium shifts to side with fewer moles of gas',
          'Catalyst does NOT change equilibrium position; only speeds up reaching equilibrium',
          'Kc = [products]^coefficients / [reactants]^coefficients (at constant temperature)',
        ]
      },
      {
        title: 'Organic Chemistry',
        points: [
          'Alkanes: CₙH₂ₙ₊₂ (saturated, single bonds only) — methane, ethane, propane, butane',
          'Alkenes: CₙH₂ₙ (one C=C double bond) — ethene, propene; more reactive than alkanes',
          'Alkynes: CₙH₂ₙ₋₂ (one C≡C triple bond) — ethyne (acetylene)',
          'Functional groups: -OH (alcohol), -COOH (carboxylic acid), -CHO (aldehyde), -CO- (ketone)',
          'Test for unsaturation (alkene): decolourises bromine water (orange → colourless)',
          'Isomers: same molecular formula but different structural arrangements',
          'Petroleum refining: fractional distillation separates by boiling point — refinery gas, petrol, kerosene, diesel, fuel oil, bitumen',
        ]
      },
      {
        title: 'Electrochemistry',
        points: [
          'Electrolysis: decomposition of an ionic compound using direct electric current',
          'Cathode (−): cations move here → gain electrons → reduction occurs',
          'Anode (+): anions move here → lose electrons → oxidation occurs',
          'Electrolysis of brine (NaCl solution): H₂ at cathode; Cl₂ at anode; NaOH remains',
          'Electroplating: deposit thin metal layer; object = cathode; plating metal = anode',
          'Daniell cell: Zn/ZnSO₄ || CuSO₄/Cu; EMF ≈ 1.1 V',
          'Faraday\'s first law: mass deposited is proportional to charge passed',
        ]
      },
      {
        title: 'Industrial & Applied Chemistry',
        points: [
          'Reactivity series (highest to lowest): K, Na, Ca, Mg, Al, Zn, Fe, Pb, H, Cu, Ag, Au',
          'Metals above H in reactivity series displace hydrogen from dilute acids',
          'Haber Process: N₂ + 3H₂ ⇌ 2NH₃ — conditions: 450°C, 200 atm, iron catalyst',
          'Contact Process: SO₂ oxidised to SO₃ then dissolved to make H₂SO₄; V₂O₅ catalyst',
          'Blast furnace: iron ore + coke + limestone → pig iron (crude iron)',
          'Aluminium extracted by electrolysis of molten alumite (Hall-Héroult process)',
          'Chlor-alkali industry: electrolysis of brine gives Cl₂, H₂ and NaOH',
        ]
      },
    ]
  },

  'Biology': {
    emoji: '🌿',
    desc: 'Cell biology, genetics, ecology, physiology, nutrition and reproduction',
    topics: [
      {
        title: 'Cell Biology',
        points: [
          'Plant cell extras (not in animal cells): cellulose cell wall, chloroplast, large central vacuole',
          'Mitochondria: site of aerobic respiration → produces ATP (the cell\'s energy currency)',
          'Nucleus: control centre; contains DNA wound around histones as chromosomes',
          'Ribosomes: site of protein synthesis; found on rough endoplasmic reticulum',
          'Cell membrane: selectively permeable; controls what enters and leaves',
          'Diffusion: movement from high to low concentration gradient (passive — no energy needed)',
          'Osmosis: movement of water through semi-permeable membrane from high water potential (low solute) to low water potential (high solute)',
          'Active transport: movement against concentration gradient; requires ATP energy',
        ]
      },
      {
        title: 'Genetics & Heredity',
        points: [
          'Mendel\'s 1st law (segregation): alleles separate during gamete formation',
          'Mendel\'s 2nd law (independent assortment): genes on different chromosomes sort independently',
          'Dominant allele (capital letter) masks the recessive allele (lowercase) in Aa individuals',
          'Genotype: the genetic makeup (AA, Aa, aa); Phenotype: the physical expression',
          'Co-dominance: both alleles expressed equally (e.g. blood group AB = IA IB)',
          'Sex-linked inheritance: gene on X chromosome — more common in males (e.g. colour blindness)',
          'Mitosis: two identical daughter cells for growth and repair (PMAT phases)',
          'Meiosis: four haploid cells for sexual reproduction; creates genetic variation',
        ]
      },
      {
        title: 'Human Physiology',
        points: [
          'Digestion: mouth (amylase) → stomach (pepsin, HCl) → small intestine (lipase, trypsin)',
          'Absorption: villi in small intestine increase surface area; glucose and amino acids → blood; fats → lymph',
          'Insulin (from pancreas) lowers blood glucose; glucagon raises it',
          'Kidney (nephron): filtration of blood → selective reabsorption → urine production',
          'Breathing: diaphragm contracts → volume increases → pressure falls → air enters (inspiration)',
          'Heart: right side pumps deoxygenated blood to lungs; left side pumps oxygenated blood to body',
          'Blood groups: A, B, AB (universal recipient), O (universal donor)',
          'Nervous system: CNS (brain + spinal cord) + PNS; reflex arc bypasses the brain',
        ]
      },
      {
        title: 'Transport in Plants & Animals',
        points: [
          'Xylem: transports water and mineral salts upward from root to leaf (dead cells, one-way)',
          'Phloem: transports dissolved sugars (sucrose) up and down the plant (translocation)',
          'Transpiration: water evaporates from stomata; creates pull (transpiration stream) that draws water up xylem',
          'Factors increasing transpiration: higher temperature, lower humidity, higher wind speed, more light',
          'Stomata open in light (guard cells take up K⁺ → water enters → cells swell)',
          'Arteries: carry blood away from heart (thick walls, high pressure)',
          'Veins: carry blood to heart (have valves to prevent backflow)',
          'Haemoglobin in red blood cells loads O₂ in lungs; releases it in tissues',
        ]
      },
      {
        title: 'Nutrition & Feeding',
        points: [
          'Autotrophs (producers): make own food by photosynthesis — all green plants and algae',
          'Heterotrophs: cannot make own food; must consume other organisms',
          'Holozoic nutrition: ingestion → digestion → absorption → assimilation → egestion',
          'Saprophytes: digest and absorb dead organic matter externally (fungi and bacteria)',
          'Food nutrients: carbohydrates (energy), proteins (growth/repair), fats (energy store/insulation)',
          'Vitamin A: vision and immunity; B group: metabolism; C: collagen and immunity; D: calcium absorption',
          'Deficiency diseases: kwashiorkor (protein), scurvy (Vit C), rickets (Vit D), anaemia (iron)',
        ]
      },
      {
        title: 'Ecology & Environment',
        points: [
          'Food chain: producer → primary consumer → secondary consumer → tertiary consumer',
          'Only about 10% of energy transfers between trophic levels (energy lost as heat)',
          'Ecosystem = biotic (living organisms) + abiotic (non-living: water, light, temperature)',
          'Photosynthesis: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂',
          'Aerobic respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP',
          'Anaerobic in yeast: glucose → ethanol + CO₂; in muscles: glucose → lactic acid',
          'Nitrogen cycle: fixation → nitrification → assimilation → denitrification',
        ]
      },
      {
        title: 'Reproduction & Development',
        points: [
          'Asexual reproduction: one parent; offspring are genetically identical clones',
          'Sexual reproduction: two parents; offspring show variation due to meiosis',
          'Pollination: transfer of pollen from anther to stigma (wind or insect pollinated)',
          'Fertilisation: fusion of male gamete (pollen) with female gamete (ovule)',
          'Seed germination requires: water, oxygen and warmth (light not needed initially)',
          'Male puberty: testosterone → voice deepens, facial hair, sperm production (testes)',
          'Female puberty: oestrogen → breast development, menstrual cycle, widening hips (ovaries)',
          'Menstrual cycle: 28 days; ovulation on day 14; progesterone maintains uterus lining',
        ]
      },
    ]
  },

  'Government': {
    emoji: '🏛️',
    desc: 'Nigerian government, constitutions, democracy, rights and international organisations',
    topics: [
      {
        title: 'Nigerian Political History',
        points: [
          'Independence: 1 October 1960; Republic: 1 October 1963 (Nnamdi Azikiwe — President)',
          '1st Republic (1963–1966): parliamentary system; Tafawa Balewa as Prime Minister',
          '1966: First military coup (Aguiyi-Ironsi); counter-coup → Gowon; Civil War 1967–1970',
          'Gowon created 12 states (1967) to ensure federal loyalty during civil war',
          '1975 coup: Murtala Muhammed; 1976 Obasanjo (who handed power to civilians in 1979)',
          '2nd Republic (1979–1983): Shehu Shagari; presidential system introduced',
          '1983: Buhari coup; 1985: Babangida; 1993: Abacha; 1998: Abdulsalami transitions',
          '4th Republic: 29 May 1999 — Obasanjo elected; democracy restored to present day',
        ]
      },
      {
        title: 'Organs of Government',
        points: [
          'Legislature (National Assembly): Senate (109 senators) + House of Representatives (360 members)',
          'Legislature functions: makes laws, approves budget, confirms presidential appointments',
          'Executive: President, Vice President, Federal Executive Council — implements laws',
          'Judiciary: Supreme Court → Court of Appeal → Federal High Court → State courts',
          'Separation of powers: each arm is independent to prevent dictatorship',
          'Checks and balances: Senate can remove President; courts can void unconstitutional laws',
          'State level: Governor (executive) + State House of Assembly (legislature) + State High Court',
        ]
      },
      {
        title: 'Federalism & Systems of Government',
        points: [
          'Federalism: division of powers between federal and sub-national (state) governments',
          'Nigeria: 36 states + FCT Abuja; 774 LGAs; 3 tiers of government',
          'Exclusive legislative list: federal government only (defence, immigration, currency)',
          'Concurrent list: both federal and state can legislate (education, health)',
          'Residual powers: matters not on either list belong to states',
          'Unitary system: all power at the centre; no state autonomy (e.g. UK, France)',
          'Confederation: loose alliance of independent states; weak central authority',
          'Presidential system (Nigeria, USA): president is both head of state and government',
        ]
      },
      {
        title: 'Democracy & Electoral Process',
        points: [
          'Democracy: government of, by and for the people — Lincoln\'s definition',
          'Features: free and fair elections, rule of law, protection of rights, majority rule, minority rights',
          'Universal adult suffrage: every citizen 18+ can vote in Nigeria',
          'INEC: Independent National Electoral Commission — conducts all federal elections',
          'First-past-the-post (FPTP): candidate with most votes wins (used in Nigeria)',
          'Proportional representation: seats allocated in proportion to votes received',
          'Political party: organised group with shared ideology seeking to form government',
          'Manifesto: written document stating a party\'s programme and policies if elected',
        ]
      },
      {
        title: 'Citizenship & Fundamental Rights',
        points: [
          'Nigerian citizenship: by birth (born in Nigeria or to Nigerian parent), by registration, by naturalisation',
          'Chapter IV, 1999 Constitution: Fundamental Human Rights',
          'Right to life (s.33), dignity (s.34), personal liberty (s.35), fair hearing (s.36)',
          'Freedom of thought/religion (s.38), expression/press (s.39), peaceful assembly (s.40)',
          'Rights can be restricted during emergency, war or in the interest of public order',
          'Civic duties: pay taxes, obey laws, participate in elections, defend the nation',
          'Ombudsman (Public Complaint Commission): investigates citizens\' complaints against government',
        ]
      },
      {
        title: 'Local Government in Nigeria',
        points: [
          'LGA: third tier of government; 774 councils across Nigeria',
          'Governed by elected Chairman, Vice Chairman and Councillors',
          'LGA functions: primary education, primary health care, markets, refuse disposal, rural roads',
          'Revenue: statutory allocation from Federation Account + internally generated revenue',
          '1976 Local Government Reform (Murtala/Obasanjo era) established uniform structure',
          'State-Local Government Joint Account: controversial — states often withhold LGA funds',
          'Problems: inadequate funding, political interference, lack of autonomy',
        ]
      },
      {
        title: 'International Organisations',
        points: [
          'United Nations (UN): founded 26 June 1945; HQ New York; 193 member states',
          'UN Security Council: 5 permanent members (USA, UK, France, Russia, China) with veto power',
          'ECOWAS: Economic Community of West African States; founded 1975 Lagos Treaty',
          'African Union (AU): founded 2002; succeeds OAU (1963); HQ Addis Ababa; 55 members',
          'Commonwealth of Nations: 56 members; mostly former British colonies',
          'OPEC: Organisation of Petroleum Exporting Countries; Nigeria joined 1971',
          'IMF: lends to countries with balance of payments problems; World Bank: funds development',
        ]
      },
    ]
  },

  'Economics': {
    emoji: '💹',
    desc: 'Microeconomics, macroeconomics, money, banking and Nigerian economy',
    topics: [
      {
        title: 'Demand & Supply',
        points: [
          'Law of Demand: as price rises, quantity demanded falls (inverse/negative relationship)',
          'Law of Supply: as price rises, quantity supplied rises (direct/positive relationship)',
          'Market equilibrium: price where quantity demanded equals quantity supplied',
          'Excess demand (shortage): price below equilibrium → price rises to equilibrium',
          'Excess supply (surplus): price above equilibrium → price falls to equilibrium',
          'Price Elasticity of Demand (PED) = % change in Qd / % change in price',
          'Elastic demand (|PED| > 1): luxury goods; Inelastic (|PED| < 1): necessities and addictive goods',
          'Normal goods: demand rises with income; Inferior goods: demand falls as income rises',
        ]
      },
      {
        title: 'Production & Cost Theory',
        points: [
          'Factors of production: Land (rent), Labour (wages), Capital (interest), Entrepreneur (profit)',
          'Law of Diminishing Returns: adding one factor while others fixed → marginal product eventually falls',
          'Fixed costs: unchanged with output level (rent, insurance, depreciation)',
          'Variable costs: change with output (raw materials, direct wages)',
          'Total Cost = Fixed Cost + Variable Cost; Average Cost = Total Cost / Output',
          'Marginal cost: extra cost of producing one additional unit',
          'Economies of scale: falling average cost as output rises (bulk buying, specialisation)',
          'Diseconomies of scale: rising average cost beyond optimal firm size (management problems)',
        ]
      },
      {
        title: 'National Income & Macroeconomics',
        points: [
          'GDP: total market value of all goods and services produced in a country in one year',
          'GDP by expenditure: C (private consumption) + I (investment) + G (government spending) + NX (exports minus imports)',
          'GNP = GDP + net income from abroad (income of citizens regardless of location)',
          'Per capita income = national income ÷ population (standard of living indicator)',
          'Inflation: sustained rise in general price level; measured by Consumer Price Index (CPI)',
          'Types of unemployment: frictional (between jobs), structural (skills mismatch), cyclical (low demand), seasonal',
          'Phillips Curve: inverse short-run relationship between inflation and unemployment',
        ]
      },
      {
        title: 'Money, Banking & Monetary Policy',
        points: [
          'Functions of money: medium of exchange; store of value; unit of account; standard of deferred payment',
          'CBN (Central Bank of Nigeria, est. 1958): issues naira, lender of last resort, regulates commercial banks',
          'Commercial banks: accept deposits, give loans, create credit through fractional reserve banking',
          'Monetary Policy Rate (MPR): CBN\'s benchmark interest rate; raising it reduces money supply',
          'Open market operations: CBN buys/sells government bonds to control money in circulation',
          'Cash Reserve Ratio: proportion of deposits banks must keep with CBN; higher ratio = less lending',
          'Quantitative easing: central bank creates money to buy assets (stimulus measure)',
        ]
      },
      {
        title: 'Fiscal Policy & Government Finance',
        points: [
          'Fiscal policy: use of government taxation and spending to influence the economy',
          'Expansionary policy: increase spending or cut taxes → stimulate economic activity',
          'Contractionary policy: cut spending or raise taxes → reduce inflation',
          'Budget deficit: government spends more than it earns in tax revenue',
          'Budget surplus: government earns more in taxes than it spends',
          'Public debt: accumulated deficits; Nigeria has both domestic and external debt',
          'Tax types: direct (income tax, company tax) vs indirect (VAT, customs duty)',
          'VAT in Nigeria: 7.5% on goods and services (raised from 5% in 2020)',
        ]
      },
      {
        title: 'Market Structures',
        points: [
          'Perfect competition: many buyers/sellers, identical products, free entry/exit, price takers',
          'Monopoly: single seller, unique product, high barriers to entry, price maker',
          'Oligopoly: few dominant firms, interdependence in pricing decisions (Nigerian telecoms: MTN, Airtel, Glo)',
          'Monopolistic competition: many firms, differentiated products, some price control (restaurants)',
          'Price discrimination: same product sold at different prices to different buyers',
          'Cartel: producers collude to fix price and/or output (OPEC is an example)',
          'Privatisation: transfer of government enterprise to private ownership (Nitel, PHCN)',
        ]
      },
      {
        title: 'Nigerian Economy',
        points: [
          'Africa\'s largest economy by GDP; overtook South Africa around 2014',
          'Oil sector: accounts for ~90% of export earnings and ~50% of government revenue',
          'Oil discovered in commercial quantities at Oloibiri, Niger Delta in 1956; NNPC manages oil sector',
          'Agriculture: employs ~70% of workforce; major crops: cocoa (SW), groundnut (N), palm oil (SE/SS)',
          'Economic problems: oil dependency, high inflation, unemployment, corruption, poor infrastructure',
          'Nigeria Economic Sustainability Plan (NESP): COVID-era stimulus; economic diversification goals',
          'Nigerian Exchange Group (NGX): Lagos-based stock exchange for capital market transactions',
        ]
      },
    ]
  },

  'Literature in English': {
    emoji: '📖',
    desc: 'Poetry, prose, drama, African literature, literary devices and exam techniques',
    topics: [
      {
        title: 'Literary Genres',
        points: [
          'Poetry: condensed, rhythmic language; uses imagery, metaphor, metre and sound devices',
          'Prose: ordinary written language; includes novels, short stories, novellas and essays',
          'Drama: written to be performed on stage; contains acts, scenes, dialogue and stage directions',
          'Tragedy: ends in suffering or death of the protagonist who has a fatal flaw (hamartia)',
          'Comedy: light-hearted; often ends with resolution, reconciliation or marriage',
          'Epic: long narrative poem about heroic deeds of legendary figures (Homer\'s Iliad, Milton\'s Paradise Lost)',
          'Satire: uses irony and exaggeration to criticise society, politics or human folly',
        ]
      },
      {
        title: 'Narrative Elements',
        points: [
          'Plot structure: exposition → rising action → climax → falling action → resolution (denouement)',
          'Protagonist: main character the story follows; Antagonist: opposing force or character',
          'First-person narrator ("I"): subjective, limited to narrator\'s knowledge and perspective',
          'Third-person omniscient: all-knowing narrator who can see all characters\' thoughts',
          'Theme: the central idea or message of the work (e.g. colonialism, identity, love)',
          'Motif: recurring image, symbol or concept that reinforces the theme',
          'Conflict: man vs man, man vs nature, man vs society, man vs himself (internal)',
        ]
      },
      {
        title: 'Figures of Speech',
        points: [
          'Simile: direct comparison using "like" or "as" — "her voice was like music"',
          'Metaphor: implied comparison without "like/as" — "life is a battlefield"',
          'Personification: human qualities given to non-human things — "the trees whispered"',
          'Paradox: seemingly contradictory statement revealing deeper truth — "less is more"',
          'Apostrophe: addressing an absent or dead person, or abstract thing directly',
          'Euphemism: mild word for unpleasant thing — "passed away" instead of died',
          'Oxymoron: contradictory terms together — "sweet sorrow", "living death"',
          'Symbolism: object/colour/event representing an abstract idea (white = purity)',
        ]
      },
      {
        title: 'Poetic Devices',
        points: [
          'Alliteration: repetition of initial consonant sounds — "Peter Piper picked"',
          'Assonance: repetition of vowel sounds within words — "the rain in Spain"',
          'Onomatopoeia: words that sound like what they describe — buzz, crack, hiss, clatter',
          'Enjambment: sentence continues beyond the end of a poetic line without punctuation',
          'Caesura: a deliberate pause in the middle of a poetic line (often marked by punctuation)',
          'Sonnet: 14 lines — Shakespearean (3 quatrains + couplet) or Petrarchan (octave + sestet)',
          'Elegy: poem mourning death; Ode: poem of praise; Ballad: narrative poem often with a refrain',
        ]
      },
      {
        title: 'African & Nigerian Literature',
        points: [
          'Chinua Achebe: Things Fall Apart (1958) — colonialism and Igbo culture; Arrow of God; A Man of the People',
          'Wole Soyinka: 1st African Nobel laureate in Literature (1986); Death and the King\'s Horseman; The Lion and the Jewel',
          'J.P. Clark-Bekederemo: Song of a Goat; The Raft — Niger Delta tragedy',
          'Buchi Emecheta: The Joys of Motherhood; Second Class Citizen — feminist and diaspora themes',
          'Cyprian Ekwensi: Jagua Nana; People of the City — urban Nigerian life',
          'Ngugi wa Thiong\'o (Kenya): Weep Not Child; A Grain of Wheat — colonialism in East Africa',
          'Ben Okri (Nigeria): The Famished Road (1991 Booker Prize) — spirit world and Nigerian life',
        ]
      },
      {
        title: 'Drama & Theatre',
        points: [
          'Greek tragedy: Sophocles (Oedipus Rex), Aeschylus (Oresteia), Euripides (Medea)',
          'Dramatic irony: audience knows something characters on stage do not know',
          'Soliloquy: character speaks thoughts aloud alone on stage — reveals inner feelings',
          'Aside: character speaks briefly to audience, unheard by other characters on stage',
          'Catharsis: emotional purging (pity and fear) felt by audience at end of tragedy (Aristotle)',
          'Deus ex machina: contrived resolution by an unexpected external force',
          'Soyinka blends Yoruba mythology, ritual and music with European drama traditions',
        ]
      },
      {
        title: 'Exam Techniques',
        points: [
          'Always identify genre (prose/poetry/drama) before answering — approach differs for each',
          'Quote directly from the text to support every major point you make',
          'Discuss HOW language creates effect, not just WHAT is said',
          'Character analysis: discuss motivation, development, role in theme, relationships',
          'For poetry: analyse tone, mood, structure, imagery, sound devices and rhythm',
          'Common JAMB/WAEC texts: Things Fall Apart, Wuthering Heights, selected poetry anthologies',
          'In essays: clear introduction → well-developed body paragraphs → concise conclusion',
        ]
      },
    ]
  },

  'Geography': {
    emoji: '🌍',
    desc: 'Physical geography, map reading, climate, Nigeria and economic geography',
    topics: [
      {
        title: 'Map Reading & Cartography',
        points: [
          'Contour lines: join points of equal altitude; closely spaced = steep slope',
          'Map scale: 1:50,000 means 1 cm on map = 50,000 cm (500 m) on the ground',
          'Grid reference: eastings (horizontal) before northings (vertical) — "along the corridor, up the stairs"',
          'Bearing: direction in degrees clockwise from North (north = 000°, east = 090°, south = 180°)',
          'Relief features from contours: hill (concentric ovals), valley (V pointing uphill), cliff (contours touching)',
          'Types of maps: topographical, political, choropleth, isoline, dot distribution, proportional symbol',
        ]
      },
      {
        title: 'Nigerian Geography',
        points: [
          'Nigeria: 4°N–14°N latitude; 3°E–15°E longitude; area ≈ 924,000 km²',
          'Climatic zones (south to north): equatorial/rainforest → guinea savanna → sudan savanna → sahel',
          'Harmattan: dry, dusty north-east trade wind from Sahara; blows November–March',
          'Major rivers: Niger (4,100 km total; enters NW) and Benue meet at Lokoja, flow south to delta',
          'Highlands: Jos Plateau (1,300 m avg), Mambilla Plateau (highest at ~1,800 m), Adamawa',
          'Six geopolitical zones: North-West, North-East, North-Central, South-West, South-East, South-South',
          'Population ≈ 220 million (most populous country in Africa); majority under 30 years old',
        ]
      },
      {
        title: 'Climate & Weather',
        points: [
          'Weather: short-term atmospheric conditions at a specific place and time',
          'Climate: average weather conditions over 30+ years for a region',
          'Factors affecting climate: latitude, altitude, distance from sea, ocean currents, prevailing winds',
          'ITCZ (Inter-Tropical Convergence Zone): where trade winds meet → heavy rainfall belt',
          'ITCZ moves north in June–August (wet season in Nigeria) and south in December–February (dry)',
          'Greenhouse gases: CO₂, CH₄, N₂O trap infrared radiation → global warming → climate change',
          'Consequences: rising sea levels, more extreme weather, desertification, flooding',
        ]
      },
      {
        title: 'Physical Geography',
        points: [
          'Igneous rocks: formed from cooled magma (granite, basalt); resistant and good for buildings',
          'Sedimentary rocks: formed from compressed sediments; contain fossils (limestone, sandstone, coal)',
          'Metamorphic rocks: changed by heat and pressure (marble from limestone, slate from shale)',
          'River stages: upper course (V-valleys, waterfalls, rapids) → middle (meanders, ox-bow lakes) → lower (floodplains, deltas)',
          'Types of weathering: physical (freeze-thaw, exfoliation), chemical (acid rain, carbonation), biological (root action)',
          'Plate tectonics: convergent (mountain building), divergent (ocean ridges, rift valleys), transform (earthquakes)',
          'Earthquake terms: focus/hypocentre (underground origin); epicentre (point on surface above focus)',
        ]
      },
      {
        title: 'Soils & Vegetation',
        points: [
          'Soil profile: O horizon (humus) → A (topsoil) → B (subsoil) → C (weathered parent rock) → R (bedrock)',
          'Laterite (ferralitic) soils: red/yellow; heavily leached; dominant in southern Nigeria; low fertility',
          'Alluvial soils: deposited by rivers; highly fertile; good for farming (Niger floodplains)',
          'Tropical rainforest: multi-layered canopy, high biodiversity, ever-green, found in south Nigeria',
          'Guinea savanna: dominant vegetation in Nigeria; tall grasses and fire-resistant trees',
          'Sahel: semi-desert; sparse thorny shrubs; found near Lake Chad, Borno state',
          'Mangrove swamp: salt-tolerant vegetation along Niger Delta coast; important nursery for fish',
        ]
      },
      {
        title: 'Population & Settlement',
        points: [
          'Population density = number of people per km²; varies by resources, relief, climate',
          'Population growth rate = (birth rate − death rate) + net migration',
          'Nigeria\'s population density highest in Lagos, Anambra, Imo; lowest in Borno, Niger state',
          'Rural-urban migration: people move to cities for jobs, education and services',
          'Push factors (leave rural area): poverty, drought, conflict, poor services',
          'Pull factors (attract to cities): employment, schools, hospitals, infrastructure',
          'Urbanisation: Lagos (~15 million) is Nigeria\'s and West Africa\'s largest city',
        ]
      },
      {
        title: 'Economic Geography & Resources',
        points: [
          'Primary sector: agriculture, fishing, mining, forestry',
          'Secondary sector: manufacturing, construction, processing',
          'Tertiary sector: services — banking, education, healthcare, transport, retail',
          'Nigeria\'s minerals: crude oil and natural gas (Niger Delta), coal (Enugu), tin/columbite (Jos Plateau)',
          'Renewable energy sources: solar, wind, hydroelectric (Kainji, Jebba, Shiroro dams), geothermal, biomass',
          'Non-renewable: coal, oil, natural gas — finite; burning releases greenhouse gases',
          'Desertification threatens northern Nigeria: caused by overgrazing, deforestation and drought',
        ]
      },
    ]
  },

  'Commerce': {
    emoji: '🏪',
    desc: 'Trade, aids to trade, banking, insurance, business organisations and consumer protection',
    topics: [
      {
        title: 'Trade & Distribution',
        points: [
          'Commerce: all activities that help transfer goods from producer to consumer',
          'Home trade: buying and selling within a country (retail + wholesale)',
          'Foreign/International trade: buying and selling between countries (imports and exports)',
          'Visible trade: physical goods (exports and imports); Invisible trade: services (tourism, shipping)',
          'Channels of distribution: Producer → Wholesaler → Retailer → Consumer',
          'Wholesaler: buys in bulk from producers; provides warehousing, credit, transport to retailers',
          'Retailer: sells to final consumers in small quantities; offers after-sales service',
          'Balance of trade: value of visible exports minus value of visible imports',
        ]
      },
      {
        title: 'Aids to Trade',
        points: [
          'Banking: provides safe custody of money, loans, transfer of funds internationally',
          'Insurance: spreads risk of loss among many policyholders; essential for trade',
          'Transport: moves goods from where produced to where needed (road, rail, sea, air, pipeline)',
          'Warehousing: stores goods between production and sale; creates time utility',
          'Advertising: informs buyers about products and persuades them to purchase',
          'Communication: enables trade transactions (phone, internet, postal services)',
          'Tourism is an invisible export: foreign visitors spending in Nigeria earns foreign exchange',
        ]
      },
      {
        title: 'Trade Documents',
        points: [
          'Enquiry: buyer requests price information and terms from seller',
          'Quotation (Pro-forma invoice): seller\'s formal price offer before dispatch',
          'Purchase order: buyer formally requests goods or services',
          'Invoice: detailed list of goods supplied with prices; forms basis for payment',
          'Debit note: informs buyer that amount owed has increased (price was undercharged)',
          'Credit note: informs buyer that amount owed has decreased (goods returned)',
          'Statement of account: summary of all transactions in an accounting period',
          'Bill of lading: receipt for goods shipped by sea; Waybill: for road/rail transport',
        ]
      },
      {
        title: 'Banking & Finance',
        points: [
          'Central Bank of Nigeria (CBN, 1958): issues currency, acts as banker to government, regulates banks',
          'Commercial banks: GTBank, Zenith, UBA, First Bank — accept deposits and give loans',
          'Current account: no interest; cheque book provided; for business use',
          'Savings account: earns interest; passbook used; limited number of withdrawals',
          'Crossed cheque: two parallel lines; must be paid into bank account (cannot be cashed)',
          'Letter of credit: bank guarantees payment to an exporter on behalf of importer',
          'Nigerian Exchange Group (NGX, formerly NSE): facilitates buying and selling of shares (capital market)',
        ]
      },
      {
        title: 'Insurance',
        points: [
          'Insurable interest: insured must stand to lose if insured event occurs',
          'Utmost good faith (uberrimae fidei): all material facts must be disclosed',
          'Indemnity: insured restored to same financial position as before loss (not profit)',
          'Subrogation: after paying claim, insurer takes over insured\'s legal rights against third party',
          'Contribution: if insured with multiple insurers, each pays proportionate share',
          'Life assurance: covers death or survival; premiums invested long-term',
          'Motor insurance: Third-party (compulsory, covers others) or Comprehensive (covers own vehicle too)',
          'Marine insurance: covers ships (hull) and cargo against perils of the sea',
        ]
      },
      {
        title: 'Business Organisations',
        points: [
          'Sole proprietorship: one owner; unlimited liability; simple to set up; common in Nigeria',
          'Partnership: 2–20 members; governed by Partnership Deed; joint and several liability',
          'Private limited company (Ltd): limited liability; shares NOT publicly traded; minimum 2 shareholders',
          'Public limited company (Plc): shares traded on stock exchange; must publish accounts; min. 7 shareholders',
          'Cooperative society: owned and managed by members for mutual benefit; democratic voting',
          'Public corporation: government-owned enterprise (NNPC, NIMASA, NITEL)',
          'Franchise: licensee operates under franchisor\'s brand and system (KFC, Shoprite)',
        ]
      },
      {
        title: 'Consumer Protection',
        points: [
          'Consumer rights (UN guidelines): right to safety, to information, to choose, to be heard',
          'Consumer Protection Council (CPC) of Nigeria: investigates and resolves consumer complaints',
          'NAFDAC: regulates food, drugs, cosmetics and beverages — prevents substandard products',
          'Standards Organisation of Nigeria (SON): sets and enforces quality standards for products',
          'Federal Competition and Consumer Protection Commission (FCCPC): enforces competition and consumer law',
          'False advertising: illegal — all claims must be truthful and not misleading',
          'Hire purchase: buyer pays in instalments; ownership transfers only after final payment',
        ]
      },
    ]
  },
};

/* ── Render tabs and panels ── */
(function renderNotes() {
  const tabsEl   = document.getElementById('notesTabs');
  const panelsEl = document.getElementById('notesPanels');
  if (!tabsEl || !panelsEl) return;

  const urlSubject  = getQueryParam('subject');
  const subjectList = Object.keys(NOTES_DATA);
  const initialSubject = subjectList.includes(urlSubject) ? urlSubject : subjectList[0];

  subjectList.forEach(subjectName => {
    const data = NOTES_DATA[subjectName];
    const id   = 'notes-' + subjectName.replace(/\s+/g, '-').toLowerCase();

    /* ── Tab button ── */
    const tab = document.createElement('button');
    tab.type      = 'button';
    tab.className = 'notes-tab' + (subjectName === initialSubject ? ' active' : '');
    tab.textContent = data.emoji + ' ' + subjectName;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', id);
    tab.setAttribute('aria-selected', String(subjectName === initialSubject));
    tab.addEventListener('click', () => {
      document.querySelectorAll('.notes-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.notes-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(id).classList.add('active');
      document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    tabsEl.appendChild(tab);

    /* ── Notes panel ── */
    const panel = document.createElement('div');
    panel.id        = id;
    panel.className = 'notes-panel' + (subjectName === initialSubject ? ' active' : '');
    panel.setAttribute('role', 'tabpanel');

    panel.innerHTML = `
      <div class="notes-header">
        <span class="notes-header-emoji" aria-hidden="true">${data.emoji}</span>
        <div>
          <h2>${escapeHtml(subjectName)}</h2>
          <p>${escapeHtml(data.desc)}</p>
        </div>
      </div>
      <div class="topics-grid">
        ${data.topics.map(t => `
          <div class="topic-card">
            <div class="topic-title">${escapeHtml(t.title)}</div>
            <ul class="topic-points">
              ${t.points.map(p => `<li>${escapeHtml(p)}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
      <div class="notes-cta">
        <p>📚 Ready to test your knowledge on ${escapeHtml(subjectName)}?</p>
        <div class="cta-btns">
          <a href="subjects.html?subject=${encodeURIComponent(subjectName)}" class="btn btn-primary btn-sm">Practice</a>
          <a href="exam.html?subject=${encodeURIComponent(subjectName)}" class="btn btn-outline btn-sm">Mock Exam</a>
          <button class="btn btn-outline btn-sm"
            onclick="downloadNotesPDF('${subjectName}', NOTES_DATA['${subjectName}'].topics)"
            title="Download cheat-sheet PDF (Premium)">📄 Download PDF</button>
        </div>
      </div>
    `;

    panelsEl.appendChild(panel);
  });
})();
