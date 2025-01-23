
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home';
// import ShopComponent from './pages/Shop.tsx';

// import RepairComponent from './pages/repairs.tsx';
// import AccessoriesComponent from './pages/accessories.tsx';
//import { BrowserRouter, Switch } from 'react-router-dom';


import Shop from './pages/Shop';
//import ProductDetails from './pages/ProductDetails';
//import Cart from './pages/Cart';
//import Checkout from './pages/Checkout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products.tsx';
import Auth from './components/Auth.tsx';
//import AdminRoute from './pages/admin/AdminRoute.tsx';
//import AdminCategories from './pages/admin/Categories';
//import AdminOrders from './pages/admin/Orders';


const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // Track admin login status

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true); // Update the state when login is successful
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false); // Log the admin out
  };
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-center" />
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
             {/*<Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />*/}
           
            {/*<Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/orders" element={<AdminOrders />} /> */}
            {/* Admin Login */}
                    <Route path="/login"
                      element={
                        isAdminLoggedIn ? (
                          <Navigate to="/admin" />
                        ) : (
                          <Auth onClose={() => {}} onLoginSuccess={handleLoginSuccess} />
                        )
                      }
                    />
            {/* Admin Dashboard */}
                    <Route
                      path="/admin"
                      element={
                        isAdminLoggedIn ? (
                          <AdminDashboard onLogout={handleLogout} />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />

             {/* Admin Product  */}
             <Route
                      path="/admin/products"
                      element={
                        isAdminLoggedIn ? (
                          <AdminProducts onLogout={handleLogout} />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
           
            
            {/* Redirect to login if no matching route */}
                    <Route path="*" element={<Navigate to="/login" />} /> 
                  
            
            {/*<Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/" element={<AdminDashboard />} />*/}
            



         
        
            
            
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
