import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import products from '../../data/products.json';
import autopartsData from '../../data/autoparts.json';
import { getPartFitmentList } from '../../data/autopartsFitment';
import { useCart } from '../../context/CartContext';
import { getAssetUrl } from '../../utils/assetUrl';
import './ProductDetail.css';

export default function ProductDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const isAutoPartsRoute = location.pathname.includes('/auto-parts');

  // Find product by slug or id or partNumber, checking hardware or auto parts
  const product = useMemo(() => {
    if (isAutoPartsRoute) {
      const auto = autopartsData.parts?.find(
        (p) => p.id === slug || p.slug === slug || p.partNumber?.toLowerCase() === slug?.toLowerCase()
      );
      if (auto) return { ...auto, isAutoPart: true };
    }

    // Try finding in hardware products
    const hw = products.find((p) => p.slug === slug || p.id === slug);
    if (hw) return { ...hw, isAutoPart: false };

    // Try finding in auto parts
    const auto = autopartsData.parts?.find(
      (p) => p.id === slug || p.slug === slug || p.partNumber?.toLowerCase() === slug?.toLowerCase()
    );
    if (auto) return { ...auto, isAutoPart: true };

    // Fallbacks
    if (isAutoPartsRoute && autopartsData.parts?.length > 0) {
      return { ...autopartsData.parts[0], isAutoPart: true };
    }
    return products[0];
  }, [slug, isAutoPartsRoute]);

  if (!product) {
    return (
      <div className="setu-ui-notfound">
        <h2>{isAutoPartsRoute ? 'Auto Part not found' : 'Hardware not found'}</h2>
        <button 
          className="setu-ui-btn-primary" 
          onClick={() => navigate(isAutoPartsRoute ? '/auto-parts' : '/hardware')}
        >
          ‹ Back
        </button>
      </div>
    );
  }

  const isAutoPart = Boolean(product.isAutoPart);

  // Specifications and metadata
  const sp = product.specifications || {};
  const isPrithvi = !isAutoPart && (product.name?.toLowerCase().includes('prithvi') || product.slug?.toLowerCase().includes('prithvi') || product.slug?.includes('140'));
  
  const brandName = isAutoPart
    ? (product.brand || 'OEM Supplier')
    : (sp.brand || (isPrithvi ? 'Watsoo Express' : product.name?.includes('Advance') ? 'Advance' : product.name?.includes('V5') ? 'Markon' : 'Advance'));
  
  const productId = isAutoPart
    ? (product.partNumber || product.id?.toUpperCase())
    : `SETU-${product.slug ? product.slug.toUpperCase() : 'DEVICE'}`;
  
  const subcat = isAutoPart
    ? (product.categoryName || (product.category ? product.category.replace(/-/g, ' ') : 'Auto Spare Parts'))
    : (product.subcategory ? product.subcategory.replace(/-/g, ' ') : 'Wired GPS Tracker');
  
  const connectivity = isAutoPart
    ? (sp.Material || sp.Position || product.origin || 'OEM Standard')
    : (sp.connectivity || (isPrithvi ? 'GSM, GPS, GNSS & IRNSS (NavIC)' : product.name?.includes('4G') ? '4G LTE' : '2G'));

  // Hardware multi-configuration options support
  const configurations = useMemo(() => {
    if (product?.configurations && product.configurations.length > 0) {
      return product.configurations;
    }
    return null;
  }, [product]);

  // Selected configuration state
  const [selectedConfigId, setSelectedConfigId] = useState(() => {
    if (product?.configurations && product.configurations.length > 0) {
      const match = product.configurations.find(
        (c) => c.id === slug || c.slug === slug || product.id?.includes(c.id) || product.name?.toLowerCase().includes(c.name.toLowerCase())
      );
      if (match) return match.id;
      const rec = product.configurations.find((c) => c.isRecommended);
      return rec ? rec.id : product.configurations[0].id;
    }
    return null;
  });

  useEffect(() => {
    if (product?.configurations && product.configurations.length > 0) {
      const match = product.configurations.find(
        (c) => c.id === slug || c.slug === slug || product.id?.includes(c.id) || product.name?.toLowerCase().includes(c.name.toLowerCase())
      );
      if (match) {
        setSelectedConfigId(match.id);
      } else {
        const rec = product.configurations.find((c) => c.isRecommended);
        setSelectedConfigId(rec ? rec.id : product.configurations[0].id);
      }
    } else {
      setSelectedConfigId(null);
    }
  }, [product, slug]);

  const activeConfig = useMemo(() => {
    if (!configurations || configurations.length === 0) return null;
    return configurations.find((c) => c.id === selectedConfigId) || configurations[0];
  }, [configurations, selectedConfigId]);

  // Dynamic Title based on selected configuration
  const displayTitle = useMemo(() => {
    if (!activeConfig) return product.name;
    if (activeConfig.title) return activeConfig.title;
    if (/\b(2G|4G)\b/i.test(product.name)) {
      return product.name.replace(/\b(2G|4G)\b/i, activeConfig.name);
    }
    return `${product.name} – ${activeConfig.name}`;
  }, [product.name, activeConfig]);

  // Dynamic Connectivity based on selected configuration
  const displayConnectivity = useMemo(() => {
    if (activeConfig && (activeConfig.connectivity || activeConfig.name)) {
      return activeConfig.connectivity || activeConfig.name;
    }
    return connectivity;
  }, [activeConfig, connectivity]);

  // Formatted category hierarchy for Details table
  const categoryDisplay = useMemo(() => {
    if (isAutoPart) return `Auto Spare Parts › ${subcat}`;
    if (product.category === 'asset-logistics') {
      const sub = product.subcategory === 'e-lock-tracker' ? 'Elock Tracker' : subcat;
      return `Asset & Logistics Tracking › ${sub}`;
    }
    if (product.category === 'video-telematics') return `Video Telematics › ${subcat}`;
    if (product.category === 'fuel-sensors') return `Fuel Sensors › ${subcat}`;
    if (product.category === 'obd-trackers') return `OBD Trackers › ${subcat}`;
    return `Vehicle Tracking Devices › ${subcat}`;
  }, [isAutoPart, product.category, product.subcategory, subcat]);

  // Special features text
  const specialFeaturesText = useMemo(() => {
    if (product.specialFeatures) return product.specialFeatures;
    if (isPrithvi) return 'AIS-140 certified, SOS panic alert';
    if (product.tags && product.tags.length > 0) return product.tags.join(', ');
    return 'Live tracking';
  }, [product.specialFeatures, product.tags, isPrithvi]);

  // Fitment list computation (guarantees 10+ models matching Boodmo / OEM screenshots)
  const fitmentList = useMemo(() => {
    if (!isAutoPart) return [];
    if (product.fitmentList && product.fitmentList.length >= 10) {
      return product.fitmentList;
    }
    return getPartFitmentList(product);
  }, [product, isAutoPart]);

  // Fitment summary text for leader rows
  const fitmentSummaryText = useMemo(() => {
    if (!isAutoPart) return '';
    if (fitmentList && fitmentList.length > 0) {
      const makes = Array.from(new Set(fitmentList.map(f => f.make))).join(', ');
      const topModels = fitmentList.slice(0, 3).map(f => f.model).join(', ');
      return `${makes} (${fitmentList.length} Models: ${topModels}${fitmentList.length > 3 ? '...' : ''})`;
    }
    if (product.compatibleVehicles && product.compatibleVehicles.length > 0) {
      return product.compatibleVehicles
        .map((vId) => {
          const v = autopartsData.vehicles?.find((veh) => veh.id === vId);
          return v ? `${v.make} ${v.model} (${v.year})` : vId;
        })
        .join(', ');
    }
    return 'Universal Fleet Fitment';
  }, [product, isAutoPart, fitmentList]);

  // Base price dynamically takes active configuration into account
  const basePrice = useMemo(() => {
    if (activeConfig && activeConfig.price) {
      return activeConfig.price;
    }
    if (product.price) return product.price;
    if (product.pricingPlans && product.pricingPlans.length > 0) {
      const std = product.pricingPlans.find((p) => p.isPopular) || product.pricingPlans[0];
      return std.price;
    }
    if (isPrithvi) return 3800;
    if (product.category === 'video-telematics') return 4250;
    if (product.category === 'fuel-sensors') return 2890;
    return 2760;
  }, [product, isPrithvi, activeConfig]);

  const consumptionUnit = isAutoPart
    ? (product.unit || 'Per Piece')
    : (product.consumptionUnit || (product.unit ? `Per ${product.unit}` : 'Per Device'));

  // Bulk slab pricing calculation based on base price
  const slabPrices = useMemo(() => {
    return {
      slab1: basePrice,
      slab2: Math.round(basePrice * 0.9583),
      slab3: Math.round(basePrice * 0.9167),
      slab4: Math.round(basePrice * 0.875)
    };
  }, [basePrice]);

  // Gallery images (main + 4 thumbnails = 5 preview images total)
  const [activeThumb, setActiveThumb] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [product.id, activeConfig?.id, activeThumb]);

  const galleryImages = useMemo(() => {
    const raw = (activeConfig && activeConfig.image) || product.image || (isAutoPart ? '/images/autoparts/brake-pads.svg' : '/images/hardware/prithvi-140.svg');
    const mainImg = getAssetUrl(raw);
    return [mainImg, mainImg, mainImg, mainImg, mainImg];
  }, [product, isAutoPart, activeConfig]);

  // Interactive states
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showQtyTooltip, setShowQtyTooltip] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [buyNowSubmitted, setBuyNowSubmitted] = useState(false);

  // Vehicle Fitment accordion states
  const [expandedModels, setExpandedModels] = useState({ 0: true, 1: true });
  const [fitmentSearch, setFitmentSearch] = useState('');

  const toggleModelExpand = (idx) => {
    setExpandedModels((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleExpandAllFitment = () => {
    const all = {};
    fitmentList.forEach((_, i) => { all[i] = true; });
    setExpandedModels(all);
  };

  const handleCollapseAllFitment = () => {
    setExpandedModels({});
  };

  const filteredFitmentList = useMemo(() => {
    if (!fitmentSearch.trim()) return fitmentList;
    const q = fitmentSearch.toLowerCase();
    return fitmentList.filter((item) =>
      item.make.toLowerCase().includes(q) ||
      item.model.toLowerCase().includes(q) ||
      item.variants?.some((v) => v.variant.toLowerCase().includes(q) || v.fuelType.toLowerCase().includes(q))
    );
  }, [fitmentList, fitmentSearch]);

  // Determine current active slab
  const currentSlab = useMemo(() => {
    if (qty >= 500) return '500+';
    if (qty >= 101) return '101–500';
    if (qty >= 51) return '51–100';
    return '1–50';
  }, [qty]);

  // Active unit price based on current quantity
  const unitPrice = useMemo(() => {
    if (qty >= 500) return slabPrices.slab4;
    if (qty >= 101) return slabPrices.slab3;
    if (qty >= 51) return slabPrices.slab2;
    return slabPrices.slab1;
  }, [qty, slabPrices]);

  const displayPriceText = `₹${unitPrice.toLocaleString('en-IN')}`;

  // Key benefits list (4 items with green checkmarks)
  const planBenefits = useMemo(() => {
    if (isAutoPart) {
      return [
        product.origin === 'OEM' ? '100% Genuine OEM replacement part' : 'Tier-1 Certified Aftermarket component',
        `OEM Reference: ${product.partNumber || 'Verified Fitment'}`,
        'Direct fitment verified against manufacturer catalog',
        'Statutory GST Tax Invoice with 100% ITC claim'
      ];
    }
    if (isPrithvi) {
      return [
        'AIS-140 compliant vehicle tracking device',
        'GSM, GPS, GNSS & IRNSS (NavIC) support',
        'Embedded dual-network SIM',
        'SOS emergency button with live alerts'
      ];
    }
    if (product.features && product.features.length > 0) {
      return product.features;
    }
    return [
      'Real time vehicle GPS tracking',
      'Geo fence monitoring alerts',
      'Overspeed safety notifications',
      'Trip history route playback'
    ];
  }, [product, isPrithvi, isAutoPart]);

  // Button mode: 'dual' (Agree & Add To Cart + Agree & Buy Now) or 'submit' (Agree & Submit Request)
  const buttonMode = isAutoPart ? 'dual' : (product.buttonMode || (consumptionUnit === 'Per Device' ? 'dual' : 'submit'));

  // Product description for info modal and main content
  const planDescription = useMemo(() => {
    if (isAutoPart) {
      return product.description || `The ${product.name} is a high-grade automotive spare part manufactured to exacting tolerances, ensuring optimal reliability, longevity, and seamless fitment for commercial and fleet vehicles.`;
    }
    if (isPrithvi) {
      return 'The PRITHVI 140 is an advanced AIS-140 compliant Vehicle Location Tracking Device (VLTD) developed by Watsoo Express Pvt. Ltd. It supports GSM, GPS, GNSS, and IRNSS (NavIC) for accurate real-time vehicle tracking. Featuring an embedded dual-network SIM, SOS emergency button, fuel monitoring, anti-theft alerts, and IP67-rated protection, it is ideal for fleet management, commercial transportation, and Smart City projects.';
    }
    if (product.description) {
      return product.description.split('\n\n')[0] || product.description;
    }
    return `The ${product.name} is an advanced tracking device supporting real-time telematics, multi-network cellular connectivity, emergency alert monitoring, and industrial-grade fleet intelligence.`;
  }, [product, isPrithvi, isAutoPart]);

  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  // FAQs list
  const faqs = useMemo(() => {
    if (isAutoPart) {
      return [
        {
          q: 'How do I ensure this spare part fits my vehicle model?',
          a: `All auto parts listed on Setu are verified against official OEM manufacturer catalogues and chassis codes. Please review the 'Verified Compatible Models' listed in the specifications or contact our parts technical support with your vehicle registration number before ordering.`
        },
        {
          q: 'Are OEM parts 100% genuine and original?',
          a: `Yes, all OEM parts are sourced directly from authorized OEM Tier-1 manufacturers and brand distribution hubs. Each part arrives in sealed factory packaging with authentic barcodes, hologram security labels, and manufacturer part numbers.`
        },
        {
          q: 'What warranty and replacement terms apply to auto spare parts?',
          a: `Parts come with manufacturer warranty against material and manufacturing defects (typically 6 months to 1 year). In case of transit damage or fitment variance, Setu provides a hassle-free 7-day priority replacement guarantee.`
        },
        {
          q: 'How do bulk volume pricing and GST invoices work for fleet workshops?',
          a: `Volume discounts apply automatically starting at 51, 101, and 500+ units. Fleet workshops and commercial transporters receive formal GST tax invoices with statutory HSN classifications, enabling 100% Input Tax Credit (ITC).`
        },
        {
          q: 'What is the warehouse dispatch timeline across India?',
          a: `High-frequency maintenance parts (brake pads, filters, batteries, belts) are stocked in regional fulfillment centers and dispatched within 24 hours of order placement, with expedited courier tracking.`
        }
      ];
    }
    return [
      {
        q: 'Is this hardware pre-configured to work with Trakzee and other telematics platforms?',
        a: `Yes, all hardware on Setu is pre-tested and verified with Trakzee, SmartBus, and Uffizio platforms. If you are deploying on third-party telematics platforms (e.g. Concox, Teltonika, or custom TCP/UDP servers), our integration team pre-configures firmware and IP ports prior to warehouse dispatch.`
      },
      {
        q: 'Does the device include an active SIM card and data plan?',
        a: isPrithvi
          ? 'Yes. The PRITHVI 140 comes with an embedded government-approved dual-network eSIM providing continuous cellular data connectivity across India for live tracking, SOS panic alerts, and RTO health packets.'
          : 'Standard hardware units support commercial IoT micro/nano SIMs. You can choose to bundle Setu’s pre-activated 12-month multi-network IoT SIM card during checkout or use your own M2M connectivity.'
      },
      {
        q: 'How does depot installation work, and where is it available?',
        a: 'Setu operates a verified technician network covering 400+ cities and transport hubs across India. When you choose depot installation (₹499/vehicle), certified telematics technicians arrive directly at your yard, perform hidden wiring, calibrate ignition/sensors, and verify live platform packets before handoff.'
      },
      {
        q: 'How do bulk volume discounts and GST invoices work?',
        a: `Tiered volume pricing applies automatically when ordering 51, 101, or 500+ units. All orders receive a formal GST tax invoice with statutory HSN classifications, enabling 100% Input Tax Credit (ITC) for your company.`
      },
      {
        q: 'What warranty and replacement guarantee are included?',
        a: `Every device sold on Setu includes a 1-year manufacturer replacement warranty covering internal circuitry, GNSS/GSM antennas, and power supplies. For any technical defects, Setu provides 7-day priority replacement service.`
      },
      {
        q: 'Can this device be registered on State RTO / Vahan portals?',
        a: isPrithvi
          ? 'Yes. The PRITHVI 140 is certified under AIS-140 / ARAI with formal TAC and COP certificates. Complete certification documents and backend test verification keys are provided for seamless state RTO vehicle registration.'
          : 'For mandatory commercial transport compliance requiring AIS-140 / Vahan endorsement, please select an AIS-140 certified device like PRITHVI 140. Non-AIS units are suitable for internal fleet logistics, private vehicles, and asset tracking.'
      }
    ];
  }, [isPrithvi, isAutoPart]);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      id: activeConfig ? `${product.id}-${activeConfig.id}` : product.id,
      name: displayTitle,
      price: unitPrice,
      basePrice,
      configuration: activeConfig ? activeConfig.name : null,
      consumptionUnit,
      qty
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2600);
  };

  const handleBuyNow = () => {
    const orderItem = {
      ...product,
      id: activeConfig ? `${product.id}-${activeConfig.id}` : product.id,
      name: displayTitle,
      price: unitPrice,
      basePrice,
      configuration: activeConfig ? activeConfig.name : null,
      consumptionUnit,
      qty
    };
    addToCart(orderItem);
    navigate('/order', { state: { directBuy: true, product: orderItem } });
  };

  const handleSubmitRequest = () => {
    const orderItem = {
      ...product,
      id: activeConfig ? `${product.id}-${activeConfig.id}` : product.id,
      name: displayTitle,
      price: unitPrice,
      basePrice,
      configuration: activeConfig ? activeConfig.name : null,
      consumptionUnit,
      qty
    };
    addToCart(orderItem);
    navigate('/order', { state: { directBuy: true, product: orderItem } });
  };

  return (
    <div className="setu-ui-page">
      <div className="setu-ui-unified-card">
        
        {/* ── Fixed Topbar: Breadcrumbs + Back Navigation ── */}
        <div className="setu-ui-topbar">
          <nav className="setu-ui-breadcrumbs">
            <Link to="/setu">Home</Link>
            <span className="setu-ui-sep">›</span>
            {isAutoPart ? (
              <>
                <Link to="/auto-parts">Auto Spare Parts</Link>
                <span className="setu-ui-sep">›</span>
                <span className="setu-ui-subcat-badge">{subcat}</span>
                <span className="setu-ui-sep">›</span>
                <span className="setu-ui-current-crumb">{product.name}</span>
              </>
            ) : (
              <>
                <Link to="/hardware">Hardware Solutions</Link>
                <span className="setu-ui-sep">›</span>
                <span className="setu-ui-subcat-badge">{subcat}</span>
                <span className="setu-ui-sep">›</span>
                <span className="setu-ui-current-crumb">{product.name}</span>
              </>
            )}
          </nav>

          <button 
            type="button" 
            className="setu-ui-back-btn" 
            onClick={() => navigate(isAutoPart ? '/auto-parts' : '/hardware')}
          >
            ‹ Back
          </button>
        </div>

        {/* ── Unified Card Body: 3-Part Layout (1600px Inner Container) ── */}
        <div className="setu-ui-card-body">
          <div className="setu-ui-card-body-inner">
            
            {/* ── Part 1: Product Image & Previews (Left Fixed Partition, Wider & Fixed in Place) ── */}
            <div className="setu-ui-gallery-partition">
            <div className="setu-ui-main-image-card">
              {!imgError && (galleryImages[activeThumb] || product.image) ? (
                <img
                  src={galleryImages[activeThumb] || product.image}
                  alt={product.name}
                  className="setu-ui-showcase-img"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="setu-ui-img-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 7V5a2 2 0 0 0-4 0v2"/>
                    <circle cx="12" cy="14" r="2"/>
                  </svg>
                  <span>{isAutoPart ? 'Auto Spare Part' : 'Hardware Device'}</span>
                </div>
              )}
              <span className="setu-ui-product-badge">
                {isAutoPart ? (product.origin === 'OEM' ? 'OEM Genuine' : 'Aftermarket') : 'Product'}
              </span>
            </div>

            <div className="setu-ui-thumbs-list">
              {galleryImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`setu-ui-thumb-btn ${activeThumb === idx ? 'setu-ui-thumb-btn--active' : ''}`}
                  onClick={() => setActiveThumb(idx)}
                  title={`View angle ${idx + 1}`}
                >
                  <img src={imgSrc} alt={`${product.name} view ${idx + 1}`} className="setu-ui-thumb-img" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Part 2: Product Details & Specifications (Center Scrolling Partition) ── */}
          <div className="setu-ui-center-scroll-col" id="setu-details-scroll">
            <h1 className="setu-ui-title">{displayTitle}</h1>
            
            <div className="setu-ui-stock-row">
              <span className="setu-ui-stock-label">Status:</span>
              <span className={`setu-ui-stock-badge ${product.inStock !== false ? 'setu-ui-stock-badge--in' : 'setu-ui-stock-badge--out'}`}>
                <span className="setu-ui-stock-dot" />
                {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Product Key Details */}
            <div className="setu-ui-details-block">
              <h3 className="setu-ui-details-heading">Details</h3>

              {isAutoPart ? (
                <>
                  <div className="setu-ui-leader-row">
                    <span className="setu-ui-leader-k">Brand</span>
                    <span className="setu-ui-leader-v">{brandName}</span>
                  </div>

                  <div className="setu-ui-leader-row">
                    <span className="setu-ui-leader-k">Part Number</span>
                    <span className="setu-ui-leader-v">{product.partNumber}</span>
                  </div>

                  {product.manufacturerDescription && (
                    <div className="setu-ui-leader-row">
                      <span className="setu-ui-leader-k">Manufacturer Description</span>
                      <span className="setu-ui-leader-v">{product.manufacturerDescription}</span>
                    </div>
                  )}

                  <div className="setu-ui-leader-row">
                    <span className="setu-ui-leader-k">Category</span>
                    <span className="setu-ui-leader-v">Auto Spare Parts › {subcat}</span>
                  </div>

                  <div className="setu-ui-leader-row">
                    <span className="setu-ui-leader-k">Origin</span>
                    <span className="setu-ui-leader-v">{product.origin === 'OEM' ? 'OEM Genuine Part' : 'Tier-1 Aftermarket'}</span>
                  </div>

                  <div className="setu-ui-leader-row">
                    <span className="setu-ui-leader-k">Vehicle fitment</span>
                    <span className="setu-ui-leader-v setu-ui-leader-v--wrap">{fitmentSummaryText}</span>
                  </div>

                  <div className="setu-ui-leader-row">
                    <span className="setu-ui-leader-k">Warranty</span>
                    <span className="setu-ui-leader-v">{product.specifications?.Warranty || '1 Year'}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="setu-ui-leader-row">
                    <span className="setu-ui-leader-k">Brand / series</span>
                    <span className="setu-ui-leader-dots" />
                    <span className="setu-ui-leader-v">{brandName}</span>
                  </div>

                  <div className="setu-ui-leader-row">
                    <span className="setu-ui-leader-k">Category</span>
                    <span className="setu-ui-leader-dots" />
                    <span className="setu-ui-leader-v">{categoryDisplay}</span>
                  </div>

                  <div className="setu-ui-leader-row">
                    <span className="setu-ui-leader-k">Connectivity</span>
                    <span className="setu-ui-leader-dots" />
                    <span className="setu-ui-leader-v">{displayConnectivity}</span>
                  </div>

                  <div className="setu-ui-leader-row">
                    <span className="setu-ui-leader-k">Special features</span>
                    <span className="setu-ui-leader-dots" />
                    <span className="setu-ui-leader-v">{specialFeaturesText}</span>
                  </div>

                  <div className="setu-ui-leader-row">
                    <span className="setu-ui-leader-k">Supported application</span>
                    <span className="setu-ui-leader-dots" />
                    <span className="setu-ui-leader-v setu-ui-leader-v--wrap">
                      Trakzee, SmartBus and other Uffizio platforms
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* ── Hardware Configuration Selector Block (Matching User Requirement & Screenshot) ── */}
            {configurations && configurations.length > 0 && (
              <div className="setu-config-block">
                <div className="setu-config-heading">
                  Configuration: <span className="setu-config-heading-val">{activeConfig?.name}</span>
                </div>
                <div className="setu-config-options">
                  {configurations.map((cfg) => {
                    const isSelected = selectedConfigId === cfg.id;
                    return (
                      <button
                        key={cfg.id}
                        type="button"
                        className={`setu-config-card ${isSelected ? 'setu-config-card--active' : ''}`}
                        onClick={() => setSelectedConfigId(cfg.id)}
                      >
                        <span className="setu-config-card__name">{cfg.name}</span>
                        <span className="setu-config-card__sub">
                          ₹{cfg.price?.toLocaleString('en-IN')}{cfg.badge ? ` · ${cfg.badge}` : ''}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bulk Pricing Slab Card with Slab Tabs and Quantity Manage */}
            <div className="setu-ui-bulk-card">
              <div className="setu-ui-bulk-header">
                <span className="setu-ui-bulk-title">Bulk pricing slab</span>
                <span className="setu-ui-bulk-selected-tag">
                  Selected: <strong>{qty}</strong> {qty === 1 ? 'unit' : 'units'} · Slab {currentSlab}
                </span>
              </div>

              {/* Slab Tabs + Single Quantity Manage Controls Bar */}
              <div className="setu-ui-slab-controls-bar">
                <div className="setu-ui-slab-tabs-wrap">
                  <span className="setu-ui-slab-tabs-label">Slab tabs:</span>
                  <div className="setu-ui-slab-tabs">
                    <button
                      type="button"
                      className={`setu-ui-slab-tab ${currentSlab === '1–50' ? 'setu-ui-slab-tab--active' : ''}`}
                      onClick={() => setQty(1)}
                      title="Select 1–50 units slab (1 unit)"
                    >
                      1–50 units
                    </button>
                    <button
                      type="button"
                      className={`setu-ui-slab-tab ${currentSlab === '51–100' ? 'setu-ui-slab-tab--active' : ''}`}
                      onClick={() => setQty(51)}
                      title="Select 51–100 units slab (51 units)"
                    >
                      51–100 units
                    </button>
                    <button
                      type="button"
                      className={`setu-ui-slab-tab ${currentSlab === '101–500' ? 'setu-ui-slab-tab--active' : ''}`}
                      onClick={() => setQty(101)}
                      title="Select 101–500 units slab (101 units)"
                    >
                      101–500 units
                    </button>
                    <button
                      type="button"
                      className={`setu-ui-slab-tab ${currentSlab === '500+' ? 'setu-ui-slab-tab--active' : ''}`}
                      onClick={() => setQty(500)}
                      title="Select 500+ units slab (500 units)"
                    >
                      500+ units
                    </button>
                  </div>
                </div>

                {/* Single Quantity Manage Option */}
                <div className="setu-ui-bulk-qty-manage">
                  <span className="setu-ui-bulk-qty-label">Quantity manage:</span>
                  <div className="setu-bulk-counter">
                    <button
                      type="button"
                      className="setu-bulk-counter__btn setu-bulk-counter__btn--minus"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      aria-label="Decrease quantity"
                    >
                      —
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="99999"
                      value={qty}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (isNaN(val)) {
                          setQty(1);
                        } else {
                          setQty(Math.max(1, Math.min(99999, val)));
                        }
                      }}
                      className="setu-bulk-counter__input"
                      aria-label="Order Quantity"
                      title="Type any quantity directly"
                    />
                    <button
                      type="button"
                      className="setu-bulk-counter__btn setu-bulk-counter__btn--plus"
                      onClick={() => setQty(qty + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <table className="setu-ui-bulk-table">
                <thead>
                  <tr>
                    <th>Quantity Slab</th>
                    <th>Price per unit</th>
                    <th>You save</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={currentSlab === '1–50' ? 'setu-ui-slab--active' : ''}>
                    <td>
                      <span className="setu-ui-slab-name">1–50 units</span>
                      {currentSlab === '1–50' && <span className="setu-ui-current-pill">Current</span>}
                    </td>
                    <td className="setu-ui-slab-price">₹{slabPrices.slab1.toLocaleString('en-IN')}</td>
                    <td>—</td>
                  </tr>
                  <tr className={currentSlab === '51–100' ? 'setu-ui-slab--active' : ''}>
                    <td>
                      <span className="setu-ui-slab-name">51–100 units</span>
                      {currentSlab === '51–100' && <span className="setu-ui-current-pill">Current</span>}
                    </td>
                    <td className="setu-ui-slab-price">₹{slabPrices.slab2.toLocaleString('en-IN')}</td>
                    <td>
                      <span className="setu-ui-save-badge">
                        {Math.round(((slabPrices.slab1 - slabPrices.slab2) / slabPrices.slab1) * 100)}% OFF
                      </span>
                    </td>
                  </tr>
                  <tr className={currentSlab === '101–500' ? 'setu-ui-slab--active' : ''}>
                    <td>
                      <span className="setu-ui-slab-name">101–500 units</span>
                      {currentSlab === '101–500' && <span className="setu-ui-current-pill">Current</span>}
                    </td>
                    <td className="setu-ui-slab-price">₹{slabPrices.slab3.toLocaleString('en-IN')}</td>
                    <td>
                      <span className="setu-ui-save-badge">
                        {Math.round(((slabPrices.slab1 - slabPrices.slab3) / slabPrices.slab1) * 100)}% OFF
                      </span>
                    </td>
                  </tr>
                  <tr className={currentSlab === '500+' ? 'setu-ui-slab--active' : ''}>
                    <td>
                      <span className="setu-ui-slab-name">500+ units</span>
                      {currentSlab === '500+' && <span className="setu-ui-current-pill">Current</span>}
                    </td>
                    <td className="setu-ui-slab-price">₹{slabPrices.slab4.toLocaleString('en-IN')}</td>
                    <td>
                      <span className="setu-ui-save-badge">
                        {Math.round(((slabPrices.slab1 - slabPrices.slab4) / slabPrices.slab1) * 100)}% OFF
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ── Tabs Strip ── */}
            <div className="setu-ui-tabs-strip">
              <button
                type="button"
                className={`setu-ui-tab-btn ${activeTab === 'description' ? 'setu-ui-tab-btn--active' : ''}`}
                onClick={() => {
                  setActiveTab('description');
                  document.getElementById('description')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {isAutoPart ? 'Overview' : 'Description'}
              </button>
              <button
                type="button"
                className={`setu-ui-tab-btn ${activeTab === 'specifications' ? 'setu-ui-tab-btn--active' : ''}`}
                onClick={() => {
                  setActiveTab('specifications');
                  document.getElementById('specifications')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {isAutoPart ? 'Technical Details' : 'Specifications'}
              </button>
              {isAutoPart && fitmentList.length > 0 && (
                <button
                  type="button"
                  className={`setu-ui-tab-btn ${activeTab === 'fitment' ? 'setu-ui-tab-btn--active' : ''}`}
                  onClick={() => {
                    setActiveTab('fitment');
                    document.getElementById('vehicle-fitment')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Vehicle Fitment ({fitmentList.length})
                </button>
              )}
              <button
                type="button"
                className={`setu-ui-tab-btn ${activeTab === 'faq' ? 'setu-ui-tab-btn--active' : ''}`}
                onClick={() => {
                  setActiveTab('faq');
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                FAQ
              </button>
            </div>

            {/* ── Section: Description ── */}
            <section className="setu-ui-section" id="description">
              <h2 className="setu-ui-section-title">Description</h2>
              {isAutoPart ? (
                <ul className="setu-ui-bullet-list">
                  <li>
                    <strong>OEM Part Reference:</strong> {product.partNumber} ({product.origin === 'OEM' ? 'OEM Genuine' : 'Tier-1 Aftermarket'})
                  </li>
                  <li>
                    <strong>Category:</strong> {product.categoryName} ({subcat})
                  </li>
                  <li>
                    <strong>Fitment Guarantee:</strong> Verified 100% direct fitment for listed vehicle models
                  </li>
                  <li>
                    <strong>Fleet &amp; Garage Orders:</strong> Volume discounts apply at 51, 101, and 500+ units. Statutory GST tax invoice with full ITC claim
                  </li>
                </ul>
              ) : (
                <ul className="setu-ui-bullet-list">
                  <li>
                    <strong>What it does:</strong> {isPrithvi ? 'AIS-140 compliant Vehicle Location Tracking Device (VLTD) developed by Watsoo Express Pvt. Ltd.' : 'Lowest-cost wired tracker for live location and ignition on/off alerts.'}
                  </li>
                  <li>
                    <strong>Connectivity:</strong> {connectivity}
                  </li>
                  <li>
                    <strong>Platform:</strong> Pre-tested with Trakzee. Goes live the day it is installed
                  </li>
                  <li>
                    <strong>Buying for a fleet:</strong> Price drops at 51, 101 and 501 units. GST invoice in your company name
                  </li>
                </ul>
              )}

              <p className="setu-ui-desc-paragraph">
                {planDescription}
              </p>
            </section>

            {/* ── Section: Technical Details / Specifications Table ── */}
            <section className="setu-ui-section" id="specifications">
              <h2 className="setu-ui-section-title">{isAutoPart ? 'Technical Details' : 'Specifications'}</h2>
              
              <table className="setu-ui-specs-table">
                <tbody>
                  {isAutoPart ? (
                    <>
                      <tr>
                        <th>Part Number</th>
                        <td>{product.partNumber}</td>
                      </tr>
                      <tr>
                        <th>Brand</th>
                        <td>{product.brand}</td>
                      </tr>
                      {product.manufacturerDescription && (
                        <tr>
                          <th>Manufacturer Description</th>
                          <td>{product.manufacturerDescription}</td>
                        </tr>
                      )}
                      <tr>
                        <th>Part Name</th>
                        <td>{product.name}</td>
                      </tr>
                      <tr>
                        <th>Origin</th>
                        <td>{product.origin === 'OEM' ? 'OEM Genuine Part' : 'Tier-1 Certified Aftermarket'}</td>
                      </tr>
                      <tr>
                        <th>Category</th>
                        <td>{product.categoryName}</td>
                      </tr>
                      {product.subcategory && (
                        <tr>
                          <th>Sub-category</th>
                          <td>{product.subcategory.replace(/-/g, ' ')}</td>
                        </tr>
                      )}
                      {product.specifications && Object.entries(product.specifications).filter(([k]) => !['Part Number', 'Brand', 'Manufacturer Description', 'Warranty'].includes(k)).map(([key, val]) => (
                        <tr key={key}>
                          <th>{key}</th>
                          <td>{val}</td>
                        </tr>
                      ))}
                      <tr>
                        <th>Vehicle Fitment</th>
                        <td>
                          {fitmentList.length} Verified Models (See interactive Vehicle Fitment section below)
                        </td>
                      </tr>
                      <tr>
                        <th>Warranty</th>
                        <td>{product.specifications?.Warranty || '1 Year Manufacturer Warranty'}</td>
                      </tr>
                      <tr>
                        <th>Returns &amp; Replacement</th>
                        <td>7-Day Priority Replacement</td>
                      </tr>
                      <tr>
                        <th>Price Basis</th>
                        <td>Exclusive of GST and freight charges</td>
                      </tr>
                      <tr>
                        <th>Bulk Pricing Slabs</th>
                        <td>
                          1–50: ₹{slabPrices.slab1.toLocaleString('en-IN')} · 51–100: ₹{slabPrices.slab2.toLocaleString('en-IN')} · 101–500: ₹{slabPrices.slab3.toLocaleString('en-IN')} · 500+: ₹{slabPrices.slab4.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <th>Setu product ID</th>
                        <td>{productId}</td>
                      </tr>
                      <tr>
                        <th>Model name</th>
                        <td>{displayTitle}</td>
                      </tr>
                      <tr>
                        <th>Brand / series</th>
                        <td>{brandName}</td>
                      </tr>
                      <tr>
                        <th>Category</th>
                        <td>{categoryDisplay.split('›')[0]?.trim() || 'Vehicle Tracking Devices'}</td>
                      </tr>
                      <tr>
                        <th>Sub-category</th>
                        <td>{isPrithvi ? 'AIS-140 GPS Device' : subcat}</td>
                      </tr>
                      <tr>
                        <th>Connectivity</th>
                        <td>{displayConnectivity}</td>
                      </tr>
                      <tr>
                        <th>Certification</th>
                        <td>{isPrithvi ? 'AIS-140 / ARAI Certified' : '—'}</td>
                      </tr>
                      <tr>
                        <th>Configurations</th>
                        <td>{configurations ? configurations.map((c) => c.name).join(', ') : 'Single configuration'}</td>
                      </tr>
                      <tr>
                        <th>Special features</th>
                        <td>{specialFeaturesText}</td>
                      </tr>
                      <tr>
                        <th>Supported application</th>
                        <td>Trakzee, SmartBus and other Uffizio platforms</td>
                      </tr>
                      <tr>
                        <th>Installation</th>
                        <td>Professional installation available, ₹499 per vehicle</td>
                      </tr>
                      <tr>
                        <th>Warranty</th>
                        <td>1 year</td>
                      </tr>
                      <tr>
                        <th>Returns</th>
                        <td>7-day replacement</td>
                      </tr>
                      <tr>
                        <th>Price basis</th>
                        <td>Exclusive of GST and freight</td>
                      </tr>
                      <tr>
                        <th>Bulk pricing slabs</th>
                        <td>
                          1–50: ₹{slabPrices.slab1.toLocaleString('en-IN')} · 51–100: ₹{slabPrices.slab2.toLocaleString('en-IN')} · 101–500: ₹{slabPrices.slab3.toLocaleString('en-IN')} · 500+: ₹{slabPrices.slab4.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </section>

            {/* ── Section: Vehicle Fitment (Matching Screenshots 2 & 3) ── */}
            {isAutoPart && fitmentList.length > 0 && (
              <section className="setu-ui-section" id="vehicle-fitment">
                <div className="setu-fitment-header">
                  <div>
                    <h2 className="setu-ui-section-title">Vehicle Fitment</h2>
                    <p className="setu-fitment-subtitle">
                      Verified compatibility with {fitmentList.length} vehicle models. Click any model to view supported engine variants, year range, and fuel types.
                    </p>
                  </div>
                  
                  <div className="setu-fitment-actions">
                    <div className="setu-fitment-search-box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input 
                        type="text" 
                        placeholder="Search Make or Model..." 
                        value={fitmentSearch}
                        onChange={(e) => setFitmentSearch(e.target.value)}
                        className="setu-fitment-search-input"
                      />
                      {fitmentSearch && (
                        <button type="button" className="setu-fitment-clear-btn" onClick={() => setFitmentSearch('')}>✕</button>
                      )}
                    </div>

                    <button 
                      type="button" 
                      className="setu-fitment-toggle-btn"
                      onClick={Object.keys(expandedModels).length > 0 ? handleCollapseAllFitment : handleExpandAllFitment}
                    >
                      {Object.keys(expandedModels).length > 0 ? 'Collapse All' : 'Expand All'}
                    </button>
                  </div>
                </div>

                <div className="setu-fitment-table-container">
                  {/* Outer Table Header matching Screenshot 2 */}
                  <div className="setu-fitment-table-head">
                    <span className="setu-fitment-col-make">Make</span>
                    <span className="setu-fitment-col-model">Model</span>
                    <span className="setu-fitment-col-action">Expand</span>
                  </div>

                  {filteredFitmentList.map((item, idx) => {
                    const isExpanded = Boolean(expandedModels[idx]);
                    return (
                      <div 
                        key={idx} 
                        className={`setu-fitment-model-group ${isExpanded ? 'setu-fitment-model-group--open' : ''}`}
                      >
                        {/* Parent Row: Make | Model | (+)/(-) */}
                        <div 
                          className={`setu-fitment-model-row ${isExpanded ? 'setu-fitment-model-row--active' : ''}`}
                          onClick={() => toggleModelExpand(idx)}
                        >
                          <span className="setu-fitment-val-make">{item.make}</span>
                          <span className="setu-fitment-val-model">{item.model}</span>
                          <button 
                            type="button" 
                            className={`setu-fitment-icon-btn ${isExpanded ? 'setu-fitment-icon-btn--minus' : 'setu-fitment-icon-btn--plus'}`}
                            aria-label={isExpanded ? 'Collapse variants' : 'Expand variants'}
                          >
                            {isExpanded ? (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                              </svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="16" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                              </svg>
                            )}
                          </button>
                        </div>

                        {/* Nested Subtable matching Screenshot 2 */}
                        {isExpanded && item.variants && item.variants.length > 0 && (
                          <div className="setu-fitment-subtable-wrap">
                            <table className="setu-fitment-subtable">
                              <thead>
                                <tr>
                                  <th>Variant</th>
                                  <th>Start Year</th>
                                  <th>End Year</th>
                                  <th>Fuel Type</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.variants.map((v, vIdx) => (
                                  <tr key={vIdx}>
                                    <td className="setu-fitment-v-name">{v.variant}</td>
                                    <td>{v.startYear}</td>
                                    <td>{v.endYear}</td>
                                    <td>
                                      <span className={`setu-fuel-badge setu-fuel-badge--${v.fuelType.toLowerCase()}`}>
                                        {v.fuelType}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {filteredFitmentList.length === 0 && (
                    <div className="setu-fitment-no-results">
                      No models matching "{fitmentSearch}". Try searching for Maruti, Swift, Alto, Baleno, etc.
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ── Section: Frequently Asked Questions ── */}
            <section className="setu-ui-section" id="faq">
              <h2 className="setu-ui-section-title">Frequently Asked Questions</h2>
              <div className="setu-ui-faq-list">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`setu-ui-faq-item ${openFaqIdx === idx ? 'setu-ui-faq-item--open' : ''}`}
                  >
                    <button
                      type="button"
                      className="setu-ui-faq-trigger"
                      onClick={() => setOpenFaqIdx(openFaqIdx === idx ? -1 : idx)}
                    >
                      <span className="setu-ui-faq-q">{faq.q}</span>
                      <svg
                        className={`setu-ui-faq-chevron ${openFaqIdx === idx ? 'setu-ui-faq-chevron--open' : ''}`}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {openFaqIdx === idx && (
                      <div className="setu-ui-faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ── Right Fixed Partition: Buy Box Panel ── */}
          <aside className="setu-ui-buybox-panel">
            <div className="setu-plan-card">

              {/* Price row */}
              <div className="setu-plan-card__price-row">
                <span className="setu-plan-card__price-val">{displayPriceText}</span>
                <span className="setu-plan-card__per-unit">/ {consumptionUnit}</span>
                <button
                  type="button"
                  className="setu-plan-card__info-icon-btn"
                  onClick={() => setShowInfoModal(true)}
                  title="View plan details"
                  aria-label="View plan details"
                >
                  ⓘ
                </button>
              </div>

              {/* 4 Green Checkmarked Key Features */}
              <ul className="setu-plan-card__benefits-list">
                {planBenefits.slice(0, 4).map((benefit, idx) => (
                  <li key={idx} className="setu-plan-card__benefit-item">
                    <span className="setu-plan-card__check-circle">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="setu-plan-card__benefit-text">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Terms and Conditions Link */}
              <div className="setu-plan-card__terms-wrap">
                <button
                  type="button"
                  className="setu-plan-card__terms-link"
                  onClick={() => setShowTermsModal(true)}
                >
                  Terms and Conditions
                </button>
              </div>

              <div className="setu-plan-card__divider" />

              {/* Final Quantity & Order Total Bar (Directly Above Buy Now Buttons) */}
              <div className="setu-plan-card__final-summary-box">
                <div className="setu-plan-card__final-summary-row">
                  <span className="setu-plan-card__final-summary-label">Final Quantity:</span>
                  <span className="setu-plan-card__final-summary-qty">
                    <strong>{qty}</strong> {qty === 1 ? 'Unit' : 'Units'}
                  </span>
                </div>
                <div className="setu-plan-card__final-summary-row setu-plan-card__final-summary-row--total">
                  <span className="setu-plan-card__final-summary-label">Total Amount:</span>
                  <span className="setu-plan-card__final-summary-total">
                    ₹{(unitPrice * qty).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="setu-plan-card__final-summary-sub">
                  (₹{unitPrice.toLocaleString('en-IN')} / {consumptionUnit} · Excl. taxes &amp; shipping)
                </div>
              </div>

              {/* Action Buttons: Dual or Single */}
              {buttonMode === 'dual' ? (
                <div className="setu-plan-card__btn-group">
                  <button
                    type="button"
                    className="setu-plan-card__btn setu-plan-card__btn--outline"
                    onClick={handleAddToCart}
                  >
                    {addedToCart ? '✓ Added' : 'Agree & Add To Cart'}
                  </button>
                  <button
                    type="button"
                    className="setu-plan-card__btn setu-plan-card__btn--primary"
                    onClick={handleBuyNow}
                  >
                    {buyNowSubmitted ? '✓ Processing...' : 'Agree & Buy Now'}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="setu-plan-card__submit-btn"
                  onClick={handleSubmitRequest}
                >
                  {requestSubmitted ? '✓ Request Submitted' : 'Agree & Submit Request'}
                </button>
              )}
            </div>

          </aside>

          </div>
        </div>
      </div>

      {/* ── Plan Info Modal (Exact Match to Screenshot 2) ── */}
      {showInfoModal && (
        <div className="setu-info-modal__overlay" onClick={() => setShowInfoModal(false)}>
          <div className="setu-info-modal__card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="setu-info-modal__close-btn"
              onClick={() => setShowInfoModal(false)}
            >
              ✕
            </button>

            {/* Header */}
            <div className="setu-info-modal__header">
              <h2 className="setu-info-modal__price-title">{displayPriceText}</h2>
              <p className="setu-info-modal__price-sub">** Taxes and Shipping Charges Excluded</p>
            </div>

            {/* Plan Description */}
            <div className="setu-info-modal__section">
              <h3 className="setu-info-modal__section-heading">Plan Description</h3>
              <p className="setu-info-modal__desc-text">{planDescription}</p>
            </div>

            {/* 4 Metadata Columns with Checkmarks */}
            <div className="setu-info-modal__meta-grid">
              <div className="setu-info-modal__meta-col">
                <span className="setu-info-modal__meta-label">Billing Cycle</span>
                <div className="setu-info-modal__meta-val">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>One Time Payment</span>
                </div>
              </div>

              <div className="setu-info-modal__meta-col">
                <span className="setu-info-modal__meta-label">Consumption Unit</span>
                <div className="setu-info-modal__meta-val">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{consumptionUnit.replace('Per ', '') || 'Units'}</span>
                </div>
              </div>

              <div className="setu-info-modal__meta-col">
                <span className="setu-info-modal__meta-label">Minimum Order Quantity</span>
                <div className="setu-info-modal__meta-val">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>1</span>
                </div>
              </div>

              <div className="setu-info-modal__meta-col">
                <span className="setu-info-modal__meta-label">Maximum Order Quantity</span>
                <div className="setu-info-modal__meta-val">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>500</span>
                </div>
              </div>
            </div>

            {/* Plan Benefits */}
            <div className="setu-info-modal__section">
              <h3 className="setu-info-modal__section-heading">Plan Benefits</h3>
              <ul className="setu-info-modal__benefits-list">
                {planBenefits.map((benefit, idx) => (
                  <li key={idx} className="setu-info-modal__benefit-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ── Terms and Conditions Modal ── */}
      {showTermsModal && (
        <div className="setu-info-modal__overlay" onClick={() => setShowTermsModal(false)}>
          <div className="setu-info-modal__card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="setu-info-modal__close-btn"
              onClick={() => setShowTermsModal(false)}
            >
              ✕
            </button>
            <div className="setu-info-modal__header">
              <h2 className="setu-info-modal__price-title" style={{ fontSize: '18px' }}>
                Terms and Conditions
              </h2>
              <p className="setu-info-modal__price-sub">Hardware Deployment &amp; Service Terms</p>
            </div>
            <div className="setu-info-modal__section">
              <ul className="setu-info-modal__benefits-list" style={{ gap: '12px' }}>
                <li className="setu-info-modal__benefit-item">
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>1.</span>
                  <span>1-Year standard manufacturer replacement warranty covering internal hardware and sensors.</span>
                </li>
                <li className="setu-info-modal__benefit-item">
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>2.</span>
                  <span>Prices quoted are exclusive of 18% GST and standard carrier shipping charges.</span>
                </li>
                <li className="setu-info-modal__benefit-item">
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>3.</span>
                  <span>Formal GST invoice with HSN classification issued upon warehouse dispatch.</span>
                </li>
                <li className="setu-info-modal__benefit-item">
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>4.</span>
                  <span>Depot installation requires 48 hours pre-scheduling with certified Setu telematics engineers.</span>
                </li>
              </ul>
              <div style={{ marginTop: '20px' }}>
                <a
                  href="#download-terms"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading ${product.termsAndConditions || 'Hardware_Device_Terms_and_Conditions.pdf'}`);
                  }}
                  className="setu-ui-store-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
                >
                  📄 Download Hardware_Device_Terms_and_Conditions.pdf
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
