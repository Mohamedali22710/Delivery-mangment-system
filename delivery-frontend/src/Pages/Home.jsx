import Navbar from "../components/NAvbar";
import Hero from "../components/Hero";
// نفذ نفس الفكرة لباقي السكاشن (Stats, Features, etc.)
// import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-blue-100">
      <Navbar />
      <main>
        <Hero />
        
      </main>
     
    </div>
  );
}