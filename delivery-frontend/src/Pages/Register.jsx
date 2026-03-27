import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { role: "driver" }
  });

  const { user, loading } = useSelector((s) => s.auth);
  const [showPassword, setShowPassword] = useState(false);
  
  
  const selectedRole = watch("role");

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/dashboard" : "/driver");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen bg-white font-sans selection:bg-blue-100">
      
      {/* ── LEFT SIDE: IMAGE & TEXT ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative p-16 flex-col justify-between overflow-hidden">
        {/* Hero Image */}
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" 
          className="absolute inset-0 w-full h-full object-cover opacity-40" 
          alt="Logistics" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
        
        {/* Logo Text */}
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-black text-white tracking-tighter italic">
            LOGISTIC<span className="text-blue-500">PRO.</span>
          </Link>
        </div>

        {/* Value Prop Heading */}
        <div className="relative z-10 text-white">
          <h2 className="text-6xl font-black mb-6 leading-tight tracking-tighter">
            THE FUTURE <br /> OF FLEET <br /> <span className="text-blue-500">MANAGEMENT.</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 mb-8"></div>
          <p className="text-slate-400 text-xl font-medium max-w-sm">
            Join the most advanced logistics network in the region.
          </p>
        </div>

        <div className="relative z-10 text-slate-500 text-xs font-bold uppercase tracking-widest">
          EST. 2026 / GLOBAL LOGISTICS
        </div>
      </div>

      {/* ── RIGHT SIDE: FORM ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 text-2xl font-black tracking-tighter italic text-slate-900">
            LOGISTIC<span className="text-blue-600">PRO.</span>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Create Account</h1>
            <p className="text-slate-500 font-medium">Step into a more efficient workflow today.</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div className="group">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-blue-600 transition-colors">Full Name</label>
              <input 
                {...register("name", { required: "Name is required" })} 
                className={`w-full py-4 bg-transparent border-b-2 ${errors.name ? 'border-red-500' : 'border-slate-200'} focus:border-blue-600 outline-none transition-all text-lg font-medium`} 
                placeholder="James Wilson" 
              />
              {errors.name && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-tighter">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-blue-600 transition-colors">Work Email</label>
              <input 
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                })} 
                className={`w-full py-4 bg-transparent border-b-2 ${errors.email ? 'border-red-500' : 'border-slate-200'} focus:border-blue-600 outline-none transition-all text-lg font-medium`} 
                placeholder="james@company.com" 
              />
              {errors.email && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-tighter">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-blue-600 transition-colors">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  {...register("password", { 
                    required: "Password required", 
                    minLength: { value: 6, message: "Min 6 chars" } 
                  })} 
                  className={`w-full py-4 bg-transparent border-b-2 ${errors.password ? 'border-red-500' : 'border-slate-200'} focus:border-blue-600 outline-none transition-all text-lg font-medium`} 
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-tighter">{errors.password.message}</p>}
            </div>

            {/* Role Selection (Minimalist Cards) */}
            <div className="pt-4">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Registering as:</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer border-2 py-5 rounded-none flex flex-col items-center justify-center transition-all ${selectedRole === 'driver' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'}`}>
                  <input type="radio" value="driver" {...register("role")} className="hidden" />
                  <span className="font-black uppercase tracking-widest text-sm italic">Driver</span>
                </label>
                
                <label className={`cursor-pointer border-2 py-5 rounded-none flex flex-col items-center justify-center transition-all ${selectedRole === 'admin' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'}`}>
                  <input type="radio" value="admin" {...register("role")} className="hidden" />
                  <span className="font-black uppercase tracking-widest text-sm italic">Admin</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-none font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 transition-all flex items-center justify-center mt-10"
            >
              {loading ? "Processing..." : "Create Account"}
            </button>
          </form>

          <p className="mt-10 text-center text-slate-400 text-sm font-medium">
            Already registered?{" "}
            <Link to="/login" className="text-slate-900 font-black uppercase tracking-widest hover:text-blue-600 border-b-2 border-slate-900 ml-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}