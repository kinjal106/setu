import React from 'react';

export function SolutionCardVisual({ solutionId, theme = 'dark' }) {
  switch (solutionId) {
    case 'trakzee-mini':
      return (
        <div className="sol-visual sol-visual--trakzee">
          <div className="sol-device-frame sol-device-frame--dark">
            <div className="sol-phone-notch" />
            <div className="sol-phone-screen">
              {/* Map background with animated route */}
              <svg className="sol-map-bg" viewBox="0 0 320 180" fill="none">
                <rect width="320" height="180" fill="#0C1425" />
                {/* Road grid */}
                <path d="M0 60 H320 M0 120 H320 M80 0 V180 M200 0 V180 M280 0 V180" stroke="#1E293B" strokeWidth="1.5" />
                <path d="M-10 150 Q100 130 140 80 T300 40" stroke="#006EFF" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 4" />
                <circle cx="140" cy="80" r="16" fill="#006EFF" fillOpacity="0.2" />
                <circle cx="140" cy="80" r="7" fill="#006EFF" stroke="#FFFFFF" strokeWidth="2.5" />
                {/* Start & End pins */}
                <circle cx="20" cy="145" r="4" fill="#10B981" />
                <circle cx="295" cy="42" r="4" fill="#EF4444" />
              </svg>

              {/* HUD Overlay Cards */}
              <div className="sol-hud-card sol-hud-card--top">
                <div className="sol-hud-status-dot sol-hud-status-dot--green" />
                <span className="sol-hud-text">Truck #GJ-05-4029 • <strong>Ignition ON</strong></span>
                <span className="sol-hud-badge">4G LTE</span>
              </div>

              <div className="sol-hud-bottom-row">
                <div className="sol-metric-pill">
                  <span className="sol-metric-label">SPEED</span>
                  <span className="sol-metric-val">62 <small>km/h</small></span>
                </div>
                <div className="sol-metric-pill">
                  <span className="sol-metric-label">TODAY DIST</span>
                  <span className="sol-metric-val">142 <small>km</small></span>
                </div>
                <div className="sol-metric-pill">
                  <span className="sol-metric-label">FUEL</span>
                  <span className="sol-metric-val">78%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'petzee':
      return (
        <div className="sol-visual sol-visual--petzee">
          <div className="sol-device-frame sol-device-frame--light">
            <div className="sol-phone-notch sol-phone-notch--light" />
            <div className="sol-phone-screen sol-phone-screen--light">
              {/* Pet Status Header */}
              <div className="sol-pet-profile">
                <div className="sol-pet-avatar">
                  <span>🐕</span>
                </div>
                <div className="sol-pet-meta">
                  <div className="sol-pet-name">Buddy • Golden Retriever</div>
                  <div className="sol-pet-zone">
                    <span className="sol-zone-dot" /> Inside Safe Zone (Home Garden)
                  </div>
                </div>
              </div>

              {/* Geofence Map */}
              <svg className="sol-pet-map" viewBox="0 0 300 130" fill="none">
                <rect width="300" height="130" rx="12" fill="#F0FDF4" stroke="#DCFCE7" />
                {/* Safe zone circle */}
                <circle cx="150" cy="65" r="46" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeWidth="2" strokeDasharray="4 3" />
                <circle cx="150" cy="65" r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                <text x="150" y="85" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="600">Home Safe Zone (500m)</text>
              </svg>

              {/* Quick vitals */}
              <div className="sol-pet-stats">
                <div className="sol-pet-chip">
                  <span className="sol-chip-icon">🔋</span>
                  <span>92% Battery (7 days)</span>
                </div>
                <div className="sol-pet-chip">
                  <span className="sol-chip-icon">🐾</span>
                  <span>3.8 km Walked Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'elexee':
      return (
        <div className="sol-visual sol-visual--elexee">
          <div className="sol-device-frame sol-device-frame--dark">
            <div className="sol-ev-console">
              {/* EV Wireframe Outline Graphic */}
              <div className="sol-ev-hud-header">
                <div className="sol-ev-badge">⚡ DUAL MOTOR EV</div>
                <div className="sol-ev-state">CHARGING (FAST DC)</div>
              </div>

              <div className="sol-ev-battery-meter">
                <div className="sol-ev-battery-circle">
                  <svg viewBox="0 0 120 120" className="sol-ev-svg">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#1E293B" strokeWidth="10" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="10"
                      strokeDasharray="314"
                      strokeDashoffset="56"
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="sol-ev-battery-center">
                    <span className="sol-ev-battery-num">82%</span>
                    <span className="sol-ev-battery-lbl">SOC</span>
                  </div>
                </div>

                <div className="sol-ev-stats-col">
                  <div className="sol-ev-stat">
                    <span className="sol-ev-stat-lbl">EST. RANGE</span>
                    <span className="sol-ev-stat-val">340 <small>km</small></span>
                  </div>
                  <div className="sol-ev-stat">
                    <span className="sol-ev-stat-lbl">POWER DRAW</span>
                    <span className="sol-ev-stat-val">60 <small>kW</small></span>
                  </div>
                  <div className="sol-ev-stat">
                    <span className="sol-ev-stat-lbl">BATTERY HEALTH</span>
                    <span className="sol-ev-stat-val sol-ev-stat-val--good">98.4%</span>
                  </div>
                </div>
              </div>

              <div className="sol-ev-footer-bar">
                <span className="sol-ev-plug-icon">🔌</span>
                <span>Plugged in at Supercharger Bay #04 • Full in 24m</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'taskeye':
      return (
        <div className="sol-visual sol-visual--taskeye">
          <div className="sol-device-frame sol-device-frame--dark">
            <div className="sol-phone-notch" />
            <div className="sol-phone-screen">
              <div className="sol-task-header">
                <div className="sol-task-agent">
                  <div className="sol-agent-avatar">VT</div>
                  <div className="sol-agent-info">
                    <div className="sol-agent-name">Vikram Telematics</div>
                    <div className="sol-agent-role">Field Engineer • On Duty</div>
                  </div>
                </div>
                <span className="sol-task-badge">4 Assigned</span>
              </div>

              {/* Active Ticket Card */}
              <div className="sol-ticket-card">
                <div className="sol-ticket-top">
                  <span className="sol-ticket-id">TASK #8429</span>
                  <span className="sol-ticket-status">IN PROGRESS</span>
                </div>
                <div className="sol-ticket-title">GPS Tracker Installation & Testing</div>
                <div className="sol-ticket-loc">📍 Logistics Hub, Sector 62</div>

                <div className="sol-checklist">
                  <div className="sol-check-item sol-check-item--done">✔ GPS Arrived & Verified</div>
                  <div className="sol-check-item sol-check-item--done">✔ Ignition Wire Connected</div>
                  <div className="sol-check-item">○ Client Signature & Photo</div>
                </div>
              </div>

              <div className="sol-task-gps-verified">
                <span>📍 GPS Check-in verified at 09:42 AM</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'smart-waste':
      return (
        <div className="sol-visual sol-visual--smartwaste">
          <div className="sol-device-frame sol-device-frame--light">
            <div className="sol-waste-console">
              <div className="sol-waste-head">
                <span className="sol-waste-badge">MUNICIPAL ZONE 4</span>
                <span className="sol-waste-opt">-24% Fuel Optimized</span>
              </div>

              <div className="sol-bins-grid">
                <div className="sol-bin-card sol-bin-card--full">
                  <div className="sol-bin-visual">
                    <div className="sol-bin-fill sol-bin-fill--92" />
                  </div>
                  <div className="sol-bin-info">
                    <div className="sol-bin-id">BIN #104</div>
                    <div className="sol-bin-status">92% FULL</div>
                    <span className="sol-bin-urgent">🚨 Pickup Required</span>
                  </div>
                </div>

                <div className="sol-bin-card">
                  <div className="sol-bin-visual">
                    <div className="sol-bin-fill sol-bin-fill--45" />
                  </div>
                  <div className="sol-bin-info">
                    <div className="sol-bin-id">BIN #105</div>
                    <div className="sol-bin-status">45% Normal</div>
                    <span className="sol-bin-ok">Next Cycle</span>
                  </div>
                </div>
              </div>

              <div className="sol-truck-route-bar">
                <span className="sol-truck-icon">🚛</span>
                <span>Garbage Truck #03 en route to Bin #104 (ETA 8 mins)</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'smart-tranzit':
      return (
        <div className="sol-visual sol-visual--smarttranzit">
          <div className="sol-device-frame sol-device-frame--dark">
            <div className="sol-transit-console">
              <div className="sol-transit-top">
                <div className="sol-transit-route">ROUTE 42A • EXPRESS</div>
                <div className="sol-transit-on-time">ON SCHEDULE</div>
              </div>

              <div className="sol-occupancy-row">
                <div className="sol-occupancy-bar-wrap">
                  <div className="sol-occupancy-bar" style={{ width: '75%' }} />
                </div>
                <div className="sol-occupancy-label">
                  <span>34 / 45 Seats</span>
                  <span className="sol-occupancy-pct">75% Occupancy</span>
                </div>
              </div>

              {/* Stop Timeline */}
              <div className="sol-stops-list">
                <div className="sol-stop-item sol-stop-item--active">
                  <span className="sol-stop-dot" />
                  <span className="sol-stop-name">Central Metro Interchange</span>
                  <span className="sol-stop-time">ARRIVING</span>
                </div>
                <div className="sol-stop-item">
                  <span className="sol-stop-dot sol-stop-dot--pending" />
                  <span className="sol-stop-name">Tech Park North Gate</span>
                  <span className="sol-stop-time">6 mins</span>
                </div>
                <div className="sol-stop-item">
                  <span className="sol-stop-dot sol-stop-dot--pending" />
                  <span className="sol-stop-name">International Airport</span>
                  <span className="sol-stop-time">24 mins</span>
                </div>
              </div>

              <div className="sol-transit-footer">
                <span>💳 Tap-to-Pay AFC Online • 142 tickets scanned</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'smartbus':
      return (
        <div className="sol-visual sol-visual--smartbus">
          <div className="sol-device-frame sol-device-frame--light">
            <div className="sol-bus-console">
              <div className="sol-bus-top">
                <span className="sol-bus-badge">🚌 SCHOOL BUS #08</span>
                <span className="sol-bus-speed">Safe Speed: 34 km/h</span>
              </div>

              {/* Student RFID Boarding Alert */}
              <div className="sol-student-alert">
                <div className="sol-student-avatar">👦</div>
                <div className="sol-student-details">
                  <div className="sol-student-name">Aryan Sharma (Class 6-B)</div>
                  <div className="sol-student-event">RFID Tap: Boarded at 07:42 AM</div>
                </div>
              </div>

              {/* Parent Live ETA card */}
              <div className="sol-parent-eta-box">
                <div className="sol-eta-val">4 MINS</div>
                <div className="sol-eta-sub">Bus arriving at your home stop (800m away)</div>
              </div>

              <div className="sol-bus-route-status">
                <span className="sol-bus-route-dot" />
                <span>Next Stop: Oakwood Residency • 3 students waiting</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'gridzee':
      return (
        <div className="sol-visual sol-visual--gridzee">
          <div className="sol-device-frame sol-device-frame--dark">
            <div className="sol-gridzee-console">
              <div className="sol-gridzee-top">
                <div className="sol-grid-badge">RTLS WAREHOUSE INDOOR</div>
                <div className="sol-grid-acc">BLE ACCURACY &lt; 1m</div>
              </div>

              {/* 2.5D Isometric Floor Grid Graphic */}
              <div className="sol-grid-floor">
                <svg viewBox="0 0 280 120" className="sol-grid-svg">
                  {/* Floor grid perspective */}
                  <polygon points="140,10 270,55 140,110 10,55" fill="#131127" stroke="#312E81" strokeWidth="1.5" />
                  <line x1="75" y1="32" x2="205" y2="82" stroke="#4338CA" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="205" y1="32" x2="75" y2="82" stroke="#4338CA" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Beacon Pulses */}
                  <circle cx="140" cy="55" r="22" fill="#8B5CF6" fillOpacity="0.25" />
                  <circle cx="140" cy="55" r="5" fill="#A78BFA" stroke="#FFFFFF" strokeWidth="2" />

                  {/* Asset markers */}
                  <circle cx="90" cy="50" r="4" fill="#38BDF8" />
                  <circle cx="190" cy="65" r="4" fill="#10B981" />
                </svg>

                <div className="sol-grid-tags">
                  <span className="sol-grid-tag sol-grid-tag--forklift">🚜 Forklift #02 (Zone B)</span>
                  <span className="sol-grid-tag sol-grid-tag--pallet">📦 Pallet #904 (Zone A)</span>
                </div>
              </div>

              <div className="sol-grid-footer">
                <span>📡 18 BLE Gateways Active • 142 Assets Tracked</span>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
