import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Clock, BookOpen, CheckCircle2, Loader2, CreditCard, Building2, Star, Award, TrendingUp, Calendar, MapPin } from "lucide-react";
import type { PublicCourse } from "@shared/api";
import { useAuth } from "@/context/AuthContext";
import directPaymentService from "../services/directPaymentService";
import BankTransferModal from "../components/payment/BankTransferModal";
import PayHereCouponModal from "../components/payment/PayHereCouponModal";
import { useToast } from "@/hooks/use-toast";

type TabKey = "overview" | "curriculum" | "instructors";

export default function MembershipDetailsEnrollment() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [course, setCourse] = useState<PublicCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [existingEnrollment, setExistingEnrollment] = useState<any>(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [showPayHereCouponModal, setShowPayHereCouponModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  // Check for autoOpenPayment parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const autoOpen = urlParams.get('autoOpenPayment');
    
    if (autoOpen === 'true' && isAuthenticated && !existingEnrollment) {
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Open payment modal after a short delay to ensure page is loaded
      setTimeout(() => {
        setShowPaymentOptions(true);
      }, 500);
    }
  }, [isAuthenticated, existingEnrollment]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/courses/public`
        );
        if (!response.ok) throw new Error("Failed to fetch courses");
        
        const courses: PublicCourse[] = await response.json();
        const foundCourse = courses.find((c) => c.id === Number(courseId));
        
        if (!foundCourse) {
          setError("Course not found");
        } else {
          setCourse(foundCourse);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const checkExistingEnrollment = async () => {
      if (!isAuthenticated || !courseId) return;
      
      try {
        const enrollment = await directPaymentService.checkExistingEnrollment(Number(courseId));
        setExistingEnrollment(enrollment);
      } catch (err) {
        console.error('Error checking enrollment:', err);
      }
    };

    checkExistingEnrollment();
  }, [isAuthenticated, courseId]);

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/membership/${courseId}` } });
      return;
    }

    if (!course) return;

    if (existingEnrollment) {
      toast({
        title: "Already Enrolled",
        description: "You are already enrolled in this course. Access it from your dashboard.",
        variant: "default",
      });
      
      const mainAppUrl = import.meta.env.VITE_MAIN_APP_URL || 'http://localhost:5174';
      setTimeout(() => {
        window.location.href = `${mainAppUrl}/student/courses`;
      }, 2000);
      return;
    }

    setShowPaymentOptions(true);
  };

  const handlePayHerePayment = () => {
    if (!course) return;
    setShowPaymentOptions(false);
    setShowPayHereCouponModal(true);
  };

  const handleProceedToPayHere = async (couponData: any) => {
    if (!course) return;
    
    setEnrolling(true);
    setShowPayHereCouponModal(false);

    try {
      toast({
        title: "Initiating Payment...",
        description: "You will be redirected to PayHere payment gateway.",
      });

      const result = await directPaymentService.initiateDirectPayment(
        {
          courseId: course.id,
          courseTitle: course.title,
          coursePrice: course.price,
          currency: course.currency || 'LKR'
        },
        user,
        couponData
      );

      if (result.success) {
        toast({
          title: "Payment Successful!",
          description: "Redirecting to confirmation page...",
        });

        navigate(`/payment-success?order_id=${result.orderId}`);
      }

    } catch (err: any) {
      console.error('Payment error:', err);
      
      if (err.status === 'dismissed') {
        toast({
          title: "Payment Cancelled",
          description: "You cancelled the payment. Try again when you're ready!",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Payment Failed",
          description: err.message || "Failed to process payment. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setEnrolling(false);
    }
  };

  const handleBankTransferSuccess = () => {
    toast({
      title: "Payment Submitted!",
      description: "Redirecting to confirmation page...",
    });
    
    navigate('/payment-pending');
  };

  if (loading) {
    return (
      <PageLayout className="bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e]">
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#FFD700]" />
        </div>
      </PageLayout>
    );
  }

  if (error || !course) {
    return (
      <PageLayout className="bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e]">
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
          <h1 className="text-3xl font-bold text-white">Course Not Found</h1>
          <p className="text-white/60">{error || "The course you're looking for doesn't exist."}</p>
          <Link to="/membership">
            <Button className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Membership
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <>
      {/* PayHere Coupon Modal */}
      <PayHereCouponModal
        isOpen={showPayHereCouponModal}
        onClose={() => setShowPayHereCouponModal(false)}
        courseId={course.id}
        courseTitle={course.title}
        coursePrice={course.price}
        currency={course.currency}
        onProceedToPayment={handleProceedToPayHere}
      />

      {/* Bank Transfer Modal */}
      <BankTransferModal
        isOpen={showBankTransferModal}
        onClose={() => setShowBankTransferModal(false)}
        courseId={course.id}
        courseTitle={course.title}
        coursePrice={course.price}
        currency={course.currency}
        onSuccess={handleBankTransferSuccess}
      />

      {/* Payment Options Modal */}
      {showPaymentOptions && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9998] p-4">
          <div className="bg-gradient-to-br from-[#1a0b2e] to-[#2d1b4e] border border-[#FFD700]/20 rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Choose Payment Method</h3>
              <p className="text-white/70">Select your preferred payment option</p>
            </div>
            
            <div className="space-y-4">
              {/* PayHere Option */}
              <button
                onClick={handlePayHerePayment}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 border border-purple-400/30 text-white rounded-2xl p-6 transition-all group shadow-lg hover:shadow-purple-500/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <CreditCard className="h-7 w-7 text-[#FFD700]" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-bold text-lg">PayHere Gateway</div>
                    <div className="text-sm text-white/70">Cards, Bank Transfer, Mobile</div>
                  </div>
                  <div className="text-2xl text-[#FFD700]">→</div>
                </div>
              </button>

              {/* Bank Transfer Option */}
              <button
                onClick={() => {
                  setShowPaymentOptions(false);
                  setShowBankTransferModal(true);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 border border-blue-400/30 text-white rounded-2xl p-6 transition-all group shadow-lg hover:shadow-blue-500/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Building2 className="h-7 w-7 text-[#FFD700]" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-bold text-lg">Direct Bank Transfer</div>
                    <div className="text-sm text-white/70">Manual deposit with receipt</div>
                  </div>
                  <div className="text-2xl text-[#FFD700]">→</div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowPaymentOptions(false)}
              className="w-full mt-6 px-6 py-3 border-2 border-white/20 text-white/80 rounded-2xl hover:bg-white/5 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <PageLayout className="bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e]">
        <div className="relative min-h-screen">
          {/* Animated Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Floating Coin Animations with Wormhole Entrance */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Left large peeking coin */}
            <img
              src="/Bitcoin-PNG-removebg-preview.png"
              alt="Decorative coin"
              className="coin-wormhole absolute left-[-90px] top-[38%] hidden md:block h-64 w-64 -rotate-[14deg]"
              style={{ animationDelay: '0.2s' }}
            />
            
            {/* Small accent above content */}
            <img
              src="/coin2.webp"
              alt="Decorative coin"
              className="coin-wormhole absolute left-[54%] top-[22%] h-16 w-16 -translate-x-1/2 rotate-[22deg]"
              style={{ animationDelay: '0.6s' }}
            />
            
            {/* Bottom subtle coin */}
            <img
              src="/coin2.webp"
              alt="Decorative coin"
              className="coin-wormhole absolute left-[52%] bottom-[18%] h-14 w-14 -translate-x-1/2 rotate-[12deg]"
              style={{ animationDelay: '0.9s' }}
            />
            
            {/* Lower-left faint coin */}
            <img
              src="/Bitcoin-PNG-removebg-preview.png"
              alt="Decorative coin"
              className="coin-wormhole absolute left-[6%] bottom-[30%] h-24 w-24 rotate-[26deg]"
              style={{ animationDelay: '0.5s' }}
            />
            
            {/* Top-right corner large coin */}
            <img
              src="/Bitcoin-PNG-removebg-preview.png"
              alt="Decorative coin"
              className="coin-wormhole absolute right-[-70px] top-[80px] hidden lg:block h-40 w-40 rotate-[-12deg]"
              style={{ animationDelay: '0.3s' }}
            />
            
            {/* Top-left medium coin */}
            <img
              src="/coin2.webp"
              alt="Decorative coin"
              className="coin-wormhole absolute left-[0%] top-[15%] h-[180px] w-[180px]"
              style={{ animationDelay: '0.4s' }}
            />
            
            {/* Top center subtle small coin */}
            <img
              src="/coin4.webp"
              alt="Decorative coin"
              className="coin-wormhole absolute left-1/2 top-[40%] h-25 w-25 -translate-x-1/2 rotate-[8deg]"
              style={{ animationDelay: '0.7s' }}
            />

            {/* Right bottom large coin */}
            <img
              src="/Bitcoin-PNG-removebg-preview.png"
              alt="Decorative coin"
              className="coin-wormhole absolute right-[-70px] bottom-[20%] hidden lg:block h-60 w-60 rotate-[-12deg]"
              style={{ animationDelay: '0.3s' }}
            />

            {/* Mid-right floating coin */}
            <img
              src="/coin2.webp"
              alt="Decorative coin"
              className="coin-wormhole absolute right-[10%] top-[50%] h-20 w-20 rotate-[15deg]"
              style={{ animationDelay: '0.8s' }}
            />
          </div>

          <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Back Button */}
              <Link 
                to="/membership" 
                className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFC700] mb-8 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Courses</span>
              </Link>

              {/* Hero Section */}
              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {/* Left: Main Content (2/3) */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Course Header */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="inline-flex items-center gap-2 bg-[#FFD700]/20 border border-[#FFD700]/30 px-4 py-2 rounded-full mb-4">
                          <Award className="h-4 w-4 text-[#FFD700]" />
                          <span className="text-[#FFD700] font-semibold text-sm uppercase tracking-wide">{course.course_code}</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                          {course.title}
                        </h1>
                        <p className="text-lg text-white/70 leading-relaxed mb-6">
                          {course.description}
                        </p>
                        
                        {/* Badges */}
                        <div className="flex flex-wrap gap-3">
                          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 px-4 py-2 rounded-full">
                            <Star className="h-4 w-4 text-[#FFD700]" />
                            <span className="text-white font-medium text-sm">4.9 Rating</span>
                          </div>
                          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-4 py-2 rounded-full">
                            <Users className="h-4 w-4 text-blue-300" />
                            <span className="text-white font-medium text-sm">{course.students_count}+ Students</span>
                          </div>
                          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 px-4 py-2 rounded-full capitalize">
                            <MapPin className="h-4 w-4 text-green-300" />
                            <span className="text-white font-medium text-sm">{course.delivery_mode}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Course Image */}
                    {course.image_url && (
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img
                          src={course.image_url}
                          alt={course.title}
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    )}
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-400/30 rounded-2xl p-6 text-center">
                      <Clock className="h-8 w-8 text-purple-300 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">{course.duration}</div>
                      <div className="text-white/60 text-sm">Duration</div>
                    </div>
                    
                    {course.total_days && (
                      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-400/30 rounded-2xl p-6 text-center">
                        <Calendar className="h-8 w-8 text-blue-300 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">{course.total_days}</div>
                        <div className="text-white/60 text-sm">Days</div>
                      </div>
                    )}
                    
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-400/30 rounded-2xl p-6 text-center">
                      <Users className="h-8 w-8 text-green-300 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">{course.students_count}</div>
                      <div className="text-white/60 text-sm">Enrolled</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-400/30 rounded-2xl p-6 text-center">
                      <TrendingUp className="h-8 w-8 text-orange-300 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">Top</div>
                      <div className="text-white/60 text-sm">Rated</div>
                    </div>
                  </div>

                  {/* Tabbed Content Section */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    {/* Tab Navigation */}
                    <div className="border-b border-white/10 bg-white/5">
                      <div className="flex">
                        <button
                          onClick={() => setActiveTab("overview")}
                          className={`flex-1 px-6 py-4 font-semibold transition-all relative ${
                            activeTab === "overview"
                              ? "text-[#FFD700]"
                              : "text-white/60 hover:text-white/80"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            <span>What You'll Learn</span>
                          </div>
                          {activeTab === "overview" && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500]"></div>
                          )}
                        </button>
                        
                        <button
                          onClick={() => setActiveTab("curriculum")}
                          className={`flex-1 px-6 py-4 font-semibold transition-all relative ${
                            activeTab === "curriculum"
                              ? "text-[#FFD700]"
                              : "text-white/60 hover:text-white/80"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span>Course Curriculum</span>
                          </div>
                          {activeTab === "curriculum" && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500]"></div>
                          )}
                        </button>
                        
                        {course.lecturers && course.lecturers.length > 0 && (
                          <button
                            onClick={() => setActiveTab("instructors")}
                            className={`flex-1 px-6 py-4 font-semibold transition-all relative ${
                              activeTab === "instructors"
                                ? "text-[#FFD700]"
                                : "text-white/60 hover:text-white/80"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Users className="h-5 w-5" />
                              <span>Your Instructors</span>
                            </div>
                            {activeTab === "instructors" && (
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500]"></div>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-8">
                      {/* Overview Tab */}
                      {activeTab === "overview" && (
                        <div className="animate-in fade-in duration-500">
                          <div className="grid md:grid-cols-2 gap-4">
                            {[
                              "Master fundamentals and advanced concepts",
                              "Gain practical, hands-on experience",
                              "Learn from industry experts",
                              "Access exclusive resources & materials",
                              "Join a thriving community",
                              "Lifetime access to all content",
                            ].map((item, index) => (
                              <div key={index} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                                <CheckCircle2 className="h-6 w-6 text-[#FFD700] flex-shrink-0 mt-0.5" />
                                <span className="text-white/90">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Curriculum Tab */}
                      {activeTab === "curriculum" && (
                        <div className="animate-in fade-in duration-500">
                          {course.syllabus_content && course.syllabus_content.length > 0 ? (
                            <>
                              <div className="mb-6">
                                <p className="text-white/60">
                                  {course.syllabus_total_days ? `${course.syllabus_total_days} Days` : course.duration} of comprehensive learning
                                </p>
                              </div>
                              <div className="space-y-4">
                                {Object.entries(
                                  course.syllabus_content.reduce((acc, content) => {
                                    if (!acc[content.day_number]) {
                                      acc[content.day_number] = [];
                                    }
                                    acc[content.day_number].push(content);
                                    return acc;
                                  }, {} as Record<number, typeof course.syllabus_content>)
                                ).map(([dayNumber, dayContents]) => (
                                  <details key={dayNumber} className="group bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition-colors">
                                    <summary className="flex items-center gap-4 p-6 cursor-pointer list-none">
                                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center flex-shrink-0">
                                        <span className="text-lg font-bold text-black">{dayNumber}</span>
                                      </div>
                                      <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white group-hover:text-[#FFD700] transition-colors">
                                          Day {dayNumber}
                                        </h3>
                                        <p className="text-white/60 text-sm">{dayContents.length} topics</p>
                                      </div>
                                      <div className="text-white/40 group-hover:text-[#FFD700] transition-colors">
                                        <svg className="w-6 h-6 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                      </div>
                                    </summary>
                                    <div className="px-6 pb-6 pt-2 space-y-3">
                                      {dayContents.map((content, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                          <CheckCircle2 className="h-5 w-5 text-[#FFD700]/70 flex-shrink-0 mt-0.5" />
                                          <div>
                                            <h4 className="text-white font-medium">{content.content_title}</h4>
                                            {content.content_description && (
                                              <p className="text-white/60 text-sm mt-1">{content.content_description}</p>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </details>
                                ))}
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-12 text-white/60">
                              <Calendar className="h-16 w-16 mx-auto mb-4 opacity-40" />
                              <p>Course curriculum will be available soon</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Instructors Tab */}
                      {activeTab === "instructors" && (
                        <div className="animate-in fade-in duration-500">
                          {course.lecturers && course.lecturers.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-4">
                              {course.lecturers.map((lecturer, index) => (
                                <div
                                  key={index}
                                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#FFD700]/30 transition-all"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center flex-shrink-0">
                                      <span className="text-2xl font-bold text-black">
                                        {lecturer.lecturer_name?.charAt(0) || "?"}
                                      </span>
                                    </div>
                                    <div>
                                      <h3 className="text-lg font-bold text-white">{lecturer.lecturer_name}</h3>
                                      <p className="text-[#FFD700] text-sm capitalize">{lecturer.role} Instructor</p>
                                      {lecturer.lecturer_title && (
                                        <p className="text-white/60 text-sm mt-1">{lecturer.lecturer_title}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-12 text-white/60">
                              <Users className="h-16 w-16 mx-auto mb-4 opacity-40" />
                              <p>Instructor information will be available soon</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Sticky Pricing Card (1/3) */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    {/* Price Card */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-[#FFD700]/30 rounded-3xl p-8 shadow-2xl">
                      <div className="text-center mb-6">
                        <div className="text-white/60 text-sm uppercase tracking-wide mb-2">Course Price</div>
                        <div className="text-5xl font-black text-[#FFD700] mb-2">
                          {course.currency} {course.price.toLocaleString()}
                        </div>
                        <div className="text-white/60 text-sm">One-time payment</div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-white/80">
                          <CheckCircle2 className="h-5 w-5 text-[#FFD700] flex-shrink-0" />
                          <span>Lifetime Access</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80">
                          <CheckCircle2 className="h-5 w-5 text-[#FFD700] flex-shrink-0" />
                          <span>Certificate of Completion</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80">
                          <CheckCircle2 className="h-5 w-5 text-[#FFD700] flex-shrink-0" />
                          <span>Expert Support</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80">
                          <CheckCircle2 className="h-5 w-5 text-[#FFD700] flex-shrink-0" />
                          <span>Community Access</span>
                        </div>
                      </div>

                      <Button
                        onClick={handleEnrollClick}
                        disabled={enrolling || !!existingEnrollment}
                        className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFC700] hover:to-[#FF9500] text-black font-bold py-6 text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[#FFD700]/50 transition-all"
                      >
                        {enrolling ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : existingEnrollment ? (
                          "Already Enrolled"
                        ) : isAuthenticated ? (
                          <>
                            <CreditCard className="mr-2 h-5 w-5" />
                            Enroll Now
                          </>
                        ) : (
                          "Login to Enroll"
                        )}
                      </Button>

                      {!isAuthenticated && (
                        <p className="text-center text-white/60 text-sm mt-4">
                          Don't have an account?{" "}
                          <Link to="/register" className="text-[#FFD700] hover:text-[#FFC700] font-semibold">
                            Sign up free
                          </Link>
                        </p>
                      )}
                    </div>

                    {/* Trust Badges */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h3 className="text-white font-semibold mb-4">Why Choose Us</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">Verified Content</div>
                            <div className="text-white/60 text-xs">Expert-curated curriculum</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">Active Community</div>
                            <div className="text-white/60 text-xs">24/7 peer support</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Award className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">Certificates</div>
                            <div className="text-white/60 text-xs">Industry-recognized</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}