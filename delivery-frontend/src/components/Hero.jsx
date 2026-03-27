export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl font-black text-slate-900 leading-[1.1] mb-6">
            Smart Logistics <br /><span className="text-blue-600">Real-Time Control.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            The next generation of fleet management. Track every shipment, manage every driver, and scale your business with data-driven insights.
          </p>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition">Get Started Today</button>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" 
            alt="Logistics" className="rounded-3xl shadow-2xl" 
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Shipments</p>
            <p className="text-3xl font-black text-blue-600">1,284</p>
          </div>
        </div>
      </div>
    </section>
  );
}