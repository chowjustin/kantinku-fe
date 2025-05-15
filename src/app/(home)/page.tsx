"use client";

import Navbar from "@/layouts/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import Footer from "@/layouts/Footer";
import CartFooter from "@/layouts/CartFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MenuSection />
      <CartFooter />
      <Footer />
    </>
  );
}
