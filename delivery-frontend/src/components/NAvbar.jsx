// components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-slate-900 tracking-tighter">
          LOGISTIC<span className="text-blue-600">PRO</span>
        </Link>
        <div className="hidden md:flex gap-8 font-medium text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600 transition">Process</a>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-slate-600 font-semibold">Login</Link>
          <Link to="/register" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition">Join Now</Link>
        </div>
      </div>
    </nav>
  );
}