import React from 'react';

/**
 * Clean SVG icons for all 20 NETC Vehicle Categories.
 * Styled matching the reference screenshots.
 */
export function VehicleIcon({ name, className = 'vehicle-icon-svg' }) {
  switch (name) {
    case 'car':
      return (
        <svg viewBox="0 0 60 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Car body */}
          <path d="M6 18 C6 15 9 14 13 13 L20 8 C22 6 25 5 28 5 L40 5 C43 5 46 7 48 10 L53 14 C56 15 57 16 57 18 L57 21 H52 C52 18 49 16 46 16 C43 16 40 18 40 21 H20 C20 18 17 16 14 16 C11 16 8 18 8 21 H6 Z" fill="#94A3B8" />
          {/* Windows */}
          <path d="M22 9 L28 7 H34 V13 H18 L22 9 Z" fill="#E2E8F0" />
          <path d="M37 7 H41 C43 7 45 8 46 10 L48 13 H37 V7 Z" fill="#E2E8F0" />
          {/* Wheels */}
          <circle cx="14" cy="21" r="4.5" fill="#334155" />
          <circle cx="14" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="46" cy="21" r="4.5" fill="#334155" />
          <circle cx="46" cy="21" r="2" fill="#E2E8F0" />
        </svg>
      );

    case 'mini-truck':
      return (
        <svg viewBox="0 0 60 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Cargo bed */}
          <rect x="6" y="9" width="30" height="12" rx="1.5" fill="#94A3B8" />
          {/* Cab */}
          <path d="M37 9 H46 C49 9 51 12 51 15 L51 21 H37 V9 Z" fill="#F97316" />
          {/* Windshield */}
          <path d="M40 11 H45 C47 11 48 13 48 15 H40 V11 Z" fill="#E0F2FE" />
          {/* Wheels */}
          <circle cx="14" cy="21" r="4.5" fill="#334155" />
          <circle cx="14" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="44" cy="21" r="4.5" fill="#334155" />
          <circle cx="44" cy="21" r="2" fill="#E2E8F0" />
        </svg>
      );

    case 'truck-2axle':
      return (
        <svg viewBox="0 0 64 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Box container */}
          <rect x="5" y="7" width="36" height="14" rx="2" fill="#CBD5E1" />
          {/* Cab */}
          <path d="M42 9 H49 C52 9 55 12 55 15 L55 21 H42 V9 Z" fill="#F97316" />
          <path d="M45 11 H48 C50 11 51 13 51 15 H45 V11 Z" fill="#BAE6FD" />
          {/* Wheels */}
          <circle cx="15" cy="21" r="4.5" fill="#1E293B" />
          <circle cx="15" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="48" cy="21" r="4.5" fill="#1E293B" />
          <circle cx="48" cy="21" r="2" fill="#E2E8F0" />
        </svg>
      );

    case 'minibus':
      return (
        <svg viewBox="0 0 60 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Bus body */}
          <rect x="6" y="8" width="48" height="13" rx="3" fill="#FDE047" />
          {/* Windows */}
          <rect x="10" y="10" width="7" height="5" rx="1" fill="#BAE6FD" />
          <rect x="20" y="10" width="7" height="5" rx="1" fill="#BAE6FD" />
          <rect x="30" y="10" width="7" height="5" rx="1" fill="#BAE6FD" />
          <path d="M40 10 H47 C48 10 49 11 49 13 L49 15 H40 V10 Z" fill="#BAE6FD" />
          {/* Wheels */}
          <circle cx="15" cy="21" r="4.5" fill="#1E293B" />
          <circle cx="15" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="44" cy="21" r="4.5" fill="#1E293B" />
          <circle cx="44" cy="21" r="2" fill="#E2E8F0" />
        </svg>
      );

    case 'bus-2axle':
      return (
        <svg viewBox="0 0 68 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Long 2-axle Transit Bus */}
          <rect x="5" y="7" width="56" height="14" rx="3" fill="#3B82F6" />
          {/* Passenger Windows */}
          <rect x="9" y="9" width="7" height="5" rx="1" fill="#E0F2FE" />
          <rect x="18" y="9" width="7" height="5" rx="1" fill="#E0F2FE" />
          <rect x="27" y="9" width="7" height="5" rx="1" fill="#E0F2FE" />
          <rect x="36" y="9" width="7" height="5" rx="1" fill="#E0F2FE" />
          <path d="M46 9 H56 C57 9 58 10 58 12 L58 14 H46 V9 Z" fill="#E0F2FE" />
          {/* Wheels (2 axles) */}
          <circle cx="16" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="16" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="50" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="50" cy="21" r="2" fill="#E2E8F0" />
        </svg>
      );

    case 'truck-3axle':
      return (
        <svg viewBox="0 0 68 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Cargo Container */}
          <rect x="5" y="7" width="40" height="14" rx="2" fill="#CBD5E1" />
          {/* Cab */}
          <path d="M46 9 H53 C56 9 58 12 58 15 L58 21 H46 V9 Z" fill="#F97316" />
          <path d="M49 11 H52 C54 11 55 13 55 15 H49 V11 Z" fill="#BAE6FD" />
          {/* Wheels: 3 axles (2 rear, 1 front) */}
          <circle cx="13" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="13" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="23" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="23" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="52" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="52" cy="21" r="2" fill="#E2E8F0" />
        </svg>
      );

    case 'bus-3axle':
      return (
        <svg viewBox="0 0 68 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* 3-axle Luxury Coach */}
          <rect x="5" y="7" width="56" height="14" rx="3" fill="#6366F1" />
          {/* Windows */}
          <rect x="9" y="9" width="7" height="5" rx="1" fill="#E0F2FE" />
          <rect x="18" y="9" width="7" height="5" rx="1" fill="#E0F2FE" />
          <rect x="27" y="9" width="7" height="5" rx="1" fill="#E0F2FE" />
          <rect x="36" y="9" width="7" height="5" rx="1" fill="#E0F2FE" />
          <path d="M46 9 H56 C57 9 58 10 58 12 L58 14 H46 V9 Z" fill="#E0F2FE" />
          {/* Wheels: 3 axles (2 rear, 1 front) */}
          <circle cx="13" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="13" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="22" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="22" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="52" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="52" cy="21" r="2" fill="#E2E8F0" />
        </svg>
      );

    case 'truck-articulated':
      return (
        <svg viewBox="0 0 72 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Articulated Trailer */}
          <rect x="4" y="7" width="34" height="14" rx="2" fill="#94A3B8" />
          {/* Hitch connector */}
          <line x1="38" y1="18" x2="43" y2="18" stroke="#475569" strokeWidth="2" />
          {/* Tractor Cab */}
          <path d="M43 11 H52 C55 11 58 14 58 17 L58 21 H43 V11 Z" fill="#EA580C" />
          <path d="M46 13 H51 C53 13 54 15 54 17 H46 V13 Z" fill="#BAE6FD" />
          {/* 3 Axles */}
          <circle cx="11" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="11" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="34" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="34" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="52" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="52" cy="21" r="2" fill="#E2E8F0" />
        </svg>
      );

    case 'tanker-4axle':
      return (
        <svg viewBox="0 0 74 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Tanker cylindrical body */}
          <rect x="5" y="8" width="44" height="12" rx="6" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />
          {/* Cab */}
          <path d="M50 9 H57 C60 9 62 12 62 15 L62 21 H50 V9 Z" fill="#F97316" />
          <path d="M53 11 H56 C58 11 59 13 59 15 H53 V11 Z" fill="#BAE6FD" />
          {/* 4 Axles: 2 rear, 1 mid, 1 front */}
          <circle cx="12" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="12" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="21" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="21" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="38" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="38" cy="21" r="2" fill="#E2E8F0" />
          <circle cx="56" cy="21" r="4.5" fill="#0F172A" />
          <circle cx="56" cy="21" r="2" fill="#E2E8F0" />
        </svg>
      );

    case 'truck-5axle':
      return (
        <svg viewBox="0 0 78 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Long Freight Trailer */}
          <rect x="4" y="7" width="50" height="14" rx="2" fill="#CBD5E1" />
          {/* Cab */}
          <path d="M55 9 H62 C65 9 67 12 67 15 L67 21 H55 V9 Z" fill="#F97316" />
          <path d="M58 11 H61 C63 11 64 13 64 15 H58 V11 Z" fill="#BAE6FD" />
          {/* 5 Axles */}
          <circle cx="11" cy="21" r="4" fill="#0F172A" />
          <circle cx="11" cy="21" r="1.5" fill="#E2E8F0" />
          <circle cx="19" cy="21" r="4" fill="#0F172A" />
          <circle cx="19" cy="21" r="1.5" fill="#E2E8F0" />
          <circle cx="27" cy="21" r="4" fill="#0F172A" />
          <circle cx="27" cy="21" r="1.5" fill="#E2E8F0" />
          <circle cx="48" cy="21" r="4" fill="#0F172A" />
          <circle cx="48" cy="21" r="1.5" fill="#E2E8F0" />
          <circle cx="61" cy="21" r="4" fill="#0F172A" />
          <circle cx="61" cy="21" r="1.5" fill="#E2E8F0" />
        </svg>
      );

    case 'tanker-6axle':
      return (
        <svg viewBox="0 0 80 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Heavy 6-axle Tanker */}
          <rect x="4" y="8" width="52" height="12" rx="6" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
          <path d="M57 9 H64 C67 9 69 12 69 15 L69 21 H57 V9 Z" fill="#F97316" />
          <path d="M60 11 H63 C65 11 66 13 66 15 H60 V11 Z" fill="#BAE6FD" />
          {/* 6 Axles */}
          <circle cx="10" cy="21" r="4" fill="#0F172A" />
          <circle cx="17" cy="21" r="4" fill="#0F172A" />
          <circle cx="24" cy="21" r="4" fill="#0F172A" />
          <circle cx="43" cy="21" r="4" fill="#0F172A" />
          <circle cx="50" cy="21" r="4" fill="#0F172A" />
          <circle cx="63" cy="21" r="4" fill="#0F172A" />
        </svg>
      );

    case 'truck-multiaxle':
      return (
        <svg viewBox="0 0 84 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Heavy Multi-Axle Oversize Hauler (7+ Axles) */}
          <rect x="4" y="10" width="56" height="10" rx="1.5" fill="#94A3B8" />
          <path d="M61 9 H68 C71 9 73 12 73 15 L73 21 H61 V9 Z" fill="#EA580C" />
          <path d="M64 11 H67 C69 11 70 13 70 15 H64 V11 Z" fill="#BAE6FD" />
          {/* 7 wheel lines */}
          <circle cx="8" cy="21" r="3.5" fill="#0F172A" />
          <circle cx="15" cy="21" r="3.5" fill="#0F172A" />
          <circle cx="22" cy="21" r="3.5" fill="#0F172A" />
          <circle cx="29" cy="21" r="3.5" fill="#0F172A" />
          <circle cx="45" cy="21" r="3.5" fill="#0F172A" />
          <circle cx="52" cy="21" r="3.5" fill="#0F172A" />
          <circle cx="67" cy="21" r="3.5" fill="#0F172A" />
        </svg>
      );

    case 'earth-mover':
      return (
        <svg viewBox="0 0 60 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Excavator / Backhoe Cab */}
          <rect x="18" y="10" width="16" height="10" rx="2" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
          <rect x="22" y="12" width="6" height="5" fill="#BAE6FD" />
          {/* Tracks / Wheels */}
          <rect x="14" y="20" width="24" height="4" rx="2" fill="#334155" />
          {/* Boom and Bucket */}
          <path d="M18 14 L8 8 L4 16 L10 18" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'construction-crane':
      return (
        <svg viewBox="0 0 60 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Mobile Crane Carrier */}
          <rect x="10" y="14" width="36" height="7" rx="1.5" fill="#FACC15" />
          {/* Crane Boom */}
          <path d="M14 14 L44 4 L48 8" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
          {/* Wheels */}
          <circle cx="16" cy="21" r="4" fill="#0F172A" />
          <circle cx="28" cy="21" r="4" fill="#0F172A" />
          <circle cx="40" cy="21" r="4" fill="#0F172A" />
        </svg>
      );

    case 'two-wheeler':
      return (
        <svg viewBox="0 0 50 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Motorcycle frame */}
          <path d="M12 20 L22 13 L32 13 L38 20" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 13 L26 8 H30" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          {/* Wheels */}
          <circle cx="12" cy="20" r="5" fill="#64748B" />
          <circle cx="12" cy="20" r="2.5" fill="#FFFFFF" />
          <circle cx="38" cy="20" r="5" fill="#64748B" />
          <circle cx="38" cy="20" r="2.5" fill="#FFFFFF" />
        </svg>
      );

    case 'auto-passenger':
      return (
        <svg viewBox="0 0 50 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Auto Rickshaw Passenger */}
          <path d="M10 20 H36 L36 14 C36 10 32 8 28 8 H16 C12 8 10 10 10 14 Z" fill="#94A3B8" />
          <path d="M16 11 H26 V16 H16 Z" fill="#E2E8F0" />
          <path d="M28 11 H33 L33 16 H28 Z" fill="#E2E8F0" />
          <circle cx="14" cy="20" r="4" fill="#334155" />
          <circle cx="32" cy="20" r="4" fill="#334155" />
        </svg>
      );

    case 'auto-freight':
      return (
        <svg viewBox="0 0 50 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Auto Rickshaw Goods/Freight */}
          <rect x="8" y="11" width="18" height="9" fill="#94A3B8" />
          <path d="M27 11 H34 C36 11 38 13 38 15 L38 20 H27 V11 Z" fill="#64748B" />
          <circle cx="14" cy="20" r="4" fill="#334155" />
          <circle cx="34" cy="20" r="4" fill="#334155" />
        </svg>
      );

    case 'tractor':
      return (
        <svg viewBox="0 0 50 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Tractor Hood and Steering */}
          <rect x="18" y="12" width="16" height="8" rx="2" fill="#94A3B8" />
          <path d="M16 9 H18 V16 H16 Z" fill="#475569" />
          {/* Wheels: Small front, huge rear */}
          <circle cx="12" cy="18" r="6" fill="#334155" />
          <circle cx="12" cy="18" r="3" fill="#E2E8F0" />
          <circle cx="34" cy="20" r="4" fill="#334155" />
          <circle cx="34" cy="20" r="2" fill="#E2E8F0" />
        </svg>
      );

    case 'tractor-trailer':
      return (
        <svg viewBox="0 0 64 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Farm trailer */}
          <rect x="6" y="12" width="22" height="8" fill="#94A3B8" />
          <circle cx="17" cy="20" r="4" fill="#334155" />
          {/* Hitch */}
          <line x1="28" y1="18" x2="33" y2="18" stroke="#64748B" strokeWidth="2" />
          {/* Tractor */}
          <rect x="33" y="12" width="16" height="8" rx="2" fill="#94A3B8" />
          <circle cx="38" cy="18" r="6" fill="#334155" />
          <circle cx="38" cy="18" r="3" fill="#E2E8F0" />
          <circle cx="52" cy="20" r="4" fill="#334155" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 60 28" fill="none" className={className}>
          <rect x="10" y="8" width="40" height="12" rx="2" fill="#CBD5E1" />
          <circle cx="18" cy="20" r="4" fill="#334155" />
          <circle cx="42" cy="20" r="4" fill="#334155" />
        </svg>
      );
  }
}
