import React, { useState } from "react";
import "./App.css";
import Products from "./components/products/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./components/home/Home";
import Navbar from "./components/shared/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/Cart";
import LogIn from "./components/auth/LogIn";
import Checkout from "./components/checkout/Checkout";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
