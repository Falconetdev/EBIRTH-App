import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MembershipDetails from "./pages/MembershipDetails";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Community from "./pages/Community";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import TermsOfService from "./pages/TermsOfService";
import MembershipOLD from "./pages/Membership-OLD";
import Membership from "./pages/Membership";
import InstitutionalMembership from "./pages/InstitutionalMembership";
import TradingMentorship from "./pages/TradingMentorship";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MembershipDetailsEnrollment from "./pages/MembershipDetailsEnrollment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import PaymentPending from "./pages/PaymentPending";
import LeverageCalculator from "./pages/LeverageCalculator";
import AdminLogin from "./pages/admin/AdminLogin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import BlogEditor from "./pages/admin/BlogEditor";
import ResourceAdmin from "./pages/admin/ResourceAdmin";
import ResourceEditor from "./pages/admin/ResourceEditor";
import { ThemeProvider } from "@/context/ThemeContext";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/membership-details"
                  element={<MembershipDetails />}
                />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/community" element={<Community />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/membership-old" element={<MembershipOLD />} />
                <Route path="/membership" element={<Membership />} />
                <Route
                  path="/membership/:courseId"
                  element={<MembershipDetailsEnrollment />}
                />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-cancel" element={<PaymentCancel />} />
                <Route path="/payment-pending" element={<PaymentPending />} />
                <Route
                  path="/trading-mentorship"
                  element={<TradingMentorship />}
                />
                <Route
                  path="/institutional-membership"
                  element={<InstitutionalMembership />}
                />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/resources" element={<Resources />} />
                <Route
                  path="/leverage-calculator"
                  element={<LeverageCalculator />}
                />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin/blog" element={<BlogAdmin />} />
                  <Route path="/admin/blog/new" element={<BlogEditor />} />
                  <Route
                    path="/admin/blog/:slug/edit"
                    element={<BlogEditor />}
                  />
                  <Route path="/admin/resources" element={<ResourceAdmin />} />
                  <Route
                    path="/admin/resources/new"
                    element={<ResourceEditor />}
                  />
                  <Route
                    path="/admin/resources/:slug/edit"
                    element={<ResourceEditor />}
                  />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AdminAuthProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
