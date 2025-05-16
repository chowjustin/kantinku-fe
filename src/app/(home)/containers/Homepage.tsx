"use client";

import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import CartFooter from "@/layouts/CartFooter";
import withAuth from "@/components/hoc/withAuth";
import Hero from "@/app/(home)/components/Hero";
import MenuSection from "@/app/(home)/components/MenuSection";

export default withAuth(Home, "public");

function Home() {
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
