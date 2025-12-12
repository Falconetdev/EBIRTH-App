import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Moon,
  Sun,
} from "lucide-react";
import api from "../services/api";

const ForgotPassword = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/api/auth/forgot-password", { email });
      navigate("/reset-password");
      setEmail("");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to generate reset code. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:bg-[#1a0b2e] dark:from-purple-900/30 dark:via-purple-800/20 dark:to-transparent transition-colors duration-300">
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        {/* Background glow effect */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(147,197,253,0.3),_rgba(243,244,246,0))] dark:bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.25),_rgba(26,11,46,0))] blur-3xl"></div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-50"
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-[#FFD700]" />
          ) : (
            <Moon className="h-5 w-5 text-purple-600" />
          )}
        </button>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid gap-12 items-center lg:grid-cols-2">
            {/* Left side - Branding */}
            <div className="hidden lg:flex flex-col items-start">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Forgot Your Password?
                <br />
                <span className="text-[#FFD700]">No Problem!</span>
              </h1>
              <p className="text-gray-700 dark:text-white/80 text-xl mb-8 max-w-lg">
                Enter your email address and we'll generate a 6-digit reset code
                for you.
              </p>
              <div className="flex items-center gap-4 text-gray-600 dark:text-white/60">
                <div className="flex -space-x-2">
                  <div className="h-10 w-10 rounded-full border-2 border-blue-300 dark:border-purple-500/40 bg-gradient-to-br from-purple-400 to-purple-600"></div>
                  <div className="h-10 w-10 rounded-full border-2 border-blue-300 dark:border-purple-500/40 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                  <div className="h-10 w-10 rounded-full border-2 border-blue-300 dark:border-purple-500/40 bg-gradient-to-br from-pink-400 to-pink-600"></div>
                </div>
                <span className="text-[#FFD700] font-semibold">
                  Secure & Fast
                </span>
              </div>
            </div>

            {/* Right side - Forgot Password Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-white/90 dark:bg-[#1a0b2e]/60 backdrop-blur-xl border border-gray-200 dark:border-purple-500/20 rounded-3xl p-8 shadow-2xl">
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
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Reset Password
                  </h2>
                  <p className="text-gray-600 dark:text-white/60">
                    Get your 6-digit reset code
                  </p>
                </div>

                {error && (
                  <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-300 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">{error}</div>
                    </div>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-gray-800 dark:text-white font-semibold text-sm block"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex h-12 w-full rounded-md border border-gray-300 dark:border-purple-500/30 bg-white dark:bg-white/5 px-3 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                      placeholder="your.email@example.com"
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold h-12 text-lg rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Generating...
                      </span>
                    ) : (
                      "Get Reset Code"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigate("/login")}
                    className="inline-flex items-center gap-2 text-gray-700 dark:text-white/80 hover:text-[#FFD700] dark:hover:text-[#FFD700] transition-colors font-medium"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-purple-500/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-[#1a0b2e] text-gray-600 dark:text-white/60">
                        eBirth Business Academy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
