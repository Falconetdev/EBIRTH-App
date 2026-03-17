import { useNavigate } from 'react-router-dom';
import { Clock, Home, ArrowRight } from 'lucide-react';

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
      <div className="fixed top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-amber-700/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 -right-32 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
    </>
  );
}

const STEPS = [
  { num: '1', title: 'Payment Under Review', desc: 'Our accounting team is reviewing your bank transfer receipt.' },
  { num: '2', title: 'Approval Within 24 Hours', desc: "You'll receive an email notification once your payment is approved." },
  { num: '3', title: 'Automatic Enrollment', desc: "Once approved, you'll be instantly enrolled and can start learning." },
];

export default function PaymentPending() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#1a0b2e] flex items-center justify-center px-4 py-16 overflow-hidden">
      <DecorativeBg />
      <div className="relative z-10 max-w-lg w-full space-y-3">

        {/* Main card */}
        <div className="bg-[#140a28]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
          <div className="h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600/50" />

          {/* Hero */}
          <div className="px-8 pt-10 pb-6 text-center">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full bg-amber-500/15 animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/40">
                <Clock className="w-9 h-9 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-2">Payment Submitted!</h1>
            <p className="text-white/45 text-sm max-w-xs mx-auto">
              Your bank transfer has been received and is currently under review.
            </p>
          </div>

          {/* Steps */}
          <div className="mx-6 mb-6 rounded-xl overflow-hidden border border-white/[0.07]">
            {STEPS.map((step, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-4 px-5 py-4 ${idx < STEPS.length - 1 ? 'border-b border-white/[0.05]' : ''}`}
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/30 mt-0.5">
                  <span className="text-white text-xs font-bold">{step.num}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/90 mb-0.5">{step.title}</p>
                  <p className="text-xs text-white/40">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What's next strip */}
          <div className="mx-6 mb-6 bg-amber-500/[0.07] border border-amber-500/20 rounded-xl px-5 py-4">
            <p className="text-[10px] font-semibold text-amber-400/60 uppercase tracking-wider mb-2.5">What's next?</p>
            <ul className="space-y-2">
              {[
                'Check your email for a payment confirmation',
                'Access your course immediately after approval',
                "Contact support if you don't hear back within 24 hours",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-amber-200/55">
                  <span className="text-amber-400/50 flex-shrink-0 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-2.5">
          <button
            onClick={() => navigate('/membership')}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white py-3.5 rounded-xl transition-all font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 transform active:translate-y-0"
          >
            Browse More Courses
            <ArrowRight className="w-4 h-4" />
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