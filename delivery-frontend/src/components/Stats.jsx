export default function Stats() {
  const stats = [
    { label: "Active Drivers", value: "12,400+" },
    { label: "Daily Shipments", value: "85k" },
    { label: "Cities Covered", value: "140+" },
    { label: "Client Rating", value: "4.9/5" }
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((item, idx) => (
            <div key={idx} className="text-center md:text-left">
              <h3 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">{item.value}</h3>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}