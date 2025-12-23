import { useState, FormEvent, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import GooglePhoneModal from "@/components/GooglePhoneModal";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const { googleLogin } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [tempGoogleData, setTempGoogleData] = useState<any>(null);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Initialize Google Sign-In
  useEffect(() => {
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleSuccess,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: 'filled_black',
          size: 'large',
          width: googleButtonRef.current.offsetWidth,
          text: 'signup_with',
          shape: 'rectangular',
        }
      );
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "student",
            passphrase: "SecurePass2024",
            profileData: {
              phone: formData.phone || null,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Account created successfully! Redirecting to login...");
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError("");
    setLoading(true);

    try {
      const result = await googleLogin(credentialResponse.credential);

      if (result.requiresPhone) {
        setTempGoogleData({
          credential: credentialResponse.credential,
          ...result.tempUserData,
        });
        setShowPhoneModal(true);
        setLoading(false);
      } else {
        navigate("/membership");
      }
    } catch (err: any) {
      setError(err.message || "Google registration failed. Please try again.");
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async (phone: string) => {
    setPhoneLoading(true);
    setError("");

    try {
      const result = await googleLogin(tempGoogleData.credential, phone);

      if (!result.requiresPhone) {
        setShowPhoneModal(false);
        setTempGoogleData(null);
        navigate("/membership");
      }
    } catch (err: any) {
      setError(err.message || "Failed to complete registration. Please try again.");
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleClosePhoneModal = () => {
    setShowPhoneModal(false);
    setTempGoogleData(null);
    setLoading(false);
  };

  return (
    <PageLayout className="bg-[#1a0b2e] bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-transparent">
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        {/* Background glow effect */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.25),_rgba(26,11,46,0))] blur-3xl"></div>

        {/* Decorative floating coins */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
          <img
            src="/coin1.webp"
            alt="Decorative coin"
            className="coin-float absolute right-8 top-32 h-32 w-24 rotate-[15deg] hidden lg:block"
            style={{ animationDelay: '0.8s' }}
          />
          <img
            src="/Bitcoin-PNG-removebg-preview.png"
            alt="Decorative coin"
            className="coin-float absolute left-16 top-40 h-20 w-20 rotate-[-15deg] hidden lg:block"
            style={{ animationDelay: '1.5s' }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid gap-12 items-center lg:grid-cols-2">
            {/* Left side - Branding */}
            <div className="hidden lg:flex flex-col items-start">
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Start Your Journey with
                <br />
                <span className="text-[#FFD700]">eBirth Academy</span>
              </h1>
              <p className="text-white/80 text-xl mb-8 max-w-lg">
                Join thousands of students mastering crypto trading and business skills.
                Create your account and unlock premium courses.
              </p>
              <div className="space-y-4 text-white/70">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <span>Access to all courses</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <span>Expert mentorship</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <span>Community support</span>
                </div>
              </div>
            </div>

            {/* Right side - Register Form */}
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
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Get Started</h2>
                  <p className="text-white/60">Create your free account</p>
                </div>

                {error && (
                  <Alert className="mb-6 bg-red-500/10 border-red-500/50 text-red-300">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="mb-6 bg-green-500/10 border-green-500/50 text-green-300">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-semibold">
                      Full Name <span className="text-[#FFD700]">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/40 focus:border-[#FFD700] focus:ring-[#FFD700] h-12"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-semibold">
                      Email Address <span className="text-[#FFD700]">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/40 focus:border-[#FFD700] focus:ring-[#FFD700] h-12"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white font-semibold">
                      Phone Number <span className="text-[#FFD700]">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/40 focus:border-[#FFD700] focus:ring-[#FFD700] h-12"
                      placeholder="+94 77 123 4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white font-semibold">
                      Password <span className="text-[#FFD700]">*</span>
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/40 focus:border-[#FFD700] focus:ring-[#FFD700] h-12"
                      placeholder="••••••••"
                    />
                    <p className="text-xs text-white/40">Minimum 6 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white font-semibold">
                      Confirm Password <span className="text-[#FFD700]">*</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
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
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

                {/* Google Sign Up Divider */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-purple-500/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-[#1a0b2e] text-white/60">Or sign up with</span>
                    </div>
                  </div>
                </div>

                {/* Google Sign Up Button */}
                <div className="mt-6 flex justify-center">
                  <div ref={googleButtonRef} className="w-full"></div>
                </div>

                <div className="mt-6 text-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-purple-500/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-[#1a0b2e] text-white/60">Already have an account?</span>
                    </div>
                  </div>
                  
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="w-full border-[#FFD700]/50 text-[#FFD700] hover:bg-[#FFD700]/10 font-semibold h-12"
                    >
                      Sign In
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

      {/* Phone Number Modal for New Google Users */}
      {showPhoneModal && tempGoogleData && (
        <GooglePhoneModal
          isOpen={showPhoneModal}
          onClose={handleClosePhoneModal}
          onSubmit={handlePhoneSubmit}
          loading={phoneLoading}
          userName={tempGoogleData.name}
        />
      )}
    </PageLayout>
  );
}