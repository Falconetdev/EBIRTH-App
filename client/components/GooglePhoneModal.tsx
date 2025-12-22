import { useState, FormEvent } from "react";
import { X, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GooglePhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phone: string) => void;
  loading: boolean;
  userName: string;
}

export default function GooglePhoneModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
  userName,
}: GooglePhoneModalProps) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate phone number
    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }

    if (phone.trim().length < 9) {
      setError("Please enter a valid phone number");
      return;
    }

    onSubmit(phone.trim());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900/90 to-purple-800/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Welcome, {userName}! 👋
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-white/80 mb-6">
          We just need your phone number to complete your registration and get you started.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Label htmlFor="phone" className="text-white mb-2">
              Phone Number
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-white/40" />
              </div>
              <Input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 bg-white/10 border-purple-500/30 text-white placeholder:text-white/40 focus:border-[#FFD700] focus:ring-[#FFD700]"
                placeholder="Enter your phone number"
                disabled={loading}
                autoFocus
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={onClose}
              disabled={loading}
              variant="outline"
              className="flex-1 border-purple-500/30 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#FFD700] text-black hover:bg-[#FFC700] font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </div>
        </form>

        <p className="mt-4 text-xs text-white/50 text-center">
          Your phone number will be used for important course updates and support.
        </p>
      </div>
    </div>
  );
}
