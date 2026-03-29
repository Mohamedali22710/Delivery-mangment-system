export default function Features() {
  const features = [
    { num: "01", title: "Real-Time Tracking", desc: "Monitor every vehicle and package with precision GPS coordinates and live status updates." },
    { num: "02", title: "Smart Dispatch", desc: "AI-driven order assignment that optimizes routes and reduces fuel consumption automatically." },
    { num: "03", title: "Instant Payouts", desc: "Drivers receive their earnings directly to their wallets as soon as the delivery is confirmed." }
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Capabilities</h2>
          <h3 className="text-5xl font-black text-slate-900 tracking-tighter">Engineered for Scale.</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-16">
          {features.map((f, i) => (
            <div key={i} className="group">
              <div className="text-7xl font-black text-slate-200 mb-6 group-hover:text-blue-100 transition-colors duration-500">
                {f.num}
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{f.title}</h4>
              <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              <div className="h-1 w-12 bg-slate-200 mt-6 group-hover:w-24 group-hover:bg-blue-600 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}