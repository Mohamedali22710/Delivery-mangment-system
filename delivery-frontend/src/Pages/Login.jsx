import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getProfile } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token, user, loading, fieldErrors } = useSelector((s) => s.auth);

  const onSubmit = (data) => dispatch(loginUser(data));

  useEffect(() => {
    if (token && !user) dispatch(getProfile());
    if (user) navigate(user.role === "admin" ? "/dashboard" : "/driver");
  }, [token, user]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left: Image & Text */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative p-12 flex-col justify-between">
        <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Login bg" />
        <div className="relative z-10 text-white">
          <h2 className="text-4xl font-bold italic tracking-tighter">LOGISTICPRO.</h2>
        </div>
        <div className="relative z-10 text-white">
          <p className="text-2xl font-light italic">"Precision in every delivery, power in every click."</p>
          <p className="mt-4 font-bold text-blue-400">— Supply Chain Excellence</p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
          <p className="text-slate-500 mb-8">Enter your credentials to access your dashboard.</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
              <input {...register("email", { required: "Email required" })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="name@company.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  {/* err msg from back */}
                {fieldErrors.email && (
        <p className="text-red-500 text-sm mt-2 font-bold">
          {fieldErrors.email}
        </p>
      )}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
              <input type="password" {...register("password", { required: "Password required" })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="••••••••" />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                  {/* err msg from back */}
                {fieldErrors.password && (
        <p className="text-red-500 text-sm mt-2 font-bold">
          {fieldErrors.password}
        </p>
      )}
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition">
              {loading ? "Authenticating..." : "Login to Account"}
            </button>
          </form>
          <p className="mt-6 text-center text-slate-600">Don't have an account? <Link to="/register" className="text-blue-600 font-bold">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}