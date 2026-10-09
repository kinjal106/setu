import React from 'react';

/**
 * Clean, uncluttered vehicle and subject illustrations for Setu Software Solutions.
 * Designed with Setu portal color family and clean, iconic vector art.
 */
export function SolutionCardVisual({ solutionId }) {
  switch (solutionId) {
    /* ── 1. Trakzee Mini: Single and Personal Vehicle (Sedan with GPS Tracking) ── */
    case 'trakzee-mini':
      return (
        <div className="sol-vehicle-wrap">
          <svg viewBox="0 0 260 140" fill="none" className="sol-vehicle-svg">
            <defs>
              <linearGradient id="tmCarGrad" x1="20" y1="50" x2="220" y2="105" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="60%" stopColor="#1D4ED8" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
              <linearGradient id="tmGlassGrad" x1="60" y1="55" x2="160" y2="78" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
              <radialGradient id="tmGpsPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#006EFF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#006EFF" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Subtle Ground Shadow & Road Line */}
            <ellipse cx="130" cy="118" rx="90" ry="8" fill="#E2E8F0" />
            <path d="M20 118 H240" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="8 6" strokeLinecap="round" />

            {/* GPS Live Tracking Pulse & Pin above car */}
            <circle cx="130" cy="30" r="22" fill="url(#tmGpsPulse)" />
            <circle cx="130" cy="30" r="14" fill="#006EFF" fillOpacity="0.15" stroke="#006EFF" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* GPS Pin */}
            <path d="M130 18 C124.5 18 120 22.5 120 28 C120 35 130 44 130 44 C130 44 140 35 140 28 C140 22.5 135.5 18 130 18 Z" fill="#006EFF" />
            <circle cx="130" cy="27" r="3.5" fill="#FFFFFF" />
            {/* Small tracking signal line connecting to car */}
            <line x1="130" y1="44" x2="130" y2="55" stroke="#006EFF" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* Personal Vehicle (Modern Sedan) */}
            {/* Main Car Body */}
            <path
              d="M45 96 C45 92 48 88 54 86 L74 80 L96 58 C100 54 106 52 114 52 L164 52 C172 52 180 56 186 64 L202 82 L214 86 C220 88 224 92 224 98 L224 104 C224 106 222 108 220 108 L206 108 C206 100 198 94 190 94 C182 94 174 100 174 108 L98 108 C98 100 90 94 82 94 C74 94 66 100 66 108 L48 108 C46 108 45 106 45 104 Z"
              fill="url(#tmCarGrad)"
            />

            {/* Windows Cabin */}
            <path
              d="M98 60 L78 80 L130 80 L130 58 L114 58 C107 58 102 59 98 60 Z"
              fill="url(#tmGlassGrad)"
              opacity="0.9"
            />
            <path
              d="M136 58 L136 80 L194 80 L180 64 C176 59 171 58 165 58 Z"
              fill="url(#tmGlassGrad)"
              opacity="0.9"
            />

            {/* Headlight & Taillight */}
            <path d="M218 88 L224 90 L224 96 L216 94 Z" fill="#FEF08A" />
            <path d="M45 88 L50 89 L48 95 L45 94 Z" fill="#EF4444" />

            {/* Front & Rear Wheels */}
            {/* Rear Wheel */}
            <circle cx="82" cy="108" r="14" fill="#0F172A" />
            <circle cx="82" cy="108" r="8" fill="#94A3B8" />
            <circle cx="82" cy="108" r="3" fill="#0F172A" />
            {/* Front Wheel */}
            <circle cx="190" cy="108" r="14" fill="#0F172A" />
            <circle cx="190" cy="108" r="8" fill="#94A3B8" />
            <circle cx="190" cy="108" r="3" fill="#0F172A" />

            {/* Subtle Door Seam */}
            <path d="M133 58 V104" stroke="#1E3A8A" strokeWidth="1.5" />
            <rect x="137" y="84" width="7" height="2.5" rx="1" fill="#93C5FD" />
          </svg>
        </div>
      );

    /* ── 2. Petzee: Pets Tracking (Dog with GPS Collar & Safe-Zone Halo) ── */
    case 'petzee':
      return (
        <div className="sol-vehicle-wrap">
          <svg viewBox="0 0 260 140" fill="none" className="sol-vehicle-svg">
            <defs>
              <linearGradient id="petFurGrad" x1="80" y1="40" x2="180" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FB923C" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>
              <radialGradient id="petSafeZone" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Safe Zone Geofence Circle */}
            <ellipse cx="130" cy="116" rx="84" ry="12" fill="#E2E8F0" />
            <ellipse cx="130" cy="74" rx="68" ry="46" fill="url(#petSafeZone)" stroke="#10B981" strokeWidth="1.5" strokeDasharray="5 4" />

            {/* Safe Zone Badge Top Left */}
            <g transform="translate(180, 22)">
              <rect width="64" height="20" rx="10" fill="#ECFDF5" stroke="#A7F3D0" />
              <circle cx="10" cy="10" r="3" fill="#10B981" />
              <text x="18" y="14" fill="#047857" fontSize="9" fontWeight="700" fontFamily="sans-serif">SAFE ZONE</text>
            </g>

            {/* Sitting Dog Silhouette / Illustration */}
            {/* Tail */}
            <path d="M86 98 C72 90 70 72 78 68 C80 66 84 70 82 76 C80 82 86 92 94 96 Z" fill="#EA580C" />

            {/* Dog Body */}
            <path
              d="M94 92 C94 80 102 70 110 65 L118 52 C120 48 126 48 130 52 L136 60 C140 68 142 80 144 95 C145 102 142 108 136 112 L98 112 C92 112 94 100 94 92 Z"
              fill="url(#petFurGrad)"
            />

            {/* Front Leg & Paws */}
            <path d="M128 78 L134 114 L146 114 C148 114 148 110 144 108 L138 78 Z" fill="#D97706" />
            <path d="M110 82 L112 114 L122 114 L120 82 Z" fill="#EA580C" />

            {/* Dog Head */}
            <path
              d="M124 50 C122 44 126 34 136 32 C146 30 156 34 162 42 C166 46 174 48 178 52 C180 54 178 58 172 60 L154 62 L144 64 C134 66 126 58 124 50 Z"
              fill="url(#petFurGrad)"
            />

            {/* Dog Ear */}
            <path d="M132 36 C136 34 144 38 144 46 C144 56 138 64 132 66 C128 66 128 58 130 50 Z" fill="#C2410C" />

            {/* Dog Eye & Nose */}
            <circle cx="156" cy="46" r="2.5" fill="#1E293B" />
            <ellipse cx="178" cy="53" rx="3" ry="2" fill="#1E293B" />

            {/* Smart GPS Collar with Glowing Puck */}
            <path d="M136 61 L146 64" stroke="#006EFF" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="141" cy="67" r="4.5" fill="#006EFF" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="141" cy="67" r="1.5" fill="#67E8F9" />

            {/* Signal waves from collar */}
            <path d="M148 64 C151 66 151 70 148 72" stroke="#006EFF" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M152 61 C156 65 156 73 152 77" stroke="#006EFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
          </svg>
        </div>
      );

    /* ── 3. Elexee: EV Vehicles (Electric Car with Charging Plug & Battery Bolt) ── */
    case 'elexee':
      return (
        <div className="sol-vehicle-wrap">
          <svg viewBox="0 0 260 140" fill="none" className="sol-vehicle-svg">
            <defs>
              <linearGradient id="evBodyGrad" x1="40" y1="50" x2="200" y2="105" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="60%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
              <linearGradient id="evGlass" x1="70" y1="55" x2="160" y2="78" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A7F3D0" />
                <stop offset="100%" stopColor="#6EE7B7" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="120" cy="118" rx="80" ry="7" fill="#E2E8F0" />
            <path d="M20 118 H200" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="8 6" strokeLinecap="round" />

            {/* EV Charging Station on Right */}
            <g transform="translate(195, 42)">
              <rect width="24" height="74" rx="5" fill="#0F172A" />
              <rect x="4" y="8" width="16" height="14" rx="2" fill="#10B981" />
              <path d="M12 11 L10 16 H13 L11 20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Charging Cable connected to car */}
              <path d="M4 38 C-8 42 -8 56 -16 56" stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none" />
              <circle cx="-16" cy="56" r="3" fill="#10B981" />
            </g>

            {/* Floating Battery & Range Indicator */}
            <g transform="translate(70, 18)">
              <rect width="86" height="22" rx="11" fill="#ECFDF5" stroke="#A7F3D0" />
              <path d="M12 7 L9 12 H13 L11 16" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="22" y="15" fill="#065F46" fontSize="10" fontWeight="700" fontFamily="sans-serif">82% • 340 km</text>
            </g>

            {/* Electric Vehicle Body (Sleek aerodynamic EV) */}
            <path
              d="M38 96 C38 90 42 86 48 84 L72 78 L98 56 C104 51 112 50 120 50 L160 50 C168 50 176 54 182 62 L194 80 L200 84 C204 87 206 91 206 96 L206 102 C206 106 204 108 200 108 L188 108 C188 100 180 94 172 94 C164 94 156 100 156 108 L92 108 C92 100 84 94 76 94 C68 94 60 100 60 108 L42 108 C40 108 38 106 38 102 Z"
              fill="url(#evBodyGrad)"
            />

            {/* Aerodynamic Panoramic Glass */}
            <path
              d="M100 56 L76 78 L126 78 L126 55 L118 55 C110 55 104 55 100 56 Z"
              fill="url(#evGlass)"
              opacity="0.9"
            />
            <path
              d="M132 55 L132 78 L186 78 L176 62 C172 57 166 55 160 55 Z"
              fill="url(#evGlass)"
              opacity="0.9"
            />

            {/* Front Headlight (Electric Cyan) */}
            <path d="M198 86 L206 88 L206 94 L196 92 Z" fill="#67E8F9" />

            {/* Wheels (Aero EV Wheels) */}
            <circle cx="76" cy="108" r="14" fill="#0F172A" />
            <circle cx="76" cy="108" r="9" fill="#10B981" fillOpacity="0.4" stroke="#10B981" strokeWidth="1.5" />
            <circle cx="76" cy="108" r="3" fill="#FFFFFF" />

            <circle cx="172" cy="108" r="14" fill="#0F172A" />
            <circle cx="172" cy="108" r="9" fill="#10B981" fillOpacity="0.4" stroke="#10B981" strokeWidth="1.5" />
            <circle cx="172" cy="108" r="3" fill="#FFFFFF" />
          </svg>
        </div>
      );

    /* ── 4. TaskEye: Employee Tracking in Onsite Work (Field Engineer with Tablet & GPS) ── */
    case 'taskeye':
      return (
        <div className="sol-vehicle-wrap">
          <svg viewBox="0 0 260 140" fill="none" className="sol-vehicle-svg">
            <defs>
              <linearGradient id="workerVest" x1="100" y1="50" x2="160" y2="105" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>
            </defs>

            {/* Ground Shadow */}
            <ellipse cx="130" cy="122" rx="46" ry="6" fill="#E2E8F0" />

            {/* Onsite Check-in Radar Rings */}
            <circle cx="130" cy="22" r="16" fill="#006EFF" fillOpacity="0.12" stroke="#006EFF" strokeWidth="1" strokeDasharray="3 3" />
            {/* GPS Pin with Checkmark */}
            <path d="M130 12 C125 12 121 16 121 21 C121 28 130 35 130 35 C130 35 139 28 139 21 C139 16 135 12 130 12 Z" fill="#006EFF" />
            <path d="M127 21 L129 23 L134 18" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Status Pill on Left */}
            <g transform="translate(18, 52)">
              <rect width="78" height="22" rx="6" fill="#EFF6FF" stroke="#BFDBFE" />
              <circle cx="10" cy="11" r="3" fill="#10B981" />
              <text x="18" y="15" fill="#1E40AF" fontSize="9" fontWeight="700" fontFamily="sans-serif">ONSITE ACTIVE</text>
            </g>

            {/* Field Engineer Figure */}
            {/* Hardhat / Helmet */}
            <path d="M120 44 C120 37 124 33 130 33 C136 33 140 37 140 44 Z" fill="#FBBF24" />
            <path d="M117 44 H143 C144 44 145 45 144 46 L142 47 H118 L116 46 C115 45 116 44 117 44 Z" fill="#F59E0B" />

            {/* Head & Face */}
            <circle cx="130" cy="48" r="6" fill="#FBCFE8" />

            {/* Body / Torso with High-Vis Safety Vest */}
            <path d="M118 56 C114 58 112 62 112 68 L114 96 H146 L148 68 C148 62 146 58 142 56 Z" fill="url(#workerVest)" />

            {/* Reflective Silver Stripes on Vest */}
            <rect x="114" y="70" width="32" height="4" fill="#E2E8F0" />
            <rect x="114" y="82" width="32" height="4" fill="#E2E8F0" />
            <line x1="124" y1="56" x2="124" y2="96" stroke="#CBD5E1" strokeWidth="3" />
            <line x1="136" y1="56" x2="136" y2="96" stroke="#CBD5E1" strokeWidth="3" />

            {/* Arms holding Mobile Inspection Tablet */}
            <path d="M112 66 L124 82 L136 82 L148 66" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* Smart Tablet / Clipboard */}
            <rect x="122" y="75" width="16" height="20" rx="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
            <rect x="125" y="78" width="10" height="12" fill="#38BDF8" fillOpacity="0.4" />
            <line x1="126" y1="81" x2="132" y2="81" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="126" y1="84" x2="131" y2="84" stroke="#FFFFFF" strokeWidth="1" />

            {/* Legs */}
            <path d="M120 96 L119 120 M140 96 L141 120" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            {/* Boots */}
            <rect x="114" y="118" width="10" height="5" rx="2" fill="#0F172A" />
            <rect x="137" y="118" width="10" height="5" rx="2" fill="#0F172A" />
          </svg>
        </div>
      );

    /* ── 5. SmartWaste: Waste Collection Vehicles with Waste Bins ── */
    case 'smart-waste':
      return (
        <div className="sol-vehicle-wrap">
          <svg viewBox="0 0 260 140" fill="none" className="sol-vehicle-svg">
            <defs>
              <linearGradient id="wasteTruckGrad" x1="30" y1="45" x2="170" y2="105" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#16A34A" />
                <stop offset="100%" stopColor="#15803D" />
              </linearGradient>
            </defs>

            {/* Ground shadow & road */}
            <ellipse cx="130" cy="120" rx="100" ry="7" fill="#E2E8F0" />
            <path d="M20 120 H240" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="8 6" strokeLinecap="round" />

            {/* Municipal Garbage / Waste Collection Truck */}
            {/* Rear Compactor Body */}
            <path
              d="M35 48 H120 V106 H40 C37 106 35 104 35 101 Z"
              fill="url(#wasteTruckGrad)"
            />
            {/* Rear Hopper Curve */}
            <path d="M35 56 C26 64 26 84 35 96 Z" fill="#14532D" />

            {/* Recycling Symbol on Truck */}
            <g transform="translate(70, 68) scale(0.8)">
              <circle cx="12" cy="12" r="14" fill="#FFFFFF" fillOpacity="0.2" />
              <path d="M12 4 L16 10 H8 Z M19 14 L15 20 L11 16 Z M5 14 L9 16 L5 20 Z" fill="#FFFFFF" />
            </g>

            {/* Truck Cabin (Front) */}
            <path
              d="M120 62 H155 L168 80 L168 106 H120 Z"
              fill="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth="1"
            />
            {/* Windshield */}
            <path d="M125 66 H150 L160 80 H125 Z" fill="#93C5FD" />
            {/* Headlight & Bumper */}
            <rect x="164" y="96" width="6" height="5" rx="1" fill="#FEF08A" />
            <rect x="156" y="103" width="16" height="4" rx="1" fill="#475569" />

            {/* Hazard Stripe */}
            <rect x="35" y="100" width="85" height="5" fill="#FACC15" />
            <path d="M45 100 L40 105 M55 100 L50 105 M65 100 L60 105 M75 100 L70 105" stroke="#000000" strokeWidth="2" />

            {/* Truck Wheels */}
            <circle cx="58" cy="112" r="12" fill="#1E293B" />
            <circle cx="58" cy="112" r="6" fill="#94A3B8" />
            <circle cx="95" cy="112" r="12" fill="#1E293B" />
            <circle cx="95" cy="112" r="6" fill="#94A3B8" />
            <circle cx="148" cy="112" r="12" fill="#1E293B" />
            <circle cx="148" cy="112" r="6" fill="#94A3B8" />

            {/* Smart Waste Bins on Right */}
            {/* Green Bin (Recyclable) */}
            <g transform="translate(190, 68)">
              {/* Lid */}
              <rect x="0" y="0" width="22" height="4" rx="1.5" fill="#15803D" />
              <circle cx="11" cy="0" r="2.5" fill="#10B981" /> {/* IoT sensor on lid */}
              {/* Bin Body */}
              <path d="M2 4 L4 38 H18 L20 4 Z" fill="#16A34A" />
              {/* Fill level gauge */}
              <rect x="6" y="12" width="10" height="2" fill="#86EFAC" />
              <rect x="6" y="16" width="10" height="2" fill="#86EFAC" />
              <rect x="6" y="20" width="10" height="2" fill="#86EFAC" />
              {/* Wheels */}
              <circle cx="4" cy="38" r="3" fill="#1E293B" />
              <circle cx="18" cy="38" r="3" fill="#1E293B" />
            </g>

            {/* Blue Bin (General Waste) */}
            <g transform="translate(218, 72)">
              <rect x="0" y="0" width="20" height="4" rx="1.5" fill="#1E40AF" />
              <circle cx="10" cy="0" r="2" fill="#38BDF8" />
              <path d="M2 4 L4 34 H16 L18 4 Z" fill="#2563EB" />
              <circle cx="4" cy="34" r="2.5" fill="#1E293B" />
              <circle cx="16" cy="34" r="2.5" fill="#1E293B" />
            </g>
          </svg>
        </div>
      );

    /* ── 6. SmartTranzit: Public Transportation (City Transit Bus) ── */
    case 'smart-tranzit':
      return (
        <div className="sol-vehicle-wrap">
          <svg viewBox="0 0 260 140" fill="none" className="sol-vehicle-svg">
            <defs>
              <linearGradient id="transitGrad" x1="20" y1="40" x2="220" y2="105" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>

            {/* Ground shadow & road */}
            <ellipse cx="130" cy="118" rx="96" ry="7" fill="#E2E8F0" />
            <path d="M15 118 H245" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="8 6" strokeLinecap="round" />

            {/* Route LED Destination Display Top Floating */}
            <g transform="translate(85, 22)">
              <rect width="90" height="18" rx="4" fill="#0F172A" />
              <text x="45" y="13" fill="#38BDF8" fontSize="9" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">
                ROUTE 42 • EXPRESS
              </text>
            </g>

            {/* City Transit Bus */}
            {/* Main Bus Body */}
            <path
              d="M30 50 C30 46 34 44 38 44 H208 C216 44 222 50 224 58 L226 102 C226 106 222 108 218 108 L196 108 C196 100 188 94 180 94 C172 94 164 100 164 108 L98 108 C98 100 90 94 82 94 C74 94 66 100 66 108 L34 108 C32 108 30 106 30 102 Z"
              fill="url(#transitGrad)"
            />

            {/* Roof AC Unit */}
            <rect x="90" y="38" width="60" height="6" rx="2" fill="#E2E8F0" />

            {/* Large Passenger Windows */}
            <g fill="#0F172A" opacity="0.85">
              <rect x="36" y="52" width="22" height="24" rx="3" fill="#E0F2FE" />
              <rect x="64" y="52" width="26" height="24" rx="3" fill="#E0F2FE" />
              <rect x="96" y="52" width="26" height="24" rx="3" fill="#E0F2FE" />
              <rect x="128" y="52" width="26" height="24" rx="3" fill="#E0F2FE" />
              <rect x="160" y="52" width="26" height="24" rx="3" fill="#E0F2FE" />
              {/* Front Windshield */}
              <path d="M192 52 H212 C216 52 219 55 220 59 L222 76 H192 Z" fill="#BAE6FD" />
            </g>

            {/* Bus Doors */}
            <rect x="130" y="78" width="14" height="28" fill="#312E81" />
            <line x1="137" y1="78" x2="137" y2="106" stroke="#818CF8" strokeWidth="1" />

            {/* White Body Livery Stripe */}
            <path d="M30 84 H224" stroke="#FFFFFF" strokeWidth="3" />

            {/* Headlights & Taillights */}
            <rect x="222" y="90" width="4" height="6" rx="1" fill="#FEF08A" />
            <rect x="30" y="90" width="3" height="6" rx="1" fill="#EF4444" />

            {/* Bus Wheels */}
            <circle cx="82" cy="108" r="14" fill="#0F172A" />
            <circle cx="82" cy="108" r="7" fill="#94A3B8" />
            <circle cx="82" cy="108" r="2.5" fill="#0F172A" />

            <circle cx="180" cy="108" r="14" fill="#0F172A" />
            <circle cx="180" cy="108" r="7" fill="#94A3B8" />
            <circle cx="180" cy="108" r="2.5" fill="#0F172A" />
          </svg>
        </div>
      );

    /* ── 7. SmartBus: Student School Bus Tracking (Yellow School Bus) ── */
    case 'smartbus':
      return (
        <div className="sol-vehicle-wrap">
          <svg viewBox="0 0 260 140" fill="none" className="sol-vehicle-svg">
            <defs>
              <linearGradient id="schoolBusYellow" x1="30" y1="40" x2="220" y2="105" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="60%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>

            {/* Ground shadow & road */}
            <ellipse cx="130" cy="118" rx="96" ry="7" fill="#E2E8F0" />
            <path d="M15 118 H245" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="8 6" strokeLinecap="round" />

            {/* Student Safety Shield Badge Floating */}
            <g transform="translate(182, 18)">
              <rect width="64" height="20" rx="10" fill="#FEF3C7" stroke="#FDE68A" />
              <text x="32" y="14" fill="#B45309" fontSize="9" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">
                SCHOOL BUS
              </text>
            </g>

            {/* Yellow School Bus Body */}
            <path
              d="M35 50 C35 46 38 44 42 44 H196 L216 68 L220 102 C220 106 216 108 212 108 L194 108 C194 100 186 94 178 94 C170 94 162 100 162 108 L98 108 C98 100 90 94 82 94 C74 94 66 100 66 108 L38 108 C36 108 35 106 35 102 Z"
              fill="url(#schoolBusYellow)"
            />

            {/* Black Warning Rib Stripes */}
            <rect x="35" y="82" width="170" height="3.5" fill="#1E293B" />
            <rect x="35" y="88" width="170" height="3.5" fill="#1E293B" />

            {/* Text on side of bus */}
            <text x="110" y="76" fill="#1E293B" fontSize="10" fontWeight="900" letterSpacing="0.08em" fontFamily="sans-serif" textAnchor="middle">
              SCHOOL DISTRICT
            </text>

            {/* Windows */}
            <g fill="#1E293B">
              <rect x="42" y="50" width="18" height="18" rx="2" fill="#E0F2FE" />
              <rect x="66" y="50" width="18" height="18" rx="2" fill="#E0F2FE" />
              <rect x="90" y="50" width="18" height="18" rx="2" fill="#E0F2FE" />
              <rect x="114" y="50" width="18" height="18" rx="2" fill="#E0F2FE" />
              <rect x="138" y="50" width="18" height="18" rx="2" fill="#E0F2FE" />
              <rect x="162" y="50" width="18" height="18" rx="2" fill="#E0F2FE" />
              {/* Front Windshield */}
              <path d="M186 50 H196 L212 68 H186 Z" fill="#BAE6FD" />
            </g>

            {/* Red & Amber Flasher Lights on Roof */}
            <circle cx="40" cy="45" r="3" fill="#EF4444" />
            <circle cx="48" cy="45" r="3" fill="#F59E0B" />
            <circle cx="188" cy="45" r="3" fill="#F59E0B" />
            <circle cx="196" cy="45" r="3" fill="#EF4444" />

            {/* Red Swing-Out STOP Sign on Side */}
            <g transform="translate(24, 68)">
              <polygon points="5,0 15,0 20,5 20,15 15,20 5,20 0,15 0,5" fill="#EF4444" />
              <text x="10" y="13" fill="#FFFFFF" fontSize="6" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">STOP</text>
            </g>

            {/* Bus Wheels */}
            <circle cx="82" cy="108" r="14" fill="#0F172A" />
            <circle cx="82" cy="108" r="7" fill="#F59E0B" />
            <circle cx="82" cy="108" r="2.5" fill="#0F172A" />

            <circle cx="178" cy="108" r="14" fill="#0F172A" />
            <circle cx="178" cy="108" r="7" fill="#F59E0B" />
            <circle cx="178" cy="108" r="2.5" fill="#0F172A" />
          </svg>
        </div>
      );

    /* ── 8. Gridzee: Indoor Tracking (Warehouse Forklift & Indoor Beacon Tracking) ── */
    case 'gridzee':
      return (
        <div className="sol-vehicle-wrap">
          <svg viewBox="0 0 260 140" fill="none" className="sol-vehicle-svg">
            <defs>
              <linearGradient id="forkliftGrad" x1="40" y1="50" x2="160" y2="105" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="60%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#6D28D9" />
              </linearGradient>
            </defs>

            {/* Indoor Floor Grid (Warehouse / Facility) */}
            <ellipse cx="130" cy="118" rx="88" ry="8" fill="#EDE9FE" />
            <path d="M40 118 H220" stroke="#DDD6FE" strokeWidth="2" strokeDasharray="6 6" />

            {/* Indoor BLE Locator Beacon on Ceiling (Emitting tracking waves) */}
            <g transform="translate(130, 16)">
              <circle cx="0" cy="0" r="18" fill="#8B5CF6" fillOpacity="0.12" />
              <circle cx="0" cy="0" r="10" fill="#8B5CF6" fillOpacity="0.25" />
              <circle cx="0" cy="0" r="4" fill="#7C3AED" />
              {/* Concentric locator waves downward */}
              <path d="M-20 18 Q0 26 20 18" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
              <path d="M-35 28 Q0 40 35 28" stroke="#8B5CF6" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.6" fill="none" />
            </g>

            {/* Status Pill on Left */}
            <g transform="translate(160, 20)">
              <rect width="82" height="20" rx="6" fill="#F5F3FF" stroke="#DDD6FE" />
              <circle cx="10" cy="10" r="3" fill="#8B5CF6" />
              <text x="18" y="14" fill="#6D28D9" fontSize="8" fontWeight="700" fontFamily="sans-serif">INDOOR BLE &lt;1m</text>
            </g>

            {/* Warehouse Industrial Forklift Vehicle */}
            {/* Roll Cage / Cabin */}
            <rect x="74" y="54" width="36" height="34" rx="3" fill="#334155" />
            <rect x="78" y="58" width="28" height="26" rx="2" fill="#F8FAFC" />
            {/* Steering wheel */}
            <line x1="98" y1="74" x2="92" y2="68" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />

            {/* Counterweight & Main Forklift Chassis */}
            <path
              d="M50 82 C50 78 54 74 60 74 H116 L124 94 L124 108 H54 C52 108 50 106 50 104 Z"
              fill="url(#forkliftGrad)"
            />

            {/* Fork Mast (Vertical Rails) */}
            <rect x="120" y="44" width="6" height="64" rx="1.5" fill="#475569" />
            <rect x="128" y="44" width="6" height="64" rx="1.5" fill="#475569" />

            {/* Lifting Carriage & Metal Forks */}
            <rect x="118" y="78" width="20" height="6" fill="#1E293B" />
            <path d="M134 84 V112 H166" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />

            {/* Pallet with Cargo Box on Forks */}
            <rect x="138" y="72" width="26" height="26" rx="2" fill="#D97706" />
            <path d="M138 85 H164 M151 72 V98" stroke="#B45309" strokeWidth="1.5" />
            {/* Wooden Pallet Base */}
            <rect x="136" y="98" width="28" height="5" rx="1" fill="#78350F" />

            {/* Forklift Wheels */}
            <circle cx="68" cy="110" r="12" fill="#0F172A" />
            <circle cx="68" cy="110" r="5" fill="#E2E8F0" />
            <circle cx="114" cy="110" r="10" fill="#0F172A" />
            <circle cx="114" cy="110" r="4" fill="#E2E8F0" />
          </svg>
        </div>
      );

    default:
      return null;
  }
}
