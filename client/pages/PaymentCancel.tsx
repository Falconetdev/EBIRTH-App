import { useNavigate } from 'react-router-dom';
import { XCircle, Home, RefreshCw } from 'lucide-react';

const COIN_IMAGES = [
  '/Bitcoin-PNG-removebg-preview.png',
  '/coin2.webp',
  '/Bitcoin-PNG-removebg-preview.png',
  '/coin4.webp',
];

const COIN_POSITIONS = [
  { top: '5%',  left: '2%',   size: 120, opacity: 0.22, rotation: -18, delay: 0   },
  { top: '38%', left: '1%',   size: 90,  opacity: 0.18, rotation: -30, delay: 2.9 },
  { top: '70%', left: '3%',   size: 140, opacity: 0.20, rotation:  27, delay: 3.4 },
  { top: '8%',  left: '82%',  size: 130, opacity: 0.22, rotation:  22, delay: 1.6 },
  { top: '42%', left: '84%',  size: 100, opacity: 0.20, rotation: -14, delay: 0.7 },
  { top: '72%', left: '80%',  size: 115, opacity: 0.18, rotation:   8, delay: 1.1 },
  { top: '20%', left: '88%',  size: 72,  opacity: 0.14, rotation:  35, delay: 4.0 },
  { top: '85%', left: '88%',  size: 80,  opacity: 0.16, rotation: -20, delay: 2.2 },
];

function DecorativeBg() {
  return (
    <>
      {COIN_POSITIONS.map((pos, idx) => (
        <img
          key={idx}
          src={COIN_IMAGES[idx % COIN_IMAGES.length]}
          alt=""
          className="coin-float pointer-events-none select-none fixed"
          style={{
            top: pos.top,
            left: pos.left,
            width: pos.size,
            height: pos.size,
            opacity: pos.opacity,
            transform: `rotate(${pos.rotation}deg)`,
            animationDelay: `${pos.delay}s`,
            filter: 'drop-shadow(0 4px 12px rgba(255,200,0,0.15)) brightness(1.1)',
            zIndex: 0,
          }}
        />
      ))}
      <div className="fixed top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-orange-700/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 -right-32 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
    </>
  );
}

const REASONS = [
  'Payment window was closed before completing',
  'Session timed out',
  'Incorrect payment details entered',
  'Network connection issue during payment',
];

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#1a0b2e] flex items-center justify-center px-4 py-16 overflow-hidden">
      <DecorativeBg />

      <div className="relative z-10 max-w-lg w-full space-y-3">

        {/* Main card */}
        <div className="bg-[#140a28]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
          <div className="h-1 bg-gradient-to-r from-orange-600 via-orange-400 to-red-500/50" />

          {/* Hero */}
          <div className="px-8 pt-10 pb-6 text-center">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full bg-orange-500/15 animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/40">
                <XCircle className="w-9 h-9 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-2">Payment Cancelled</h1>
            <p className="text-white/45 text-sm max-w-xs mx-auto">
              Your payment was not completed. No charges were made to your account.
            </p>
          </div>

          {/* What happened */}
          <div className="mx-6 mb-4 bg-orange-500/[0.07] border border-orange-500/20 rounded-xl px-5 py-4">
            <p className="text-[10px] font-semibold text-orange-400/60 uppercase tracking-wider mb-2.5">Common reasons</p>
            <ul className="space-y-2">
              {REASONS.map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-orange-200/55">
                  <span className="text-orange-400/50 flex-shrink-0 mt-0.5">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* What you can do */}
          <div className="mx-6 mb-6 bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 py-4">
            <p className="text-[10px] font-semibold text-purple-400/60 uppercase tracking-wider mb-2.5">What can you do?</p>
            <ul className="space-y-2">
              {[
                'Try the payment again with correct details',
                'Check your internet connection and retry',
                'Contact support if the issue persists',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/40">
                  <span className="text-purple-400/50 flex-shrink-0 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-2.5">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white py-3.5 rounded-xl transition-all font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 transform active:translate-y-0"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-white/[0.05] hover:bg-white/[0.08] text-white/60 hover:text-white border border-white/[0.08] hover:border-white/[0.18] py-3.5 rounded-xl transition-all font-semibold flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        {/* Support */}
        <p className="text-center text-xs text-white/25 pb-2">
          Need help?{' '}
          <a href="mailto:support@ebirth.lk" className="text-yellow-400/60 hover:text-yellow-400 font-medium transition-colors">
            support@ebirth.lk
          </a>
        </p>

      </div>
    </div>
  );
}