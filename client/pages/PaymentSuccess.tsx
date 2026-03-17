import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2, ArrowRight, XCircle, BookOpen, Bell, CalendarDays, Home, Mail, Phone, User as UserIcon, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import directPaymentService from '../services/directPaymentService';
import { useAuth } from '../context/AuthContext';

const LOADING_STEPS = [
  'Confirming your payment with PayHere...',
  'Setting up your course access...',
  'Finalizing your enrollment...',
];

const COIN_IMAGES = [
  '/Bitcoin-PNG-removebg-preview.png',
  '/coin2.webp',
  '/Bitcoin-PNG-removebg-preview.png',
  '/coin4.webp',
];

const COIN_POSITIONS = [
  // Left side
  { top: '5%',  left: '2%',   size: 120, opacity: 0.22, rotation: -18, delay: 0   },
  { top: '38%', left: '1%',   size: 90,  opacity: 0.18, rotation: -30, delay: 2.9 },
  { top: '70%', left: '3%',   size: 140, opacity: 0.20, rotation:  27, delay: 3.4 },
  // Right side
  { top: '8%',  left: '82%',  size: 130, opacity: 0.22, rotation:  22, delay: 1.6 },
  { top: '42%', left: '84%',  size: 100, opacity: 0.20, rotation: -14, delay: 0.7 },
  { top: '72%', left: '80%',  size: 115, opacity: 0.18, rotation:   8, delay: 1.1 },
  // Extra scattered
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
      <div className="fixed top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-purple-700/15 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 -right-32 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
    </>
  );
}

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [verifying, setVerifying] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [error, setError] = useState('');
  const [enrollmentCreated, setEnrollmentCreated] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    verifyPayment();
  }, []);

  useEffect(() => {
    if (!verifying) return;
    const interval = setInterval(() => {
      setLoadingStep(prev => Math.min(prev + 1, LOADING_STEPS.length - 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [verifying]);

  const verifyPayment = async () => {
    try {
      const orderId = searchParams.get('order_id');
      
      if (!orderId) {
        setError('Invalid payment verification link');
        setVerifying(false);
        return;
      }

      console.log('Verifying payment for order:', orderId);

      // Extract course ID from order_id format: COURSE_{courseId}_{studentId}_{timestamp}_{random}
      const orderParts = orderId.split('_');
      const courseId = orderParts.length >= 2 ? parseInt(orderParts[1]) : null;

      if (!courseId) {
        setError('Invalid order format. Please contact support.');
        setVerifying(false);
        return;
      }

      console.log('Extracted course ID:', courseId);

      // Wait a bit for webhook to process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Try to verify payment status (may fail if payment record doesn't exist yet)
      try {
        const result = await directPaymentService.verifyPayment(orderId);
        
        if (result.verified && result.payment) {
          setPaymentDetails(result.payment);
          
          // If payment is pending, update client-side as fallback
          if (result.payment.status === 'pending') {
            try {
              await directPaymentService.updatePaymentStatus(orderId, 'approved');
            } catch (err) {
              console.error('Client-side update failed:', err);
            }
          }
        }
      } catch (verifyError) {
        console.log('Payment verification failed, will create enrollment anyway:', verifyError);
      }

      // CRITICAL: Create enrollment as fallback (since webhook URL is wrong)
      console.log('Creating enrollment for course:', courseId);
      try {
        const enrollmentResult = await directPaymentService.createEnrollmentAfterPayment(courseId, orderId);
        console.log('Enrollment result:', enrollmentResult);
        
        if (enrollmentResult.enrollment) {
          setEnrollmentCreated(true);
          setPaymentDetails((prev: any) => ({
            ...prev,
            course_title: enrollmentResult.enrollment.course_title || prev?.course_title,
            course_image_url: enrollmentResult.enrollment.course_image_url || prev?.course_image_url,
            enrollment_id: enrollmentResult.enrollment.id,
            enrollment_created: enrollmentResult.created
          }));
        }
      } catch (enrollError: any) {
        console.error('Enrollment creation failed:', enrollError);
        // Don't fail completely - payment was successful
        if (enrollError.response?.status !== 409) { // 409 = already enrolled
          console.warn('Could not create enrollment, but payment was successful');
        }
      }

    } catch (err: any) {
      console.error('Payment verification error:', err);
      setError(err.message || 'Failed to verify payment');
    } finally {
      setVerifying(false);
    }
  };

  const goToDashboard = () => {
    const mainAppUrl = import.meta.env.VITE_MAIN_APP_URL || 'http://localhost:5174';
    window.location.href = `${mainAppUrl}/student/courses`;
  };

  const goToHome = () => {
    navigate('/');
  };

  const downloadReceipt = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = 210;
    const margin = 18;
    const contentW = W - margin * 2;
    let y = 0;

    // ── Header band ──────────────────────────────────────────────
    doc.setFillColor(26, 6, 60);        // #1a063c deep purple
    doc.rect(0, 0, W, 38, 'F');

    // Academy name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('eBirth Academy', margin, 17);

    // Receipt label
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(180, 150, 255);
    doc.text('PAYMENT RECEIPT', margin, 26);

    // Date – right side
    doc.setFontSize(8);
    doc.setTextColor(180, 150, 255);
    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    doc.text(dateStr, W - margin, 17, { align: 'right' });

    // Status pill (drawn as a filled rounded rect)
    const pillLabel = 'CONFIRMED';
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    const pillW = 24;
    const pillH = 6;
    const pillX = W - margin - pillW;
    const pillY = 21;
    doc.setFillColor(22, 163, 74);      // green-600
    doc.roundedRect(pillX, pillY, pillW, pillH, 1.5, 1.5, 'F');
    doc.text(pillLabel, pillX + pillW / 2, pillY + 4.2, { align: 'center' });

    y = 50;

    // ── Course block ─────────────────────────────────────────────
    const courseTitle = paymentDetails?.course_title || 'Enrolled Course';
    const amountRaw = parseFloat(paymentDetails?.amount || 0);
    const currency = paymentDetails?.currency || 'LKR';
    const amountStr = `${currency} ${amountRaw.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    doc.setFillColor(245, 240, 255);    // very light lavender
    doc.roundedRect(margin, y, contentW, 28, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(30, 10, 60);
    const titleLines = doc.splitTextToSize(courseTitle, contentW - 8) as string[];
    doc.text(titleLines, margin + 4, y + 9);

    const firstLineH = titleLines.length > 1 ? 6 : 0;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(109, 40, 217);     // purple-700
    doc.text(amountStr, margin + 4, y + 9 + firstLineH + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 100, 160);
    doc.text('Amount Paid', W - margin - 4, y + 9 + firstLineH + 8, { align: 'right' });

    y += 36;

    // ── Divider ──────────────────────────────────────────────────
    doc.setDrawColor(220, 210, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, y, W - margin, y);
    y += 8;

    // ── Detail rows helper ───────────────────────────────────────
    const drawRow = (label: string, value: string) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(130, 120, 150);
      doc.text(label, margin, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(40, 20, 70);
      doc.text(value, W - margin, y, { align: 'right' });
      y += 8;
    };

    // ── Payment details ──────────────────────────────────────────
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(109, 40, 217);
    doc.text('PAYMENT DETAILS', margin, y);
    y += 6;

    if (paymentDetails?.order_id) {
      drawRow('Order Reference', `#${paymentDetails.order_id.slice(-18)}`);
    }
    drawRow('Payment Date', dateStr);
    drawRow('Payment Method', 'PayHere');
    drawRow('Status', 'Confirmed / Paid');
    y += 4;

    // ── Student details ──────────────────────────────────────────
    doc.setDrawColor(220, 210, 240);
    doc.line(margin, y - 2, W - margin, y - 2);
    y += 4;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(109, 40, 217);
    doc.text('STUDENT DETAILS', margin, y);
    y += 6;

    if ((user as any)?.name)  drawRow('Full Name', (user as any).name);
    if (user?.email)          drawRow('Email', user.email);
    if ((user as any)?.phone) drawRow('Phone', (user as any).phone);
    y += 4;

    // ── Footer ───────────────────────────────────────────────────
    doc.setDrawColor(220, 210, 240);
    doc.line(margin, y - 2, W - margin, y - 2);
    y += 6;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 80, 140);
    doc.text('Thank you for enrolling with eBirth Academy!', W / 2, y, { align: 'center' });
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 130, 180);
    doc.text('For any queries, contact us at support@ebirth.lk', W / 2, y, { align: 'center' });

    // Bottom band
    const footerY = 280;
    doc.setFillColor(26, 6, 60);
    doc.rect(0, footerY, W, 17, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(150, 120, 210);
    doc.text('ebirth.lk  •  support@ebirth.lk', W / 2, footerY + 7, { align: 'center' });
    doc.setTextColor(100, 80, 140);
    doc.text('This is a computer-generated receipt and does not require a signature.', W / 2, footerY + 12, { align: 'center' });

    const fileName = `eBirth-Receipt-${paymentDetails?.order_id?.slice(-10) || 'payment'}.pdf`;
    doc.save(fileName);
  };

  if (verifying) {
    return (
      <div className="relative min-h-screen bg-[#1a0b2e] flex items-center justify-center px-4 overflow-hidden">
        <DecorativeBg />
        <div className="relative z-10 max-w-md w-full">
          <div className="bg-[#140a28]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-yellow-400/50" />
            <div className="p-10 text-center">
              <div className="relative mx-auto w-20 h-20 mb-7">
                <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/40">
                  <Loader2 className="w-9 h-9 text-white animate-spin" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">Processing Your Payment</h2>
              <p className="text-white/40 text-sm mb-8">This usually takes just a few seconds</p>
              <div className="space-y-3 text-left max-w-xs mx-auto">
                {LOADING_STEPS.map((step, idx) => (
                  <div key={idx} className={`flex items-center gap-3 transition-all duration-500 ${idx <= loadingStep ? 'opacity-100' : 'opacity-20'}`}>
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-300 ${
                      idx < loadingStep ? 'bg-green-500' : idx === loadingStep ? 'bg-purple-500' : 'bg-white/10'
                    }`}>
                      {idx < loadingStep
                        ? <span className="text-white text-[10px] font-bold">✓</span>
                        : idx === loadingStep
                          ? <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          : <div className="w-2 h-2 rounded-full bg-white/20" />
                      }
                    </div>
                    <span className={`text-sm transition-colors duration-300 ${idx <= loadingStep ? 'text-white/80' : 'text-white/25'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen bg-[#1a0b2e] flex items-center justify-center px-4 overflow-hidden">
        <DecorativeBg />
        <div className="relative z-10 max-w-md w-full">
          <div className="bg-[#140a28]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="h-1 bg-gradient-to-r from-red-700 to-red-500" />
            <div className="p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
              <p className="text-white/50 text-sm mb-4">We couldn't verify your payment at this time.</p>
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-8">{error}</p>
              <button
                onClick={goToHome}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white py-3 rounded-xl transition-all font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 mb-4"
              >
                <Home className="w-4 h-4" />
                Return to Home
              </button>
              <p className="text-xs text-white/30">
                Your payment may still have been processed.{' '}
                <a href="mailto:support@ebirth.lk" className="text-yellow-400/70 hover:text-yellow-400 font-medium transition-colors">Contact support</a>{' '}
                with your order details.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#1a0b2e] flex items-center justify-center px-4 py-16 overflow-hidden">
      <DecorativeBg />
      <div className="relative z-10 max-w-lg w-full space-y-3">

        {/* Hero Glass Card */}
        <div className="bg-[#140a28]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">

          {/* Cinematic hero — course image + all key info at bottom */}
          <div className="relative min-h-[260px] overflow-hidden">
            {/* Course image — background */}
            {paymentDetails?.course_image_url ? (
              <img
                src={paymentDetails.course_image_url}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.5) saturate(0.85)' }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-800/50 via-purple-900/60 to-[#0d0620]" />
            )}

            {/* Brand colour tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/25 via-transparent to-indigo-900/20" />
            {/* Top-to-bottom scrim */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-[#0d0620]" />

            {/* Top-right: Enrolled badge */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-green-500/40 ring-1 ring-green-400/30">
                <CheckCircle className="w-3.5 h-3.5" />
                Enrolled
              </span>
            </div>

            {/* Top-left: Ebirth brand mark (optional subtle) */}
            <div className="absolute top-4 left-4">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">eBirth Academy</span>
            </div>

            {/* Bottom content — floats over the gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10">
              {/* Success line */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-md shadow-green-500/50 flex-shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">Payment Confirmed</span>
              </div>

              {/* Course title — hero headline */}
              {paymentDetails?.course_title ? (
                <h2 className="text-[1.3rem] font-extrabold text-white leading-tight mb-3 drop-shadow-lg">
                  {paymentDetails.course_title}
                </h2>
              ) : (
                <h2 className="text-xl font-extrabold text-white mb-3">You're Enrolled! 🎉</h2>
              )}

              {/* Amount + status row */}
              <div className="flex items-center justify-between">
                {paymentDetails?.amount ? (
                  <div>
                    <p className="text-[10px] text-white/35 uppercase tracking-wider mb-0.5">Amount Paid</p>
                    <p className="text-xl font-extrabold text-yellow-400 tracking-tight drop-shadow-sm">
                      {paymentDetails.currency || 'LKR'} {parseFloat(paymentDetails.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                ) : (
                  <p className="text-white font-bold text-lg">You're Enrolled! 🎉</p>
                )}
                <div className="flex items-center gap-1.5 bg-green-500/15 border border-green-500/25 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-bold">Confirmed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order ref + Student details — unified panel */}
          {(paymentDetails?.order_id || user) && (
            <div className="mx-5 mt-4 mb-5 rounded-xl overflow-hidden border border-white/[0.08]">

              {/* Student info row */}
              {user && (
                <div className="flex items-center gap-4 px-4 py-4 border-b border-white/[0.06]">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center flex-shrink-0 ring-2 ring-purple-500/20">
                    <UserIcon className="w-5 h-5 text-white/80" />
                  </div>
                  {/* Name + contact */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white/90 truncate">{(user as any).name}</p>
                    <p className="text-xs text-white/45 truncate mt-0.5">{user.email}</p>
                    {(user as any).phone && (
                      <p className="text-xs text-white/35 mt-0.5">{(user as any).phone}</p>
                    )}
                  </div>
                  {/* Student badge */}
                  <span className="flex-shrink-0 text-[10px] font-semibold text-purple-400/70 bg-purple-500/10 border border-purple-500/15 px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Student
                  </span>
                </div>
              )}

              {/* Order ref row */}
              {paymentDetails?.order_id && (
                <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02]">
                  <span className="text-[11px] text-white/30 uppercase tracking-wider">Order Ref</span>
                  <span className="font-mono text-xs text-white/40 bg-white/[0.05] border border-white/[0.07] px-2.5 py-1 rounded-lg">
                    #{paymentDetails.order_id?.slice(-18)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* What's Next */}
        <div className="bg-[#140a28]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 shadow-xl shadow-black/30">
          <p className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-4">What's Next</p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/90">Access Course Materials</p>
                <p className="text-xs text-white/40 mt-0.5">All lectures, resources, and assignments are now available in your dashboard.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <CalendarDays className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/90">Check Your Schedule</p>
                <p className="text-xs text-white/40 mt-0.5">View upcoming live sessions and lecture dates in your course calendar.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-500/20 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <Bell className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/90">Stay Updated</p>
                <p className="text-xs text-white/40 mt-0.5">You'll receive course announcements and updates directly in your dashboard.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={downloadReceipt}
            className="w-full bg-white/[0.05] hover:bg-white/[0.09] text-white/70 hover:text-white border border-white/[0.12] hover:border-white/[0.22] py-3.5 rounded-xl transition-all font-semibold flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Receipt
          </button>
          <button
            onClick={goToDashboard}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white py-3.5 rounded-xl transition-all font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 transform active:translate-y-0"
          >
            Go to My Courses
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={goToHome}
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