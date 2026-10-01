const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'images', 'hardware');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function makeSvg(content) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="darkChassis" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="50%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="blueChassis" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="50%" stop-color="#1D4ED8"/>
      <stop offset="100%" stop-color="#172554"/>
    </linearGradient>
    <linearGradient id="metalBezel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="50%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
    <linearGradient id="lensGlass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#0284C7" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>
  ${content}
</svg>`;
}

// 1. Standard GPS Tracker generator
function generateTrackerSvg(name, subtitle = 'GPS TRACKER', ledColor = '#10B981', badge = null) {
  return makeSvg(`
  <!-- Drop Shadow Base -->
  <rect x="32" y="46" width="136" height="104" rx="16" fill="none" filter="url(#dropShadow)"/>
  
  <!-- Wire Harness Top -->
  <rect x="82" y="20" width="36" height="28" rx="4" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
  <!-- Colored Wires -->
  <line x1="88" y1="10" x2="88" y2="22" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="96" y1="6" x2="96" y2="22" stroke="#0F172A" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="104" y1="8" x2="104" y2="22" stroke="#EAB308" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="112" y1="10" x2="112" y2="22" stroke="#3B82F6" stroke-width="3.5" stroke-linecap="round"/>

  <!-- Main Chassis -->
  <rect x="30" y="44" width="140" height="108" rx="16" fill="url(#darkChassis)" stroke="#334155" stroke-width="1.5"/>
  <!-- Inner Recessed Panel -->
  <rect x="40" y="54" width="120" height="88" rx="10" fill="#090D16" stroke="#1E293B" stroke-width="1"/>

  <!-- Corner Screws -->
  <circle cx="48" cy="62" r="2.5" fill="#475569"/>
  <circle cx="152" cy="62" r="2.5" fill="#475569"/>
  <circle cx="48" cy="134" r="2.5" fill="#475569"/>
  <circle cx="152" cy="134" r="2.5" fill="#475569"/>

  <!-- Status LEDs -->
  <circle cx="60" cy="80" r="4" fill="${ledColor}" filter="url(#glowGreen)"/>
  <circle cx="75" cy="80" r="4" fill="#38BDF8" filter="url(#glowBlue)"/>
  <circle cx="90" cy="80" r="4" fill="#EF4444"/>
  <text x="60" y="92" fill="#64748B" font-size="6" font-family="sans-serif" font-weight="bold" text-anchor="middle">GPS</text>
  <text x="75" y="92" fill="#64748B" font-size="6" font-family="sans-serif" font-weight="bold" text-anchor="middle">GSM</text>
  <text x="90" y="92" fill="#64748B" font-size="6" font-family="sans-serif" font-weight="bold" text-anchor="middle">PWR</text>

  <!-- Product Label -->
  <text x="100" y="116" fill="#FFFFFF" font-size="14" font-family="sans-serif" font-weight="800" text-anchor="middle" letter-spacing="0.5">${name}</text>
  <text x="100" y="128" fill="#38BDF8" font-size="7.5" font-family="sans-serif" font-weight="700" text-anchor="middle" letter-spacing="1">${subtitle}</text>

  ${badge ? `
  <!-- Certification Badge -->
  <rect x="116" y="72" width="36" height="14" rx="3" fill="#1E3A8A" stroke="#3B82F6" stroke-width="1"/>
  <text x="134" y="82" fill="#FFFFFF" font-size="6.5" font-family="sans-serif" font-weight="bold" text-anchor="middle">${badge}</text>
  ` : ''}
  `);
}

// 2. MDVR Generator
function generateMdvrSvg(name, subtitle = 'AI 4-CH MDVR') {
  return makeSvg(`
  <!-- Drop Shadow Base -->
  <rect x="22" y="44" width="156" height="116" rx="12" fill="none" filter="url(#dropShadow)"/>

  <!-- Metal Chassis -->
  <rect x="20" y="42" width="160" height="118" rx="10" fill="url(#darkChassis)" stroke="#475569" stroke-width="2"/>
  
  <!-- Heat dissipation fins top -->
  <line x1="34" y1="52" x2="166" y2="52" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="34" y1="58" x2="166" y2="58" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>

  <!-- SD Card Cover Door with Keylock -->
  <rect x="34" y="70" width="62" height="44" rx="6" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
  <circle cx="48" cy="92" r="5" fill="#64748B" stroke="#334155" stroke-width="1.5"/>
  <line x1="48" y1="89" x2="48" y2="95" stroke="#0F172A" stroke-width="2"/>
  <text x="72" y="88" fill="#94A3B8" font-size="7" font-family="sans-serif" font-weight="bold">SD 1/2</text>
  <text x="72" y="98" fill="#64748B" font-size="6" font-family="sans-serif">LOCK</text>

  <!-- Front LED Indicators -->
  <rect x="110" y="70" width="56" height="44" rx="6" fill="#090D16" stroke="#1E293B" stroke-width="1"/>
  <circle cx="120" cy="80" r="3" fill="#10B981" filter="url(#glowGreen)"/>
  <circle cx="134" cy="80" r="3" fill="#EF4444"/>
  <circle cx="148" cy="80" r="3" fill="#38BDF8" filter="url(#glowBlue)"/>
  <text x="120" y="88" fill="#64748B" font-size="5" font-family="sans-serif" text-anchor="middle">PWR</text>
  <text x="134" y="88" fill="#64748B" font-size="5" font-family="sans-serif" text-anchor="middle">REC</text>
  <text x="148" y="88" fill="#64748B" font-size="5" font-family="sans-serif" text-anchor="middle">GPS</text>

  <!-- BNC Port Accents -->
  <circle cx="120" cy="102" r="4" fill="#334155" stroke="#94A3B8" stroke-width="1"/>
  <circle cx="134" cy="102" r="4" fill="#334155" stroke="#94A3B8" stroke-width="1"/>
  <circle cx="148" cy="102" r="4" fill="#334155" stroke="#94A3B8" stroke-width="1"/>

  <!-- Product Branding -->
  <text x="100" y="136" fill="#FFFFFF" font-size="13" font-family="sans-serif" font-weight="800" text-anchor="middle">${name}</text>
  <text x="100" y="147" fill="#006EFF" font-size="7.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" letter-spacing="0.8">${subtitle}</text>
  `);
}

// 3. Dash Camera Generator
function generateDashcamSvg(name, subtitle = 'AI 4G VEHICLE CAMERA') {
  return makeSvg(`
  <!-- Drop Shadow Base -->
  <circle cx="100" cy="100" r="60" fill="none" filter="url(#dropShadow)"/>

  <!-- Mount Bracket Top -->
  <polygon points="80,24 120,24 112,50 88,50" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
  <circle cx="100" cy="34" r="6" fill="#0F172A" stroke="#475569" stroke-width="1"/>

  <!-- Camera Body -->
  <rect x="36" y="48" width="128" height="104" rx="18" fill="url(#darkChassis)" stroke="#334155" stroke-width="2"/>

  <!-- Camera Outer Lens Bezel -->
  <circle cx="100" cy="94" r="36" fill="#0F172A" stroke="url(#metalBezel)" stroke-width="3"/>
  <!-- Anti-reflective Lens Element -->
  <circle cx="100" cy="94" r="28" fill="url(#lensGlass)"/>
  <!-- Inner Aperture & Reflections -->
  <circle cx="100" cy="94" r="16" fill="#020617"/>
  <circle cx="94" cy="88" r="6" fill="#FFFFFF" opacity="0.4"/>
  <circle cx="106" cy="100" r="3" fill="#38BDF8" opacity="0.6"/>

  <!-- IR Night Vision Sensors Around Lens -->
  <circle cx="60" cy="74" r="2.5" fill="#475569"/>
  <circle cx="140" cy="74" r="2.5" fill="#475569"/>
  <circle cx="60" cy="114" r="2.5" fill="#475569"/>
  <circle cx="140" cy="114" r="2.5" fill="#475569"/>

  <!-- Status LED -->
  <circle cx="144" cy="60" r="3" fill="#10B981" filter="url(#glowGreen)"/>

  <!-- Product Name Bottom -->
  <text x="100" y="140" fill="#FFFFFF" font-size="11.5" font-family="sans-serif" font-weight="800" text-anchor="middle">${name}</text>
  `);
}

// 4. Fuel Sensor Generator
function generateFuelSensorSvg(name) {
  return makeSvg(`
  <!-- Drop Shadow -->
  <rect x="92" y="60" width="16" height="125" fill="none" filter="url(#dropShadow)"/>

  <!-- Stainless Steel Probe Rod -->
  <rect x="93" y="60" width="14" height="124" rx="3" fill="url(#metalBezel)" stroke="#64748B" stroke-width="1"/>
  
  <!-- Graduation marks on probe rod -->
  <line x1="93" y1="85" x2="101" y2="85" stroke="#94A3B8" stroke-width="1.5"/>
  <line x1="93" y1="105" x2="101" y2="105" stroke="#94A3B8" stroke-width="1.5"/>
  <line x1="93" y1="125" x2="101" y2="125" stroke="#94A3B8" stroke-width="1.5"/>
  <line x1="93" y1="145" x2="101" y2="145" stroke="#94A3B8" stroke-width="1.5"/>
  <line x1="93" y1="165" x2="101" y2="165" stroke="#94A3B8" stroke-width="1.5"/>

  <!-- Probe Bottom Filter Cap -->
  <rect x="90" y="180" width="20" height="8" rx="2" fill="#334155" stroke="#64748B" stroke-width="1"/>

  <!-- Circular Aluminum Mounting Flange Head -->
  <ellipse cx="100" cy="52" rx="58" ry="22" fill="url(#metalBezel)" stroke="#94A3B8" stroke-width="2"/>
  <ellipse cx="100" cy="50" rx="54" ry="19" fill="#0F172A"/>

  <!-- Flange Screws -->
  <circle cx="56" cy="50" r="3" fill="#94A3B8" stroke="#334155" stroke-width="1"/>
  <circle cx="144" cy="50" r="3" fill="#94A3B8" stroke="#334155" stroke-width="1"/>
  <circle cx="80" cy="62" r="3" fill="#94A3B8" stroke="#334155" stroke-width="1"/>
  <circle cx="120" cy="62" r="3" fill="#94A3B8" stroke="#334155" stroke-width="1"/>
  <circle cx="100" cy="36" r="3" fill="#94A3B8" stroke="#334155" stroke-width="1"/>

  <!-- Transmitter Dome / Sensor Center -->
  <circle cx="100" cy="48" r="16" fill="#1E3A8A" stroke="#38BDF8" stroke-width="1.5"/>
  <!-- BLE Wireless Signal Icon -->
  <path d="M 96,44 Q 100,41 104,44 M 93,40 Q 100,36 107,40" fill="none" stroke="#38BDF8" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="100" cy="48" r="2.5" fill="#F59E0B"/>
  
  <!-- Waterproof cable outlet -->
  <rect x="136" y="38" width="24" height="10" rx="3" fill="#1E293B" stroke="#475569" stroke-width="1"/>
  <path d="M 160,43 Q 175,43 180,60" fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>

  <text x="100" y="22" fill="#0F172A" font-size="12" font-family="sans-serif" font-weight="800" text-anchor="middle">${name}</text>
  <text x="100" y="32" fill="#006EFF" font-size="7" font-family="sans-serif" font-weight="bold" text-anchor="middle">DIGITAL CAPACITIVE SENSOR</text>
  `);
}

// 5. Asset Lock / E-Lock Generator (GL500 / 7H E-Lock)
function generateAssetLockSvg(name, isBlue = true) {
  const chassisFill = isBlue ? 'url(#blueChassis)' : 'url(#darkChassis)';
  const borderStroke = isBlue ? '#3B82F6' : '#EAB308';
  return makeSvg(`
  <!-- Drop Shadow -->
  <rect x="36" y="56" width="128" height="108" rx="16" fill="none" filter="url(#dropShadow)"/>

  <!-- Twin External Antennas -->
  <line x1="54" y1="20" x2="54" y2="58" stroke="#0F172A" stroke-width="5" stroke-linecap="round"/>
  <circle cx="54" cy="18" r="3.5" fill="#334155"/>
  <line x1="146" y1="20" x2="146" y2="58" stroke="#0F172A" stroke-width="5" stroke-linecap="round"/>
  <circle cx="146" cy="18" r="3.5" fill="#334155"/>

  <!-- Main Heavy Duty Enclosure -->
  <rect x="34" y="54" width="132" height="110" rx="16" fill="${chassisFill}" stroke="${borderStroke}" stroke-width="2"/>

  <!-- Corner Bumpers -->
  <rect x="30" y="50" width="16" height="16" rx="4" fill="#0F172A"/>
  <rect x="154" y="50" width="16" height="16" rx="4" fill="#0F172A"/>
  <rect x="30" y="152" width="16" height="16" rx="4" fill="#0F172A"/>
  <rect x="154" y="152" width="16" height="16" rx="4" fill="#0F172A"/>

  <!-- Center RFID / Status Area -->
  <rect x="54" y="72" width="92" height="52" rx="8" fill="#090D16" stroke="#334155" stroke-width="1.5"/>
  <circle cx="72" cy="98" r="12" fill="none" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="3,2"/>
  <circle cx="72" cy="98" r="4" fill="#38BDF8"/>
  <circle cx="124" cy="90" r="3.5" fill="#10B981" filter="url(#glowGreen)"/>
  <circle cx="124" cy="104" r="3.5" fill="#38BDF8" filter="url(#glowBlue)"/>
  <text x="108" y="92" fill="#64748B" font-size="6" font-family="sans-serif">LOCK</text>
  <text x="108" y="106" fill="#64748B" font-size="6" font-family="sans-serif">GPS</text>

  <!-- Name Label -->
  <text x="100" y="146" fill="#FFFFFF" font-size="14" font-family="sans-serif" font-weight="800" text-anchor="middle">${name}</text>
  <text x="100" y="156" fill="#93C5FD" font-size="7.5" font-family="sans-serif" font-weight="bold" text-anchor="middle">ASSET SMART LOCK</text>
  `);
}

// 6. AIS-140 Certified Unit Generator (PRITHVI 140 Series)
function generateAis140Svg(name, edition = 'AIS-140 CERTIFIED') {
  return makeSvg(`
  <!-- Drop Shadow -->
  <rect x="32" y="46" width="136" height="112" rx="14" fill="none" filter="url(#dropShadow)"/>

  <!-- Top Wire Connectors with SOS Alert Port -->
  <rect x="70" y="24" width="60" height="24" rx="4" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
  <circle cx="84" cy="18" r="5" fill="#DC2626" stroke="#EF4444" stroke-width="1"/>
  <text x="84" y="20" fill="#FFF" font-size="4.5" font-family="sans-serif" font-weight="bold" text-anchor="middle">SOS</text>
  <line x1="100" y1="10" x2="100" y2="24" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>
  <line x1="112" y1="8" x2="112" y2="24" stroke="#3B82F6" stroke-width="3" stroke-linecap="round"/>

  <!-- Main AIS-140 Chassis -->
  <rect x="30" y="44" width="140" height="116" rx="14" fill="url(#darkChassis)" stroke="#475569" stroke-width="2"/>
  
  <!-- Metallic Mounting Ears on Sides -->
  <path d="M 18,80 L 30,72 L 30,132 L 18,124 Z" fill="url(#metalBezel)"/>
  <circle cx="24" cy="102" r="3.5" fill="#0F172A" stroke="#94A3B8" stroke-width="1"/>
  <path d="M 182,80 L 170,72 L 170,132 L 182,124 Z" fill="url(#metalBezel)"/>
  <circle cx="176" cy="102" r="3.5" fill="#0F172A" stroke="#94A3B8" stroke-width="1"/>

  <!-- Inner Recessed Face -->
  <rect x="42" y="56" width="116" height="92" rx="8" fill="#090D16" stroke="#1E293B" stroke-width="1"/>

  <!-- Gold/Yellow AIS-140 Badge -->
  <rect x="52" y="66" width="46" height="15" rx="3" fill="#78350F" stroke="#F59E0B" stroke-width="1"/>
  <text x="75" y="77" fill="#FEF3C7" font-size="7.5" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="0.5">AIS-140</text>

  <!-- 4 Telematics Indicators -->
  <circle cx="116" cy="74" r="3" fill="#10B981" filter="url(#glowGreen)"/>
  <circle cx="128" cy="74" r="3" fill="#38BDF8" filter="url(#glowBlue)"/>
  <circle cx="140" cy="74" r="3" fill="#F59E0B"/>
  <text x="116" y="82" fill="#64748B" font-size="4.5" font-family="sans-serif" text-anchor="middle">GPS</text>
  <text x="128" y="82" fill="#64748B" font-size="4.5" font-family="sans-serif" text-anchor="middle">IRNSS</text>
  <text x="140" y="82" fill="#64748B" font-size="4.5" font-family="sans-serif" text-anchor="middle">GSM</text>

  <!-- Dual SIM Seal Slot -->
  <rect x="52" y="92" width="96" height="12" rx="3" fill="#1E293B" stroke="#334155" stroke-width="1"/>
  <text x="100" y="100.5" fill="#94A3B8" font-size="6" font-family="sans-serif" text-anchor="middle">DUAL e-SIM SECURE ENCLOSURE</text>

  <!-- Product Name -->
  <text x="100" y="126" fill="#FFFFFF" font-size="12" font-family="sans-serif" font-weight="800" text-anchor="middle">${name}</text>
  <text x="100" y="137" fill="#F59E0B" font-size="7" font-family="sans-serif" font-weight="bold" text-anchor="middle" letter-spacing="0.6">${edition}</text>
  `);
}

// Map files
const files = {
  'br06.svg': generateTrackerSvg('BR06', 'COMPACT GPS TRACKER', '#10B981', 'BESTSELLER'),
  't5324-mdvr.svg': generateMdvrSvg('T5324 MDVR', '4-CH SD CARD RECORDER'),
  'sp-ble4-fuel.svg': generateFuelSensorSvg('SP BLE-4'),
  'eh15.svg': generateDashcamSvg('EH15 ADAS', 'AI VIDEO TELEMATICS'),
  'v5-mini.svg': generateTrackerSvg('V5 MINI', 'PLUG & PLAY TRACKER', '#38BDF8'),
  'br05-4g.svg': generateTrackerSvg('BR05 4G', '4G LTE FLEET TRACKER', '#10B981', '4G LTE'),
  'gl500-2g.svg': generateAssetLockSvg('GL500 2G', true),
  '7h-elock.svg': generateAssetLockSvg('7H E-LOCK', false),
  'eco5-lite.svg': generateTrackerSvg('Eco5 Lite', 'ECONOMIC GPS TRACKER', '#10B981', "SETU'S PICK"),
  'gb440.svg': generateAis140Svg('GB440', 'AIS-140 4G COMPLIANT'),
  'v5-4g.svg': generateTrackerSvg('V5 4G', 'COMMERCIAL 4G GPS', '#38BDF8', 'HEAVY FLEET'),
  'prithvi-140-rto.svg': generateAis140Svg('PRITHVI 140', 'RAJASTHAN RTO APPROVED'),
  'gl500-4g.svg': generateAssetLockSvg('GL500 4G', true),
  'falcon-f1.svg': generateDashcamSvg('Falcon F1', 'AI 4G VEHICLE CAMERA'),
  'titan-t4.svg': generateDashcamSvg('Titan T4', 'CAT-4 AI DASH CAMERA'),
  'sentinel-s3.svg': generateDashcamSvg('Sentinel S3', 'AI 4G DASH CAM'),
  'vector-v2-pro.svg': generateDashcamSvg('Vector V2 Pro', 'DUAL CHANNEL 4G CAM'),
  'vector-v2-ai.svg': generateDashcamSvg('Vector V2 AI', 'AI VISION TELEMATICS'),
  'sentinel-s4.svg': generateMdvrSvg('Sentinel S4', 'PROFESSIONAL 4-CH MDVR'),
  'ecogas-track.svg': generateTrackerSvg('Ecogas Track', 'GAS & TELEMATICS MONITOR', '#10B981', 'ARAI CERTIFIED'),
  'prithvi-140-mining.svg': generateAis140Svg('PRITHVI 140', 'RAJASTHAN MINING EDITION'),
  'prithvi-140-oem.svg': generateAis140Svg('PRITHVI 140', 'OEM AUTOMOTIVE EDITION'),
  'prithvi-140.svg': generateAis140Svg('PRITHVI 140', 'AIS-140 CERTIFIED UNIT')
};

for (const [filename, svgContent] of Object.entries(files)) {
  fs.writeFileSync(path.join(outDir, filename), svgContent);
}

console.log('Successfully generated', Object.keys(files).length, 'hardware SVG images in', outDir);
