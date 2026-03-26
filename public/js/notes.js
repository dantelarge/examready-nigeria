/* ============================================================
   ExamReady Nigeria — notes.js
   WAEC syllabus study notes (SS1 / SS2 / SS3) for all 10 subjects
   ============================================================ */

'use strict';

const NOTES_DATA = {

  /* ═══════════════════════════════════════════════════════════
     MATHEMATICS
  ═══════════════════════════════════════════════════════════ */
  'Mathematics': {
    emoji: '🔢',
    desc: 'WAEC Mathematics — Number theory, algebra, geometry and calculus',
    topics: [
      {
        level: 'SS1',
        title: 'Number Systems & Number Bases',
        points: [
          'Integers include positive, negative numbers and zero; Natural numbers are positive integers',
          'Number bases: Base 2 (binary), Base 8 (octal), Base 10 (denary), Base 16 (hexadecimal)',
          'Convert base 10 to base n: repeatedly divide by n and read remainders upward',
          'Convert base n to base 10: multiply each digit by n raised to its position value',
          'LCM: smallest number divisible by both; HCF: largest number that divides both',
          'Fractions: add/subtract with common denominator; multiply numerators and denominators; divide by inverting and multiplying',
          'Percentages: x% of y = (x/100) × y; percentage change = (change ÷ original) × 100',
        ]
      },
      {
        level: 'SS1',
        title: 'Algebraic Expressions & Linear Equations',
        points: [
          'Expansion: a(b + c) = ab + ac; (a + b)² = a² + 2ab + b²; (a − b)² = a² − 2ab + b²',
          'Factorisation: take out common factor first; difference of two squares: a² − b² = (a+b)(a−b)',
          'Linear equation: collect like terms and isolate the unknown — e.g. 3x − 5 = 10 → x = 5',
          'Simultaneous equations (elimination): make coefficients equal, then add or subtract equations',
          'Simultaneous equations (substitution): express one variable in terms of the other',
          'Word problems: define variables clearly, form equations from the information, solve',
          'Ratio and proportion: if a:b = c:d then ad = bc (cross-multiplication)',
        ]
      },
      {
        level: 'SS1',
        title: 'Plane Geometry & Basic Statistics',
        points: [
          'Angles on a straight line = 180°; angles at a point = 360°; vertically opposite angles are equal',
          'Triangle: angles sum to 180°; isosceles has two equal sides and angles; equilateral has all equal',
          'Sum of interior angles of polygon = (n − 2) × 180°; each exterior angle of regular polygon = 360°/n',
          'Frequency table: tally marks → frequency; relative frequency = frequency ÷ total',
          'Bar chart: bars of equal width; height represents frequency',
          'Pie chart: angle for each sector = (frequency ÷ total) × 360°',
          'Mean = Σfx ÷ Σf; Median = middle value; Mode = most frequent value',
        ]
      },
      {
        level: 'SS2',
        title: 'Indices, Surds & Logarithms',
        points: [
          'Laws of indices: aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁰ = 1; a⁻ⁿ = 1/aⁿ',
          'Fractional index: a^(m/n) = (nth root of a)^m',
          'Surds: irrational square roots; √a × √b = √(ab); √a/√b = √(a/b)',
          'Rationalise denominator: multiply by conjugate — 1/(a + √b) × (a − √b)/(a − √b)',
          'Logarithm definition: log_a(x) = n ⟺ aⁿ = x',
          'Log laws: log(AB) = log A + log B; log(A/B) = log A − log B; log(Aⁿ) = n log A',
          'Change of base: log_a(x) = log(x) / log(a); use base 10 (common log) or base e (natural log)',
        ]
      },
      {
        level: 'SS2',
        title: 'Quadratic Equations & Inequalities',
        points: [
          'Quadratic: ax² + bx + c = 0; solve by factorisation, completing the square or formula',
          'Quadratic formula: x = [−b ± √(b² − 4ac)] / 2a',
          'Discriminant b² − 4ac: > 0 two real roots; = 0 equal roots; < 0 no real roots',
          'Completing the square: x² + bx = (x + b/2)² − (b/2)²',
          'Sum of roots = −b/a; product of roots = c/a (to form equation from given roots)',
          'Linear inequality: solve like an equation but flip sign when multiplying/dividing by negative',
          'Quadratic inequality: solve quadratic = 0 first, then test intervals on number line',
        ]
      },
      {
        level: 'SS2',
        title: 'Coordinate Geometry & Trigonometry',
        points: [
          'Gradient: m = (y₂ − y₁)/(x₂ − x₁); positive slopes upward left to right',
          'Equation of line: y − y₁ = m(x − x₁); y = mx + c (gradient-intercept form)',
          'Perpendicular lines: m₁ × m₂ = −1; parallel lines have equal gradients',
          'Trigonometric ratios: sin θ = opp/hyp; cos θ = adj/hyp; tan θ = opp/adj (SOH-CAH-TOA)',
          'Special angles: sin 30° = 0.5; cos 60° = 0.5; sin 45° = cos 45° = 1/√2; tan 45° = 1',
          'Sine rule: a/sin A = b/sin B = c/sin C (use when angle-side pairs are known)',
          'Cosine rule: a² = b² + c² − 2bc cos A (use when three sides or two sides and included angle)',
        ]
      },
      {
        level: 'SS3',
        title: 'Sequences, Series & Financial Mathematics',
        points: [
          'Arithmetic Progression (AP): T_n = a + (n−1)d; S_n = n/2 × [2a + (n−1)d]',
          'Geometric Progression (GP): T_n = ar^(n−1); S_n = a(1 − rⁿ)/(1 − r) for r ≠ 1',
          'Sum to infinity of GP (|r| < 1): S∞ = a/(1 − r)',
          'Simple Interest: SI = PRT/100; Amount A = P + SI',
          'Compound Interest: A = P(1 + r/100)ⁿ; effective rate > nominal rate',
          'Depreciation: A = P(1 − r/100)ⁿ (same structure as compound interest)',
          'Amortisation: equal periodic payments to pay off a loan; uses GP sum formula',
        ]
      },
      {
        level: 'SS3',
        title: 'Permutation, Combination & Probability',
        points: [
          'Permutation (order matters): ⁿPr = n! / (n − r)!; arrangements of n distinct objects = n!',
          'Combination (order does not matter): ⁿCr = n! / [r!(n − r)!]',
          'Arrangements with repeated objects: n! / (p! × q! × ...) for groups of identical items',
          'Probability: P(E) = favourable outcomes / total outcomes; 0 ≤ P ≤ 1',
          'P(A or B) = P(A) + P(B) − P(A and B); for mutually exclusive: P(A or B) = P(A) + P(B)',
          'P(A and B) = P(A) × P(B) for independent events; P(A|B) = P(A and B)/P(B) for conditional',
          'Binomial expansion: (a + b)ⁿ; general term = ⁿCr × a^(n−r) × bʳ',
        ]
      },
      {
        level: 'SS3',
        title: 'Vectors, Matrices & Calculus',
        points: [
          'Vector: magnitude and direction; position vector of (x, y) = xi + yj; |v| = √(x² + y²)',
          'Matrix addition: add corresponding elements; scalar multiplication: multiply every element',
          'Matrix multiplication: (m×n) × (n×p) → (m×p); row of first × column of second',
          'Determinant 2×2: |A| = ad − bc for [[a,b],[c,d]]; inverse = (1/det) × [[d,−b],[−c,a]]',
          'Differentiation: d/dx(xⁿ) = nxⁿ⁻¹; d/dx(constant) = 0; product, quotient and chain rules',
          'Integration: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ −1); integration is antidifferentiation',
          'Maxima/minima: set dy/dx = 0; if d²y/dx² > 0 → minimum; < 0 → maximum',
        ]
      },
    ]
  },

  /* ═══════════════════════════════════════════════════════════
     ENGLISH LANGUAGE
  ═══════════════════════════════════════════════════════════ */
  'English Language': {
    emoji: '📝',
    desc: 'WAEC English — Grammar, comprehension, oral English and essay writing',
    topics: [
      {
        level: 'SS1',
        title: 'Parts of Speech & Sentence Structure',
        points: [
          'Noun: name of person, place, thing or idea (proper, common, abstract, collective)',
          'Pronoun: replaces a noun (personal: I/he/she; possessive: my/his; relative: who/which)',
          'Adjective: describes a noun; Adverb: modifies verb, adjective or another adverb',
          'Preposition: shows relationship — in, on, at, by, under, between, through',
          'Conjunction: coordinating (FANBOYS: for, and, nor, but, or, yet, so); subordinating (because, although, since)',
          'Phrase: group of words without subject + verb; Clause: has subject + verb',
          'Sentence types: simple (one independent clause); compound (two joined by conjunction); complex (independent + dependent)',
        ]
      },
      {
        level: 'SS1',
        title: 'Tenses & Subject-Verb Agreement',
        points: [
          'Simple tenses: present (He runs), past (He ran), future (He will run)',
          'Continuous tenses: present (is running), past (was running), future (will be running)',
          'Perfect tenses: present (has run), past (had run), future (will have run)',
          'Singular subject → singular verb; plural subject → plural verb',
          'Collective nouns (team, committee, jury): singular verb when acting as one unit',
          'Indefinite pronouns (everyone, each, nobody): always take singular verb',
          'Either/or and neither/nor: verb agrees with the nearer subject',
        ]
      },
      {
        level: 'SS1',
        title: 'Narrative & Descriptive Writing',
        points: [
          'Narrative essay: tells a story with a clear beginning, middle and end',
          'Use vivid, specific details rather than vague descriptions',
          'Chronological order: events in the order they happened; use time connectives (first, then, finally)',
          'Descriptive essay: paints a picture; engage all five senses (sight, sound, smell, taste, touch)',
          'Use figurative language: simile, metaphor, personification to bring descriptions to life',
          'Show, don\'t tell: "Her hands trembled" is stronger than "She was nervous"',
          'Paragraph structure: topic sentence → development → concluding link',
        ]
      },
      {
        level: 'SS2',
        title: 'Figures of Speech',
        points: [
          'Simile: comparison using "like" or "as" — "the soldier fought like a lion"',
          'Metaphor: direct comparison without "like/as" — "life is a battlefield"',
          'Personification: human qualities to non-human — "the sun smiled down on us"',
          'Hyperbole: deliberate exaggeration — "I have a mountain of work to do"',
          'Irony: saying the opposite of what you mean — "What lovely weather!" (during heavy rain)',
          'Oxymoron: contradictory terms — "deafening silence"; "bitter sweet"; "living death"',
          'Alliteration: same consonant repeated — "Peter Piper picked"; Onomatopoeia: buzz, hiss, bang',
        ]
      },
      {
        level: 'SS2',
        title: 'Direct & Indirect Speech and Letter Writing',
        points: [
          'Direct speech: exact words in quotation marks — She said, "I am tired."',
          'Indirect speech: reported without quotes; tense shifts back one step — She said she was tired.',
          'Time and place adverbs change: now → then; here → there; today → that day; tomorrow → the next day',
          'Formal letter: sender\'s address, date, recipient\'s address, salutation (Dear Sir/Madam), body, closing (Yours faithfully)',
          'Informal letter: date, salutation (Dear [Name]), friendly body, closing (Yours sincerely / Your friend)',
          'Register: formal language avoids contractions and slang; informal may use both',
          'Always match the register to the purpose and audience of your writing',
        ]
      },
      {
        level: 'SS2',
        title: 'Comprehension & Vocabulary',
        points: [
          'Read the passage twice: first for overall meaning, second for detail',
          'Identify the main idea — usually stated in the opening or closing paragraph',
          'Answer in your own words (paraphrase); do not copy directly unless asked to quote',
          'Inferential questions: the answer is implied — read between the lines',
          'Vocabulary in context: use surrounding sentences to determine the meaning of an unfamiliar word',
          'Synonym: same meaning (benevolent = charitable); Antonym: opposite (verbose ≠ concise)',
          'Common roots, prefixes and suffixes: un- (not), re- (again), -tion (noun), -ous (adjective)',
        ]
      },
      {
        level: 'SS3',
        title: 'Argumentative & Expository Essays',
        points: [
          'Argumentative essay: take a clear position and defend it with evidence, logic and examples',
          'Structure: introduction (state position) → body (3+ paragraphs each with one point) → conclusion (restate and call to action)',
          'Counter-argument: acknowledge opposing view then refute it — strengthens your essay',
          'Expository essay: explains or informs objectively; no personal bias',
          'Topic sentence: opens each paragraph and states the main point of that paragraph',
          'Transitions: furthermore, however, in contrast, as a result, in conclusion',
          'Conclusion: summarise key points; do not introduce new ideas; end with a strong closing statement',
        ]
      },
      {
        level: 'SS3',
        title: 'Oral English & Phonetics',
        points: [
          'Short vowels: /ɪ/ (sit), /e/ (bed), /æ/ (cat), /ɒ/ (hot), /ʊ/ (book), /ʌ/ (cup)',
          'Long vowels: /iː/ (feet), /ɑː/ (car), /ɔː/ (door), /uː/ (food), /ɜː/ (bird)',
          'Diphthongs (gliding vowels): /eɪ/ (late), /aɪ/ (light), /ɔɪ/ (boy), /əʊ/ (go)',
          'Voiced consonants: /b/, /d/, /g/, /v/, /z/, /ʒ/, /m/, /n/; Voiceless: /p/, /t/, /k/, /f/, /s/',
          'Word stress: nouns often stressed on first syllable (REcord); verbs on second (reCORD)',
          'Sentence stress: content words (nouns, main verbs, adjectives) stressed; function words (articles, prepositions) unstressed',
          'Intonation: rising (↗) for yes/no questions; falling (↘) for statements and wh- questions',
        ]
      },
      {
        level: 'SS3',
        title: 'Summary Writing & Report Writing',
        points: [
          'Summary: reduce a passage to its essential points without personal comment',
          'Identify main points first; list them; then write in continuous prose',
          'Use your own words; do not copy sentences — paraphrase throughout',
          'Count words if the question sets a limit; stay within 5 words of the specified number',
          'Report structure: title, date, to/from, introduction, findings (numbered/bullet), conclusion, recommendations',
          'Reports use impersonal, formal language and passive voice — "It was found that..."',
          'Article/feature writing: headline, introduction (5 Ws), body, conclusion — for newspaper or magazine',
        ]
      },
    ]
  },

  /* ═══════════════════════════════════════════════════════════
     PHYSICS
  ═══════════════════════════════════════════════════════════ */
  'Physics': {
    emoji: '⚡',
    desc: 'WAEC Physics — Mechanics, waves, electricity, heat and modern physics',
    topics: [
      {
        level: 'SS1',
        title: 'Measurement, Scalars & Vectors',
        points: [
          'SI base units: metre (m), kilogram (kg), second (s), Ampere (A), Kelvin (K), mole (mol), candela (cd)',
          'Scalar: magnitude only (speed, mass, temperature, energy)',
          'Vector: magnitude and direction (velocity, force, displacement, acceleration)',
          'Vector addition: use triangle/parallelogram law or resolve into horizontal and vertical components',
          'Resultant of perpendicular vectors: R = √(x² + y²); direction θ = arctan(y/x)',
          'Significant figures: rules for recording measurements with correct precision',
          'Errors: systematic (consistent offset) vs random (vary unpredictably)',
        ]
      },
      {
        level: 'SS1',
        title: 'Kinematics & Dynamics (Newton\'s Laws)',
        points: [
          'Distance: total path length (scalar); Displacement: shortest distance from start to end (vector)',
          'Speed = distance/time; Velocity = displacement/time; both in m/s',
          'Equations of motion: v = u + at; s = ut + ½at²; v² = u² + 2as; s = (u + v)t/2',
          'Free fall: acceleration = g ≈ 10 m/s² downward (ignore air resistance)',
          'Newton\'s 1st law: inertia — body stays at rest or constant velocity unless net force acts',
          'Newton\'s 2nd law: F = ma (net force = mass × acceleration)',
          'Newton\'s 3rd law: action and reaction are equal in magnitude, opposite in direction',
        ]
      },
      {
        level: 'SS1',
        title: 'Work, Energy, Power & Heat',
        points: [
          'Work = F × d × cos θ (Joules, J); work done against gravity = mgh',
          'Kinetic energy = ½mv²; Gravitational PE = mgh; conservation: total mechanical energy constant',
          'Power = Work/Time = Energy/Time (Watts, W = J/s)',
          'Efficiency = (useful output / total input) × 100%',
          'Temperature: degree of hotness; measured in Celsius (°C) or Kelvin (K); K = °C + 273',
          'Thermometers: liquid-in-glass, thermocouple, resistance thermometer; fixed points: 0°C (ice point), 100°C (steam point)',
          'Linear expansivity α: ΔL = L₀αΔT; materials expand on heating (exceptions: water 0–4°C)',
        ]
      },
      {
        level: 'SS2',
        title: 'Waves & Sound',
        points: [
          'Wave: energy transfer without matter transfer; wave equation v = fλ',
          'Transverse: vibration perpendicular to wave direction (light, water); Longitudinal: parallel (sound)',
          'Sound: mechanical longitudinal wave; needs a medium; speed ≈ 340 m/s in air at 20°C',
          'Speed of sound: faster in denser media — solids > liquids > gases',
          'Frequency determines pitch (Hz); amplitude determines loudness (dB)',
          'Resonance: object vibrates at maximum amplitude when driven at its natural frequency',
          'Echoes: reflected sound; time delay t = 2d/v; used in SONAR, ultrasound imaging',
        ]
      },
      {
        level: 'SS2',
        title: 'Light & Optics',
        points: [
          'Reflection: angle of incidence = angle of reflection (both from the normal)',
          'Plane mirror: image is virtual, upright, same size, same distance behind mirror as object in front',
          'Concave (converging) mirror: used in headlights, torches, shaving mirrors; can form real images',
          'Convex (diverging) mirror: always forms virtual, upright, diminished image; used in rear-view mirrors',
          'Refraction: light bends toward normal entering denser medium; Snell\'s law: n₁sinθ₁ = n₂sinθ₂',
          'Total internal reflection: occurs when angle > critical angle; sin C = 1/n; used in optical fibres',
          'Lens formula: 1/f = 1/v − 1/u; magnification m = v/u; converging lens (f +); diverging lens (f −)',
        ]
      },
      {
        level: 'SS2',
        title: 'Electricity & Magnetism',
        points: [
          'Ohm\'s law: V = IR; resistance measured in Ohms (Ω)',
          'Series: same current; total R = R₁ + R₂ + ...; voltages add up',
          'Parallel: same voltage; 1/R_total = 1/R₁ + 1/R₂ + ...; currents add up',
          'Power: P = IV = I²R = V²/R; energy = Pt = VIt (Joules or kWh)',
          'Domestic wiring: live (brown/red), neutral (blue/black), earth (green-yellow); fuse protects live wire',
          'Magnetic field: like poles repel, unlike poles attract; field lines from N to S',
          'Electromagnetic induction (Faraday): changing magnetic flux induces an EMF; generator principle',
        ]
      },
      {
        level: 'SS3',
        title: 'Heat Capacity & Gas Laws',
        points: [
          'Specific heat capacity c: Q = mcΔT; unit J/(kg·K); water has very high c (4200 J/kg·K)',
          'Latent heat of fusion: heat absorbed/released melting/freezing at constant temperature',
          'Latent heat of vaporisation: heat absorbed/released boiling/condensing at constant temperature',
          'Boyle\'s law: P₁V₁ = P₂V₂ (temperature constant)',
          'Charles\' law: V₁/T₁ = V₂/T₂ (pressure constant; T in Kelvin)',
          'Combined gas law: P₁V₁/T₁ = P₂V₂/T₂',
          'Heat transfer: conduction (solid lattice vibration), convection (fluid bulk movement), radiation (EM waves, no medium)',
        ]
      },
      {
        level: 'SS3',
        title: 'Modern Physics & Radioactivity',
        points: [
          'Photoelectric effect: light above threshold frequency ejects electrons from metal surface',
          'Einstein: E = hf (energy of photon); h = Planck\'s constant = 6.63 × 10⁻³⁴ J·s',
          'Bohr\'s model: electrons occupy fixed energy levels; emit photons when jumping to lower level',
          'Alpha (α): helium nucleus (2p, 2n); stopped by paper; highly ionising',
          'Beta (β): high-speed electron; stopped by thin aluminium; moderately ionising',
          'Gamma (γ): high-energy electromagnetic radiation; stopped by thick lead; penetrating',
          'Half-life: time for half the radioactive atoms in a sample to decay; each isotope has a fixed value',
        ]
      },
      {
        level: 'SS3',
        title: 'Electronics & Energy Sources',
        points: [
          'Semiconductors: conductivity between conductor and insulator; silicon and germanium common',
          'p-n junction diode: allows current in one direction only; used in rectification (AC → DC)',
          'Transistor: amplifies or switches signals; NPN and PNP types',
          'Logic gates: AND, OR, NOT, NAND, NOR, XOR; truth tables show output for every input combination',
          'Nuclear fission: heavy nucleus (U-235) splits releasing large energy; basis of nuclear reactor',
          'Nuclear fusion: light nuclei (H isotopes) fuse releasing even more energy; powers the sun',
          'Renewable energy: solar (photovoltaic), wind turbines, hydroelectric; no greenhouse gas emissions',
        ]
      },
    ]
  },

  /* ═══════════════════════════════════════════════════════════
     CHEMISTRY
  ═══════════════════════════════════════════════════════════ */
  'Chemistry': {
    emoji: '🧪',
    desc: 'WAEC Chemistry — Atomic structure, bonding, reactions, organic and industrial chemistry',
    topics: [
      {
        level: 'SS1',
        title: 'Atomic Structure & Periodic Table',
        points: [
          'Atom: nucleus (protons + neutrons) + electrons in shells; shells fill as 2, 8, 8, 18...',
          'Atomic number = protons (= electrons in neutral atom); Mass number = protons + neutrons',
          'Isotopes: same element, same atomic number, different mass number (e.g. C-12 and C-14)',
          'Electron configuration: Na is 2,8,1 (11 protons); determines group and period position',
          'Periodic law: properties of elements repeat periodically when arranged by atomic number',
          'Group = number of valence electrons; Period = number of occupied energy shells',
          'Trends across a period: atomic radius decreases; ionisation energy and electronegativity increase',
        ]
      },
      {
        level: 'SS1',
        title: 'Chemical Bonding',
        points: [
          'Ionic (electrovalent) bond: metal transfers electrons to non-metal; forms crystal lattice (NaCl)',
          'Covalent bond: non-metals share electron pairs (H₂O has 2 shared pairs + 2 lone pairs)',
          'Dative (coordinate) bond: one atom donates both electrons of the shared pair (NH₄⁺, H₃O⁺)',
          'Metallic bond: delocalised "sea of electrons" around positive metal ions; explains conductivity',
          'Hydrogen bond: weak O−H...O, N−H...N attractions; explains water\'s anomalously high boiling point',
          'VSEPR theory: electron pairs repel → determine molecule geometry (tetrahedral, trigonal planar, linear)',
          'Electrovalency = electrons gained/lost; Covalency = number of electron pairs shared',
        ]
      },
      {
        level: 'SS1',
        title: 'Acids, Bases & Salts',
        points: [
          'Arrhenius acid: produces H⁺ in water; base: produces OH⁻ in water',
          'Bronsted-Lowry acid: proton (H⁺) donor; base: proton acceptor',
          'pH scale: 0–6 acidic, 7 neutral, 8–14 alkaline; pH = −log[H⁺]',
          'Indicators: litmus (acid = red, base = blue); phenolphthalein (acid = colourless, base = pink)',
          'Neutralisation: acid + base → salt + water; H⁺ + OH⁻ → H₂O (exothermic)',
          'Salts: formed when metal replaces hydrogen of an acid; common salts: NaCl, CaCO₃, CuSO₄',
          'Preparation of salts: direct combination, displacement, neutralisation, double decomposition',
        ]
      },
      {
        level: 'SS2',
        title: 'Mole Concept & Stoichiometry',
        points: [
          'One mole = 6.02 × 10²³ particles (Avogadro\'s constant)',
          'Molar mass: mass of one mole in grams = relative atomic/molecular mass',
          'Moles = mass / molar mass; moles = volume (L) / 22.4 (for gases at STP)',
          'Molar concentration = moles / volume (in dm³); unit: mol/dm³ or M',
          'Balanced equation: coefficients show molar ratios of reactants and products',
          'Limiting reagent: reactant that is completely consumed first; determines yield',
          'Percentage yield = (actual yield / theoretical yield) × 100%',
        ]
      },
      {
        level: 'SS2',
        title: 'Electrochemistry & Equilibrium',
        points: [
          'Electrolysis: passage of direct current through an ionic compound (molten or in solution)',
          'Cathode (−): reduction; anode (+): oxidation — "Red Cat and An Ox"',
          'Electrolysis of brine: H₂ at cathode, Cl₂ at anode, NaOH formed in solution',
          'Faraday\'s 1st law: mass deposited ∝ charge passed (Q = It)',
          'Dynamic equilibrium: forward and reverse reactions occur at equal rates',
          'Le Chatelier\'s Principle: system shifts to oppose any imposed change',
          'Haber Process: N₂ + 3H₂ ⇌ 2NH₃; 450°C, 200 atm, Fe catalyst; compromise of rate and yield',
        ]
      },
      {
        level: 'SS2',
        title: 'Chemical Kinetics & Thermochemistry',
        points: [
          'Rate of reaction: how quickly reactants are consumed or products are formed',
          'Factors: temperature (↑ temp → ↑ rate); concentration (↑ conc → ↑ rate); surface area; catalyst; pressure (gases)',
          'Activation energy: minimum energy particles need to react; catalyst provides alternative lower-energy path',
          'Exothermic reaction: releases heat; ΔH is negative (e.g. combustion, neutralisation)',
          'Endothermic reaction: absorbs heat; ΔH is positive (e.g. photosynthesis, dissolving NH₄Cl)',
          'Enthalpy change ΔH: measured in kJ/mol; standard conditions 25°C, 1 atm',
          'Hess\'s law: enthalpy change is independent of route taken between reactants and products',
        ]
      },
      {
        level: 'SS3',
        title: 'Organic Chemistry',
        points: [
          'Organic compounds contain carbon; carbon forms 4 bonds; chains can be straight, branched or ring',
          'Alkanes: CₙH₂ₙ₊₂; saturated; undergo substitution with halogens in UV light',
          'Alkenes: CₙH₂ₙ; one C=C double bond; undergo addition reactions (Br₂ water, H₂, H₂O, HX)',
          'Test for alkene: decolourises bromine water (orange → colourless)',
          'Alcohols: contain −OH; ethanol (C₂H₅OH) fermented from glucose; primary/secondary/tertiary',
          'Carboxylic acids: contain −COOH; weak acids; react with alcohols to form esters (esterification)',
          'Polymers: long chain molecules from repeated monomer units; addition (polyethylene) or condensation (nylon)',
        ]
      },
      {
        level: 'SS3',
        title: 'Metals, Extraction & Industrial Chemistry',
        points: [
          'Reactivity series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Ag > Au',
          'Metals above H displace hydrogen from dilute acids; metals higher displace lower ones from solution',
          'Blast furnace (iron): iron ore + coke + limestone; coke reduces Fe₂O₃ to Fe; limestone removes impurities as slag',
          'Aluminium: extracted by electrolysis of molten alumite (bauxite/cryolite); cannot be smelted (too reactive)',
          'Contact Process (H₂SO₄): SO₂ → SO₃ (V₂O₅ catalyst, 450°C) → dissolved in H₂SO₄ → oleum → diluted',
          'Rusting: requires both oxygen and water; prevented by painting, galvanising (zinc coating), cathodic protection',
          'Alloys: mixtures of metals; steel (Fe + C), brass (Cu + Zn), bronze (Cu + Sn) — improved properties',
        ]
      },
      {
        level: 'SS3',
        title: 'Environmental & Separation Chemistry',
        points: [
          'Air pollution: CO (incomplete combustion), SO₂ (acid rain), NOₓ (photochemical smog), CFCs (ozone depletion)',
          'Water treatment: screening → sedimentation → coagulation (alum) → filtration → chlorination',
          'Sewage treatment: primary (screening/settlement) → secondary (biological oxidation) → tertiary (final polishing)',
          'Separation techniques: filtration (solid from liquid); evaporation (dissolve solid from solution); distillation (miscible liquids by boiling point); chromatography (mixture by affinity)',
          'Rf value in chromatography: distance moved by spot / distance moved by solvent front',
          'Greenhouse effect: CO₂, CH₄, H₂O trap infrared → global warming → climate change',
          'Sustainable chemistry: reducing waste, using renewable feedstocks, energy efficiency — "green chemistry"',
        ]
      },
    ]
  },

  /* ═══════════════════════════════════════════════════════════
     BIOLOGY
  ═══════════════════════════════════════════════════════════ */
  'Biology': {
    emoji: '🌿',
    desc: 'WAEC Biology — Cell biology, physiology, genetics, ecology and applied biology',
    topics: [
      {
        level: 'SS1',
        title: 'Cell Structure & Organisation',
        points: [
          'Cell: basic structural and functional unit of life (Robert Hooke, 1665)',
          'Plant cell extras (vs animal): cellulose cell wall, chloroplast, large permanent central vacuole',
          'Animal cell extras (vs plant): centrioles (for cell division)',
          'Organelles: nucleus (DNA/control), mitochondria (ATP/respiration), ribosome (protein synthesis), ER (transport), Golgi (packaging/secretion)',
          'Levels of organisation: cell → tissue → organ → organ system → organism',
          'Unicellular organisms: Amoeba, Paramecium, Euglena; Multicellular: all complex plants and animals',
          'Cell division: mitosis (growth/repair → 2 identical cells); meiosis (reproduction → 4 genetically unique cells)',
        ]
      },
      {
        level: 'SS1',
        title: 'Nutrition in Plants & Animals',
        points: [
          'Autotrophs: make own food; plants use photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂',
          'Factors affecting rate of photosynthesis: light intensity, CO₂ concentration, temperature, water',
          'Minerals needed by plants: nitrogen (protein), phosphorus (DNA/ATP), potassium (enzyme activation)',
          'Heterotrophs: obtain energy by consuming other organisms',
          'Human digestive system: mouth → oesophagus → stomach → small intestine → large intestine',
          'Enzymes: amylase (starch→maltose), pepsin (proteins, in stomach acid), lipase (fats), trypsin (proteins, in small intestine)',
          'Malnutrition: kwashiorkor (protein deficiency), marasmus (calorie deficiency), scurvy (vitamin C), rickets (vitamin D)',
        ]
      },
      {
        level: 'SS1',
        title: 'Transport & Respiration',
        points: [
          'Xylem: transports water and minerals upward (dead cells, lignified walls; one-way flow)',
          'Phloem: transports sucrose (photosynthesis products) both up and down (translocation)',
          'Transpiration: evaporation of water from stomata; creates transpiration pull drawing water up xylem',
          'Blood components: red cells (haemoglobin, O₂ transport), white cells (immunity), platelets (clotting), plasma (dissolved substances)',
          'Double circulation: pulmonary (heart ↔ lungs) and systemic (heart ↔ body)',
          'Aerobic respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP',
          'Anaerobic in muscles: glucose → lactic acid + small ATP; causes muscle fatigue',
        ]
      },
      {
        level: 'SS2',
        title: 'Excretion & Support',
        points: [
          'Excretion: removal of metabolic waste products (CO₂, urea, excess salts, water)',
          'Kidneys: filter blood; nephron = functional unit; glomerulus (filtration) → tubules (reabsorption)',
          'Urea: produced in liver from excess amino acids (deamination); removed by kidneys',
          'Skin: excretes salts and water as sweat; also regulates body temperature',
          'Skeleton: axial (skull, vertebral column, ribcage); appendicular (limb bones)',
          'Joints: ball-and-socket (shoulder, hip — full rotation); hinge (knee, elbow — one plane)',
          'Muscle pairs (antagonistic): bicep/tricep at elbow; when one contracts, the other relaxes',
        ]
      },
      {
        level: 'SS2',
        title: 'Reproduction & Growth',
        points: [
          'Asexual reproduction: one parent; offspring genetically identical (budding, binary fission, spores, vegetative)',
          'Sexual reproduction: involves gametes (sperm + egg); offspring show variation',
          'Pollination: transfer of pollen from anther to stigma; self-pollination vs cross-pollination',
          'Human male: testes produce sperm and testosterone; sperm travel through vas deferens',
          'Human female: ovaries release eggs (ovulation, day 14); uterus nurtures foetus',
          'Menstrual cycle: 28 days; controlled by FSH, LH, oestrogen and progesterone',
          'Growth: mitosis increases cell number; differentiation creates specialised cell types; growth curves (sigmoid/J-shaped)',
        ]
      },
      {
        level: 'SS2',
        title: 'Genetics & Evolution',
        points: [
          'DNA: double helix; base pairs A-T and G-C; carries genetic code in sequences of 3 bases (codons)',
          'Mendel\'s 1st law (segregation): alleles separate during gamete formation',
          'Mendel\'s 2nd law (independent assortment): genes on different chromosomes sort independently',
          'Monohybrid cross: one trait; ratio 3 dominant : 1 recessive in F2 generation',
          'Co-dominance: both alleles expressed (blood group AB = both A and B antigens)',
          'Sex determination: XX = female; XY = male; sex-linked traits on X chromosome (colour blindness, haemophilia)',
          'Natural selection (Darwin): variation → competition → survival of fittest → inherited traits become common',
        ]
      },
      {
        level: 'SS3',
        title: 'Ecology & Classification',
        points: [
          'Ecology: study of organisms and their interactions with each other and the environment',
          'Food chain: producer → primary consumer → secondary consumer → tertiary consumer',
          'Only ~10% of energy transfers between trophic levels; rest lost as heat',
          'Nitrogen cycle: fixation (Rhizobium) → nitrification → assimilation → denitrification',
          'Five kingdoms: Monera (bacteria), Protista (Amoeba), Fungi, Plantae, Animalia',
          'Binomial nomenclature: two-part scientific name — genus (capital) + species (lowercase), e.g. Homo sapiens',
          'Vertebrate classes: fish (cold-blooded, gills), amphibia, reptilia, aves (birds), mammalia',
        ]
      },
      {
        level: 'SS3',
        title: 'Microorganisms & Disease',
        points: [
          'Bacteria: prokaryotes (no membrane-bound nucleus); some cause disease; antibiotics kill bacteria',
          'Viruses: not cells; protein coat + nucleic acid; replicate inside host cells; cannot be treated with antibiotics',
          'Malaria: caused by Plasmodium (protozoan); vector = female Anopheles mosquito; prevention: mosquito nets, insecticides',
          'HIV/AIDS: retrovirus; destroys CD4 T-cells (immune system); spread through blood, sex, breast milk',
          'Cholera: bacterial (Vibrio cholerae); spread through contaminated water; symptom: severe watery diarrhoea',
          'Tuberculosis (TB): bacterial (Mycobacterium tuberculosis); airborne; affects lungs; BCG vaccine available',
          'Immunisation: introduces antigen → body makes antibodies → memory cells provide future protection',
        ]
      },
      {
        level: 'SS3',
        title: 'Biotechnology & Applied Biology',
        points: [
          'Fermentation: microorganisms break down sugars without oxygen; yeast produces ethanol + CO₂',
          'Biogas: anaerobic digestion of organic waste produces methane (CH₄) — renewable fuel',
          'Genetic engineering: cut desired gene with restriction enzymes → insert into host DNA using ligase',
          'Recombinant DNA technology: produces insulin (from bacteria), vaccines, disease-resistant crops (GMOs)',
          'Tissue culture (micropropagation): grow plant cells on nutrient medium → many identical plants',
          'Antibiotic resistance: misuse of antibiotics selects for resistant bacteria — serious global health threat',
          'Conservation: protect biodiversity through national parks, game reserves, seed banks and legislation',
        ]
      },
    ]
  },

  /* ═══════════════════════════════════════════════════════════
     GOVERNMENT
  ═══════════════════════════════════════════════════════════ */
  'Government': {
    emoji: '🏛️',
    desc: 'WAEC Government — Political theory, Nigerian history, democracy and international relations',
    topics: [
      {
        level: 'SS1',
        title: 'Introduction to Government & the State',
        points: [
          'Government: the institution through which the state exerts its authority and manages public affairs',
          'Functions of government: law-making, execution/implementation, interpretation, maintaining order, providing welfare',
          'The State: permanent political community; features — population, territory, government, sovereignty',
          'Sovereignty: supreme legal authority; internal (over citizens) and external (independence from other states)',
          'Legitimacy: people\'s acceptance of the right of government to rule; may come from elections, tradition or charisma',
          'Types of government: democracy, monarchy, aristocracy, oligarchy, autocracy, theocracy',
          'Politically active citizen: informed about laws, votes, pays taxes, respects others\' rights',
        ]
      },
      {
        level: 'SS1',
        title: 'Constitution & Organs of Government',
        points: [
          'Constitution: fundamental law of a state; defines structure of government and rights of citizens',
          'Written (codified): single document — Nigeria 1999, USA; Unwritten: conventions and statutes — UK',
          'Rigid: difficult to amend (special procedure, supermajority) — Nigeria; Flexible: easy to amend — UK',
          'Legislature (Parliament/National Assembly): makes laws; may be unicameral or bicameral',
          'Executive: implements laws; in presidential system, president is both head of state and government',
          'Judiciary: interprets laws; must be independent to protect rights and check other arms',
          'Separation of powers (Montesquieu): prevents abuse by keeping three arms distinct and independent',
        ]
      },
      {
        level: 'SS1',
        title: 'Democracy, Rule of Law & Political Concepts',
        points: [
          'Democracy: government of the people, by the people, for the people (Lincoln)',
          'Direct democracy: citizens vote directly on every issue (ancient Athens, Swiss referenda)',
          'Representative (indirect) democracy: citizens elect representatives to decide on their behalf',
          'Rule of law (A.V. Dicey): supremacy of law; equality before the law; rights protected by courts',
          'Constitutionalism: government must act within the limits set by the constitution',
          'Checks and balances: each arm of government limits the power of the others',
          'Political socialisation: process by which people learn political values (family, school, media)',
        ]
      },
      {
        level: 'SS2',
        title: 'Nigeria Under Colonial Rule & Independence',
        points: [
          'British colonial policy: Indirect Rule (using traditional rulers as intermediaries) — introduced by Lugard',
          'Amalgamation 1914: Northern and Southern Nigeria joined by Lord Lugard to form Nigeria',
          'Nationalist movements: NCNC (Azikiwe, 1944), AG (Awolowo, 1951), NPC (Sardauna, 1951)',
          'Constitutional conferences: Richards Constitution (1946), Macpherson (1951), Lyttleton (1954 — federalism)',
          'Independence: 1 October 1960; Republic: 1 October 1963 (Nnamdi Azikiwe as first President)',
          '1966 military coup: General Aguiyi-Ironsi; counter-coup 1966; Yakubu Gowon took power',
          'Civil War (Biafra) 1967–1970: 12 states created by Gowon; ended with "No victor, no vanquished"',
        ]
      },
      {
        level: 'SS2',
        title: 'Nigerian Political Parties & Electoral System',
        points: [
          'Political party: organisation seeking to gain power through elections; formulates policies and manifestos',
          'Functions: recruit leaders, provide candidates, educate voters, form government, provide opposition',
          'One-party system: only one legal party (authoritarian); Two-party: two major parties dominate',
          'Multi-party system: many parties; usually leads to coalition governments',
          'INEC (Independent National Electoral Commission): conducts federal elections; registers voters and parties',
          'Electoral systems: First Past the Post (FPTP) used in Nigeria — highest votes wins, regardless of majority',
          'Franchise (right to vote): universal adult suffrage in Nigeria — citizens 18 years and above',
        ]
      },
      {
        level: 'SS2',
        title: 'Federalism & Public Administration',
        points: [
          'Federalism: powers constitutionally divided between central and regional/state governments',
          'Features: written constitution, bicameral legislature, independent judiciary, revenue sharing',
          'Nigeria: 36 states + FCT; Exclusive list (federal only), Concurrent list (both), Residual (states)',
          'Revenue allocation: derived principle, equality of states, population, need; shared from Federation Account',
          'Civil service: permanent, professional, impartial bureaucracy that executes government policy',
          'Public corporations: government-owned enterprises (NNPC, PHCN, NPA); created by statute',
          'Military government: unconstitutional; suspends constitution; rules by decree; no separation of powers',
        ]
      },
      {
        level: 'SS3',
        title: 'Local Government & Citizenship',
        points: [
          'Local government: third tier of government; 774 LGAs in Nigeria',
          '1976 Reform (Murtala/Obasanjo): uniform structure — elected chairman + councillors established',
          'LGA functions: primary education, primary health care, markets, refuse, community development',
          'Revenue: statutory allocation from Federation Account + internally generated revenue (rates, fees)',
          'Citizenship: by birth (jus soli/jus sanguinis), registration, or naturalisation',
          'Fundamental Human Rights (Chapter IV, 1999 Constitution): life, dignity, liberty, fair hearing, expression, movement',
          'Civic duties: obey laws, pay taxes, vote, defend the nation, respect others\' rights',
        ]
      },
      {
        level: 'SS3',
        title: 'International Organisations & Foreign Policy',
        points: [
          'United Nations (1945): 193 members; General Assembly, Security Council (5 permanent with veto), ICJ, Secretariat',
          'UN objectives: maintain peace and security, promote human rights and development',
          'African Union (AU, 2002): succeeds OAU (1963); promotes African unity and development; HQ Addis Ababa',
          'ECOWAS (1975 Lagos Treaty): promotes West African economic integration; peacekeeping (ECOMOG)',
          'OPEC (1960): controls oil output to stabilise prices; Nigeria joined 1971',
          'Nigeria\'s foreign policy: Africa as centrepiece, non-alignment, promotion of African unity, respect for sovereignty',
          'Diplomacy: peaceful relations between states; ambassadors represent country abroad; embassies and high commissions',
        ]
      },
    ]
  },

  /* ═══════════════════════════════════════════════════════════
     ECONOMICS
  ═══════════════════════════════════════════════════════════ */
  'Economics': {
    emoji: '💹',
    desc: 'WAEC Economics — Microeconomics, macroeconomics, money and Nigerian economy',
    topics: [
      {
        level: 'SS1',
        title: 'Basic Economic Concepts',
        points: [
          'Economics: study of how scarce resources are allocated to satisfy unlimited wants',
          'Scarcity: resources (land, labour, capital) are limited; wants are unlimited → choices must be made',
          'Opportunity cost: value of the next best alternative foregone when a choice is made',
          'Scale of preference: ranking of wants in order of urgency',
          'Production possibility curve (PPC): shows maximum combinations of two goods an economy can produce',
          'Economic systems: capitalism (private ownership, market), socialism (state ownership), mixed (both)',
          'Factors of production: Land (rent), Labour (wages), Capital (interest), Entrepreneur (profit)',
        ]
      },
      {
        level: 'SS1',
        title: 'Demand Theory',
        points: [
          'Law of Demand: ceteris paribus, as price rises, quantity demanded falls (inverse relationship)',
          'Demand schedule: table of price-quantity pairs; demand curve slopes downward left to right',
          'Determinants of demand (shift factors): income, price of substitutes/complements, tastes, expectations, population',
          'Price Elasticity of Demand (PED) = % change in Qd / % change in price',
          'Elastic demand (|PED| > 1): luxury goods; Inelastic (|PED| < 1): necessities, addictive goods',
          'Income elasticity: positive = normal good; negative = inferior good; >1 = luxury',
          'Consumer surplus: difference between what consumer is willing to pay and what they actually pay',
        ]
      },
      {
        level: 'SS1',
        title: 'Supply Theory & Market Price',
        points: [
          'Law of Supply: as price rises, quantity supplied rises (positive/direct relationship)',
          'Determinants of supply: cost of production, technology, number of sellers, prices of related goods, taxes/subsidies',
          'Price Elasticity of Supply (PES) = % change in Qs / % change in price',
          'Equilibrium: price where quantity demanded = quantity supplied; market clears',
          'Excess demand (shortage): price below equilibrium; price rises to restore balance',
          'Excess supply (surplus): price above equilibrium; price falls to restore balance',
          'Price controls: price ceiling (maximum price — below equilibrium) causes shortage; price floor (minimum — above equilibrium) causes surplus',
        ]
      },
      {
        level: 'SS2',
        title: 'National Income & Economic Indicators',
        points: [
          'GDP: total market value of all final goods and services produced in a country in one year',
          'Expenditure method: GDP = C + I + G + (X − M) where X = exports, M = imports',
          'GNP = GDP + net income from abroad (citizens\' incomes wherever earned)',
          'NNP = GNP − depreciation (capital consumption allowance)',
          'Per capita income = national income ÷ population; measures average living standard',
          'Inflation: sustained rise in general price level; measured by Consumer Price Index (CPI)',
          'Types of unemployment: frictional (between jobs), structural (skills mismatch), cyclical (low demand), seasonal',
        ]
      },
      {
        level: 'SS2',
        title: 'Money, Banking & Monetary Policy',
        points: [
          'Functions of money: medium of exchange; store of value; unit of account; standard of deferred payment',
          'CBN (Central Bank, est. 1958): issues naira, banker to government, lender of last resort, regulates banks',
          'Commercial banks: accept deposits, give loans, create credit through fractional reserve banking',
          'Monetary Policy Rate (MPR): CBN\'s benchmark interest rate; raising it reduces money supply',
          'Cash Reserve Ratio (CRR): proportion of deposits banks must keep with CBN',
          'Open Market Operations: CBN buys (injects money) or sells (withdraws money) government securities',
          'Quantitative easing: creating money to buy assets; last resort stimulus measure',
        ]
      },
      {
        level: 'SS2',
        title: 'Production, Market Structures & Business',
        points: [
          'Law of Diminishing Returns: adding more of one variable factor (while others fixed) → eventually falling marginal product',
          'Economies of scale: falling average cost as output rises (bulk buying, specialisation, automation)',
          'Perfect competition: many sellers, identical product, free entry, price takers (agricultural markets)',
          'Monopoly: one seller, unique product, high entry barriers, price maker; can earn supernormal profit',
          'Oligopoly: few dominant firms; interdependence; kinked demand curve; common in Nigeria (telecoms)',
          'Monopolistic competition: many sellers, differentiated products, some market power (restaurants, salons)',
          'Business organisations: sole proprietorship, partnership, private limited company, public limited company',
        ]
      },
      {
        level: 'SS3',
        title: 'International Trade & Balance of Payments',
        points: [
          'Comparative advantage: produce what you are relatively most efficient at; basis for international trade',
          'Absolute advantage: produce more of a good than another country with same resources',
          'Advantages of trade: specialisation, access to goods not produced domestically, economies of scale',
          'Barriers to trade: tariffs (import taxes), quotas (quantity limits), embargoes, voluntary export restraints',
          'Balance of trade: value of visible exports minus value of visible imports',
          'Balance of payments: total record of all transactions between a country and the rest of the world',
          'Foreign exchange rate: price of one currency in terms of another; fixed vs floating exchange rates',
        ]
      },
      {
        level: 'SS3',
        title: 'Nigerian Economy & Development',
        points: [
          'Nigeria: Africa\'s largest economy by GDP; oil accounts for ~90% export earnings',
          'Oil dependency (Dutch Disease): large oil revenues can crowd out other sectors',
          'Agriculture: ~25% of GDP; employs ~70% of workforce; cash crops — cocoa (SW), groundnut (N), palm oil (SE)',
          'Economic problems: inflation, unemployment, corruption, poor infrastructure, oil price volatility',
          'Economic development vs growth: growth = increase in GDP; development = improvement in living standards',
          'Human Development Index (HDI): combines income per capita, life expectancy and education level',
          'Vision 2050 / Nigeria Agenda: long-term plans to diversify economy and reduce poverty',
        ]
      },
      {
        level: 'SS3',
        title: 'Fiscal Policy & Labour Market',
        points: [
          'Fiscal policy: government use of taxation and spending to influence economic activity',
          'Expansionary fiscal policy: increase spending or cut taxes → stimulate growth; risks: inflation, debt',
          'Contractionary fiscal policy: cut spending or raise taxes → reduce inflation; risk: recession',
          'Tax types: direct (income tax, company tax — progressive); indirect (VAT 7.5%, customs duty)',
          'Budget deficit: government spends more than revenue; surplus: revenue exceeds spending',
          'Trade unions: workers\' organisations that negotiate wages and conditions (NLC in Nigeria)',
          'Minimum wage: legally set floor on wages; Nigeria national minimum wage = ₦70,000 (2024)',
        ]
      },
    ]
  },

  /* ═══════════════════════════════════════════════════════════
     LITERATURE IN ENGLISH
  ═══════════════════════════════════════════════════════════ */
  'Literature in English': {
    emoji: '📖',
    desc: 'WAEC Literature — Poetry, prose, drama, African literature and exam techniques',
    topics: [
      {
        level: 'SS1',
        title: 'Introduction to Literature & Prose',
        points: [
          'Literature: creative writing that explores human experience through language',
          'Three main genres: prose (ordinary language), poetry (rhythmic, condensed), drama (for performance)',
          'Purpose of literature: entertain, educate, provoke thought, preserve culture, challenge society',
          'Prose elements: plot, character, setting, theme, point of view, style, tone',
          'Plot: sequence of events; structure — exposition → rising action → climax → falling action → resolution',
          'Characterisation: direct (author tells us) vs indirect (character revealed through actions/dialogue)',
          'Point of view: first person ("I") — subjective; third person omniscient — all-knowing narrator',
        ]
      },
      {
        level: 'SS1',
        title: 'Introduction to Poetry',
        points: [
          'Poetry: uses language intensely and economically; every word is carefully chosen',
          'Lyric poetry: expresses personal emotion (love song, elegy, ode)',
          'Narrative poetry: tells a story (ballad, epic)',
          'Dramatic poetry: speech in character (dramatic monologue)',
          'Rhyme scheme: pattern of rhymes at line ends — ABAB, AABB (couplet), ABBA',
          'Rhythm and metre: pattern of stressed (/) and unstressed (x) syllables',
          'Tone: the poet\'s attitude (melancholic, joyful, ironic, angry, reflective)',
        ]
      },
      {
        level: 'SS1',
        title: 'Introduction to Drama',
        points: [
          'Drama: written for performance; read differently from prose — focus on dialogue and action',
          'Structure: acts (major divisions) → scenes (smaller units); stage directions guide performance',
          'Dramatic conflict: the struggle that drives the plot (man vs man, society, nature, self)',
          'Tragedy: protagonist with hamartia (fatal flaw) falls from greatness to suffering or death',
          'Comedy: characters overcome obstacles; usually ends happily (marriage, reunion, reconciliation)',
          'Tragicomedy: blends serious and comic elements (common in modern drama)',
          'Setting in drama: time, place and social context; crucial for understanding characters\' behaviour',
        ]
      },
      {
        level: 'SS2',
        title: 'Figures of Speech & Literary Devices',
        points: [
          'Simile: comparison using "like" or "as" — "she moves like a graceful swan"',
          'Metaphor: implied comparison without "like/as" — "the classroom was a marketplace"',
          'Personification: human qualities to non-human — "the sun kissed the earth"',
          'Symbolism: object represents abstract idea — dove = peace; darkness = evil/ignorance',
          'Irony: verbal (say opposite of meaning); dramatic (audience knows more than character); situational (outcome opposite of expected)',
          'Paradox: contradictory statement that contains truth — "I must be cruel, only to be kind"',
          'Allusion: indirect reference to a historical event, text or person',
        ]
      },
      {
        level: 'SS2',
        title: 'Poetic Devices & Verse Forms',
        points: [
          'Alliteration: same consonant at start of successive words — "the wild winds weep"',
          'Assonance: repetition of vowel sounds — "the rain in Spain stays mainly in the plain"',
          'Onomatopoeia: words that mimic sounds — buzz, crack, hiss, murmur, thunder',
          'Enjambment: sentence runs over a line break without pause; creates flowing, breathless effect',
          'Caesura: deliberate pause within a line, often marked by punctuation',
          'Sonnet: 14 lines; Shakespearean = 3 quatrains (ABAB) + couplet (GG); Petrarchan = octave + sestet',
          'Free verse: no fixed rhyme or metre; relies on rhythm of speech and imagery (much modern poetry)',
        ]
      },
      {
        level: 'SS2',
        title: 'African & Nigerian Literature',
        points: [
          'Chinua Achebe: Things Fall Apart (1958) — colonialism destroys Okonkwo\'s Igbo world; Arrow of God; No Longer at Ease',
          'Wole Soyinka: first African Nobel Laureate in Literature (1986); Death and the King\'s Horseman; The Lion and the Jewel; The Trials of Brother Jero',
          'J.P. Clark: Song of a Goat; The Raft; Ozidi — Niger Delta tragedy and myth',
          'Buchi Emecheta: The Joys of Motherhood; Second Class Citizen — feminism and diaspora',
          'Cyprian Ekwensi: Jagua Nana; People of the City — urban Nigerian life',
          'Ngugi wa Thiong\'o (Kenya): Weep Not Child; A Grain of Wheat — colonialism in East Africa',
          'Ben Okri: The Famished Road (1991 Booker Prize) — spirit world and abiku in Nigerian life',
        ]
      },
      {
        level: 'SS3',
        title: 'Drama Analysis & Stagecraft',
        points: [
          'Dramatic irony: audience knows something that one or more characters do not know',
          'Soliloquy: character speaks thoughts aloud alone on stage — reveals inner conflict and motivation',
          'Aside: character speaks briefly to audience, unheard by other characters on stage',
          'Catharsis (Aristotle): emotional purging of pity and fear felt by audience at end of tragedy',
          'Deus ex machina: contrived resolution by an unexpected external force — seen as poor plotting',
          'Soyinka fuses Yoruba ritual, masquerade and mythology with Western dramatic conventions',
          'Epic theatre (Brecht): alienation effect — audience should think critically, not be emotionally swept away',
        ]
      },
      {
        level: 'SS3',
        title: 'WAEC Exam Techniques',
        points: [
          'Read the question carefully — distinguish between "discuss", "analyse", "compare" and "comment on"',
          'Always quote from the text to support your points; integrate quotations smoothly into sentences',
          'For character questions: describe the character, support with evidence, link to theme',
          'For theme questions: define the theme, show how it is developed, use examples from text',
          'For poetry: comment on form, tone, imagery, language and effect on the reader',
          'For drama: consider stage action, dialogue, dramatic tension and audience impact',
          'Write a clear introduction (name text and author), developed body paragraphs and a conclusion',
        ]
      },
      {
        level: 'SS3',
        title: 'Oral Literature & Revision',
        points: [
          'Oral literature: passed down verbally — proverbs, folktales, myths, legends, riddles, praise poetry',
          'Proverbs: short wise sayings expressing truth — "When the music changes, so does the dance"',
          'Folktale: short story with animals or humans that teaches a moral lesson',
          'Praise poetry (oriki): celebrates individuals, families or towns; important in Yoruba culture',
          'Myth: story explaining origins of the world, natural phenomena or cultural practices',
          'Riddle: question with a clever or unexpected answer; tests observation and intelligence',
          'WAEC prescribed texts change regularly — always confirm the current list before exams',
        ]
      },
    ]
  },

  /* ═══════════════════════════════════════════════════════════
     GEOGRAPHY
  ═══════════════════════════════════════════════════════════ */
  'Geography': {
    emoji: '🌍',
    desc: 'WAEC Geography — Maps, climate, physical geography, Nigeria and economic geography',
    topics: [
      {
        level: 'SS1',
        title: 'Map Reading & Cartography',
        points: [
          'Map: flat representation of all or part of the earth\'s surface',
          'Scale types: representative fraction (1:50,000), linear/graphic scale, statement scale',
          'Grid reference: six-figure — easting (x) before northing (y); "along the corridor, then up the stairs"',
          'Bearing: direction measured clockwise from north in degrees (north = 000°; east = 090°; south = 180°)',
          'Contour lines: join points of equal altitude; closely spaced = steep slope; widely spaced = gentle slope',
          'Relief features: hill (concentric ovals), valley (V pointing upstream), cliff (contours touch), ridge, spur',
          'Types of maps: topographic (physical features), political, thematic (choropleth, isoline, dot, proportional symbol)',
        ]
      },
      {
        level: 'SS1',
        title: 'Weather, Climate & Atmosphere',
        points: [
          'Weather: short-term atmospheric conditions at a specific place and time',
          'Climate: average atmospheric conditions of a place over at least 30 years',
          'Elements of weather: temperature, rainfall (precipitation), humidity, wind direction and speed, cloud cover',
          'Climate controls: latitude, altitude, distance from sea, ocean currents, prevailing winds, vegetation',
          'Weather instruments: thermometer (temperature), barometer (pressure), rain gauge (rainfall), hygrometer (humidity), anemometer (wind speed)',
          'ITCZ (Inter-Tropical Convergence Zone): where NE and SE trade winds meet → heavy rainfall; moves seasonally',
          'Rainfall types: convectional (heated air rises), relief/orographic (air forced up mountains), frontal (cold/warm front)',
        ]
      },
      {
        level: 'SS1',
        title: 'Rocks, Weathering & Soil Formation',
        points: [
          'Igneous rocks: from cooled magma; intrusive (granite, slow cooling) or extrusive (basalt, fast cooling)',
          'Sedimentary rocks: from compressed sediments; contain fossils; limestone, sandstone, shale',
          'Metamorphic rocks: changed by heat and pressure; marble (from limestone), slate (from shale)',
          'Physical weathering: freeze-thaw, exfoliation (onion peeling), pressure release — breaks rock without chemical change',
          'Chemical weathering: solution (acid rain on limestone), hydration, oxidation (iron rust)',
          'Biological weathering: roots break rock; burrowing animals; organic acids from decomposition',
          'Soil profile: O horizon (organic humus) → A horizon (topsoil) → B horizon (subsoil) → C (weathered rock) → R (bedrock)',
        ]
      },
      {
        level: 'SS2',
        title: 'Population & Migration',
        points: [
          'Population distribution: uneven; influenced by climate, water supply, fertile land, resources, political stability',
          'Population density = number of people per km²; Nigeria\'s most dense areas: Lagos, Anambra',
          'Population growth = birth rate − death rate + net migration',
          'Demographic transition model: 4 stages from high birth/death rate to low birth/death rate',
          'Push factors (to leave): poverty, drought, conflict, poor services, unemployment',
          'Pull factors (to attract): jobs, education, healthcare, infrastructure, safety',
          'Rural-urban migration: causes rapid urbanisation; Lagos has ~15 million people (West Africa\'s largest)',
        ]
      },
      {
        level: 'SS2',
        title: 'Agriculture & Natural Resources',
        points: [
          'Subsistence farming: for own consumption; common in rural Nigeria; low technology',
          'Commercial farming: for profit and market; large-scale; uses technology and capital',
          'Nigeria\'s agricultural zones: forest zone (cocoa, rubber, palm oil) → guinea savanna (yam, maize) → sudan savanna (groundnut, cotton) → sahel (millet, sorghum)',
          'Problems of Nigerian agriculture: poor roads, lack of storage, inadequate capital, pests and disease, land tenure issues',
          'Nigeria\'s minerals: crude oil and natural gas (Niger Delta), coal (Enugu), tin (Jos Plateau), limestone, gold',
          'Renewable resources: forests, soil, water, fish stocks — can be replenished if managed sustainably',
          'Non-renewable: coal, oil, natural gas, minerals — finite; once used, cannot be replaced',
        ]
      },
      {
        level: 'SS2',
        title: 'Mining, Industry & Transport',
        points: [
          'Types of mining: shaft/underground (deep deposits), opencast/surface (near surface), alluvial (river deposits), quarrying (building materials)',
          'Factors of industrial location: raw materials, power, labour, transport, capital, market, government policy',
          'Primary industry: extracts raw materials (farming, fishing, mining)',
          'Secondary industry: manufactures goods (factories, processing plants)',
          'Tertiary industry: provides services (banking, education, retail, transport)',
          'Transport modes: road (flexible, door-to-door), rail (heavy goods, no congestion), air (fast, expensive), water (bulky goods, cheap)',
          'Nigeria\'s transport challenges: poor road maintenance, inadequate rail network, congested ports',
        ]
      },
      {
        level: 'SS3',
        title: 'Settlement & Urbanisation',
        points: [
          'Rural settlements: dispersed (scattered homesteads), nucleated (grouped around feature), linear (along road/river)',
          'Urban settlements: larger, more complex, specialised functions; higher population density',
          'Factors of town location: defence (hilltop), trade route junction, river crossing, resource availability',
          'Urbanisation: increasing proportion of population living in urban areas',
          'Problems of rapid urbanisation: housing shortage (slums), traffic congestion, pollution, inadequate services',
          'Conurbation: merger of adjacent cities into one continuous built-up area (Lagos-Badagry corridor)',
          'Primate city: dominant city far larger than second city; Lagos (Nigeria), Cairo (Egypt)',
        ]
      },
      {
        level: 'SS3',
        title: 'Nigerian & West African Geography',
        points: [
          'Nigeria: 923,768 km²; bordered by Benin (W), Niger (N), Chad (NE), Cameroon (E); coastline on Gulf of Guinea',
          'Six geopolitical zones: NW, NE, NC (Middle Belt), SW, SE, SS (South-South)',
          'River Niger: 4,100 km total; enters Nigeria from NW via Kebbi; forms massive delta (9th largest in world)',
          'Major Nigerian cities: Lagos (commercial), Abuja (federal capital), Kano (northern commerce), Port Harcourt (oil)',
          'West African countries: Nigeria, Ghana, Senegal, Côte d\'Ivoire, Mali, Guinea, Sierra Leone, Liberia, Togo, Benin, Burkina Faso, Gambia, Guinea-Bissau, Mauritania, Cape Verde',
          'ECOWAS: promotes free movement of persons, goods and services in West Africa',
          'West Africa\'s economy: dominated by agriculture; oil (Nigeria, Ghana); gold and cocoa (Ghana); groundnuts (Senegal)',
        ]
      },
      {
        level: 'SS3',
        title: 'World Geography & Environmental Issues',
        points: [
          'World\'s continents: Africa (largest by population density), Asia (largest by area and population), Europe, North America, South America, Australia/Oceania, Antarctica',
          'Major ocean currents: warm currents (Gulf Stream — warms NW Europe); cold currents (Benguela — cools SW Africa)',
          'Desertification: expansion of desert; caused by overgrazing, deforestation, drought, poor land use',
          'Deforestation: removal of forest cover → soil erosion, flooding, loss of biodiversity, CO₂ release',
          'Greenhouse effect: CO₂, CH₄, N₂O trap heat → global warming → sea level rise, extreme weather',
          'Acid rain: SO₂ and NOₓ dissolve in rainwater → sulfuric and nitric acids → damages ecosystems',
          'Sustainable development: meeting present needs without compromising future generations\' ability to meet theirs',
        ]
      },
    ]
  },

  /* ═══════════════════════════════════════════════════════════
     COMMERCE
  ═══════════════════════════════════════════════════════════ */
  'Commerce': {
    emoji: '🏪',
    desc: 'WAEC Commerce — Trade, banking, insurance, business organisations and consumer protection',
    topics: [
      {
        level: 'SS1',
        title: 'Introduction to Commerce & Trade',
        points: [
          'Commerce: all activities that facilitate the exchange of goods and services',
          'Branches of commerce: trade (home and foreign) + aids to trade (transport, banking, insurance, warehousing, communication, advertising)',
          'Home trade: buying and selling within a country; Foreign/International trade: between countries',
          'Visible trade: physical goods (merchandise); Invisible trade: services (tourism, shipping, insurance)',
          'Balance of trade: value of visible exports minus value of visible imports',
          'Surplus: exports > imports (favourable); Deficit: imports > exports (unfavourable)',
          'Balance of payments: complete record of all economic transactions with the rest of the world',
        ]
      },
      {
        level: 'SS1',
        title: 'Retail Trade',
        points: [
          'Retailer: last link in distribution; sells directly to final consumers in small quantities',
          'Types of small retailers: itinerant traders, market traders, general stores, convenience stores, speciality shops',
          'Large-scale retailers: supermarkets (self-service, wide range), department stores (many departments), chain stores (many branches)',
          'Mail order: customers order from catalogue; goods delivered by post/courier',
          'E-commerce: buying and selling via the internet; growing rapidly in Nigeria (Jumia, Konga)',
          'Advantages of large-scale retailing: economies of scale, lower prices, wide variety, convenience',
          'Disadvantages: destroys small businesses, less personal service, creates unemployment in small trade',
        ]
      },
      {
        level: 'SS1',
        title: 'Wholesale Trade & Distribution',
        points: [
          'Wholesaler: middle person between producer and retailer; buys in large quantities (bulk buying)',
          'Wholesaler functions: breaking bulk, storage, risk-bearing, credit provision, market information',
          'Direct channel: Producer → Consumer (farm gate sales, factory outlet)',
          'Short channel: Producer → Retailer → Consumer (common for perishables)',
          'Long channel: Producer → Wholesaler → Retailer → Consumer (most manufactured goods)',
          'Factors affecting channel choice: product type (perishable, technical), market size, producer resources',
          'Decline of wholesaler: supermarkets buy directly from producers, bypassing wholesalers',
        ]
      },
      {
        level: 'SS2',
        title: 'Business Organisations',
        points: [
          'Sole proprietorship: one owner; unlimited liability; unlimited working hours; easy to set up',
          'Partnership: 2–20 members; governed by Partnership Deed; joint and several liability',
          'Private limited company (Ltd): 2–50 shareholders; limited liability; shares NOT publicly traded',
          'Public limited company (Plc): minimum 7 shareholders; shares traded on NGX (Nigerian Exchange Group)',
          'Cooperative society: owned and controlled by members; democratic (one member, one vote); surplus shared as dividends',
          'Public corporation: wholly government-owned (NNPC, NIMASA, NPA); created by statute; policy-driven not profit-driven',
          'Sources of finance: owners\' capital, retained profits, bank loans, debentures, share issues, trade credit',
        ]
      },
      {
        level: 'SS2',
        title: 'Banking & Insurance',
        points: [
          'CBN (Central Bank): issues currency, regulates commercial banks, implements monetary policy',
          'Commercial bank services: current account, savings account, fixed deposits, loans, overdraft, foreign exchange',
          'Cheques: open (can be cashed), crossed (must be paid into account), marked ("account payee only")',
          'Principles of insurance: insurable interest, utmost good faith, indemnity, subrogation, contribution',
          'Life assurance: pays out on death or maturity; premiums invested; no indemnity (life is priceless)',
          'Fire insurance: covers damage to property by fire; insured must prove loss',
          'Motor vehicle: Third-party only (compulsory, covers other parties); Comprehensive (covers own vehicle too)',
        ]
      },
      {
        level: 'SS2',
        title: 'Aids to Trade',
        points: [
          'Transport: creates place utility — moves goods from where produced to where needed',
          'Warehousing: creates time utility — stores goods until needed; types: private, public, bonded',
          'Advertising: informs consumers; creates demand; media: TV, radio, newspapers, billboards, social media',
          'Communication: telephone, email, post, internet — enables trade transactions across distances',
          'Tourism: export of services; foreign visitors spending = invisible export; earns foreign exchange',
          'Standards: SON (Standards Organisation of Nigeria) sets product quality standards to protect consumers',
          'NAFDAC: regulates food, drugs, cosmetics — ensures safety and quality of products in Nigeria',
        ]
      },
      {
        level: 'SS3',
        title: 'International Trade & Documents',
        points: [
          'Advantages of international trade: comparative advantage, specialisation, access to scarce goods, economies of scale',
          'Barriers: tariffs (tax on imports), quotas (quantity limits), embargoes (total ban), exchange controls',
          'Common trade documents: bill of lading (sea), airway bill (air), invoice, certificate of origin, bill of exchange',
          'Letter of credit: bank guarantees payment to exporter; safest method for international payment',
          'Terms of trade: ratio of export price index to import price index; improvement means more imports per unit export',
          'Free trade zones: areas with relaxed regulations to attract foreign investment (Lekki Free Zone, Lagos)',
          'WTO (World Trade Organisation): promotes free trade globally; settles trade disputes',
        ]
      },
      {
        level: 'SS3',
        title: 'Capital Market & Entrepreneurship',
        points: [
          'Capital market: provides long-term finance (5+ years); instruments: ordinary shares, preference shares, debentures, bonds',
          'Nigerian Exchange Group (NGX): stock exchange where shares of listed companies are bought and sold',
          'Primary market: new securities issued for the first time (IPO); Secondary market: existing securities traded',
          'Stockbroker: licensed intermediary who buys and sells shares on behalf of investors',
          'Entrepreneurship: identifying business opportunities and taking risks to create value',
          'Characteristics of an entrepreneur: risk-taking, innovative, self-motivated, organised, goal-oriented',
          'Problems of Nigerian entrepreneurs: inadequate capital, poor infrastructure, policy instability, high interest rates',
        ]
      },
      {
        level: 'SS3',
        title: 'Consumer Protection & Business Ethics',
        points: [
          'Consumer rights (UN): right to safety, to be informed, to choose, to be heard, to redress',
          'Consumer Protection Council (CPC): investigates complaints; bans unsafe products; mediates disputes',
          'FCCPC (Federal Competition & Consumer Protection Commission): enforces competition and consumer protection law',
          'Hire purchase: buyer takes goods and pays in instalments; ownership transfers only on final payment',
          'Counterfeit goods: fake products that violate intellectual property rights; illegal and dangerous',
          'Corporate social responsibility (CSR): businesses contributing positively to society beyond profit',
          'Business ethics: honesty, fairness, transparency, environmental responsibility in all business dealings',
        ]
      },
    ]
  },

};

/* ════════════════════════════════════════════════════════════
   RENDER ENGINE — builds tabs, filter bar and notes panels
════════════════════════════════════════════════════════════ */
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

    /* ── Subject tab button ── */
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

    const topicsHtml = data.topics.map(t => `
      <div class="topic-card" data-level="${t.level}">
        <div class="topic-title">
          ${escapeHtml(t.title)}
          <span class="topic-level ${t.level.toLowerCase()}">${t.level}</span>
        </div>
        <ul class="topic-points">
          ${t.points.map(p => `<li>${escapeHtml(p)}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    panel.innerHTML = `
      <div class="notes-header">
        <span class="notes-header-emoji" aria-hidden="true">${data.emoji}</span>
        <div>
          <h2>${escapeHtml(subjectName)}</h2>
          <p>${escapeHtml(data.desc)}</p>
        </div>
      </div>
      <div class="notes-filter">
        <span class="notes-filter-label">Filter:</span>
        <button class="level-btn active" data-level="all">All</button>
        <button class="level-btn" data-level="SS1">SS1</button>
        <button class="level-btn" data-level="SS2">SS2</button>
        <button class="level-btn" data-level="SS3">SS3</button>
      </div>
      <div class="topics-grid">${topicsHtml}</div>
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

    /* ── Level filter logic ── */
    panel.querySelectorAll('.level-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        panel.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const level = btn.dataset.level;
        panel.querySelectorAll('.topic-card').forEach(card => {
          card.classList.toggle('level-hidden', level !== 'all' && card.dataset.level !== level);
        });
      });
    });

    panelsEl.appendChild(panel);
  });
})();
