const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/autoparts');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const svgs = {
  'brake-pads.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="metalPlate" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#475569"/>
        <stop offset="50%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
      <linearGradient id="frictionPad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#64748B"/>
        <stop offset="50%" stop-color="#334155"/>
        <stop offset="100%" stop-color="#1E293B"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <!-- Backing Plate 1 -->
    <path d="M 30,50 C 40,25 160,25 170,50 L 175,70 C 175,85 165,95 155,95 L 45,95 C 35,95 25,85 25,70 Z" fill="url(#metalPlate)" filter="url(#shadow)" stroke="#64748B" stroke-width="1.5"/>
    <path d="M 45,45 C 55,35 145,35 155,45 L 152,85 C 150,90 145,90 140,90 L 60,90 C 55,90 50,90 48,85 Z" fill="url(#frictionPad)" stroke="#475569" stroke-width="1"/>
    <rect x="98" y="42" width="4" height="42" rx="2" fill="#0F172A"/>
    <circle cx="70" cy="65" r="4" fill="#0F172A" stroke="#475569" stroke-width="1"/>
    <circle cx="130" cy="65" r="4" fill="#0F172A" stroke="#475569" stroke-width="1"/>
    
    <!-- Secondary Pad in front -->
    <path d="M 40,80 C 50,60 150,60 160,80 L 165,100 C 165,115 155,125 145,125 L 55,125 C 45,125 35,115 35,100 Z" fill="url(#metalPlate)" filter="url(#shadow)" stroke="#94A3B8" stroke-width="1.5"/>
    <path d="M 55,75 C 65,68 135,68 145,75 L 142,115 C 140,120 135,120 130,120 L 70,120 C 65,120 60,120 58,115 Z" fill="url(#frictionPad)" stroke="#64748B" stroke-width="1"/>
    <rect x="98" y="72" width="4" height="42" rx="2" fill="#0F172A"/>
    <circle cx="80" cy="95" r="4" fill="#0F172A" stroke="#64748B" stroke-width="1"/>
    <circle cx="120" cy="95" r="4" fill="#0F172A" stroke="#64748B" stroke-width="1"/>
    <path d="M 33,90 L 25,85 L 23,105 L 35,103" fill="none" stroke="#E2E8F0" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  'brake-pads-bosch.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="boschBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2563EB"/>
        <stop offset="60%" stop-color="#1D4ED8"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
      <linearGradient id="ceramicFriction" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#94A3B8"/>
        <stop offset="50%" stop-color="#64748B"/>
        <stop offset="100%" stop-color="#475569"/>
      </linearGradient>
      <filter id="bpadShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <!-- Bosch Blue Backing Plate -->
    <path d="M 30,50 C 40,25 160,25 170,50 L 175,70 C 175,85 165,95 155,95 L 45,95 C 35,95 25,85 25,70 Z" fill="url(#boschBlue)" filter="url(#bpadShadow)" stroke="#60A5FA" stroke-width="1.5"/>
    <path d="M 45,45 C 55,35 145,35 155,45 L 152,85 C 150,90 145,90 140,90 L 60,90 C 55,90 50,90 48,85 Z" fill="url(#ceramicFriction)" stroke="#475569" stroke-width="1"/>
    <text x="100" y="68" font-size="9" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#FFFFFF" opacity="0.9">BOSCH</text>
    
    <!-- Front Pad with Rubber Core Shim -->
    <path d="M 40,80 C 50,60 150,60 160,80 L 165,100 C 165,115 155,125 145,125 L 55,125 C 45,125 35,115 35,100 Z" fill="url(#boschBlue)" filter="url(#bpadShadow)" stroke="#60A5FA" stroke-width="1.5"/>
    <path d="M 55,75 C 65,68 135,68 145,75 L 142,115 C 140,120 135,120 130,120 L 70,120 C 65,120 60,120 58,115 Z" fill="url(#ceramicFriction)" stroke="#64748B" stroke-width="1"/>
    <rect x="98" y="74" width="4" height="40" rx="2" fill="#0F172A"/>
    <text x="100" y="100" font-size="9" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#FFFFFF" opacity="0.95">BOSCH</text>
  </svg>`,

  'brake-disc.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="discSteel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F1F5F9"/>
        <stop offset="35%" stop-color="#CBD5E1"/>
        <stop offset="70%" stop-color="#94A3B8"/>
        <stop offset="100%" stop-color="#64748B"/>
      </linearGradient>
      <radialGradient id="hubCenter" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="60%" stop-color="#334155"/>
        <stop offset="100%" stop-color="#475569"/>
      </radialGradient>
      <filter id="discGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.18"/>
      </filter>
    </defs>
    <!-- Outer Rotor Track -->
    <ellipse cx="100" cy="80" rx="72" ry="58" fill="url(#discSteel)" filter="url(#discGlow)" stroke="#94A3B8" stroke-width="2"/>
    <ellipse cx="100" cy="80" rx="66" ry="52" fill="none" stroke="#F8FAFC" stroke-width="1" opacity="0.7"/>
    <!-- Center Hub -->
    <ellipse cx="100" cy="80" rx="46" ry="36" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2"/>
    <ellipse cx="100" cy="80" rx="34" ry="26" fill="url(#hubCenter)" stroke="#1E293B" stroke-width="2"/>
    <ellipse cx="100" cy="80" rx="14" ry="11" fill="#0F172A"/>
    <!-- 4 Stud Holes -->
    <circle cx="82" cy="74" r="3.5" fill="#0F172A" stroke="#94A3B8" stroke-width="1"/>
    <circle cx="118" cy="74" r="3.5" fill="#0F172A" stroke="#94A3B8" stroke-width="1"/>
    <circle cx="82" cy="86" r="3.5" fill="#0F172A" stroke="#94A3B8" stroke-width="1"/>
    <circle cx="118" cy="86" r="3.5" fill="#0F172A" stroke="#94A3B8" stroke-width="1"/>
    <!-- Vane lines -->
    <line x1="28" y1="80" x2="33" y2="80" stroke="#475569" stroke-width="2"/>
    <line x1="167" y1="80" x2="172" y2="80" stroke="#475569" stroke-width="2"/>
  </svg>`,

  'brake-shoes.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="shoeSteel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#94A3B8"/>
        <stop offset="60%" stop-color="#475569"/>
        <stop offset="100%" stop-color="#334155"/>
      </linearGradient>
      <filter id="shoeShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.18"/>
      </filter>
    </defs>
    <!-- Left Crescent Shoe -->
    <path d="M 60,35 C 32,55 32,105 60,125 L 72,120 C 48,100 48,60 72,40 Z" fill="url(#shoeSteel)" filter="url(#shoeShadow)" stroke="#64748B" stroke-width="1.5"/>
    <path d="M 52,38 C 26,60 26,100 52,122" fill="none" stroke="#D97706" stroke-width="5" stroke-linecap="round"/>
    <!-- Right Crescent Shoe -->
    <path d="M 140,35 C 168,55 168,105 140,125 L 128,120 C 152,100 152,60 128,40 Z" fill="url(#shoeSteel)" filter="url(#shoeShadow)" stroke="#64748B" stroke-width="1.5"/>
    <path d="M 148,38 C 174,60 174,100 148,122" fill="none" stroke="#D97706" stroke-width="5" stroke-linecap="round"/>
    <!-- Return Spring -->
    <path d="M 68,48 C 80,42 90,52 100,48 C 110,42 120,52 132,48" fill="none" stroke="#EF4444" stroke-width="2.5"/>
    <!-- Pivot Pin Bottom -->
    <circle cx="100" cy="122" r="5" fill="#1E293B" stroke="#94A3B8" stroke-width="1.5"/>
  </svg>`,

  'brake-fluid.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="bottleBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#F1F5F9"/>
        <stop offset="30%" stop-color="#FFFFFF"/>
        <stop offset="70%" stop-color="#E2E8F0"/>
        <stop offset="100%" stop-color="#CBD5E1"/>
      </linearGradient>
      <linearGradient id="capGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#F59E0B"/>
        <stop offset="50%" stop-color="#FBBF24"/>
        <stop offset="100%" stop-color="#D97706"/>
      </linearGradient>
      <filter id="bottleShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000" flood-opacity="0.15"/>
      </filter>
    </defs>
    <rect x="88" y="16" width="24" height="14" rx="2" fill="url(#capGold)" stroke="#B45309" stroke-width="1"/>
    <rect x="91" y="30" width="18" height="10" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
    <path d="M 91,40 C 75,44 65,55 65,70 L 65,135 C 65,142 70,146 78,146 L 122,146 C 130,146 135,142 135,135 L 135,70 C 135,55 125,44 109,40 Z" fill="url(#bottleBody)" filter="url(#bottleShadow)" stroke="#94A3B8" stroke-width="1.5"/>
    <rect x="71" y="65" width="58" height="60" rx="4" fill="#0284C7"/>
    <rect x="76" y="72" width="48" height="14" rx="2" fill="#FFFFFF"/>
    <text x="100" y="83" font-size="9" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#0369A1">DOT 4</text>
    <text x="100" y="98" font-size="6.5" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#BAE6FD">BRAKE FLUID</text>
    <text x="100" y="112" font-size="6" font-family="sans-serif" text-anchor="middle" fill="#FFFFFF">500 ml · HIGH TEMP</text>
    <rect x="127" y="70" width="3" height="50" rx="1.5" fill="#F59E0B" opacity="0.8"/>
  </svg>`,

  'oil-filter.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="filterCan" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1E3A8A"/>
        <stop offset="35%" stop-color="#2563EB"/>
        <stop offset="70%" stop-color="#1D4ED8"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
      <filter id="canShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="0.25"/>
      </filter>
    </defs>
    <rect x="65" y="42" width="70" height="85" rx="6" fill="url(#filterCan)" filter="url(#canShadow)" stroke="#1E40AF" stroke-width="1.5"/>
    <ellipse cx="100" cy="127" rx="35" ry="12" fill="#1E3A8A" stroke="#1E40AF" stroke-width="1"/>
    <ellipse cx="100" cy="42" rx="35" ry="12" fill="#334155" stroke="#64748B" stroke-width="1.5"/>
    <ellipse cx="100" cy="42" rx="32" ry="10.5" fill="none" stroke="#EF4444" stroke-width="3"/>
    <ellipse cx="100" cy="42" rx="10" ry="4" fill="#64748B" stroke="#94A3B8" stroke-width="1.5"/>
    <circle cx="82" cy="42" r="2.5" fill="#0F172A"/>
    <circle cx="118" cy="42" r="2.5" fill="#0F172A"/>
    <rect x="73" y="66" width="54" height="34" rx="3" fill="#FFFFFF" opacity="0.95"/>
    <text x="100" y="80" font-size="8" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#0F172A">OIL FILTER</text>
    <text x="100" y="92" font-size="6.5" font-family="sans-serif" text-anchor="middle" fill="#2563EB">OEM SPEC 16510</text>
  </svg>`,

  'air-filter.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="polyOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F97316"/>
        <stop offset="70%" stop-color="#EA580C"/>
        <stop offset="100%" stop-color="#C2410C"/>
      </linearGradient>
      <linearGradient id="pleatPaper" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FEF08A"/>
        <stop offset="100%" stop-color="#FACC15"/>
      </linearGradient>
      <filter id="airFilterShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <rect x="40" y="35" width="120" height="90" rx="12" fill="url(#polyOrange)" filter="url(#airFilterShadow)" stroke="#9A3412" stroke-width="2"/>
    <rect x="52" y="47" width="96" height="66" rx="4" fill="url(#pleatPaper)" stroke="#CA8A04" stroke-width="1"/>
    <path d="M 56,47 L 56,113 M 62,47 L 62,113 M 68,47 L 68,113 M 74,47 L 74,113 M 80,47 L 80,113 M 86,47 L 86,113 M 92,47 L 92,113 M 98,47 L 98,113 M 104,47 L 104,113 M 110,47 L 110,113 M 116,47 L 116,113 M 122,47 L 122,113 M 128,47 L 128,113 M 134,47 L 134,113 M 140,47 L 140,113 M 144,47 L 144,113" stroke="#A16207" stroke-width="1.8"/>
    <line x1="52" y1="80" x2="148" y2="80" stroke="#F97316" stroke-width="3" opacity="0.85"/>
  </svg>`,

  'cabin-filter.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <filter id="cabinShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.15"/>
      </filter>
    </defs>
    <rect x="42" y="38" width="116" height="84" rx="4" fill="#FFFFFF" filter="url(#cabinShadow)" stroke="#CBD5E1" stroke-width="2"/>
    <g stroke="#64748B" stroke-width="2">
      <line x1="50" y1="42" x2="50" y2="118"/>
      <line x1="56" y1="42" x2="56" y2="118"/>
      <line x1="62" y1="42" x2="62" y2="118"/>
      <line x1="68" y1="42" x2="68" y2="118"/>
      <line x1="74" y1="42" x2="74" y2="118"/>
      <line x1="80" y1="42" x2="80" y2="118"/>
      <line x1="86" y1="42" x2="86" y2="118"/>
      <line x1="92" y1="42" x2="92" y2="118"/>
      <line x1="98" y1="42" x2="98" y2="118"/>
      <line x1="104" y1="42" x2="104" y2="118"/>
      <line x1="110" y1="42" x2="110" y2="118"/>
      <line x1="116" y1="42" x2="116" y2="118"/>
      <line x1="122" y1="42" x2="122" y2="118"/>
      <line x1="128" y1="42" x2="128" y2="118"/>
      <line x1="134" y1="42" x2="134" y2="118"/>
      <line x1="140" y1="42" x2="140" y2="118"/>
      <line x1="146" y1="42" x2="146" y2="118"/>
    </g>
    <path d="M 45,72 L 45,86 M 45,86 L 43,82 M 45,86 L 47,82" stroke="#006EFF" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,

  'fuel-filter.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="fuelCan" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#94A3B8"/>
        <stop offset="50%" stop-color="#F8FAFC"/>
        <stop offset="100%" stop-color="#64748B"/>
      </linearGradient>
      <filter id="fuelShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.18"/>
      </filter>
    </defs>
    <!-- Inlet Pipe -->
    <rect x="35" y="75" width="25" height="10" rx="2" fill="#64748B" stroke="#334155" stroke-width="1"/>
    <!-- Outlet Pipe -->
    <rect x="140" y="75" width="25" height="10" rx="2" fill="#64748B" stroke="#334155" stroke-width="1"/>
    <!-- Filter Canister Body -->
    <rect x="58" y="48" width="84" height="64" rx="14" fill="url(#fuelCan)" filter="url(#fuelShadow)" stroke="#475569" stroke-width="1.5"/>
    <rect x="68" y="60" width="64" height="40" rx="4" fill="#0F172A"/>
    <text x="100" y="78" font-size="8" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#FFFFFF">FUEL FILTER</text>
    <text x="100" y="90" font-size="6" font-family="sans-serif" text-anchor="middle" fill="#38BDF8">HIGH PRESSURE MPI</text>
  </svg>`,

  'spark-plug.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="ceramicGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="60%" stop-color="#F1F5F9"/>
        <stop offset="100%" stop-color="#CBD5E1"/>
      </linearGradient>
      <linearGradient id="metalHex" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#94A3B8"/>
        <stop offset="50%" stop-color="#E2E8F0"/>
        <stop offset="100%" stop-color="#475569"/>
      </linearGradient>
      <filter id="sparkShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <g transform="rotate(45 100 80)" filter="url(#sparkShadow)">
      <rect x="96" y="20" width="8" height="12" rx="2" fill="url(#metalHex)" stroke="#334155" stroke-width="0.8"/>
      <rect x="95" y="32" width="10" height="36" rx="3" fill="url(#ceramicGrad)" stroke="#94A3B8" stroke-width="0.8"/>
      <line x1="93" y1="40" x2="107" y2="40" stroke="#CBD5E1" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="93" y1="48" x2="107" y2="48" stroke="#CBD5E1" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="93" y1="56" x2="107" y2="56" stroke="#CBD5E1" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="90" y="68" width="20" height="16" rx="2" fill="url(#metalHex)" stroke="#334155" stroke-width="1"/>
      <rect x="93" y="84" width="14" height="28" fill="url(#metalHex)" stroke="#475569" stroke-width="1"/>
      <line x1="93" y1="89" x2="107" y2="89" stroke="#334155" stroke-width="1.5"/>
      <line x1="93" y1="94" x2="107" y2="94" stroke="#334155" stroke-width="1.5"/>
      <line x1="93" y1="99" x2="107" y2="99" stroke="#334155" stroke-width="1.5"/>
      <line x1="93" y1="104" x2="107" y2="104" stroke="#334155" stroke-width="1.5"/>
      <rect x="98.5" y="112" width="3" height="8" fill="#F59E0B"/>
      <path d="M 94,112 L 94,123 L 101,123" fill="none" stroke="#475569" stroke-width="2.5" stroke-linecap="square"/>
    </g>
  </svg>`,

  'engine-oil.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="jugSilver" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E2E8F0"/>
        <stop offset="35%" stop-color="#F8FAFC"/>
        <stop offset="70%" stop-color="#CBD5E1"/>
        <stop offset="100%" stop-color="#94A3B8"/>
      </linearGradient>
      <linearGradient id="oilGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#B45309"/>
      </linearGradient>
      <filter id="jugShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <rect x="74" y="22" width="22" height="12" rx="2" fill="#DC2626" stroke="#991B1B" stroke-width="1"/>
    <rect x="77" y="34" width="16" height="8" fill="#CBD5E1" stroke="#94A3B8" stroke-width="1"/>
    <path d="M 77,42 L 60,54 C 55,58 52,65 52,72 L 52,134 C 52,142 58,146 66,146 L 134,146 C 142,146 148,142 148,134 L 148,72 C 148,64 142,56 136,52 L 95,42 Z" fill="url(#jugSilver)" filter="url(#jugShadow)" stroke="#94A3B8" stroke-width="1.5"/>
    <rect x="115" y="65" width="16" height="55" rx="8" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5"/>
    <rect x="62" y="66" width="46" height="66" rx="4" fill="#0F172A"/>
    <rect x="62" y="66" width="46" height="12" fill="url(#oilGold)"/>
    <text x="85" y="75" font-size="6.5" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#FFFFFF">SYNTHETIC</text>
    <text x="85" y="96" font-size="11" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#F59E0B">5W-30</text>
    <text x="85" y="112" font-size="5.5" font-family="sans-serif" text-anchor="middle" fill="#94A3B8">API SP / GF-6</text>
    <text x="85" y="124" font-size="6" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#38BDF8">3.5 LITRES</text>
  </svg>`,

  'coolant.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="coolantBottle" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="50%" stop-color="#F1F5F9"/>
        <stop offset="100%" stop-color="#E2E8F0"/>
      </linearGradient>
      <filter id="coolShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.15"/>
      </filter>
    </defs>
    <rect x="86" y="20" width="28" height="14" rx="2" fill="#15803D" stroke="#14532D" stroke-width="1"/>
    <path d="M 88,34 C 70,40 60,50 60,65 L 60,136 C 60,144 66,148 75,148 L 125,148 C 134,148 140,144 140,136 L 140,65 C 140,50 130,40 112,34 Z" fill="url(#coolantBottle)" filter="url(#coolShadow)" stroke="#CBD5E1" stroke-width="1.5"/>
    <rect x="70" y="65" width="60" height="64" rx="4" fill="#E11D48"/>
    <text x="100" y="85" font-size="8.5" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#FFFFFF">LONG LIFE</text>
    <text x="100" y="98" font-size="10" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#FFE4E6">COOLANT</text>
    <text x="100" y="112" font-size="6" font-family="sans-serif" text-anchor="middle" fill="#FFFFFF">OAT -37°C / 3L</text>
  </svg>`,

  'headlight.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="lensReflect" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E0F2FE"/>
        <stop offset="40%" stop-color="#BAE6FD"/>
        <stop offset="80%" stop-color="#38BDF8"/>
        <stop offset="100%" stop-color="#0284C7"/>
      </linearGradient>
      <filter id="headlightShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <path d="M 35,95 C 40,55 80,40 165,45 C 160,85 140,115 105,120 C 70,125 40,115 35,95 Z" fill="#0F172A" filter="url(#headlightShadow)" stroke="#334155" stroke-width="2"/>
    <path d="M 42,92 C 46,60 82,46 158,52 C 153,84 135,110 102,114 C 72,118 46,110 42,92 Z" fill="url(#lensReflect)" opacity="0.85" stroke="#FFFFFF" stroke-width="1.5"/>
    <circle cx="85" cy="80" r="22" fill="#F8FAFC" stroke="#0284C7" stroke-width="2"/>
    <circle cx="85" cy="80" r="14" fill="#0284C7" stroke="#38BDF8" stroke-width="2"/>
    <circle cx="82" cy="77" r="4" fill="#FFFFFF"/>
    <path d="M 130,60 C 145,62 154,72 150,85 C 142,83 135,75 130,60 Z" fill="#F59E0B" stroke="#D97706" stroke-width="1"/>
  </svg>`,

  'tail-light.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="rubyLens" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FB7185"/>
        <stop offset="40%" stop-color="#E11D48"/>
        <stop offset="80%" stop-color="#BE123C"/>
        <stop offset="100%" stop-color="#881337"/>
      </linearGradient>
      <filter id="tailShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <path d="M 40,50 C 70,35 150,45 160,95 C 155,120 120,130 65,120 C 40,110 35,80 40,50 Z" fill="#1E293B" filter="url(#tailShadow)" stroke="#334155" stroke-width="2"/>
    <path d="M 46,55 C 72,42 144,52 153,92 C 148,114 118,124 70,115 C 48,106 42,80 46,55 Z" fill="url(#rubyLens)" stroke="#FDA4AF" stroke-width="1"/>
    <!-- Clear Reverse section -->
    <path d="M 85,75 C 95,70 125,74 130,90 C 125,98 100,102 85,96 Z" fill="#FFFFFF" opacity="0.85" stroke="#CBD5E1" stroke-width="1"/>
  </svg>`,

  'battery.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="batBlack" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#334155"/>
        <stop offset="40%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <linearGradient id="amaronGreen" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#16A34A"/>
        <stop offset="50%" stop-color="#22C55E"/>
        <stop offset="100%" stop-color="#15803D"/>
      </linearGradient>
      <filter id="batShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.25"/>
      </filter>
    </defs>
    <rect x="60" y="32" width="16" height="12" rx="2" fill="#DC2626" stroke="#991B1B" stroke-width="1"/>
    <rect x="124" y="32" width="16" height="12" rx="2" fill="#2563EB" stroke="#1D4ED8" stroke-width="1"/>
    <path d="M 50,55 C 50,25 150,25 150,55" fill="none" stroke="#22C55E" stroke-width="4.5" stroke-linecap="round"/>
    <rect x="42" y="44" width="116" height="96" rx="8" fill="url(#batBlack)" filter="url(#batShadow)" stroke="#475569" stroke-width="1.5"/>
    <rect x="42" y="44" width="116" height="22" rx="6" fill="url(#amaronGreen)" stroke="#15803D" stroke-width="1"/>
    <circle cx="68" cy="55" r="4" fill="#0F172A"/>
    <circle cx="84" cy="55" r="4" fill="#0F172A"/>
    <circle cx="100" cy="55" r="4" fill="#0F172A"/>
    <circle cx="116" cy="55" r="4" fill="#0F172A"/>
    <circle cx="132" cy="55" r="4" fill="#0F172A"/>
    <rect x="52" y="76" width="96" height="52" rx="4" fill="#1E293B" stroke="#334155" stroke-width="1"/>
    <text x="100" y="94" font-size="12" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#22C55E">PRO 35AH</text>
    <text x="100" y="108" font-size="7" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#E2E8F0">MAINTENANCE FREE</text>
    <text x="100" y="120" font-size="6" font-family="sans-serif" text-anchor="middle" fill="#94A3B8">60 MONTHS WARRANTY</text>
  </svg>`,

  'radiator.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="radAlum" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#CBD5E1"/>
        <stop offset="50%" stop-color="#E2E8F0"/>
        <stop offset="100%" stop-color="#94A3B8"/>
      </linearGradient>
      <filter id="radShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <!-- Top & Bottom Header Tanks -->
    <rect x="42" y="30" width="116" height="14" rx="4" fill="#1E293B" stroke="#0F172A" stroke-width="1.5"/>
    <rect x="42" y="122" width="116" height="14" rx="4" fill="#1E293B" stroke="#0F172A" stroke-width="1.5"/>
    <!-- Hose Nipple -->
    <rect x="52" y="20" width="14" height="12" rx="2" fill="#0F172A"/>
    <!-- Radiator Core Grid -->
    <rect x="46" y="44" width="108" height="78" fill="url(#radAlum)" filter="url(#radShadow)" stroke="#64748B" stroke-width="1.5"/>
    <!-- Horizontal cooling fins -->
    <g stroke="#94A3B8" stroke-width="1">
      <line x1="46" y1="52" x2="154" y2="52"/>
      <line x1="46" y1="60" x2="154" y2="60"/>
      <line x1="46" y1="68" x2="154" y2="68"/>
      <line x1="46" y1="76" x2="154" y2="76"/>
      <line x1="46" y1="84" x2="154" y2="84"/>
      <line x1="46" y1="92" x2="154" y2="92"/>
      <line x1="46" y1="100" x2="154" y2="100"/>
      <line x1="46" y1="108" x2="154" y2="108"/>
      <line x1="46" y1="116" x2="154" y2="116"/>
    </g>
  </svg>`,

  'water-pump.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="alloyCast" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E2E8F0"/>
        <stop offset="50%" stop-color="#94A3B8"/>
        <stop offset="100%" stop-color="#475569"/>
      </linearGradient>
      <filter id="wpShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <!-- Flange Plate -->
    <path d="M 45,70 C 45,40 80,30 115,40 C 150,50 160,90 145,115 C 130,135 70,135 50,110 Z" fill="url(#alloyCast)" filter="url(#wpShadow)" stroke="#475569" stroke-width="2"/>
    <!-- Mounting Holes -->
    <circle cx="55" cy="55" r="4.5" fill="#0F172A" stroke="#CBD5E1" stroke-width="1"/>
    <circle cx="140" cy="55" r="4.5" fill="#0F172A" stroke="#CBD5E1" stroke-width="1"/>
    <circle cx="140" cy="110" r="4.5" fill="#0F172A" stroke="#CBD5E1" stroke-width="1"/>
    <circle cx="65" cy="115" r="4.5" fill="#0F172A" stroke="#CBD5E1" stroke-width="1"/>
    <!-- Central Hub & Pulley Bearing -->
    <circle cx="100" cy="80" r="32" fill="#334155" stroke="#1E293B" stroke-width="2"/>
    <circle cx="100" cy="80" r="20" fill="#0F172A"/>
    <!-- Impeller Curved Blades -->
    <path d="M 100,60 C 110,65 110,75 100,80" stroke="#E2E8F0" stroke-width="3" stroke-linecap="round"/>
    <path d="M 100,100 C 90,95 90,85 100,80" stroke="#E2E8F0" stroke-width="3" stroke-linecap="round"/>
    <path d="M 80,80 C 85,90 95,90 100,80" stroke="#E2E8F0" stroke-width="3" stroke-linecap="round"/>
    <path d="M 120,80 C 115,70 105,70 100,80" stroke="#E2E8F0" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  'shock-absorber.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="strutBlack" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#334155"/>
        <stop offset="50%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <filter id="strutShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <g transform="rotate(35 100 80)" filter="url(#strutShadow)">
      <!-- Top Mount Eyelet -->
      <circle cx="100" cy="22" r="10" fill="#1E293B" stroke="#475569" stroke-width="2"/>
      <circle cx="100" cy="22" r="5" fill="#F8FAFC"/>
      <!-- Piston Rod Shiny Chrome -->
      <rect x="96" y="32" width="8" height="35" fill="#E2E8F0" stroke="#94A3B8" stroke-width="0.8"/>
      <!-- Spring Seats -->
      <rect x="76" y="60" width="48" height="6" rx="2" fill="#0F172A" stroke="#334155" stroke-width="1"/>
      <rect x="76" y="112" width="48" height="6" rx="2" fill="#0F172A" stroke="#334155" stroke-width="1"/>
      <!-- Coil Spring -->
      <path d="M 80,66 Q 100,74 120,66 Q 100,82 80,74 Q 100,90 120,82 Q 100,98 80,90 Q 100,106 120,98 Q 100,114 80,106" fill="none" stroke="#EF4444" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Damper Tube Cylinder -->
      <rect x="90" y="80" width="20" height="54" rx="4" fill="url(#strutBlack)" stroke="#334155" stroke-width="1.5"/>
      <!-- Bottom Eyelet -->
      <circle cx="100" cy="140" r="10" fill="#1E293B" stroke="#475569" stroke-width="2"/>
      <circle cx="100" cy="140" r="5" fill="#F8FAFC"/>
    </g>
  </svg>`,

  'clutch-kit.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="clutchCover" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#CBD5E1"/>
        <stop offset="50%" stop-color="#94A3B8"/>
        <stop offset="100%" stop-color="#475569"/>
      </linearGradient>
      <radialGradient id="clutchDisc" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#B45309"/>
        <stop offset="70%" stop-color="#78350F"/>
        <stop offset="100%" stop-color="#451A03"/>
      </radialGradient>
      <filter id="clutchShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <ellipse cx="90" cy="75" rx="55" ry="45" fill="url(#clutchCover)" filter="url(#clutchShadow)" stroke="#64748B" stroke-width="2"/>
    <ellipse cx="90" cy="75" rx="34" ry="28" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
    <ellipse cx="90" cy="75" rx="16" ry="13" fill="#0F172A"/>
    <line x1="90" y1="48" x2="90" y2="62" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="90" y1="88" x2="90" y2="102" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="58" y1="75" x2="74" y2="75" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="106" y1="75" x2="122" y2="75" stroke="#CBD5E1" stroke-width="1.5"/>
    
    <ellipse cx="125" cy="90" rx="42" ry="34" fill="url(#clutchDisc)" filter="url(#clutchShadow)" stroke="#92400E" stroke-width="2"/>
    <ellipse cx="125" cy="90" rx="20" ry="16" fill="#64748B" stroke="#334155" stroke-width="1.5"/>
    <ellipse cx="118" cy="85" rx="4" ry="2.5" fill="#EF4444"/>
    <ellipse cx="132" cy="85" rx="4" ry="2.5" fill="#EF4444"/>
    <ellipse cx="118" cy="95" rx="4" ry="2.5" fill="#EF4444"/>
    <ellipse cx="132" cy="95" rx="4" ry="2.5" fill="#EF4444"/>
    <ellipse cx="125" cy="90" rx="8" ry="6" fill="#0F172A"/>
  </svg>`,

  'wiper-blades.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="bladeRubber" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#475569"/>
        <stop offset="50%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
      <filter id="wiperShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <g transform="rotate(-15 100 80)" filter="url(#wiperShadow)">
      <path d="M 20,68 C 60,60 140,60 180,68 L 178,74 C 140,66 60,66 22,74 Z" fill="url(#bladeRubber)" stroke="#334155" stroke-width="1"/>
      <path d="M 22,74 C 60,66 140,66 178,74 L 176,77 C 140,69 60,69 24,77 Z" fill="#000000"/>
      <rect x="94" y="55" width="12" height="15" rx="3" fill="#0F172A" stroke="#64748B" stroke-width="1.2"/>
      <circle cx="100" cy="62" r="2" fill="#E2E8F0"/>
    </g>
    <g transform="rotate(-10 100 105)" filter="url(#wiperShadow)">
      <path d="M 35,98 C 70,91 130,91 165,98 L 163,103 C 130,96 70,96 37,103 Z" fill="url(#bladeRubber)" stroke="#334155" stroke-width="1"/>
      <path d="M 37,103 C 70,96 130,96 163,103 L 161,106 C 130,99 70,99 39,106 Z" fill="#000000"/>
      <rect x="95" y="87" width="10" height="13" rx="2.5" fill="#0F172A" stroke="#64748B" stroke-width="1"/>
      <circle cx="100" cy="93" r="1.5" fill="#E2E8F0"/>
    </g>
  </svg>`,

  'fasteners.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
    <defs>
      <linearGradient id="boltZinc" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E2E8F0"/>
        <stop offset="50%" stop-color="#F8FAFC"/>
        <stop offset="100%" stop-color="#94A3B8"/>
      </linearGradient>
      <filter id="boltShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.18"/>
      </filter>
    </defs>
    <!-- Slide Pin 1 -->
    <g filter="url(#boltShadow)">
      <rect x="40" y="45" width="45" height="12" rx="3" fill="url(#boltZinc)" stroke="#64748B" stroke-width="1"/>
      <rect x="85" y="42" width="14" height="18" rx="2" fill="#334155" stroke="#1E293B" stroke-width="1"/>
      <!-- Rubber Accordion Boot -->
      <rect x="102" y="46" width="18" height="10" rx="3" fill="#0F172A"/>
      <circle cx="106" cy="51" r="5" fill="#1E293B"/>
      <circle cx="114" cy="51" r="5" fill="#1E293B"/>
    </g>
    <!-- Slide Pin 2 -->
    <g filter="url(#boltShadow)">
      <rect x="40" y="85" width="45" height="12" rx="3" fill="url(#boltZinc)" stroke="#64748B" stroke-width="1"/>
      <rect x="85" y="82" width="14" height="18" rx="2" fill="#334155" stroke="#1E293B" stroke-width="1"/>
      <rect x="102" y="86" width="18" height="10" rx="3" fill="#0F172A"/>
      <circle cx="106" cy="91" r="5" fill="#1E293B"/>
      <circle cx="114" cy="91" r="5" fill="#1E293B"/>
    </g>
    <!-- Flange Bolts & Washers -->
    <circle cx="150" cy="52" r="9" fill="url(#boltZinc)" stroke="#475569" stroke-width="1.5"/>
    <circle cx="150" cy="52" r="5" fill="#CBD5E1"/>
    <circle cx="150" cy="85" r="9" fill="url(#boltZinc)" stroke="#475569" stroke-width="1.5"/>
    <circle cx="150" cy="85" r="5" fill="#CBD5E1"/>
    <!-- Copper Washer -->
    <circle cx="140" cy="115" r="8" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
    <circle cx="140" cy="115" r="4" fill="#FFFFFF"/>
    <circle cx="160" cy="115" r="8" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
    <circle cx="160" cy="115" r="4" fill="#FFFFFF"/>
  </svg>`
};

for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, filename), content.trim());
  console.log('Created', filename);
}
