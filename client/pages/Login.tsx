import { useState, FormEvent, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Get the return URL from location state
  const from = (location.state as any)?.from || null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use AuthContext login method
      const user = await login(credentials.email, credentials.password);

      // Redirect based on user role
      if (user.role === "student") {
        // If there's a return URL, redirect there with auto-open flag
        if (from) {
          navigate(`${from}?autoOpenPayment=true`);
        } else {
          // Otherwise go to membership page
          navigate("/membership");
        }
      } else {
        // For other roles, redirect to main app
        window.location.href = `${import.meta.env.VITE_MAIN_APP_URL || "http://localhost:5174"}/${user.role}`;
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout className="bg-[#1a0b2e] bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-transparent">
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        {/* Background glow effect */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.25),_rgba(26,11,46,0))] blur-3xl"></div>

        {/* Decorative floating coins */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
          <img
            src="/coin3.webp"
            alt="Decorative coin"
            className="coin-float absolute left-8 top-32 h-32 w-24 rotate-[-12deg] hidden lg:block"
            style={{ animationDelay: '0.5s' }}
          />
          <img
            src="/Bitcoin-PNG-removebg-preview.png"
            alt="Decorative coin"
            className="coin-float absolute right-16 top-40 h-20 w-20 rotate-[15deg] hidden lg:block"
            style={{ animationDelay: '1.2s' }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid gap-12 items-center lg:grid-cols-2">
            {/* Left side - Branding */}
            <div className="hidden lg:flex flex-col items-start">
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Welcome Back to
                <br />
                <span className="text-[#FFD700]">eBirth Academy</span>
              </h1>
              <p className="text-white/80 text-xl mb-8 max-w-lg">
                Continue your journey in trading and business education.
                Login to access your courses and community.
              </p>
              <div className="flex items-center gap-4 text-white/60">
                <div className="flex -space-x-2">
                  {["/students/s1.svg", "/students/s2.svg", "/students/s3.svg"].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Student"
                      className="h-10 w-10 rounded-full border-2 border-purple-500/40"
                    />
                  ))}
                </div>
                <span className="text-[#FFD700] font-semibold">Join 10K+ students</span>
              </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-[#1a0b2e]/60 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#1a0b2e]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                  <p className="text-white/60">Access your account</p>
                </div>

                {error && (
                  <Alert className="mb-6 bg-red-500/10 border-red-500/50 text-red-300">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-semibold">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={credentials.email}
                      onChange={handleChange}
                      className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/40 focus:border-[#FFD700] focus:ring-[#FFD700] h-12"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white font-semibold">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={credentials.password}
                      onChange={handleChange}
                      className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/40 focus:border-[#FFD700] focus:ring-[#FFD700] h-12"
                      placeholder="••••••••"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold h-12 text-lg rounded-lg transition-all hover:scale-[1.02]"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-purple-500/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-[#1a0b2e] text-white/60">New to eBirth?</span>
                    </div>
                  </div>
                  
                  <Link to="/register">
                    <Button
                      variant="outline"
                      className="w-full border-[#FFD700]/50 text-[#FFD700] hover:bg-[#FFD700]/10 font-semibold h-12"
                    >
                      Create an Account
                    </Button>
                  </Link>

                  <Link
                    to="/"
                    className="block text-white/60 hover:text-[#FFD700] transition-colors text-sm"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}