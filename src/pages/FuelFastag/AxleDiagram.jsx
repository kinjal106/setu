import React from 'react';

/**
 * How to count axles illustration
 * Replicates the truck axle counting diagram from reference image 2:
 * Orange truck cab + light blue trailer + 5 numbered wheel lines (1..5)
 */
export default function AxleDiagram() {
  return (
    <div className="axle-diagram-box">
      <h3 className="axle-diagram-title">How to count axles</h3>

      <div className="axle-diagram-row">
        {/* Left Side: Truck graphic & formula */}
        <div className="axle-diagram-left">
          <div className="axle-diagram-canvas-wrap">
            <svg
              viewBox="0 0 520 180"
              className="axle-diagram-svg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Subtle Ground Horizon Line */}
              <line x1="30" y1="135" x2="490" y2="135" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 6" />

              {/* ── 5 Numbered Axle Markers & Vertical Dashed Lines ── */}
              {/* Axle 1 */}
              <line x1="90" y1="36" x2="90" y2="130" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="90" cy="24" r="12" fill="#2563EB" />
              <text x="90" y="28" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">1</text>

              {/* Axle 2 */}
              <line x1="140" y1="36" x2="140" y2="130" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="140" cy="24" r="12" fill="#2563EB" />
              <text x="140" y="28" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">2</text>

              {/* Axle 3 */}
              <line x1="320" y1="36" x2="320" y2="130" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="320" cy="24" r="12" fill="#2563EB" />
              <text x="320" y="28" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">3</text>

              {/* Axle 4 */}
              <line x1="365" y1="36" x2="365" y2="130" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="365" cy="24" r="12" fill="#2563EB" />
              <text x="365" y="28" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">4</text>

              {/* Axle 5 */}
              <line x1="435" y1="36" x2="435" y2="130" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="435" cy="24" r="12" fill="#2563EB" />
              <text x="435" y="28" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">5</text>

              {/* ── Truck Trailer Body (Light Blue/Grey) ── */}
              <rect
                x="60"
                y="54"
                width="325"
                height="62"
                rx="4"
                fill="#E0F2FE"
                stroke="#1E293B"
                strokeWidth="2.5"
              />

              {/* Trailer Cargo Ribs / Seams */}
              <line x1="180" y1="54" x2="180" y2="116" stroke="#BAE6FD" strokeWidth="2" />
              <line x1="270" y1="54" x2="270" y2="116" stroke="#BAE6FD" strokeWidth="2" />

              {/* ── Truck Cab (Orange with windshield) ── */}
              <path
                d="M385 54 H420 C440 54 455 70 458 90 L460 116 H385 V54 Z"
                fill="#F97316"
                stroke="#1E293B"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Cab Window */}
              <path
                d="M405 60 H425 C434 60 442 68 444 78 L445 86 H405 V60 Z"
                fill="#BAE6FD"
                stroke="#1E293B"
                strokeWidth="1.8"
              />

              {/* Door Handle */}
              <rect x="408" y="93" width="7" height="2.5" rx="1" fill="#1E293B" />

              {/* ── Wheels (5 lines of wheels) ── */}
              {/* Wheel 1 */}
              <circle cx="90" cy="126" r="13" fill="#1E293B" />
              <circle cx="90" cy="126" r="6" fill="#94A3B8" />

              {/* Wheel 2 */}
              <circle cx="140" cy="126" r="13" fill="#1E293B" />
              <circle cx="140" cy="126" r="6" fill="#94A3B8" />

              {/* Wheel 3 */}
              <circle cx="320" cy="126" r="13" fill="#1E293B" />
              <circle cx="320" cy="126" r="6" fill="#94A3B8" />

              {/* Wheel 4 */}
              <circle cx="365" cy="126" r="13" fill="#1E293B" />
              <circle cx="365" cy="126" r="6" fill="#94A3B8" />

              {/* Wheel 5 */}
              <circle cx="435" cy="126" r="13" fill="#1E293B" />
              <circle cx="435" cy="126" r="6" fill="#94A3B8" />
            </svg>

            {/* Dynamic Calculation Formula */}
            <div className="axle-diagram-summary">
              <span className="axle-diagram-formula">
                <strong>5 lines of wheels = 5 axles</strong> → <span className="axle-highlight-vc">VC12</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Explanatory Bullet Points */}
        <div className="axle-diagram-right">
          <ul className="axle-diagram-bullets">
            <li className="axle-bullet-item">
              <span className="axle-bullet-dot">•</span>
              <span className="axle-bullet-text">
                Look from the side and count each line of wheels, front to back.
              </span>
            </li>
            <li className="axle-bullet-item">
              <span className="axle-bullet-dot">•</span>
              <span className="axle-bullet-text">
                Twin tyres on the same line are one axle.
              </span>
            </li>
            <li className="axle-bullet-item">
              <span className="axle-bullet-dot">•</span>
              <span className="axle-bullet-text">
                For a trailer, count the axles of the truck and the trailer together.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
