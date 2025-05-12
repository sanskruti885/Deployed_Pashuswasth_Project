
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

// Farmer (User) Pages
import UserDashboard from "./pages/user/Dashboard";
import SearchDoctors from "./pages/user/SearchDoctors";
import PopularQuestions from "./pages/user/PopularQuestions";
import CommonHealthcare from "./pages/user/CommonHealthcare";
import VideoTutorials from "./pages/user/VideoTutorials";
import Articles from "./pages/user/Articles";
import Symptoms from "./pages/user/Symptoms";
import HomeRemedies from "./pages/user/HomeRemedies";
import Precautions from "./pages/user/Precautions";
import BuySellCattle from "./pages/user/BuySellCattle";
import Insurance from "./pages/user/Insurance";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import ManageDoctors from "./pages/admin/ManageDoctors";
import AddDoctor from "./pages/admin/AddDoctor";
import CheckFeedback from "./pages/admin/CheckFeedback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main public routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            
            {/* Farmer/User routes */}
            <Route path="/user" element={<DashboardLayout userType="farmer" />}>
              <Route index element={<UserDashboard />} />
              <Route path="search-doctors" element={<SearchDoctors />} />
              <Route path="popular-questions" element={<PopularQuestions />} />
              <Route path="common-healthcare" element={<CommonHealthcare />} />
              <Route path="videos" element={<VideoTutorials />} />
              <Route path="articles" element={<Articles />} />
              <Route path="symptoms" element={<Symptoms />} />
              <Route path="home-remedies" element={<HomeRemedies />} />
              <Route path="precautions" element={<Precautions />} />
              <Route path="buy-sell" element={<BuySellCattle />} />
              <Route path="insurance" element={<Insurance />} />
            </Route>
            
            {/* Admin routes */}
            <Route path="/admin" element={<DashboardLayout userType="admin" />}>
              <Route index element={<AdminDashboard />} />
              <Route path="manage-doctors" element={<ManageDoctors />} />
              <Route path="add-doctor" element={<AddDoctor />} />
              <Route path="feedback" element={<CheckFeedback />} />
            </Route>
            
            {/* 404 Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
