import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

const AdminRegister = () => {
  const { register, user } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    passphrase: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null);
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) {
      return "Name is required";
    }
    if (!formData.email.trim()) {
      return "Email is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Invalid email format";
    }
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    if (!formData.passphrase.trim()) {
      return "Passphrase is required";
    }
    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.passphrase
      );
      
      toast({ 
        title: "Registration successful!", 
        description: "Your admin account has been created." 
      });
      
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to register";
      setError(errorMessage);
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42] px-4 py-16 text-white">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-[0_30px_80px_rgba(10,0,20,0.55)] backdrop-blur">
        <h1 className="text-3xl font-semibold text-white">Admin Registration</h1>
        <p className="mt-1 text-sm text-white/70">
          Create an admin account for eBirth Business Academy
        </p>
        
        {error && (
          <div className="mt-4 rounded-xl bg-red-500/20 px-3 py-2 text-sm text-red-100 border border-red-500/30">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/90 flex items-center gap-2">
              <User size={16} />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40"
              placeholder="John Doe"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/90 flex items-center gap-2">
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40"
              placeholder="admin@ebirth.net"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/90 flex items-center gap-2">
              <Lock size={16} />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 pr-10 text-sm text-white placeholder-white/50 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-white/50">Minimum 8 characters</p>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/90 flex items-center gap-2">
              <Lock size={16} />
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 pr-10 text-sm text-white placeholder-white/50 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Passphrase Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/90 flex items-center gap-2">
              <Lock size={16} className="text-[#FFD700]" />
              Admin Passphrase
            </label>
            <div className="relative">
              <input
                type={showPassphrase ? "text" : "password"}
                name="passphrase"
                required
                value={formData.passphrase}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#FFD700]/30 bg-white/5 px-3 py-2 pr-10 text-sm text-white placeholder-white/50 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40"
                placeholder="Enter admin passphrase"
              />
              <button
                type="button"
                onClick={() => setShowPassphrase(!showPassphrase)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
              >
                {showPassphrase ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-[#FFD700]/70">
              Contact the web team to obtain the admin passphrase
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#FFD700] py-2.5 text-sm font-semibold text-[#1B0B2E] transition hover:bg-[#ffd700] disabled:opacity-60 disabled:cursor-not-allowed mt-6"
          >
            {isSubmitting ? "Creating Account..." : "Create Admin Account"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-xs text-white/60 space-y-2">
          <p>
            Already have an account?{" "}
            <Link to="/admin/login" className="font-semibold text-[#FFD700] hover:underline">
              Sign In
            </Link>
          </p>
          <p>
            <Link to="/" className="font-semibold text-[#FFD700] hover:underline">
              Back to site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;