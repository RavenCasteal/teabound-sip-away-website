
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { CartProvider } from './CartContext';
import CartSidebar from './CartSidebar';

const Layout = () => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <CartSidebar />
      </div>
    </CartProvider>
  );
};

export default Layout;
