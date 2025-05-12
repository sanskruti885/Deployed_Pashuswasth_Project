
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";
import { useTranslation } from "./LanguageSwitcher";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-earth-800 text-white">
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-serif font-bold mb-4">PashuSwasth-Doot</h2>
            <p className="text-earth-100 mb-4">
              Connecting farmers with veterinary care for healthier livestock
            </p>
            <div className="flex space-x-4">
              {/* <a href="#" className="text-earth-200 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-earth-200 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-earth-200 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-earth-200 hover:text-white">
                <Youtube size={20} />
              </a> */}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-earth-200 hover:text-white">{t("home")}</Link>
              </li>
              <li>
                <Link to="/about" className="text-earth-200 hover:text-white">{t("about")}</Link>
              </li>
              {/* <li>
                <Link to="/contact" className="text-earth-200 hover:text-white">{t("contact")}</Link>
              </li> */}
              <li>
                <Link to="/register" className="text-earth-200 hover:text-white">{t("register")}</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-earth-200 hover:text-white">Symptoms Guide</Link>
              </li>
              <li>
                <Link to="/login" className="text-earth-200 hover:text-white">Home Remedies</Link>
              </li>
              <li>
                <Link to="/login" className="text-earth-200 hover:text-white">Video Tutorials</Link>
              </li>
              <li>
                <Link to="/login" className="text-earth-200 hover:text-white">{t("articles")}</Link>
              </li>
            </ul>
          </div>
          
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">{t("contact")}</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-earth-300" />
                <a href="mailto:info@pashuswasthdoot.com" className="text-earth-200 hover:text-white">
                  info@pashuswasthdoot.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-earth-300" />
                <a href="tel:+919876543210" className="text-earth-200 hover:text-white">
                  +91 9876 543 210
                </a>
              </li>
            </ul>
          </div> */}
        </div>
        
        <div className="mt-12 pt-8 border-t border-earth-700">
          <p className="text-earth-300 text-center text-sm">
            &copy; {new Date().getFullYear()} PashuSwasth-Doot. All rights reserved. Created for farmers with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
