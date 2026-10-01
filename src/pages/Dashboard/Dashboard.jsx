import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const FLEET_STATS = [
  { label: 'Total Fleet', value: 148, change: '+4 this month', status: 'total', icon: '🚛' },
  { label: 'Active & Moving', value: 92, change: '62% of fleet', status: 'moving', icon: '🟢' },
  { label: 'Idling (Ignition ON)', value: 18, change: '12% of fleet', status: 'idling', icon: '🟡' },
  { label: 'Parked / Stopped', value: 31, change: '21% of fleet', status: 'stopped', icon: '🔵' },
  { label: 'Offline / Inactive', value: 7, change: '5% of fleet', status: 'offline', icon: '⚪' }
];

const TELEMETRY_METRICS = [
  { label: 'Total Distance Run Today', value: '14,820 km', sub: '+12.4% vs yesterday', color: '#2563EB' },
  { label: 'Avg Fleet Fuel Economy', value: '4.2 km/L', sub: 'Target: 4.0 km/L', color: '#10B981' },
  { label: 'Fuel Consumed Today', value: '3,528 L', sub: '₹3,35,160 estimated', color: '#F59E0B' },
  { label: 'Active Safety Alerts', value: '14 Alerts', sub: '3 critical attention', color: '#EF4444' }
];

const SAMPLE_VEHICLES = [
  {
    id: 'MH-04-AB-1204',
    model: 'Tata Signa 4825.TK',
    device: 'PRITHVI 140 (AIS-140)',
    driver: 'Rajesh Sharma',
    speed: '64 km/h',
    ignition: true,
    fuel: '78%',
    location: 'NH-48, Near Vadodara Toll Plaza',
    status: 'moving',
    updated: 'Just now'
  },
  {
    id: 'DL-01-AX-9941',
    model: 'BharatBenz 2823R',
    device: 'BR06 4G LTE Tracker',
    driver: 'Virendra Singh',
    speed: '79 km/h',
    ignition: true,
    fuel: '62%',
    location: 'Delhi-Jaipur Expressway, Rewari',
    status: 'moving',
    updated: '12s ago'
  },
  {
    id: 'KA-03-MG-5521',
    model: 'Ashok Leyland 4220',
    device: 'T5324 SD Card MDVR',
    driver: 'Anil Kumar',
    speed: '0 km/h',
    ignition: true,
    fuel: '45%',
    location: 'Bengaluru Logistics Park, Peenya',
    status: 'idling',
    updated: '45s ago'
  },
  {
    id: 'GJ-05-BX-7712',
    model: 'Eicher Pro 3015',
    device: 'SP BLE-4 Fuel Sensor',
    driver: 'Dinesh Patel',
    speed: '0 km/h',
    ignition: false,
    fuel: '84%',
    location: 'Surat Ring Road Warehouse Depot',
    status: 'stopped',
    updated: '3m ago'
  },
  {
    id: 'MH-12-PQ-3301',
    model: 'Mahindra Blazo X',
    device: 'Eco5 Lite OBD Tracker',
    driver: 'Suresh Patil',
    speed: '0 km/h',
    ignition: false,
    fuel: '12%',
    location: 'Pune Chakan Hub, Bay 4',
    status: 'offline',
    updated: '2h ago'
  }
];

const RECENT_ALERTS = [
  {
    id: 1,
    type: 'SOS Panic Alarm',
    severity: 'critical',
    vehicle: 'MH-04-AB-1204',
    time: '2 mins ago',
    detail: 'Driver pressed SOS panic button near Vadodara highway.'
  },
  {
    id: 2,
    type: 'Overspeed Warning',
    severity: 'warning',
    vehicle: 'DL-01-AX-9941',
    time: '8 mins ago',
    detail: 'Speed recorded 84 km/h (Limit: 75 km/h) on Rewari stretch.'
  },
  {
    id: 3,
    type: 'Geofence Exit',
    severity: 'info',
    vehicle: 'KA-03-MG-5521',
    time: '24 mins ago',
    detail: 'Exited Central Bengaluru Warehouse Yard 2 boundary.'
  },
  {
    id: 4,
    type: 'Fuel Drop / Siphon',
    severity: 'warning',
    vehicle: 'GJ-05-BX-7712',
    time: '41 mins ago',
    detail: 'Sudden fuel level decline of 18 Litres while stationary.'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredVehicles = SAMPLE_VEHICLES.filter(v => {
    if (filterStatus === 'all') return true;
    return v.status === filterStatus;
  });

  return (
    <div className="fleet-dash">
      {/* ── Top Header Bar ── */}
      <div className="fleet-dash__header">
        <div>
          <div className="fleet-dash__badge-row">
            <span className="fleet-dash__live-dot" />
            <span className="fleet-dash__live-text">Live Telematics Pulse · 148 Connected Vehicles</span>
          </div>
          <h1 className="fleet-dash__title">Fleet Operations Dashboard</h1>
          <p className="fleet-dash__subtitle">
            Real-time GPS positioning, driver safety, telemetry health, and depot operational status.
          </p>
        </div>

        <div className="fleet-dash__header-actions">
          <button 
            type="button" 
            className="fleet-dash__btn-setu"
            onClick={() => navigate('/setu')}
            title="Browse Hardware, Trackers, Sensors and Telematics Solutions"
          >
            <span>🛒</span>
            <span>Open Setu Marketplace</span>
            <span className="fleet-dash__btn-badge">23 Products</span>
          </button>
        </div>
      </div>

      {/* ── Row 1: Fleet Status KPI Cards ── */}
      <div className="fleet-dash__kpi-grid">
        {FLEET_STATS.map((stat, idx) => (
          <div 
            key={idx} 
            className={`fleet-kpi-card fleet-kpi-card--${stat.status} ${filterStatus === stat.status ? 'fleet-kpi-card--selected' : ''}`}
            onClick={() => setFilterStatus(filterStatus === stat.status ? 'all' : stat.status)}
            role="button"
            tabIndex={0}
            title={`Filter by ${stat.label}`}
          >
            <div className="fleet-kpi-card__top">
              <span className="fleet-kpi-card__label">{stat.label}</span>
              <span className="fleet-kpi-card__icon">{stat.icon}</span>
            </div>
            <div className="fleet-kpi-card__val">{stat.value}</div>
            <div className="fleet-kpi-card__sub">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* ── Row 2: Telemetry Metrics ── */}
      <div className="fleet-dash__metrics-row">
        {TELEMETRY_METRICS.map((m, idx) => (
          <div key={idx} className="fleet-metric-box">
            <span className="fleet-metric-box__label">{m.label}</span>
            <span className="fleet-metric-box__val" style={{ color: m.color }}>{m.value}</span>
            <span className="fleet-metric-box__sub">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* ── Promotional Setu Banner Card ── */}
      <div className="fleet-setu-banner" onClick={() => navigate('/setu')}>
        <div className="fleet-setu-banner__glow" />
        <div className="fleet-setu-banner__content">
          <div className="fleet-setu-banner__tag">SETU B2B MARKETPLACE</div>
          <h3 className="fleet-setu-banner__title">
            Need more AIS-140 GPS trackers, dual dashcams, or ultrasonic fuel sensors?
          </h3>
          <p className="fleet-setu-banner__desc">
            All devices come pre-configured for Trakzee and Uffizio platforms with 100% GST ITC tax invoices and nationwide depot technician installation.
          </p>
        </div>
        <div className="fleet-setu-banner__cta">
          <button type="button" className="fleet-setu-banner__btn">
            Browse Setu Hardware &amp; Solutions →
          </button>
        </div>
      </div>

      {/* ── Row 3: Grid with Live Map Preview & Alert Center ── */}
      <div className="fleet-dash__main-grid">
        
        {/* Left Column: Simulated Live Fleet Map Preview */}
        <div className="fleet-card fleet-map-card">
          <div className="fleet-card__header">
            <div>
              <h3 className="fleet-card__title">Live Fleet Map</h3>
              <p className="fleet-card__sub">Real-time GPS positioning &amp; moving routes across India</p>
            </div>
            <button 
              type="button" 
              className="fleet-card__action-btn"
              onClick={() => navigate('/tracking')}
            >
              Full Screen Tracking ↗
            </button>
          </div>

          <div className="fleet-map-canvas">
            {/* Interactive simulated vector map */}
            <div className="fleet-map-bg">
              <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="none" className="fleet-map-svg">
                {/* Background grid */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Highway arterial lines */}
                <path d="M 120 80 Q 240 180 380 190 T 640 280" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="6,4" opacity="0.6"/>
                <path d="M 220 300 Q 360 210 500 130 T 720 90" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4,4" opacity="0.5"/>
              </svg>
            </div>

            {/* Vehicle Pins */}
            <div className="fleet-pin fleet-pin--moving" style={{ top: '35%', left: '26%' }}>
              <div className="fleet-pin__dot" />
              <div className="fleet-pin__tooltip">
                <strong>MH-04-AB-1204</strong>
                <span>64 km/h · Vadodara</span>
              </div>
            </div>

            <div className="fleet-pin fleet-pin--moving" style={{ top: '22%', left: '52%' }}>
              <div className="fleet-pin__dot" />
              <div className="fleet-pin__tooltip">
                <strong>DL-01-AX-9941</strong>
                <span>79 km/h · Rewari</span>
              </div>
            </div>

            <div className="fleet-pin fleet-pin--idling" style={{ top: '68%', left: '44%' }}>
              <div className="fleet-pin__dot" />
              <div className="fleet-pin__tooltip">
                <strong>KA-03-MG-5521</strong>
                <span>0 km/h (Idling) · Bengaluru</span>
              </div>
            </div>

            <div className="fleet-pin fleet-pin--stopped" style={{ top: '48%', left: '72%' }}>
              <div className="fleet-pin__dot" />
              <div className="fleet-pin__tooltip">
                <strong>GJ-05-BX-7712</strong>
                <span>Parked · Surat Depot</span>
              </div>
            </div>

            {/* Map Legend */}
            <div className="fleet-map-legend">
              <span className="legend-item"><span className="legend-dot legend-dot--green"/> Moving (92)</span>
              <span className="legend-item"><span className="legend-dot legend-dot--yellow"/> Idling (18)</span>
              <span className="legend-item"><span className="legend-dot legend-dot--blue"/> Parked (31)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Alert Feed */}
        <div className="fleet-card fleet-alerts-card">
          <div className="fleet-card__header">
            <div>
              <h3 className="fleet-card__title">Live Alert Feed</h3>
              <p className="fleet-card__sub">Recent critical &amp; safety telematics alerts</p>
            </div>
            <span className="fleet-card__badge-pulse">Live</span>
          </div>

          <div className="fleet-alerts-list">
            {RECENT_ALERTS.map(alert => (
              <div key={alert.id} className={`fleet-alert-item fleet-alert-item--${alert.severity}`}>
                <div className="fleet-alert-item__header">
                  <span className="fleet-alert-item__type">{alert.type}</span>
                  <span className="fleet-alert-item__time">{alert.time}</span>
                </div>
                <div className="fleet-alert-item__vehicle">Vehicle: <strong>{alert.vehicle}</strong></div>
                <p className="fleet-alert-item__detail">{alert.detail}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Row 4: Fleet Vehicles Table ── */}
      <div className="fleet-card fleet-table-card">
        <div className="fleet-card__header">
          <div>
            <h3 className="fleet-card__title">Fleet Vehicles Status Table</h3>
            <p className="fleet-card__sub">Showing {filteredVehicles.length} vehicles (Filter: {filterStatus.toUpperCase()})</p>
          </div>
          {filterStatus !== 'all' && (
            <button 
              type="button" 
              className="fleet-card__reset-btn" 
              onClick={() => setFilterStatus('all')}
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="fleet-table-wrap">
          <table className="fleet-table">
            <thead>
              <tr>
                <th>Vehicle No</th>
                <th>Model</th>
                <th>Installed Hardware</th>
                <th>Driver</th>
                <th>Speed</th>
                <th>Ignition</th>
                <th>Fuel</th>
                <th>Current Location</th>
                <th>Status</th>
                <th>Last Ping</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map(v => (
                <tr key={v.id}>
                  <td className="fleet-table__id">
                    <strong>{v.id}</strong>
                  </td>
                  <td>{v.model}</td>
                  <td>
                    <span className="fleet-table__device-tag">{v.device}</span>
                  </td>
                  <td>{v.driver}</td>
                  <td className="fleet-table__speed">{v.speed}</td>
                  <td>
                    <span className={`fleet-ignition-pill ${v.ignition ? 'fleet-ignition-pill--on' : 'fleet-ignition-pill--off'}`}>
                      {v.ignition ? 'ON' : 'OFF'}
                    </span>
                  </td>
                  <td>
                    <div className="fleet-fuel-bar-wrap">
                      <div className="fleet-fuel-bar">
                        <div 
                          className="fleet-fuel-bar__fill" 
                          style={{ 
                            width: v.fuel, 
                            backgroundColor: parseInt(v.fuel) < 25 ? '#EF4444' : '#10B981' 
                          }} 
                        />
                      </div>
                      <span className="fleet-fuel-text">{v.fuel}</span>
                    </div>
                  </td>
                  <td className="fleet-table__location">{v.location}</td>
                  <td>
                    <span className={`fleet-status-pill fleet-status-pill--${v.status}`}>
                      {v.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="fleet-table__time">{v.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
