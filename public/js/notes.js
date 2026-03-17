/* ============================================================
   ExamReady Nigeria — notes.js
   Study notes data + render engine
   ============================================================ */

'use strict';

const NOTES_DATA = {
  'Mathematics': {
    emoji: '🔢',
    desc: 'Algebra, geometry, statistics and more',
    topics: [
      {
        title: 'Algebra & Equations',
        points: [
          'Linear equation: isolate x — e.g. 2x + 3 = 11 → x = 4',
          'Quadratic formula: x = (−b ± √(b²−4ac)) / 2a',
          'Factorisation: x² + 5x + 6 = (x+2)(x+3) — find two numbers that add to 5 and multiply to 6',
          'Simultaneous equations: elimination or substitution method',
          'Inequalities: flip sign when multiplying/dividing by a negative',
        ]
      },
      {
        title: 'Numbers & Indices',
        points: [
          'LCM: lowest common multiple (use prime factorisation)',
          'HCF: highest common factor',
          'Indices: aᵐ × aⁿ = aᵐ⁺ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁰ = 1',
          'Logarithm: log_a(x) = n ⟺ aⁿ = x',
          'Surds: √a × √b = √(ab); rationalise denominator by multiplying by conjugate',
        ]
      },
      {
        title: 'Geometry & Mensuration',
        points: [
          'Area of circle = πr²; circumference = 2πr (use π = 22/7)',
          'Pythagoras: c² = a² + b² (right-angled triangle)',
          'Volume of cylinder = πr²h; cone = ⅓πr²h; sphere = ⁴⁄₃πr³',
          'Sum of interior angles of a polygon = (n−2) × 180°',
          'Trigonometry: SOH-CAH-TOA; sin 30°=½, cos 60°=½, tan 45°=1',
        ]
      },
      {
        title: 'Statistics & Probability',
        points: [
          'Mean = sum of values ÷ number of values',
          'Median = middle value when arranged in order',
          'Mode = most frequently occurring value',
          'Probability = favourable outcomes ÷ total outcomes (range: 0 to 1)',
          'Standard deviation measures spread from the mean',
        ]
      },
      {
        title: 'Sequences & Series',
        points: [
          'Arithmetic progression (AP): nth term = a + (n−1)d; sum = n/2[2a + (n−1)d]',
          'Geometric progression (GP): nth term = arⁿ⁻¹; sum = a(1−rⁿ)/(1−r)',
          'a = first term, d = common difference, r = common ratio',
          'Simple Interest: SI = PRT/100; Compound Interest: A = P(1 + r/100)ⁿ',
        ]
      },
      {
        title: 'Sets & Coordinate Geometry',
        points: [
          'Venn diagram: n(A∪B) = n(A) + n(B) − n(A∩B)',
          'Gradient of a line: m = (y₂−y₁)/(x₂−x₁)',
          'Midpoint formula: ((x₁+x₂)/2, (y₁+y₂)/2)',
          'Equation of a line: y = mx + c (m = gradient, c = y-intercept)',
          'Distance between two points: d = √[(x₂−x₁)² + (y₂−y₁)²]',
        ]
      },
    ]
  },

  'English Language': {
    emoji: '📝',
    desc: 'Grammar, vocabulary, comprehension and oral English',
    topics: [
      {
        title: 'Figures of Speech',
        points: [
          'Simile: comparison using "like" or "as" — "brave as a lion"',
          'Metaphor: direct comparison without "like/as" — "he is a lion"',
          'Personification: giving human qualities to non-human things',
          'Hyperbole: deliberate exaggeration — "I've told you a million times"',
          'Irony: saying the opposite of what you mean',
          'Oxymoron: contradictory terms together — "deafening silence"',
          'Alliteration: repetition of consonant sounds — "Peter Piper picked"',
          'Onomatopoeia: words that sound like their meaning — buzz, hiss, bang',
        ]
      },
      {
        title: 'Grammar & Tenses',
        points: [
          'Simple present: He runs. Simple past: He ran. Future: He will run.',
          'Present continuous: He is running. Past continuous: He was running.',
          'Present perfect: He has run. Past perfect: He had run.',
          'Subject-verb agreement: singular subject → singular verb',
          'Active: "The dog bit the man." Passive: "The man was bitten by the dog."',
          'Direct: She said, "I am tired." Indirect: She said that she was tired.',
        ]
      },
      {
        title: 'Vocabulary',
        points: [
          'Synonym = word with similar meaning (e.g. benevolent = generous)',
          'Antonym = word with opposite meaning (e.g. verbose ≠ concise)',
          'Context clues help determine meaning of unfamiliar words',
          'Commonly confused: affect/effect, principal/principle, their/there/they\'re',
          'Learn prefixes/suffixes: un- (not), re- (again), -tion (noun form)',
        ]
      },
      {
        title: 'Comprehension & Oral English',
        points: [
          'Read the passage at least twice before answering',
          'Answers to comprehension questions are usually paraphrased from the text',
          'Stress in English: con-TENT (noun) vs CON-tent (adjective)',
          'Vowel sounds: short (/ɪ/ as in "sit") vs long (/iː/ as in "seat")',
          'Intonation rises for questions, falls for statements',
        ]
      },
    ]
  },

  'Physics': {
    emoji: '⚡',
    desc: 'Mechanics, waves, electricity and modern physics',
    topics: [
      {
        title: 'Mechanics',
        points: [
          'Newton\'s 1st law: an object stays at rest or uniform motion unless acted upon by a force',
          'Newton\'s 2nd law: F = ma (Force = mass × acceleration)',
          'Newton\'s 3rd law: every action has an equal and opposite reaction',
          'Velocity = displacement/time; Acceleration = change in velocity/time',
          'Kinetic energy = ½mv²; Potential energy = mgh; Work = F × d',
          'Power = Work/Time (watts); Efficiency = useful output/total input × 100%',
        ]
      },
      {
        title: 'Waves & Optics',
        points: [
          'Wave equation: v = fλ (speed = frequency × wavelength)',
          'Frequency = 1/period; Period = 1/frequency',
          'Concave mirror: used in torches, telescopes (converging)',
          'Convex mirror: used in car rear-view mirrors (diverging, wider view)',
          'Refraction: light bends when entering a denser medium (Snell\'s law)',
          'Total internal reflection occurs when angle exceeds critical angle',
        ]
      },
      {
        title: 'Electricity & Magnetism',
        points: [
          'Ohm\'s law: V = IR (Voltage = Current × Resistance)',
          'Series circuit: same current, voltages add up; R_total = R₁ + R₂ + ...',
          'Parallel circuit: same voltage, currents add up; 1/R = 1/R₁ + 1/R₂',
          'Power: P = IV = I²R = V²/R',
          'Like poles repel, unlike poles attract (magnetism)',
          'Fleming\'s left-hand rule: motor effect (thrust, field, current)',
        ]
      },
      {
        title: 'Heat & Thermodynamics',
        points: [
          'Specific heat capacity (c): Q = mcΔT',
          'Latent heat: Q = mL (heat absorbed/released during change of state)',
          'Boyle\'s Law: P₁V₁ = P₂V₂ (constant temperature)',
          'Charles\'s Law: V₁/T₁ = V₂/T₂ (constant pressure)',
          'Combined Gas Law: P₁V₁/T₁ = P₂V₂/T₂',
          'Conduction (solids), Convection (fluids), Radiation (no medium needed)',
        ]
      },
    ]
  },

  'Chemistry': {
    emoji: '🧪',
    desc: 'Atomic structure, bonding, reactions and organic chemistry',
    topics: [
      {
        title: 'Atomic Structure & Periodic Table',
        points: [
          'Atom: nucleus (protons + neutrons) + electrons orbiting in shells',
          'Atomic number = number of protons; Mass number = protons + neutrons',
          'Isotopes: same atomic number, different mass numbers',
          'Periods: horizontal rows (energy levels); Groups: vertical columns (valence electrons)',
          'Group I (alkali metals): very reactive, form +1 ions',
          'Group VII (halogens): reactive non-metals, form −1 ions',
          'Group 0 (noble gases): full outer shell, very unreactive',
        ]
      },
      {
        title: 'Chemical Bonding',
        points: [
          'Ionic bond: metal gives electrons to non-metal (e.g. NaCl)',
          'Covalent bond: atoms share electrons (e.g. H₂O, CO₂)',
          'Metallic bond: "sea of electrons" surrounding positive metal ions',
          'Electrovalency = number of electrons gained/lost to form ion',
          'Covalency = number of electron pairs shared',
        ]
      },
      {
        title: 'Chemical Reactions',
        points: [
          'Oxidation: loss of electrons (OIL) / gain of oxygen',
          'Reduction: gain of electrons (RIG) / loss of oxygen',
          'Acids turn blue litmus red; Bases turn red litmus blue',
          'pH scale: 0–6 acidic, 7 neutral, 8–14 alkaline',
          'Rate of reaction increases with: higher temperature, greater concentration, catalyst, smaller particle size',
          'Electrolysis: at cathode (negative) reduction occurs; at anode (positive) oxidation occurs',
        ]
      },
      {
        title: 'Organic Chemistry',
        points: [
          'Alkanes: CₙH₂ₙ₊₂ (saturated, single bonds) — methane, ethane, propane',
          'Alkenes: CₙH₂ₙ (unsaturated, double bond) — ethene, propene',
          'Alkynes: CₙH₂ₙ₋₂ (triple bond) — ethyne (acetylene)',
          'Functional groups: −OH (alcohol), −COOH (carboxylic acid), −CHO (aldehyde)',
          'Test for alkene: decolourises bromine water',
          'Petroleum is fractionally distilled: gases → petrol → kerosene → diesel → lubricants → bitumen',
        ]
      },
    ]
  },

  'Biology': {
    emoji: '🌿',
    desc: 'Cell biology, genetics, ecology and human physiology',
    topics: [
      {
        title: 'Cell Biology',
        points: [
          'Plant cell extras (vs animal): cell wall, chloroplast, large central vacuole',
          'Mitochondria = powerhouse (ATP production)',
          'Nucleus = control centre (contains DNA)',
          'Chloroplast = photosynthesis site (contains chlorophyll)',
          'Diffusion: movement of molecules from high → low concentration',
          'Osmosis: movement of water through semi-permeable membrane from low → high solute concentration',
        ]
      },
      {
        title: 'Genetics & Reproduction',
        points: [
          'Mendel\'s 1st law (segregation): alleles separate during gamete formation',
          'Mendel\'s 2nd law (independent assortment): genes on different chromosomes assort independently',
          'Dominant allele (uppercase) masks recessive allele (lowercase)',
          'Genotype: genetic makeup; Phenotype: physical appearance',
          'Mitosis: produces 2 identical daughter cells (growth, repair)',
          'Meiosis: produces 4 genetically unique cells (sexual reproduction)',
          'DNA carries genetic information in sequences of bases (A-T, G-C)',
        ]
      },
      {
        title: 'Human Physiology',
        points: [
          'Digestive enzymes: amylase (starch→sugar), pepsin (proteins), lipase (fats)',
          'Insulin (pancreas) lowers blood sugar; glucagon raises it',
          'Kidneys filter blood, produce urine; nephron is the functional unit',
          'Breathing: diaphragm contracts/flattens → lungs expand → air in',
          'Blood types: A, B, AB (universal recipient), O (universal donor)',
          'Nervous system: CNS (brain + spinal cord) + PNS (peripheral nerves)',
        ]
      },
      {
        title: 'Ecology & Classification',
        points: [
          'Food chain: producer → primary consumer → secondary → tertiary consumer',
          'Energy decreases by ~90% at each trophic level',
          'Ecosystem = biotic (living) + abiotic (non-living) components',
          'Five kingdoms: Monera, Protista, Fungi, Plantae, Animalia',
          'Photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂',
          'Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy (ATP)',
        ]
      },
    ]
  },

  'Government': {
    emoji: '🏛️',
    desc: 'Nigerian government, constitutions, international organisations',
    topics: [
      {
        title: 'Nigerian Political History',
        points: [
          'Independence: 1 October 1960; Republic: 1 October 1963',
          '1st Republic: 1963–1966 (Nnamdi Azikiwe as President)',
          'Military coups: 1966 (Aguiyi-Ironsi), 1975 (Murtala Muhammed), 1983 (Buhari), 1985 (Babangida)',
          '4th Republic: 29 May 1999 (Olusegun Obasanjo — democratic rule restored)',
          'Current constitution: 1999 Constitution (as amended)',
        ]
      },
      {
        title: 'Organs of Government',
        points: [
          'Legislature (National Assembly): Senate (109 senators) + House of Representatives (360 members) — makes laws',
          'Executive: President, Vice President, Federal Executive Council — implements laws',
          'Judiciary: Supreme Court, Court of Appeal, Federal High Court — interprets laws',
          'Separation of powers prevents abuse of authority',
          'Checks and balances: each arm can limit the others',
        ]
      },
      {
        title: 'Federalism & Democracy',
        points: [
          'Federalism: division of powers between federal and state governments',
          'Nigeria has 36 states + FCT (Abuja)',
          'Exclusive list: federal government only; Concurrent list: both; Residual: states only',
          'Democracy features: free elections, rule of law, fundamental rights, majority rule, minority rights',
          'Unitary system: all powers at central government (e.g. UK)',
          'Confederation: loose union of sovereign states (e.g. old EU before integration)',
        ]
      },
      {
        title: 'International Organisations',
        points: [
          'United Nations: founded 1945; headquarters New York; 193 member states',
          'ECOWAS: founded 1975 Lagos; promotes economic integration in West Africa',
          'African Union (AU): founded 2002; successor to OAU (est. 1963)',
          'Commonwealth of Nations: association of former British colonies',
          'NATO: North Atlantic Treaty Organisation — military alliance (1949)',
          'OPEC: Organisation of Petroleum Exporting Countries — controls oil output',
        ]
      },
    ]
  },

  'Economics': {
    emoji: '💹',
    desc: 'Microeconomics, macroeconomics and Nigerian economic issues',
    topics: [
      {
        title: 'Demand & Supply',
        points: [
          'Law of Demand: as price rises, quantity demanded falls (inverse relationship)',
          'Law of Supply: as price rises, quantity supplied rises (direct relationship)',
          'Equilibrium: price where quantity demanded = quantity supplied',
          'PED = % change in quantity demanded / % change in price',
          'Elastic demand (|PED| > 1): luxury goods; Inelastic (|PED| < 1): necessities',
          'Inferior goods: demand falls as income rises (Giffen goods are extreme)',
        ]
      },
      {
        title: 'National Income & GDP',
        points: [
          'GDP: total value of goods/services produced in a country in one year',
          'GDP approaches: expenditure (C+I+G+NX), income, output/production',
          'GNP = GDP + net factor income from abroad',
          'Per capita income = national income ÷ population',
          'Inflation: sustained rise in general price level (measured by CPI)',
          'Unemployment types: frictional, structural, cyclical, seasonal',
        ]
      },
      {
        title: 'Money & Banking',
        points: [
          'Functions of money: medium of exchange, store of value, unit of account, standard of deferred payment',
          'CBN (est. 1958): issues naira, controls monetary policy, regulates banks',
          'Commercial banks: accept deposits, give loans, transfer funds',
          'Monetary policy tools: interest rate, reserve requirements, open market operations',
          'Budget deficit: expenditure > revenue; surplus: revenue > expenditure',
          'Fiscal policy: government use of taxation and spending to influence the economy',
        ]
      },
      {
        title: 'Nigerian Economy',
        points: [
          'Nigeria is Africa\'s largest economy by GDP',
          'Oil sector accounts for ~90% of export earnings',
          'Agricultural sector: cocoa (SW), groundnuts (N), palm oil (SE/SS), rubber',
          'OPEC member since 1971',
          'Economic problems: inflation, unemployment, corruption, balance of payments deficit',
          'Privatisation: selling government enterprises to private owners (begun in 1980s)',
        ]
      },
    ]
  },

  'Literature in English': {
    emoji: '📖',
    desc: 'Poetry, prose, drama and African literature',
    topics: [
      {
        title: 'Literary Genres',
        points: [
          'Poetry: condensed, rhythmic language; uses metre, rhyme, imagery',
          'Prose: ordinary language; includes novels, short stories, essays',
          'Drama: written to be performed; includes dialogue, stage directions',
          'Tragedy: ends in death/disaster of the protagonist (hamartia = fatal flaw)',
          'Comedy: light-hearted, often ends in marriage or resolution',
          'Epic: long narrative poem about heroic deeds (e.g. Iliad, Odyssey)',
        ]
      },
      {
        title: 'Narrative Elements',
        points: [
          'Plot structure: exposition → rising action → climax → falling action → denouement',
          'Protagonist = main character; Antagonist = opposing character',
          'First-person narrator ("I") — limited perspective',
          'Third-person omniscient — narrator knows everything',
          'Theme: central message; Motif: recurring symbol or idea',
          'Conflict types: man vs man, man vs nature, man vs society, man vs self',
        ]
      },
      {
        title: 'Poetic Devices',
        points: [
          'Alliteration: same consonant sound at start of adjacent words',
          'Assonance: repetition of vowel sounds within words',
          'Onomatopoeia: words that sound like their meaning (buzz, crack, hiss)',
          'Enjambment: sentence continues beyond the end of a line',
          'Sonnet: 14 lines; Shakespearean (3 quatrains + couplet); Petrarchan (octave + sestet)',
          'Elegy: poem of mourning; Ode: poem of praise or celebration',
        ]
      },
      {
        title: 'African & Nigerian Literature',
        points: [
          'Chinua Achebe: Things Fall Apart (1958), Arrow of God, No Longer at Ease',
          'Wole Soyinka: first African Nobel laureate (1986) — Death and the King\'s Horseman, The Lion and the Jewel',
          'J.P. Clark: Song of a Goat, The Raft',
          'Cyprian Ekwensi: Jagua Nana, People of the City',
          'Gabriel Okara: The Voice, The Fisherman\'s Invocation',
          'Ngugi wa Thiong\'o (Kenya): Weep Not, Child, A Grain of Wheat',
        ]
      },
    ]
  },

  'Geography': {
    emoji: '🌍',
    desc: 'Physical geography, map reading, Nigeria and the world',
    topics: [
      {
        title: 'Map Reading & Cartography',
        points: [
          'Contour lines: connect points of equal altitude; closer lines = steeper slope',
          'Scale: ratio of map distance to actual distance (e.g. 1:50,000)',
          'Grid reference: use eastings (across) then northings (up) — "along the corridor, up the stairs"',
          'Relief: the shape and height of the land surface',
          'Spot height: exact elevation of a specific point on a map',
        ]
      },
      {
        title: 'Nigerian Geography',
        points: [
          'Location: 4°N–14°N latitude; 3°E–15°E longitude',
          'Climatic zones: equatorial/rainforest (south) → savanna → sahel (north)',
          'Harmattan: dry, dusty wind from Sahara Desert (Nov–March)',
          'Major rivers: Niger, Benue (converge at Lokoja), Cross River',
          'Geopolitical zones: North-West, North-East, North-Central, South-West, South-East, South-South',
          'Population: most populous country in Africa (~220 million)',
        ]
      },
      {
        title: 'Physical Geography',
        points: [
          'Rock types: igneous (volcanic), sedimentary (layered, fossils), metamorphic (changed by heat/pressure)',
          'River stages: upper (V-shaped valley, waterfalls) → middle (meanders) → lower (floodplain, delta)',
          'Erosion by wind: deflation (lifting particles), abrasion (sandblasting)',
          'Earthquake focus: hypocentre (underground); epicentre (surface above)',
          'Greenhouse gases: CO₂, methane, water vapour — trap heat, cause global warming',
          'Desertification: expansion of desert due to overgrazing, deforestation, drought',
        ]
      },
      {
        title: 'Economic Geography',
        points: [
          'Renewable energy: solar, wind, hydro, geothermal',
          'Non-renewable: coal, oil, natural gas, nuclear',
          'Subsistence farming: for own use; Commercial farming: for profit',
          'Push factors (migration): poverty, drought, conflict; Pull factors: jobs, education',
          'Urbanisation: movement from rural to urban areas; Lagos is Nigeria\'s largest city',
          'Population density = population ÷ area',
        ]
      },
    ]
  },

  'Commerce': {
    emoji: '🏪',
    desc: 'Trade, banking, insurance and business organisations',
    topics: [
      {
        title: 'Trade & Distribution',
        points: [
          'Home trade: buying/selling within a country; Foreign trade: between countries',
          'Channels of distribution: Producer → Wholesaler → Retailer → Consumer',
          'Wholesaler: buys in bulk, sells to retailers; provides warehousing, credit',
          'Retailer: sells to final consumers in small quantities',
          'Export: selling goods abroad; Import: buying goods from abroad',
          'Balance of trade: difference between exports and imports',
        ]
      },
      {
        title: 'Trade Documents',
        points: [
          'Invoice: list of goods supplied and prices charged',
          'Pro forma invoice: sent before goods are dispatched (quotation)',
          'Debit note: buyer owes more; Credit note: buyer owes less',
          'Statement of account: summary of transactions over a period',
          'Bill of lading: receipt for goods shipped by sea',
          'Waybill: document for road/rail transport of goods',
        ]
      },
      {
        title: 'Banking & Finance',
        points: [
          'Current account: for frequent transactions, no interest paid',
          'Savings account: earns interest, limited withdrawals',
          'Cheque: written order to bank to pay a specified sum',
          'Crossed cheque: must be paid into a bank account (two parallel lines)',
          'Letter of credit: bank guarantees payment to exporter',
          'Capital market: for long-term securities (shares, bonds); Money market: short-term',
        ]
      },
      {
        title: 'Insurance & Business Organisations',
        points: [
          'Life assurance: covers death/survival; General insurance: covers property, vehicles',
          'Marine insurance: covers ships and cargo; Fire insurance: covers fire damage',
          'Sole proprietorship: owned by one person; unlimited liability',
          'Partnership: 2–20 partners; governed by Partnership Deed',
          'Limited liability company: shareholders; liability limited to shares held',
          'Cooperative society: owned and run by members for mutual benefit',
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

  // Determine initial subject from URL or default
  const urlSubject = getQueryParam('subject');
  const subjectList = Object.keys(NOTES_DATA);
  const initialSubject = subjectList.includes(urlSubject) ? urlSubject : subjectList[0];

  subjectList.forEach(subjectName => {
    const data = NOTES_DATA[subjectName];
    const id   = 'notes-' + subjectName.replace(/\s+/g, '-').toLowerCase();

    // Tab
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'notes-tab' + (subjectName === initialSubject ? ' active' : '');
    tab.textContent = data.emoji + ' ' + subjectName;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', id);
    tab.setAttribute('aria-selected', subjectName === initialSubject);
    tab.addEventListener('click', () => {
      document.querySelectorAll('.notes-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.notes-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(id).classList.add('active');
      // Scroll panel into view smoothly on mobile
      document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    tabsEl.appendChild(tab);

    // Panel
    const panel = document.createElement('div');
    panel.id = id;
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
          <button class="btn btn-outline btn-sm" onclick="downloadNotesPDF(${JSON.stringify(subjectName)}, NOTES_DATA[${JSON.stringify(subjectName)}].topics)" title="Download cheat-sheet PDF (Premium)">📄 Download PDF</button>
        </div>
      </div>
    `;

    panelsEl.appendChild(panel);
  });
})();
