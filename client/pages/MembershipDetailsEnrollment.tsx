import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Clock, BookOpen, CheckCircle2, Loader2, CreditCard, Building2 } from "lucide-react";
import type { PublicCourse } from "@shared/api";
import { useAuth } from "@/context/AuthContext";
import directPaymentService from "../services/directPaymentService";
import BankTransferModal from "../components/payment/BankTransferModal";
import { useToast } from "@/hooks/use-toast";

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

  // Check if user is already enrolled
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
      // User not logged in, redirect to login
      navigate("/login", { state: { from: `/membership/${courseId}` } });
      return;
    }

    if (!course) return;

    // Check if already enrolled
    if (existingEnrollment) {
      toast({
        title: "Already Enrolled",
        description: "You are already enrolled in this course. Access it from your dashboard.",
        variant: "default",
      });
      
      // Redirect to main app
      const mainAppUrl = import.meta.env.VITE_MAIN_APP_URL || 'http://localhost:5174';
      setTimeout(() => {
        window.location.href = `${mainAppUrl}/student/courses`;
      }, 2000);
      return;
    }

    // Show payment options
    setShowPaymentOptions(true);
  };

  const handlePayHerePayment = async () => {
    if (!course) return;
    
    setEnrolling(true);
    setShowPaymentOptions(false);

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
        user
      );

      // Payment completed
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
      <PageLayout className="bg-[#1a0b2e] bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-transparent">
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#FFD700]" />
        </div>
      </PageLayout>
    );
  }

  if (error || !course) {
    return (
      <PageLayout className="bg-[#1a0b2e] bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-transparent">
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
      {/* Bank Transfer Modal */}
      {course && (
        <BankTransferModal
          isOpen={showBankTransferModal}
          onClose={() => setShowBankTransferModal(false)}
          courseId={course.id}
          courseTitle={course.title}
          coursePrice={course.price}
          currency={course.currency}
          onSuccess={handleBankTransferSuccess}
        />
      )}

      {/* Payment Options Modal */}
      {showPaymentOptions && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9998] p-4">
          <div className="bg-[#1a0b2e] border border-purple-500/30 rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-[#FFD700] mb-2">Choose Payment Method</h3>
            <p className="text-white/70 mb-6">Select how you'd like to pay for this course</p>
            
            <div className="space-y-4">
              {/* PayHere Option */}
              <button
                onClick={handlePayHerePayment}
                disabled={enrolling}
                className="w-full bg-gradient-to-r from-purple-600/80 to-purple-800/80 hover:from-purple-600 hover:to-purple-800 border border-purple-500/30 text-white rounded-xl p-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFD700]/20 rounded-full flex items-center justify-center group-hover:bg-[#FFD700]/30 transition-colors">
                    <CreditCard className="h-6 w-6 text-[#FFD700]" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-bold text-lg">PayHere - Online Payment</div>
                    <div className="text-sm text-white/60">Credit/Debit Card, Bank Transfer</div>
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
                className="w-full bg-gradient-to-r from-blue-600/80 to-blue-800/80 hover:from-blue-600 hover:to-blue-800 border border-blue-500/30 text-white rounded-xl p-6 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFD700]/20 rounded-full flex items-center justify-center group-hover:bg-[#FFD700]/30 transition-colors">
                    <Building2 className="h-6 w-6 text-[#FFD700]" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-bold text-lg">Bank Transfer</div>
                    <div className="text-sm text-white/60">Direct bank deposit with receipt</div>
                  </div>
                  <div className="text-2xl text-[#FFD700]">→</div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowPaymentOptions(false)}
              className="w-full mt-6 px-6 py-3 border border-purple-500/30 text-white/80 rounded-xl hover:bg-purple-600/10 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <PageLayout className="bg-[#1a0b2e] bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-transparent">
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.15),_rgba(26,11,46,0))] blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Back Button */}
          <Link to="/membership" className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFC700] mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Membership</span>
          </Link>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Course Image */}
            <div className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl">
                {course.image_url ? (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <BookOpen className="h-24 w-24 text-white/50" />
                  </div>
                )}
              </div>
              
              {/* Course Code Badge */}
              <div className="absolute top-4 left-4 bg-[#FFD700] text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                {course.course_code}
              </div>
            </div>

            {/* Right: Course Info */}
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                {course.title}
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed">
                {course.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 text-center">
                  <Clock className="h-6 w-6 text-[#FFD700] mx-auto mb-2" />
                  <div className="text-white font-semibold">{course.duration}</div>
                  <div className="text-white/60 text-xs">Duration</div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 text-center">
                  <Users className="h-6 w-6 text-[#FFD700] mx-auto mb-2" />
                  <div className="text-white font-semibold">{course.students_count}</div>
                  <div className="text-white/60 text-xs">Students</div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 text-center">
                  <BookOpen className="h-6 w-6 text-[#FFD700] mx-auto mb-2" />
                  <div className="text-white font-semibold">{course.lecturers?.length || 0}</div>
                  <div className="text-white/60 text-xs">Instructors</div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-6">
                <div>
                  <div className="text-white/60 text-sm mb-1">Course Price</div>
                  <div className="text-3xl font-bold text-[#FFD700]">
                    {course.currency} {course.price.toLocaleString()}
                  </div>
                </div>
                <Button
                  onClick={handleEnrollClick}
                  disabled={enrolling || !!existingEnrollment}
                  className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold px-8 py-6 text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
              </div>
            </div>
          </div>

          {/* Instructors Section */}
          {course.lecturers && course.lecturers.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Meet Your Instructors</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {course.lecturers.map((lecturer, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
                        <span className="text-2xl font-bold text-black">
                          {lecturer.lecturer_name?.charAt(0) || "?"}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{lecturer.lecturer_name}</h3>
                        <p className="text-sm text-[#FFD700] capitalize">{lecturer.role} Instructor</p>
                      </div>
                    </div>
                    {lecturer.lecturer_title && (
                      <p className="text-white/70 text-sm">{lecturer.lecturer_title}</p>
                    )}
                    {lecturer.lecturer_department && (
                      <p className="text-white/50 text-xs mt-2">{lecturer.lecturer_department}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course Syllabus Section */}
          {course.syllabus_content && course.syllabus_content.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Course Syllabus</h2>
              <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                <div className="text-white/60 mb-6 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#FFD700]" />
                  <span className="font-semibold">
                    {course.syllabus_total_days ? `${course.syllabus_total_days} Days` : course.duration} Comprehensive Curriculum
                  </span>
                </div>
                
                <div className="space-y-6">
                  {/* Group syllabus content by day */}
                  {Object.entries(
                    course.syllabus_content.reduce((acc, content) => {
                      if (!acc[content.day_number]) {
                        acc[content.day_number] = [];
                      }
                      acc[content.day_number].push(content);
                      return acc;
                    }, {} as Record<number, typeof course.syllabus_content>)
                  ).map(([dayNumber, dayContents]) => (
                    <div key={dayNumber} className="border-l-2 border-[#FFD700]/30 pl-6 py-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-black">{dayNumber}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white">Day {dayNumber}</h3>
                      </div>
                      
                      <div className="space-y-3 ml-13">
                        {dayContents.map((content, idx) => (
                          <div key={idx} className="flex items-start gap-3 group">
                            <CheckCircle2 className="h-5 w-5 text-[#FFD700]/70 flex-shrink-0 mt-0.5 group-hover:text-[#FFD700] transition-colors" />
                            <div>
                              <h4 className="text-white font-medium group-hover:text-[#FFD700] transition-colors">
                                {content.content_title}
                              </h4>
                              {content.content_description && (
                                <p className="text-white/60 text-sm mt-1">
                                  {content.content_description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {course.syllabus_total_days && (
                  <div className="mt-8 pt-6 border-t border-purple-500/20 text-center">
                    <p className="text-white/70 text-sm">
                      Complete {course.syllabus_content.length} topics across {course.syllabus_total_days} days of structured learning
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* What You'll Learn Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">What You'll Learn</h2>
            <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Master the fundamentals and advanced concepts",
                  "Gain practical, hands-on experience",
                  "Learn from industry experts",
                  "Access to exclusive resources and materials",
                  "Join a community of like-minded learners",
                  "Lifetime access to course materials",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-[#FFD700] flex-shrink-0 mt-1" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join {course.students_count} students already enrolled in this course and transform your skills today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Button
                  onClick={handleEnrollClick}
                  disabled={enrolling || !!existingEnrollment}
                  className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold px-12 py-6 text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enrolling ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing Payment...
                    </>
                  ) : existingEnrollment ? (
                    "Already Enrolled - Go to Dashboard"
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Enroll Now - {course.currency} {course.price.toLocaleString()}
                    </>
                  )}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/register", { state: { from: `/membership/${courseId}` } })}
                    className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold px-12 py-6 text-lg rounded-xl"
                  >
                    Create Account to Enroll
                  </Button>
                  <Button
                    onClick={() => navigate("/login", { state: { from: `/membership/${courseId}` } })}
                    variant="outline"
                    className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 font-semibold px-12 py-6 text-lg rounded-xl"
                  >
                    Already Have an Account?
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
    </>
  );
}