import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";

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
