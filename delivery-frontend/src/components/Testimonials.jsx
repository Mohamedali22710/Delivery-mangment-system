export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-900 text-white px-6">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-5xl font-serif text-blue-500 block mb-8">“</span>
        <h3 className="text-3xl md:text-4xl font-light italic leading-snug mb-12">
          "Switching to LogisticPro was the best decision for our fleet. The real-time tracking accuracy is unmatched, and our drivers love the instant payment system."
        </h3>
        <div className="flex flex-col items-center">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" 
            className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-blue-600"
            alt="CEO"
          />
          <p className="text-lg font-black uppercase tracking-widest">Marcus Chen</p>
          <p className="text-blue-500 text-sm font-bold uppercase tracking-widest mt-1">Director @ Global Logistics</p>
        </div>
      </div>
    </section>
  );
}