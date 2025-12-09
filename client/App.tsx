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
import CourseDeatils from "./pages/CourseDeatils";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Community from "./pages/Community";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Membership from "./pages/Membership";
import Course from "./pages/Course";
import InstitutionalMembership from "./pages/InstitutionalMembership";
import TradingMentorship from "./pages/TradingMentorship";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseDetails from "./pages/CourseDetails";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import PaymentPending from "./pages/PaymentPending";
import LeverageCalculator from "./pages/LeverageCalculator";
import AdminLogin from "./pages/admin/AdminLogin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import BlogEditor from "./pages/admin/BlogEditor";
import ResourceAdmin from "./pages/admin/ResourceAdmin";
import ResourceEditor from "./pages/admin/ResourceEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AdminAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/course-details" element={<CourseDeatils />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/community" element={<Community />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/course" element={<Course />} />
              <Route path="/course/:courseId" element={<CourseDetails />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
              <Route path="/payment-pending" element={<PaymentPending />} />
              <Route path="/trading-mentorship" element={<TradingMentorship />} />
              <Route path="/institutional-membership" element={<InstitutionalMembership />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/leverage-calculator" element={<LeverageCalculator />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin/blog" element={<BlogAdmin />} />
                <Route path="/admin/blog/new" element={<BlogEditor />} />
                <Route path="/admin/blog/:slug/edit" element={<BlogEditor />} />
                <Route path="/admin/resources" element={<ResourceAdmin />} />
                <Route path="/admin/resources/new" element={<ResourceEditor />} />
                <Route path="/admin/resources/:slug/edit" element={<ResourceEditor />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
