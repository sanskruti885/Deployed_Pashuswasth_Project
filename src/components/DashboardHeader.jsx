
import { useNavigate } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useTranslation } from "./LanguageSwitcher";

const DashboardHeader = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={() => navigate("/")}
                className="text-forest-600 font-serif font-bold flex items-center h-full ml-2 md:ml-0"
              >
                PashuSwasth-Doot
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* <Button
              variant="ghost"
              size="icon"
              className="relative mr-3"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </Button> */}
            
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full bg-earth-300"
                src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                alt="User"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                {currentUser?.name || "User"}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <nav className="px-4 py-3">
            {/* This would display mobile sidebar links */}
            {currentUser?.userType === "farmer" ? (
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/user");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t("dashboard")}
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/user/search-doctors");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t("findVets")}
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/user/symptoms");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t("symptoms")}
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/user/home-remedies");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t("homeRemedies")}
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/user/videos");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t("videoTutorials")}
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/user/buy-sell");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Buy & Sell Cattle
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/user/insurance");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Insurance
                  </Button>
                </li>
              </ul>
            ) : (
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/admin/manage-doctors");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t("dashboard")}
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/admin/manage-doctors");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Manage Doctors
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/admin/feedback");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Check Feedback
                  </Button>
                </li>
              </ul>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
