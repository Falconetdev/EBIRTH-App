import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Moon,
  Sun,
} from "lucide-react";
import api from "../services/api";

const ResetPassword = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    resetCode: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.resetCode.length !== 6) {
      setError("Reset code must be 6 digits");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/auth/reset-password", {
        token: formData.resetCode,
        newPassword: formData.newPassword,
      });
      setSuccess(true);
      setFormData({
        email: "",
        resetCode: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please check your code and try again.",
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
                Create Your
                <br />
                <span className="text-[#FFD700]">New Password</span>
              </h1>
              <p className="text-gray-700 dark:text-white/80 text-xl mb-8 max-w-lg">
                Enter your 6-digit reset code and choose a strong password to
                secure your account.
              </p>
              <div className="flex items-center gap-4 text-gray-600 dark:text-white/60">
                <div className="flex -space-x-2">
                  <div className="h-10 w-10 rounded-full border-2 border-blue-300 dark:border-purple-500/40 bg-gradient-to-br from-purple-400 to-purple-600"></div>
                  <div className="h-10 w-10 rounded-full border-2 border-blue-300 dark:border-purple-500/40 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                  <div className="h-10 w-10 rounded-full border-2 border-blue-300 dark:border-purple-500/40 bg-gradient-to-br from-pink-400 to-pink-600"></div>
                </div>
                <span className="text-[#FFD700] font-semibold">
                  Secure & Encrypted
                </span>
              </div>
            </div>

            {/* Right side - Reset Password Form */}
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Reset Password
                  </h2>
                  <p className="text-gray-600 dark:text-white/60">
                    Enter your reset code
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

                {success && (
                  <div className="mb-6 bg-green-500/10 border border-green-500/50 text-green-600 dark:text-green-300 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        Password reset successfully! Redirecting to login...
                      </div>
                    </div>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label
                      htmlFor="resetCode"
                      className="text-gray-800 dark:text-white font-semibold text-sm block"
                    >
                      6-Digit Reset Code
                    </label>
                    <input
                      id="resetCode"
                      name="resetCode"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength="6"
                      required
                      value={formData.resetCode}
                      onChange={handleChange}
                      className="flex h-12 w-full rounded-md border border-gray-300 dark:border-purple-500/30 bg-white dark:bg-white/5 px-3 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700] disabled:cursor-not-allowed disabled:opacity-50 transition-colors text-center text-2xl tracking-widest font-bold"
                      placeholder="000000"
                      disabled={loading || success}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="newPassword"
                      className="text-gray-800 dark:text-white font-semibold text-sm block"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="flex h-12 w-full rounded-md border border-gray-300 dark:border-purple-500/30 bg-white dark:bg-white/5 px-3 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700] disabled:cursor-not-allowed disabled:opacity-50 transition-colors pr-10"
                        placeholder="••••••••"
                        disabled={loading || success}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white/80"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-gray-800 dark:text-white font-semibold text-sm block"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="flex h-12 w-full rounded-md border border-gray-300 dark:border-purple-500/30 bg-white dark:bg-white/5 px-3 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700] disabled:cursor-not-allowed disabled:opacity-50 transition-colors pr-10"
                        placeholder="••••••••"
                        disabled={loading || success}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white/80"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold h-12 text-lg rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    disabled={loading || success}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Resetting...
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </form>

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

export default ResetPassword;
