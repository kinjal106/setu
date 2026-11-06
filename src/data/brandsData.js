/**
 * All Hardware Brands Dataset
 * Exactly matches user specification table:
 * Pictor (37), Earth Track (28), Fetaca (20), HL (17), Qtloads (10),
 * Ruptela (9), Watsoo (7), Acumen (5), Itriangle (2), Concex (1),
 * Ecogas (1), GPSwala (1), JSD (1), Meitrack (1), Mercetech (1),
 * OEM (1), OMNICOMM (1), RDM (1).
 */

export const BRANDS_DATA = [
  {
    id: 'pictor',
    name: 'Pictor',
    deviceCount: 37,
    category: 'Vehicle Tracking & Fleet Telematics',
    tagline: 'High-precision commercial vehicle GPS trackers, wired units & OBD telematics',
    specialty: 'High Volume Fleet Logistics',
    image: '/images/hardware/advance-4wire.svg',
    verified: true,
    startingPrice: 599,
    popularModels: ['Pictor Pro 4G', 'Pictor Advance 4-Wire', 'Pictor Micro OBD-II', 'Pictor Heavy VLTD']
  },
  {
    id: 'earth-track',
    name: 'Earth Track',
    deviceCount: 28,
    category: 'Rugged Commercial Vehicle GPS',
    tagline: 'Industrial-grade wired trackers, heavy equipment telematics & dual-SIM units',
    specialty: 'Heavy Transport & Mining',
    image: '/images/hardware/g17-earth.svg',
    verified: true,
    startingPrice: 564,
    popularModels: ['G17 Earth GPS Tracker', 'Earth Track Pro 4G', 'Earth Solar Asset Tracker', 'Earth 9-36V Fleet Unit']
  },
  {
    id: 'fetaca',
    name: 'Fetaca',
    deviceCount: 20,
    category: 'Commercial Fleet Telematics',
    tagline: 'Compact 4G telematics units, remote engine immobilizer & live tracking sensors',
    specialty: 'Cab Fleets & Urban Logistics',
    image: '/images/hardware/v5-4g.svg',
    verified: true,
    startingPrice: 2490,
    popularModels: ['V5 4G Telematics Tracker', 'V5 Mini 4G Tracker', 'Fetaca FT-200 Heavy', 'Fetaca Fleet Cutoff']
  },
  {
    id: 'hl',
    name: 'HL',
    deviceCount: 17,
    category: 'Heavy-Duty Vehicle Trackers',
    tagline: 'Enterprise logistics tracking, RS485 fuel sensor integration & SOS systems',
    specialty: 'Long-Haul Trucks & Cargo',
    image: '/images/hardware/gb440.svg',
    verified: true,
    startingPrice: 2710,
    popularModels: ['GB440 Fleet Tracker', 'HL Heavy-Duty 4G', 'HL Cargo Guard Pro', 'HL Multi-Sensor Gateway']
  },
  {
    id: 'qtloads',
    name: 'Qtloads',
    deviceCount: 10,
    category: 'Axle Load & Electronic Locks',
    tagline: 'Container electronic locks, axle load weighing sensors & high-capacity battery units',
    specialty: 'Transit Security & Cargo Weight',
    image: '/images/hardware/gl500-4g.svg',
    verified: true,
    startingPrice: 9450,
    popularModels: ['GL500 GPS Smart E-Lock 4G', 'GL500 E-Lock 2G', 'Qtloads Axle Monitor Pro', 'Qtloads Weight Gateway']
  },
  {
    id: 'ruptela',
    name: 'Ruptela',
    deviceCount: 9,
    category: 'European Standard CAN & OBD Telematics',
    tagline: 'Premium OBD-II diagnostic trackers, CAN-bus decoders & commercial eco-driving telematics',
    specialty: 'CAN Telematics & Diagnostics',
    image: '/images/hardware/eco5-lite.svg',
    verified: true,
    startingPrice: 2140,
    popularModels: ['Eco5 Pro 4G OBD Tracker', 'Eco5 Lite OBD Tracker', 'Ruptela HCV5 CAN', 'Ruptela Plug & Play']
  },
  {
    id: 'watsoo',
    name: 'Watsoo',
    deviceCount: 7,
    category: 'Govt. AIS-140 Certified VLTD',
    tagline: 'Official ARAI / ICAT approved AIS-140 vehicle tracking with emergency panic button & dual eSIM',
    specialty: 'RTO Mandate & Public Transport',
    image: '/images/hardware/prithvi-140.svg',
    verified: true,
    startingPrice: 3650,
    popularModels: ['T98 AIS 140 GPS Device', 'T98 Rajasthan RTO Edition', 'T98 Mining Edition', 'Watsoo VLTD Express']
  },
  {
    id: 'acumen',
    name: 'Acumen',
    deviceCount: 5,
    category: 'Vehicle Security & GPS Trackers',
    tagline: 'Multi-wire anti-theft trackers, internal battery backup & ignition alert systems',
    specialty: 'Anti-Theft & Fleet Safety',
    image: '/images/hardware/br05-4g.svg',
    verified: true,
    startingPrice: 1850,
    popularModels: ['BR05 4G Vehicle Tracker', 'BR06 GPS Tracker', 'BR08 Fleet Telematics', 'Acumen Security Plus']
  },
  {
    id: 'itriangle',
    name: 'Itriangle',
    deviceCount: 2,
    category: 'ARAI Approved AIS-140 Hardware',
    tagline: 'ICAT/ARAI certified vehicle tracking units with emergency buttons and health packet streaming',
    specialty: 'Govt Compliance & RTO',
    image: '/images/hardware/prithvi-140-rto.svg',
    verified: true,
    startingPrice: 3800,
    popularModels: ['Itriangle Bharat 101 AIS-140', 'Itriangle Aquila Pro 4G']
  },
  {
    id: 'mercetech',
    name: 'Mercetech',
    deviceCount: 1,
    category: 'AI Video Telematics & Dashcams',
    tagline: 'Dual-facing AI dashcams, ADAS lane collision warning & DMS driver fatigue detection',
    specialty: 'AI Video Safety & Telematics',
    image: '/images/hardware/titan-t4.svg',
    verified: true,
    startingPrice: 10930,
    popularModels: ['Mercetech Titan T4 Dash Camera', 'Falcon F1 AI Camera', 'Sentinel S3 AI Camera']
  },
  {
    id: 'omnicomm',
    name: 'OMNICOMM',
    deviceCount: 1,
    category: 'Precision Fuel Telematics & Sensors',
    tagline: 'High-precision capacitive digital fuel level sensors with 99.5% accuracy and anti-theft alarms',
    specialty: 'Fuel Precision & Theft Prevention',
    image: '/images/hardware/sp-ble4-fuel.svg',
    verified: true,
    startingPrice: 4500,
    popularModels: ['LLS BLE-4 Fuel Sensor', 'LLS-02 Capacitive Probe']
  },
  {
    id: 'meitrack',
    name: 'Meitrack',
    deviceCount: 1,
    category: 'Heavy Equipment & Container E-Locks',
    tagline: 'Padlock GPS smart container locks with remote OTP unlock & anti-cut siren',
    specialty: 'Intermodal Container Logistics',
    image: '/images/hardware/7h-elock.svg',
    verified: true,
    startingPrice: 4800,
    popularModels: ['Magnet 7H E-Lock Container Tracker']
  },
  {
    id: 'concex',
    name: 'Concex',
    deviceCount: 1,
    category: 'Commercial Vehicle Trackers',
    tagline: 'Reliable 2G/4G wired vehicle GPS tracker with remote engine cutoff and ACC ignition status',
    specialty: 'Vehicle Logistics & Fleets',
    image: '/images/hardware/v5-mini.svg',
    verified: true,
    startingPrice: 2249,
    popularModels: ['Concex GT06N Pro Vehicle Tracker']
  },
  {
    id: 'ecogas',
    name: 'Ecogas',
    deviceCount: 1,
    category: 'Gas & Fuel Telematics',
    tagline: 'Specialized CNG / LPG tank pressure telemetry and vehicle GPS tracking system',
    specialty: 'Alternative Fuel Commercial Fleets',
    image: '/images/hardware/ecogas-track.svg',
    verified: true,
    startingPrice: 2975,
    popularModels: ['EC Series Ecogas Track']
  },
  {
    id: 'gpswala',
    name: 'GPSwala',
    deviceCount: 1,
    category: 'Smart Fleet Location Units',
    tagline: 'Budget-friendly live tracking unit with towing alerts and ignition monitoring',
    specialty: 'Commercial Fleets & Taxis',
    image: '/images/hardware/br06.svg',
    verified: true,
    startingPrice: 1499,
    popularModels: ['GPSwala Smart 4G Tracker']
  },
  {
    id: 'jsd',
    name: 'JSD',
    deviceCount: 1,
    category: 'Specialized Vehicle Telematics',
    tagline: 'Multi-camera MDVR and industrial tracking unit for fleet surveillance and route analytics',
    specialty: 'Public Transit & Passenger Fleets',
    image: '/images/hardware/t5324-mdvr.svg',
    verified: true,
    startingPrice: 7780,
    popularModels: ['JSD T5324 MDVR & GPS Unit']
  },
  {
    id: 'rdm',
    name: 'RDM',
    deviceCount: 1,
    category: 'Remote Diagnostics & Monitoring',
    tagline: 'Heavy machinery tracking device with operating hour meters and remote engine diagnostics',
    specialty: 'Construction & Mining Machinery',
    image: '/images/hardware/falcon-f1.svg',
    verified: true,
    startingPrice: 8500,
    popularModels: ['RDM Industrial Heavy Tracker']
  },
  {
    id: 'oem',
    name: 'OEM',
    deviceCount: 1,
    category: 'Custom Enterprise Hardware',
    tagline: 'Direct manufacturer verified telematics hardware tailored for white-label fleet operations',
    specialty: 'Custom Protocol Implementations',
    image: '/images/hardware/prithvi-140-oem.svg',
    verified: true,
    startingPrice: 3200,
    popularModels: ['Setu OEM Telematics Gateway']
  }
];

export const TOTAL_BRANDS_COUNT = BRANDS_DATA.length;
export const TOTAL_DEVICES_COUNT = BRANDS_DATA.reduce((sum, b) => sum + b.deviceCount, 0);
