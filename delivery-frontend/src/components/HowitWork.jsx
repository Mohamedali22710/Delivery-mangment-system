export default function HowItWorks() {
  const steps = [
    { title: "Register Account", text: "Sign up as an admin or driver and complete your professional profile." },
    { title: "Verification", text: "Our team reviews your documents to ensure security across the network." },
    { title: "Go Live", text: "Start accepting shipments and managing your fleet in real-time." }
  ];

  return (
    <section className="py-24 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1000" 
            className="rounded-4xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
            alt="Process" 
          />
          <div className="absolute top-10 -right-10 bg-slate-900 text-white p-8 rounded-2xl hidden xl:block">
            <p className="text-4xl font-black italic tracking-tighter">Fast-Track</p>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Your Business</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4">The Process</h2>
          <h3 className="text-5xl font-black text-slate-900 tracking-tighter mb-12">How it works.</h3>
          
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-8">
                <div className="shrink-0 w-12 h-12 rounded-full border-2 border-slate-900 flex items-center justify-center font-black text-xl">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">{step.title}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}