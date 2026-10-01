/**
 * Setu AI Search Engine
 * Smart search that understands fleet problems, not just keywords.
 */

/* ── Category map: keywords → category/subcategory IDs ── */
const CATEGORY_KEYWORDS = {
  // Device types
  gps: ['vehicle-tracking', 'wired-gps-tracker', 'asset-logistics'],
  tracker: ['vehicle-tracking', 'wired-gps-tracker', 'obd-gps-tracker'],
  tracking: ['vehicle-tracking', 'asset-logistics'],
  dashcam: ['video-telematics', 'dashcam', 'ai-dashcam'],
  camera: ['video-telematics', 'dashcam', 'ai-dashcam'],
  video: ['video-telematics', 'mdvr', 'dashcam'],
  mdvr: ['video-telematics', 'mdvr', 'adas-mdvr'],
  dvr: ['video-telematics', 'mdvr'],
  adas: ['video-telematics', 'adas-mdvr', 'ai-dashcam'],
  dms: ['video-telematics', 'ai-dashcam'],
  fuel: ['fuel-sensors', 'fuel-level-sensor'],
  sensor: ['fuel-sensors', 'fuel-level-sensor'],
  lock: ['asset-logistics', 'e-lock-tracker'],
  elock: ['asset-logistics', 'e-lock-tracker'],
  container: ['asset-logistics', 'container-tracking'],
  asset: ['asset-logistics', 'asset-gps-tracker'],
  personal: ['personal-safety', 'personal-gps-tracker'],
  wearable: ['personal-safety', 'wearable-gps'],
  sos: ['personal-safety', 'sos-tracking'],
  obd: ['vehicle-tracking', 'obd-gps-tracker'],
  can: ['vehicle-tracking', 'can-bus-gps-tracker'],
  ais: ['vehicle-tracking', 'ais-gps-device'],
  ai: ['video-telematics', 'ai-dashcam', 'adas-mdvr'],
  blackrock: ['vehicle-tracking'],
  mernetek: ['fuel-sensors'],
};

/* ── Problem keywords → recommended categories ── */
const PROBLEM_MAP = {
  theft: ['fuel-level-sensor', 'vehicle-tracking', 'e-lock-tracker', 'video-telematics'],
  'fuel theft': ['fuel-level-sensor', 'fuel-sensors'],
  accident: ['video-telematics', 'ai-dashcam', 'adas-mdvr'],
  'accident proof': ['video-telematics', 'ai-dashcam', 'adas-mdvr'],
  collision: ['video-telematics', 'ai-dashcam', 'adas-mdvr'],
  safety: ['personal-safety', 'video-telematics', 'ai-dashcam'],
  monitoring: ['vehicle-tracking', 'video-telematics'],
  fleet: ['vehicle-tracking', 'video-telematics'],
  driver: ['video-telematics', 'ai-dashcam', 'dms'],
  'driver monitoring': ['video-telematics', 'ai-dashcam'],
  fatigue: ['video-telematics', 'ai-dashcam'],
  speed: ['vehicle-tracking', 'wired-gps-tracker'],
  overspeed: ['vehicle-tracking', 'wired-gps-tracker'],
  geofence: ['vehicle-tracking'],
  logistics: ['asset-logistics', 'vehicle-tracking'],
  cargo: ['asset-logistics', 'e-lock-tracker', 'container-tracking'],
  school: ['vehicle-tracking', 'adas-mdvr'],
  bus: ['vehicle-tracking', 'adas-mdvr', 'ai-dashcam'],
  truck: ['vehicle-tracking', 'mdvr', 'ai-dashcam'],
  government: ['vehicle-tracking', 'ais-gps-device'],
  compliance: ['vehicle-tracking', 'ais-gps-device'],
  location: ['vehicle-tracking', 'asset-logistics'],
  'real time': ['vehicle-tracking', 'video-telematics'],
  temperature: ['fuel-sensors', 'asset-logistics'],
  remote: ['vehicle-tracking', 'e-lock-tracker'],
  construction: ['vehicle-tracking', 'asset-logistics'],
  mining: ['vehicle-tracking', 'ais-gps-device'],
  ev: ['vehicle-tracking'],
  electric: ['vehicle-tracking'],
  pet: [],
  waste: [],
  transit: ['vehicle-tracking'],
};

/* ── Fleet size extraction ── */
function extractFleetSize(text) {
  const match = text.match(/(\d+)\s*(truck|vehicle|car|bus|fleet|unit)/i);
  return match ? parseInt(match[1]) : null;
}

/* ── Score a single product against a query ── */
function scoreProduct(product, tokens, rawQuery, matchedCategories) {
  let score = 0;
  const name = (product.name || '').toLowerCase();
  const desc = (product.shortDescription || product.description || '').toLowerCase();
  const features = (product.features || []).join(' ').toLowerCase();
  const catId = (product.category || '').toLowerCase();
  const subId = (product.subcategory || '').toLowerCase();
  const specText = JSON.stringify(product.specifications || {}).toLowerCase();

  for (const token of tokens) {
    if (token.length < 2) continue;
    // Name match — highest weight
    if (name === token) score += 120;
    else if (name.includes(token)) score += 60;
    // Short description
    if (desc.includes(token)) score += 25;
    // Features
    if (features.includes(token)) score += 20;
    // Spec text
    if (specText.includes(token)) score += 10;
  }

  // Category match from keyword/problem analysis
  for (const cat of matchedCategories) {
    if (catId === cat || subId === cat) score += 45;
  }

  // Boost for full phrase match in name
  if (name.includes(rawQuery.toLowerCase().trim())) score += 80;

  return score;
}

/* ── Generate AI explanation ── */
function generateExplanation(rawQuery, matchedCategories, fleetSize) {
  const q = rawQuery.toLowerCase();
  const lines = [];

  if (fleetSize) {
    lines.push(`Fleet size detected: **${fleetSize} vehicles**`);
  }

  if (q.includes('theft') || q.includes('fuel theft')) {
    lines.push('Fuel theft concern — recommending fuel level sensors and GPS trackers');
  }
  if (q.includes('accident') || q.includes('collision')) {
    lines.push('Safety concern — recommending AI dashcams and ADAS devices');
  }
  if (q.includes('driver')) {
    lines.push('Driver monitoring — recommending DMS-enabled cameras');
  }
  if (q.includes('compliance') || q.includes('government') || q.includes('ais')) {
    lines.push('AIS-140 compliance — showing government-approved devices');
  }
  if (q.includes('cargo') || q.includes('container') || q.includes('logistics')) {
    lines.push('Logistics tracking — recommending asset trackers and e-locks');
  }
  if (matchedCategories.some(c => c.includes('video'))) {
    lines.push('Video telematics solutions recommended for your use case');
  }

  if (lines.length === 0) {
    lines.push(`Showing results for "${rawQuery}"`);
  }

  return lines;
}

/* ── Main AI Search function ── */
export function aiSearch(rawQuery, allProducts) {
  if (!rawQuery || rawQuery.trim().length < 2) {
    return { results: allProducts, explanation: [], fleetSize: null, query: rawQuery };
  }

  const q = rawQuery.toLowerCase().trim();

  // Tokenize: split on spaces and punctuation
  const tokens = q
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1 && !['the', 'and', 'for', 'with', 'need', 'want', 'have', 'our', 'my', 'is', 'are', 'a', 'an', 'in', 'of', 'to', 'e', 'g'].includes(t));

  // Collect matched categories from keywords
  const matchedCategories = new Set();

  // Single-token category lookup
  for (const token of tokens) {
    const cats = CATEGORY_KEYWORDS[token];
    if (cats) cats.forEach(c => matchedCategories.add(c));
  }

  // Multi-word problem phrases
  for (const [phrase, cats] of Object.entries(PROBLEM_MAP)) {
    if (q.includes(phrase)) {
      cats.forEach(c => matchedCategories.add(c));
    }
  }

  // Also check each token against PROBLEM_MAP
  for (const token of tokens) {
    const cats = PROBLEM_MAP[token];
    if (cats) cats.forEach(c => matchedCategories.add(c));
  }

  const fleetSize = extractFleetSize(q);

  // Score all products
  const scored = allProducts.map(p => ({
    ...p,
    _score: scoreProduct(p, tokens, q, [...matchedCategories])
  }));

  // Filter to score > 0, sort descending
  const results = scored
    .filter(p => p._score > 0)
    .sort((a, b) => b._score - a._score);

  // If nothing matched, return all (fallback)
  const finalResults = results.length > 0 ? results : allProducts;

  const explanation = generateExplanation(q, [...matchedCategories], fleetSize);

  return {
    results: finalResults,
    explanation,
    fleetSize,
    query: rawQuery,
    matchedCategories: [...matchedCategories],
    isAIMode: explanation.length > 0 && results.length > 0
  };
}

/* ── AI Suggestions ── */
export const AI_SUGGESTIONS = [
  '30 trucks, diesel theft, need accident proof',
  'school bus fleet, need ADAS and driver monitoring',
  'cargo containers, need GPS tracking and e-lock',
  'AIS-140 compliant devices for commercial vehicles',
  'fuel level monitoring for 50 trucks',
  'AI dashcam for logistics fleet safety',
];
