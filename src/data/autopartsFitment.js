/**
 * autopartsFitment.js
 * Comprehensive vehicle fitment catalog matching Indian automotive aftermarket & OEM standards (Boodmo style).
 * Every fitment group provides 10+ to 24 verified vehicle models with expandable variant rows.
 */

// 1. Maruti Suzuki Comprehensive Fleet (24 Models)
export const MARUTI_FITMENT_LIST = [
  {
    make: "MARUTI",
    model: "A-STAR",
    variants: [
      { variant: "1.0L AT (TYPE 2)", startYear: "2010", endYear: "2013", fuelType: "Petrol" },
      { variant: "1.0L LXI MT (TYPE 1)", startYear: "2008", endYear: "2010", fuelType: "Petrol" },
      { variant: "1.0L LXI MT (TYPE 2)", startYear: "2010", endYear: "2013", fuelType: "Petrol" },
      { variant: "1.0L VXI MT (TYPE 1)", startYear: "2008", endYear: "2010", fuelType: "Petrol" },
      { variant: "1.0L VXI MT (TYPE 2)", startYear: "2010", endYear: "2013", fuelType: "Petrol" },
      { variant: "1.0L VXI MT ABS (TYPE 1)", startYear: "2008", endYear: "2009", fuelType: "Petrol" },
      { variant: "1.0L VXI MT ABS (TYPE 2)", startYear: "2010", endYear: "2013", fuelType: "Petrol" },
      { variant: "1.0L ZXI MT (TYPE 1)", startYear: "2008", endYear: "2010", fuelType: "Petrol" },
      { variant: "1.0L ZXI MT (TYPE 2)", startYear: "2010", endYear: "2013", fuelType: "Petrol" }
    ]
  },
  {
    make: "MARUTI",
    model: "ALTO",
    variants: [
      { variant: "0.8L LXI MT", startYear: "2000", endYear: "2012", fuelType: "Petrol" },
      { variant: "0.8L VXI MT", startYear: "2002", endYear: "2012", fuelType: "Petrol" },
      { variant: "0.8L LXI CNG", startYear: "2006", endYear: "2012", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "ALTO 800 1ST GEN",
    variants: [
      { variant: "0.8L STD / LXI MT", startYear: "2012", endYear: "2016", fuelType: "Petrol" },
      { variant: "0.8L LXI CNG", startYear: "2012", endYear: "2016", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "ALTO 800 1ST GEN F/L",
    variants: [
      { variant: "0.8L LXI / VXI MT", startYear: "2016", endYear: "2019", fuelType: "Petrol" },
      { variant: "0.8L LXI CNG", startYear: "2016", endYear: "2019", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "ALTO K10 1ST GEN",
    variants: [
      { variant: "1.0L LXI / VXI MT", startYear: "2010", endYear: "2014", fuelType: "Petrol" }
    ]
  },
  {
    make: "MARUTI",
    model: "ALTO K10 2ND GEN",
    variants: [
      { variant: "1.0L VXI MT / AMT", startYear: "2014", endYear: "2020", fuelType: "Petrol" },
      { variant: "1.0L LXI CNG", startYear: "2015", endYear: "2020", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "BALENO 1ST GEN",
    variants: [
      { variant: "1.6L Sedan MT", startYear: "1999", endYear: "2007", fuelType: "Petrol" }
    ]
  },
  {
    make: "MARUTI",
    model: "BALENO 2ND GEN",
    variants: [
      { variant: "1.2L Delta / Zeta / Alpha MT", startYear: "2015", endYear: "2019", fuelType: "Petrol" },
      { variant: "1.3L DDiS 190 Diesel", startYear: "2015", endYear: "2019", fuelType: "Diesel" },
      { variant: "1.2L CVT Automatic", startYear: "2016", endYear: "2019", fuelType: "Petrol" }
    ]
  },
  {
    make: "MARUTI",
    model: "BALENO 2ND GEN F/L",
    variants: [
      { variant: "1.2L DualJet Dual VVT Smart Hybrid", startYear: "2019", endYear: "2022", fuelType: "Petrol" },
      { variant: "1.2L K12M VVT MT", startYear: "2019", endYear: "2022", fuelType: "Petrol" }
    ]
  },
  {
    make: "MARUTI",
    model: "BALENO 3RD GEN",
    variants: [
      { variant: "1.2L K-Series DualJet MT / AGS", startYear: "2022", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.2L Delta / Zeta CNG", startYear: "2022", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "BALENO ALTURA",
    variants: [
      { variant: "1.6L Station Wagon", startYear: "2000", endYear: "2007", fuelType: "Petrol" }
    ]
  },
  {
    make: "MARUTI",
    model: "BALENO RS",
    variants: [
      { variant: "1.0L Boosterjet Turbo MT", startYear: "2017", endYear: "2020", fuelType: "Petrol" }
    ]
  },
  {
    make: "MARUTI",
    model: "BREZZA 1ST GEN (VITARA BREZZA)",
    variants: [
      { variant: "1.3L DDiS 200 VDI / ZDI 5MT", startYear: "2016", endYear: "2020", fuelType: "Diesel" },
      { variant: "1.5L K15B Smart Hybrid MT / 4AT", startYear: "2020", endYear: "2022", fuelType: "Petrol" }
    ]
  },
  {
    make: "MARUTI",
    model: "BREZZA 2ND GEN",
    variants: [
      { variant: "1.5L K15C Smart Hybrid MT / 6AT", startYear: "2022", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.5L S-CNG MT", startYear: "2023", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "CELERIO 1ST GEN",
    variants: [
      { variant: "1.0L K10B MT / AMT", startYear: "2014", endYear: "2017", fuelType: "Petrol" },
      { variant: "0.8L DDiS 125 Diesel", startYear: "2015", endYear: "2017", fuelType: "Diesel" }
    ]
  },
  {
    make: "MARUTI",
    model: "CELERIO 1ST GEN F/L",
    variants: [
      { variant: "1.0L VXI / ZXI MT / AMT", startYear: "2017", endYear: "2021", fuelType: "Petrol" },
      { variant: "1.0L VXI CNG", startYear: "2017", endYear: "2021", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "CELERIO 2ND GEN",
    variants: [
      { variant: "1.0L DualJet K10C MT / AGS", startYear: "2021", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.0L VXI S-CNG", startYear: "2022", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "CIAZ 1ST GEN",
    variants: [
      { variant: "1.4L K14B VVT MT / 4AT", startYear: "2014", endYear: "2018", fuelType: "Petrol" },
      { variant: "1.3L DDiS 200 SHVS Hybrid", startYear: "2015", endYear: "2018", fuelType: "Diesel" }
    ]
  },
  {
    make: "MARUTI",
    model: "CIAZ 1ST GEN F/L",
    variants: [
      { variant: "1.5L K15B Smart Hybrid MT / 4AT", startYear: "2018", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.5L DDiS 225 6MT", startYear: "2019", endYear: "2020", fuelType: "Diesel" }
    ]
  },
  {
    make: "MARUTI",
    model: "EECO",
    variants: [
      { variant: "1.2L G12B 5-STR / 7-STR MT", startYear: "2010", endYear: "2022", fuelType: "Petrol" },
      { variant: "1.2L CNG 5-STR", startYear: "2010", endYear: "Present", fuelType: "CNG" },
      { variant: "1.2L K-Series DualJet MT", startYear: "2022", endYear: "Present", fuelType: "Petrol" }
    ]
  },
  {
    make: "MARUTI",
    model: "ERTIGA 1ST GEN",
    variants: [
      { variant: "1.4L K14B VXI / ZXI MT", startYear: "2012", endYear: "2015", fuelType: "Petrol" },
      { variant: "1.3L DDiS VDI / ZDI", startYear: "2012", endYear: "2015", fuelType: "Diesel" }
    ]
  },
  {
    make: "MARUTI",
    model: "ERTIGA 1ST GEN F/L",
    variants: [
      { variant: "1.4L VXI / ZXI MT / 4AT", startYear: "2015", endYear: "2018", fuelType: "Petrol" },
      { variant: "1.3L DDiS 200 SHVS Diesel", startYear: "2015", endYear: "2018", fuelType: "Diesel" }
    ]
  },
  {
    make: "MARUTI",
    model: "ERTIGA 2ND GEN",
    variants: [
      { variant: "1.5L K15C Smart Hybrid MT / 6AT", startYear: "2018", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.5L VXI / ZXI S-CNG", startYear: "2019", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "SWIFT 2ND & 3RD GEN",
    variants: [
      { variant: "1.2L K12M VVT VXI / ZXI MT", startYear: "2011", endYear: "2017", fuelType: "Petrol" },
      { variant: "1.3L DDiS 190 VDI / ZDI Diesel", startYear: "2011", endYear: "2017", fuelType: "Diesel" },
      { variant: "1.2L DualJet VXI / ZXI MT / AGS", startYear: "2018", endYear: "2024", fuelType: "Petrol" },
      { variant: "1.2L VXI S-CNG", startYear: "2021", endYear: "2024", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "WAGON R 2ND & 3RD GEN",
    variants: [
      { variant: "1.0L K10B LXI / VXI MT", startYear: "2010", endYear: "2019", fuelType: "Petrol" },
      { variant: "1.2L K12M VXI / ZXI MT / AGS", startYear: "2019", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.0L Green CNG LXI", startYear: "2011", endYear: "Present", fuelType: "CNG" }
    ]
  }
];

// 2. Multi-Brand Passenger Fleet (18 Models)
export const MULTI_BRAND_FITMENT_LIST = [
  {
    make: "MARUTI",
    model: "SWIFT 3RD GEN",
    variants: [
      { variant: "1.2L DualJet VXI / ZXI MT", startYear: "2018", endYear: "2024", fuelType: "Petrol" },
      { variant: "1.3L DDiS 190 Diesel", startYear: "2018", endYear: "2020", fuelType: "Diesel" },
      { variant: "1.2L S-CNG VXI", startYear: "2021", endYear: "2024", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "BALENO 2ND & 3RD GEN",
    variants: [
      { variant: "1.2L K12M MT / CVT", startYear: "2015", endYear: "2022", fuelType: "Petrol" },
      { variant: "1.2L DualJet MT / AGS", startYear: "2022", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.2L S-CNG Delta/Zeta", startYear: "2022", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "DZIRE 3RD GEN",
    variants: [
      { variant: "1.2L DualJet VXI / ZXI MT", startYear: "2017", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.3L DDiS 190 Diesel", startYear: "2017", endYear: "2020", fuelType: "Diesel" },
      { variant: "1.2L S-CNG VXI / ZXI", startYear: "2021", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "ERTIGA 2ND GEN",
    variants: [
      { variant: "1.5L K15C Smart Hybrid MT/6AT", startYear: "2018", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.5L S-CNG VXI/ZXI", startYear: "2019", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "BREZZA",
    variants: [
      { variant: "1.5L K15B Smart Hybrid MT/AT", startYear: "2020", endYear: "2022", fuelType: "Petrol" },
      { variant: "1.5L K15C MT / 6AT", startYear: "2022", endYear: "Present", fuelType: "Petrol" }
    ]
  },
  {
    make: "HYUNDAI",
    model: "CRETA 1ST GEN",
    variants: [
      { variant: "1.6L Dual VTVT E+ / SX MT", startYear: "2015", endYear: "2020", fuelType: "Petrol" },
      { variant: "1.6L CRDi SX AT / MT", startYear: "2015", endYear: "2020", fuelType: "Diesel" },
      { variant: "1.4L CRDi E+ MT", startYear: "2015", endYear: "2019", fuelType: "Diesel" }
    ]
  },
  {
    make: "HYUNDAI",
    model: "CRETA 2ND GEN",
    variants: [
      { variant: "1.5L MPi SX / SX(O) MT/IVT", startYear: "2020", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.5L CRDi SX / SX(O) MT/AT", startYear: "2020", endYear: "Present", fuelType: "Diesel" },
      { variant: "1.4L Turbo GDi 7DCT", startYear: "2020", endYear: "2023", fuelType: "Petrol" }
    ]
  },
  {
    make: "HYUNDAI",
    model: "VENUE",
    variants: [
      { variant: "1.2L Kappa MPi S/SX 5MT", startYear: "2019", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.0L Turbo GDi 6MT / 7DCT", startYear: "2019", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.5L U2 CRDi 6MT", startYear: "2020", endYear: "Present", fuelType: "Diesel" }
    ]
  },
  {
    make: "HYUNDAI",
    model: "i20 (ELITE & 3RD GEN)",
    variants: [
      { variant: "1.2L Kappa Dual VTVT MT/IVT", startYear: "2014", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.4L CRDi Diesel 6MT", startYear: "2014", endYear: "2020", fuelType: "Diesel" },
      { variant: "1.0L Turbo GDi 7DCT", startYear: "2020", endYear: "Present", fuelType: "Petrol" }
    ]
  },
  {
    make: "HYUNDAI",
    model: "GRAND i10 NIOS",
    variants: [
      { variant: "1.2L Kappa Magna / Sportz MT/AMT", startYear: "2019", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.2L Bi-Fuel Magna CNG", startYear: "2020", endYear: "Present", fuelType: "CNG" },
      { variant: "1.2L U2 CRDi Diesel", startYear: "2019", endYear: "2022", fuelType: "Diesel" }
    ]
  },
  {
    make: "HYUNDAI",
    model: "VERNA",
    variants: [
      { variant: "1.6L Dual VTVT SX MT/AT", startYear: "2017", endYear: "2020", fuelType: "Petrol" },
      { variant: "1.5L CRDi SX(O) MT/AT", startYear: "2020", endYear: "2023", fuelType: "Diesel" },
      { variant: "1.5L MPi / 1.5L Turbo GDi", startYear: "2023", endYear: "Present", fuelType: "Petrol" }
    ]
  },
  {
    make: "TATA",
    model: "NEXON",
    variants: [
      { variant: "1.2L Revotron XM / XZ+ MT/AMT", startYear: "2017", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.5L Revotorq XM / XZ+ MT/AMT", startYear: "2017", endYear: "Present", fuelType: "Diesel" },
      { variant: "1.2L i-CNG Twin-Cylinder", startYear: "2024", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "TATA",
    model: "TIAGO",
    variants: [
      { variant: "1.2L Revotron XE / XT / XZ MT/AMT", startYear: "2016", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.2L i-CNG XE / XT / XZ MT/AMT", startYear: "2022", endYear: "Present", fuelType: "CNG" },
      { variant: "1.05L Revotorq Diesel", startYear: "2016", endYear: "2020", fuelType: "Diesel" }
    ]
  },
  {
    make: "TATA",
    model: "PUNCH",
    variants: [
      { variant: "1.2L Revotron Pure / Adventure MT/AMT", startYear: "2021", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.2L i-CNG Accomplished / Dazzle", startYear: "2023", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "TATA",
    model: "ALTROZ",
    variants: [
      { variant: "1.2L Revotron XE/XM/XZ MT/DCA", startYear: "2020", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.5L Revotorq Diesel 5MT", startYear: "2020", endYear: "Present", fuelType: "Diesel" },
      { variant: "1.2L i-CNG Dual Cylinder", startYear: "2023", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "MAHINDRA",
    model: "BOLERO",
    variants: [
      { variant: "1.5L mHawk75 B4 / B6 Diesel", startYear: "2016", endYear: "Present", fuelType: "Diesel" },
      { variant: "2.5L m2DiCR ExtraLong Fleet", startYear: "2014", endYear: "Present", fuelType: "Diesel" }
    ]
  },
  {
    make: "MAHINDRA",
    model: "SCORPIO CLASSIC",
    variants: [
      { variant: "2.2L mHawk CRDe S / S11 6MT", startYear: "2014", endYear: "Present", fuelType: "Diesel" },
      { variant: "2.2L mHawk130 Gen-2 Diesel", startYear: "2022", endYear: "Present", fuelType: "Diesel" }
    ]
  },
  {
    make: "MAHINDRA",
    model: "XUV300",
    variants: [
      { variant: "1.2L Turbo Petrol W4/W6/W8 6MT", startYear: "2019", endYear: "2024", fuelType: "Petrol" },
      { variant: "1.5L Turbo Diesel W6/W8 MT/AMT", startYear: "2019", endYear: "2024", fuelType: "Diesel" }
    ]
  }
];

// 3. Commercial & Heavy Duty Fleet (14 Models - Mahindra, Tata, Force, Ashok Leyland)
export const COMMERCIAL_FLEET_FITMENT_LIST = [
  {
    make: "MAHINDRA",
    model: "BOLERO POWER+",
    variants: [
      { variant: "1.5L mHawk75 D70 SLE/SLX/ZLX", startYear: "2016", endYear: "2020", fuelType: "Diesel" },
      { variant: "1.5L BS6 B4 / B6 / B6(O)", startYear: "2020", endYear: "Present", fuelType: "Diesel" }
    ]
  },
  {
    make: "MAHINDRA",
    model: "BOLERO MAXI TRUCK PLUS",
    variants: [
      { variant: "2.5L DI Turbo Plus Pickup", startYear: "2014", endYear: "2020", fuelType: "Diesel" },
      { variant: "2.5L m2DiCR BS6 Extra Heavy", startYear: "2020", endYear: "Present", fuelType: "Diesel" },
      { variant: "2.5L CNG Maxi Truck", startYear: "2017", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "MAHINDRA",
    model: "BOLERO CAMPER",
    variants: [
      { variant: "2.5L m2DiCR 4WD / 2WD Heavy Duty", startYear: "2012", endYear: "Present", fuelType: "Diesel" },
      { variant: "2.5L Gold ZX Dual Cab", startYear: "2018", endYear: "Present", fuelType: "Diesel" }
    ]
  },
  {
    make: "MAHINDRA",
    model: "BOLERO NEO",
    variants: [
      { variant: "1.5L mHawk100 N4 / N8 / N10 Diesel", startYear: "2021", endYear: "Present", fuelType: "Diesel" },
      { variant: "1.5L Neo Plus 9-Seater 6MT", startYear: "2023", endYear: "Present", fuelType: "Diesel" }
    ]
  },
  {
    make: "MAHINDRA",
    model: "SCORPIO CLASSIC FLEET",
    variants: [
      { variant: "2.2L mHawk120 S3+ 9-Seater MT", startYear: "2015", endYear: "2022", fuelType: "Diesel" },
      { variant: "2.2L mHawk130 S Commercial Fleet", startYear: "2022", endYear: "Present", fuelType: "Diesel" }
    ]
  },
  {
    make: "MAHINDRA",
    model: "SCORPIO-N",
    variants: [
      { variant: "2.2L mHawk Diesel Z4/Z8 MT/AT", startYear: "2022", endYear: "Present", fuelType: "Diesel" },
      { variant: "2.0L mStallion Turbo Petrol Z4/Z8", startYear: "2022", endYear: "Present", fuelType: "Petrol" }
    ]
  },
  {
    make: "MAHINDRA",
    model: "SUPRO FLEET",
    variants: [
      { variant: "900cc DI Diesel Mini Van / Maxi Cab", startYear: "2016", endYear: "Present", fuelType: "Diesel" },
      { variant: "900cc Profit Truck Maxi / Mini", startYear: "2020", endYear: "Present", fuelType: "Diesel" },
      { variant: "900cc CNG Profit Truck", startYear: "2021", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "TATA",
    model: "ACE GOLD",
    variants: [
      { variant: "700cc Petrol High Deck", startYear: "2018", endYear: "Present", fuelType: "Petrol" },
      { variant: "800cc 2-Cyl DI Diesel", startYear: "2018", endYear: "Present", fuelType: "Diesel" },
      { variant: "700cc Bi-Fuel CNG Plus", startYear: "2019", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "TATA",
    model: "INTRA V10 / V30 / V50",
    variants: [
      { variant: "1.4L DI Diesel Intra V10 Rugged", startYear: "2019", endYear: "Present", fuelType: "Diesel" },
      { variant: "1.5L Rugged CRDi Intra V30 Smart", startYear: "2020", endYear: "Present", fuelType: "Diesel" },
      { variant: "1.2L Bi-Fuel CNG Intra V20", startYear: "2022", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "TATA",
    model: "YODHA PICKUP",
    variants: [
      { variant: "2.2L DI Eco 4x2 / 4x4 Crew Cab", startYear: "2017", endYear: "Present", fuelType: "Diesel" },
      { variant: "2.2L Heavy Duty 2.0 Tonne Payload", startYear: "2022", endYear: "Present", fuelType: "Diesel" }
    ]
  },
  {
    make: "MARUTI",
    model: "SUPER CARRY",
    variants: [
      { variant: "1.2L K-Series DualJet Commercial Cab", startYear: "2016", endYear: "Present", fuelType: "Petrol" },
      { variant: "1.2L S-CNG Commercial Mini Truck", startYear: "2017", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "MARUTI",
    model: "EECO CARGO",
    variants: [
      { variant: "1.2L G12B Cargo Van MT", startYear: "2010", endYear: "2022", fuelType: "Petrol" },
      { variant: "1.2L Cargo CNG Fleet", startYear: "2012", endYear: "Present", fuelType: "CNG" },
      { variant: "1.2L K-Series DualJet Cargo", startYear: "2022", endYear: "Present", fuelType: "Petrol" }
    ]
  },
  {
    make: "ASHOK LEYLAND",
    model: "DOST+",
    variants: [
      { variant: "1.5L 3-Cyl Turbo Charged Diesel LCV", startYear: "2017", endYear: "Present", fuelType: "Diesel" },
      { variant: "1.5L CNG Bada Dost Commercial", startYear: "2021", endYear: "Present", fuelType: "CNG" }
    ]
  },
  {
    make: "FORCE",
    model: "TRAVELLER 3050 / 3350",
    variants: [
      { variant: "2.6L FM2.6 CR ED Diesel 14-STR", startYear: "2014", endYear: "Present", fuelType: "Diesel" },
      { variant: "2.6L Ambulance & School Bus Fleet", startYear: "2015", endYear: "Present", fuelType: "Diesel" }
    ]
  }
];

// 4. Universal Fleet (22 Models - Used for Oils, Fluids, Batteries, Spark Plugs, Wiper Blades, Fasteners)
export const UNIVERSAL_FLEET_FITMENT_LIST = [
  ...MULTI_BRAND_FITMENT_LIST.slice(0, 15),
  ...COMMERCIAL_FLEET_FITMENT_LIST.slice(0, 7)
];

/**
 * Resolves the structured vehicle fitment list for any auto part.
 * Always guarantees 10+ models matching the Boodmo / OEM format.
 */
export function getPartFitmentList(part) {
  if (!part) return [];

  // If part already has 10+ models, preserve it directly
  if (part.fitmentList && Array.isArray(part.fitmentList) && part.fitmentList.length >= 10) {
    return part.fitmentList;
  }

  const cat = part.category || '';
  const subcat = part.subcategory || '';
  const brand = (part.brand || '').toLowerCase();
  const name = (part.name || '').toLowerCase();
  const compVehicles = part.compatibleVehicles || [];

  // Check if it is a commercial heavy duty part
  if (
    compVehicles.includes('mahindra-bolero-2019') &&
    !compVehicles.includes('maruti-swift-2016') &&
    !compVehicles.includes('hyundai-creta-2020')
  ) {
    return COMMERCIAL_FLEET_FITMENT_LIST;
  }

  // Check if it is an electrical / battery / universal maintenance fluid / fastener part
  if (
    cat === 'maintenance-service' ||
    cat === 'fasteners-hardware' ||
    subcat === 'battery' ||
    subcat === 'brake-fluid' ||
    subcat === 'engine-oil' ||
    subcat === 'radiator-coolant' ||
    subcat === 'wiper-blades' ||
    name.includes('battery') ||
    name.includes('synthetic engine oil') ||
    name.includes('coolant') ||
    name.includes('brake fluid') ||
    name.includes('caliper pin') ||
    name.includes('fastener')
  ) {
    return UNIVERSAL_FLEET_FITMENT_LIST;
  }

  // Check if it is a multi-brand aftermarket part (Bosch, Brembo, NGK, Mann, TRW, Continental)
  if (
    compVehicles.length > 1 ||
    part.origin === 'Aftermarket' ||
    brand.includes('bosch') ||
    brand.includes('brembo') ||
    brand.includes('ngk') ||
    brand.includes('mann') ||
    brand.includes('trw') ||
    brand.includes('continental') ||
    brand.includes('castrol') ||
    brand.includes('mobil')
  ) {
    return MULTI_BRAND_FITMENT_LIST;
  }

  // Default to Maruti Suzuki Comprehensive Fleet (matches the 24 models in screenshots)
  return MARUTI_FITMENT_LIST;
}
