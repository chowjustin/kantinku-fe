import Navbar from "@/layouts/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import Footer from "@/layouts/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MenuSection />
      <Footer />
    </>
  );
}
