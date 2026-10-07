import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import CartDrawer from './components/CartDrawer/CartDrawer';
import SetuHome from './pages/SetuHome/SetuHome';
import Hardware from './pages/Hardware/Hardware';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Solutions from './pages/Solutions/Solutions';
import AutoParts from './pages/AutoParts/AutoParts';
import Order from './pages/Order/Order';
import Cart from './pages/Cart/Cart';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import './styles/globals.css';
import './App.css';

/* ── Generic Coming Soon Screen for non-Setu menu options ── */
function ComingSoon({ title, badge = 'COMING SOON', description }) {
  const navigate = useNavigate();
  return (
    <div className="coming-soon">
      <div className="coming-soon__inner">
        <div className="coming-soon__badge">{badge}</div>
        <h2>{title}</h2>
        <p>
          {description || `${title} module is currently under development. You can explore and purchase devices and telematics solutions on the Setu platform.`}
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go to Setu Platform →
        </button>
      </div>
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  const isHomepage = location.pathname === '/' || location.pathname === '/setu';

  return (
    <div className={`app-shell ${isHomepage ? 'app-shell--homepage' : ''}`}>
      {!isHomepage && <Sidebar />}
      <div className={`app-main ${isHomepage ? 'app-main--full' : ''}`}>
        <Header />
        <div className={`app-content ${isHomepage ? 'app-content--homepage' : ''}`}>
          <Routes>
            {/* ── Setu Platform (Primary Navigation from bottom icon) ── */}
            <Route path="/" element={<SetuHome />} />
            <Route path="/setu" element={<SetuHome />} />
            <Route path="/hardware" element={<Hardware />} />
            <Route path="/setu/hardware" element={<Hardware />} />
            <Route path="/hardware/:slug" element={<ProductDetail />} />
            <Route path="/setu/hardware/:slug" element={<ProductDetail />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/setu/solutions" element={<Solutions />} />
            <Route path="/solutions/:id" element={<Solutions />} />
            <Route path="/setu/solutions/:id" element={<Solutions />} />

            {/* ── Other Menu Options (All Coming Soon) ── */}
            <Route path="/dashboard" element={<ComingSoon title="Dashboard" description="Fleet operations dashboard is coming soon. Please use the bottom menu icon to navigate the Setu platform." />} />
            <Route path="/tracking" element={<ComingSoon title="Live Tracking" description="Real-time map and vehicle GPS tracking is coming soon. Please use the bottom menu icon to navigate the Setu platform." />} />
            <Route path="/reports" element={<ComingSoon title="Reports" description="Telemetry and fleet reports module is coming soon." />} />
            <Route path="/charts" element={<ComingSoon title="Charts & Analytics" description="Analytics and fuel telemetry charts module is coming soon." />} />
            <Route path="/settings" element={<ComingSoon title="Settings" description="System and platform settings module is coming soon." />} />
            <Route path="/profile" element={<ComingSoon title="User Profile" description="Account management and user profile module is coming soon." />} />
            <Route path="/notifications" element={<ComingSoon title="Notifications" description="Live alerts and notifications center is coming soon." />} />
            <Route path="/downloads" element={<ComingSoon title="Downloads" description="Firmware, drivers and PDF downloads are coming soon." />} />
            <Route path="/auto-parts" element={<AutoParts />} />
            <Route path="/setu/auto-parts" element={<AutoParts />} />
            <Route path="/auto-parts/:slug" element={<ProductDetail />} />
            <Route path="/setu/auto-parts/:slug" element={<ProductDetail />} />
            <Route path="/finance" element={<ComingSoon title="Setu Finance" description="Equipment financing and leasing options for commercial fleets are coming soon." />} />
            <Route path="/order" element={<Order />} />
            <Route path="/setu/order" element={<Order />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/setu/cart" element={<Cart />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/setu/order-history" element={<OrderHistory />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/setu/orders" element={<OrderHistory />} />
            <Route path="/order-details" element={<OrderDetails />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="/setu/order-details" element={<OrderDetails />} />
            <Route path="/setu/order-details/:id" element={<OrderDetails />} />

            {/* Fallback */}
            <Route path="*" element={<ComingSoon title="Page Not Found" description="The page you are looking for does not exist." />} />
          </Routes>
        </div>
      </div>
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </BrowserRouter>
  );
}
