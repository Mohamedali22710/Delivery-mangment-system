import Navbar from "../components/NAvbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import HowItWorks from "../components/HowitWork";
import Testimonials from "../components/Testimonials";
// import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-blue-100">
      <Navbar />
      <main>
        <Hero />
        <Stats/>
        <Features/>
        <HowItWorks/>
        <Testimonials/>
      </main>
     
    </div>
  );
}