
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "./LanguageSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("about"), path: "/about" },
    // { name: t("contact"), path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif text-forest-600 text-xl font-bold">PashuSwasth-Doot</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-forest-400"
                >
                  {link.name}
                </Link>
              ))}
              
              {/* <div className="relative group">
                <button className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-forest-400">
                  <span>{t("resources")}</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute z-10 left-0 mt-2 w-48 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    <Link to="/user/symptoms" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Symptoms</Link>
                    <Link to="/user/home-remedies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home Remedies</Link>
                    <Link to="/user/videos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Video Tutorials</Link>
                    <Link to="/user/articles" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t("articles")}</Link>
                  </div>
                </div>
              </div> */}
              
              {/* <div className="relative group">
                <button className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-forest-400">
                  <span>{t("services")}</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute z-10 left-0 mt-2 w-48 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    <Link to="/user/search-doctors" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t("findVets")}</Link>
                    <Link to="/user/buy-sell" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Buy/Sell Cattle</Link>
                    <Link to="/user/insurance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Insurance</Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center">
            <LanguageSwitcher />
            
            {currentUser ? (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => navigate(`/${currentUser.userType}`)}
                  className="mr-2"
                >
                  {t("dashboard")}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleLogout()}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="mr-2"
                >
                  {t("login")}
                </Button>
                <Button 
                  variant="default"
                  onClick={() => navigate("/register")}
                  className="bg-forest-600 hover:bg-forest-700"
                >
                  {t("register")}
                </Button>
              </>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-forest-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-forest-300 hover:text-gray-900"
              onClick={toggleMenu}
            >
              {link.name}
            </Link>
          ))}
          
          <button
            className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-forest-300 hover:text-gray-900"
            onClick={() => {
              document.getElementById("resources-mobile").classList.toggle("hidden");
            }}
          >
            Resources
          </button>
          <div id="resources-mobile" className="hidden pl-6 border-l-4 border-transparent">
            <Link to="/user/symptoms" className="block py-2 text-sm text-gray-600 hover:text-gray-900" onClick={toggleMenu}>Symptoms</Link>
            <Link to="/user/home-remedies" className="block py-2 text-sm text-gray-600 hover:text-gray-900" onClick={toggleMenu}>Home Remedies</Link>
            <Link to="/user/videos" className="block py-2 text-sm text-gray-600 hover:text-gray-900" onClick={toggleMenu}>Video Tutorials</Link>
            <Link to="/user/articles" className="block py-2 text-sm text-gray-600 hover:text-gray-900" onClick={toggleMenu}>{t("articles")}</Link>
          </div>
          
          <button
            className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-forest-300 hover:text-gray-900"
            onClick={() => {
              document.getElementById("services-mobile").classList.toggle("hidden");
            }}
          >
            Services
          </button>
          <div id="services-mobile" className="hidden pl-6 border-l-4 border-transparent">
            <Link to="/user/search-doctors" className="block py-2 text-sm text-gray-600 hover:text-gray-900" onClick={toggleMenu}>{t("findVets")}</Link>
            <Link to="/user/buy-sell" className="block py-2 text-sm text-gray-600 hover:text-gray-900" onClick={toggleMenu}>Buy/Sell Cattle</Link>
            <Link to="/user/insurance" className="block py-2 text-sm text-gray-600 hover:text-gray-900" onClick={toggleMenu}>Insurance</Link>
          </div>
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4 space-x-2">
            {currentUser ? (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => {
                    navigate(`/${currentUser.userType}`);
                    toggleMenu();
                  }}
                  className="w-full justify-center"
                >
                  {t("dashboard")}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full justify-center"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => {
                    navigate("/login");
                    toggleMenu();
                  }}
                  className="w-full justify-center"
                >
                  {t("login")}
                </Button>
                <Button 
                  variant="default"
                  onClick={() => {
                    navigate("/register");
                    toggleMenu();
                  }}
                  className="w-full justify-center bg-forest-600 hover:bg-forest-700"
                >
                  {t("register")}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
